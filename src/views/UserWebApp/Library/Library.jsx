"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getResources, updateResource } from "../../../services/resources";

import {
  Search,
  ArrowLeft,
  Filter,
  LayoutGrid,
  List,
  Plus,
  TvMinimalPlay,
  FileText,
  GitBranch,
  Layout,
  MoreVertical,
  ExternalLink,
  FolderOpen,
  Pencil,
  Trash2,
  X,
  Save,
  Type,
} from "lucide-react";

const Library = () => {
  const router = useRouter();
  const [viewMode, setViewMode] = useState("grid");
  const [filter, setFilter] = useState("All");
  const [activeMenu, setActiveMenu] = useState(null);
  const [resources, setResources] = useState({});
  const [editingResource, setEditingResource] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      const response = await getResources();
      console.log(response.data);
      if (response.data) {
        const resourceMap = response.data.reduce((acc, item) => {
          acc[item.id] = item;
          return acc;
        }, {});
        setResources(resourceMap);
      } else {
        return { message: "No resources found" };
      }
    };
    fetchResources();
  }, []);

  const suggestions = [
    "Research",
    "Dev Tools",
    "Design Inspo",
    "AI & ML",
    "Web Dev",
  ];

  const RESOURCE_CATEGORIES = [
    { id: "Article", icon: <FileText size={16} /> },
    { id: "Video", icon: <TvMinimalPlay size={16} /> },
    { id: "Repository", icon: <GitBranch size={16} /> },
    { id: "Tool", icon: <Layout size={16} /> },
  ];

  const toggleMenu = (e, id) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === id ? null : id);
  };

  const handleEditResource = (e, res) => {
    e.stopPropagation();
    setEditingResource(res);
    setActiveMenu(null);
  };

  const handleSave = async () => {
    try {
      // Prevent modifying primary key and immutable fields
      const { id, user_id, created_at, ...updatePayload } = editingResource;

      // Send to backend
      await updateResource(editingResource.id, updatePayload);

      // Update local state
      setResources((prev) => ({
        ...prev,
        [editingResource.id]: editingResource,
      }));
      setEditingResource(null);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#030303] text-white font-outfit p-8 relative overflow-hidden"
      onClick={() => setActiveMenu(null)}
    >
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ba8ffa]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/dashboard")}
              className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-all group"
            >
              <ArrowLeft
                size={24}
                className="group-hover:-translate-x-1 transition-transform"
              />
            </button>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">My Library</h1>
              {Object.keys(resources).length > 0 ? (
                <p className="text-gray-500 font-spectral italic">
                  {Object.keys(resources).length} resources collected with
                  intention.
                </p>
              ) : (
                <p className="text-gray-500 font-spectral italic">
                  Get started by curating your first resource.
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group flex-1 md:w-80">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#ba8ffa] transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-[#ba8ffa]/30 focus:bg-white/10 transition-all"
              />
            </div>
            <button
              onClick={() => router.push("/add-resource")}
              className="p-3.5 rounded-2xl bg-[#ba8ffa] text-black hover:shadow-[0_0_25px_rgba(186,143,250,0.3)] cursor-pointer transition-all"
            >
              <Plus size={24} />
            </button>
          </div>
        </header>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/5">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {["All", "Articles", "Videos", "Courses", "Tools", "PDFs"].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2.5 rounded-xl border transition-all whitespace-nowrap ${filter === cat ? "bg-[#ba8ffa]/10 border-[#ba8ffa]/30 text-[#ba8ffa] font-bold" : "bg-white/5 border-white/5 text-gray-500 hover:text-white"}`}
                >
                  {cat}
                </button>
              ),
            )}
          </div>

          <div className="hidden md:flex items-center gap-2 p-1.5 rounded-xl bg-white/5 border border-white/5">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white/10 text-white shadow-xl" : "text-gray-500 hover:text-white"}`}
            >
              <LayoutGrid size={20} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white/10 text-white shadow-xl" : "text-gray-500 hover:text-white"}`}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        {/* Resource Content */}
        {Object.values(resources).filter((res) => {
          if (filter === "All") return true;
          // Handle plural vs singular (Articles -> Article, etc.)
          const typeFilter =
            filter.endsWith("s") && filter !== "PDFs"
              ? filter.slice(0, -1)
              : filter === "PDFs"
                ? "PDF"
                : filter;
          return res.type === typeFilter;
        }).length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-8 pb-4 text-center animate-in fade-in duration-500">
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <FolderOpen size={48} className="text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold mb-3 tracking-tight">
              No resources found
            </h2>
            <p className="text-gray-500 max-w-md mb-8">
              {filter === "All"
                ? "You haven't added any resources to your library yet. Start curating your collection!"
                : `You don't have any ${filter.toLowerCase()} in your library yet.`}
            </p>
            <button
              onClick={() => router.push("/add-resource")}
              className="px-6 py-3 rounded-xl bg-[#ba8ffa] text-black font-semibold hover:shadow-[0_0_25px_rgba(186,143,250,0.3)] cursor-pointer transition-all flex items-center gap-2"
            >
              <Plus size={20} />
              <span>Add Resource</span>
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "mb-3"
            }
          >
            {Object.values(resources)
              .filter((res) => {
                if (filter === "All") return true;
                const typeFilter =
                  filter.endsWith("s") && filter !== "PDFs"
                    ? filter.slice(0, -1)
                    : filter === "PDFs"
                      ? "PDF"
                      : filter;
                return res.type === typeFilter;
              })
              .map((res) =>
                viewMode === "grid" ? (
                  <div
                    key={res.id}
                    className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl hover:bg-white/[0.06] hover:border-white/10 transition-all duration-500 group relative"
                  >
                    <div
                      className={`w-12 h-1.5 rounded-full ${res.color || "bg-[#ba8ffa] shadow-[0_0_10px_rgba(186,143,250,0.3)]"} mb-6 group-hover:scale-110 transition-transform origin-left`}
                    />
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 rounded-xl bg-white/5 text-gray-400 group-hover:text-[#ba8ffa] transition-colors">
                        {res.icon || <FileText size={24} />}
                      </div>
                      <div className="relative">
                        <button
                          onClick={(e) => toggleMenu(e, res.id)}
                          className={`p-2 rounded-xl transition-all ${activeMenu === res.id ? "bg-[#ba8ffa] text-black" : "text-gray-600 hover:text-white hover:bg-white/5"}`}
                        >
                          <MoreVertical size={20} />
                        </button>

                        {/* Dropdown Menu */}
                        {activeMenu === res.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-[#121212] border border-white/10 rounded-2xl p-2 shadow-2xl z-50 backdrop-blur-3xl animate-in fade-in zoom-in duration-200">
                            <button
                              onClick={(e) => handleEditResource(e, res)}
                              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-all group/item"
                            >
                              <Pencil
                                size={16}
                                className="group-hover/item:text-[#ba8ffa]"
                              />
                              <span className="text-sm font-medium">
                                Edit Resource
                              </span>
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-red-500/10 hover:text-red-500 transition-all group/item">
                              <Trash2
                                size={16}
                                className="group-hover/item:text-red-500"
                              />
                              <span className="text-sm font-medium">
                                Delete
                              </span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-4 tracking-tight leading-snug group-hover:text-[#ba8ffa] transition-colors h-14 line-clamp-2">
                      {res.title}
                    </h3>

                    {/* Collection Badge */}
                    <div className="flex items-center gap-2 mb-6 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 w-fit">
                      <FolderOpen size={14} className="text-[#8791fe]" />
                      <span className="text-xs text-gray-400 font-medium">
                        {res.category || res.collection || "Uncategorized"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <span className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-bold">
                        {res.type || "Link"}
                      </span>
                      <span className="text-xs text-gray-600 font-spectral italic">
                        {res.date ||
                          new Date(res.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div
                    key={res.id}
                    className="flex items-center gap-6 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all group"
                  >
                    <div
                      className={`p-3 rounded-xl bg-white/5 ${res.color ? res.color.replace("bg-", "text-") : "text-gray-500"} group-hover:scale-110 transition-all`}
                    >
                      {res.icon || <FileText size={24} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold truncate group-hover:text-[#ba8ffa] transition-colors">
                          {res.title}
                        </h3>
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#8791fe]/10 border border-[#8791fe]/20">
                          <FolderOpen size={10} className="text-[#8791fe]" />
                          <span className="text-[10px] text-[#8791fe] font-bold uppercase">
                            {res.category || res.collection || "Uncategorized"}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-[10px] uppercase tracking-wider text-gray-600 font-bold">
                          {res.type || "Link"}
                        </span>
                        <span className="text-[10px] text-gray-700 italic font-spectral">
                          •{" "}
                          {res.date ||
                            new Date(res.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-600 hover:text-[#ba8ffa] transition-colors"
                      >
                        <ExternalLink size={18} />
                      </a>
                      <div className="relative">
                        <button
                          onClick={(e) => toggleMenu(e, res.id)}
                          className={`p-2 rounded-xl transition-all ${activeMenu === res.id ? "bg-[#ba8ffa] text-black" : "text-gray-600 hover:text-white"}`}
                        >
                          <MoreVertical size={18} />
                        </button>
                        {/* List View Dropdown */}
                        {activeMenu === res.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-[#121212] border border-white/10 rounded-2xl p-2 shadow-2xl z-50 backdrop-blur-3xl animate-in fade-in zoom-in duration-200">
                            <button
                              onClick={(e) => handleEditResource(e, res)}
                              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-all group/item"
                            >
                              <Pencil size={16} />
                              <span className="text-sm font-medium">Edit</span>
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-red-500/10 hover:text-red-500 transition-all group/item">
                              <Trash2 size={16} />
                              <span className="text-sm font-medium">
                                Delete
                              </span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ),
              )}
          </div>
        )}
      </div>

      {/* Edit Resource Modal */}
      {editingResource && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setEditingResource(null)}
          />
          <div className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white/5 text-[#ba8ffa]">
                  <Pencil size={20} />
                </div>
                <h3 className="text-xl font-bold tracking-tight">
                  Edit Resource
                </h3>
              </div>
              <button
                onClick={() => setEditingResource(null)}
                className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-xl transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form Body */}
            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-[#8791fe] uppercase tracking-[0.2em] px-1">
                  Title
                </label>
                <div className="relative group">
                  <Type
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#8791fe] transition-colors"
                    size={20}
                  />
                  <input
                    type="text"
                    value={editingResource.title || ""}
                    onChange={(e) =>
                      setEditingResource({
                        ...editingResource,
                        title: e.target.value,
                      })
                    }
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-14 pr-4 text-white focus:outline-none focus:border-[#8791fe]/30 focus:bg-white/[0.08] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-[#8791fe] uppercase tracking-[0.2em] px-1">
                  URL
                </label>
                <div className="relative group">
                  <ExternalLink
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#8791fe] transition-colors"
                    size={20}
                  />
                  <input
                    type="url"
                    value={editingResource.url || ""}
                    onChange={(e) =>
                      setEditingResource({
                        ...editingResource,
                        url: e.target.value,
                      })
                    }
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-14 pr-4 text-white focus:outline-none focus:border-[#8791fe]/30 focus:bg-white/[0.08] transition-all"
                    placeholder="https://"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-[#8791fe] uppercase tracking-[0.2em] px-1">
                  Collection
                </label>
                <div className="relative group">
                  <FolderOpen
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#8791fe] transition-colors"
                    size={20}
                  />
                  <select
                    value={
                      editingResource.collection ||
                      editingResource.category ||
                      ""
                    }
                    onChange={(e) =>
                      setEditingResource({
                        ...editingResource,
                        collection: e.target.value,
                      })
                    }
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-14 pr-10 text-white focus:outline-none focus:border-[#8791fe]/30 focus:bg-white/[0.08] transition-all appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[#0a0a0a]">
                      Library (Unsorted)
                    </option>
                    {suggestions.map((col) => (
                      <option key={col} value={col} className="bg-[#0a0a0a]">
                        {col}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em] px-1">
                  Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {RESOURCE_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() =>
                        setEditingResource({
                          ...editingResource,
                          type: cat.id,
                          category: cat.id,
                        })
                      }
                      className={`flex flex-col items-center justify-center gap-2 py-3 rounded-xl border transition-all duration-300 ${
                        (editingResource.type || editingResource.category) ===
                        cat.id
                          ? "bg-[#ba8ffa] border-[#ba8ffa] text-black font-bold shadow-[0_5px_15px_rgba(186,143,250,0.3)]"
                          : "bg-white/5 border-white/5 text-gray-500 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {cat.icon}
                      <span className="text-[10px] uppercase tracking-wider">
                        {cat.id}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/5 bg-white/[0.02]">
              <button
                onClick={async () => handleSave()}
                className="w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-[#ba8ffa] hover:shadow-[0_10px_30px_rgba(186,143,250,0.4)] transition-all duration-500 flex items-center justify-center gap-3 text-lg group"
              >
                <span>Save Changes</span>
                <Save
                  size={20}
                  className="group-hover:scale-110 transition-transform"
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;
