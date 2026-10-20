import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Box, LoaderCircle, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { VIEWER_CONFIG } from "@/content/site";
import { Button } from "@/components/ui/button";

type Status = "idle" | "loading" | "ready" | "error";
type Controls = { reset: () => void; zoom: (d: number) => void; rotate: (d: number) => void };

/** User-activated studio display; the abstract volume is never a product render. */
export function ConceptViewer() {
  const mount = useRef<HTMLDivElement>(null);
  const controls = useRef<Controls | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!attempt) return;
    let disposed = false;
    let cleanup = () => {};
    (async () => {
      try {
        const THREE = await import("three");
        const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls.js");
        const el = mount.current;
        if (disposed || !el) return;
        const css = getComputedStyle(el);
        // CSS resolves OKLCH tokens to sRGB for Three.js' color parser.
        const resolveColor = (token: string) => {
          const probe = document.createElement("canvas");
          const ctx = probe.getContext("2d");
          if (!ctx) return new THREE.Color();
          ctx.fillStyle = css.getPropertyValue(token).trim();
          ctx.fillRect(0, 0, 1, 1);
          const [r = 0, g = 0, b = 0] = ctx.getImageData(0, 0, 1, 1).data;
          return new THREE.Color().setRGB(r / 255, g / 255, b / 255, THREE.SRGBColorSpace);
        };
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(el.clientWidth, el.clientHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        el.appendChild(renderer.domElement);
        renderer.domElement.setAttribute("role", "img");
        renderer.domElement.setAttribute("aria-label", VIEWER_CONFIG.modelUrl ? "Approved concept model" : "Rotatable abstract placeholder volume, not the product design");
        const scene = new THREE.Scene();
        scene.background = resolveColor(VIEWER_CONFIG.backgroundToken);
        const camera = new THREE.PerspectiveCamera(35, el.clientWidth / el.clientHeight, 0.1, 100);
        const home = new THREE.Vector3(...VIEWER_CONFIG.cameraPosition);
        camera.position.copy(home);
        const lightColor = resolveColor("--ivory");
        scene.add(new THREE.HemisphereLight(lightColor, resolveColor("--stone"), VIEWER_CONFIG.lighting.ambient));
        const key = new THREE.DirectionalLight(lightColor, VIEWER_CONFIG.lighting.key);
        key.position.set(...VIEWER_CONFIG.lighting.position);
        key.castShadow = true;
        key.shadow.mapSize.set(1024, 1024);
        scene.add(key);
        const floor = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), new THREE.ShadowMaterial({ opacity: 0.12 }));
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        scene.add(floor);
        const group = new THREE.Group();
        scene.add(group);
        const orbit = new OrbitControls(camera, renderer.domElement);
        orbit.target.set(0, 1, 0);
        orbit.enableDamping = false;
        orbit.enablePan = false;
        orbit.enableZoom = false; // Explicit controls avoid trapping page scroll on touch devices.
        orbit.minDistance = VIEWER_CONFIG.minDistance;
        orbit.maxDistance = VIEWER_CONFIG.maxDistance;
        orbit.maxPolarAngle = Math.PI / 2.05;
        const render = () => { if (!disposed) renderer.render(scene, camera); };
        orbit.addEventListener("change", render);
        const resize = new ResizeObserver(() => {
          if (!el.clientWidth || !el.clientHeight) return;
          camera.aspect = el.clientWidth / el.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(el.clientWidth, el.clientHeight);
          render();
        });
        resize.observe(el);
        const release = (root: import("three").Object3D) => {
          root.traverse((obj) => {
            if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments) {
              obj.geometry.dispose();
              const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
              materials.forEach((material) => {
                Object.values(material).forEach((value) => { if (value instanceof THREE.Texture) value.dispose(); });
                material.dispose();
              });
            }
          });
        };
        cleanup = () => {
          resize.disconnect();
          controls.current = null;
          orbit.removeEventListener("change", render);
          orbit.dispose();
          release(scene);
          renderer.dispose();
          renderer.domElement.remove();
        };
        if (VIEWER_CONFIG.modelUrl) {
          const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
          if (disposed) return;
          const gltf = await new GLTFLoader().loadAsync(VIEWER_CONFIG.modelUrl);
          if (disposed) { release(gltf.scene); return; }
          const bounds = new THREE.Box3().setFromObject(gltf.scene);
          const size = bounds.getSize(new THREE.Vector3());
          const longest = Math.max(size.x, size.y, size.z);
          if (longest > 0) {
            const scale = 2 / longest;
            const center = bounds.getCenter(new THREE.Vector3());
            gltf.scene.scale.multiplyScalar(scale);
            gltf.scene.position.sub(center.multiplyScalar(scale));
            gltf.scene.position.y += size.y * scale / 2;
            orbit.target.y = size.y * scale / 2;
          }
          gltf.scene.traverse((obj) => { if (obj instanceof THREE.Mesh) obj.castShadow = true; });
          group.add(gltf.scene);
        } else {
          const mat = new THREE.MeshStandardMaterial({ color: resolveColor(VIEWER_CONFIG.materialToken), roughness: 0.75 });
          const box = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2, 0.9), mat);
          box.position.y = 1;
          box.castShadow = true;
          const edges = new THREE.LineSegments(new THREE.EdgesGeometry(box.geometry), new THREE.LineBasicMaterial({ color: resolveColor(VIEWER_CONFIG.edgeToken), transparent: true, opacity: 0.45 }));
          edges.position.copy(box.position);
          group.add(box, edges);
        }
        if (disposed) { cleanup(); return; }
        const target = orbit.target.clone();
        controls.current = {
          reset: () => { camera.position.copy(home); group.rotation.y = 0; orbit.target.copy(target); orbit.update(); render(); },
          zoom: (d) => {
            const dir = camera.position.clone().sub(orbit.target);
            const len = THREE.MathUtils.clamp(dir.length() * d, orbit.minDistance, orbit.maxDistance);
            camera.position.copy(orbit.target).add(dir.setLength(len));
            orbit.update(); render();
          },
          rotate: (d) => { group.rotation.y += d; render(); },
        };
        orbit.update(); render();
        setStatus("ready");
      } catch {
        cleanup();
        if (!disposed) setStatus("error");
      }
    })();
    return () => { disposed = true; cleanup(); };
  }, [attempt]);

  const load = () => { setStatus("loading"); setAttempt((value) => value + 1); };
  return (
    <div>
      <div className="relative h-[440px] w-full overflow-hidden bg-studio sm:h-[560px] lg:h-[640px]" aria-busy={status === "loading"}>
        <div ref={mount} className="absolute inset-0 touch-pan-y" />
        <div className="pointer-events-none absolute inset-x-5 top-5 flex flex-wrap justify-between gap-2 sm:inset-x-8 sm:top-8">
          <span className="eyebrow text-muted-foreground">{VIEWER_CONFIG.modelUrl ? "Concept model" : "Abstract placeholder · not product design"}</span>
          <span className="eyebrow text-muted-foreground">{BRAND_LABEL}</span>
        </div>
        {(status === "idle" || status === "error") && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-7 px-6 pt-10 text-center">
            <div className="studio-volume relative" aria-hidden="true" />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {status === "error" ? "The interactive preview is unavailable on this device. The approved model will be added as the design develops." : "An abstract volume, not the finished machine. The approved product model will be added as the design develops."}
            </p>
            <Button onClick={load} variant="editorialOutline" size="editorial"><Box />{status === "error" ? "Retry preview" : "Load interactive preview"}</Button>
          </div>
        )}
        {status === "loading" && <div role="status" className="absolute inset-0 flex items-center justify-center gap-3 text-sm text-muted-foreground"><LoaderCircle className="size-5 motion-safe:animate-spin" />Loading preview…</div>}
        {status === "ready" && (
          <div className="absolute inset-x-4 bottom-5 flex justify-center gap-2 sm:inset-x-auto sm:right-8 sm:bottom-8">
            {[
              { label: "Rotate left", icon: ArrowLeft, action: () => controls.current?.rotate(-Math.PI / 8) },
              { label: "Rotate right", icon: ArrowRight, action: () => controls.current?.rotate(Math.PI / 8) },
              { label: "Zoom in", icon: ZoomIn, action: () => controls.current?.zoom(0.85) },
              { label: "Zoom out", icon: ZoomOut, action: () => controls.current?.zoom(1.15) },
              { label: "Reset view", icon: RotateCcw, action: () => controls.current?.reset() },
            ].map(({ label, icon: Icon, action }) => <Button key={label} aria-label={label} title={label} onClick={action} variant="outline" size="icon" className="h-11 w-11 rounded-none bg-background/90"><Icon /></Button>)}
          </div>
        )}
      </div>
      <div className="mt-5 flex flex-col justify-between gap-2 text-xs leading-relaxed text-muted-foreground sm:flex-row">
        <p>{VIEWER_CONFIG.modelUrl ? "Approved concept visualization." : "Concept in development. No final appearance or specifications established."}</p>
        <p role="status">{status === "ready" ? "Interactive preview ready." : status === "error" ? "Static fallback shown." : "Cardboard first. Plastic and metal: future possibilities."}</p>
      </div>
    </div>
  );
}
const BRAND_LABEL = "Design study / 01";
