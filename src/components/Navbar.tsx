import React from "react";
import { Droplet } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-[#1E293B] text-white h-14 flex items-center justify-between px-6 shrink-0 shadow-lg sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <div className="bg-emerald-500 p-1.5 rounded-lg text-white">
          <Droplet size={20} />
        </div>
        <div className="font-bold text-lg tracking-tight">
          IMT-Desert{" "}
          <span className="text-xs font-normal opacity-60 ml-2 hidden sm:inline">
            An Irrigation Management Tool for Southern California Desert Region
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <div className="hidden md:flex items-center space-x-2 text-xs bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="opacity-80">System: Connected</span>
        </div>
        <div className="flex gap-4 items-center font-medium border-l border-slate-700 pl-6 text-sm">
          <a href="#" className="hover:text-emerald-400 transition-colors">
            Help
          </a>
          <a
            href="http://www.ucrwater.com/the-group.html"
            target="_blank"
            rel="noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 px-4 py-1.5 rounded-md transition-colors text-white font-semibold flex items-center"
          >
            Expert Panel
          </a>
        </div>
      </div>
    </nav>
  );
}
