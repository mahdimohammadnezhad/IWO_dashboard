# IMT-Desert Formulas

## 1) Notation

| Symbol | Description | Unit |
|---|---|---|
| `ecw` | irrigation water salinity | dS/m |
| `eci` | crop threshold salinity parameter | dS/m |
| `k` | irrigation-system coefficient (SALEACH) | dimensionless |
| `m` | soil/crop-group coefficient (SALEACH) | dimensionless |
| `ieRaw` | irrigation efficiency input | % |
| `ie` | irrigation efficiency in decimal form (`ieRaw / 100`) | fraction |
| `etm` | evapotranspiration at max yield | mm |
| `ym` | maximum expected yield | t/ha |
| `ky` | yield response factor | dimensionless |
| `wa` | water available for irrigation | mm |
| `ya` | projected actual yield | t/ha |
| `AIW3` | required applied irrigation water | mm |
| `eta` | actual evapotranspiration proxy used in code | mm |

## 2) PartOne Formulas (Yield Recommendation Engine)

### 2.1 Standard Leaching Requirement

```text
LR_standard = ecw / (5 * eci - ecw)
```

### 2.2 SALEACH Leaching Requirement

```text
LR_saleach = ecw / ( (2 / (k * m)) * eci - ecw )
```

### 2.3 Irrigation Water Requirement Breakdown

```text
IWR = etm / ( ie * (1 - LR_standard) )
IEw = IWR - IWR * ie
LRw = IWR - etm - IEw
```

### 2.4 Deficit Irrigation Yield Reduction

Code computes factors `[0.9, 0.8, 0.7, 0.6, 0.5]`:

```text
reduction_pct(f) = ky * (1 - (f * etm) / etm) * 100
                 = ky * (1 - f) * 100
```

Mapped results:

- 10% deficit -> `f = 0.9`
- 20% deficit -> `f = 0.8`
- 30% deficit -> `f = 0.7`
- 40% deficit -> `f = 0.6`
- 50% deficit -> `f = 0.5`

## 3) PartOne Flowchart (ASCII)

```text
 [Inputs]
   crop, ecw, soil, system, ieRaw
      |
      v
 [Defaults + validation]
      |
      v
 [Lookup params]
   ky, eci, etm, ym, k, m
      |
      v
 [Compute]
   LR_standard
   LR_saleach
   IWR, IEw, LRw
   deficit reductions
      |
      v
 [Render + Export]
```

## 4) PartTwo Formulas (Multi-Crop Optimization Engine)

For each selected crop row:

### 4.1 Leaching and Required Water

```text
LR   = ecw / (5 * eci - ecw)
AIW3 = etm / ( ie * (1 - LR) )
```

### 4.2 ETA branch and Yield

```text
if wa > AIW3:
    eta = wa * ie * (1 - LR)
else:
    eta = wa * ie

ya = ym * ( ky * (eta / etm - 1) + 1 )
```

Post-processing guards in code:

```text
if ya > ym: ya = ym
if wa == 0: ya = 0
```

### 4.3 Economics

```text
revenue = ya * price
profit  = revenue - cost
```

### 4.4 Water Saving Potential

```text
wsp = (wa - AIW3) / wa
if wa == 0: wsp = 0
if wsp < 0: wsp = 0
water_saving_pct = wsp * 100
```

## 5) PartTwo Rule-Based Tip Logic (ASCII Decision Tree)

```text
                         +---------------------+
                         | compare wa, ie, etm |
                         | and wa vs AIW3      |
                         +----------+----------+
                                    |
      +-----------------------------+------------------------------+
      |                                                            |
 (wa * ie) < etm ?                                             no
      |                                                            |
      v                                                            v
 "yield reduction likely"                              (wa * ie > etm) and (wa < AIW3) ?
                                                                   |
                                                           +-------+-------+
                                                           |               |
                                                          yes              no
                                                           |               |
                                                           v               v
                                         "not enough for leaching"   |wa - AIW3| < 0.1 ?
                                                                               |
                                                                       +-------+-------+
                                                                       |               |
                                                                      yes              no
                                                                       |               |
                                                                       v               v
                                                   "max yield achievable"       wa > AIW3 ?
                                                                                       |
                                                                               +-------+-------+
                                                                               |               |
                                                                              yes              no
                                                                               |               |
                                                                               v               v
                                                "<pct>% water can be conserved"        ""
```

## 6) End-to-End Computational Pipeline (ASCII)

```text
               +-------------------+
               | user inputs       |
               +---------+---------+
                         |
                         v
               +---------+---------+
               | defaults/validation|
               +---------+---------+
                         |
                         v
               +---------+---------+
               | static datasets   |
               | crop/soil/system  |
               +---------+---------+
                         |
                         v
               +---------+---------+
               | formulas engine   |
               +---------+---------+
                         |
                         v
               +---------+---------+
               | UI outputs/charts |
               +-------------------+
```
