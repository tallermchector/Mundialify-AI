"use client";

import React, { useState, useRef } from 'react';
import { CromoCanvas } from './CromoCanvas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Upload, Trophy, UserCircle, Sparkles, RefreshCcw, Palette } from 'lucide-react';
import { resizeImage } from '@/lib/image-utils';
import { useToast } from '@/hooks/use-toast';

const COUNTRIES = [
  { code: 'ARG', name: 'Argentina' },
  { code: 'URU', name: 'Uruguay' },
  { code: 'BRA', name: 'Brasil' },
  { code: 'MEX', name: 'México' },
  { code: 'USA', name: 'Estados Unidos' },
  { code: 'CAN', name: 'Canadá' },
  { code: 'ESP', name: 'España' },
  { code: 'FRA', name: 'Francia' },
  { code: 'GER', name: 'Alemania' },
  { code: 'ENG', name: 'Inglaterra' },
  { code: 'ITA', name: 'Italia' },
  { code: 'POR', name: 'Portugal' },
  { code: 'COL', name: 'Colombia' },
  { code: 'PAR', name: 'Paraguay' },
  { code: 'CHI', name: 'Chile' },
  { code: 'ECU', name: 'Ecuador' },
  { code: 'VEN', name: 'Venezuela' },
  { code: 'MAR', name: 'Marruecos' },
  { code: 'JPN', name: 'Japón' },
];

export const MundialifyApp: React.FC = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: 'Santiago Sánchez',
    code: 'URU',
    position: 'fwd',
    height: '1.75',
    weight: '72',
    day: '24',
    month: '06',
    year: '1987',
    club: 'Peñarol (URU)',
    cBg: '#65c8c9',
    useGoldBg: false,
    c2: '#17277f',
    c6: '#ffffff',
    cCosito: '#9ab7dd',
    photoScale: 110,
    photoY: -80,
    photoX: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = event.target?.result as string;
        const resized = await resizeImage(base64, 1600);
        setPhoto(resized);
        setStep(3);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      toast({ variant: 'destructive', title: 'Error', description: 'No pudimos procesar la foto.' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <div className="lg:col-span-5 flex justify-center sticky top-8">
          <CromoCanvas data={formData} photo={photo} />
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl lg:text-5xl font-headline font-black italic text-white tracking-tighter uppercase leading-tight">
              MUNDIALIFY <span className="text-panini-yellow">2026</span>
            </h1>
            <p className="text-muted-foreground text-md uppercase tracking-widest font-bold">
              EDICIÓN OFICIAL - HQ CANVAS ENGINE
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
                    <Label>Selección Nacional</Label>
                    <Select onValueChange={(v) => setFormData(p => ({...p, code: v}))} defaultValue={formData.code}>
                      <SelectTrigger className="bg-background/50 h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRIES.map(c => <SelectItem key={c.code} value={c.code}>{c.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Nombre Completo</Label>
                    <Input name="name" value={formData.name} onChange={handleInputChange} className="bg-background/50 h-12 font-bold" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-2">
                      <Label>Día</Label>
                      <Input name="day" value={formData.day} onChange={handleInputChange} className="bg-background/50 h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label>Mes</Label>
                      <Input name="month" value={formData.month} onChange={handleInputChange} className="bg-background/50 h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label>Año</Label>
                      <Input name="year" value={formData.year} onChange={handleInputChange} className="bg-background/50 h-12" />
                    </div>
                  </div>
                  <Button onClick={() => setStep(2)} className="w-full bg-panini-red hover:bg-panini-red/90 text-white font-headline font-bold uppercase py-6">
                    Siguiente: Posición y Club
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <Palette className="w-5 h-5 text-panini-yellow" />
                  <h3 className="font-headline font-bold text-xl uppercase italic">Ficha Técnica</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2 col-span-2">
                    <Label>Posición</Label>
                    <Select onValueChange={(v) => setFormData(p => ({...p, position: v}))} defaultValue={formData.position}>
                      <SelectTrigger className="bg-background/50 h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gk">Arquero</SelectItem>
                        <SelectItem value="def">Defensor</SelectItem>
                        <SelectItem value="mid">Mediocampista</SelectItem>
                        <SelectItem value="fwd">Delantero</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label>Club Actual</Label>
                    <Input name="club" value={formData.club} onChange={handleInputChange} className="bg-background/50 h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label>Altura (m)</Label>
                    <Input name="height" value={formData.height} onChange={handleInputChange} className="bg-background/50 h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label>Peso (kg)</Label>
                    <Input name="weight" value={formData.weight} onChange={handleInputChange} className="bg-background/50 h-12" />
                  </div>
                </div>
                <div className="flex gap-2">
                   <Button variant="ghost" onClick={() => setStep(1)} className="flex-1">Atrás</Button>
                   <Button onClick={() => setStep(3)} className="flex-[2] bg-panini-red hover:bg-panini-red/90 text-white font-headline font-bold uppercase py-6">
                    Ajustar Diseño
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <UserCircle className="w-5 h-5 text-panini-yellow" />
                  <h3 className="font-headline font-bold text-xl uppercase italic">Ajustes Visuales</h3>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                  <div className="space-y-2">
                    <Label>Color Fondo</Label>
                    <Input type="color" name="cBg" value={formData.cBg} onChange={handleInputChange} className="h-10 w-full" disabled={formData.useGoldBg} />
                  </div>
                  <div className="flex items-center gap-2 pt-8">
                    <Checkbox id="gold" checked={formData.useGoldBg} onCheckedChange={(c) => setFormData(p => ({...p, useGoldBg: !!c}))} />
                    <Label htmlFor="gold">Fondo Dorado</Label>
                  </div>
                  <div className="space-y-2">
                    <Label>Escala Foto</Label>
                    <Slider value={[formData.photoScale]} min={50} max={200} step={1} onValueChange={([v]) => setFormData(p => ({...p, photoScale: v}))} />
                  </div>
                  <div className="space-y-2">
                    <Label>Posición Y</Label>
                    <Slider value={[formData.photoY]} min={-500} max={500} step={1} onValueChange={([v]) => setFormData(p => ({...p, photoY: v}))} />
                  </div>
                </div>
                
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="group relative h-32 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 hover:border-panini-red/50 transition-all cursor-pointer overflow-hidden"
                >
                  {photo ? (
                    <>
                      <img src={photo} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-40" />
                      <div className="z-10 flex flex-col items-center">
                        <RefreshCcw className="w-8 h-8 text-panini-yellow mb-1" />
                        <p className="font-bold text-white text-xs uppercase">Cambiar Foto</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-white mb-2" />
                      <p className="font-bold text-white/60 text-xs">Sube tu foto</p>
                    </>
                  )}
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                </div>

                <div className="flex gap-2">
                   <Button variant="ghost" onClick={() => setStep(2)} className="flex-1">Atrás</Button>
                   <Button disabled={!photo} onClick={() => toast({ title: "¡Cromo Listo!", description: "Puedes descargarlo ahora." })} className="flex-[2] bg-panini-yellow text-panini-midnight font-headline font-black uppercase py-6">
                    <Sparkles className="w-5 h-5 mr-2" /> Finalizar
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-panini-midnight/60 border border-white/5 rounded-xl text-center">
             <p className="text-[10px] text-muted-foreground leading-relaxed uppercase font-medium tracking-widest">
               Renderizado avanzado via Offscreen Canvas • Mundial Hub Assets v2026
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};
