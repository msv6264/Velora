"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import NeuralBg from "../../../components/NeuralBg";
import { ArrowLeft, Sparkles } from 'lucide-react';
import { getRevisitNeeded } from '@/services/rediscovery.service';

import EmptyLibrary from './components/EmptyLibrary';
import FirstRediscovery from './components/FirstRediscovery';
import VisitedAll from './components/VisitedAll';
import AllCompleted from './components/AllCompleted';
import NormalRediscovery from './components/NormalRediscovery';
import ErrorState from './components/ErrorState';

const Rediscovery = () => {
  const router = useRouter();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      const data = await getRevisitNeeded();
      setResult(data);
      setLoading(false);
    };
    fetchResources();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center mt-20">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#ba8ffa]/10 rounded-[2rem] border border-[#ba8ffa]/20 flex items-center justify-center mb-6 sm:mb-8 animate-pulse">
            <Sparkles className="text-[#ba8ffa]" size={36} />
          </div>
          <p className="text-gray-400 font-spectral text-lg">Loading your insights...</p>
        </div>
      );
    }

    if (!result) return null;

    switch (result.type) {
      case "EMPTY_LIBRARY":
        return <EmptyLibrary />;
      case "FIRST_REDISCOVERY":
        return <FirstRediscovery resources={result.resources} />;
      case "VISITED_ALL":
        return <VisitedAll resources={result.resources} />;
      case "ALL_COMPLETED":
        return <AllCompleted />;
      case "NORMAL":
        return <NormalRediscovery resources={result.resources} />;
      case "ERROR":
        return <ErrorState message={result.message} />;
      default:
        return <ErrorState message="Unknown state encountered." />;
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white font-outfit p-4 sm:p-8 relative overflow-hidden">
      <NeuralBg side="right" />

      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ba8ffa]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Navigation */}
        <header className="flex items-center justify-between mb-10 sm:mb-16">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-3 text-gray-500 hover:text-white transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all border border-white/5">
              <ArrowLeft size={20} />
            </div>
            <span className="font-medium hidden sm:inline">Dashboard</span>
          </button>

          <div className="flex flex-col items-end">
            <h1 className="text-2xl font-bold tracking-tight">Rediscovery</h1>
            <p className="text-[#8791fe] font-spectral italic text-sm">Resurfacing your forgotten wisdom.</p>
          </div>
        </header>

        {renderContent()}
      </div>
    </div>
  );
};

export default Rediscovery;
