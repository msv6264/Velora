"use client";
import { useRouter } from 'next/navigation';

import NeuralBg from "../../../components/NeuralBg";
const logo = "/logo.png";
import { 
  ArrowLeft, 
  TrendingUp, 
  Zap, 
  Target, 
  BarChart3, 
  Calendar,
  Sparkles,
  PieChart,
  Activity,
  Info
} from 'lucide-react';

const StatCard = ({ title, value, change, icon, color, description }) => (
  <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl hover:bg-white/[0.05] transition-all duration-500 group relative overflow-hidden">
    <div className="flex justify-between items-start mb-6">
      <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center text-black shadow-lg group-hover:scale-110 transition-transform duration-500`}>
        {icon}
      </div>
      <div className="flex flex-col items-end gap-2">
        <span className={`text-xs font-bold px-3 py-1.5 rounded-full bg-green-500/10 text-green-500 border border-green-500/20`}>
          {change}
        </span>
        {description && (
          <div className="group/info relative">
            <Info size={14} className="text-gray-600 hover:text-[#ba8ffa] cursor-help transition-colors" />
            <div className="absolute right-0 bottom-full mb-2 w-48 p-3 rounded-xl bg-[#121212] border border-white/10 text-[10px] text-gray-400 opacity-0 group-hover/info:opacity-100 transition-opacity pointer-events-none z-20 shadow-2xl">
              {description}
            </div>
          </div>
        )}
      </div>
    </div>
    <h3 className="text-gray-500 font-spectral italic text-lg mb-1">{title}</h3>
    <p className="text-4xl font-bold tracking-tight text-white">{value}</p>
  </div>
);

const Insights = () => {
  const router = useRouter();

  const learningData = [
    { day: 'Mon', count: 12 },
    { day: 'Tue', count: 18 },
    { day: 'Wed', count: 15 },
    { day: 'Thu', count: 25 },
    { day: 'Fri', count: 20 },
    { day: 'Sat', count: 10 },
    { day: 'Sun', count: 14 },
  ];

  const maxCount = Math.max(...learningData.map(d => d.count));

  return (
    <div className="min-h-screen bg-[#030303] text-white font-outfit p-8 relative overflow-hidden">
      <NeuralBg side="left" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ba8ffa]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => router.push('/dashboard')}
              className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-all group"
            >
              <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 overflow-hidden p-2 bg-[#ba8ffa]/10 rounded-xl border border-[#ba8ffa]/20">
                <img src={logo} alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-white">Learning Insights</h1>
                <p className="text-gray-500 font-spectral italic text-lg">Visualizing your intentional growth.</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/5 p-2 rounded-2xl border border-white/5">
             <button className="px-6 py-2.5 rounded-xl bg-[#ba8ffa] text-black font-bold text-sm">Weekly</button>
             <button className="px-6 py-2.5 rounded-xl text-gray-500 hover:text-white font-bold text-sm transition-all">Monthly</button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <StatCard 
            title="Learning Velocity" 
            value="24.8" 
            change="+12%" 
            icon={<Zap size={24} />} 
            color="bg-[#ba8ffa]" 
          />
          <StatCard 
            title="Retention Rate" 
            value="84%" 
            change="+5%" 
            icon={<Target size={24} />} 
            color="bg-[#8791fe]" 
          />
          <StatCard 
            title="Intentionality Score" 
            value="64%" 
            change="Optimal" 
            icon={<Activity size={24} />} 
            color="bg-[#ba8ffa]" 
            description="Calculation: (Items Revisited / Total Saved) × 100. Measures your balance of discovery vs. hoarding."
          />
          <StatCard 
            title="Rediscovery Streak" 
            value="15 Days" 
            change="Peak" 
            icon={<TrendingUp size={24} />} 
            color="bg-[#8791fe]" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <div className="lg:col-span-2 p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h3 className="text-2xl font-bold mb-1">Knowledge Capture</h3>
                <p className="text-gray-500 font-spectral italic">Activity across the last 7 days</p>
              </div>
              <BarChart3 className="text-[#ba8ffa]" size={24} />
            </div>

            <div className="flex items-end justify-between h-64 gap-4 px-4">
              {learningData.map((data, i) => (
                <div key={i} className="flex-1 flex flex-col items-center group">
                  <div 
                    className="w-full bg-[#ba8ffa]/10 border border-[#ba8ffa]/20 rounded-t-xl relative transition-all duration-700 hover:bg-[#ba8ffa]/30"
                    style={{ height: `${(data.count / maxCount) * 100}%` }}
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {data.count}
                    </div>
                  </div>
                  <span className="mt-4 text-xs font-bold text-gray-600 uppercase tracking-widest">{data.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Side Content */}
          <div className="space-y-8">
            <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl h-full">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-[#8791fe]/10 text-[#8791fe]">
                  <PieChart size={20} />
                </div>
                <h3 className="text-xl font-bold">Top Domains</h3>
              </div>

              <div className="space-y-6">
                {[
                  { name: 'Artificial Intelligence', val: 45, color: 'bg-[#ba8ffa]' },
                  { name: 'Web Development', val: 30, color: 'bg-[#8791fe]' },
                  { name: 'UI/UX Design', val: 15, color: 'bg-[#ba8ffa]/50' },
                  { name: 'Productivity', val: 10, color: 'bg-[#8791fe]/50' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300 font-medium">{item.name}</span>
                      <span className="text-white font-bold">{item.val}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: `${item.val}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-10 py-4 bg-white/5 border border-white/10 rounded-2xl text-gray-400 font-bold hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2">
                <span>View All Details</span>
                <Sparkles size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
