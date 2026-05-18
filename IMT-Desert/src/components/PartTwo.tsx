import React, { useState } from "react";
import { cropData, irrigationSystems, getMValue } from "../lib/irrigationCalc";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  Plus,
  Trash2,
  Zap,
  Download,
  HelpCircle,
  X,
  Activity,
  Droplet
} from "lucide-react";
import Markdown from "react-markdown";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";

export default function PartTwo() {
  const [waterAvailable, setWaterAvailable] = useState<number | "">("");
  const [waterSalinity, setWaterSalinity] = useState<number | "">("");
  const [selectedIrrigation, setSelectedIrrigation] = useState<number | "">("");
  const [irrigationEfficiency, setIrrigationEfficiency] = useState<number | "">(
    "",
  );
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const [cropRows, setCropRows] = useState<any[]>([
    { id: Date.now(), cropId: "", ym: "", etm: "", price: "", cost: "" },
  ]);
  const [optResults, setOptResults] = useState<any[]>([]);
  const [activeChartTab, setActiveChartTab] = useState<
    "yield" | "profit" | "water"
  >("yield");
  const [comparisonContext, setComparisonContext] = useState<any[]>([]);

  const [aiTip, setAiTip] = useState<string>("");
  const [loadingAi, setLoadingAi] = useState(false);

  const getChartConfig = (tab: string) => {
    if (tab === "profit")
      return { title: "Profit ($/ha)", color: "#eab308", dataKey: "profit" };
    if (tab === "water")
      return {
        title: "Water Saving Potential (%)",
        color: "#06b6d4",
        dataKey: "water",
      };
    return {
      title: "Crop Yield (tons/ha)",
      color: "#84cc16",
      dataKey: "yield",
    };
  };

  const exportCsv = () => {
    if (!optResults || optResults.length === 0) return;

    let csvContent =
      "data:text/csv;charset=utf-8,Crop,Yield (t/ha),Profit ($/ha),Water Saving (%)\n";
    optResults.forEach((cd) => {
      csvContent += `${cd.name},${cd.yield},${cd.profit},${cd.water}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `optimization_results.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportChart = () => {
    const node = document.getElementById("part2-chart-container");
    if (!node) return;
    htmlToImage
      .toPng(node, { backgroundColor: "#ffffff" })
      .then((dataUrl) => {
        download(dataUrl, `optimization_chart_${activeChartTab}.png`);
      })
      .catch((error) => {
        console.error("Error exporting chart!", error);
      });
  };

  const addRow = () => {
    if (cropRows.length >= 5) {
      alert("You can compare up to 5 crops.");
      return;
    }
    setCropRows([
      ...cropRows,
      { id: Date.now(), cropId: "", ym: "", etm: "", price: "", cost: "" },
    ]);
  };

  const removeRow = (id: number) => {
    setCropRows(cropRows.filter((r) => r.id !== id));
  };

  const updateRow = (id: number, field: string, value: string) => {
    setCropRows(
      cropRows.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
    );
  };

  const autoFillRow = (id: number, cropIdStr: string) => {
    if (!cropIdStr) {
      updateRow(id, "cropId", "");
      return;
    }
    const cid = Number(cropIdStr);
    const c = cropData.find((x) => x.value === cid)!;
    setCropRows(
      cropRows.map((r) =>
        r.id === id
          ? {
              ...r,
              cropId: cid,
              ym: c.ym,
              etm: c.etm,
              price: c.price,
              cost: (c.price * c.ym * 0.2).toFixed(2), // default 20% of revenue
            }
          : r,
      ),
    );
  };

  const runOptimization = () => {
    if (waterAvailable === "") {
      alert("Please enter the total water available for irrigation.");
      return;
    }

    const wa = Number(waterAvailable);
    if (wa < 0 || wa > 5500) {
      alert("Total water available should be between 0 and 5500 mm.");
      return;
    }

    const ecw = waterSalinity !== "" ? Number(waterSalinity) : 1.2;
    const sys =
      irrigationSystems.find((s) => s.value === Number(selectedIrrigation)) ||
      irrigationSystems[0];
    const ieRaw =
      irrigationEfficiency !== ""
        ? Number(irrigationEfficiency)
        : sys.ie_default;
    const ie = ieRaw / 100;

    const data: any[] = [];
    const context: any[] = [];

    for (let i = 0; i < cropRows.length; i++) {
      const row = cropRows[i];
      if (!row.cropId) continue;
      const c = cropData.find((x) => x.value === Number(row.cropId))!;

      const ym = row.ym !== "" ? Number(row.ym) : c.ym;
      const etm = row.etm !== "" ? Number(row.etm) : c.etm;
      const price = row.price !== "" ? Number(row.price) : c.price;
      const cost = row.cost !== "" ? Number(row.cost) : price * ym * 0.2;

      // Core logic
      const lr = ecw / (5 * c.eci - ecw);
      const aiw3 = etm / (ie * (1 - lr));

      let eta = 0;
      let ya = 0;

      if (wa > aiw3) {
        eta = wa * ie * (1 - lr);
        ya = ym * (c.ky * (eta / etm - 1) + 1);
      } else {
        eta = wa * ie;
        ya = ym * (c.ky * (eta / etm - 1) + 1);
      }

      if (ya > ym) ya = ym;
      if (wa === 0) ya = 0;

      const valY = Number(ya.toFixed(1));
      const rev = ya * price;
      const valP = Number((rev - cost).toFixed(0));
      let wsp = (wa - aiw3) / wa;
      if (wa === 0) wsp = 0;
      if (wsp < 0) wsp = 0;
      const valW = Number((wsp * 100).toFixed(0));

    let tip = '';
    if ((wa * ie) < etm) {
      tip = `There may be yield reduction as deficit irrigation is practiced`;
    } else if ((wa * ie > etm) && (wa < aiw3)) {
      tip = `Not enough water for leaching. There could be yield reduction because of salinity build up.`;
    } else if (Math.abs(wa - aiw3) < 0.1) {
      tip = `Maximum yield could be achieved, since IE, ET and leaching requirements are fulfilled.`;
    } else if (wa > aiw3) {
      let pct = (((wa - aiw3) / wa) * 100).toFixed(1);
      tip = `${pct}% of the water can be conserved and still maximum yield could be obtained.`;
    }

    data.push({ name: c.label, yield: valY, profit: valP, water: valW, tip });

      context.push({
        crop: c.label,
        waterAvailable: wa,
        waterRequired: aiw3.toFixed(0),
        projectedYield: ya.toFixed(1),
        maxExpectedYield: ym,
        projectedProfit: (ya * price - cost).toFixed(0),
        waterSavingPct: (((wa - aiw3) / wa) * 100).toFixed(0),
      });
    }

    if (data.length === 0) {
      alert("Please select at least one crop.");
      return;
    }

    setOptResults(data);
    setComparisonContext(context);
    setAiTip(""); // Reset AI Tip
  };

  const getAiAdvisorReport = async () => {
    if (comparisonContext.length === 0) return;
    setLoadingAi(true);
    try {
      const res = await fetch("/api/ai/tips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comparisonData: comparisonContext,
          weatherForecast:
            "Currently experiencing warm temperatures, low rainfall.",
        }),
      });
      const json = await res.json();
      setAiTip(json.tip || "Failed to generate tip.");
    } catch (err: any) {
      setAiTip("Error contacting AI service.");
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="font-bold text-slate-800">
              Multi-Crop Optimization Engine
            </h2>
            <button
              onClick={() => setIsHelpOpen(!isHelpOpen)}
              className="text-slate-400 hover:text-emerald-600 transition-colors"
              title="Toggle Help"
            >
              <HelpCircle size={18} />
            </button>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            {waterAvailable && (
              <span className="bg-slate-100 px-2 py-1 rounded">
                Water Available: {waterAvailable} mm
              </span>
            )}
            {irrigationEfficiency && (
              <span className="bg-emerald-50 px-2 py-1 rounded border border-emerald-100 text-emerald-700">
                Efficiency: {irrigationEfficiency}%
              </span>
            )}
          </div>
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
                Enter the total water available for irrigation and select up to
                five crops to run the irrigation and crop optimization in terms
                of crop yield, profit and water saving potential while achieving
                the maximum yield. Irrigation efficiency, crop
                evapotranspiration and leaching requirements based on the water
                salinity are considered for the optimization.
              </p>
              <p>
                If known for the field, users can enter the irrigation water
                salinity and irrigation efficiency to obtain the results for the
                actual scenario. Else, the default values of irrigation water
                salinity and irrigation efficiency used are 1.2dS/m, and 68%
                (for flood irrigation system), respectively. For the selected
                crops, users are encouraged to use the maximum expected yield,
                evapotranspiration for the maximum yield, updated crop prices
                and site-specific production cost for accurate results.
              </p>
              <p>
                Crop prices from the USDA and the 2021 California state
                agriculture overview are used as default. (Sources -{" "}
                <a
                  href="https://www.nass.usda.gov/Publications/Todays_Reports/reports/agpr0721.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  link 1
                </a>{" "}
                ,{" "}
                <a
                  href="https://www.nass.usda.gov/Quick_Stats/Ag_Overview/stateOverview.php?state=CALIFORNIA"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  link 2
                </a>
                )
              </p>
              <p>
                <a
                  href="https://www.barchart.com/futures/grains"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Look up recent crop price
                </a>
              </p>
            </div>
          </div>
        )}

        {/* Global Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 pb-6 border-b border-slate-100">
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
              Water Available (mm) *
            </label>
            <input
              type="number"
              value={waterAvailable}
              onChange={(e) => setWaterAvailable(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="0-5500"
              className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-sm font-mono focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
              Salinity (dS/m)
            </label>
            <input
              type="number"
              step="0.1"
              value={waterSalinity}
              onChange={(e) => setWaterSalinity(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="e.g. 1.2"
              className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-sm font-mono focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
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
              <option value="">Default (Flood)</option>
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
              value={irrigationEfficiency}
              onChange={(e) => setIrrigationEfficiency(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="e.g. 68"
              className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-sm font-mono focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Crop Rows */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 border-y border-slate-200">
                <th className="p-2 text-left font-bold text-slate-500 uppercase tracking-wider">
                  Selected Crop
                </th>
                <th className="p-2 text-left font-bold text-slate-500 uppercase tracking-wider">
                  Max Yield (t/ha)
                </th>
                <th className="p-2 text-left font-bold text-slate-500 uppercase tracking-wider">
                  ET Max (mm)
                </th>
                <th className="p-2 text-left font-bold text-slate-500 uppercase tracking-wider">
                  Price ($/t)
                </th>
                <th className="p-2 text-left font-bold text-slate-500 uppercase tracking-wider">
                  Cost ($/ha)
                </th>
                <th className="p-2 text-center text-slate-500"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cropRows.map((row) => (
                <tr key={row.id}>
                  <td className="p-2 font-medium">
                    <select
                      value={row.cropId}
                      onChange={(e) => autoFillRow(row.id, e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded p-1.5 focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      <option value="">Select...</option>
                      {cropData.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      placeholder="Yield"
                      value={row.ym}
                      onChange={(e) => updateRow(row.id, "ym", e.target.value)}
                      className="w-full p-1.5 border border-slate-200 rounded font-mono bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      placeholder="ETm"
                      value={row.etm}
                      onChange={(e) => updateRow(row.id, "etm", e.target.value)}
                      className="w-full p-1.5 border border-slate-200 rounded font-mono bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      placeholder="Price"
                      value={row.price}
                      onChange={(e) =>
                        updateRow(row.id, "price", e.target.value)
                      }
                      className="w-full p-1.5 border border-slate-200 rounded font-mono bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      placeholder="Cost"
                      value={row.cost}
                      onChange={(e) =>
                        updateRow(row.id, "cost", e.target.value)
                      }
                      className="w-full p-1.5 border border-slate-200 rounded font-mono bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </td>
                  <td className="p-2 text-center">
                    {cropRows.length > 1 && (
                      <button
                        onClick={() => removeRow(row.id)}
                        className="text-red-400 hover:text-red-600 rounded px-1 text-lg leading-none font-bold"
                      >
                        ×
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {cropRows.length < 5 && (
            <button
              onClick={addRow}
              className="mt-3 text-emerald-600 text-[11px] font-bold uppercase hover:underline ml-2"
            >
              + Add New Crop Row
            </button>
          )}
        </div>

        <div className="flex gap-3 mt-auto pt-2">
          <button
            onClick={runOptimization}
            className="flex-1 bg-slate-800 text-white border border-slate-800 shadow-sm py-2.5 rounded text-sm font-bold hover:bg-slate-700 transition-colors text-center flex items-center justify-center gap-2"
          >
            <Activity size={18} /> Run Optimization Engine
          </button>
        </div>
      </div>

      {optResults.length > 0 && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-700 mt-2">
          <div className="flex justify-end mb-[-1rem]">
            <button
              onClick={exportCsv}
              className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 py-1.5 px-3 rounded flex items-center gap-1.5 font-medium transition-colors"
            >
              <Download size={14} /> Export Results (CSV)
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4 border-b border-slate-100 pb-4">
              <div className="flex justify-between space-x-1 bg-slate-100 p-1 rounded-lg w-full sm:w-auto">
                <button
                  onClick={() => setActiveChartTab("yield")}
                  className={`flex-1 sm:flex-none px-4 py-1.5 text-xs font-bold rounded-md transition-all ${activeChartTab === "yield" ? "bg-white shadow-sm text-emerald-600" : "text-slate-500 hover:text-slate-700"}`}
                >
                  Yield
                </button>
                <button
                  onClick={() => setActiveChartTab("profit")}
                  className={`flex-1 sm:flex-none px-4 py-1.5 text-xs font-bold rounded-md transition-all ${activeChartTab === "profit" ? "bg-white shadow-sm text-emerald-600" : "text-slate-500 hover:text-slate-700"}`}
                >
                  Profit
                </button>
                <button
                  onClick={() => setActiveChartTab("water")}
                  className={`flex-1 sm:flex-none px-4 py-1.5 text-xs font-bold rounded-md transition-all ${activeChartTab === "water" ? "bg-white shadow-sm text-emerald-600" : "text-slate-500 hover:text-slate-700"}`}
                >
                  Water Saving
                </button>
              </div>
              <button
                onClick={exportChart}
                className="text-slate-400 hover:text-emerald-600 transition-colors ml-auto sm:ml-0"
                title="Export Chart"
              >
                <Download size={16} />
              </button>
            </div>
            {/* Chart body */}
            <div id="part2-chart-container" className="relative p-2 bg-white">
              <h3 className="text-sm font-bold text-slate-800 mb-4">
                {getChartConfig(activeChartTab).title}
              </h3>
              <div className="h-64 w-full -ml-3">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={{
                    chart: { type: "column", height: 256, backgroundColor: "transparent" },
                    title: { text: null },
                    credits: { enabled: false },
                    xAxis: {
                      categories: optResults.map((d: any) => d.name),
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
                        color: getChartConfig(activeChartTab).color
                      }
                    },
                    legend: { enabled: false },
                    series: [{
                      name: getChartConfig(activeChartTab).title,
                      data: optResults.map((d: any) => ({
                        name: d.name,
                        y: d[getChartConfig(activeChartTab).dataKey]
                      }))
                    }]
                  }}
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl shadow-lg p-5 border border-slate-700 text-slate-300 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-500 p-1.5 rounded">
                <Zap size={16} className="text-white" />
              </div>
              <h3 className="text-sm font-bold text-white">
                AI Strategic Advisor
              </h3>
              <span className="ml-auto text-[10px] text-emerald-400 font-mono">
                PROMPT: IRR_EXPERT_V3
              </span>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {!aiTip && !loadingAi && (
                <div className="py-8 flex flex-col items-center justify-center border border-slate-700 border-dashed rounded-lg bg-slate-900/30 mb-4">
                  <button
                    onClick={getAiAdvisorReport}
                    className="bg-emerald-600 text-white font-bold py-2.5 px-6 rounded hover:bg-emerald-500 transition-colors flex items-center gap-2 shadow-sm"
                  >
                    <Zap size={16} className="fill-current" /> Generate
                    Strategic Report
                  </button>
                  <p className="text-xs text-slate-500 mt-4 text-center max-w-sm">
                    Get a comprehensive analysis comparing yield, profit, and
                    water conservation efficiency for all selected crops.
                  </p>
                </div>
              )}
              {loadingAi && (
                <div className="flex items-center gap-3 text-slate-400 text-sm p-4 mb-4">
                  <div className="w-4 h-4 border-2 border-slate-600 border-t-emerald-400 rounded-full animate-spin"></div>
                  Analyzing comprehensive optimization data...
                </div>
              )}
              {aiTip && !loadingAi && (
                <div className="bg-slate-900/50 rounded p-4 border border-slate-700 relative group max-h-96 overflow-y-auto custom-scrollbar mb-4">
                  <button
                    onClick={getAiAdvisorReport}
                    className="absolute top-4 right-4 text-xs font-medium bg-slate-800 px-2 py-1 rounded text-slate-400 hover:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Regenerate
                  </button>
                  <h4 className="text-[10px] uppercase font-bold text-slate-500 mb-3">
                    Comprehensive Crop Strategy
                  </h4>
                  <div className="text-xs text-emerald-300 font-medium leading-relaxed prose prose-sm prose-invert max-w-none markdown-body">
                    <Markdown>{aiTip}</Markdown>
                  </div>
                </div>
              )}

              {optResults.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-3">
                     <Droplet size={14} className="text-blue-400" />
                     <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest">Irrigation Management Tips</h4>
                  </div>
                  <div className="space-y-3">
                    {optResults.filter(r => r.name).map((res, i) => (
                      <div key={i} className="bg-slate-900/40 border border-slate-700 rounded-lg p-3">
                        <div className="text-[11px] font-bold text-emerald-400 mb-1">{res.name}</div>
                        <div className="text-xs text-slate-300 leading-relaxed">{res.tip}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
