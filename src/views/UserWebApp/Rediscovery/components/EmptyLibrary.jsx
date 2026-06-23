import React from 'react';
import { Sparkles, BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';

const EmptyLibrary = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center text-center mt-20">
      <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
        <BookOpen className="text-gray-400" size={36} />
      </div>
      <h2 className="text-3xl font-bold mb-4">Your library is empty.</h2>
      <p className="text-gray-500 font-spectral text-lg sm:text-xl max-w-lg leading-relaxed mb-8">
        Start by saving your first resource to see rediscovery insights.
      </p>
      <button 
        onClick={() => router.push('/dashboard')} 
        className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-[#ba8ffa] transition-colors"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default EmptyLibrary;
