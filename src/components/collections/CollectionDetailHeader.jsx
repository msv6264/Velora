"use client";
import React from "react";
import { ArrowLeft, Search, Filter } from "lucide-react";

const CollectionDetailHeader = ({ router, resources, collectionInfo }) => (
  <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
    <div className="flex items-start gap-6">
      <button
        onClick={() => router.push("/collections")}
        className="mt-2 w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-all group"
      >
        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
      </button>
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#ba8ffa] font-bold">
            Collection
          </span>
          <div className="h-[1px] w-8 bg-white/10" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">
            {resources?.length || 0} Items
          </span>
        </div>
        <h1 className="text-5xl font-bold tracking-tight mb-4">
          {collectionInfo.name}
        </h1>
        <p className="text-xl text-gray-500 font-spectral italic max-w-xl">
          {collectionInfo.description}
        </p>
      </div>
    </div>

    <div className="flex items-center gap-4">
      <div className="relative group">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#ba8ffa] transition-colors"
          size={18}
        />
        <input
          type="text"
          placeholder="Search in collection..."
          className="bg-white/5 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-[#ba8ffa]/30 focus:bg-white/10 transition-all w-64"
        />
      </div>
      <button className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
        <Filter size={20} className="text-gray-400" />
      </button>
    </div>
  </header>
);

export default CollectionDetailHeader;
