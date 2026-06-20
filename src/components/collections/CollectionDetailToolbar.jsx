"use client";
import React from "react";
import { LayoutGrid, List } from "lucide-react";

const CollectionDetailToolbar = ({ viewMode, setViewMode }) => (
  <div className="flex items-center justify-between mb-8">
    <h2 className="text-lg font-bold tracking-tight text-gray-400">
      Captured Content
    </h2>
    <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/5">
      <button
        onClick={() => setViewMode("grid")}
        className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white/10 text-white" : "text-gray-500 hover:text-white"}`}
      >
        <LayoutGrid size={18} />
      </button>
      <button
        onClick={() => setViewMode("list")}
        className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white/10 text-white" : "text-gray-500 hover:text-white"}`}
      >
        <List size={18} />
      </button>
    </div>
  </div>
);

export default CollectionDetailToolbar;
