"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

import NeuralBg from "@/components/NeuralBg";
import { Plus } from "lucide-react";

import CollectionDetailHeader from "./CollectionDetailHeader";
import CollectionDetailToolbar from "./CollectionDetailToolbar";
import CollectionResourceEditModal from "./CollectionResourceEditModal";
import CollectionGalleryCard from "./CollectionGalleryCard";
import CollectionPathCard from "./CollectionPathCard";
import AddMilestoneModal from "./AddMilestoneModal";

import { getCollections, getRelations, addRelations } from "@/services/collections";
import { getResources, updateResource, deleteResource } from "@/services/resources";

const CollectionDetail = () => {
  const router = useRouter();
  const { id } = useParams();
  const [viewMode, setViewMode] = useState("path");
  const [activeMenu, setActiveMenu] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  // Resource Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [formTitle, setFormTitle] = useState("");
  const [formType, setFormType] = useState("");
  const [formStatus, setFormStatus] = useState("not_started");

  // Add Milestone Modal State
  const [showAddMilestoneModal, setShowAddMilestoneModal] = useState(false);

  // Data State
  const [collectionInfo, setCollectionInfo] = useState(null);
  const [resources, setResources] = useState([]);
  const [allResources, setAllResources] = useState([]);

  React.useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const { data: collections, error: colError } = await getCollections();
        if (colError || !collections) throw new Error("Failed to load collections");

        const col = collections.find((c) => c.id.toString() === id);
        if (!col) {
          router.push("/collections");
          return;
        }

        setCollectionInfo({
          id: col.id,
          name: col.name,
          description: "Organized path to intentional learning.",
          color: col.theme_color || col.color || "from-[#ba8ffa]/20",
        });

        const { data: relData, error: relError } = await getRelations(id);
        if (relError) throw new Error("Failed to load relations");
        const resourceIds = (relData || []).map((r) => r.resource_id);

        const { data: allRes, error: resError } = await getResources();
        if (resError) throw new Error("Failed to load resources");

        setAllResources(allRes || []);

        const collectionResources = (allRes || []).filter((r) =>
          resourceIds.includes(r.id),
        );
        setResources(collectionResources);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      loadData();
    }
  }, [id, router]);

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

    await updateResource(editingResource.id, updatePayload);
  };

  const handleDeleteResource = async (resourceId) => {
    setResources((prev) => prev.filter((r) => r.id !== resourceId));
    setActiveMenu(null);
    await deleteResource(resourceId);
  };

  const handleAddResources = async (selectedIds) => {
    try {
      const { data, error } = await addRelations(id, selectedIds);
      if (error) throw error;

      const newlyAdded = allResources.filter((r) => selectedIds.includes(r.id));
      setResources((prev) => [...prev, ...newlyAdded]);
      setShowAddMilestoneModal(false);
    } catch (err) {
      console.error("Failed to add resources: ", err);
    }
  };

  const remainingResources = allResources.filter(
    (r) => !resources.some((existing) => existing.id === r.id)
  );

  if (isLoading || !collectionInfo) {
    return (
      <div className="min-h-screen bg-[#030303] text-white flex items-center justify-center font-outfit">
        Loading...
      </div>
    );
  }

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
        <CollectionDetailHeader 
          router={router} 
          resources={resources} 
          collectionInfo={collectionInfo} 
        />

        {/* View Switcher */}
        <CollectionDetailToolbar 
          viewMode={viewMode} 
          setViewMode={setViewMode} 
        />

        {/* Resources Grid/List */}
        <div
          className={
            viewMode === "gallery"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "flex flex-col gap-8"
          }
        >
          {resources.map((res, index) =>
            viewMode === "gallery" ? (
              <CollectionGalleryCard
                key={res.id}
                res={res}
                activeMenu={activeMenu}
                toggleMenu={toggleMenu}
                handleEditClick={handleEditClick}
                handleDeleteResource={handleDeleteResource}
                collectionColor={collectionInfo.color}
              />
            ) : (
              <CollectionPathCard
                key={res.id}
                res={res}
                index={index}
                activeMenu={activeMenu}
                toggleMenu={toggleMenu}
                handleEditClick={handleEditClick}
                handleDeleteResource={handleDeleteResource}
                collectionColor={collectionInfo.color}
              />
            )
          )}

          {/* Add Item Placeholder */}
          {viewMode === "gallery" ? (
            <div 
              onClick={() => setShowAddMilestoneModal(true)}
              className="p-6 rounded-[2.5rem] border-2 border-dashed border-white/5 hover:border-white/20 transition-all duration-500 flex flex-col items-center justify-center gap-4 group cursor-pointer h-80 bg-white/[0.01]"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-xl">
                <Plus size={24} />
              </div>
              <span className="text-gray-500 font-bold tracking-tight text-sm group-hover:text-white uppercase transition-colors">
                Add to Collection
              </span>
            </div>
          ) : (
            <div 
              onClick={() => setShowAddMilestoneModal(true)}
              className="relative flex gap-8 group cursor-pointer"
            >
              {/* Node / Number */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#0a0a0a] border-2 border-dashed border-white/10 flex items-center justify-center text-gray-500 group-hover:scale-110 transition-all duration-500 group-hover:border-white/30 group-hover:text-white">
                  <Plus size={20} />
                </div>
              </div>

              {/* Card Content */}
              <div className="flex-1 bg-[#0a0a0a] border border-dashed border-white/10 rounded-[2.5rem] p-8 hover:bg-white/[0.01] hover:border-white/20 transition-all duration-500 flex items-center gap-4">
                <span className="text-gray-500 font-bold tracking-tight text-sm group-hover:text-white uppercase transition-colors">
                  Add new milestone / content
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Resource Modal */}
      <CollectionResourceEditModal
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        formTitle={formTitle}
        setFormTitle={setFormTitle}
        formType={formType}
        setFormType={setFormType}
        formStatus={formStatus}
        setFormStatus={setFormStatus}
        handleSaveResource={handleSaveResource}
      />

      {/* Add Milestone Modal */}
      <AddMilestoneModal
        isOpen={showAddMilestoneModal}
        onClose={() => setShowAddMilestoneModal(false)}
        remainingResources={remainingResources}
        onAddResources={handleAddResources}
      />
    </div>
  );
};

export default CollectionDetail;
