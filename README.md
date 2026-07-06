# Fiducial FPSG Interactive Defense

Interactive web presentation for the MBA Management International Business mission defense.

**Subject:** Enhancing the Commercial Development of High-Value Training Offers at Fiducial FPSG  
**Scope:** E-learning, Augmented Reality, Virtual Reality  
**Target oral duration:** 34 to 38 minutes  
**Main screens:** 24 maximum  
**Annexes:** 8 backup screens accessible with `A`

---

## 1. Installation

```bash
npm install
```

## 2. Local launch

```bash
npm run dev
```

Then open the local Vite URL in Chrome, generally:

```text
http://localhost:5173
```

## 3. Production build

```bash
npm run build
```

The production build is generated in:

```text
dist/
```

The project has been prepared as a React/Vite single-page application.

---

## 4. Firebase Hosting deployment

The project contains a ready-to-use `firebase.json` file configured for React/Vite:

- public directory: `dist`
- rewrite all routes to `index.html`
- clean caching rules for JS/CSS assets

Deployment steps:

```bash
npm run build
firebase init hosting
firebase deploy
```

During `firebase init hosting`, choose:

```text
What do you want to use as your public directory? dist
Configure as a single-page app? Yes
Set up automatic builds and deploys with GitHub? Optional
Overwrite index.html? No
```

After deployment, Firebase will provide an URL similar to:

```text
https://nom-du-projet.web.app
```

---

## 5. Keyboard commands

| Key | Action |
|---|---|
| `Arrow Right` | Next screen |
| `Space` | Next screen |
| `Arrow Left` | Previous screen |
| `F` | Fullscreen |
| `N` | Show / hide French presenter notes |
| `T` | Show / hide timer |
| `B` | Temporary black screen |
| `A` | Open / close annexes |
| `R` | Return to executive roadmap |
| `P` | Open private presenter view |
| `Esc` | Exit black screen |

Notes are hidden by default.

Presenter view:

- open the main presentation on the projected screen;
- press `P` to open a second private presenter window;
- move that private window to your own screen;
- use its timer, notes and navigation controls;
- the projected presentation remains clean and does not show the private notes or timer.

---

## 6. Screen structure

Main presentation: 24 screens.

1. Opening  
2. Executive roadmap  
3. Core business issue  
4. Problem statement  
5. Methodology  
6. Benchmark logic  
7. Three offers maturity snapshot  
8. E-learning diagnosis  
9. Augmented reality diagnosis  
10. Virtual reality diagnosis  
11. Internal diagnosis  
12. External diagnosis  
13. Benchmark synthesis  
14. Strategic synthesis  
15. Target segmentation by offer  
16. Recommended positioning  
17. Action plan overview  
18. Recommendation 1 - Commercial offer portfolio  
19. Recommendation 2 - Sales team training  
20. Recommendation 3 - 40-client pilot campaign  
21. Recommendation 4 - KPI dashboard  
22. Budget and 2025 baseline  
23. ROI scenarios  
24. Final recommendation

Annexes:

- A1 - Detailed budget table
- A2 - Detailed ROI calculation
- A3 - KPI dashboard template
- A4 - Benchmark detailed grid
- A5 - Potential jury questions
- A6 - Offer definitions
- A7 - Oral timing plan
- A8 - Static backup summary

---

## 7. Oral timing plan

| Phase | Screens | Recommended duration |
|---|---:|---:|
| Opening / framing | 1-4 | 5-6 min |
| Methodology | 5-6 | 3-4 min |
| Diagnosis | 7-12 | 10-12 min |
| Benchmark / synthesis | 13-16 | 6-7 min |
| Action plan | 17-21 | 8-10 min |
| Budget / ROI / risks / conclusion | 22-24 | 8-10 min |

Target total: **34 to 38 minutes**.

---

## 8. Content architecture

Main content file:

```text
src/data/presentationContent.ts
```

This file contains:

- slide titles and messages;
- financial baseline;
- ROI scenarios;
- budget assumptions;
- benchmark actors;
- segmentation;
- KPIs;
- French oral notes;
- coherence checklist.

Main application file:

```text
src/App.tsx
```

---

## 9. Visual and animation layer

The presentation uses:

- React/Vite/TypeScript;
- TailwindCSS;
- Framer Motion for transitions;
- Recharts for charts;
- Lucide React for icons;
- qrcode.react for the final QR code.

The visual layer is deliberately sober and business-oriented:

- strategic flow panels;
- offer logic panels;
- diagnosis matrices;
- KPI dashboard;
- budget and ROI charts;
- 6-month execution timeline.

Animations are limited to slide transitions and progressive reveal effects. They support readability and do not replace the core message.

---

## 10. Technical fallback

No essential content depends on WebGL, external media or online assets. The `ThreeScene` component name is kept for project compatibility, but it now renders code-native strategic panels instead of decorative 3D.

---

## 11. Backup files

Backup PDF:

```text
exports/Fiducial_FPSG_Soutenance_Backup.pdf
```

Contact sheet:

```text
exports/contact_sheet.png
```

Generation report:

```text
exports/GENERATION_REPORT.md
```

The backup PDF is static and can be used if the browser, projector or deployment fails.

---

## 12. Backup PDF procedure

If you need to regenerate the static backup PDF:

```bash
python scripts/create_backup_pdf.py
```

It will regenerate:

```text
exports/Fiducial_FPSG_Soutenance_Backup.pdf
```

---

## 13. Recommended oral setup

Before the defense:

1. Test the project on the final computer.
2. Test the video projector resolution.
3. Use Chrome.
4. Open in fullscreen with `F`.
5. Keep the backup PDF open or ready locally.
6. Avoid depending on internet on the day of the oral if possible.
7. If deployed to Firebase, also keep a local build or PDF backup.
8. Start the timer only when the defense begins.
9. Keep the annexes for jury questions only.

---

## 14. Important content safeguards

The presentation is built around the dissertation logic:

- Fiducial FPSG does not lack innovation.
- The issue is commercial structuring and scalability.
- Fiducial FPSG should not become a technology provider.
- Fiducial FPSG should remain a safety training expert using digital and immersive solutions as commercial and pedagogical levers.
- ROI is calculated on additional margin, using a 35% gross margin rate and the €9,396 total action budget.
- KPI dashboard values are recommended indicators, not actual results.
