import {
  FolderOpen,
  Plus,
} from "lucide-react";

const EmptyState = ({
  filter,
  router,
}) => {
  return (
    <div className="flex flex-col items-center justify-center pt-8 pb-4 text-center animate-in fade-in duration-500">

      <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
        <FolderOpen
          size={48}
          className="text-gray-600"
        />
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
  );
};

export default EmptyState;