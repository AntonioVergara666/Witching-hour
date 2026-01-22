
import React, { useState, useEffect } from 'react';
import { AspectRatio, GeneratedImage, AppSettings } from './types.ts';


const MAGIC_MESSAGES = [
  "Stirring the cauldron...",
  "Whispering incantations...",
  "Gathering eye of newt...",
  "Weaving astral threads...",
  "Consulting ancient scrolls...",
  "Illuminating the forest...",
  "Summoning color spirits...",
  "Chanting to the moon..."
];

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('A majestic witch standing atop a jagged obsidian cliff, holding a glowing amethyst staff, swirling purple cosmic energy in the background, cinematic lighting, ultra-detailed');
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingMsg, setLoadingMsg] = useState(MAGIC_MESSAGES[0]);
  
  const [resonance, setResonance] = useState(88); 
  const [personalRituals, setPersonalRituals] = useState(0);
  
  const [settings, setSettings] = useState<AppSettings>({
    model: 'gemini-2.5-flash-image',
    aspectRatio: '1:1',
    imageSize: '1K',
    useGoogleSearch: false
  });

  useEffect(() => {
    // Load local stats
    const storedRituals = localStorage.getItem('grimoire_ritual_count');
    setPersonalRituals(storedRituals ? parseInt(storedRituals, 10) : 0);

    // Visual resonance animation
    const interval = setInterval(() => {
      setResonance(prev => {
        const change = (Math.random() - 0.5) * 4;
        return Math.min(100, Math.max(70, prev + change));
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let interval: any;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingMsg(prev => {
          const currentIndex = MAGIC_MESSAGES.indexOf(prev);
          return MAGIC_MESSAGES[(currentIndex + 1) % MAGIC_MESSAGES.length];
        });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const handleGenerate = async () => {
  if (!prompt.trim() || isLoading) return;

  setIsLoading(true);
  setError(null);

  try {
    const res = await fetch("/api/generate-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, settings }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Ritual failed");
    }

    const newImage: GeneratedImage = {
      id: crypto.randomUUID(),
      url: data.image,
      prompt,
      timestamp: Date.now(),
      model: settings.model,
    };

    setImages(prev => [newImage, ...prev]);

    const stored = localStorage.getItem("grimoire_ritual_count") || "0";
    const updated = parseInt(stored, 10) + 1;
    localStorage.setItem("grimoire_ritual_count", updated.toString());
    setPersonalRituals(updated);
  } catch (err: any) {
    console.error("UI Ritual Error:", err);
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};
      
    } catch (err: any) {
      console.error("UI Ritual Error:", err);
      setError(err.message || "The magic failed. The astral winds are too strong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-slate-100 selection:bg-purple-500/30">
      <header className="py-6 px-8 border-b border-purple-900/30 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20 ring-1 ring-purple-400/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
              </svg>
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-wider mystical-font text-purple-100">The Witch's Grimoire</h1>
          </div>
          <div className="hidden md:flex gap-6 items-center">
             <div className="flex flex-col items-end">
               <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Arcane Resonance</span>
               <span className="text-purple-400 font-mono text-sm leading-none flex items-center gap-2">
                 <div className={`w-1.5 h-1.5 rounded-full ${resonance > 80 ? 'bg-purple-500 shadow-[0_0_8px_purple]' : 'bg-slate-500'} transition-all duration-1000`}></div>
                 {resonance.toFixed(1)}%
               </span>
             </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <section className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl p-6 shadow-xl">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
              Grimoire Status
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800/50">
                <p className="text-[10px] text-slate-500 uppercase mb-1">Rituals</p>
                <p className="text-xl font-bold text-purple-200 mystical-font">{personalRituals}</p>
              </div>
              <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800/50">
                <p className="text-[10px] text-slate-500 uppercase mb-1">Aether</p>
                <p className="text-sm font-bold text-purple-200 truncate">{resonance > 90 ? 'Stable' : 'Unstable'}</p>
              </div>
            </div>
          </section>

          <section className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl p-6 shadow-xl">
            <h2 className="text-lg font-semibold mb-4 text-purple-200 mystical-font tracking-wide">Ritual Controls</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-[10px] font-medium text-slate-500 uppercase tracking-widest mb-3">Power Source</label>
                <div className="grid grid-cols-1 gap-2">
                  <button 
                    onClick={() => setSettings(s => ({...s, model: 'gemini-2.5-flash-image'}))}
                    className={`px-4 py-3 rounded-xl border text-xs transition-all text-left flex items-center justify-between ${settings.model === 'gemini-2.5-flash-image' ? 'border-purple-500 bg-purple-500/10 text-purple-100 shadow-[0_0_15px_rgba(168,85,247,0.05)]' : 'border-slate-800 hover:border-slate-700 text-slate-400'}`}
                  >
                    <span>Standard Ritual (Fast)</span>
                    {settings.model === 'gemini-2.5-flash-image' && <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>}
                  </button>
                  <button 
                    onClick={() => setSettings(s => ({...s, model: 'gemini-3-pro-image-preview'}))}
                    className={`px-4 py-3 rounded-xl border text-xs transition-all flex items-center justify-between ${settings.model === 'gemini-3-pro-image-preview' ? 'border-purple-500 bg-purple-500/10 text-purple-100 shadow-[0_0_15px_rgba(168,85,247,0.05)]' : 'border-slate-800 hover:border-slate-700 text-slate-400'}`}
                  >
                    <span>Grand Ritual (HQ)</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${settings.model === 'gemini-3-pro-image-preview' ? 'text-purple-400' : 'text-slate-700'}`} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-medium text-slate-500 uppercase tracking-widest mb-3">Canvas Shape</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['1:1', '3:4', '4:3', '9:16', '16:9'] as AspectRatio[]).map(ratio => (
                    <button 
                      key={ratio}
                      onClick={() => setSettings(s => ({...s, aspectRatio: ratio}))}
                      className={`py-2 rounded-lg border text-[10px] transition-all ${settings.aspectRatio === ratio ? 'border-purple-500 bg-purple-500/20 text-purple-100' : 'border-slate-800 hover:border-slate-700 text-slate-400'}`}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-2 space-y-8">
          {error && (
            <div className="bg-red-900/20 border border-red-500/30 text-red-200 p-4 rounded-2xl flex items-start gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 shrink-0 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <p className="font-bold text-sm tracking-wide">Ritual Interrupted</p>
                <p className="text-xs opacity-70 mt-0.5">{error}</p>
              </div>
              <button onClick={() => setError(null)} className="text-slate-600 hover:text-slate-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}

          <section className="bg-slate-900/40 backdrop-blur-md border border-purple-500/10 rounded-3xl p-1 shadow-2xl ring-1 ring-white/5 overflow-hidden">
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-center">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Incantation Phrase</label>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></div>
                   <span className="text-[10px] text-purple-400 font-mono">READY TO CONJURE</span>
                </div>
              </div>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your vision of a witch..."
                className={`w-full h-32 bg-slate-950/50 border ${error ? 'border-red-500/30' : 'border-slate-800'} rounded-2xl p-6 text-slate-100 focus:outline-none focus:border-purple-500/50 transition-all resize-none placeholder:text-slate-800 font-light leading-relaxed`}
              />
              <div className="flex justify-end pt-2">
                <button 
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className={`px-10 py-4 rounded-2xl font-bold transition-all shadow-xl flex items-center gap-3 group ${isLoading ? 'bg-slate-800 text-slate-600' : 'bg-purple-600 hover:bg-purple-500 text-white hover:scale-[1.02] shadow-purple-600/10 active:scale-95'}`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="text-xs uppercase tracking-widest">{loadingMsg}</span>
                    </>
                  ) : (
                    <>
                      <span className="text-xs uppercase tracking-[0.15em]">Conjure Vision</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-bold mystical-font text-purple-200 flex items-center gap-4">
              The Hall of Visions
              <div className="h-px flex-1 bg-gradient-to-r from-purple-500/20 to-transparent"></div>
            </h2>
            
            {images.length === 0 && !isLoading ? (
              <div className="border border-slate-800/50 bg-slate-900/20 rounded-3xl py-32 flex flex-col items-center justify-center text-slate-500 text-center px-6 transition-all group">
                <div className="w-20 h-20 bg-slate-900/80 rounded-full flex items-center justify-center mb-6 text-slate-800 border border-white/5 transition-colors group-hover:border-purple-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-lg mystical-font opacity-40 italic">Awaiting your command...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">
                {images.map((img) => (
                  <div key={img.id} className="group relative bg-slate-900/80 rounded-3xl overflow-hidden border border-slate-800/50 shadow-2xl transition-all hover:border-purple-500/40 hover:-translate-y-1">
                    <div className="aspect-square relative overflow-hidden bg-slate-950">
                      <img 
                        src={img.url} 
                        alt={img.prompt} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                        <p className="text-white/90 text-[10px] leading-relaxed line-clamp-4 italic mb-6 font-light">"{img.prompt}"</p>
                        <div className="flex gap-3">
                          <a 
                            href={img.url} 
                            download={`witch-vision-${img.id}.png`} 
                            className="flex-1 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white py-3 rounded-xl text-[10px] uppercase font-bold tracking-widest text-center transition-all border border-white/5"
                          >
                            Preserve Vision
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="px-5 py-4 border-t border-slate-800/50 flex justify-between items-center bg-slate-900/30 backdrop-blur-xl">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-purple-500"></div>
                        <span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest">
                          {img.model === 'gemini-3-pro-image-preview' ? 'High Sorcery' : 'Standard Ritual'}
                        </span>
                      </div>
                      <span className="text-[9px] text-slate-600 font-mono">
                        {new Date(img.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="py-16 px-8 border-t border-slate-900 bg-slate-950/50 text-slate-600 text-center text-[10px] uppercase tracking-[0.3em]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="mystical-font text-slate-500 opacity-60 normal-case tracking-wider">Powered by Gemini AI</p>
          <div className="flex gap-10">
            <span className="hover:text-purple-400 transition-colors cursor-default">Privacy</span>
            <span className="hover:text-purple-400 transition-colors cursor-default">Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
