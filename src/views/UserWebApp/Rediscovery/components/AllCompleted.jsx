import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const AllCompleted = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center text-center mt-20">
      <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
        <CheckCircle2 className="text-green-500" size={36} />
      </div>
      <h2 className="text-3xl font-bold mb-4">Congratulations! Everything is completed.</h2>
      <p className="text-gray-500 font-spectral text-lg sm:text-xl max-w-lg leading-relaxed mb-8">
        You've mastered all the resources in your library. Add more to continue your learning journey.
      </p>
      <button 
        onClick={() => router.push('/dashboard')} 
        className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-green-500 hover:text-white transition-colors"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default AllCompleted;
