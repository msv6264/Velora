import {
  Pencil,
  X,
  Type,
  ExternalLink,
  FolderOpen,
  Activity,
  Save,
} from "lucide-react";

import {
  RESOURCE_CATEGORIES,
  suggestions,
} from "@/constants/library";

const EditResourceModal = ({
  editingResource,
  setEditingResource,
  handleSave,
}) => {
  if (!editingResource) return null;

  return (
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

          {/* Title */}
          <div className="space-y-3">
            
            <label className="text-[10px] font-bold text-[#8791fe] uppercase tracking-[0.2em] px-1">
              Title{" "}
              <span className="text-red-500 ml-1 italic normal-case font-medium opacity-70">
                * Required
              </span>
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

          {/* URL */}
          <div className="space-y-3">
            
            <label className="text-[10px] font-bold text-[#8791fe] uppercase tracking-[0.2em] px-1">
              URL{" "}
              <span className="text-red-500 ml-1 italic normal-case font-medium opacity-70">
                * Required
              </span>
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

          {/* Collection */}
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
                  <option
                    key={col}
                    value={col}
                    className="bg-[#0a0a0a]"
                  >
                    {col}
                  </option>
                ))}

              </select>

            </div>
          </div>

          {/* Categories */}
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
                    (editingResource.type ||
                      editingResource.category) === cat.id
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

          {/* Status */}
          <div className="space-y-3">
            
            <label className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em] px-1">
              Status
            </label>

            <div className="relative group">
              
              <Activity
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#8791fe] transition-colors"
                size={20}
              />

              <select
                value={editingResource.status || "not_started"}
                onChange={(e) =>
                  setEditingResource({
                    ...editingResource,
                    status: e.target.value,
                  })
                }
                className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-14 pr-10 text-white focus:outline-none focus:border-[#8791fe]/30 focus:bg-white/10 transition-all appearance-none cursor-pointer"
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
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/5 bg-white/[0.02]">
          
          <button
            onClick={handleSave}
            disabled={
              !editingResource.title?.trim() ||
              !editingResource.url?.trim()
            }
            className={`w-full font-black py-4 rounded-2xl transition-all duration-500 flex items-center justify-center gap-3 text-lg group ${
              editingResource.title?.trim() &&
              editingResource.url?.trim()
                ? "bg-white text-black hover:bg-[#ba8ffa] hover:shadow-[0_10px_30px_rgba(186,143,250,0.4)] cursor-pointer"
                : "bg-white/10 text-gray-600 cursor-not-allowed border border-white/5"
            }`}
          >
            
            <span>Save Changes</span>

            <Save className="group-hover:scale-110 transition-transform" />

          </button>

        </div>
      </div>
    </div>
  );
};

export default EditResourceModal;