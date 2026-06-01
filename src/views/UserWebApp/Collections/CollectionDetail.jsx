"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

import NeuralBg from "../../../components/NeuralBg";
import {
  ArrowLeft,
  Search,
  LayoutGrid,
  List,
  MoreVertical,
  ExternalLink,
  Pencil,
  Trash2,
  FileText,
  TvMinimalPlay,
  Layout,
  Filter,
  Plus,
  X,
  Save,
  Activity,
} from "lucide-react";

const STATUS_CONFIG = {
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

const CollectionDetail = () => {
  const router = useRouter();
  const { id } = useParams();
  const [viewMode, setViewMode] = useState("grid");
  const [activeMenu, setActiveMenu] = useState(null);

  // Resource Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [formTitle, setFormTitle] = useState("");
  const [formType, setFormType] = useState("");
  const [formStatus, setFormStatus] = useState("not_started");

  // Mock data for the specific collection
  const [collectionInfo] = useState({
    id: 1,
    name: "Research",
    description: "Deep dives into AI and cognitive psychology.",
    itemCount: 42,
    color: "from-[#ba8ffa]/20",
  });

  const [resources, setResources] = useState([
    {
      id: 1,
      title: "The Future of AI Agents",
      type: "Article",
      date: "2 hours ago",
      color: "bg-[#ba8ffa]",
      icon: <FileText size={18} />,
      status: "completed",
    },
    {
      id: 7,
      title: "System Design Interview",
      type: "Course",
      date: "3 weeks ago",
      color: "bg-[#ba8ffa]",
      icon: <Layout size={18} />,
      status: "in_progress",
    },
    {
      id: 9,
      title: "Neural Networks Decoded",
      type: "Video",
      date: "1 month ago",
      color: "bg-[#ba8ffa]",
      icon: <TvMinimalPlay size={18} />,
      status: "not_started",
    },
  ]);

  const toggleMenu = (e, id) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === id ? null : id);
  };

  const handleEditClick = (e, res) => {
    e.stopPropagation();
    setEditingResource(res);
    setFormTitle(res.title);
    setFormType(res.type);
    setFormStatus(res.status || "not_started");
    setShowEditModal(true);
    setActiveMenu(null);
  };

  const handleSaveResource = async (e) => {
    e.preventDefault();

    // Build whitelist payload; exclude `category` (foreign key)
    const allowed = ["title", "type", "status"];
    const updatePayload = {};
    if (formTitle !== undefined) updatePayload.title = formTitle;
    if (formType !== undefined) updatePayload.type = formType;
    if (formStatus !== undefined) updatePayload.status = formStatus;

    setResources((prev) =>
      prev.map((r) =>
        r.id === editingResource.id
          ? { ...r, title: formTitle, type: formType, status: formStatus }
          : r,
      ),
    );
    setShowEditModal(false);
  };

  const handleDeleteResource = (id) => {
    setResources((prev) => prev.filter((r) => r.id !== id));
    setActiveMenu(null);
  };

  return (
    <div
      className="min-h-screen bg-[#030303] text-white font-outfit p-8 relative overflow-hidden"
      onClick={() => setActiveMenu(null)}
    >
      <NeuralBg side="right" />
      <div
        className={`absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br ${collectionInfo.color} blur-[150px] rounded-full pointer-events-none opacity-30`}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="flex items-start gap-6">
            <button
              onClick={() => router.push("/collections")}
              className="mt-2 w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-all group"
            >
              <ArrowLeft
                size={24}
                className="group-hover:-translate-x-1 transition-transform"
              />
            </button>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#ba8ffa] font-bold">
                  Collection
                </span>
                <div className="h-[1px] w-8 bg-white/10" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">
                  {resources.length} Items
                </span>
              </div>
              <h1 className="text-5xl font-bold tracking-tight mb-4">
                {collectionInfo.name}
              </h1>
              <p className="text-xl text-gray-500 font-spectral italic max-w-xl">
                {collectionInfo.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#ba8ffa] transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Search in collection..."
                className="bg-white/5 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-[#ba8ffa]/30 focus:bg-white/10 transition-all w-64"
              />
            </div>
            <button className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <Filter size={20} className="text-gray-400" />
            </button>
          </div>
        </header>

        {/* View Switcher */}
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

        {/* Resources Grid/List */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }
        >
          {resources.map((res) =>
            viewMode === "grid" ? (
              <div
                key={res.id}
                className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl hover:bg-white/[0.06] hover:border-white/10 transition-all duration-500 group relative"
              >
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
                          <Pencil
                            size={16}
                            className="group-hover/item:text-[#ba8ffa]"
                          />
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

                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border w-fit mb-6 ${STATUS_CONFIG[res.status || "not_started"].color}`}
                >
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
            ) : (
              <div
                key={res.id}
                className="flex items-center gap-6 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all group"
              >
                <div
                  className={`p-3 rounded-xl bg-white/5 ${res.color.replace("bg-", "text-")} group-hover:scale-110 transition-all`}
                >
                  {res.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold truncate group-hover:text-[#ba8ffa] transition-colors">
                      {res.title}
                    </h3>
                    <div
                      className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md border ${STATUS_CONFIG[res.status || "not_started"].color}`}
                    >
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
                          <Pencil
                            size={16}
                            className="group-hover/item:text-[#ba8ffa]"
                          />
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
            ),
          )}

          {/* Add Item Placeholder */}
          <div className="p-6 rounded-[2rem] border-2 border-dashed border-white/5 hover:border-[#ba8ffa]/30 transition-all duration-500 flex flex-col items-center justify-center gap-4 group cursor-pointer aspect-[4/3] md:aspect-auto">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-700 group-hover:text-[#ba8ffa] transition-colors">
              <Plus size={24} />
            </div>
            <span className="text-gray-600 font-bold tracking-tight text-sm group-hover:text-white">
              Add to Collection
            </span>
          </div>
        </div>
      </div>

      {/* Edit Resource Modal */}
      {showEditModal && (
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

            <h2 className="text-3xl font-bold mb-2 tracking-tight">
              Edit Resource
            </h2>
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
                  <option value="Article" className="bg-[#0a0a0a]">
                    Article
                  </option>
                  <option value="Video" className="bg-[#0a0a0a]">
                    Video
                  </option>
                  <option value="Course" className="bg-[#0a0a0a]">
                    Course
                  </option>
                  <option value="PDF" className="bg-[#0a0a0a]">
                    PDF
                  </option>
                  <option value="Tool" className="bg-[#0a0a0a]">
                    Tool
                  </option>
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
                  <option value="not_started" className="bg-[#0a0a0a]">
                    Not Started
                  </option>
                  <option value="in_progress" className="bg-[#0a0a0a]">
                    In Progress
                  </option>
                  <option value="completed" className="bg-[#0a0a0a]">
                    Completed
                  </option>
                  <option value="revisit_needed" className="bg-[#0a0a0a]">
                    Revisit Needed
                  </option>
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
      )}
    </div>
  );
};

export default CollectionDetail;
