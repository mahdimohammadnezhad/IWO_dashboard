# IMT-Desert Architecture

## 1) System Overview

IMT-Desert is a Vite + React + TypeScript single-page app with two calculation engines:

- Part 1: Yield Recommendation Engine (single crop)
- Part 2: Multi-Crop Optimization Engine (up to 5 crops + optional AI advisory text)

The app runs in two runtime modes:

- Development: Express server + Vite middleware (`server.ts`)
- Production: Express serves static files from `dist/` and exposes API route `/api/ai/tips`

## 2) High-Level Diagram (ASCII)

```text
+--------------------------- Browser ----------------------------+
| React SPA (App -> PartOne / PartTwo)                         |
|  - local calculation logic                                    |
|  - chart rendering (Highcharts)                               |
|  - export CSV / PNG                                           |
+---------------------------+------------------------------------+
                            |
                            | POST /api/ai/tips (PartTwo only)
                            v
+------------------------ Express Server ------------------------+
| server.ts                                                    |
|  - JSON API endpoint                                         |
|  - Gemini client call via @google/genai                      |
|  - serves Vite middleware (dev) or dist static files (prod)  |
+---------------------------+------------------------------------+
                            |
                            v
                     Google Gemini API
```

## 3) Frontend Module Layout

```text
src/
  main.tsx
  App.tsx
  lib/
    irrigationCalc.ts          <-- datasets + utility formulas
  components/
    Navbar.tsx
    Footer.tsx
    PartOne.tsx                <-- single-crop engine
    PartTwo.tsx                <-- multi-crop engine + AI report
```

## 4) Runtime Flow: App Navigation

```text
[App.tsx]
   |
   +--> activeTab = "part1" --> [PartOne]
   |
   +--> activeTab = "part2" --> [PartTwo]
```

## 5) Runtime Flow: PartOne (Local Calculation)

```text
[User inputs]
  crop, ecw, soil, irrigation system, efficiency
        |
        v
[Validation + defaults]
  ecw default=1.2, soil default=Sandy Loam (id=5),
  irrigation default=Flood, efficiency default=system ie_default
        |
        v
[Fetch static params]
  cropData + soilData + irrigationSystems
        |
        v
[Compute]
  LR_standard, LR_saleach, IWR/IEw/LRw, deficit reductions
        |
        v
[Render]
  KPI cards + two charts + export CSV/PNG
```

## 6) Runtime Flow: PartTwo (Optimization + AI)

```text
[User global inputs]
  wa, ecw, system, efficiency
        |
        +--> [Crop rows 1..5]
              crop, ym, etm, price, cost
        |
        v
[Run optimization]
  for each crop:
    compute LR, AIW3, eta, ya, profit, water saving, tip
        |
        v
[Render]
  chart tabs (yield/profit/water), tips, CSV/PNG export
        |
        +--> optional "Generate Strategic Report"
              POST /api/ai/tips -> markdown response -> render
```

## 7) Backend/API Responsibilities

- File: `server.ts`
- Endpoint: `POST /api/ai/tips`
- Input payload:
  - `comparisonData`: aggregated crop optimization output
  - `weatherForecast`: free text context
- Output payload:
  - `{ tip: "<markdown>" }`

Backend logic:

1. Read `GEMINI_API_KEY` from environment.
2. Build prompt from optimization context + weather.
3. Call `gemini-3-flash-preview` using `@google/genai`.
4. Return generated markdown tip.

## 8) Data Ownership and Boundaries

- Static agronomic datasets are embedded in `src/lib/irrigationCalc.ts`.
- UI state is local component state (`useState`) in `PartOne` and `PartTwo`.
- AI output is transient (in-memory state); no persistence/database in this project.

## 9) Build and Deploy Shape

```text
npm run build
  -> vite build (frontend static files to dist/)
  -> esbuild bundles server.ts to dist/server.cjs
```

This means deployment can be:

- static preview from `dist/` for pages preview workflows
- or node server runtime using `dist/server.cjs` when API endpoint is needed
