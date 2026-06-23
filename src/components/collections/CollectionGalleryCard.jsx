"use client";
import React from "react";
import { MoreVertical, ExternalLink, Pencil, Trash2, Globe, Play, FileText } from "lucide-react";
import { STATUS_CONFIG } from "./CollectionPathCard";
import { handleRevisit } from "@/utils/updateRevisit";

const getIconForType = (type) => {
  switch (type?.toLowerCase()) {
    case 'video': return <Play size={24} />;
    case 'article': return <FileText size={24} />;
    case 'pdf': return <FileText size={24} />;
    default: return <Globe size={24} />;
  }
};

const CollectionGalleryCard = ({ res, activeMenu, toggleMenu, handleEditClick, handleDeleteResource, collectionColor }) => {
  const status = STATUS_CONFIG[res.status || "not_started"];

  return (
    <div className="group relative h-80 rounded-[2.5rem] bg-[#0a0a0a] border border-white/5 overflow-hidden hover:border-white/10 transition-all duration-700 shadow-2xl">
      {/* Background Graphic / Color */}
      <div className={`absolute inset-0 bg-gradient-to-br ${collectionColor} opacity-5 group-hover:opacity-20 transition-opacity duration-1000`} />
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-white/5 rounded-full blur-[60px] group-hover:bg-white/10 transition-colors duration-1000" />

      <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
        {/* Top bar */}
        <div className="flex justify-between items-start">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-xl group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:bg-white/10">
            {getIconForType(res.category)}
          </div>
          
          <div className="relative">
            <button
              onClick={(e) => toggleMenu(e, res.id)}
              className={`p-2 rounded-xl transition-all ${activeMenu === res.id ? "bg-white/10 text-white" : "text-gray-600 hover:text-white"}`}
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
                  <span className="text-sm font-bold">Edit</span>
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
        </div>

        {/* Bottom Content */}
        <div>
          <div className="flex items-center gap-2 mb-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            <span className={`px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-widest border bg-gradient-to-r ${status.color}`}>
              {status.label}
            </span>
          </div>

          <a href={res.url} onClick={() => {handleRevisit(res.id)}} target="_blank" rel="noopener noreferrer" className="block text-2xl font-bold tracking-tight text-white group-hover:text-white transition-colors line-clamp-3 cursor-pointer mb-2">
            {res.title}
          </a>
          
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5 text-xs font-bold uppercase tracking-widest text-gray-600">
            <span>{res.category || "Resource"}</span>
            <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionGalleryCard;
