"use client";

import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface CromoCanvasProps {
  data: {
    name: string;
    team: string;
    teamCode: string;
    position: string;
    height: string;
    weight: string;
    birth: string;
    club: string;
  };
  photo: string | null;
}

export const CromoCanvas: React.FC<CromoCanvasProps> = ({ data, photo }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawCromo = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Dimensiones de alta calidad para impresión (800x1100)
    const W = 800;
    const H = 1100;
    canvas.width = W;
    canvas.height = H;

    // 1. Limpiar Fondo
    ctx.fillStyle = '#0A111F';
    ctx.fillRect(0, 0, W, H);

    // 2. Dibujar Foto del Usuario
    if (photo) {
      const userImg = new Image();
      userImg.src = photo;
      await new Promise((resolve) => {
        userImg.onload = () => {
          // Ajustar foto al centro del cromo
          const scale = Math.max(W / userImg.width, H / userImg.height);
          const x = (W / 2) - (userImg.width / 2) * scale;
          const y = (H / 2) - (userImg.height / 2) * scale;
          ctx.drawImage(userImg, x, y, userImg.width * scale, userImg.height * scale);
          resolve(true);
        };
      });
    }

    // 3. Dibujar Capa de Diseño (Marco y Gradientes)
    // Simulación de marco si no hay imagen PNG externa
    const gradient = ctx.createLinearGradient(0, H, 0, H - 300);
    gradient.addColorStop(0, 'rgba(10, 17, 31, 1)');
    gradient.addColorStop(1, 'rgba(10, 17, 31, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, H - 300, W, 300);

    // Borde Panini
    ctx.lineWidth = 20;
    ctx.strokeStyle = '#E30613'; // Rojo Panini
    ctx.strokeRect(10, 10, W - 20, H - 20);

    // 4. Dibujar Bandera (flagcdn.com)
    const flagImg = new Image();
    flagImg.crossOrigin = "anonymous";
    flagImg.src = `https://flagcdn.com/w160/${data.teamCode.toLowerCase()}.png`;
    await new Promise((resolve) => {
      flagImg.onload = () => {
        ctx.drawImage(flagImg, W - 180, 50, 120, 80);
        resolve(true);
      };
      flagImg.onerror = resolve; // Continuar si falla la bandera
    });

    // 5. Dibujar Textos
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 10;

    // Nombre (Plaqueta Amarilla)
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.moveTo(50, H - 220);
    ctx.lineTo(W - 50, H - 220);
    ctx.lineTo(W - 80, H - 120);
    ctx.lineTo(80, H - 120);
    ctx.closePath();
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.fillStyle = '#0A111F';
    ctx.font = 'black 60px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(data.name.toUpperCase() || 'TU NOMBRE', W / 2, H - 145);

    // Datos Técnicos (Plaqueta Blanca)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillRect(80, H - 110, W - 160, 60);
    
    ctx.fillStyle = '#0A111F';
    ctx.font = 'bold 24px "Inter", sans-serif';
    ctx.textAlign = 'center';
    const stats = `${data.birth}  |  ${data.height}m  |  ${data.weight}kg`;
    ctx.fillText(stats, W / 2, H - 72);

    // Branding Superior
    ctx.fillStyle = '#E30613';
    ctx.fillRect(50, 40, 220, 50);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 20px "Space Grotesk"';
    ctx.fillText('MUNDIALIFY 2026', 160, 72);
  };

  useEffect(() => {
    drawCromo();
  }, [data, photo]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `cromo-${data.name.toLowerCase().replace(/\s+/g, '-') || 'mundial'}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative group rounded-xl overflow-hidden shadow-2xl border-4 border-panini-red/20 bg-panini-midnight">
        <canvas 
          ref={canvasRef} 
          className="max-w-full h-auto rounded-lg"
          style={{ width: '400px', height: '550px' }} // Tamaño visual reducido
        />
        <div className="foil-effect absolute inset-0 pointer-events-none opacity-20" />
      </div>
      
      {photo && (
        <Button 
          onClick={handleDownload}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-headline font-bold uppercase py-6"
        >
          <Download className="w-5 h-5 mr-2" />
          Descargar Cromo (HQ)
        </Button>
      )}
    </div>
  );
};
