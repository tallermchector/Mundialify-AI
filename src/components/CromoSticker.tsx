"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Shield, Star } from 'lucide-react';

interface CromoStickerProps {
  name: string;
  position: string;
  height: string;
  weight: string;
  team: string;
  imageUrl: string;
  className?: string;
  isProcessing?: boolean;
  isTransformed?: boolean;
}

export const CromoSticker: React.FC<CromoStickerProps> = ({
  name,
  position,
  height,
  weight,
  team,
  imageUrl,
  className,
  isProcessing,
  isTransformed
}) => {
  // Si ya está transformado por la IA, mostramos la imagen final que ya contiene los textos
  if (isTransformed && imageUrl) {
    return (
      <div className={cn(
        "relative aspect-[3/4] w-full max-w-[400px] overflow-hidden rounded-xl border-4 border-panini-red bg-panini-midnight shadow-2xl transition-all",
        className
      )}>
        <div className="foil-effect absolute inset-0 z-20 pointer-events-none opacity-30" />
        <img src={imageUrl} alt="Cromo Final" className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div className={cn(
      "relative aspect-[3/4] w-full max-w-[400px] overflow-hidden rounded-xl border-4 border-panini-red bg-panini-midnight shadow-2xl transition-all",
      "hover:scale-[1.01] hover:shadow-primary/10",
      className
    )}>
      {/* Foil Effect */}
      <div className="foil-effect absolute inset-0 z-20 pointer-events-none opacity-20" />

      {/* Header Branding */}
      <div className="absolute top-0 left-0 right-0 z-30 p-3 flex justify-between items-start">
        <div className="bg-panini-red px-3 py-1 skew-x-[-12deg] shadow-lg border border-white/10">
          <span className="text-white font-headline font-bold text-[10px] italic tracking-tighter block skew-x-[12deg]">
            MUNDIALIFY 2026
          </span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="bg-white/10 backdrop-blur-md rounded px-2 py-0.5 border border-white/5">
            <span className="text-[10px] font-black text-white italic">{team}</span>
          </div>
        </div>
      </div>

      {/* Main Image Container */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-panini-midnight via-transparent to-transparent">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt="Preview" 
            className={cn(
              "h-full w-full object-cover transition-opacity duration-700",
              isProcessing ? "opacity-30 grayscale" : "opacity-100"
            )}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted/5">
            <Shield className="w-20 h-20 text-white/5 animate-pulse" />
          </div>
        )}
      </div>

      {/* Data Plaques - Name & Position (Only for Preview) */}
      {!isTransformed && (
        <div className="absolute bottom-0 left-0 right-0 z-30 p-4 space-y-2 opacity-80">
          <div className="bg-panini-yellow px-4 py-1.5 transform -skew-x-12 border-2 border-panini-midnight">
            <h2 className="text-panini-midnight font-headline font-black text-xl uppercase tracking-tighter skew-x-12 leading-none">
              {name || "TU NOMBRE"}
            </h2>
          </div>
          
          <div className="flex gap-2">
            <div className="bg-white px-3 py-1 transform -skew-x-12 border border-panini-midnight flex-1">
              <p className="text-panini-midnight font-headline font-bold text-[10px] uppercase skew-x-12">
                {position || "JUGADOR"}
              </p>
            </div>
            <div className="bg-panini-red px-3 py-1 transform -skew-x-12 border border-white/10 flex-initial min-w-[60px]">
              <p className="text-white font-headline font-bold text-[10px] uppercase skew-x-12 text-center">
                2026
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Processing State */}
      {isProcessing && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-panini-midnight/70 backdrop-blur-md">
          <div className="relative w-12 h-12 mb-4">
             <div className="absolute inset-0 border-2 border-panini-yellow/10 rounded-full" />
             <div className="absolute inset-0 border-2 border-t-panini-yellow rounded-full animate-spin" />
          </div>
          <p className="text-panini-yellow font-headline font-bold text-xs tracking-widest animate-pulse uppercase">
            Analizando Identidad...
          </p>
        </div>
      )}
    </div>
  );
};
