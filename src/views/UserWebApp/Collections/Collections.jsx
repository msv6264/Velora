"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import NeuralBg from "../../../components/NeuralBg";
import * as Icons from 'lucide-react';
import { 
  FolderPlus, 
  ArrowLeft, 
  MoreHorizontal, 
  ArrowRight,
  Pencil,
  Trash2,
  X,
  Save,
  Check
} from 'lucide-react';

// Icon Renderer Helper
const IconRenderer = ({ name, size = 24, className = "" }) => {
  const IconComponent = Icons[name] || Icons.HelpCircle;
  return <IconComponent size={size} className={className} />;
};

const Collections = () => {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState(null);
  
  // Modals state
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);
  
  // Library Resources (Mock)
  const availableResources = [
    { id: 1, title: 'The Future of AI Agents' },
    { id: 2, title: 'Advanced React Patterns' },
    { id: 3, title: 'UI Design Principles' },
    { id: 4, title: 'Modern CSS Techniques' },
    { id: 5, title: 'Web Performance Guide' },
  ];

  // Icon List for Picker
  const iconOptions = [
    'Layers', 'Code', 'Palette', 'Cpu', 'Globe', 'Zap', 
    'BookOpen', 'Target', 'Flame', 'Camera', 'Music', 'Terminal'
  ];

  // Theme Options
  const themeOptions = [
    'from-[#ba8ffa]/20 to-transparent', 
    'from-[#8791fe]/20 to-transparent', 
    'from-rose-500/20 to-transparent', 
    'from-emerald-500/20 to-transparent',
    'from-amber-500/20 to-transparent',
    'from-cyan-500/20 to-transparent'
  ];

  // Collections State (Updated to use string icons)
  const [collections, setCollections] = useState([
    { id: 1, name: 'Research', count: 42, icon: 'Layers', color: 'from-[#ba8ffa]/20 to-transparent' },
    { id: 2, name: 'Dev Tools', count: 28, icon: 'Code', color: 'from-[#8791fe]/20 to-transparent' },
    { id: 3, name: 'Design Inspo', count: 15, icon: 'Palette', color: 'from-[#ba8ffa]/20 to-transparent' },
    { id: 4, name: 'AI & ML', count: 31, icon: 'Cpu', color: 'from-[#8791fe]/20 to-transparent' },
    { id: 5, name: 'Web Dev', count: 19, icon: 'Globe', color: 'from-[#ba8ffa]/20 to-transparent' },
    { id: 6, name: 'Quick Saves', count: 54, icon: 'Zap', color: 'from-[#8791fe]/20 to-transparent' },
  ]);

  // Form States
  const [formName, setFormName] = useState('');
  const [formColor, setFormColor] = useState(themeOptions[0]);
  const [formIcon, setFormIcon] = useState('Layers');
  const [selectedResources, setSelectedResources] = useState([]);

  const toggleMenu = (e, id) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === id ? null : id);
  };

  const openCreateModal = () => {
    setFormName('');
    setFormColor(themeOptions[0]);
    setFormIcon('Layers');
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
      color: formColor
    };

    setCollections(prev => [...prev, newCollection]);
    setShowCreateModal(false);
  };

  const handleEditClick = (e, col) => {
    e.stopPropagation();
    setEditingCollection(col);
    setFormName(col.name);
    setFormColor(col.color);
    setFormIcon(col.icon);
    setShowEditModal(true);
    setActiveMenu(null);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setCollections(prev => prev.map(c => 
      c.id === editingCollection.id 
        ? { ...c, name: formName, color: formColor, icon: formIcon } 
        : c
    ));
    setShowEditModal(false);
  };

  const toggleResourceSelection = (id) => {
    setSelectedResources(prev => 
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
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
              onClick={() => router.push('/dashboard')}
              className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-all group"
            >
              <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Collections</h1>
              <p className="text-gray-500 font-spectral italic text-lg">Organized paths to intentional learning.</p>
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
            <div 
              key={col.id} 
              onClick={() => router.push(`/collections/${col.id}`)}
              className="group relative p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl hover:bg-white/[0.05] transition-all duration-700 cursor-pointer overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${col.color} opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-10">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#ba8ffa] group-hover:scale-110 group-hover:bg-[#ba8ffa]/10 transition-all duration-500">
                    <IconRenderer name={col.icon} size={28} />
                  </div>
                  <div className="relative">
                    <button 
                      onClick={(e) => toggleMenu(e, col.id)}
                      className={`p-2 rounded-xl transition-all ${activeMenu === col.id ? 'bg-[#ba8ffa] text-black' : 'text-gray-600 hover:text-white hover:bg-white/5'}`}
                    >
                      <MoreHorizontal size={24} />
                    </button>

                    {activeMenu === col.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-[#121212] border border-white/10 rounded-2xl p-2 shadow-2xl z-50 backdrop-blur-3xl animate-in fade-in zoom-in duration-200">
                        <button 
                          onClick={(e) => handleEditClick(e, col)}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-all group/item"
                        >
                          <Pencil size={16} />
                          <span className="text-sm font-medium">Edit Collection</span>
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setCollections(prev => prev.filter(c => c.id !== col.id)); }}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-red-500/10 hover:text-red-500 transition-all group/item"
                        >
                          <Trash2 size={16} />
                          <span className="text-sm font-medium">Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-2 tracking-tight group-hover:text-[#ba8ffa] transition-colors">{col.name}</h3>
                <p className="text-gray-500 font-spectral italic mb-8">{col.count} items</p>
                
                <div className="flex items-center gap-2 text-[#8791fe] text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <span>Explore</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
          ))}

          {/* Add Placeholder */}
          <div 
            onClick={openCreateModal}
            className="p-8 rounded-[2.5rem] border-2 border-dashed border-white/5 hover:border-[#ba8ffa]/30 transition-all duration-500 flex flex-col items-center justify-center gap-4 group cursor-pointer min-h-[250px]"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-gray-700 group-hover:text-[#ba8ffa] transition-colors">
              <FolderPlus size={32} />
            </div>
            <span className="text-gray-600 font-bold tracking-tight group-hover:text-white">Create New</span>
          </div>
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md" 
            onClick={() => { setShowCreateModal(false); setShowEditModal(false); }}
          />
          <div className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[3rem] p-12 shadow-2xl animate-in zoom-in-95 duration-200 overflow-y-auto max-h-[90vh] no-scrollbar">
            <button 
              onClick={() => { setShowCreateModal(false); setShowEditModal(false); }}
              className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <h2 className="text-4xl font-bold mb-2 tracking-tight">
              {showCreateModal ? 'New Collection' : 'Edit Collection'}
            </h2>
            <p className="text-gray-500 font-spectral italic text-lg mb-12">
              {showCreateModal ? 'Define a new path for your focus.' : 'Refine your intentional space.'}
            </p>

            <form onSubmit={showCreateModal ? handleCreate : handleSaveEdit} className="space-y-10">
              {/* Name Input */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#ba8ffa] font-bold mb-4">Collection Name</label>
                <input 
                  type="text" 
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-xl text-white focus:outline-none focus:border-[#ba8ffa]/50 transition-all placeholder:text-gray-700"
                  placeholder="e.g. Cognitive Research"
                  required
                />
              </div>

              {/* Icon Picker */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#ba8ffa] font-bold mb-4">Choose Icon</label>
                <div className="grid grid-cols-6 gap-4">
                  {iconOptions.map((icon) => (
                    <button 
                      key={icon}
                      type="button"
                      onClick={() => setFormIcon(icon)}
                      className={`h-16 rounded-2xl flex items-center justify-center transition-all ${formIcon === icon ? 'bg-[#ba8ffa] text-black scale-110' : 'bg-white/5 text-gray-500 hover:text-white hover:bg-white/10'}`}
                    >
                      <IconRenderer name={icon} size={24} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Picker */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#ba8ffa] font-bold mb-4">Visual Theme</label>
                <div className="grid grid-cols-6 gap-4">
                  {themeOptions.map((color) => (
                    <button 
                      key={color}
                      type="button"
                      onClick={() => setFormColor(color)}
                      className={`h-12 rounded-xl bg-gradient-to-br ${color} border-2 ${formColor === color ? 'border-white scale-110 shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'border-transparent opacity-50 hover:opacity-100'} transition-all`}
                    />
                  ))}
                </div>
              </div>

              {/* Resource Multi-Select Dropdown */}
              {showCreateModal && (
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#ba8ffa] font-bold mb-4">Attach Resources</label>
                  <div className="space-y-3 max-h-48 overflow-y-auto pr-2 no-scrollbar">
                    {availableResources.map(res => (
                      <div 
                        key={res.id}
                        onClick={() => toggleResourceSelection(res.id)}
                        className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${selectedResources.includes(res.id) ? 'bg-[#ba8ffa]/10 border-[#ba8ffa]/30 text-white' : 'bg-white/5 border-white/5 text-gray-500 hover:bg-white/10'}`}
                      >
                        <span className="font-medium">{res.title}</span>
                        {selectedResources.includes(res.id) && <Check size={18} className="text-[#ba8ffa]" />}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="pt-8 flex gap-6">
                <button 
                  type="button"
                  onClick={() => { setShowCreateModal(false); setShowEditModal(false); }}
                  className="flex-1 py-5 rounded-2xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-5 rounded-2xl bg-[#ba8ffa] text-black font-bold flex items-center justify-center gap-3 hover:shadow-[0_0_40px_rgba(186,143,250,0.4)] transition-all"
                >
                  <Save size={20} />
                  {showCreateModal ? 'Create Collection' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collections;

