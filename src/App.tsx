import { useState } from "react";
import Navbar from "./components/Navbar";
import PartOne from "./components/PartOne";
import PartTwo from "./components/PartTwo";
import Footer from "./components/Footer";

export default function App() {
  const [activeTab, setActiveTab] = useState<"part1" | "part2">("part1");

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col font-sans text-slate-900 overflow-x-hidden">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 pb-20">
        <div className="mb-6 border-b border-slate-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("part1")}
              className={`${
                activeTab === "part1"
                  ? "border-emerald-500 text-emerald-600"
                  : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700"
              } whitespace-nowrap py-3 px-1 border-b-2 text-xs font-bold uppercase tracking-wider transition-colors`}
            >
              Yield Recommendation Engine
            </button>
            <button
              onClick={() => setActiveTab("part2")}
              className={`${
                activeTab === "part2"
                  ? "border-emerald-500 text-emerald-600"
                  : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700"
              } whitespace-nowrap py-3 px-1 border-b-2 text-xs font-bold uppercase tracking-wider transition-colors`}
            >
              Multi-Crop Optimization Engine
            </button>
          </nav>
        </div>

        {activeTab === "part1" ? <PartOne /> : <PartTwo />}
      </main>
      <Footer />
    </div>
  );
}
