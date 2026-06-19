"use client";
import React from "react";
import * as Icons from "lucide-react";
import { MoreHorizontal, ArrowRight, Pencil, Trash2 } from "lucide-react";

const IconRenderer = ({ name, size = 24, className = "" }) => {
  const IconComponent = Icons[name] || Icons.HelpCircle;
  return <IconComponent size={size} className={className} />;
};

const CollectionCard = ({
  col,
  router,
  activeMenu,
  toggleMenu,
  handleEditClick,
  setCollectionToDelete,
}) => {
  return (
    <div
      onClick={() => router.push(`/collections/${col.id}`)}
      className="group relative p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl hover:bg-white/[0.05] transition-all duration-700 cursor-pointer overflow-hidden"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${col.color} opacity-0 group-hover:opacity-100 transition-opacity duration-1000`}
      />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-10">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#ba8ffa] group-hover:scale-110 group-hover:bg-[#ba8ffa]/10 transition-all duration-500">
            <IconRenderer name={col.icon} size={28} />
          </div>
          <div className="relative">
            <button
              onClick={(e) => toggleMenu(e, col.id)}
              className={`p-2 rounded-xl transition-all ${
                activeMenu === col.id
                  ? "bg-[#ba8ffa] text-black"
                  : "text-gray-600 hover:text-white hover:bg-white/5"
              }`}
            >
              <MoreHorizontal size={24} />
            </button>

            {activeMenu === col.id && (
              <div className="absolute right-0 mt-2 w-48 bg-[#121212] border border-white/10 rounded-2xl p-2 shadow-2xl z-50 backdrop-blur-3xl animate-in fade-in zoom-in duration-200">
                <button
                  onClick={(e) => handleEditClick(e, col)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-all group/item"
                >
                  <Pencil size={16} />
                  <span className="text-sm font-medium">Edit Collection</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCollectionToDelete(col);
                    toggleMenu(e, null); // Close menu
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-red-500/10 hover:text-red-500 transition-all group/item"
                >
                  <Trash2 size={16} />
                  <span className="text-sm font-medium">Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-2 tracking-tight group-hover:text-[#ba8ffa] transition-colors">
          {col.name}
        </h3>
        <p className="text-gray-500 font-spectral italic mb-8">
          {col.count} items
        </p>

        <div className="flex items-center gap-2 text-[#8791fe] text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          <span>Explore</span>
          <ArrowRight size={16} />
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
