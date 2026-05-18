import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-10 mt-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
          {/* References Column */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              References
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://www.nass.usda.gov/Publications/Todays_Reports/reports/agpr0721.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  USDA Crop Prices Report
                </a>
              </li>
              <li>
                <a
                  href="https://www.nass.usda.gov/Quick_Stats/Ag_Overview/stateOverview.php?state=CALIFORNIA"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  2021 California State Agriculture Overview
                </a>
              </li>
              <li>
                <a
                  href="https://www.barchart.com/futures/grains"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Recent Crop Prices (Barchart)
                </a>
              </li>
              <li>
                <a
                  href="https://salinity.ucr.edu/Sindex.html"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  SALEACH - Leaching related Yield Reduction
                </a>
              </li>
              <li>
                <a
                  href="https://casoilresource.lawr.ucdavis.edu/gmap/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Soil Map (UC Davis)
                </a>
              </li>
            </ul>
          </div>

          {/* Developers & Team Details Column */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              Developers & Team Details
            </h3>
            <div className="text-xs space-y-3">
              <p>
                This application was developed to provide strategic irrigation
                recommendations and multi-crop optimization based on advanced
                agronomic constraints.
              </p>
              <p>
                <strong>Team:</strong> Developed by Agricultural Data Experts
                and Software Engineers, committed to enhancing water
                conservation efficiency.
              </p>
            </div>
          </div>
        </div>

        {/* Copyright Mini Footer */}
        <div className="pt-6 border-t border-slate-800 text-center text-xs flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <p>
            &copy; {new Date().getFullYear()} Irrigation Advisor Tool. All
            rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-emerald-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-emerald-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
