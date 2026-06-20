"use client";
import React from "react";
import { MoreVertical, Pencil, Trash2, Activity } from "lucide-react";

export const STATUS_CONFIG = {
  not_started: {
    label: "Not Started",
    color: "bg-red-500/10 text-red-400 border-red-500/20",
  },
  in_progress: {
    label: "In Progress",
    color: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  completed: {
    label: "Completed",
    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  revisit_needed: {
    label: "Revisit Needed",
    color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  },
};

const CollectionGridCard = ({ res, activeMenu, toggleMenu, handleEditClick, handleDeleteResource }) => (
  <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl hover:bg-white/[0.06] hover:border-white/10 transition-all duration-500 group relative">
    <div className={`w-12 h-1.5 rounded-full ${res.color} mb-6`} />
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 rounded-xl bg-white/5 text-gray-400 group-hover:text-[#ba8ffa] transition-colors">
        {res.icon}
      </div>
      <div className="relative">
        <button
          onClick={(e) => toggleMenu(e, res.id)}
          className={`p-2 rounded-xl transition-all ${activeMenu === res.id ? "bg-[#ba8ffa] text-black" : "text-gray-600 hover:text-white hover:bg-white/5"}`}
        >
          <MoreVertical size={20} />
        </button>
        {activeMenu === res.id && (
          <div className="absolute right-0 mt-2 w-48 bg-[#121212] border border-white/10 rounded-2xl p-2 shadow-2xl z-50 backdrop-blur-3xl animate-in fade-in zoom-in duration-200">
            <button
              onClick={(e) => handleEditClick(e, res)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 transition-all group/item"
            >
              <Pencil size={16} className="group-hover/item:text-[#ba8ffa]" />
              <span className="text-sm">Edit</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteResource(res.id);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all group/item"
            >
              <Trash2 size={16} />
              <span className="text-sm">Delete</span>
            </button>
          </div>
        )}
      </div>
    </div>
    <h3 className="text-xl font-bold mb-4 tracking-tight leading-snug group-hover:text-[#ba8ffa] transition-colors line-clamp-2 h-14">
      {res.title}
    </h3>

    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border w-fit mb-6 ${STATUS_CONFIG[res.status || "not_started"].color}`}>
      <Activity size={14} />
      <span className="text-[10px] font-bold uppercase tracking-wider">
        {STATUS_CONFIG[res.status || "not_started"].label}
      </span>
    </div>

    <div className="flex items-center justify-between pt-4 border-t border-white/5">
      <span className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-bold">
        {res.type}
      </span>
      <span className="text-xs text-gray-600 font-spectral italic">
        {res.date}
      </span>
    </div>
  </div>
);

export default CollectionGridCard;
