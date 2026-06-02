import {
  MoreVertical,
  FileText,
  SquareArrowOutUpRight,
  FolderOpen,
  Pencil,
  Trash2,
  Activity,
} from "lucide-react";

import { STATUS_CONFIG } from "@/constants/library";

const GridResourceCard = ({
  resource,
  activeMenu,
  toggleMenu,
  handleEditResource,
  setResourceToDelete,
}) => {
  console.log("resource: ", resource);
  return (
    <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl hover:bg-white/[0.06] hover:border-white/10 transition-all duration-500 group relative">
      <div
        className={`w-12 h-1.5 rounded-full ${
          resource.color ||
          "bg-[#ba8ffa] shadow-[0_0_10px_rgba(186,143,250,0.3)]"
        } mb-6 group-hover:scale-110 transition-transform origin-left`}
      />

      <div className="flex justify-between items-start mb-4">
        <div className="p-3 rounded-xl bg-white/5 text-gray-400 group-hover:text-[#ba8ffa] transition-colors">
          {resource.icon || <FileText size={24} />}
        </div>

        <div className="relative">
          <button
            onClick={(e) => toggleMenu(e, resource.id)}
            className={`p-2 cursor-pointer rounded-xl transition-all ${
              activeMenu === resource.id
                ? "bg-[#ba8ffa] text-black"
                : "text-gray-600 hover:text-white hover:bg-white/5"
            }`}
          >
            <MoreVertical size={20} />
          </button>
          {activeMenu === resource.id && (
            <div className="absolute right-0 mt-2 w-48 bg-[#121212] border border-white/10 rounded-2xl p-2 shadow-2xl z-50 backdrop-blur-3xl animate-in fade-in zoom-in duration-200">
              <button
                onClick={(e) => handleEditResource(e, resource)}
                className="w-full flex cursor-pointer items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-all group/item"
              >
                <Pencil size={16} className="group-hover/item:text-[#ba8ffa]" />

                <span className="text-sm font-medium">Edit Resource</span>
              </button>

              <button
                onClick={() => setResourceToDelete(resource.id)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-red-500/10 hover:text-red-500 transition-all group/item cursor-pointer"
              >
                <Trash2 size={16} className="group-hover/item:text-red-500" />

                <span className="text-sm font-medium">Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-xl font-bold mb-4 tracking-tight leading-snug group-hover:text-[#ba8ffa] hover:text-[#8c5ad8]! transition-colors h-14 line-clamp-2 cursor-pointer"
      >
        {resource.title}

        <SquareArrowOutUpRight size={18} className="inline-block ml-1 -mt-1" />
      </a>

      <div className="flex flex-wrap items-center gap-2 mb-6">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 w-fit">
          <FolderOpen size={14} className="text-[#8791fe]" />

          <span className="text-xs text-gray-400 font-medium">
            {resource.type || resource.category || resource.collection || "Uncategorized"}
          </span>
        </div>

        <div
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border w-fit ${
            STATUS_CONFIG[resource.status || "not_started"].color
          }`}
        >
          <Activity size={14} />

          <span className="text-[10px] font-bold uppercase tracking-wider">
            {STATUS_CONFIG[resource.status || "not_started"].label}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GridResourceCard;