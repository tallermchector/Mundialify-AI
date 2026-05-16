"use client";

import React, { useState, useRef } from 'react';
import { CromoSticker } from './CromoSticker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Share2, Copy, RefreshCcw, Sparkles, Info, CheckCircle2, Trophy, Terminal } from 'lucide-react';
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
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
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
      setGeneratedPrompt(result.generatedPrompt);
      setStep(4);
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Error de Proceso',
        description: 'Hubo un problema generando el prompt.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = () => {
    if (generatedPrompt) {
      navigator.clipboard.writeText(generatedPrompt);
      toast({ title: 'Copiado', description: 'Prompt copiado al portapapeles.' });
    }
  };

  const reset = () => {
    setStep(1);
    setPhoto(null);
    setGeneratedPrompt(null);
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
    <div className="max-w-6xl mx-auto px-4 py-8 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Preview (Cromo) */}
        <div className="lg:col-span-5 flex justify-center sticky top-8">
          <div className="relative group w-full flex justify-center">
             <div className="absolute -inset-4 bg-panini-red/10 blur-3xl rounded-full opacity-30 animate-pulse" />
             <CromoSticker
               name={formData.name}
               position={formData.position}
               height={formData.height}
               weight={formData.weight}
               team={formData.team}
               imageUrl={photo || ''}
               isProcessing={isProcessing}
               className="animate-in fade-in zoom-in duration-500"
               isTransformed={false}
             />
          </div>
        </div>

        {/* Right Side: Wizard & Output */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl lg:text-5xl font-headline font-black italic text-white tracking-tighter uppercase leading-tight">
              PROMPT <span className="text-panini-yellow">CONSTRUCTOR</span>
            </h1>
            <p className="text-muted-foreground text-md uppercase tracking-widest font-bold">
              INGENIERÍA DE PROMPTS MULTIMODALES
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
                    <Input id="height" name="height" step="0.01" value={formData.height} onChange={handleInputChange} className="bg-background/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Peso (kg)</Label>
                    <Input id="weight" name="weight" value={formData.weight} onChange={handleInputChange} className="bg-background/50" />
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
                        <p className="font-bold text-white uppercase tracking-tighter">Imagen Cargada</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-white/10 p-4 rounded-full mb-3 group-hover:scale-110 transition-transform">
                        <Upload className="w-8 h-8 text-white" />
                      </div>
                      <p className="font-bold text-white/60">Sube tu foto para el análisis</p>
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
                    Construir Prompt Final
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && generatedPrompt && (
              <div className="space-y-4 animate-in zoom-in duration-300">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-panini-yellow" />
                    <h3 className="font-headline font-black text-xl uppercase italic tracking-tighter">Prompt Generado</h3>
                  </div>
                  <Button variant="outline" size="sm" onClick={copyToClipboard} className="h-8 border-white/10">
                    <Copy className="w-3 h-3 mr-2" /> Copiar
                  </Button>
                </div>
                
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-panini-red to-panini-yellow rounded-lg blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
                  <Textarea 
                    readOnly 
                    value={generatedPrompt} 
                    className="min-h-[400px] bg-black/40 border-white/10 text-xs font-mono leading-relaxed text-white/80 focus-visible:ring-0"
                  />
                </div>

                <Button variant="ghost" onClick={reset} className="w-full text-white/40 hover:text-white uppercase text-xs font-bold tracking-widest py-6">
                  <RefreshCcw className="w-3 h-3 mr-2" /> Generar otro escenario
                </Button>
              </div>
            )}
          </div>

          <div className="flex items-start gap-3 p-4 bg-panini-midnight/60 border border-white/5 rounded-xl">
             <Info className="w-5 h-5 text-panini-yellow shrink-0 mt-1" />
             <div className="space-y-1">
                <p className="text-[11px] text-white font-bold uppercase tracking-wider">Modo Ingeniero de Software</p>
                <p className="text-[10px] text-muted-foreground leading-relaxed uppercase font-medium">
                  Este entorno extrae la lógica de negocio multia-agente. El prompt resultante integra las reglas de indumentaria, 
                  branding Panini y variables biométricas dinámicas de {formData.team}.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
