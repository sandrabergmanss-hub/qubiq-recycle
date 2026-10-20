import { useEffect, useRef, useState } from "react";
import { VIEWER_CONFIG } from "@/content/site";
import roomImg from "@/assets/recycling-room.jpg";

type Status = "idle" | "loading" | "ready" | "error";
type Controls = { reset: () => void; zoom: (d: number) => void };

/**
 * Interactive concept viewer. Loads Three.js only on user request.
 * Shows an abstract placeholder volume until VIEWER_CONFIG.modelUrl is set
 * to an approved GLB/GLTF model.
 */
export function ConceptViewer() {
  const mount = useRef<HTMLDivElement>(null);
  const controls = useRef<Controls | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (status !== "loading" || !mount.current) return;
    let disposed = false;
    let cleanup = () => {};
    (async () => {
      try {
        const THREE = await import("three");
        const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls.js");
        const el = mount.current!;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(el.clientWidth, el.clientHeight);
        renderer.shadowMap.enabled = true;
        el.appendChild(renderer.domElement);
        renderer.domElement.setAttribute("aria-label", "Interactive 3D concept preview");

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(VIEWER_CONFIG.background);
        const camera = new THREE.PerspectiveCamera(35, el.clientWidth / el.clientHeight, 0.1, 100);
        const home = new THREE.Vector3(...VIEWER_CONFIG.cameraPosition);
        camera.position.copy(home);

        scene.add(new THREE.HemisphereLight(0xffffff, 0xb8b2a6, 1.1));
        const key = new THREE.DirectionalLight(0xffffff, 2);
        key.position.set(4, 6, 3);
        key.castShadow = true;
        scene.add(key);

        const floor = new THREE.Mesh(
          new THREE.PlaneGeometry(20, 20),
          new THREE.ShadowMaterial({ opacity: 0.12 }),
        );
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        scene.add(floor);

        const group = new THREE.Group();
        if (VIEWER_CONFIG.modelUrl) {
          const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
          const gltf = await new GLTFLoader().loadAsync(VIEWER_CONFIG.modelUrl);
          group.add(gltf.scene);
        } else {
          // Abstract placeholder volume — NOT the product design.
          const mat = new THREE.MeshStandardMaterial({ color: 0xd9d4ca, roughness: 0.6 });
          const box = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2, 0.9), mat);
          box.position.y = 1;
          box.castShadow = true;
          const edges = new THREE.LineSegments(
            new THREE.EdgesGeometry(box.geometry),
            new THREE.LineBasicMaterial({ color: 0x2b3a33 }),
          );
          edges.position.copy(box.position);
          group.add(box, edges);
        }
        scene.add(group);

        const orbit = new OrbitControls(camera, renderer.domElement);
        orbit.target.set(0, 1, 0);
        orbit.enableDamping = !reduce;
        orbit.enablePan = false;
        orbit.minDistance = VIEWER_CONFIG.minDistance;
        orbit.maxDistance = VIEWER_CONFIG.maxDistance;
        orbit.maxPolarAngle = Math.PI / 2.05;
        orbit.update();

        controls.current = {
          reset: () => {
            camera.position.copy(home);
            orbit.target.set(0, 1, 0);
            orbit.update();
          },
          zoom: (d) => {
            const dir = camera.position.clone().sub(orbit.target);
            const len = THREE.MathUtils.clamp(dir.length() * d, orbit.minDistance, orbit.maxDistance);
            camera.position.copy(orbit.target).add(dir.setLength(len));
            orbit.update();
          },
        };

        let raf = 0;
        const tick = () => {
          orbit.update();
          renderer.render(scene, camera);
          raf = requestAnimationFrame(tick);
        };
        tick();
        const onResize = () => {
          camera.aspect = el.clientWidth / el.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(el.clientWidth, el.clientHeight);
        };
        window.addEventListener("resize", onResize);
        cleanup = () => {
          cancelAnimationFrame(raf);
          window.removeEventListener("resize", onResize);
          orbit.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
        if (disposed) cleanup();
        else setStatus("ready");
      } catch (e) {
        console.error(e);
        if (!disposed) setStatus("error");
      }
    })();
    return () => {
      disposed = true;
      cleanup();
    };
  }, [status === "loading"]);

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary sm:aspect-[16/10]">
      <div ref={mount} className="absolute inset-0 touch-none" />

      {(status === "idle" || status === "error") && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8 text-center">
          <div className="h-40 w-28 border border-foreground/40 bg-card shadow-sm" aria-hidden />
          <p className="max-w-sm text-sm text-muted-foreground">
            {status === "error"
              ? "The 3D preview couldn't load on this device. The final concept model will be presented here."
              : "Preview area awaiting the final concept model. The shape shown is an abstract placeholder, not the product design."}
          </p>
          {status === "idle" && (
            <button
              onClick={() => setStatus("loading")}
              className="eyebrow border border-foreground px-6 py-3 transition-colors hover:bg-foreground hover:text-background"
            >
              Load interactive preview
            </button>
          )}
        </div>
      )}
      {status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="eyebrow animate-pulse text-muted-foreground">Loading preview…</p>
        </div>
      )}
      {status === "ready" && (
        <>
          <span className="eyebrow pointer-events-none absolute left-5 top-5 text-muted-foreground">
            {VIEWER_CONFIG.modelUrl ? "Concept model" : "Placeholder volume · not final design"}
          </span>
          <span className="eyebrow pointer-events-none absolute bottom-5 left-5 hidden text-muted-foreground sm:block">
            Drag to rotate · scroll to zoom
          </span>
          <div className="absolute bottom-5 right-5 flex gap-2">
            {[
              { l: "Zoom in", t: "+", f: () => controls.current?.zoom(0.85) },
              { l: "Zoom out", t: "−", f: () => controls.current?.zoom(1.15) },
            ].map((b) => (
              <button
                key={b.l}
                aria-label={b.l}
                onClick={b.f}
                className="h-11 w-11 border border-foreground/30 bg-background/80 text-lg backdrop-blur hover:bg-background"
              >
                {b.t}
              </button>
            ))}
            <button
              onClick={() => controls.current?.reset()}
              className="eyebrow h-11 border border-foreground/30 bg-background/80 px-4 backdrop-blur hover:bg-background"
            >
              Reset view
            </button>
          </div>
        </>
      )}
      <img src={roomImg} alt="" className="hidden" aria-hidden />
    </div>
  );
}
