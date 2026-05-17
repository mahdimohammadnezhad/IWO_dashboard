# Calculation Guide and Formulas

This document explains how calculations are implemented in `src/Home/Home.js`.

## 1) Core Inputs and Symbols
- `ETm`: Evapotranspiration for maximum yield (mm)
- `Ym`: Maximum expected yield (tons/ha)
- `Ky`: Yield response factor (crop-specific)
- `ECi`: Crop salinity threshold/tolerance parameter (crop-specific)
- `ECw`: Irrigation water salinity (dS/m)
- `IE`: Irrigation efficiency as fraction (`IE% / 100`)
- `W`: Total water available for irrigation (mm)
- `k`, `m`: Soil/irrigation coefficients used in SALEACH-style leaching estimate

Crop-specific values (`Ky`, `ECi`, default `ETm`, default `Ym`) are selected from hardcoded lookup blocks.

## 2) Defaulting Rules
- If irrigation water salinity is not entered: `ECw = 1.2` dS/m
- If irrigation efficiency is not entered: default depends on irrigation type.
  - Flood: `68%`
  - Basin: `83%`
  - Border: `73%`
  - Furrow: `73%`
  - Sprinkler permanent: `78%`
  - Hand-move: `70%`
  - Linear-move: `82%`
  - Side-roll: `70%`
  - Micro-mini: `81%`
  - Hose-pull: `73%`
  - Center-pivot: `80%`
  - Drip: `86%`

## 3) Leaching Requirement (Standard)
Implemented as:

```text
LR = ECw / (5*ECi - ECw)
```

Displayed as percent:

```text
LR% = 100 * LR
```

## 4) Leaching Requirement (SALEACH-style in app)
Using selected `k` and `m` coefficients:

```text
SLR = ECw / ( (2/(k*m))*ECi - ECw )
SLR% = 100 * SLR
```

## 5) Irrigation Water Demand Breakdown
The app computes:

```text
ET component           = ETm
IWR (total required)   = ETm / ( IE * (1 - LR) )
IE water loss component= IWR - IWR*IE
LR water component     = IWR - ETm - (IWR - IWR*IE)
```

Mapped in chart as:
- `ET` = `ETm`
- `IWR` = total required water
- `IEw` = irrigation efficiency related loss
- `LRw` = leaching water requirement part

## 6) Yield Under Available Water
Water available to crop after efficiency and salinity/leaching adjustment:

```text
ETa = W * IE * (1 - LR)
```

Yield relationship used by app:

```text
Ya = Ym * ( Ky * (ETa/ETm - 1) + 1 )
```

With cap:

```text
if Ya > Ym then Ya = Ym
```

## 7) Deficit Irrigation Yield Reduction
For deficit levels 10% to 50%, app uses:

```text
D10 = Ky * (1 - 0.9*ETm/ETm) = 0.1*Ky
D20 = Ky * (1 - 0.8*ETm/ETm) = 0.2*Ky
D30 = Ky * (1 - 0.7*ETm/ETm) = 0.3*Ky
D40 = Ky * (1 - 0.6*ETm/ETm) = 0.4*Ky
D50 = Ky * (1 - 0.5*ETm/ETm) = 0.5*Ky
```

Displayed as percent yield reduction.

## 8) Profit Calculation
For crop price `P` ($/ton) and production cost `PC` ($/ha):

```text
Revenue = Ya * P
Profit  = Revenue - PC
```

## 9) Water Saving Potential
Required water to satisfy ET + IE + leaching:

```text
Wreq = ETm / ( IE * (1 - LR) )
```

Water saving potential ratio:

```text
WSP = (W - Wreq) / W
WSP% = 100 * WSP
```

In implementation, if `WSP < 0`, it is clipped to `0` for comparison output.

## 10) Compare Modes
The app compares up to five crops using the same core formulas:
- `Compare Yield`: ranks by `Ya`
- `Compare Profit`: ranks by `Profit`
- `Compare Water Saving Potential`: ranks by `WSP%`

## 11) Validation Ranges Used
- Water available (`W`): `0` to `5500` mm
- Water salinity (`ECw`): `0` to `2` dS/m
- Irrigation efficiency (`IE%`): `50` to `100`
- `ETm` checks in advanced compare section: `100` to `2000` mm
- Crop expected yield ranges are crop-specific (hardcoded per crop)
