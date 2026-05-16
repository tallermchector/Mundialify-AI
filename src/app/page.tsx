import { MundialifyApp } from '@/components/MundialifyApp';
import { Toaster } from '@/components/ui/toaster';

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-panini-midnight">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-panini-red/20 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-albiceleste/10 blur-[100px] rounded-full" />
        <div className="absolute -bottom-[5%] left-[20%] w-[50%] h-[50%] bg-panini-yellow/5 blur-[120px] rounded-full" />
      </div>

      <nav className="relative z-10 border-b border-white/5 bg-panini-midnight/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-panini-red p-1 rounded-sm shadow-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
                <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-headline font-black text-xl italic tracking-tighter text-white uppercase">Mundialify</span>
          </div>
          <div className="flex gap-4">
             <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-white/60">AFA AI Verified</span>
             </div>
          </div>
        </div>
      </nav>

      <section className="relative z-10">
        <MundialifyApp />
      </section>

      <footer className="relative z-10 py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-muted-foreground text-xs uppercase tracking-[0.2em] font-medium">
            © 2024 Mundialify AI • Panini Inspired Fan Experience
          </p>
          <div className="mt-4 flex justify-center gap-6 opacity-30">
            {/* Fake Partners Icons */}
            <div className="w-8 h-8 bg-white rounded-full grayscale" />
            <div className="w-8 h-8 bg-white rounded-full grayscale" />
            <div className="w-8 h-8 bg-white rounded-full grayscale" />
          </div>
        </div>
      </footer>
      
      <Toaster />
    </main>
  );
}
