# IMT-Desert Calculation/Formula Examination Summary

This review checks how the current implementation aligns with the methodology and equations described in `doc/IWO_extension3.docx`.

Reviewed code:

- `IMT-Desert/src/lib/irrigationCalc.ts`
- `IMT-Desert/src/components/PartOne.tsx`
- `IMT-Desert/src/components/PartTwo.tsx`
- `IMT-Desert/server.ts` (AI tip endpoint only)

## Overall Assessment

- Core irrigation/yield formulas are implemented and connected to UI outputs.
- Part 1 (single-crop recommendation) aligns well with the document equations.
- Part 2 (multi-crop optimization) mostly aligns, but has some validation and edge-case gaps.
- A few document-described items are missing or only partially implemented.

## Equation Implementation Checklist

- [x] Eq. (1) yield relation (`Ya`, `Ym`, `ky`, `ETa/ETm`) implemented in Part 2.
  - Reference: `src/components/PartTwo.tsx` (`ya = ym * (c.ky * (eta / etm - 1) + 1)`).
- [x] Eq. (2) standard leaching requirement implemented.
  - Reference: `src/lib/irrigationCalc.ts` (`calculateLeachingRequirement`).
- [x] Eq. (3) SALEACH-style LR implemented with `k` and `m`.
  - Reference: `src/lib/irrigationCalc.ts` (`calculateSALEACHRequirement`).
- [x] Eq. (4) irrigation water requirement (`IW3`/`IWR`) implemented.
  - Reference: `src/components/PartOne.tsx` (`iwr = etm / (ie * (1 - lrStandard))`).
- [x] Eq. (5) `ET = ETm` reflected in Part 1 water-demand breakdown.
- [x] Eq. (6) `IEw = IW3 - (IW3 * IE)` implemented.
- [x] Eq. (7) `LRw = IW3 - ET - IEw` implemented.
- [x] Eq. (8) `IWR = IEw + ET + LRw` implemented by decomposition and display.
- [x] Eq. (9) profit equation implemented (`profit = revenue - cost`).
- [x] Eq. (10) revenue equation implemented (`revenue = yield * price`).
- [x] Eq. (11) water saving potential implemented.
  - Reference: `src/components/PartTwo.tsx` (`wsp = (wa - aiw3) / wa`, clamped to `>= 0` for displayed graph value).

## Feature/Logic Checklist vs Document

- [x] Crop-specific recommendation workflow implemented (Part 1).
- [x] Multi-crop comparison workflow implemented for up to 5 crops (Part 2).
- [x] Defaults implemented:
  - `ecw = 1.2`
  - default irrigation system = Flood
  - default irrigation efficiency from selected system
  - default cost in Part 2 = 20% of revenue
- [x] Part 1 range checks implemented:
  - salinity `0..2 dS/m`
  - irrigation efficiency `50..100%`
- [x] Part 2 water-availability check implemented (`0..5500 mm`).
- [x] Scenario-based irrigation tips implemented (4-case style logic).
- [x] CSV export implemented for Part 1 and Part 2 outputs.
- [x] Chart outputs implemented for yield/profit/water and water-demand/deficit charts.

## Partial / Missing Items

- [ ] Acre-feet to mm conversion helper/UI is not implemented.
  - Document describes this conversion for user guidance in optimization workflow.
- [ ] Part 2 does not validate salinity range (`0..2`) or irrigation-efficiency range (`50..100`) like Part 1.
- [ ] Part 2 does not clamp negative `ya` values for severe deficit cases (`wa > 0` but very low).
  - Current code clamps `ya` only at upper bound (`ya <= ym`) and zero only when `wa == 0`.
- [ ] `comparisonContext.waterSavingPct` can divide by zero when `wa == 0`.
  - Display graph value is guarded; AI context value is not.
- [ ] `clz` exists in irrigation system data but is not used in any current equation path.
  - Could be intentional if `k` already encodes irrigation-type effect, but currently unused in code.
- [ ] Some numeric table values differ from `IWO_extension3.docx` tables:
  - `ETm` for Bermuda Grass and Klein Grass differ from the extracted table values in the document.
  - Wheat price in code is rounded vs table value.
- [ ] The document states warnings for out-of-range random inputs in general; in practice, robust range validation is mainly in Part 1 and `waterAvailable` in Part 2.

## Notes on Alignment Quality

1. Part 1 is the strongest alignment area (formulas + outputs + validations).
2. Part 2 follows the document logic pattern well for yield/profit/water/tips, but needs tighter validation and edge-case handling to be fully consistent and robust.
3. The implementation includes useful extensions not central to formula docs (AI strategic report endpoint/UI).

## Recommended Follow-Up Checklist

- [ ] Add Part 2 validation for salinity and irrigation efficiency ranges.
- [ ] Add non-negative lower bound clamp for `ya` (`ya = max(0, ya)`).
- [ ] Fix divide-by-zero in `comparisonContext.waterSavingPct`.
- [ ] Decide whether to use/remove `clz` to avoid ambiguity.
- [ ] Reconcile parameter table values (especially `ETm`) with the source document and cite the chosen source/version.
- [ ] Optionally add acre-feet to mm converter near `waterAvailable` input.
