# IMT-Desert Improvement Recommendations

## Purpose

This document proposes practical improvements for IMT-Desert and a feature roadmap that builds on the current architecture (React + TypeScript frontend, Express API backend, local agronomic datasets).

## 1) High-Impact Improvements (Short Term)

1. Strengthen input validation in Part 2.
- Add salinity range validation (`0..2 dS/m`) and irrigation efficiency validation (`50..100%`) to match Part 1 behavior.
- Prevent invalid values from entering calculations and show clear inline error messages.

2. Fix edge-case calculation robustness.
- Clamp yield lower bound in Part 2 (`ya = max(0, ya)`) for severe deficit cases.
- Guard divide-by-zero when `waterAvailable = 0` in any water-saving metric or AI context payload.

3. Improve transparency of assumptions.
- Show a compact "Assumptions used" panel per result (defaults for price/cost, selected method for LR, and data source/version date).
- Add formula tooltips near key outputs so users can trace how each value is computed.

4. Reconcile agronomic parameter consistency.
- Audit crop `ETm`, price defaults, and other constants against the selected source version.
- Keep a changelog table in docs that records each parameter update and source citation.

## 2) Product/UX Improvements

1. Add scenario save/load.
- Let users save a full scenario (inputs + crop list + notes) as JSON and reload it later.
- Include an optional scenario name and timestamp.

2. Add units helper for water input.
- Include acre-feet to mm converter next to `waterAvailable` input.
- Display both units in context text to reduce entry mistakes.

3. Make comparison outputs easier to interpret.
- Add "Best crop by profit", "Best crop by water efficiency", and "Best balanced option" badges.
- Add sensitivity mini-chart for each crop (profit change versus water availability).

4. Export quality upgrades.
- Add one-click PDF report export that includes inputs, charts, and recommendations.
- Keep CSV export for machine-readable workflows.

## 3) New Features to Add

1. Uncertainty and risk mode.
- Allow users to define optimistic/normal/pessimistic ranges for yield, price, and salinity.
- Compute risk-aware outputs (expected value + downside risk indicator).

2. Weather-aware irrigation adjustment.
- Integrate short-term forecast inputs (ET forecast, precipitation, heat waves) and adjust recommended irrigation schedule.
- Extend AI report to reference forecast-driven actions.

3. Field-level portfolio planner.
- Support multiple fields with different soil textures and water allocations.
- Output a whole-farm recommendation (total water split, expected profit, and aggregate risk).

4. Seasonal planning timeline.
- Add month-by-month irrigation and expected yield/profit timeline.
- Enable "what-if" comparisons across planting windows.

5. Data import integration.
- Add spreadsheet import template for crop and cost inputs.
- Validate imported records and provide row-level error feedback.

## 4) Technical Improvements

1. Calculation engine refactor.
- Move core math for Part 1 and Part 2 into reusable `src/lib` modules with shared validation.
- Reduce duplicated formulas in UI components.

2. Test coverage expansion.
- Add unit tests for all formula functions and edge cases.
- Add integration tests for representative scenarios (normal, low water, high salinity).

3. API reliability and observability.
- Add structured logging for `/api/ai/tips` requests and failures.
- Add timeout/retry strategy and friendly fallback messaging when AI service is unavailable.

4. Configuration and data governance.
- Externalize crop parameters to a versioned JSON file or data layer.
- Add schema validation to catch missing or malformed parameter values at startup.

## 5) Suggested Roadmap

### Phase 1 (2-3 weeks): Stability + Trust
- Part 2 validation parity with Part 1
- Edge-case guards and yield clamping
- Parameter audit and assumptions panel
- Basic formula unit tests

### Phase 2 (3-5 weeks): Workflow Efficiency
- Scenario save/load
- Acre-feet converter
- Enhanced badges/summaries
- PDF export

### Phase 3 (5-8 weeks): Decision Intelligence
- Uncertainty/risk mode
- Weather-aware recommendations
- Field-level portfolio planner
- Seasonal timeline

## Success Metrics

1. Fewer invalid-input calculation failures.
2. Reduced time-to-decision per scenario.
3. Higher user confidence in recommendations (transparency + reproducibility).
4. Increased repeat usage through scenario persistence and richer planning features.
