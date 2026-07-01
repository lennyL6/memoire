# Generation report - Fiducial FPSG Interactive Defense

## Deliverable generated

Project folder:

```text
/Users/lennylanfrey/Documents/mémoire/fiducial-fpsg-interactive-defense/
```

Main application files:

```text
src/App.tsx
src/data/presentationContent.ts
```

Required components are present in:

```text
src/components/
```

The main deck contains exactly 24 principal screens. The annex deck contains 8 optional backup screens accessible with `A`.

## Source basis checked

Content coherence was checked against:

- `/Users/lennylanfrey/Downloads/MIB5B_LANFREY_Lenny.pdf`
- `/Users/lennylanfrey/Library/Mobile Documents/com~apple~CloudDocs/M2-Guide MISSION D'EXPERTISE Rentrée 2025.pdf`
- the provided build brief
- final QR code URL: `https://www.fiducial-fpsg.fr/`

The school guide confirms the oral expectation: 30 to 40 minutes, structured presentation of context, problem statement, analysis, diagnosis, strategy, budgeted and planned recommendations.

## Coherence checks preserved

Problem statement:

```text
How can Fiducial FPSG enhance and commercialize its high-value training offers: e-learning, augmented reality and virtual reality for professional clients, considering their commercial development potential?
```

2025 signed revenue baseline:

```text
Augmented reality: €347,705
E-learning: €48,974
Virtual reality: €5,800
Total: €402,479
```

Direct budget:

```text
€4,800-€8,300
```

Recommendations:

```text
Commercial offer portfolio
Sales training
40-client pilot campaign
KPI dashboard and monthly monitoring
```

ROI positioning:

```text
Additional signed revenue scenarios
Break-even margin logic
Decision-making framework, not a guaranteed result
```

KPI safeguard:

```text
KPI values are presented as recommended monitoring indicators, not actual results.
```

## Verification performed

Commands executed successfully:

```bash
npm install --registry=https://registry.npmjs.org --no-audit --no-fund
npm run build
npm run export:pdf
```

Production output:

```text
dist/
```

Backup PDF:

```text
exports/Fiducial_FPSG_Soutenance_Backup.pdf
```

Browser control was performed with local Google Chrome through Playwright because the bundled Playwright Chromium executable was not installed.

Fresh browser captures:

```text
exports/browser-slide-01.png
exports/browser-current.png
exports/browser-mobile.png
exports/browser-black.png
```

Existing static contact sheet:

```text
exports/contact_sheet.png
```

## Interaction checks

Verified in Chrome:

- slide 1 loads;
- right arrow advances to the executive roadmap;
- `N` shows presenter notes;
- `T` shows the timer;
- `A` opens annexes;
- no browser console errors after favicon fix.

## Visual fixes applied

- Simplified the opening green card to remove text overlap.
- Removed decorative Three.js / React Three Fiber animations after review.
- Replaced the former 3D canvas areas with sober strategic visual panels.
- Reworked screen 20 with a clearer 40-client pilot illustration and a readable 6-month execution timeline.
- Added a private presenter view for notes, timer, next slide and controls without showing those elements on the projected presentation.
- Added a local SVG favicon.
- Added mobile-specific layout compression for the presentation frame.
- Updated PDF export scripts to use `PYTHON`, Codex bundled Python when available, or `python3`.

## Technical limits

- The backup PDF is static and does not reproduce web interactions.
- The contact sheet is static and based on the backup PDF pages.
- Before the oral, test Chrome, fullscreen mode, the projector, keyboard shortcuts and the PDF backup on the final machine.
