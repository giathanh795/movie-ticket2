import React from 'react';

export default function Logo({ className = '', size = 'normal', onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-2.5 cursor-pointer select-none group ${className}`}
    >
      {/* Stylized Cinema Ticket Emblem Badge */}
      <div className="relative inline-flex items-center justify-center px-3.5 py-1.5 rounded-xl bg-gradient-to-br from-red-600 via-rose-600 to-red-700 shadow-md shadow-red-950/60 border border-red-400/40 group-hover:scale-105 transition-all">
        {/* Cinema perforation notches */}
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-neutral-900" />
        <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-neutral-900" />
        
        {/* Perfectly centered inner text */}
        <span className="font-black text-sm text-white tracking-widest leading-none">
          MTK
        </span>
      </div>

      {/* Brand title */}
      <div className="flex flex-col">
        <span className="text-base font-black tracking-tight text-white uppercase leading-none group-hover:text-red-400 transition-colors">
          CINEMAS
        </span>
        <span className="text-[9px] font-extrabold text-red-500 tracking-widest uppercase mt-0.5">
          VIETNAM
        </span>
      </div>
    </div>
  );
}