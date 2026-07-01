# Fiducial FPSG Interactive Defense

Premium React/Vite/TypeScript web presentation for the MBA mission d'expertise oral defense.

## Install and run
```bash
npm install
npm run dev
npm run build
```
Open Chrome on the local Vite URL. Use a 16:9 display or projector.

## Keyboard controls
- Right arrow / Space: next screen
- Left arrow: previous screen
- F: fullscreen
- N: show/hide French presenter notes
- T: show/hide timer
- B: temporary black screen
- A: toggle appendix section
- R: return to executive roadmap / reset main navigation

## Oral timing
The main flow contains exactly 24 screens and is designed for about 34–38 minutes.

## Firebase Hosting deployment
`firebase.json` is configured as a Vite single-page app with `dist` as the public folder and a rewrite to `index.html`.
```bash
npm run build
firebase init hosting
# choose dist as public directory, configure as SPA, do not overwrite firebase.json
firebase deploy
```
Firebase will provide a URL such as `https://nom-du-projet.web.app`.

## 3D and animations
The deck uses Framer Motion transitions and lightweight React Three Fiber scenes. The 3D layer is illustrative only: no essential content depends on WebGL. If WebGL fails, the browser fallback keeps the core message readable.

## Backup procedure
A backup placeholder is included at `exports/Fiducial_FPSG_Soutenance_Backup.pdf`. Before the oral, export a final PDF from Chrome print/PDF after checking the production build.

## Technical limits and day-of checklist
- Test on the final computer and final projector.
- Open Chrome in fullscreen.
- Keep the PDF backup locally.
- Avoid depending on internet on presentation day except for the final QR code link.
- Verify the 2025 baseline, budget, ROI scenario wording and notes before delivery.
