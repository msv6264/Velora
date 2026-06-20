"use client";
import React from "react";
import { MoreVertical, ExternalLink, Pencil, Trash2, Activity } from "lucide-react";
import { STATUS_CONFIG } from "./CollectionGridCard";

const CollectionListCard = ({ res, activeMenu, toggleMenu, handleEditClick, handleDeleteResource }) => (
  <div className="flex items-center gap-6 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all group">
    <div className={`p-3 rounded-xl bg-white/5 ${res.color?.replace("bg-", "text-")} group-hover:scale-110 transition-all`}>
      {res.icon}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-3">
        <h3 className="text-lg font-bold truncate group-hover:text-[#ba8ffa] transition-colors">
          {res.title}
        </h3>
        <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md border ${STATUS_CONFIG[res.status || "not_started"].color}`}>
          <Activity size={10} />
          <span className="text-[9px] font-bold uppercase tracking-wider">
            {STATUS_CONFIG[res.status || "not_started"].label}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-1">
        <span className="text-[10px] uppercase tracking-wider text-gray-600 font-bold">
          {res.type}
        </span>
        <span className="text-[10px] text-gray-700 italic font-spectral">
          • {res.date}
        </span>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <button className="p-2 text-gray-600 hover:text-[#ba8ffa] transition-colors">
        <ExternalLink size={18} />
      </button>
      <div className="relative">
        <button
          onClick={(e) => toggleMenu(e, res.id)}
          className={`p-2 rounded-xl transition-all ${activeMenu === res.id ? "bg-[#ba8ffa] text-black" : "text-gray-600 hover:text-white"}`}
        >
          <MoreVertical size={18} />
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
  </div>
);

export default CollectionListCard;
