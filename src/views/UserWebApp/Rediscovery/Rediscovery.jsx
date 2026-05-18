"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import NeuralBg from "../../../components/NeuralBg";
import {
  Sparkles,
  ArrowLeft,
  RefreshCw,
  Bookmark,
  ExternalLink,
  Clock,
  CheckCircle2,
  XCircle,
  TvMinimalPlay,
  FileText,
  GitBranch
} from 'lucide-react';

const Rediscovery = () => {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Sample "surfaced" item
  const featuredItem = {
    title: "Understanding Neural Stacking Contexts",
    url: "https://example.com/neural-stacking",
    type: "Article",
    savedDate: "Jan 12, 2026",
    reason: "You saved this 4 months ago but haven't revisited it since.",
    icon: <FileText className="text-[#ba8ffa]" size={24} />
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white font-outfit p-8 relative overflow-hidden">
      <NeuralBg side="right" />

      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ba8ffa]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Navigation */}
        <header className="flex items-center justify-between mb-16">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-3 text-gray-500 hover:text-white transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all border border-white/5">
              <ArrowLeft size={20} />
            </div>
            <span className="font-medium">Dashboard</span>
          </button>

          <div className="flex flex-col items-end">
            <h1 className="text-2xl font-bold tracking-tight">Rediscovery</h1>
            <p className="text-[#8791fe] font-spectral italic text-sm">Resurfacing your forgotten wisdom.</p>
          </div>
        </header>

        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="w-20 h-20 bg-[#ba8ffa]/10 rounded-[2rem] border border-[#ba8ffa]/20 flex items-center justify-center mb-8 animate-pulse">
            <Sparkles className="text-[#ba8ffa]" size={40} />
          </div>
          <h2 className="text-5xl font-bold mb-4 tracking-tighter">Your Daily <i className="text-[#ba8ffa]">Insight.</i></h2>
          <p className="text-gray-500 font-spectral text-xl max-w-lg leading-relaxed">
            Velora's algorithm picked this gem from your library. Ready to dive back in?
          </p>
        </div>

        {/* Featured Rediscovery Card */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#ba8ffa]/20 to-[#8791fe]/20 rounded-[3rem] blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>

          <div className="relative bg-white/[0.02] border border-white/10 backdrop-blur-3xl rounded-[3rem] p-12 overflow-hidden">
            <div className="flex flex-col md:flex-row gap-10 items-start">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                {featuredItem.icon}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-black px-3 py-1 bg-[#ba8ffa]/10 text-[#ba8ffa] rounded-full border border-[#ba8ffa]/20">
                    {featuredItem.type}
                  </span>
                  <span className="text-gray-600 text-sm font-spectral italic flex items-center gap-1">
                    <Clock size={14} /> Saved on {featuredItem.savedDate}
                  </span>
                </div>

                <h3 className="text-3xl font-bold mb-6 tracking-tight group-hover:text-[#ba8ffa] transition-colors leading-tight">
                  {featuredItem.title}
                </h3>

                <p className="text-gray-400 font-spectral text-lg mb-10 leading-relaxed italic border-l-2 border-[#8791fe]/30 pl-6">
                  "{featuredItem.reason}"
                </p>

                <div className="flex flex-wrap gap-4">
                  <button className="flex-1 min-w-[200px] flex items-center justify-center gap-2 bg-white text-black py-4 rounded-2xl font-bold hover:bg-[#ba8ffa] hover:shadow-[0_0_30px_rgba(186,143,250,0.3)] transition-all duration-500 group/btn">
                    <span>Open Resource</span>
                    <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>

                  <div className="flex gap-4">
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
            <Bookmark size={14} /> 127 other items waiting to be rediscovered
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rediscovery;
