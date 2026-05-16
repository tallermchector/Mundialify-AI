"use client";

import React, { useState, useRef } from 'react';
import { CromoSticker } from './CromoSticker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Share2, Download, RefreshCcw, Sparkles, Info, CheckCircle2, Trophy } from 'lucide-react';
import { normalizeName, resizeImage } from '@/lib/image-utils';
import { transformPhotoWithKit } from '@/ai/flows/ai-kit-transformation.ts';
import { useToast } from '@/hooks/use-toast';

const COUNTRIES = [
  { label: "Argentina", value: "ARGENTINA" },
  { label: "Brasil", value: "BRASIL" },
  { label: "Francia", value: "FRANCIA" },
  { label: "Uruguay", value: "URUGUAY" },
  { label: "España", value: "ESPAÑA" },
  { label: "Inglaterra", value: "INGLATERRA" },
  { label: "Alemania", value: "ALEMANIA" },
  { label: "México", value: "MÉXICO" },
  { label: "Colombia", value: "COLOMBIA" },
  { label: "EE.UU.", value: "USA" },
];

export const MundialifyApp: React.FC = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    team: 'ARGENTINA',
    position: 'Delantero',
    height: '1.75',
    weight: '72',
    birth: '24/06/1987',
    club: 'Inter Miami',
  });
  const [photo, setPhoto] = useState<string | null>(null);
  const [transformedPhoto, setTransformedPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'name' ? normalizeName(value) : value 
    }));
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = event.target?.result as string;
        const resized = await resizeImage(base64);
        setPhoto(resized);
        setStep(3);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Error de imagen',
        description: 'No pudimos procesar la foto.'
      });
    }
  };

  const triggerAiTransformation = async () => {
    if (!photo) return;
    setIsProcessing(true);
    try {
      const result = await transformPhotoWithKit({ 
        ...formData,
        photoDataUri: photo 
      });
      setTransformedPhoto(result.transformedPhotoDataUri);
      setStep(4);
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Error de IA',
        description: 'Hubo un problema generando tu cromo multinacional.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const shareCromo = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mi Cromo Mundialify 2026',
          text: `¡Mira mi figurita oficial de ${formData.team} hecha con IA!`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
       toast({ title: 'Compartir', description: 'Enlace copiado.' });
    }
  };

  const reset = () => {
    setStep(1);
    setPhoto(null);
    setTransformedPhoto(null);
    setFormData({ 
      name: '', 
      team: 'ARGENTINA', 
      position: 'Delantero', 
      height: '1.75', 
      weight: '72', 
      birth: '24/06/1987', 
      club: 'Inter Miami' 
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Side: Preview */}
        <div className="flex justify-center order-2 lg:order-1 sticky top-8">
          <div className="relative group w-full flex justify-center">
             <div className="absolute -inset-4 bg-panini-red/10 blur-3xl rounded-full opacity-30 animate-pulse" />
             <CromoSticker
               name={formData.name}
               position={formData.position}
               height={formData.height}
               weight={formData.weight}
               team={formData.team}
               imageUrl={transformedPhoto || photo || ''}
               isProcessing={isProcessing}
               className="animate-in fade-in zoom-in duration-500"
               isTransformed={!!transformedPhoto}
             />
          </div>
        </div>

        {/* Right Side: Wizard */}
        <div className="order-1 lg:order-2 space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl lg:text-5xl font-headline font-black italic text-white tracking-tighter uppercase leading-tight">
              WORLD CUP <span className="text-panini-yellow">2026</span>
            </h1>
            <p className="text-muted-foreground text-md uppercase tracking-widest font-bold">
              AI TRADING CARD GENERATOR
            </p>
          </div>

          <div className="bg-card border border-white/5 p-6 rounded-2xl shadow-2xl backdrop-blur-sm">
            {step === 1 && (
              <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-5 h-5 text-panini-yellow" />
                  <h3 className="font-headline font-bold text-xl uppercase italic">Selección y Datos</h3>
                </div>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="team">Selección Nacional</Label>
                    <Select onValueChange={(v) => setFormData(p => ({...p, team: v}))} defaultValue={formData.team}>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Busca tu país" />
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRIES.map(c => (
                          <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      placeholder="Ej: LIONEL MESSI" 
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-background/50 uppercase"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Posición</Label>
                    <Select onValueChange={(v) => setFormData(p => ({...p, position: v}))} defaultValue={formData.position}>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Elige posición" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Arquero">Arquero</SelectItem>
                        <SelectItem value="Defensor">Defensor</SelectItem>
                        <SelectItem value="Mediocampista">Mediocampista</SelectItem>
                        <SelectItem value="Delantero">Delantero</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    disabled={!formData.name} 
                    onClick={() => setStep(2)}
                    className="w-full bg-panini-red hover:bg-panini-red/90 text-white font-headline font-bold uppercase py-6"
                  >
                    Siguiente: Bio del Jugador
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                 <div className="flex items-center gap-2 mb-2">
                  <div className="bg-panini-red text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold italic">2</div>
                  <h3 className="font-headline font-bold text-xl uppercase italic">Ficha Técnica</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="birth">Nacimiento (DD/MM/AAAA)</Label>
                    <Input id="birth" name="birth" value={formData.birth} onChange={handleInputChange} className="bg-background/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="club">Club Actual</Label>
                    <Input id="club" name="club" value={formData.club} onChange={handleInputChange} className="bg-background/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Altura (m)</Label>
                    <Input id="height" name="height" type="number" step="0.01" value={formData.height} onChange={handleInputChange} className="bg-background/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Peso (kg)</Label>
                    <Input id="weight" name="weight" type="number" value={formData.weight} onChange={handleInputChange} className="bg-background/50" />
                  </div>
                </div>
                <div className="flex gap-2">
                   <Button variant="ghost" onClick={() => setStep(1)} className="flex-1">Atrás</Button>
                   <Button 
                    onClick={() => setStep(3)}
                    className="flex-[2] bg-panini-red hover:bg-panini-red/90 text-white font-headline font-bold uppercase py-6"
                  >
                    Subir Retrato
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <Upload className="w-5 h-5 text-albiceleste" />
                  <h3 className="font-headline font-bold text-xl uppercase italic">Retrato Oficial</h3>
                </div>
                
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="group relative h-48 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 hover:border-panini-red/50 transition-all cursor-pointer overflow-hidden"
                >
                  {photo ? (
                    <>
                      <img src={photo} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-40" />
                      <div className="z-10 flex flex-col items-center">
                        <CheckCircle2 className="w-12 h-12 text-green-500 mb-2" />
                        <p className="font-bold text-white uppercase tracking-tighter">Imagen Lista</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-white/10 p-4 rounded-full mb-3 group-hover:scale-110 transition-transform">
                        <Upload className="w-8 h-8 text-white" />
                      </div>
                      <p className="font-bold text-white/60">Haz click para subir</p>
                    </>
                  )}
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                </div>

                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => setStep(2)} className="flex-1">Atrás</Button>
                  <Button 
                    disabled={!photo || isProcessing} 
                    onClick={triggerAiTransformation}
                    className="flex-[2] bg-panini-red hover:bg-panini-red/90 text-white font-headline font-bold uppercase py-6 group"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generar Cromo {formData.team}
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4 animate-in zoom-in duration-300 text-center">
                <h3 className="font-headline font-black text-2xl uppercase italic text-panini-yellow tracking-tighter">¡Cromo Generado!</h3>
                <p className="text-sm text-muted-foreground uppercase">Edición Coleccionista Mundial 2026</p>
                
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <Button onClick={shareCromo} className="bg-panini-red text-white font-headline font-bold uppercase py-6">
                    <Share2 className="w-4 h-4 mr-2" /> Compartir
                  </Button>
                  <Button variant="outline" className="border-white/10 hover:bg-white/5 font-headline font-bold uppercase py-6">
                    <Download className="w-4 h-4 mr-2" /> Descargar
                  </Button>
                </div>
                <Button variant="ghost" onClick={reset} className="w-full text-white/40 hover:text-white uppercase text-xs font-bold tracking-widest">
                  <RefreshCcw className="w-3 h-3 mr-2" /> Crear un nuevo cromo
                </Button>
              </div>
            )}
          </div>

          <div className="flex items-start gap-3 p-4 bg-panini-midnight/60 border border-white/5 rounded-xl">
             <Info className="w-5 h-5 text-panini-yellow shrink-0 mt-1" />
             <p className="text-[11px] text-muted-foreground leading-relaxed uppercase font-medium">
               El generador AI analiza tu rostro y lo integra en la indumentaria oficial de la selección de {formData.team}. 
               Toda la plaqueta de datos es renderizada directamente por Gemini Vision Pro.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};
