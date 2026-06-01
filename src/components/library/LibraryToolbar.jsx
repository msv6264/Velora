import {
  LayoutGrid,
  List,
} from "lucide-react";

import { filterArr } from "@/constants/library";

const LibraryToolbar = ({
  filter,
  setFilter,
  viewMode,
  setViewMode,
}) => {
  return (
    <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/5">

      <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 no-scrollbar">

        {filterArr.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2.5 rounded-xl border cursor-pointer transition-all whitespace-nowrap ${
              filter === cat
                ? "bg-[#ba8ffa]/10 border-[#ba8ffa]/30 text-[#ba8ffa] font-bold"
                : "bg-white/5 border-white/5 text-gray-500 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}

      </div>

      <div className="hidden md:flex items-center gap-2 p-1.5 rounded-xl bg-white/5 border border-white/5">

        <button
          onClick={() => setViewMode("grid")}
          className={`p-2 rounded-lg transition-all ${
            viewMode === "grid"
              ? "bg-white/10 text-white shadow-xl"
              : "text-gray-500 hover:text-white"
          }`}
        >
          <LayoutGrid size={20} />
        </button>

        <button
          onClick={() => setViewMode("list")}
          className={`p-2 rounded-lg transition-all ${
            viewMode === "list"
              ? "bg-white/10 text-white shadow-xl"
              : "text-gray-500 hover:text-white"
          }`}
        >
          <List size={20} />
        </button>

      </div>
    </div>
  );
};

export default LibraryToolbar;