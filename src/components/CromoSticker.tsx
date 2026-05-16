"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Shield, Star } from 'lucide-react';

interface CromoStickerProps {
  name: string;
  position: string;
  height: string;
  weight: string;
  imageUrl: string;
  className?: string;
  isProcessing?: boolean;
}

export const CromoSticker: React.FC<CromoStickerProps> = ({
  name,
  position,
  height,
  weight,
  imageUrl,
  className,
  isProcessing
}) => {
  return (
    <div className={cn(
      "relative aspect-[3/4] w-full max-w-[400px] overflow-hidden rounded-xl border-4 border-panini-red bg-panini-midnight shadow-2xl transition-all duration-500",
      "hover:scale-[1.02] hover:shadow-primary/20",
      className
    )}>
      {/* Foil Effect */}
      <div className="foil-effect absolute inset-0 z-20 pointer-events-none opacity-40" />

      {/* Header Branding */}
      <div className="absolute top-0 left-0 right-0 z-30 p-3 flex justify-between items-start">
        <div className="bg-panini-red px-3 py-1 skew-x-[-12deg] shadow-lg border border-white/20">
          <span className="text-white font-headline font-bold text-sm italic tracking-tighter block skew-x-[12deg]">
            MUNDIALIFY
          </span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="bg-white rounded-full p-1 shadow-md">
            <svg width="24" height="16" viewBox="0 0 9 6" className="rounded-sm">
              <rect width="9" height="2" fill="#74ACDF" />
              <rect y="2" width="9" height="2" fill="white" />
              <rect y="4" width="9" height="2" fill="#74ACDF" />
              <circle cx="4.5" cy="3" r="0.8" fill="#F6B40E" />
            </svg>
          </div>
          <div className="flex gap-0.5">
            {[1, 2, 3].map(i => <Star key={i} className="w-3 h-3 fill-panini-yellow text-panini-yellow" />)}
          </div>
        </div>
      </div>

      {/* Main Image Container */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-panini-midnight via-transparent to-transparent">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={name} 
            className={cn(
              "h-full w-full object-cover transition-opacity duration-1000",
              isProcessing ? "opacity-40 grayscale" : "opacity-100"
            )}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted/20">
            <Shield className="w-20 h-20 text-muted-foreground/30 animate-pulse" />
          </div>
        )}
      </div>

      {/* Data Plaques - Name & Position */}
      <div className="absolute bottom-0 left-0 right-0 z-30 p-4 space-y-2">
        <div className="bg-panini-yellow px-4 py-2 transform -skew-x-12 border-2 border-panini-midnight shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-panini-midnight font-headline font-black text-2xl uppercase tracking-tighter skew-x-12 leading-none">
            {name || "TU NOMBRE"}
          </h2>
        </div>
        
        <div className="flex gap-2">
          <div className="bg-white px-3 py-1 transform -skew-x-12 border border-panini-midnight flex-1">
            <p className="text-panini-midnight font-headline font-bold text-xs uppercase skew-x-12">
              {position || "POSICIÓN"}
            </p>
          </div>
          <div className="bg-panini-red px-3 py-1 transform -skew-x-12 border border-white/20 flex-initial min-w-[80px]">
            <p className="text-white font-headline font-bold text-xs uppercase skew-x-12 text-center">
              ARG
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="bg-panini-midnight/80 backdrop-blur-md px-3 py-2 border border-white/10 rounded-sm">
            <p className="text-[10px] text-white/60 font-medium uppercase leading-none mb-1">Altura</p>
            <p className="text-white font-bold text-sm font-headline">{height || "0.00"} m</p>
          </div>
          <div className="bg-panini-midnight/80 backdrop-blur-md px-3 py-2 border border-white/10 rounded-sm">
            <p className="text-[10px] text-white/60 font-medium uppercase leading-none mb-1">Peso</p>
            <p className="text-white font-bold text-sm font-headline">{weight || "0"} kg</p>
          </div>
        </div>
      </div>

      {/* Watermark Branding */}
      <div className="absolute right-[-20px] top-[40%] transform rotate-90 z-30 pointer-events-none opacity-20">
        <span className="text-white font-headline font-black text-4xl tracking-widest whitespace-nowrap">
          AFA OFFICIAL COLLECTION
        </span>
      </div>

      {/* Processing State */}
      {isProcessing && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-panini-midnight/60 backdrop-blur-sm">
          <div className="relative w-16 h-16 mb-4">
             <div className="absolute inset-0 border-4 border-panini-yellow/20 rounded-full" />
             <div className="absolute inset-0 border-4 border-t-panini-yellow rounded-full animate-spin" />
          </div>
          <p className="text-panini-yellow font-headline font-bold animate-pulse">GENERANDO CROMO...</p>
        </div>
      )}
    </div>
  );
};
