
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { formatHeight, formatWeight } from '@/lib/image-utils';

interface CromoCanvasProps {
  data: any;
  photo: string | null;
}

const EDITION_ASSETS = [
  { id: 'gold', src: 'https://mundialhub.vercel.app/frontend/assets/fondogold.png' },
  { id: 'marcogold', src: 'https://mundialhub.vercel.app/frontend/assets/marcogold.png'},
  { id: 'num2',   src: 'https://mundialhub.vercel.app/frontend/assets/2.png'                    },
  { id: 'num6',   src: 'https://mundialhub.vercel.app/frontend/assets/6.png'                    },
  { id: 'marco',  src: 'https://mundialhub.vercel.app/frontend/assets/marco.png'                },
  { id: 'marco6', src: 'https://mundialhub.vercel.app/frontend/assets/marco6.png'               },
  { id: 'cosito', src: 'https://mundialhub.vercel.app/frontend/assets/cosito.png'               },
  { id: 'rectA',  src: 'https://mundialhub.vercel.app/frontend/assets/svg/rectanguloarriba.svg' },
  { id: 'rectB',  src: 'https://mundialhub.vercel.app/frontend/assets/svg/rectanguloabajo.svg'  },
  { id: 'fifa',   src: 'https://mundialhub.vercel.app/frontend/assets/svg/logofifa.svg'         },
  { id: 'panini', src: 'https://mundialhub.vercel.app/frontend/assets/svg/panini.svg'           },
];

const POSITIONS: Record<string, any> = {
  gk: { label: 'Goalkeeper', rectColor: '#894192' },
  def: { label: 'Defender', rectColor: '#f4294b' },
  mid: { label: 'Midfielder', rectColor: '#f76a20' },
  fwd: { label: 'Forward',    rectColor: '#1e8689' },
};

export const CromoCanvas: React.FC<CromoCanvasProps> = ({ data, photo }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<Record<string, HTMLImageElement>>({});
  const [loading, setLoading] = useState(true);

  const tint = (src: HTMLImageElement, hex: string) => {
    if (!src) return null;
    const oc = document.createElement('canvas');
    oc.width = 1650; oc.height = 2310;
    const ox = oc.getContext('2d');
    if (!ox) return null;
    ox.fillStyle = hex;
    ox.fillRect(0, 0, 1650, 2310);
    ox.globalCompositeOperation = 'destination-in';
    ox.drawImage(src, 0, 0, 1650, 2310);
    return oc;
  };

  useEffect(() => {
    const loadImages = async () => {
      const loaded: Record<string, HTMLImageElement> = {};
      const promises = EDITION_ASSETS.map(asset => {
        return new Promise((resolve) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.src = asset.src;
          img.onload = () => {
            loaded[asset.id] = img;
            resolve(true);
          };
          img.onerror = resolve;
        });
      });
      await Promise.all(promises);
      setImages(loaded);
      setLoading(false);
    };
    loadImages();
  }, []);

  const drawCromo = async () => {
    const canvas = canvasRef.current;
    if (!canvas || loading) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 1650;
    const H = 2310;
    canvas.width = W;
    canvas.height = H;

    const posColor = (POSITIONS[data.position] || POSITIONS.mid).rectColor;
    
    // Tints
    const tints = {
      num2:   tint(images.num2,   data.c2),
      num6:   tint(images.num6,   data.c6),
      cosito: tint(images.cosito, data.cCosito),
      marco:  tint(images.marco,  data.cBg),
      marco6: tint(images.marco6, data.c6),
      rectA:  tint(images.rectA,  posColor),
      rectB:  tint(images.rectB,  posColor),
    };

    // Draw
    ctx.clearRect(0, 0, W, H);
    ctx.save();

    // Fondo base
    ctx.fillStyle = data.cBg;
    ctx.fillRect(0, 0, W, H);

    if (data.useGoldBg && images.gold) {
      ctx.drawImage(images.gold, 0, 0, W, H);
    }

    if (tints.num2)   ctx.drawImage(tints.num2,   0, 0, W, H);
    if (tints.num6)   ctx.drawImage(tints.num6,   0, 0, W, H);
    if (tints.cosito) ctx.drawImage(tints.cosito, 0, 0, W, H);

    // Foto Usuario
    if (photo) {
      const userImg = new Image();
      userImg.src = photo;
      await new Promise((resolve) => {
        userImg.onload = () => {
          const sc = data.photoScale / 40;
          const pw = userImg.width  * sc;
          const ph = userImg.height * sc;
          const px = data.photoX !== null ? data.photoX : (W - pw) / 2;
          
          ctx.save();
          ctx.beginPath();
          // Use clip with rounded corners (14 is roughly scaled up)
          ctx.roundRect(0, 0, W, H, 40); 
          ctx.clip();
          ctx.drawImage(userImg, px, data.photoY, pw, ph);
          ctx.restore();
          resolve(true);
        };
        userImg.onerror = resolve;
      });
    }

    if (tints.marco) ctx.drawImage(tints.marco, 0, 0, W, H);

    if (data.useGoldBg && images.marcogold) {
      ctx.drawImage(images.marcogold, 0, 0, W, H);
    }
    if (tints.marco6) ctx.drawImage(tints.marco6, 0, 0, W, H);

    // Bandera
    const flagImg = new Image();
    flagImg.crossOrigin = 'anonymous';
    flagImg.src = `https://mundialhub.vercel.app/frontend/assets/flags/${data.code.toLowerCase()}.png`;
    await new Promise((resolve) => {
      flagImg.onload = () => {
        ctx.drawImage(flagImg, 0, 0, W, H);
        resolve(true);
      };
      flagImg.onerror = resolve;
    });

    // Código País (Vertical)
    ctx.save();
    const FONT_PAIS = '"Barlow Condensed", sans-serif';
    data.code.toUpperCase().slice(0, 3).split('').forEach((l: string, i: number) => {
      ctx.font         = `900 220px ${FONT_PAIS}`;
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'alphabetic';
      ctx.fillStyle    = 'white';
      ctx.strokeStyle  = 'rgba(255,255,255,1)';
      ctx.lineWidth    = 8.00;
      ctx.strokeText(l, W - 207, 1729 + i * 175);
      ctx.fillText(l, W - 207, 1729 + i * 175);
    });
    ctx.restore();

    // Rectángulos de posición
    if (tints.rectA) ctx.drawImage(tints.rectA, 81, 1900, 1183, 207);
    if (tints.rectB) ctx.drawImage(tints.rectB, 81, 2130, 1022, 98);

    // Logos
    if (images.fifa)   ctx.drawImage(images.fifa,   1251,  121,  285, 436);
    if (images.panini) ctx.drawImage(images.panini, 1124, 2130,  414,  98);

    // Textos finales
    const cleanDate = `${data.day}-${data.month}-${data.year}`;
    const cleanHeight = formatHeight(data.height);
    const cleanWeight = formatWeight(data.weight);
    const FONT_RESTO = '"Barlow Condensed", sans-serif';

    ctx.save();
    ctx.textAlign = 'center';
    const cx = 88 + 1166 / 2;
    
    // Nombre
    ctx.font = `700 88px ${FONT_RESTO}`;
    ctx.fillStyle = '#fff';
    ctx.fillText(data.name.toUpperCase(), cx, H - 316.8, 1166);
    
    // Stats
    ctx.font = `400 66px ${FONT_RESTO}`;
    ctx.fillText(`${cleanDate}  |  ${cleanHeight} m  |  ${cleanWeight} kg`, cx, H - 233.4, 1166);
    
    // Club
    ctx.font = `100 66px ${FONT_RESTO}`;
    ctx.fillText(data.club.toUpperCase(), 88 + 1012 / 2, H - 110, 1012);
    
    ctx.restore();
    ctx.restore();
  };

  useEffect(() => {
    if (!loading) drawCromo();
  }, [data, photo, images, loading]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `cromo-2026-${data.name.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 w-[400px] h-[550px] bg-panini-midnight rounded-xl border-4 border-white/5">
        <Loader2 className="w-12 h-12 text-panini-yellow animate-spin" />
        <p className="text-white font-headline font-bold uppercase tracking-tighter text-sm">Cargando Activos 2026...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative group rounded-xl overflow-hidden shadow-2xl border-4 border-panini-red/20 bg-panini-midnight">
        <canvas 
          ref={canvasRef} 
          className="max-w-full h-auto rounded-lg"
          style={{ width: '400px', height: '550px' }} 
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
