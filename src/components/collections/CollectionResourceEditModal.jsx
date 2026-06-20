"use client";
import React from "react";
import { X, Save } from "lucide-react";

const CollectionResourceEditModal = ({
  showEditModal,
  setShowEditModal,
  formTitle,
  setFormTitle,
  formType,
  setFormType,
  formStatus,
  setFormStatus,
  handleSaveResource
}) => {
  if (!showEditModal) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => setShowEditModal(false)}
      />
      <div className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl max-h-[90vh] overflow-auto animate-in zoom-in-95 duration-200">
        <button
          onClick={() => setShowEditModal(false)}
          className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-bold mb-2 tracking-tight">Edit Resource</h2>
        <p className="text-gray-500 font-spectral italic mb-10">
          Update your captured insight.
        </p>

        <form onSubmit={handleSaveResource} className="space-y-8">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#ba8ffa] font-bold mb-4">
              Resource Title
            </label>
            <input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-[#ba8ffa]/50 transition-all"
              placeholder="Enter resource title..."
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#ba8ffa] font-bold mb-4">
              Resource Type
            </label>
            <select
              value={formType}
              onChange={(e) => setFormType(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-[#ba8ffa]/50 transition-all appearance-none cursor-pointer"
            >
              <option value="Article" className="bg-[#0a0a0a]">Article</option>
              <option value="Video" className="bg-[#0a0a0a]">Video</option>
              <option value="Course" className="bg-[#0a0a0a]">Course</option>
              <option value="PDF" className="bg-[#0a0a0a]">PDF</option>
              <option value="Tool" className="bg-[#0a0a0a]">Tool</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#ba8ffa] font-bold mb-4">
              Status
            </label>
            <select
              value={formStatus}
              onChange={(e) => setFormStatus(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-[#ba8ffa]/50 transition-all appearance-none cursor-pointer"
            >
              <option value="not_started" className="bg-[#0a0a0a]">Not Started</option>
              <option value="in_progress" className="bg-[#0a0a0a]">In Progress</option>
              <option value="completed" className="bg-[#0a0a0a]">Completed</option>
              <option value="revisit_needed" className="bg-[#0a0a0a]">Revisit Needed</option>
            </select>
          </div>

          <div className="pt-4 flex gap-4">
            <button
              type="button"
              onClick={() => setShowEditModal(false)}
              className="flex-1 py-4 rounded-2xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-4 rounded-2xl bg-[#ba8ffa] text-black font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(186,143,250,0.3)] transition-all"
            >
              <Save size={18} />
              Save Resource
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CollectionResourceEditModal;
