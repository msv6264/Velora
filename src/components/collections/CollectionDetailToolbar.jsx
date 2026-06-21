"use client";
import React from "react";
import { LayoutGrid, Route } from "lucide-react";

const CollectionDetailToolbar = ({ viewMode, setViewMode }) => (
  <div className="flex items-center justify-between mb-8">
    <h2 className="text-lg font-bold tracking-tight text-gray-400">
      Captured Content
    </h2>
    <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/5">
      <button
        onClick={() => setViewMode("gallery")}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-xs font-bold uppercase tracking-wider ${viewMode === "gallery" ? "bg-white/10 text-white shadow-lg" : "text-gray-500 hover:text-white"}`}
        title="Gallery View"
      >
        <LayoutGrid size={16} />
        <span>Gallery</span>
      </button>
      <button
        onClick={() => setViewMode("path")}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-xs font-bold uppercase tracking-wider ${viewMode === "path" ? "bg-white/10 text-white shadow-lg" : "text-gray-500 hover:text-white"}`}
        title="Learning Path View"
      >
        <Route size={16} />
        <span>Learning Path</span>
      </button>
    </div>
  </div>
);

export default CollectionDetailToolbar;
