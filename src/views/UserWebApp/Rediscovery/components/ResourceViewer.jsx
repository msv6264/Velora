import React, { useState } from 'react';
import {
  Sparkles,
  RefreshCw,
  Bookmark,
  ExternalLink,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  Youtube,
  Github,
  Twitter,
  Globe,
  MonitorPlay
} from 'lucide-react';

const categoryIconMap = {
  "Article": <FileText className="text-[#ba8ffa]" size={24} />,
  "Youtube": <Youtube className="text-[#ff0000]" size={24} />,
  "Video": <MonitorPlay className="text-[#8791fe]" size={24} />,
  "Github": <Github className="text-white" size={24} />,
  "Twitter": <Twitter className="text-[#1da1f2]" size={24} />,
  "Website": <Globe className="text-[#10b981]" size={24} />,
  "Other": <Sparkles className="text-[#ba8ffa]" size={24} />
};

const ResourceViewer = ({ resources, title, subtitle }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentResource = resources[currentIndex];

  const getReason = (resource) => {
    if (resource.reason) return resource.reason;
    
    if (resource.visit_count > 0) {
      const days = resource.visitDays ?? 0;
      if (days === 0) return "You visited this within the last 24 hours.";
      if (days === 1) return "You visited this yesterday.";
      return `You last visited this ${days} days ago.`;
    } else {
      const days = resource.savedDays ?? 0;
      if (days === 0) return "You just saved this recently. Time to take a first look!";
      if (days === 1) return "You saved this yesterday. Ready to dive in?";
      return `You saved this ${days} days ago and last visited ${resource.visitDays ?? days} days ago.`;
    }
  };

  const featuredItem = currentResource ? {
    title: currentResource.title,
    url: currentResource.url,
    type: currentResource.category || currentResource.type || "Other",
    savedDate: new Date(currentResource.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    reason: getReason(currentResource),
    icon: categoryIconMap[currentResource.category] || categoryIconMap[currentResource.type] || categoryIconMap["Other"]
  } : null;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      if (resources.length > 0) {
        setCurrentIndex((prev) => (prev + 1) % resources.length);
      }
    }, 1500);
  };

  if (!featuredItem) return null;

  return (
    <>
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mb-12 sm:mb-20">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#ba8ffa]/10 rounded-[2rem] border border-[#ba8ffa]/20 flex items-center justify-center mb-6 sm:mb-8 animate-pulse">
          <Sparkles className="text-[#ba8ffa]" size={36} />
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tighter">{title}</h2>
        <p className="text-gray-500 font-spectral text-lg sm:text-xl max-w-lg leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Featured Rediscovery Card */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#ba8ffa]/20 to-[#8791fe]/20 rounded-[3rem] blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>

        <div className="relative bg-white/[0.02] border border-white/10 backdrop-blur-3xl rounded-[3rem] p-6 sm:p-12 overflow-hidden">
          <div className="flex flex-col md:flex-row gap-6 sm:gap-10 items-start">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 shrink-0">
              {featuredItem.icon}
            </div>

            <div className="flex-1 w-full">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-[10px] uppercase tracking-[0.2em] font-black px-3 py-1 bg-[#ba8ffa]/10 text-[#ba8ffa] rounded-full border border-[#ba8ffa]/20">
                  {featuredItem.type}
                </span>
                <span className="text-gray-600 text-sm font-spectral italic flex items-center gap-1">
                  <Clock size={14} /> Saved on {featuredItem.savedDate}
                </span>
              </div>

              <h3 className="text-xl sm:text-3xl font-bold mb-6 tracking-tight group-hover:text-[#ba8ffa] transition-colors leading-tight">
                {featuredItem.title}
              </h3>

              <p className="text-gray-400 font-spectral text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed italic border-l-2 border-[#8791fe]/30 pl-4 sm:pl-6">
                "{featuredItem.reason}"
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href={featuredItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[200px] flex items-center justify-center gap-2 bg-white text-black py-4 rounded-2xl font-bold hover:bg-[#ba8ffa] hover:shadow-[0_0_30px_rgba(186,143,250,0.3)] transition-all duration-500 group/btn"
                >
                  <span>Open Resource</span>
                  <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>

                <div className="flex gap-4 justify-center">
                  <button className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/5 border border-white/5 text-gray-500 hover:text-green-500 hover:bg-green-500/10 hover:border-green-500/20 transition-all">
                    <CheckCircle2 size={24} />
                  </button>
                  <button className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/5 border border-white/5 text-gray-500 hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/20 transition-all">
                    <XCircle size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      {resources.length > 1 && (
        <div className="mt-20 flex flex-col items-center gap-6">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-gray-400 hover:text-white"
          >
            <RefreshCw size={20} className={isRefreshing ? 'animate-spin' : ''} />
            <span className="font-medium">{isRefreshing ? 'Surfacing another...' : 'Show me something else'}</span>
          </button>

          <div className="text-gray-600 text-sm font-spectral italic flex items-center gap-2">
            <Bookmark size={14} /> {resources.length - 1} other items waiting to be rediscovered
          </div>
        </div>
      )}
    </>
  );
};

export default ResourceViewer;
