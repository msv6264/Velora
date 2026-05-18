"use client";
import React from "react";

export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-6 py-2 rounded-full font-outfit font-bold text-white transition-all duration-300 cursor-pointer 
      bg-gradient-to-r from-[#b483fc] to-[#6f7bfd] hover:scale-105 active:scale-95 shadow-lg shadow-[#ba8ffa]/20 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
