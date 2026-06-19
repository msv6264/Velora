"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import NeuralBg from "../../../components/NeuralBg";
import { FolderPlus, ArrowLeft } from "lucide-react";
import {
  createCollection,
  getCollections,
  updateCollections,
  getRelations,
  getResourceCount,
  deleteCollections,
} from "@/services/collections";
import { getResources } from "@/services/resources";

import CollectionCard from "@/components/collections/CollectionCard";
import CollectionModal from "@/components/collections/CollectionModal";
import DeleteDialog from "../../../components/DeleteDialog";

const Collections = () => {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState(null);

  // Modals state
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);
  const [collectionToDelete, setCollectionToDelete] = useState(null);
  const [allResources, setAllResources] = useState([]);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    async function loadResources() {
      const { data } = await getResources();
      setAllResources(data);
    }

    loadResources();
  }, []);

  useEffect(() => {
    async function loadCollections() {
      const { data, error } = await getCollections();

      if (error) {
        console.error("Failed to load collections:", error);
        return;
      }

      const collectionsWithCount = await Promise.all(
        (data ?? []).map(async (collection) => {
          const { count } = await getResourceCount(collection.id);
          return {
            ...collection,
            color: collection.color ?? collection.theme_color,
            count: count,
          };
        }),
      );

      setCollections(collectionsWithCount);
    }

    loadCollections();
  }, []);

  const availableResources = allResources.map((resource) => ({
    id: resource.id,
    title: resource.title,
  }));

  // Theme Options
  const themeOptions = [
    "from-[#ba8ffa]/20 to-transparent",
    "from-[#8791fe]/20 to-transparent",
    "from-rose-500/20 to-transparent",
    "from-emerald-500/20 to-transparent",
    "from-amber-500/20 to-transparent",
    "from-cyan-500/20 to-transparent",
  ];

  // Form States
  const [formName, setFormName] = useState("");
  const [formColor, setFormColor] = useState(themeOptions[0]);
  const [formIcon, setFormIcon] = useState("Layers");
  const [selectedResources, setSelectedResources] = useState([]);

  const toggleMenu = (e, id) => {
    e?.stopPropagation?.();
    setActiveMenu(activeMenu === id ? null : id);
  };

  const openCreateModal = () => {
    setFormName("");
    setFormColor(themeOptions[0]);
    setFormIcon("Layers");
    setSelectedResources([]);
    setShowCreateModal(true);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!formName) return;

    const newCollection = {
      id: Date.now(),
      name: formName,
      count: selectedResources.length,
      icon: formIcon,
      color: formColor,
    };

    setCollections((prev) => [...prev, newCollection]);
    createCollection(newCollection, selectedResources);
    setShowCreateModal(false);
  };

  const handleEditClick = async (e, col) => {
    e.stopPropagation();
    setEditingCollection(col);
    setFormName(col.name);
    setFormColor(col.color);
    setFormIcon(col.icon);

    // Fetch existing relations
    const { data, error } = await getRelations(col.id);
    if (!error && data) {
      setSelectedResources(data.map((r) => r.resource_id));
    } else {
      setSelectedResources([]);
    }

    setShowEditModal(true);
    setActiveMenu(null);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    // 1. Package the updated details into a single object payload
    const updatedData = {
      name: formName,
      theme_color: formColor,
      icon: formIcon,
    };

    // 2. Update frontend state (optimistic update)
    setCollections((prev) =>
      prev.map((c) =>
        c.id === editingCollection.id
          ? {
              ...c,
              name: formName,
              color: formColor,
              icon: formIcon,
              count: selectedResources.length,
            }
          : c,
      ),
    );
    setShowEditModal(false);

    // 3. Send the ID, updated details, and selected resources to the backend
    const { error } = await updateCollections(
      editingCollection.id,
      updatedData,
      selectedResources,
    );
    if (error) {
      console.error("Failed to update collection:", error);
    }
  };

  const handleDeleteCollection = async () => {
    if (!collectionToDelete) return;

    const id = collectionToDelete.id;
    setCollections((prev) => prev.filter((c) => c.id !== id));
    
    const { error } = await deleteCollections(id);
    if (error) {
      console.error("Failed to delete collection:", error);
    }
    setCollectionToDelete(null);
  };

  const toggleResourceSelection = (id) => {
    setSelectedResources((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id],
    );
  };

  return (
    <div
      className="min-h-screen bg-[#030303] text-white font-outfit p-8 relative overflow-hidden"
      onClick={() => setActiveMenu(null)}
    >
      <NeuralBg side="right" />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#ba8ffa]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-6">
            <button
              onClick={() => router.push("/dashboard")}
              className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-all group"
            >
              <ArrowLeft
                size={24}
                className="group-hover:-translate-x-1 transition-transform"
              />
            </button>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Collections</h1>
              <p className="text-gray-500 font-spectral italic text-lg">
                Organized paths to intentional learning.
              </p>
            </div>
          </div>

          <button
            onClick={openCreateModal}
            className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-[#ba8ffa] text-black hover:shadow-[0_0_25px_rgba(186,143,250,0.3)] transition-all group"
          >
            <FolderPlus size={20} />
            <span className="font-bold tracking-tight">New Collection</span>
          </button>
        </header>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((col) => (
            <CollectionCard
              key={col.id}
              col={col}
              router={router}
              activeMenu={activeMenu}
              toggleMenu={toggleMenu}
              handleEditClick={handleEditClick}
              setCollectionToDelete={setCollectionToDelete}
            />
          ))}

          {/* Add Placeholder */}
          <div
            onClick={openCreateModal}
            className="p-8 rounded-[2.5rem] border-2 border-dashed border-white/5 hover:border-[#ba8ffa]/30 transition-all duration-500 flex flex-col items-center justify-center gap-4 group cursor-pointer min-h-[250px]"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-gray-700 group-hover:text-[#ba8ffa] transition-colors">
              <FolderPlus size={32} />
            </div>
            <span className="text-gray-600 font-bold tracking-tight group-hover:text-white">
              Create New
            </span>
          </div>
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      <CollectionModal
        isOpen={showCreateModal || showEditModal}
        onClose={() => {
          setShowCreateModal(false);
          setShowEditModal(false);
        }}
        isEditMode={showEditModal}
        formName={formName}
        setFormName={setFormName}
        formIcon={formIcon}
        setFormIcon={setFormIcon}
        formColor={formColor}
        setFormColor={setFormColor}
        selectedResources={selectedResources}
        toggleResourceSelection={toggleResourceSelection}
        availableResources={availableResources}
        onSubmit={showCreateModal ? handleCreate : handleSaveEdit}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        isOpen={!!collectionToDelete}
        onClose={() => setCollectionToDelete(null)}
        onConfirm={handleDeleteCollection}
        title="Delete Collection"
        message="Are you sure you want to delete this collection? This action cannot be undone."
      />
    </div>
  );
};

export default Collections;

