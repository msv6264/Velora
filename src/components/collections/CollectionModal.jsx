"use client";
import React from "react";
import * as Icons from "lucide-react";
import { X, Save, Check } from "lucide-react";

const IconRenderer = ({ name, size = 24, className = "" }) => {
  const IconComponent = Icons[name] || Icons.HelpCircle;
  return <IconComponent size={size} className={className} />;
};

const CollectionModal = ({
  isOpen,
  onClose,
  isEditMode,
  formName,
  setFormName,
  formIcon,
  setFormIcon,
  formColor,
  setFormColor,
  selectedResources,
  toggleResourceSelection,
  availableResources,
  onSubmit,
}) => {
  if (!isOpen) return null;

  // Icon List for Picker
  const iconOptions = [
    "Layers",
    "Code",
    "Palette",
    "Cpu",
    "Globe",
    "Zap",
    "BookOpen",
    "Target",
    "Flame",
    "Camera",
    "Music",
    "Terminal",
  ];

  // Theme Options
  const themeOptions = [
    "from-[#ba8ffa]/20 to-transparent",
    "from-[#8791fe]/20 to-transparent",
    "from-rose-500/20 to-transparent",
    "from-emerald-500/20 to-transparent",
    "from-amber-500/20 to-transparent",
    "from-cyan-500/20 to-transparent",
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[3rem] p-12 shadow-2xl animate-in zoom-in-95 duration-200 overflow-y-auto max-h-[90vh] no-scrollbar">
        <button
          onClick={onClose}
          className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-4xl font-bold mb-2 tracking-tight">
          {!isEditMode ? "New Collection" : "Edit Collection"}
        </h2>
        <p className="text-gray-500 font-spectral italic text-lg mb-12">
          {!isEditMode
            ? "Define a new path for your focus."
            : "Refine your intentional space."}
        </p>

        <form onSubmit={onSubmit} className="space-y-10">
          {/* Name Input */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-[#ba8ffa] font-bold mb-4">
              Collection Name
            </label>
            <input
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-xl text-white focus:outline-none focus:border-[#ba8ffa]/50 transition-all placeholder:text-gray-700"
              placeholder="e.g. Cognitive Research"
              required
            />
          </div>

          {/* Icon Picker */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-[#ba8ffa] font-bold mb-4">
              Choose Icon
            </label>
            <div className="grid grid-cols-6 gap-4">
              {iconOptions.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setFormIcon(icon)}
                  className={`h-16 rounded-2xl flex items-center justify-center transition-all ${
                    formIcon === icon
                      ? "bg-[#ba8ffa] text-black scale-110"
                      : "bg-white/5 text-gray-500 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <IconRenderer name={icon} size={24} />
                </button>
              ))}
            </div>
          </div>

          {/* Theme Picker */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-[#ba8ffa] font-bold mb-4">
              Visual Theme
            </label>
            <div className="grid grid-cols-6 gap-4">
              {themeOptions.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormColor(color)}
                  className={`h-12 rounded-xl bg-gradient-to-br ${color} border-2 ${
                    formColor === color
                      ? "border-white scale-110 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                      : "border-transparent opacity-50 hover:opacity-100"
                  } transition-all`}
                />
              ))}
            </div>
          </div>

          {/* Resource Multi-Select Dropdown */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-[#ba8ffa] font-bold mb-4">
              Attach Resources
            </label>
            <div className="space-y-3 max-h-48 overflow-y-auto pr-2 no-scrollbar">
              {availableResources.map((res) => (
                <div
                  key={res.id}
                  onClick={() => toggleResourceSelection(res.id)}
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedResources.includes(res.id)
                      ? "bg-[#ba8ffa]/10 border-[#ba8ffa]/30 text-white"
                      : "bg-white/5 border-white/5 text-gray-500 hover:bg-white/10"
                  }`}
                >
                  <span className="font-medium">{res.title}</span>
                  {selectedResources.includes(res.id) && (
                    <Check size={18} className="text-[#ba8ffa]" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-8 flex gap-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-5 rounded-2xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-5 rounded-2xl bg-[#ba8ffa] text-black font-bold flex items-center justify-center gap-3 hover:shadow-[0_0_40px_rgba(186,143,250,0.4)] transition-all"
            >
              <Save size={20} />
              {!isEditMode ? "Create Collection" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CollectionModal;
