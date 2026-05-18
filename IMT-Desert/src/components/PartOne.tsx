import React, { useState } from "react";
import {
  cropData,
  soilData,
  irrigationSystems,
  calculateLeachingRequirement,
  calculateSALEACHRequirement,
  getMValue,
  calculateDeficitIrrigationYieldReduction,
} from "../lib/irrigationCalc";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import { Download, HelpCircle, X } from "lucide-react";

export default function PartOne() {
  const [selectedCrop, setSelectedCrop] = useState<number | "">("");
  const [waterSalinity, setWaterSalinity] = useState<number | "">("");
  const [selectedSoil, setSelectedSoil] = useState<number | "">("");
  const [selectedIrrigation, setSelectedIrrigation] = useState<number | "">("");
  const [irrigationEfficiency, setIrrigationEfficiency] = useState<number | "">(
    "",
  );
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    if (selectedCrop === "") {
      alert("Please select a crop.");
      return;
    }

    const crop = cropData.find((c) => c.value === Number(selectedCrop))!;

    // Defaults
    const ecw = waterSalinity !== "" ? Number(waterSalinity) : 1.2;
    if (ecw < 0 || ecw > 2) {
      alert("Irrigation water salinity should be between 0 and 2 dS/m.");
      return;
    }

    const sys =
      irrigationSystems.find((s) => s.value === Number(selectedIrrigation)) ||
      irrigationSystems[0];
    const ieRaw =
      irrigationEfficiency !== ""
        ? Number(irrigationEfficiency)
        : sys.ie_default;

    if (ieRaw < 50 || ieRaw > 100) {
      alert("Irrigation Efficiency should be between 50% and 100%.");
      return;
    }
    const ie = ieRaw / 100;

    const soilId = selectedSoil !== "" ? Number(selectedSoil) : 5; // default Sandy Loam

    const m = getMValue(crop.value, soilId);

    // Leaching Requirements
    const lrStandard = calculateLeachingRequirement(ecw, crop.eci);
    const lrSaleach = calculateSALEACHRequirement(ecw, crop.eci, sys.k, m);

    // IWR breakdown
    const etm = crop.etm;
    const iwr = etm / (ie * (1 - lrStandard));
    const iew = iwr - iwr * ie;
    const lrw = iwr - etm - iew;

    const deficitReductions = calculateDeficitIrrigationYieldReduction(
      crop.ky,
      etm,
    );

    setResults({
      ym: crop.ym,
      lrStandardPct: (lrStandard * 100).toFixed(2),
      lrSaleachPct: (lrSaleach * 100).toFixed(2),
      iwrDemand: [
        { name: "LRw", value: Number(lrw.toFixed(0)) },
        { name: "ET", value: Number(etm.toFixed(0)) },
        { name: "IEw", value: Number(iew.toFixed(0)) },
        { name: "IWR", value: Number(iwr.toFixed(0)) },
      ],
      deficit: [
        { name: "10%", reduction: deficitReductions[0] },
        { name: "20%", reduction: deficitReductions[1] },
        { name: "30%", reduction: deficitReductions[2] },
        { name: "40%", reduction: deficitReductions[3] },
        { name: "50%", reduction: deficitReductions[4] },
      ],
    });
  };

  const exportCsv = () => {
    if (!results) return;
    let csvContent = "data:text/csv;charset=utf-8,Metric,Value\n";
    csvContent += `Maximum Yield (t/ha),${results.ym}\n`;
    csvContent += `Leaching Requirement Standard (%),${results.lrStandardPct}\n`;
    csvContent += `Leaching Requirement SALEACH (%),${results.lrSaleachPct}\n`;
    csvContent += `LRw (mm),${results.iwrDemand.find((d: any) => d.name === "LRw")?.value}\n`;
    csvContent += `ET (mm),${results.iwrDemand.find((d: any) => d.name === "ET")?.value}\n`;
    csvContent += `IEw (mm),${results.iwrDemand.find((d: any) => d.name === "IEw")?.value}\n`;
    csvContent += `IWR (mm),${results.iwrDemand.find((d: any) => d.name === "IWR")?.value}\n\n`;
    csvContent += "Deficit Irrigation (%),Yield Reduction (%)\n";
    results.deficit.forEach((d: any) => {
      csvContent += `${d.name.replace("%", "")},${d.reduction}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "crop_recommendation.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportChart = (elementId: string, filename: string) => {
    const node = document.getElementById(elementId);
    if (!node) return;
    htmlToImage
      .toPng(node, { backgroundColor: "#ffffff" })
      .then((dataUrl) => {
        download(dataUrl, filename);
      })
      .catch((error) => {
        console.error("Error exporting chart!", error);
      });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
              Crop-specific Parameters
            </h2>
            <button
              onClick={() => setIsHelpOpen(!isHelpOpen)}
              className="text-slate-400 hover:text-emerald-600 transition-colors"
              title="Toggle Help"
            >
              <HelpCircle size={18} />
            </button>
          </div>
          <button
            onClick={() => {
              setSelectedCrop("");
              setWaterSalinity("");
              setSelectedSoil("");
              setSelectedIrrigation("");
              setIrrigationEfficiency("");
              setResults(null);
            }}
            className="text-[10px] uppercase font-bold text-slate-400 hover:text-emerald-600"
          >
            Clear Inputs
          </button>
        </div>

        {isHelpOpen && (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6 relative">
            <button
              onClick={() => setIsHelpOpen(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600"
            >
              <X size={16} />
            </button>
            <h3 className="font-semibold text-sm text-slate-800 mb-2">
              How to use this tool
            </h3>
            <div className="text-xs text-slate-600 space-y-2 leading-relaxed max-w-4xl">
              <p>
                Select a crop and click on the button below to find out the
                maximum yield and irrigation water requirements.
              </p>
              <p>
                If known, users are encouraged to enter the salinity of
                irrigation water, soil type, and irrigation system/ efficiency
                to obtain the results for the actual scenario. If not known, the
                default irrigation water salinity, soil texture and irrigation
                efficiency used are 1.2dS/m, sandy loam type, and 68% (for flood
                irrigation system), respectively.
              </p>
              <p>
                Leaching requirements are calculated using two methods (the
                standard method and the SALEACH method). For irrigation water
                demand, the leaching requirements based on the standard method
                are considered. Deficit irrigation graph shows the % of the
                maximum yield that might be reduced if the deficit irrigation is
                practiced by 10-50%.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
              Crop *
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            >
              <option value="">Select Crop...</option>
              {cropData.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
              Salinity (dS/m)
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="e.g. 1.2"
              value={waterSalinity}
              onChange={(e) => setWaterSalinity(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-sm font-mono focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase mb-1 flex items-center justify-between">
              <span>Soil Texture</span>
              <a
                href="https://casoilresource.lawr.ucdavis.edu/gmap/"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-600 hover:underline normal-case lowercase text-[9px] font-medium"
              >
                (look up soil map)
              </a>
            </label>
            <select
              value={selectedSoil}
              onChange={(e) => setSelectedSoil(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            >
              <option value="">Select Soil...</option>
              {soilData.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
              System
            </label>
            <select
              value={selectedIrrigation}
              onChange={(e) => setSelectedIrrigation(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            >
              <option value="">Select System...</option>
              {irrigationSystems.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
              Efficiency (%)
            </label>
            <input
              type="number"
              step="1"
              placeholder="e.g. 68"
              value={irrigationEfficiency}
              onChange={(e) => setIrrigationEfficiency(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-sm font-mono focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="bg-slate-800 text-white py-2.5 px-6 rounded font-bold hover:bg-slate-700 transition-all flex items-center justify-center gap-2 md:w-auto"
        >
          Calculate Estimates
        </button>
      </div>

      {results && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-700 mt-6">
          <div className="col-span-1 lg:col-span-2 flex justify-end mb-[-1rem]">
            <button
              onClick={exportCsv}
              className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 py-1.5 px-3 rounded flex items-center gap-1.5 font-medium transition-colors"
            >
              <Download size={14} /> Export Results (CSV)
            </button>
          </div>
          {/* Left Column */}
          <div className="space-y-6">
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-emerald-700 font-bold uppercase">
                  Maximum Expected Yield
                </span>
                <p className="text-emerald-900/60 text-xs mt-0.5">
                  Optimal conditions projection
                </p>
              </div>
              <div className="text-2xl font-bold text-emerald-900 font-mono">
                {results.ym}{" "}
                <span className="text-sm font-semibold opacity-60">t/ha</span>
              </div>
            </div>

            <div
              className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 relative"
              id="chart-deficit"
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-sm font-bold text-slate-800">
                  Deficit Irrigation Impact
                </h3>
                <button
                  onClick={() =>
                    exportChart("chart-deficit", "deficit_irrigation_chart.png")
                  }
                  className="text-slate-400 hover:text-emerald-600 transition-colors"
                  title="Export Chart"
                >
                  <Download size={16} />
                </button>
              </div>
              <p className="text-slate-500 text-[11px] mb-4">
                Yield reduction (% of max yield) vs Deficit
              </p>
              <div className="h-56 w-full -ml-3">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={{
                    chart: { type: "column", height: 224, backgroundColor: "transparent" },
                    title: { text: null },
                    credits: { enabled: false },
                    xAxis: {
                      categories: results.deficit.map((d: any) => d.name),
                      lineWidth: 0,
                      tickWidth: 0,
                      labels: { style: { color: "#64748B", fontSize: "11px" } }
                    },
                    yAxis: {
                      title: { text: null },
                      gridLineColor: "#E2E8F0",
                      gridLineDashStyle: "Dash",
                      labels: { style: { color: "#64748B", fontSize: "11px" } }
                    },
                    plotOptions: {
                      column: {
                        borderRadius: 4,
                        color: "#F59E0B"
                      }
                    },
                    legend: { enabled: false },
                    series: [{
                      name: "Yield Reduction (%)",
                      data: results.deficit.map((d: any) => d.reduction)
                    }]
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col">
            <div className="mb-6">
              <h3 className="text-sm font-bold text-slate-800 mb-3">
                Leaching Requirements
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="p-3 bg-slate-50 rounded border border-slate-100 flex flex-col justify-between">
                  <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">
                    Standard Method
                  </div>
                  <div className="text-xl font-bold text-slate-800 font-mono">
                    {results.lrStandardPct}%
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded border border-slate-100 flex flex-col justify-between">
                  <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">
                    SALEACH Method
                  </div>
                  <div className="text-xl font-bold text-slate-800 font-mono">
                    {results.lrSaleachPct}%
                  </div>
                </div>
              </div>
              <div className="text-[10px] text-slate-500 bg-slate-50 p-2 rounded border border-slate-100 flex items-start gap-2">
                <HelpCircle
                  size={14}
                  className="min-w-fit mt-0.5 text-emerald-600"
                />
                <span>
                  Want to know more about Leaching related Yield Reduction?
                  <a
                    href="https://salinity.ucr.edu/Sindex.html"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-600 hover:underline inline-flex items-center gap-0.5 ml-1"
                  >
                    Follow the link below -&gt; SALEACH
                  </a>
                </span>
              </div>
            </div>

            <div className="flex-1 min-h-[220px] relative" id="chart-iwr">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-sm font-bold text-slate-800">
                  Irrigation Water Demand
                </h3>
                <button
                  onClick={() =>
                    exportChart("chart-iwr", "irrigation_water_demand.png")
                  }
                  className="text-slate-400 hover:text-emerald-600 transition-colors"
                  title="Export Chart"
                >
                  <Download size={16} />
                </button>
              </div>
              <div className="h-56 w-full -ml-3">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={{
                    chart: { type: "bar", height: 224, backgroundColor: "transparent" },
                    title: { text: null },
                    credits: { enabled: false },
                    xAxis: {
                      categories: results.iwrDemand.map((d: any) => d.name),
                      lineWidth: 0,
                      tickWidth: 0,
                      labels: { style: { color: "#64748B", fontSize: "11px", fontWeight: "bold" } }
                    },
                    yAxis: {
                      title: { text: null },
                      gridLineColor: "#E2E8F0",
                      gridLineDashStyle: "Dash",
                      labels: { style: { color: "#64748B", fontSize: "11px" } }
                    },
                    plotOptions: {
                      bar: {
                        borderRadius: 4,
                        color: "#10B981"
                      }
                    },
                    legend: { enabled: false },
                    series: [{
                      name: "Demand (mm)",
                      data: results.iwrDemand.map((d: any) => d.value)
                    }]
                  }}
                />
              </div>
              <div className="text-[10px] text-slate-500 mt-2 flex flex-wrap gap-x-4 gap-y-1 bg-slate-50 p-2 rounded">
                <div>
                  <span className="font-bold text-slate-700">LRw:</span>{" "}
                  Leaching
                </div>
                <div>
                  <span className="font-bold text-slate-700">ET:</span> Max Evap
                </div>
                <div>
                  <span className="font-bold text-slate-700">IEw:</span>{" "}
                  Efficiency
                </div>
                <div>
                  <span className="font-bold text-slate-700">IWR:</span> Total
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
