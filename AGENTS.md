<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Editable site copy, brand, public contact address, narrative lists and 3D viewer configuration live in src/content/site.ts so updates do not require layout changes.
- Product display uses a user-activated Three.js viewer with a clearly labelled abstract fallback; load approved assets and normalize their bounds through the same viewer to preserve replaceability.
- Viewer surface and material colors resolve semantic CSS tokens in the browser so the 3D presentation stays aligned with the site theme.
- Homepage sections use matching content-driven navigation anchors, with the replaceable concept viewer embedded inside the development section so the narrative remains four sections.
