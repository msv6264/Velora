"use client";
import React, { useState } from "react";
import { X, Plus, Check, HelpCircle, FileText, Play, Globe } from "lucide-react";

const getIconForType = (type) => {
  switch (type?.toLowerCase()) {
    case 'video': return <Play size={18} />;
    case 'article': return <FileText size={18} />;
    case 'pdf': return <FileText size={18} />;
    default: return <Globe size={18} />;
  }
};

const AddMilestoneModal = ({
  isOpen,
  onClose,
  remainingResources,
  onAddResources,
}) => {
  const [selectedIds, setSelectedIds] = useState([]);

  if (!isOpen) return null;

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAdd = () => {
    if (selectedIds.length === 0) return;
    onAddResources(selectedIds);
    setSelectedIds([]);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative w-full max-w-xl bg-[#0a0a0a] border border-white/10 rounded-[3rem] p-10 shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
        <button
          onClick={onClose}
          className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-3xl font-bold mb-1 tracking-tight">
          Add Milestone
        </h2>
        <p className="text-gray-500 font-spectral italic text-sm mb-8">
          Integrate existing library resources into your learning sequence.
        </p>

        <div className="flex-1 overflow-y-auto pr-1 no-scrollbar mb-8">
          {remainingResources.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-6 border border-dashed border-white/10 rounded-[2rem] text-center">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-600 mb-4">
                <HelpCircle size={24} />
              </div>
              <p className="text-white font-bold mb-2">No Resources Left</p>
              <p className="text-gray-500 text-sm max-w-sm mb-6 leading-relaxed">
                Create more resources to add path. You have either mapped all resources or your library is empty.
              </p>
              <a
                href="/library"
                className="px-6 py-3 bg-[#ba8ffa]/10 border border-[#ba8ffa]/20 text-[#ba8ffa] rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#ba8ffa] hover:text-black transition-all"
              >
                Go to Library
              </a>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#ba8ffa] font-bold mb-3">
                Select Resources ({selectedIds.length} chosen)
              </p>
              {remainingResources.map((res) => {
                const isSelected = selectedIds.includes(res.id);
                return (
                  <div
                    key={res.id}
                    onClick={() => toggleSelect(res.id)}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? "bg-[#ba8ffa]/10 border-[#ba8ffa]/30 text-white"
                        : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-white/5 ${isSelected ? "text-[#ba8ffa]" : "text-gray-500"}`}>
                        {getIconForType(res.category || res.type)}
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-sm line-clamp-1">{res.title}</p>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">{res.category || "Resource"}</p>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                      isSelected ? "border-[#ba8ffa] bg-[#ba8ffa] text-black" : "border-white/20 bg-transparent text-transparent"
                    }`}>
                      <Check size={14} strokeWidth={3} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {remainingResources.length > 0 && (
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 py-4 rounded-xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition-all text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              disabled={selectedIds.length === 0}
              className="flex-1 py-4 rounded-xl bg-[#ba8ffa] text-black font-bold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(186,143,250,0.3)] transition-all"
            >
              Add Selected
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddMilestoneModal;
