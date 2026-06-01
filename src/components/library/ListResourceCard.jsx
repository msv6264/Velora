import {
  FileText,
  SquareArrowOutUpRight,
  FolderOpen,
  ExternalLink,
  MoreVertical,
  Trash2,
  Pencil,
  Activity,
} from "lucide-react";

import { STATUS_CONFIG } from "@/constants/library";

const ListResourceCard = ({
  resource,
  activeMenu,
  toggleMenu,
  handleEditResource,
  setResourceToDelete,
}) => {
  return (
    <div className="flex items-center gap-6 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all group">
      
      <div
        className={`p-3 rounded-xl bg-white/5 ${
          resource.color
            ? resource.color.replace("bg-", "text-")
            : "text-gray-500"
        } group-hover:scale-110 transition-all`}
      >
        {resource.icon || <FileText size={24} />}
      </div>

      <div className="flex-1 min-w-0">
        
        <div className="flex items-center gap-3">
          
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-lg font-bold truncate group-hover:text-[#ba8ffa] hover:text-[#8c5ad8]! transition-colors cursor-pointer"
          >
            {resource.title}

            <SquareArrowOutUpRight size={16} />
          </a>

          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#8791fe]/10 border border-[#8791fe]/20">
            
            <FolderOpen
              size={10}
              className="text-[#8791fe]"
            />

            <span className="text-[10px] text-[#8791fe] font-bold uppercase">
              {resource.category ||
                resource.collection ||
                "Uncategorized"}
            </span>

          </div>

          <div
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md border ${
              STATUS_CONFIG[
                resource.status || "not_started"
              ].color
            }`}
          >
            
            <Activity size={10} />

            <span className="text-[9px] font-bold uppercase tracking-wider">
              {
                STATUS_CONFIG[
                  resource.status || "not_started"
                ].label
              }
            </span>

          </div>
        </div>

        <div className="flex items-center gap-4 mt-1">
          
          <span className="text-[10px] uppercase tracking-wider text-gray-600 font-bold">
            {resource.type ||
              resource.category ||
              "Link"}
          </span>

          <span className="text-[10px] text-gray-700 italic font-spectral">
            •{" "}
            {resource.date ||
              new Date(
                resource.created_at
              ).toLocaleDateString()}
          </span>

        </div>
      </div>

      <div className="flex items-center gap-3">
        
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-gray-600 hover:text-[#ba8ffa] transition-colors"
        >
          <ExternalLink size={18} />
        </a>

        <div className="relative">
          
          <button
            onClick={(e) => toggleMenu(e, resource.id)}
            className={`p-2 rounded-xl transition-all ${
              activeMenu === resource.id
                ? "bg-[#ba8ffa] text-black"
                : "text-gray-600 hover:text-white"
            }`}
          >
            <MoreVertical size={18} />
          </button>

          {activeMenu === resource.id && (
            <div className="absolute right-0 mt-2 w-48 bg-[#121212] border border-white/10 rounded-2xl p-2 shadow-2xl z-50 backdrop-blur-3xl animate-in fade-in zoom-in duration-200">
              
              <button
                onClick={(e) =>
                  handleEditResource(e, resource)
                }
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-all group/item"
              >
                <Pencil size={16} />

                <span className="text-sm font-medium">
                  Edit
                </span>
              </button>

              <button
                onClick={() =>
                  setResourceToDelete(resource.id)
                }
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-red-500/10 hover:text-red-500 transition-all group/item cursor-pointer"
              >
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
  );
};

export default ListResourceCard;