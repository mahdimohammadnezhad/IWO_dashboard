# IMT-Desert: Irrigation Management Tool for Southern California Desert Region

IMT-Desert is a decision-support application for irrigation planning and crop selection. It helps growers evaluate crop water requirements, expected yield, profit, and water-saving potential under salinity and irrigation-efficiency constraints.

The current implementation includes two engines:

- Yield Recommendation Engine (single-crop analysis)
- Multi-Crop Optimization Engine (compare up to 5 crops)

## Project Scope

The tool is designed around major crops grown in Imperial County, California, with crop-specific parameters for:

- Yield response factor (`ky`)
- Maximum evapotranspiration (`ETm`)
- Maximum expected yield (`Ym`)
- Salinity threshold (`ECt`/`ECe*`)
- Crop price defaults

Core user inputs include:

- Water available for irrigation
- Irrigation water salinity
- Soil texture
- Irrigation system and efficiency
- Crop-specific economic inputs (price and production cost)

## What the Tool Produces

### Part 1: Yield Recommendation Engine

- Maximum expected yield
- Leaching requirement using:
  - Standard method
  - SALEACH-based method
- Irrigation water demand breakdown:
  - `LRw` (leaching water)
  - `ET`
  - `IEw`
  - `IWR`
- Deficit irrigation yield-reduction chart

### Part 2: Multi-Crop Optimization Engine

- Crop-by-crop projected yield
- Crop-by-crop projected profit
- Water-saving potential comparison
- Scenario-based irrigation management tip per crop
- Optional AI strategic report (`/api/ai/tips`)

## Technical Stack

- Frontend: React + TypeScript + Vite + Tailwind CSS
- Charts: Highcharts
- Backend/API: Express (`server.ts`)
- AI integration: `@google/genai`

## Project Structure

```text
IMT-Desert/
  src/
    components/
      PartOne.tsx
      PartTwo.tsx
    lib/
      irrigationCalc.ts
  docs/
    ARCHITECTURE.md
    CALCULATION_PARAMETERS.md
    FORMULAS.md
  server.ts
```

## Local Development

Prerequisites:

- Node.js 20+

Steps:

1. Install dependencies:
   `npm install`
2. Configure environment:
   create `.env.local` and set `GEMINI_API_KEY=<your_key>`
3. Start development server:
   `npm run dev`
4. Build production bundle:
   `npm run build`
5. Run production server:
   `npm run start`

## Methodology and Data Notes

- Crop, soil, and irrigation parameters are implemented in `src/lib/irrigationCalc.ts`.
- Leaching and irrigation demand logic follow the equations described in the project document `doc/IWO_extension3.docx`.
- Crop price defaults are based on USDA and California agriculture overview sources (see references).

## Documentation

- Architecture details: `docs/ARCHITECTURE.md`
- Parameters and ranges: `docs/CALCULATION_PARAMETERS.md`
- Equations and flowcharts: `docs/FORMULAS.md`

## How to Cite This Tool

Use the following citation format:

`IMT-Desert Team. (2026). IMT-Desert: Irrigation Management Tool for Southern California Desert Region (Version 1.0) [Software]. University of California, Riverside.`

If you publish results produced with this tool, also cite the methodological references listed below (especially Doorenbos and Kassam, 1979; and Shahrokhnia and Wu, 2021).

## References

- Allen, R.G., Pereira, L.S., Raes, D., and Smith, M. 1998. Crop evapotranspiration: Guidelines for computing crop water requirements. FAO Irrigation and Drainage Paper 56.
- Doorenbos, J., and Kassam, A.H. 1979. Yield Response to Water. FAO Irrigation and Drainage Paper 33.
- English, M. 1990. Deficit Irrigation. I: Analytical Framework. Journal of Irrigation and Drainage Engineering 116(3):399-412.
- Scanlon, B.R., Faunt, C.C., Longuevergne, L., Reedy, R.C., Alley, W.M., McGuire, V.L., et al. 2012. Groundwater depletion and sustainability of irrigation in the US High Plains and Central Valley. Proceedings of the National Academy of Sciences 109:9320-9325.
- Shahrokhnia, H., and Wu, L. 2021. SALEACH: A new web-based soil salinity leaching model for improved irrigation management. Agricultural Water Management 252:106905. https://doi.org/10.1016/j.agwat.2021.106905
- Tanji, K.K., and Kielen, N.C. 2002. Agricultural drainage water management in arid and semi-arid areas. FAO Irrigation and Drainage Paper 61.
- Varzi, M.M. 2016. Crop water production functions: A review of available mathematical methods. Journal of Agricultural Science 8:76.

Data source links:

- 2021 California State Agriculture Overview: https://www.nass.usda.gov/Quick_Stats/Ag_Overview/stateOverview.php?state=CALIFORNIA
- USDA crop prices report: https://www.nass.usda.gov/Publications/Todays_Reports/reports/agpr0721.pdf
- SALEACH salinity model portal: https://salinity.ucr.edu/Sindex.html
- UC Davis soil map: https://casoilresource.lawr.ucdavis.edu/gmap/
