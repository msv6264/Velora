"use client";
import React from "react";
import { MoreVertical, Pencil, Trash2, Link2, ChevronRight } from "lucide-react";

export const STATUS_CONFIG = {
  not_started: { label: "Not Started", color: "from-gray-500/20 to-gray-500/5 text-gray-400 border-gray-500/20", dot: "bg-gray-500" },
  in_progress: { label: "In Progress", color: "from-amber-500/20 to-amber-500/5 text-amber-400 border-amber-500/20", dot: "bg-amber-500" },
  completed: { label: "Completed", color: "from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/20", dot: "bg-emerald-500" },
  revisit_needed: { label: "Revisit", color: "from-cyan-500/20 to-cyan-500/5 text-cyan-400 border-cyan-500/20", dot: "bg-cyan-500" },
};

const CollectionPathCard = ({ res, index, activeMenu, toggleMenu, handleEditClick, handleDeleteResource, collectionColor }) => {
  const status = STATUS_CONFIG[res.status || "not_started"];
  
  // Extract color class without the 'from-' prefix if it exists, for border/text hover
  const glowColor = collectionColor?.includes('from-[') 
    ? collectionColor.split(' ')[0].replace('from-', '') 
    : '#ba8ffa';

  return (
    <div className="relative flex gap-8 group">
      {/* Timeline Line */}
      <div className="absolute left-[23px] top-14 bottom-[-32px] w-[2px] bg-gradient-to-b from-white/10 to-transparent group-last:hidden" />
      
      {/* Node / Number */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className={`w-12 h-12 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center font-spectral italic text-xl font-bold group-hover:scale-110 transition-all duration-500 shadow-[0_0_15px_rgba(255,255,255,0.02)] text-gray-400 group-hover:border-[${glowColor}] group-hover:text-white group-hover:shadow-[0_0_20px_${glowColor}]`}>
          {(index + 1).toString().padStart(2, '0')}
        </div>
      </div>

      {/* Card Content */}
      <div className="flex-1 bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 hover:bg-white/[0.02] hover:border-white/10 transition-all duration-500 relative overflow-hidden group/card shadow-2xl">
        {/* Glow Effect */}
        <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-bl ${collectionColor} opacity-0 group-hover/card:opacity-30 blur-[60px] transition-opacity duration-700 pointer-events-none`} />

        <div className="flex items-start justify-between gap-6 relative z-10">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border bg-gradient-to-r ${status.color}`}>
                <div className={`inline-block w-1.5 h-1.5 rounded-full ${status.dot} mr-2`} />
                {status.label}
              </span>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                Module {index + 1}
              </span>
            </div>
            
            <a href={res.url} target="_blank" rel="noopener noreferrer" className="block text-3xl font-bold text-white group-hover/card:text-white transition-colors mb-3 tracking-tight">
              {res.title}
            </a>
            <div className="flex items-center gap-3 text-sm text-gray-500 font-spectral italic group-hover/card:text-gray-400 transition-colors">
              <Link2 size={16} />
              <span className="truncate max-w-[400px]">{res.url}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col items-end gap-3">
            <div className="relative">
              <button
                onClick={(e) => toggleMenu(e, res.id)}
                className={`p-2 rounded-2xl transition-all ${activeMenu === res.id ? "bg-white/10 text-white" : "text-gray-500 hover:text-white hover:bg-white/5"}`}
              >
                <MoreVertical size={20} />
              </button>

              {activeMenu === res.id && (
                <div className="absolute right-0 mt-2 w-48 bg-[#121212] border border-white/10 rounded-2xl p-2 shadow-2xl z-50 backdrop-blur-3xl animate-in fade-in zoom-in duration-200">
                  <button
                    onClick={(e) => handleEditClick(e, res)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 transition-all group/item"
                  >
                    <Pencil size={16} className="group-hover/item:text-white" />
                    <span className="text-sm font-bold">Edit Node</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteResource(res.id);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all group/item"
                  >
                    <Trash2 size={16} />
                    <span className="text-sm font-bold">Remove</span>
                  </button>
                </div>
              )}
            </div>
            
            <a href={res.url} target="_blank" rel="noopener noreferrer" className="mt-6 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover/card:bg-white group-hover/card:text-black transition-all hover:scale-110 shadow-lg">
              <ChevronRight size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionPathCard;
