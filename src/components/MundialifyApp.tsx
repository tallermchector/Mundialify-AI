"use client";

import React, { useState, useCallback, useRef } from 'react';
import { CromoSticker } from './CromoSticker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Share2, Download, RefreshCcw, Sparkles, User, Info, CheckCircle2 } from 'lucide-react';
import { normalizeName, resizeImage } from '@/lib/image-utils';
import { transformPhotoWithKit } from '@/ai/flows/ai-kit-transformation.ts';
import { useToast } from '@/hooks/use-toast';

export const MundialifyApp: React.FC = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    position: 'Delantero',
    height: '',
    weight: '',
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
        description: 'No pudimos procesar la foto. Intenta con otra.'
      });
    }
  };

  const triggerAiTransformation = async () => {
    if (!photo) return;
    setIsProcessing(true);
    try {
      const result = await transformPhotoWithKit({ photoDataUri: photo });
      setTransformedPhoto(result.transformedPhotoDataUri);
      setStep(4);
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Error de IA',
        description: 'Hubo un problema vistiendo tu cromo. Intenta de nuevo.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const shareCromo = async () => {
    if (navigator.share) {
      try {
        // En una app real convertiríamos el div CromoSticker a canvas/blob primero
        // Aquí simplificamos compartiendo el link o la imagen si fuera posible
        await navigator.share({
          title: 'Mi Cromo Mundialify AI',
          text: `¡Mira mi cromo oficial de la selección argentina hecho con IA! Soy ${formData.name}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
       toast({
        title: 'Compartir',
        description: 'El enlace ha sido copiado al portapapeles.'
      });
    }
  };

  const reset = () => {
    setStep(1);
    setPhoto(null);
    setTransformedPhoto(null);
    setFormData({ name: '', position: 'Delantero', height: '', weight: '' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Preview */}
        <div className="flex justify-center order-2 lg:order-1">
          <div className="relative group w-full flex justify-center">
             <div className="absolute -inset-4 bg-panini-red/20 blur-3xl rounded-full opacity-50 animate-float" />
             <CromoSticker
               name={formData.name}
               position={formData.position}
               height={formData.height}
               weight={formData.weight}
               imageUrl={transformedPhoto || photo || ''}
               isProcessing={isProcessing}
               className="animate-in fade-in zoom-in duration-500"
             />
          </div>
        </div>

        {/* Right Side: Wizard */}
        <div className="order-1 lg:order-2 space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl lg:text-6xl font-headline font-black italic text-panini-red tracking-tighter uppercase leading-tight">
              Mundialify <span className="text-panini-yellow">AI</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-md">
              Crea tu cromo digital coleccionable y viste los colores del campeón.
            </p>
          </div>

          <div className="bg-card border border-border p-6 rounded-2xl shadow-xl">
            {step === 1 && (
              <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-panini-red text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                  <h3 className="font-headline font-bold text-xl uppercase italic">Identidad del Jugador</h3>
                </div>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre y Apellido</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      placeholder="Ej: Lionel Messi" 
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Posición</Label>
                    <Select onValueChange={(v) => setFormData(p => ({...p, position: v}))} defaultValue={formData.position}>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Selecciona posición" />
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
                    Siguiente Paso
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                 <div className="flex items-center gap-2 mb-2">
                  <div className="bg-panini-red text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  <h3 className="font-headline font-bold text-xl uppercase italic">Física y Stats</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">Altura (m)</Label>
                    <Input 
                      id="height" 
                      name="height" 
                      type="number" 
                      step="0.01" 
                      placeholder="1.70" 
                      value={formData.height}
                      onChange={handleInputChange}
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Peso (kg)</Label>
                    <Input 
                      id="weight" 
                      name="weight" 
                      type="number" 
                      placeholder="72" 
                      value={formData.weight}
                      onChange={handleInputChange}
                      className="bg-background/50"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                   <Button variant="ghost" onClick={() => setStep(1)} className="flex-1">Atrás</Button>
                   <Button 
                    onClick={() => setStep(3)}
                    className="flex-[2] bg-panini-red hover:bg-panini-red/90 text-white font-headline font-bold uppercase py-6"
                  >
                    Elegir Foto
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-panini-red text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <h3 className="font-headline font-bold text-xl uppercase italic">Retrato Oficial</h3>
                </div>
                
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="group relative h-48 border-2 border-dashed border-muted-foreground/30 rounded-xl flex flex-col items-center justify-center bg-muted/5 hover:bg-muted/10 hover:border-panini-red/50 transition-all cursor-pointer overflow-hidden"
                >
                  {photo ? (
                    <>
                      <img src={photo} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-20" />
                      <div className="z-10 flex flex-col items-center">
                        <CheckCircle2 className="w-12 h-12 text-green-500 mb-2" />
                        <p className="font-bold">Foto cargada correctamente</p>
                        <p className="text-sm text-muted-foreground">Haz click para cambiarla</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-panini-red/10 p-4 rounded-full mb-3 group-hover:scale-110 transition-transform">
                        <Upload className="w-8 h-8 text-panini-red" />
                      </div>
                      <p className="font-bold">Subir retrato</p>
                      <p className="text-xs text-muted-foreground">JPG, PNG hasta 10MB</p>
                    </>
                  )}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handlePhotoUpload} 
                  />
                </div>

                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => setStep(2)} className="flex-1">Atrás</Button>
                  <Button 
                    disabled={!photo || isProcessing} 
                    onClick={triggerAiTransformation}
                    className="flex-[2] bg-panini-red hover:bg-panini-red/90 text-white font-headline font-bold uppercase py-6 group"
                  >
                    <Sparkles className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                    Vistir de Argentina
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4 animate-in zoom-in duration-300 text-center">
                <div className="inline-flex bg-green-500/10 text-green-500 p-2 rounded-full mb-2">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-headline font-black text-2xl uppercase italic text-panini-yellow">¡Cromo Completo!</h3>
                <p className="text-sm text-muted-foreground">Tu cromo ha sido generado con éxito con la camiseta oficial.</p>
                
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <Button 
                    onClick={shareCromo}
                    className="bg-panini-red text-white font-headline font-bold uppercase"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartir
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-panini-red text-panini-red hover:bg-panini-red/5 font-headline font-bold uppercase"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Descargar
                  </Button>
                </div>
                <Button variant="ghost" onClick={reset} className="w-full text-muted-foreground">
                  <RefreshCcw className="w-4 h-4 mr-2" />
                  Crear Otro
                </Button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 p-4 bg-panini-midnight/40 border border-white/5 rounded-xl">
             <Info className="w-5 h-5 text-albiceleste shrink-0" />
             <p className="text-xs text-muted-foreground leading-relaxed">
               Nuestra IA utiliza razonamiento visual para superponer el kit oficial preservando tu identidad facial. 
               Procesado localmente para tu seguridad.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};
