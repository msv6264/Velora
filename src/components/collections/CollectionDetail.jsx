"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

import NeuralBg from "@/components/NeuralBg";
import { Plus } from "lucide-react";

import CollectionDetailHeader from "./CollectionDetailHeader";
import CollectionDetailToolbar from "./CollectionDetailToolbar";
import CollectionGridCard from "./CollectionGridCard";
import CollectionListCard from "./CollectionListCard";
import CollectionResourceEditModal from "./CollectionResourceEditModal";

import { getCollections, getRelations } from "@/services/collections";
import { getResources, updateResource, deleteResource } from "@/services/resources";

const CollectionDetail = () => {
  const router = useRouter();
  const { id } = useParams();
  const [viewMode, setViewMode] = useState("grid");
  const [activeMenu, setActiveMenu] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  // Resource Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [formTitle, setFormTitle] = useState("");
  const [formType, setFormType] = useState("");
  const [formStatus, setFormStatus] = useState("not_started");

  // Data State
  const [collectionInfo, setCollectionInfo] = useState(null);
  const [resources, setResources] = useState([]);

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

        const { data: allResources, error: resError } = await getResources();
        if (resError) throw new Error("Failed to load resources");

        const collectionResources = (allResources || []).filter((r) =>
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
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }
        >
          {resources.map((res) =>
            viewMode === "grid" ? (
              <CollectionGridCard
                key={res.id}
                res={res}
                activeMenu={activeMenu}
                toggleMenu={toggleMenu}
                handleEditClick={handleEditClick}
                handleDeleteResource={handleDeleteResource}
              />
            ) : (
              <CollectionListCard
                key={res.id}
                res={res}
                activeMenu={activeMenu}
                toggleMenu={toggleMenu}
                handleEditClick={handleEditClick}
                handleDeleteResource={handleDeleteResource}
              />
            )
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
    </div>
  );
};

export default CollectionDetail;
