import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ErrorState = ({ message }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center text-center mt-20">
      <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
        <AlertCircle className="text-red-500" size={36} />
      </div>
      <h2 className="text-3xl font-bold mb-4">Oops! Something went wrong.</h2>
      <p className="text-gray-500 font-spectral text-lg sm:text-xl max-w-lg leading-relaxed mb-8">
        {message || "We couldn't load your rediscovery insights. Please try again later."}
      </p>
      <button 
        onClick={() => router.push('/dashboard')} 
        className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-red-500 hover:text-white transition-colors"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default ErrorState;
