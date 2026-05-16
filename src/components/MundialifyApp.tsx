
"use client";

import React, { useState, useRef } from 'react';
import { CromoCanvas } from './CromoCanvas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Upload, RefreshCcw, Sparkles, Trophy, UserCircle, Copy, Check } from 'lucide-react';
import { normalizeName, resizeImage } from '@/lib/image-utils';
import { useToast } from '@/hooks/use-toast';
import { transformPhotoWithKit } from '@/ai/flows/ai-kit-transformation';

const COUNTRIES = [
  { label: "Uruguay", value: "URUGUAY", code: "UY" },
  { label: "Argentina", value: "ARGENTINA", code: "AR" },
  { label: "Brasil", value: "BRASIL", code: "BR" },
  { label: "Francia", value: "FRANCIA", code: "FR" },
  { label: "España", value: "ESPAÑA", code: "ES" },
  { label: "Inglaterra", value: "INGLATERRA", code: "GB-ENG" },
  { label: "Alemania", value: "ALEMANIA", code: "DE" },
  { label: "México", value: "MÉXICO", code: "MX" },
  { label: "Colombia", value: "COLOMBIA", code: "CO" },
  { label: "EE.UU.", value: "USA", code: "US" },
];

export const MundialifyApp: React.FC = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  const [formData, setFormData] = useState({
    name: 'Santiago Sánchez',
    team: 'URUGUAY',
    teamCode: 'UY',
    position: 'Delantero',
    height: '1.75',
    weight: '72',
    birth: '24/06/1987',
    club: 'Peñarol (URU)',
  });
  
  const [photo, setPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'name' ? value : value 
    }));
  };

  const handleCountryChange = (value: string) => {
    const country = COUNTRIES.find(c => c.value === value);
    if (country) {
      setFormData(prev => ({ ...prev, team: country.value, teamCode: country.code }));
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = event.target?.result as string;
        const resized = await resizeImage(base64, 1200);
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

  const handleGeneratePrompt = async () => {
    setIsGenerating(true);
    try {
      const result = await transformPhotoWithKit({
        ...formData,
        photoDataUri: photo || '',
      });
      setGeneratedPrompt(result.generatedPrompt);
      setStep(4);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo generar el prompt.'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (generatedPrompt) {
      navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "¡Copiado!",
        description: "El prompt ha sido copiado al portapapeles."
      });
    }
  };

  const reset = () => {
    setStep(1);
    setPhoto(null);
    setGeneratedPrompt(null);
    setFormData({ 
      name: 'Santiago Sánchez', 
      team: 'URUGUAY', 
      teamCode: 'UY',
      position: 'Delantero', 
      height: '1.75', 
      weight: '72', 
      birth: '24/06/1987', 
      club: 'Peñarol (URU)' 
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Canvas Preview */}
        <div className="lg:col-span-5 flex justify-center sticky top-8">
          <CromoCanvas data={formData} photo={photo} />
        </div>

        {/* Right Side: Wizard */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl lg:text-5xl font-headline font-black italic text-white tracking-tighter uppercase leading-tight">
              MUNDIALIFY <span className="text-panini-yellow">2026</span>
            </h1>
            <p className="text-muted-foreground text-md uppercase tracking-widest font-bold">
              GENERADOR DE PROMPTS Y CROMOS HQ
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
                    <Select onValueChange={handleCountryChange} defaultValue={formData.team}>
                      <SelectTrigger className="bg-background/50 h-12">
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
                      placeholder="Ej: SANTIAGO SÁNCHEZ" 
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-background/50 h-12 font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Posición</Label>
                    <Select onValueChange={(v) => setFormData(p => ({...p, position: v}))} defaultValue={formData.position}>
                      <SelectTrigger className="bg-background/50 h-12">
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
                    Siguiente: Ficha Técnica
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
                    <Input id="birth" name="birth" value={formData.birth} onChange={handleInputChange} className="bg-background/50 h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="club">Club Actual</Label>
                    <Input id="club" name="club" value={formData.club} onChange={handleInputChange} className="bg-background/50 h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Altura (m)</Label>
                    <Input id="height" name="height" step="0.01" value={formData.height} onChange={handleInputChange} className="bg-background/50 h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Peso (kg)</Label>
                    <Input id="weight" name="weight" value={formData.weight} onChange={handleInputChange} className="bg-background/50 h-12" />
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
                  <UserCircle className="w-5 h-5 text-albiceleste" />
                  <h3 className="font-headline font-bold text-xl uppercase italic">Retrato y Prompt</h3>
                </div>
                
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="group relative h-48 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 hover:border-panini-red/50 transition-all cursor-pointer overflow-hidden"
                >
                  {photo ? (
                    <>
                      <img src={photo} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                      <div className="z-10 flex flex-col items-center">
                        <Sparkles className="w-12 h-12 text-panini-yellow mb-2 animate-pulse" />
                        <p className="font-bold text-white uppercase tracking-tighter">Foto Lista</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-white/10 p-4 rounded-full mb-3 group-hover:scale-110 transition-transform">
                        <Upload className="w-8 h-8 text-white" />
                      </div>
                      <p className="font-bold text-white/60">Sube tu foto para el prompt</p>
                    </>
                  )}
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                </div>

                <div className="flex flex-col gap-3">
                  <Button 
                    disabled={!photo || isGenerating} 
                    onClick={handleGeneratePrompt}
                    className="w-full bg-panini-yellow hover:bg-panini-yellow/90 text-panini-midnight font-headline font-black uppercase py-8 text-lg"
                  >
                    {isGenerating ? (
                      <div className="flex items-center gap-2">
                        <RefreshCcw className="w-5 h-5 animate-spin" />
                        CONSTRUYENDO PROMPT...
                      </div>
                    ) : (
                      <>
                        <Sparkles className="w-6 h-6 mr-2" />
                        GENERAR PROMPT OFICIAL
                      </>
                    )}
                  </Button>
                  <Button variant="ghost" onClick={() => setStep(2)}>Atrás</Button>
                </div>
              </div>
            )}

            {step === 4 && generatedPrompt && (
              <div className="space-y-4 animate-in zoom-in-95 duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-panini-yellow" />
                    <h3 className="font-headline font-bold text-xl uppercase italic">Prompt Generado</h3>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={copyToClipboard}
                    className="bg-white/5 hover:bg-white/10 text-white border-white/10"
                  >
                    {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copied ? 'Copiado' : 'Copiar'}
                  </Button>
                </div>
                
                <div className="relative group">
                  <div className="absolute inset-0 bg-panini-yellow/5 rounded-xl blur-xl" />
                  <Textarea 
                    value={generatedPrompt} 
                    readOnly 
                    className="relative bg-panini-midnight/80 border-panini-yellow/20 text-panini-yellow/90 font-mono text-xs h-[350px] leading-relaxed resize-none p-4 rounded-xl"
                  />
                </div>

                <Button 
                  onClick={reset}
                  className="w-full bg-white/5 hover:bg-white/10 text-white font-headline font-bold uppercase py-6"
                >
                  <RefreshCcw className="w-4 h-4 mr-2" />
                  Crear Otro Jugador
                </Button>
              </div>
            )}
          </div>

          <div className="p-4 bg-panini-midnight/60 border border-white/5 rounded-xl text-center">
             <p className="text-[10px] text-muted-foreground leading-relaxed uppercase font-medium tracking-widest">
               Renderizado local via Canvas API • Prompt Builder v2.0 • Sin almacenamiento de datos
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};
