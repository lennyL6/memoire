# Generation report - Fiducial FPSG Interactive Defense

## Deliverable generated

Project folder:

```text
fiducial-fpsg-interactive-defense/
```

Main application:

```text
src/App.tsx
src/data/presentationContent.ts
```

Required components created:

- `SlideShell.tsx`
- `Navigation.tsx`
- `PresenterNotes.tsx`
- `ProgressBar.tsx`
- `Timer.tsx`
- `BlackScreen.tsx`
- `ThreeScene.tsx`
- `DiagnosticMatrix.tsx`
- `BenchmarkCards.tsx`
- `SegmentationCards.tsx`
- `ActionPlan.tsx`
- `BudgetChart.tsx`
- `RoiScenarioChart.tsx`
- `Timeline3D.tsx`
- `KpiDashboard.tsx`
- `RiskMatrix.tsx`
- `FinalQRCode.tsx`

Backup exports:

```text
exports/Fiducial_FPSG_Soutenance_Backup.pdf
exports/contact_sheet.png
exports/GENERATION_REPORT.md
```

## Technical stack

Implemented:

- React
- Vite
- TypeScript
- TailwindCSS
- Framer Motion
- Three.js
- React Three Fiber
- Drei
- Recharts
- Lucide React
- qrcode.react
- Firebase Hosting configuration

## Build status

Command executed successfully:

```bash
npm run build
```

Output directory:

```text
dist/
```

## Source basis used for content

The presentation was structured from the provided dissertation content and annex sources:

- `DOSSIER COMPLET (1) (1).docx`
- `M2-Guide MISSION D'EXPERTISE Rentrée 2025.pdf`
- `DVR_D253809_20251107.pdf`
- `DV_D254345_B_20260306.pdf`
- `IBM projet Elearning.pdf`
- `F1INCRA_Sensibilisation incendie en réalité augmentée.pdf`
- `F3RRVR_PrEvention des risques routiers en réalité virtuelle.pdf`
- previous project planning files available in the workspace
- final QR code: `https://www.fiducial-fpsg.fr/`

## Key coherence checks

Checked in `src/data/presentationContent.ts`:

1. Problem statement preserved:

```text
How can Fiducial FPSG enhance and commercialize its high-value training offers: e-learning, augmented reality and virtual reality for professional clients, considering their commercial development potential?
```

2. 2025 signed revenue baseline preserved:

```text
AR: €347,705
E-learning: €48,974
VR: €5,800
Total: €402,479
```

3. Direct budget preserved:

```text
€4,800-€8,300
```

4. Four recommendations preserved:

```text
Commercial offer portfolio
Sales team training
40-client pilot campaign
KPI dashboard and monthly monitoring
```

5. Sales training assumption preserved:

```text
4 salespeople
1 day
Internal training cost = 4 salespeople x 7 hours x loaded hourly cost
```

6. ROI positioning preserved:

```text
Additional signed revenue scenarios
Break-even margin logic
Not a guaranteed ROI
```

7. Positioning preserved:

```text
Fiducial FPSG does not lack innovation.
The issue is commercial structuring and scalability.
Fiducial FPSG should not become a technology provider.
Fiducial FPSG should remain a safety training expert using digital and immersive solutions as levers.
```

8. KPI safeguard preserved:

```text
KPI values are presented as recommended monitoring indicators, not actual results.
```

## Main presentation structure

The main presentation contains exactly 24 principal screens.

Annexes are separate and accessible with the `A` key.

## Backup PDF verification

The static backup PDF was generated with ReportLab:

```text
exports/Fiducial_FPSG_Soutenance_Backup.pdf
```

It was rendered to PNG using the PDF rendering workflow for visual verification.

Rendered pages:

```text
32 pages
24 main screens + 8 annexes
```

Control contact sheet:

```text
exports/contact_sheet.png
```

The contact sheet is based on the rendered backup PDF pages. It is a static control sheet, not a browser screenshot set.

## Known technical limits

- The 3D layer increases bundle size because Three.js and Drei are included.
- WebGL fallback is implemented in `ThreeScene.tsx`.
- The 3D objects are intentionally lightweight and decorative. Critical content is always displayed in text, cards or charts.
- The backup PDF is a static presentation fallback. It does not reproduce the 3D interactions.
- Before the oral, the web presentation must be tested on the final machine and projector.

## Recommended pre-oral test sequence

```bash
npm install
npm run build
npm run dev
```

Then test:

- slide navigation;
- fullscreen mode;
- presenter notes with `N`;
- timer with `T`;
- black screen with `B`;
- annexes with `A`;
- projector readability;
- fallback PDF.

