# App Architecture

## Overview
This project is a client-side React application (Create React App style) for irrigation planning and crop optimization. It renders a single-page interface with a header (`Navbar`) and a large interactive computation dashboard (`Home`).

## High-Level Structure
- `src/index.js`: React entrypoint; mounts `<App />` into `#root`.
- `src/App.js`: top-level composition; renders `Navbar` and `Home`.
- `src/Navbar/*`: branding + static menu links.
- `src/Home/Home.js`: core domain logic, user inputs, calculators, and chart rendering.
- `src/Home/home.css`: presentation/layout for main dashboard.
- `public/*`: static host page and assets.

## Runtime Architecture
- UI Framework: React (function components + hooks; one class component in `Navbar`).
- State Management: local component state via `useState` in `Home`.
- Business Logic: embedded directly in `Home.js` (functions like `clr`, crop comparison calculators, irrigation computations).
- Visualization:
  - `react-chartjs-2` + `chart.js` for bar charts.
  - `@devexpress/dx-react-chart-material-ui` for deficit irrigation chart.
  - `react-circular-progressbar` for leaching requirement gauges.
- Inputs:
  - `react-select` for crop/soil/irrigation dropdowns.
  - HTML numeric inputs for water, EC, efficiency, costs, ET, yield.

## Component Flow (ASCII)
```text
+-------------------+
|   Browser Client  |
+---------+---------+
          |
          v
+-------------------+       mounts into       +-------------------+
|   public/index    | ----------------------> |   src/index.js    |
|   (root div)      |                         | ReactDOM.render() |
+-------------------+                         +---------+---------+
                                                        |
                                                        v
                                              +-------------------+
                                              |      App.js       |
                                              |  <Navbar/><Home/> |
                                              +----+---------+----+
                                                   |         |
                                static links/logo  |         | interactive tool
                                                   v         v
                                          +-------------+ +-------------------+
                                          |   Navbar    | |       Home        |
                                          | class comp  | | function comp     |
                                          +-------------+ +---------+---------+
                                                              |  useState(...) many
                                                              v
                                            +--------------------------------------+
                                            | Input Layer                           |
                                            | - Crop selection                      |
                                            | - Soil texture                        |
                                            | - Irrigation type/efficiency          |
                                            | - Water salinity / water availability |
                                            | - ET, yield, price, production cost   |
                                            +------------------+-------------------+
                                                               |
                                                  button clicks| (Calculate/Compare)
                                                               v
                                            +--------------------------------------+
                                            | Computation Layer                      |
                                            | - Validation/defaulting                |
                                            | - Leaching requirement calculations     |
                                            | - IWR / ET / IE water demand           |
                                            | - Yield, revenue, water-saving compare |
                                            +------------------+-------------------+
                                                               |
                                                  setState(...)| updates datasets
                                                               v
                                            +--------------------------------------+
                                            | Output Layer                           |
                                            | - Circular progress indicators          |
                                            | - Bar charts (yield/profit/water)       |
                                            | - Deficit irrigation chart              |
                                            | - Text recommendations/tips             |
                                            +--------------------------------------+
```

## Main User Flows (ASCII)
```text
Flow A: Single-crop irrigation requirement
-----------------------------------------
[Select Crop + Soil + Irrigation + optional EC/IE]
                    |
                    v
    [Click "Find out yield and crop requirements"]
                    |
                    v
     [Compute LR, ET, IEw, IWR + yield reduction]
                    |
                    v
          [Render gauges + charts + values]

Flow B: Multi-crop optimization/compare
---------------------------------------
[Enter water availability + choose up to 5 crops + optional custom ET/yield/cost]
                    |
                    +--> [Compare Yield] --------------+
                    |                                  |
                    +--> [Compare Profit] ------------>|--> [Update chart + best crop text]
                    |                                  |
                    +--> [Compare Water Saving] -------+
```

## Notes
- The app currently keeps domain rules and UI in the same component (`Home.js`), which works but makes maintenance harder as logic grows.
- A future refactor could extract pure calculation utilities into `src/lib/` and keep `Home.js` focused on UI orchestration.
