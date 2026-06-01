import { useState, useEffect } from "react";
import {
  deleteResource,
  getResources,
  updateResource,
} from "@/services/resources";
import toast from "react-hot-toast";

export function useResources({ editingResource, setEditingResource } = {}) {
  const [resources, setResources] = useState({});

  useEffect(() => {
    const fetchResources = async () => {
      const response = await getResources();
      if (response?.data) {
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

  const handleSave = async () => {
    const resource = editingResource;
    if (!resource?.title?.trim() || !resource?.url?.trim()) {
      toast.error("Please provide both a title and a URL.");
      return;
    }

    try {
      const { id, user_id, created_at, ...updatePayload } = resource;
      await updateResource(resource.id, updatePayload);

      setResources((prev) => ({
        ...prev,
        [resource.id]: resource,
      }));

      if (typeof setEditingResource === "function") setEditingResource(null);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const handleDelete = async (resId) => {
    const response = await deleteResource(resId);

    if (response) {
      setResources((prev) => {
        const next = { ...prev };
        delete next[resId];
        return next;
      });
      toast.success("Resource deleted successfully");
    } else {
      console.log("Error in deleting resource: ", response);
      toast.error("Failed to delete resource");
    }
  };

  return {
    resources,
    setResources,
    handleSave,
    handleDelete,
  };
}
