"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useResources } from "@/hooks/library/useResources";
import DeleteDialog from "../../../components/DeleteDialog";
import GridResourceCard from "@/components/library/GridResourceCard";
import ListResourceCard from "@/components/library/ListResourceCard";
import EmptyState from "@/components/library/EmptyState";
import EditResourceModal from "@/components/library/EditResourceModal";
import LibraryToolbar from "@/components/library/LibraryToolbar";
import {
  Search,
  ArrowLeft,
  Plus,
} from "lucide-react";

const Library = () => {
  const router = useRouter();
  const [viewMode, setViewMode] = useState("grid");
  const [filter, setFilter] = useState("All");
  const [activeMenu, setActiveMenu] = useState(null);
  const [editingResource, setEditingResource] = useState(null);
  const [resourceToDelete, setResourceToDelete] = useState(null);

  const { resources, setResources, handleSave, handleDelete } = useResources({
    editingResource,
    setEditingResource,
  });

  const filteredResources = useMemo(() => {
    return Object.values(resources).filter((res) => {
      if (filter === "All") return true;

      const typeFilter =
        filter === "Repositories"
          ? "Repository"
          : filter === "PDFs"
            ? "PDF"
            : filter.endsWith("s")
              ? filter.slice(0, -1)
              : filter;

      return (res.type || res.category) === typeFilter;
    });
  }, [resources, filter]);

  const toggleMenu = (e, id) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === id ? null : id);
  };

  const handleEditResource = (e, res) => {
    e.stopPropagation();
    setEditingResource(res);
    setActiveMenu(null);
  };

  // Note: data logic moved to `useResources` hook; UI-only state remains here.

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
        <LibraryToolbar
          filter={filter}
          setFilter={setFilter}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {/* Resource Content */}
        {filteredResources.length === 0 ? (
          <EmptyState filter={filter} router={router} />
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "mb-3"
            }
          >
            {filteredResources.map((res) =>
              viewMode === "grid" ? (
                <GridResourceCard
                  key={res.id}
                  resource={res}
                  activeMenu={activeMenu}
                  toggleMenu={toggleMenu}
                  handleEditResource={handleEditResource}
                  setResourceToDelete={setResourceToDelete}
                />
              ) : (
                <ListResourceCard
                  key={res.id}
                  resource={res}
                  activeMenu={activeMenu}
                  toggleMenu={toggleMenu}
                  handleEditResource={handleEditResource}
                  setResourceToDelete={setResourceToDelete}
                />
              ),
            )}
          </div>
        )}
      </div>

      {/* Edit Resource Modal */}
      <EditResourceModal
        editingResource={editingResource}
        setEditingResource={setEditingResource}
        handleSave={handleSave}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        isOpen={!!resourceToDelete}
        onClose={() => setResourceToDelete(null)}
        onConfirm={() => {
          handleDelete(resourceToDelete);
          setResourceToDelete(null);
        }}
        title="Delete Resource"
        message="Are you sure you want to delete this resource? This action cannot be undone."
      />
    </div>
  );
};

export default Library;
