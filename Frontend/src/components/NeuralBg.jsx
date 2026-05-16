export default function NeuralBg({ side = "left" }) {
  const sideClass = side === "right" ? "right-0" : "left-0";

  return (
    <div className={`absolute ${sideClass} top-0 h-full w-[50%] overflow-hidden pointer-events-none z-0`}>
      
      {/* Main purple glow */}
      <div className={`absolute top-[15%] ${side === "right" ? "right-[10%]" : "left-[10%]"} h-[350px] w-[350px] rounded-full bg-purple-700/40 blur-[120px]`} />

      {/* Blue glow */}
      <div className={`absolute bottom-[10%] ${side === "right" ? "right-[5%]" : "left-[5%]"} h-[300px] w-[300px] rounded-full bg-blue-600/30 blur-[120px]`} />

      {/* Lightning lines */}
      <div className={`absolute top-[20%] ${side === "right" ? "right-[5%]" : "left-[5%]"} h-[2px] w-[300px] ${side === "right" ? "-rotate-12" : "rotate-12"} bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-80 shadow-[0_0_20px_#c084fc]`} />

      <div className={`absolute top-[35%] ${side === "right" ? "right-[15%]" : "left-[15%]"} h-[2px] w-[250px] ${side === "right" ? "rotate-6" : "-rotate-6"} bg-gradient-to-r from-transparent via-violet-300 to-transparent opacity-80 shadow-[0_0_20px_#a855f7]`} />

      <div className={`absolute bottom-[30%] ${side === "right" ? "right-[10%]" : "left-[10%]"} h-[2px] w-[280px] ${side === "right" ? "-rotate-[25deg]" : "rotate-[25deg]"} bg-gradient-to-r from-transparent via-indigo-300 to-transparent opacity-70 shadow-[0_0_20px_#818cf8]`} />

      <div className={`absolute top-[55%] ${side === "right" ? "right-[20%]" : "left-[20%]"} h-[2px] w-[200px] ${side === "right" ? "rotate-[18deg]" : "-rotate-[18deg]"} bg-gradient-to-r from-transparent via-fuchsia-300 to-transparent opacity-70 shadow-[0_0_18px_#e879f9]`} />

      {/* Glow nodes */}
      <div className={`absolute top-[25%] ${side === "right" ? "right-[25%]" : "left-[25%]"} h-4 w-4 rounded-full bg-purple-300 shadow-[0_0_30px_10px_#d8b4fe]`} />

      <div className={`absolute bottom-[28%] ${side === "right" ? "right-[35%]" : "left-[35%]"} h-3 w-3 rounded-full bg-indigo-300 shadow-[0_0_25px_8px_#a5b4fc]`} />

      <div className={`absolute top-[50%] ${side === "right" ? "right-[45%]" : "left-[45%]"} h-5 w-5 rounded-full bg-violet-200 shadow-[0_0_40px_12px_#ddd6fe]`} />

      <div className={`absolute top-[18%] ${side === "right" ? "right-[40%]" : "left-[40%]"} h-3 w-3 rounded-full bg-fuchsia-200 shadow-[0_0_25px_8px_#f0abfc]`} />

      <div className={`absolute bottom-[15%] ${side === "right" ? "right-[15%]" : "left-[15%]"} h-4 w-4 rounded-full bg-blue-200 shadow-[0_0_30px_10px_#93c5fd]`} />
    </div>
  );
}