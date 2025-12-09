import React, { useState, useEffect } from 'react';
import { GlassCard } from './components/GlassCard';
import { EffectRadar } from './components/EffectRadar';
import { SessionLogger } from './components/SessionLogger';
import { Session, ViewState, InsightResult } from './types';
import { MOCK_SESSIONS } from './constants';
import { analyzePatterns } from './services/geminiService';
import { Plus, BookOpen, Map, Sparkles, Feather, Clock, Aperture, Eye } from 'lucide-react';

const App: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>(MOCK_SESSIONS);
  const [view, setView] = useState<ViewState>('DASHBOARD');
  const [insight, setInsight] = useState<InsightResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showLogger, setShowLogger] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Derive simple dashboard stats
  const totalSessions = sessions.length;
  const avgRating = (sessions.reduce((acc, curr) => acc + curr.rating, 0) / totalSessions).toFixed(1);
  const latestSession = sessions[0];

  const handleSaveSession = (newSession: Session) => {
    setSessions(prev => [newSession, ...prev]);
    setShowLogger(false);
    setInsight(null);
  };

  const generateInsights = async () => {
    if (insight) return; 
    setIsAnalyzing(true);
    const result = await analyzePatterns(sessions.slice(0, 5));
    setInsight(result);
    setIsAnalyzing(false);
  };

  const renderDashboard = () => (
    <div className="space-y-12 md:space-y-16 animate-in fade-in duration-1000">
      
      {/* Pocket Watch & Header */}
      <div className="flex justify-between items-start pt-2">
         <div className="text-white/40">
            <h1 className="text-4xl md:text-5xl font-serif italic text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">Reverie</h1>
            <p className="text-[10px] uppercase tracking-[0.3em] mt-1 text-fuchsia-300/60 pl-1">Sensory Cartography</p>
         </div>
         <div className="flex flex-col items-end">
             {/* The Pocket Watch */}
             <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white/20 flex items-center justify-center relative shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-black/20 backdrop-blur-md group hover:border-fuchsia-400/50 transition-colors">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-2 bg-white/20 -mt-2.5 rounded-t-sm" /> {/* Watch fob */}
                 <div className="absolute inset-0 rounded-full border border-white/10" />
                 
                 {/* Pendulum Hand */}
                 <div className="w-0.5 h-4 md:h-5 bg-fuchsia-400 origin-bottom rounded-full absolute top-2 animate-pendulum shadow-[0_0_10px_#e879f9]" />
                 
                 <span className="text-[10px] md:text-[12px] font-mono text-white/80 mt-5 md:mt-6 pt-1 flex items-baseline">
                    {currentTime.getHours() % 12 || 12}:{currentTime.getMinutes().toString().padStart(2, '0')}
                 </span>
             </div>
         </div>
      </div>

      {/* Hero: The Looking Glass */}
      <section className="relative perspective-1000">
        <div className="flex items-baseline justify-between mb-4 px-2">
            <h2 className="text-white/60 text-sm font-serif italic tracking-wide">Through the Looking Glass</h2>
        </div>

        {/* Floating Card Container */}
        <div className="relative group touch-pan-y">
            {/* Background Aura */}
            <div className="absolute -inset-4 bg-gradient-to-r from-fuchsia-600/20 to-teal-600/20 rounded-[2.5rem] blur-2xl group-hover:blur-3xl transition-all duration-1000 opacity-50 animate-pulse" />
            
            <GlassCard iridescent className="min-h-[400px] md:min-h-[440px] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group z-10 transition-transform duration-700 ease-out transform md:group-hover:rotate-x-2 md:group-hover:scale-[1.01] active:scale-[0.99]">
                
                {/* Background swirling graphic */}
                <div className="absolute -right-32 -top-32 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[100px] md:group-hover:bg-fuchsia-500/20 transition-all duration-1000 animate-float" />
                <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] animate-float-reverse" style={{animationDelay: '2s'}} />

                <div>
                    <div className="flex items-center gap-3 mb-6 md:mb-8">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] border backdrop-blur-md shadow-lg ${
                            latestSession.strainType === 'Sativa' ? 'border-amber-500/50 text-amber-100 bg-amber-900/30' :
                            latestSession.strainType === 'Indica' ? 'border-indigo-500/50 text-indigo-100 bg-indigo-900/30' :
                            'border-teal-500/50 text-teal-100 bg-teal-900/30'
                        }`}>
                        {latestSession.strainType}
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                        <span className="text-white/40 text-xs font-serif italic">{new Date(latestSession.timestamp).toLocaleDateString()}</span>
                    </div>

                    <h2 className="text-6xl md:text-7xl font-serif italic text-white mb-6 leading-[0.9] drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] mix-blend-screen tracking-tight break-words">
                        {latestSession.productName}
                    </h2>

                    <div className="flex gap-2 flex-wrap mb-8">
                        {latestSession.flavors.slice(0, 3).map(f => (
                        <span key={f} className="text-[10px] text-white/70 font-serif italic border border-white/10 px-3 py-1 rounded-full bg-white/5 shadow-[0_0_10px_rgba(0,0,0,0.2)]">
                            {f}
                        </span>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 items-end border-t border-white/10 pt-6">
                    <div>
                        <span className="block text-[10px] uppercase tracking-[0.2em] text-white/30 mb-2">Method</span>
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_10px_#2dd4bf] animate-pulse" />
                            <span className="text-2xl text-white/90 font-serif italic">{latestSession.method}</span>
                        </div>
                    </div>
                    
                    <div className="text-right">
                         <div className="inline-flex items-baseline gap-1 relative md:group-hover:scale-110 transition-transform duration-500">
                            <span className="text-7xl md:text-8xl font-serif text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">{latestSession.rating}</span>
                            <span className="text-xl text-white/30 font-serif italic">/5</span>
                         </div>
                    </div>
                </div>
            </GlassCard>
        </div>
      </section>

      {/* The Radar & Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="p-0 relative min-h-[340px] overflow-hidden" hoverEffect>
             <div className="absolute top-6 left-6 z-10">
                <h3 className="text-white font-serif text-3xl italic drop-shadow-lg">The Shape</h3>
             </div>
             <div className="absolute inset-0 flex items-center justify-center pt-8">
                <EffectRadar effects={latestSession.effects} color="#e879f9" />
             </div>
        </GlassCard>

        <div className="grid grid-rows-2 gap-6">
             <GlassCard className="p-6 flex flex-row items-center justify-between group cursor-pointer overflow-hidden relative" onClick={() => setView('INSIGHTS')} hoverEffect>
                 <div className="absolute inset-0 bg-gradient-to-r from-violet-600/30 via-fuchsia-600/10 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-1000" />
                 
                 {/* Floating dust particles effect */}
                 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

                 <div className="relative z-10">
                    <span className="block text-4xl md:text-5xl font-serif italic text-white mb-2 md:group-hover:text-fuchsia-200 transition-colors">The Oracle</span>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-white/40">Ask the cards</span>
                 </div>
                 <Aperture className="text-violet-200 opacity-60 md:group-hover:opacity-100 md:group-hover:rotate-180 md:group-hover:scale-110 transition-all duration-1000" size={48} strokeWidth={1} />
             </GlassCard>

             <div className="grid grid-cols-2 gap-6">
                <GlassCard className="flex flex-col items-center justify-center p-4 group md:hover:bg-white/[0.08] transition-colors">
                    <span className="text-5xl md:text-6xl font-serif text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] md:group-hover:scale-110 transition-transform duration-500">{totalSessions}</span>
                    <span className="text-[9px] uppercase tracking-widest text-white/40 mt-2">Memories</span>
                </GlassCard>
                <GlassCard className="flex flex-col items-center justify-center p-4 group md:hover:bg-white/[0.08] transition-colors">
                    <span className="text-5xl md:text-6xl font-serif text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] md:group-hover:scale-110 transition-transform duration-500">{avgRating}</span>
                    <span className="text-[9px] uppercase tracking-widest text-white/40 mt-2">Resonance</span>
                </GlassCard>
             </div>
        </div>
      </section>

      {/* Stacked Deck History Teaser */}
      <section className="pb-32">
        <div className="flex justify-between items-end mb-8 px-2">
            <h3 className="text-white text-3xl font-serif italic">Echoes of the Past</h3>
            <button onClick={() => setView('JOURNAL')} className="text-white/40 active:text-white text-[10px] uppercase tracking-widest transition-colors flex items-center gap-1 group py-2">
                Unfold All <span className="md:group-hover:translate-x-1 transition-transform">→</span>
            </button>
        </div>
        
        {/* The Stacked Deck Layout */}
        <div className="relative h-[220px] w-full perspective-1000 group">
             {sessions.slice(1, 4).map((s, i) => (
                 <div 
                    key={s.id}
                    className="absolute inset-0 transition-all duration-700 ease-out origin-bottom-center"
                    style={{
                        zIndex: 3 - i,
                        top: `${i * 15}px`, // Slight vertical cascade
                        transform: `scale(${1 - (i * 0.05)}) translateY(0px)`, // Scale down back cards
                    }}
                 >
                    {/* On parent hover, fan them out vertically */}
                     <div className="w-full h-full transition-transform duration-500 md:group-hover:translate-y-[calc(var(--index)*85px)]" style={{ '--index': i } as React.CSSProperties}>
                        <GlassCard className="h-[150px] p-6 flex items-center justify-between border-t border-white/20 bg-black/60 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                            <div className="flex items-center gap-4 md:gap-6">
                                <span className="text-white/10 font-serif italic text-4xl md:text-5xl">0{sessions.length - 1 - i}</span>
                                <div className="min-w-0 flex-1">
                                    <h4 className="text-white text-2xl md:text-3xl font-serif italic mb-1 truncate">{s.productName}</h4>
                                    <div className="flex gap-2 text-[10px] text-white/40 uppercase tracking-widest">
                                        <span>{s.strainType}</span>
                                        <span>•</span>
                                        <span>{s.method}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-full border border-white/10 flex items-center justify-center">
                                <span className="text-xl md:text-2xl font-serif text-white">{s.rating}</span>
                            </div>
                        </GlassCard>
                     </div>
                 </div>
             ))}
        </div>
      </section>
    </div>
  );

  const renderJournal = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 mt-8 pb-32">
      <div className="flex justify-between items-baseline mb-8 md:mb-12">
        <h2 className="text-6xl md:text-7xl font-serif italic text-white tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">The Archive</h2>
        <span className="text-white/30 font-mono text-xs border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md whitespace-nowrap">{sessions.length} Fragments</span>
      </div>
      
      <div className="relative">
        <div className="absolute left-[2px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        
        <div className="space-y-16 md:space-y-20">
            {sessions.map((s, index) => (
            <div key={s.id} className="relative pl-8 md:pl-12 group perspective-1000">
                {/* Timeline Orb */}
                <div className="absolute left-[-4px] top-10 w-3 h-3 rounded-full bg-[#05020c] border border-white/40 group-hover:border-fuchsia-400 group-hover:shadow-[0_0_15px_#e879f9] transition-all z-10" />
                
                <GlassCard iridescent className="p-6 md:p-8 transition-all duration-500 active:bg-white/[0.08] active:translate-x-1 md:hover:translate-x-2">
                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-6">
                        <div>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-fuchsia-300/80 mb-2 block">{new Date(s.timestamp).toLocaleDateString()}</span>
                            <h3 className="text-4xl md:text-5xl font-serif italic text-white mb-2 break-words">{s.productName}</h3>
                            <div className="flex items-center gap-3 text-xs text-white/50">
                                <span className="uppercase tracking-wider text-[10px]">{s.strainType}</span>
                                <span className="w-1 h-1 rounded-full bg-white/30" />
                                <span className="uppercase tracking-wider text-[10px]">{s.method}</span>
                                <span className="w-1 h-1 rounded-full bg-white/30" />
                                <span className="font-serif italic text-white/70">{s.dosage}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                             {[...Array(5)].map((_, i) => (
                                 <Feather 
                                    key={i} 
                                    size={18} 
                                    className={`${i < s.rating ? 'text-fuchsia-400 fill-fuchsia-400/20 drop-shadow-[0_0_10px_rgba(232,121,249,0.5)]' : 'text-white/5'} transition-colors`} 
                                 />
                             ))}
                        </div>
                    </div>
                    
                    <div className="relative pl-6 border-l border-white/10 mb-6 ml-2">
                        <p className="text-white/80 text-xl md:text-2xl font-serif italic leading-relaxed">
                            "{s.notes}"
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {s.flavors.map(f => (
                        <span key={f} className="text-[10px] px-3 py-1 rounded-full bg-white/[0.03] text-white/60 border border-white/5 hover:border-white/20 transition-colors uppercase tracking-wider">
                            {f}
                        </span>
                        ))}
                    </div>
                </GlassCard>
            </div>
            ))}
        </div>
      </div>
    </div>
  );

  const renderInsights = () => (
    <div className="space-y-12 animate-in fade-in zoom-in-95 duration-1000 mt-12 min-h-[60vh] flex flex-col justify-center">
      <div className="text-center space-y-6">
         <div className="inline-flex p-6 rounded-full bg-gradient-to-br from-white/5 to-transparent border border-white/10 mb-4 animate-float shadow-[0_0_30px_rgba(255,255,255,0.1)]">
             <Eye className="text-fuchsia-300" size={48} strokeWidth={0.5} />
         </div>
         <h2 className="text-5xl md:text-7xl font-serif italic text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">Pattern Recognition</h2>
         <p className="text-white/50 text-xl font-light max-w-sm mx-auto leading-relaxed font-serif italic">
           "Who are you?" said the Caterpillar.
         </p>
      </div>

      {!insight ? (
        <div className="flex flex-col items-center justify-center py-8">
          <button 
            onClick={generateInsights}
            disabled={isAnalyzing}
            className="group relative px-12 md:px-20 py-8 md:py-10 bg-transparent overflow-hidden rounded-full transition-all active:scale-95"
          >
            <div className="absolute inset-0 border border-white/20 rounded-full md:group-hover:border-fuchsia-400/50 transition-colors duration-500" />
            <div className="absolute inset-0 bg-white/5 blur-2xl md:group-hover:bg-fuchsia-500/10 transition-colors duration-500" />
            <span className="relative z-10 font-serif italic text-2xl md:text-3xl text-white md:group-hover:text-fuchsia-200 transition-colors flex items-center gap-3">
                {isAnalyzing ? <span className="animate-pulse">Consulting...</span> : <>Ask the Oracle <Sparkles size={24} /></>}
            </span>
          </button>
        </div>
      ) : (
        <div className="space-y-8 max-w-md mx-auto w-full animate-in slide-in-from-bottom-10 fade-in duration-1000 pb-20">
          <GlassCard iridescent className="p-8 border-t border-fuchsia-500/50 bg-gradient-to-b from-fuchsia-900/20 to-transparent">
            <h3 className="text-fuchsia-300 text-xs uppercase tracking-[0.3em] mb-6 flex items-center gap-2"><Sparkles size={12}/> The Reflection</h3>
            <p className="text-white/90 text-2xl font-serif italic leading-relaxed">{insight.summary}</p>
          </GlassCard>

          <div className="grid grid-cols-1 gap-6">
            <GlassCard className="p-8 border-l border-teal-500/50">
              <h3 className="text-teal-300 text-[10px] uppercase tracking-[0.3em] mb-3">Path Forward</h3>
              <p className="text-white/70 font-serif italic text-lg">{insight.suggestion}</p>
            </GlassCard>

            <GlassCard className="p-8 border-l border-amber-500/50">
              <h3 className="text-amber-300 text-[10px] uppercase tracking-[0.3em] mb-3">Warning</h3>
              <p className="text-white/70 font-serif italic text-lg">{insight.caution}</p>
            </GlassCard>
          </div>
          
          <button 
            onClick={() => setInsight(null)}
            className="w-full py-6 text-white/30 active:text-white text-[10px] uppercase tracking-[0.4em] transition-colors active:scale-95 transform duration-300"
          >
            Clear Vision
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-dvh selection:bg-fuchsia-500/30 font-sans cursor-default pb-[env(safe-area-inset-bottom)]">
      
      {/* Deep Space / Wonderland Atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1] touch-none">
        {/* Large slow moving orbs with deeper colors */}
        <div className="absolute top-[-20%] left-[-20%] w-[90vw] h-[90vw] bg-[#1a0b2e] rounded-full blur-[80px] md:blur-[150px] mix-blend-screen animate-pulse will-change-transform" style={{animationDuration: '20s'}} />
        <div className="absolute bottom-[-10%] right-[-30%] w-[80vw] h-[80vw] bg-[#0f172a] rounded-full blur-[80px] md:blur-[150px] mix-blend-screen animate-pulse will-change-transform" style={{animationDuration: '25s'}} />
        <div className="absolute top-[40%] left-[20%] w-[40vw] h-[40vw] bg-fuchsia-900/10 rounded-full blur-[60px] md:blur-[120px] mix-blend-screen animate-pulse will-change-transform" style={{animationDuration: '15s'}} />
        
        {/* Floating dust/stars */}
        <div className="absolute top-[20%] right-[10%] w-1 h-1 bg-white/40 rounded-full blur-[1px] animate-float" style={{animationDelay: '1s'}} />
        <div className="absolute bottom-[30%] left-[10%] w-2 h-2 bg-white/20 rounded-full blur-[2px] animate-float" style={{animationDelay: '3s'}} />
        <div className="absolute top-[50%] left-[50%] w-1.5 h-1.5 bg-white/30 rounded-full blur-[1px] animate-float" style={{animationDelay: '0s'}} />
      </div>
      
      {/* Fog of War - Bottom fade */}
      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#05020c] to-transparent z-30 pointer-events-none" />

      {/* Main Container */}
      <main className="relative z-10 max-w-xl mx-auto px-4 md:px-6 py-4 md:py-6 pb-28 md:pb-32 pt-[max(1rem,env(safe-area-inset-top))]">
        
        {/* Header - Minimal & Floating */}
        <header className="flex justify-between items-center py-4 mb-4">
          <div className="flex items-center gap-4">
             {/* Logo Mark - Spinning Rune */}
             <div 
                className="w-10 h-10 relative flex items-center justify-center group cursor-pointer"
                onClick={() => setView('DASHBOARD')}
             >
                 <div className="absolute inset-0 border border-white/20 rounded-full md:group-hover:rotate-180 transition-transform duration-[2s] ease-in-out"></div>
                 <div className="absolute inset-2 border border-white/40 rounded-full md:group-hover:-rotate-180 transition-transform duration-[2s] ease-in-out"></div>
                 <span className="font-serif italic font-bold text-xl text-white relative z-10 md:group-hover:scale-110 transition-transform">R</span>
             </div>
          </div>
          
          <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center active:bg-white/20 transition-colors cursor-pointer group shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full shadow-[0_0_10px_#4ade80] animate-pulse" />
              </div>
          </div>
        </header>

        {view === 'DASHBOARD' && renderDashboard()}
        {view === 'JOURNAL' && renderJournal()}
        {view === 'INSIGHTS' && renderInsights()}
      </main>

      {/* Floating Dock Navigation - Glass Artifact */}
      <nav className="fixed bottom-6 md:bottom-10 left-0 w-full z-40 px-6 flex justify-center pointer-events-none mb-[env(safe-area-inset-bottom)]">
        <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-full px-8 md:px-10 py-3 md:py-4 flex items-center shadow-[0_20px_50px_rgba(0,0,0,0.8)] pointer-events-auto gap-8 md:gap-10 active:border-white/20 transition-colors duration-500">
            
            <button 
              onClick={() => setView('DASHBOARD')}
              className={`flex flex-col items-center gap-1 transition-all duration-300 p-2 ${view === 'DASHBOARD' ? 'text-white scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'text-white/40 active:text-white'}`}
            >
              <Map size={24} strokeWidth={1.5} />
            </button>

            {/* The Main Action - "Drink Me" Button */}
            <button 
              onClick={() => setShowLogger(true)}
              className="w-16 h-16 md:w-20 md:h-20 -mt-16 md:-mt-20 bg-gradient-to-t from-[#05020c] to-fuchsia-900 rounded-full flex items-center justify-center text-white shadow-[0_0_40px_rgba(192,38,211,0.4)] active:shadow-[0_0_60px_rgba(192,38,211,0.6)] active:scale-95 transition-all duration-300 border border-white/20 group relative overflow-hidden animate-breathe"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent translate-y-full md:group-hover:translate-y-[-100%] transition-transform duration-1000" />
              <Plus size={32} md:size={36} className="md:group-hover:rotate-180 transition-transform duration-700" strokeWidth={1} />
            </button>

            <button 
              onClick={() => setView('JOURNAL')}
              className={`flex flex-col items-center gap-1 transition-all duration-300 p-2 ${view === 'JOURNAL' ? 'text-white scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'text-white/40 active:text-white'}`}
            >
              <BookOpen size={24} strokeWidth={1.5} />
            </button>

        </div>
      </nav>

      {/* Modal Overlay */}
      {showLogger && (
        <SessionLogger 
          onSave={handleSaveSession} 
          onCancel={() => setShowLogger(false)} 
        />
      )}

    </div>
  );
};

export default App;