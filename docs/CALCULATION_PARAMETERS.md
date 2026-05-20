# IMT-Desert Calculation Parameters

## 1) Parameter Dependency Diagram (ASCII)

```text
                +---------------------+
                | cropData            |
                | ky, eci, etm, ym... |
                +----------+----------+
                           |
                           v
 +-------------+   +-------+--------+   +------------------+
 | soilData    +-->+ formulas/core  +<--+ irrigationSystems|
 | m_group1/2  |   | calculations   |   | ie_default, k     |
 +------+------+   +-------+--------+   +---------+--------+
        ^                    ^                      ^
        |                    |                      |
        +--------- user inputs + defaults ----------+
```

## 2) Global Input Parameters

| Parameter | Meaning | Unit | Used In | Default | Validation |
|---|---|---|---|---|---|
| `selectedCrop` / `cropId` | Selected crop ID | id | PartOne, PartTwo | required for row | must be selected |
| `waterSalinity` (`ecw`) | Irrigation water salinity | dS/m | PartOne, PartTwo | `1.2` | PartOne: `0..2` |
| `selectedSoil` | Soil texture ID | id | PartOne | `5` (Sandy Loam) | none in code |
| `selectedIrrigation` | Irrigation system ID | id | PartOne, PartTwo | `1` (Flood) | none in code |
| `irrigationEfficiency` (`ieRaw`) | Field irrigation efficiency | % | PartOne, PartTwo | system `ie_default` | PartOne: `50..100` |
| `waterAvailable` (`wa`) | Available irrigation water | mm | PartTwo | required | `0..5500` |
| `ym` | Maximum expected yield | t/ha | PartTwo row | crop default | none in code |
| `etm` | Crop ET for max yield | mm | PartTwo row | crop default | none in code |
| `price` | Crop price | $/t | PartTwo row | crop default | none in code |
| `cost` | Production cost | $/ha | PartTwo row | `0.2 * price * ym` | none in code |

## 3) Crop Parameters (`cropData`)

| Crop | id | `ky` | `eci` (dS/m) | `etm` (mm) | `ym` (t/ha) | `price` ($/t) | `min_ym` | `max_ym` |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Alfalfa | 1 | 1.00 | 2.0 | 1500 | 23 | 209.00 | 15 | 30 |
| Sugar beets | 2 | 0.85 | 7.0 | 1050 | 120 | 147.00 | 100 | 140 |
| Wheat | 3 | 1.05 | 6.0 | 620 | 7.5 | 288.00 | 5 | 10 |
| Bermuda Grass | 4 | 0.90 | 6.9 | 1300 | 19 | 200.00 | 15 | 25 |
| Klein Grass | 5 | 0.90 | 4.0 | 1350 | 24 | 200.00 | 20 | 30 |
| Sudan Grass | 6 | 0.90 | 2.8 | 800 | 14 | 200.00 | 10 | 20 |
| Lettuce | 7 | 1.15 | 1.3 | 320 | 20 | 683.93 | 10 | 30 |
| Carrots | 8 | 1.10 | 1.0 | 600 | 110 | 464.29 | 90 | 130 |
| Broccoli | 9 | 1.00 | 2.8 | 350 | 15 | 919.64 | 10 | 20 |
| Onion | 10 | 1.10 | 1.2 | 800 | 60 | 503.57 | 50 | 70 |
| Spinach | 11 | 1.15 | 2.0 | 200 | 14 | 1237.50 | 10 | 20 |
| Sweet Corn | 12 | 1.10 | 1.7 | 600 | 27 | 1482.14 | 20 | 40 |

## 4) Soil Parameters (`soilData`)

`m` is selected by crop group:

- Group 1 crops: ids `[1,2,3,4,5,6,10]` -> use `m_group1`
- Other crops -> use `m_group2`

| Soil | id | `m_group1` | `m_group2` |
|---|---:|---:|---:|
| Sand | 1 | 0.1575 | 0.1795 |
| Sand-Fine | 2 | 0.1114 | 0.1274 |
| Loamy Sand | 3 | 0.2020 | 0.2300 |
| Loamy Sand- Fine | 4 | 0.1964 | 0.2244 |
| Sandy Loam | 5 | 0.2390 | 0.2730 |
| Sandy Loam- Fine | 6 | 0.2736 | 0.3116 |
| Loam | 7 | 0.3760 | 0.4280 |
| Silt | 8 | 0.4129 | 0.4709 |
| Silty Loam | 9 | 0.4050 | 0.4610 |
| Sandy Clay Loam | 10 | 0.3236 | 0.3676 |
| Clay Loam | 11 | 0.3971 | 0.4511 |
| Silty Clay Loam | 12 | 0.4031 | 0.4591 |
| Sandy Clay | 13 | 0.3855 | 0.4375 |
| Silty Clay | 14 | 0.4109 | 0.4669 |
| Silty | 15 | 0.4290 | 0.4870 |

## 5) Irrigation System Parameters (`irrigationSystems`)

| System | id | `ie_default` (%) | `k` | `clz` |
|---|---:|---:|---:|---:|
| Flood | 1 | 68 | 0.682 | 100 |
| Basin | 2 | 83 | 0.682 | 100 |
| Border | 3 | 73 | 0.682 | 100 |
| Furrow | 4 | 73 | 0.682 | 85 |
| Sprinkler Permanent | 5 | 78 | 0.769 | 100 |
| Hand-Move | 6 | 70 | 0.769 | 100 |
| Linear-Move | 7 | 82 | 0.769 | 100 |
| Side-Roll | 8 | 70 | 0.769 | 100 |
| Micro-Mini | 9 | 81 | 0.769 | 100 |
| Hose-Pull | 10 | 73 | 0.769 | 100 |
| Center-Pivot | 11 | 80 | 0.769 | 100 |
| Drip | 12 | 86 | 0.883 | 40 |

## 6) Output Metrics

| Output | Meaning | Unit | Produced By |
|---|---|---|---|
| `ym` | Maximum expected yield | t/ha | PartOne |
| `lrStandardPct` | Standard leaching requirement | % | PartOne |
| `lrSaleachPct` | SALEACH leaching requirement | % | PartOne |
| `LRw`, `ET`, `IEw`, `IWR` | Irrigation water demand components | mm | PartOne |
| `deficit.reduction` | Yield reduction under 10-50% deficit | % | PartOne |
| `yield` | Projected yield by crop | t/ha | PartTwo |
| `profit` | Projected profit by crop | $/ha | PartTwo |
| `water` | Water saving potential | % | PartTwo |
| `tip` | Rule-based irrigation tip | text | PartTwo |
| `aiTip` | AI-generated strategic report | markdown | PartTwo + API |
