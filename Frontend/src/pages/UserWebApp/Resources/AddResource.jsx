import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NeuralBg from "../../../components/NeuralBg";
import logo from "../../../assets/logo.png";
import { 
  Link as LinkIcon, 
  Type, 
  Send, 
  ArrowLeft, 
  Sparkles, 
  TvMinimalPlay, 
  GitBranch, 
  FileText, 
  Layout, 
  FolderOpen,
  ScanSearch,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';

const AddResource = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [formData, setFormData] = useState({
    url: '',
    title: '',
    category: 'Article',
    collection: '',
    notes: ''
  });

  // Categories with matching icons
  const categories = [
    { id: 'Article', icon: <FileText size={18} /> },
    { id: 'Video', icon: <TvMinimalPlay size={18} /> },
    { id: 'Repository', icon: <GitBranch size={18} /> },
    { id: 'Tool', icon: <Layout size={18} /> },
  ];

  const collections = ['Research', 'Dev Tools', 'Design Inspo', 'AI & ML', 'Web Dev'];

  // Handle URL change & trigger "Scan"
  const handleUrlChange = (e) => {
    const url = e.target.value;
    setFormData({ ...formData, url });

    if (url.includes('http')) {
      setIsScanning(true);
      setScanComplete(false);
      
      // Simulate AI Scanning Logic
      setTimeout(() => {
        setIsScanning(false);
        setScanComplete(true);
        
        // Mock Auto-detection
        let detectedCategory = 'Article';
        if (url.includes('youtube.com') || url.includes('vimeo')) detectedCategory = 'Video';
        if (url.includes('github.com')) detectedCategory = 'Repository';
        
        setFormData(prev => ({
          ...prev,
          title: prev.title || "The Future of Smart Agents", // Simulated scrape
          category: detectedCategory
        }));
      }, 1500);
    }
  };

  // Auto-fill from URL parameters (Extension & PWA Share Target)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sharedUrl = params.get('url') || params.get('text');
    const sharedTitle = params.get('title');

    if (sharedUrl) {
      handleUrlChange({ target: { value: sharedUrl } });
      if (sharedTitle) setFormData(prev => ({ ...prev, title: sharedTitle }));
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center p-6 relative overflow-hidden font-outfit">
      <NeuralBg side="left" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ba8ffa]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#8791fe]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-3 text-gray-500 hover:text-white transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all">
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </div>
            <span className="font-bold tracking-tight uppercase text-[10px] tracking-[0.2em]">Exit to Dashboard</span>
          </button>
          
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-white/5 backdrop-blur-xl rounded-xl flex items-center justify-center border border-white/10 p-2 shadow-2xl">
               <img src={logo} alt="Velora Logo" className="w-full h-full object-contain opacity-80" />
             </div>
             <span className="text-xl font-bold text-white tracking-tighter uppercase">Velora Capture</span>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white/[0.02] border border-white/5 backdrop-blur-3xl rounded-[3rem] p-12 shadow-[0_25px_100px_rgba(0,0,0,0.5)]">
          <form className="space-y-10" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
            
            {/* URL Input Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-bold text-[#ba8ffa] uppercase tracking-[0.2em]">Source URL</label>
                {isScanning && (
                  <div className="flex items-center gap-2 text-blue-400">
                    <Loader2 size={14} className="animate-spin" />
                    <span className="text-[10px] font-bold uppercase animate-pulse">Scanning Insight...</span>
                  </div>
                )}
                {scanComplete && (
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 size={14} />
                    <span className="text-[10px] font-bold uppercase">Insight Verified</span>
                  </div>
                )}
              </div>
              <div className="relative group">
                <LinkIcon className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-500 ${isScanning ? 'text-blue-400' : 'text-gray-500 group-focus-within:text-[#ba8ffa]'}`} size={22} />
                <input 
                  type="url" 
                  placeholder="https://..." 
                  className={`w-full bg-white/5 border rounded-2xl py-6 pl-16 pr-6 text-white text-lg placeholder:text-gray-700 focus:outline-none transition-all duration-700 ${isScanning ? 'border-blue-500/30 bg-blue-500/5' : 'border-white/5 focus:border-[#ba8ffa]/30 focus:bg-white/[0.08]'}`}
                  required
                  value={formData.url}
                  onChange={handleUrlChange}
                />
              </div>
            </div>

            {/* Smart Preview (Appears after scan) */}
            <div className={`overflow-hidden transition-all duration-700 ${scanComplete ? 'max-h-64 opacity-100 mb-10' : 'max-h-0 opacity-0'}`}>
               <div className="p-6 rounded-[2rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex gap-6 items-center">
                  <div className="w-24 h-24 rounded-2xl bg-white/5 flex items-center justify-center text-[#ba8ffa]">
                    {categories.find(c => c.id === formData.category)?.icon || <FileText size={40} />}
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Preview Scraped</div>
                    <h4 className="text-xl font-bold text-white mb-2 leading-tight">{formData.title || "Analyzing..."}</h4>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-[#ba8ffa]/10 text-[#ba8ffa] text-[10px] font-black uppercase tracking-tighter border border-[#ba8ffa]/20">{formData.category}</span>
                      <span className="text-[10px] text-gray-600 font-spectral italic truncate max-w-[200px]">{formData.url}</span>
                    </div>
                  </div>
               </div>
            </div>

            {/* Title & Collection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-bold text-[#8791fe] uppercase tracking-[0.2em] px-1">Title</label>
                <div className="relative group">
                  <Type className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#8791fe] transition-colors" size={20} />
                  <input 
                    type="text" 
                    placeholder="Enter custom title" 
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 pl-14 pr-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-[#8791fe]/30 focus:bg-white/[0.08] transition-all"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-bold text-[#8791fe] uppercase tracking-[0.2em] px-1">Target Collection</label>
                <div className="relative group">
                  <FolderOpen className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#8791fe] transition-colors" size={20} />
                  <select 
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 pl-14 pr-10 text-white focus:outline-none focus:border-[#8791fe]/30 focus:bg-white/[0.08] transition-all appearance-none cursor-pointer"
                    value={formData.collection}
                    onChange={(e) => setFormData({...formData, collection: e.target.value})}
                  >
                    <option value="" className="bg-[#0a0a0a]">Library (Unsorted)</option>
                    {collections.map(col => (
                      <option key={col} value={col} className="bg-[#0a0a0a]">{col}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Category Toggle */}
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em] px-1">Verify Category</label>
              <div className="grid grid-cols-4 gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setFormData({...formData, category: cat.id})}
                    className={`flex flex-col items-center justify-center gap-3 py-4 rounded-2xl border transition-all duration-500 ${formData.category === cat.id ? 'bg-[#ba8ffa] border-[#ba8ffa] text-black font-black shadow-[0_15px_30px_rgba(186,143,250,0.3)]' : 'bg-white/5 border-white/5 text-gray-600 hover:text-white hover:bg-white/10'}`}
                  >
                    {cat.icon}
                    <span className="text-[9px] uppercase tracking-tighter">{cat.id}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Final Action */}
            <button 
              type="submit"
              className="w-full bg-white text-black font-black py-6 rounded-[2.5rem] hover:bg-[#ba8ffa] hover:shadow-[0_20px_60px_rgba(186,143,250,0.4)] transition-all duration-700 flex items-center justify-center gap-4 text-xl group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative z-10">Commit to Library</span>
              <Send size={24} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
            </button>
          </form>
        </div>

        {/* Intelligence Message */}
        <div className="mt-12 p-8 rounded-[2.5rem] bg-[#ba8ffa]/5 border border-[#ba8ffa]/10 backdrop-blur-md flex items-center gap-6">
           <div className="w-14 h-14 rounded-2xl bg-[#ba8ffa]/10 flex items-center justify-center text-[#ba8ffa] animate-pulse">
             <Sparkles size={24} />
           </div>
           <div>
             <h5 className="text-white font-bold text-sm mb-1">Neural Summarization Ready</h5>
             <p className="text-[#ba8ffa]/60 font-spectral text-sm">
               Velora is standing by to distill this resource into a 30-second summary for your dashboard.
             </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AddResource;
