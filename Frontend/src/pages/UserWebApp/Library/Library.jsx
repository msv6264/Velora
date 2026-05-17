import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  ArrowLeft, 
  Filter, 
  LayoutGrid, 
  List, 
  Plus,
  TvMinimalPlay,
  FileText,
  GitBranch,
  Layout,
  MoreVertical,
  ExternalLink,
  FolderOpen,
  Pencil,
  Trash2
} from 'lucide-react';

const Library = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [filter, setFilter] = useState('All');
  const [activeMenu, setActiveMenu] = useState(null);

  const resources = [
    { id: 1, title: 'The Future of AI Agents', type: 'Article', collection: 'Research', date: '2 hours ago', color: 'bg-[#ba8ffa]', icon: <FileText size={18} /> },
    { id: 2, title: 'Advanced React Patterns', type: 'Video', collection: 'Dev Tools', date: '1 day ago', color: 'bg-[#8791fe]', icon: <TvMinimalPlay size={18} /> },
    { id: 3, title: 'UI Design Principles', type: 'Course', collection: 'Design Inspo', date: '3 days ago', color: 'bg-[#ba8ffa]', icon: <Layout size={18} /> },
    { id: 4, title: 'Modern CSS Techniques', type: 'Article', collection: 'Web Dev', date: '4 days ago', color: 'bg-[#8791fe]', icon: <FileText size={18} /> },
    { id: 5, title: 'Web Performance Guide', type: 'PDF', collection: 'Web Dev', date: '1 week ago', color: 'bg-[#ba8ffa]', icon: <FileText size={18} /> },
    { id: 6, title: 'TypeScript Best Practices', type: 'Video', collection: 'Dev Tools', date: '2 weeks ago', color: 'bg-[#8791fe]', icon: <TvMinimalPlay size={18} /> },
    { id: 7, title: 'System Design Interview', type: 'Course', collection: 'Research', date: '3 weeks ago', color: 'bg-[#ba8ffa]', icon: <Layout size={18} /> },
    { id: 8, title: 'Tailwind CSS Tips', type: 'Article', collection: 'Design Inspo', date: '1 month ago', color: 'bg-[#8791fe]', icon: <FileText size={18} /> },
  ];

  const toggleMenu = (e, id) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === id ? null : id);
  };

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
              onClick={() => navigate('/dashboard')}
              className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-all group"
            >
              <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">My Library</h1>
              <p className="text-gray-500 font-spectral italic">128 resources collected with intention.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#ba8ffa] transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-[#ba8ffa]/30 focus:bg-white/10 transition-all"
              />
            </div>
            <button 
              onClick={() => navigate('/add-resource')}
              className="p-3.5 rounded-2xl bg-[#ba8ffa] text-black hover:shadow-[0_0_25px_rgba(186,143,250,0.3)] transition-all"
            >
              <Plus size={24} />
            </button>
          </div>
        </header>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/5">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {['All', 'Articles', 'Videos', 'Courses', 'Tools', 'PDFs'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-xl border transition-all whitespace-nowrap ${filter === cat ? 'bg-[#ba8ffa]/10 border-[#ba8ffa]/30 text-[#ba8ffa] font-bold' : 'bg-white/5 border-white/5 text-gray-500 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2 p-1.5 rounded-xl bg-white/5 border border-white/5">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white/10 text-white shadow-xl' : 'text-gray-500 hover:text-white'}`}
            >
              <LayoutGrid size={20} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white/10 text-white shadow-xl' : 'text-gray-500 hover:text-white'}`}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        {/* Resource Content */}
        <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
          {resources
            .filter(res => {
              if (filter === 'All') return true;
              // Handle plural vs singular (Articles -> Article, etc.)
              const typeFilter = filter.endsWith('s') && filter !== 'PDFs' ? filter.slice(0, -1) : filter === 'PDFs' ? 'PDF' : filter;
              return res.type === typeFilter;
            })
            .map((res) => (
              viewMode === 'grid' ? (
                <div key={res.id} className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl hover:bg-white/[0.06] hover:border-white/10 transition-all duration-500 group relative">
                  <div className={`w-12 h-1.5 rounded-full ${res.color} mb-6`} />
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-xl bg-white/5 text-gray-400 group-hover:text-[#ba8ffa] transition-colors">
                      {res.icon}
                    </div>
                    <div className="relative">
                      <button 
                        onClick={(e) => toggleMenu(e, res.id)}
                        className={`p-2 rounded-xl transition-all ${activeMenu === res.id ? 'bg-[#ba8ffa] text-black' : 'text-gray-600 hover:text-white hover:bg-white/5'}`}
                      >
                        <MoreVertical size={20} />
                      </button>
                      
                      {/* Dropdown Menu */}
                      {activeMenu === res.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-[#121212] border border-white/10 rounded-2xl p-2 shadow-2xl z-50 backdrop-blur-3xl animate-in fade-in zoom-in duration-200">
                          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-all group/item">
                            <Pencil size={16} className="group-hover/item:text-[#ba8ffa]" />
                            <span className="text-sm font-medium">Edit Resource</span>
                          </button>
                          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-red-500/10 hover:text-red-500 transition-all group/item">
                            <Trash2 size={16} className="group-hover/item:text-red-500" />
                            <span className="text-sm font-medium">Delete</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 tracking-tight leading-snug group-hover:text-[#ba8ffa] transition-colors h-14 line-clamp-2">{res.title}</h3>
                  
                  {/* Collection Badge */}
                  <div className="flex items-center gap-2 mb-6 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 w-fit">
                    <FolderOpen size={14} className="text-[#8791fe]" />
                    <span className="text-xs text-gray-400 font-medium">{res.collection}</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-bold">{res.type}</span>
                    <span className="text-xs text-gray-600 font-spectral italic">{res.date}</span>
                  </div>
                </div>
              ) : (
                <div key={res.id} className="flex items-center gap-6 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all group">
                  <div className={`p-3 rounded-xl bg-white/5 ${res.color.replace('bg-', 'text-')} group-hover:scale-110 transition-all`}>
                    {res.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold truncate group-hover:text-[#ba8ffa] transition-colors">{res.title}</h3>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#8791fe]/10 border border-[#8791fe]/20">
                        <FolderOpen size={10} className="text-[#8791fe]" />
                        <span className="text-[10px] text-[#8791fe] font-bold uppercase">{res.collection}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-[10px] uppercase tracking-wider text-gray-600 font-bold">{res.type}</span>
                      <span className="text-[10px] text-gray-700 italic font-spectral">• {res.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="p-2 text-gray-600 hover:text-[#ba8ffa] transition-colors">
                      <ExternalLink size={18} />
                    </button>
                    <div className="relative">
                      <button 
                        onClick={(e) => toggleMenu(e, res.id)}
                        className={`p-2 rounded-xl transition-all ${activeMenu === res.id ? 'bg-[#ba8ffa] text-black' : 'text-gray-600 hover:text-white'}`}
                      >
                        <MoreVertical size={18} />
                      </button>
                      {/* List View Dropdown */}
                      {activeMenu === res.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-[#121212] border border-white/10 rounded-2xl p-2 shadow-2xl z-50 backdrop-blur-3xl animate-in fade-in zoom-in duration-200">
                          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-all group/item">
                            <Pencil size={16} />
                            <span className="text-sm font-medium">Edit</span>
                          </button>
                          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-red-500/10 hover:text-red-500 transition-all group/item">
                            <Trash2 size={16} />
                            <span className="text-sm font-medium">Delete</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            ))}
        </div>
      </div>
    </div>
  );
};

export default Library;
