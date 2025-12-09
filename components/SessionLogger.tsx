import React, { useState } from 'react';
import { StrainType, ConsumptionMethod, Session, EffectRating } from '../types';
import { GlassCard } from './GlassCard';
import { FLAVOR_TAGS } from '../constants';
import { ChevronRight, ChevronLeft, Save, X, Feather, Beaker, Wind, Cookie, Droplet, Flame, Sparkles } from 'lucide-react';

interface SessionLoggerProps {
  onSave: (session: Session) => void;
  onCancel: () => void;
}

export const SessionLogger: React.FC<SessionLoggerProps> = ({ onSave, onCancel }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Session>>({
    effects: { focus: 5, relaxation: 5, euphoria: 5, creativity: 5, sleepiness: 5 },
    flavors: [],
    rating: 3,
    method: ConsumptionMethod.FLOWER
  });

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSave = () => {
    if (!formData.productName) return; 
    const newSession: Session = {
      ...formData as Session,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };
    onSave(newSession);
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateEffect = (key: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      effects: { ...prev.effects!, [key]: value }
    }));
  };

  const toggleFlavor = (flavor: string) => {
    const current = formData.flavors || [];
    if (current.includes(flavor)) {
      updateField('flavors', current.filter(f => f !== flavor));
    } else {
      updateField('flavors', [...current, flavor]);
    }
  };

  const getMethodIcon = (method: string) => {
      switch(method) {
          case ConsumptionMethod.FLOWER: return <Flame size={20} />;
          case ConsumptionMethod.VAPE: return <Wind size={20} />;
          case ConsumptionMethod.EDIBLE: return <Cookie size={20} />;
          case ConsumptionMethod.TINCTURE: return <Droplet size={20} />;
          default: return <Beaker size={20} />;
      }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#020108]/95 backdrop-blur-3xl transition-opacity duration-700 h-[100dvh]">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
      
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-fuchsia-600/20 rounded-full blur-[120px] animate-float pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-teal-600/10 rounded-full blur-[120px] animate-float-reverse pointer-events-none" />

      {/* Navigation Top - Added Safe Area PT */}
      <div className="p-6 pt-[max(1.5rem,env(safe-area-inset-top))] flex justify-between items-center relative z-20">
        <button onClick={onCancel} className="text-white/30 active:text-white transition-colors flex items-center gap-2 text-xs uppercase tracking-widest p-2 -ml-2">
          <X size={16} /> Sever Link
        </button>
        <div className="flex gap-3">
            {[1, 2, 3].map(i => (
                <div key={i} className={`h-1.5 w-8 rounded-full transition-all duration-700 ${step >= i ? 'bg-gradient-to-r from-fuchsia-500 to-purple-600 shadow-[0_0_15px_#d946ef]' : 'bg-white/10'}`} />
            ))}
        </div>
      </div>

      {/* Content Container - Full Height on Mobile */}
      <div className="flex-1 w-full max-w-lg mx-auto flex flex-col relative z-10 overflow-hidden pb-[env(safe-area-inset-bottom)]">
        
        <GlassCard className="flex-1 mx-4 mb-4 flex flex-col !rounded-[2.5rem] !border-white/10 !bg-black/30 overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)]">
            
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-8 scrollbar-hide">
                
                {step === 1 && (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20">
                        <div className="text-center space-y-2 mt-2">
                            <span className="text-fuchsia-400 text-[10px] font-mono uppercase tracking-[0.4em] glow-text">Phase I</span>
                            <h2 className="text-5xl font-serif italic text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] animate-glitch">The Vessel</h2>
                            <p className="text-white/40 text-sm font-light italic">"Eat Me", "Drink Me"... what is the label?</p>
                        </div>

                        <div className="space-y-10">
                            <div className="group relative">
                                <input 
                                    type="text" 
                                    className="w-full bg-transparent border-b border-white/20 py-4 text-3xl md:text-4xl font-serif text-white placeholder-white/10 focus:outline-none focus:border-fuchsia-500 transition-all text-center rounded-none"
                                    placeholder="Name the Curio..."
                                    value={formData.productName || ''}
                                    onChange={e => updateField('productName', e.target.value)}
                                    autoFocus
                                    style={{ fontSize: '16px' }} /* Prevent iOS zoom, overridden by class for larger text visual */
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] uppercase tracking-[0.2em] text-white/30 text-center block">Origin</label>
                                <div className="flex justify-center flex-wrap gap-2 md:gap-3">
                                {Object.values(StrainType).map(type => (
                                    <button
                                    key={type}
                                    onClick={() => updateField('strainType', type)}
                                    className={`py-3 px-5 rounded-full text-sm font-serif italic transition-all border active:scale-95 ${
                                        formData.strainType === type 
                                        ? 'bg-white text-black border-white shadow-[0_0_20px_white] scale-105' 
                                        : 'bg-transparent border-white/10 text-white/50'
                                    }`}
                                    >
                                    {type}
                                    </button>
                                ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] uppercase tracking-[0.2em] text-white/30 text-center block">Method</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {Object.values(ConsumptionMethod).map(m => (
                                        <button 
                                            key={m}
                                            onClick={() => updateField('method', m)}
                                            className={`flex flex-col items-center justify-center gap-2 p-3 min-h-[80px] rounded-2xl border transition-all duration-300 active:scale-95 ${
                                                formData.method === m 
                                                ? 'bg-white/[0.1] border-fuchsia-400 text-white shadow-[0_0_20px_rgba(192,38,211,0.2)]'
                                                : 'bg-transparent border-white/5 text-white/30'
                                            }`}
                                        >
                                            {getMethodIcon(m)}
                                            <span className="text-[10px] uppercase tracking-wider">{m}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                             <div className="space-y-2 pt-2 relative">
                                <label className="text-[10px] uppercase tracking-[0.2em] text-white/30 text-center block">Potency</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-transparent py-2 text-xl text-center font-serif italic text-fuchsia-200 placeholder-white/10 focus:outline-none transition-colors rounded-none"
                                    placeholder="One drop? A slice?"
                                    value={formData.dosage || ''}
                                    onChange={e => updateField('dosage', e.target.value)}
                                    style={{ fontSize: '16px' }}
                                />
                                <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-20 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20">
                         <div className="text-center space-y-2 mt-2">
                            <span className="text-teal-400 text-[10px] font-mono uppercase tracking-[0.4em] glow-text">Phase II</span>
                            <h2 className="text-5xl font-serif italic text-white drop-shadow-[0_0_10px_rgba(45,212,191,0.3)] animate-glitch">The Flux</h2>
                            <p className="text-white/40 text-sm font-light italic">How does the world bend?</p>
                        </div>
                        
                        <div className="space-y-10 px-1">
                            {Object.keys(formData.effects!).map((effect) => (
                                <div key={effect} className="space-y-4 group">
                                <div className="flex justify-between items-end">
                                    <span className="text-2xl font-serif italic text-white/90 capitalize tracking-wide drop-shadow-md">{effect}</span>
                                    <span className="text-xs text-teal-300 font-mono border border-teal-500/30 px-2 py-0.5 rounded-full bg-teal-900/40 backdrop-blur-md">{formData.effects![effect as keyof EffectRating]}</span>
                                </div>
                                <div className="relative h-12 flex items-center active:scale-[1.02] transition-transform duration-200 touch-pan-x">
                                    <input 
                                        type="range" 
                                        min="1" max="10" 
                                        value={formData.effects![effect as keyof EffectRating]}
                                        onChange={(e) => updateEffect(effect, parseInt(e.target.value))}
                                        className="w-full z-20 opacity-0 cursor-pointer h-16 absolute -top-2 left-0" 
                                    />
                                    {/* Liquid Track Container - Added Filter */}
                                    <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden relative backdrop-blur-sm border border-white/5 liquid-filter transform-gpu">
                                        {/* Glowing Liquid Bar */}
                                        <div 
                                            className="h-full bg-gradient-to-r from-teal-500 via-purple-500 to-fuchsia-500 opacity-100 transition-all duration-300 relative will-change-transform" 
                                            style={{ width: `${formData.effects![effect as keyof EffectRating] * 10}%` }}
                                        >
                                             {/* Bubbles in liquid */}
                                             <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white/50 blur-sm rounded-full" />
                                        </div>
                                    </div>
                                    
                                    {/* The Orb Thumb */}
                                    <div 
                                        className="absolute h-6 w-6 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)] pointer-events-none transition-all duration-300 z-10 flex items-center justify-center mix-blend-screen"
                                        style={{ left: `calc(${formData.effects![effect as keyof EffectRating] * 10}% - 12px)` }}
                                    >
                                        <div className="w-2 h-2 bg-fuchsia-600 rounded-full" />
                                    </div>
                                </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20">
                         <div className="text-center space-y-2 mt-2">
                            <span className="text-amber-400 text-[10px] font-mono uppercase tracking-[0.4em] glow-text">Phase III</span>
                            <h2 className="text-5xl font-serif italic text-white drop-shadow-[0_0_10px_rgba(251,191,36,0.3)] animate-glitch">The Afterimage</h2>
                        </div>

                        <div className="space-y-6">
                            <label className="text-[10px] uppercase tracking-[0.2em] text-white/30 text-center block">Tea Leaves & Tastes</label>
                            <div className="flex flex-wrap justify-center gap-3">
                            {FLAVOR_TAGS.map((flavor, idx) => (
                                <button
                                key={flavor}
                                onClick={() => toggleFlavor(flavor)}
                                style={{ animationDelay: `${idx * 50}ms` }}
                                className={`px-4 py-2 rounded-full text-sm font-serif italic transition-all border animate-in zoom-in duration-500 active:scale-95 ${
                                    formData.flavors?.includes(flavor)
                                    ? 'bg-white text-black border-white shadow-[0_0_25px_rgba(255,255,255,0.5)] rotate-2 scale-110'
                                    : 'bg-transparent border-white/10 text-white/40'
                                }`}
                                >
                                {flavor}
                                </button>
                            ))}
                            </div>
                        </div>

                        <div className="space-y-2 pt-6">
                            <label className="text-[10px] uppercase tracking-[0.2em] text-white/30 text-center block">The Scribblings</label>
                            <textarea 
                            className="w-full h-40 bg-white/[0.03] border border-white/10 rounded-3xl p-6 text-white/90 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all resize-none leading-relaxed font-serif italic text-lg text-center placeholder-white/10"
                            placeholder="What did the caterpillar say?"
                            value={formData.notes || ''}
                            onChange={e => updateField('notes', e.target.value)}
                            style={{ fontSize: '16px' }}
                            />
                        </div>

                        <div className="space-y-6 pt-4">
                            <label className="text-[10px] uppercase tracking-[0.2em] text-white/30 text-center block">Resonance</label>
                            <div className="flex justify-center gap-4">
                            {[1, 2, 3, 4, 5].map(star => (
                                <button
                                key={star}
                                onClick={() => updateField('rating', star)}
                                className="group relative focus:outline-none transform active:scale-110 transition-all duration-200 p-2"
                                >
                                <Feather 
                                    size={32} 
                                    className={`transition-all duration-500 ${
                                    (formData.rating || 0) >= star
                                        ? 'text-fuchsia-400 fill-fuchsia-500/20 drop-shadow-[0_0_20px_rgba(232,121,249,0.9)]'
                                        : 'text-white/10'
                                    }`}
                                    strokeWidth={1.5}
                                />
                                </button>
                            ))}
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* Footer - Glass Card Bottom */}
            <div className="p-6 md:p-8 flex justify-between items-center border-t border-white/5 bg-black/20 backdrop-blur-xl shrink-0">
                {step > 1 ? (
                    <button 
                        onClick={handleBack}
                        className="flex items-center gap-2 text-white/40 active:text-white transition-colors text-[10px] uppercase tracking-[0.2em] p-2 -ml-2"
                    >
                        <ChevronLeft size={14} /> Retreat
                    </button>
                ) : <div className="w-20"></div>}

                {step < 3 ? (
                    <button 
                        onClick={handleNext}
                        disabled={!formData.productName}
                        className="flex items-center gap-3 px-6 py-3 bg-white text-black rounded-full font-serif italic text-lg active:bg-fuchsia-100 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-95"
                    >
                        Deeper <ChevronRight size={18} />
                    </button>
                ) : (
                    <button 
                        onClick={handleSave}
                        className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white rounded-full font-serif italic text-lg shadow-[0_0_40px_rgba(192,38,211,0.5)] active:scale-95 transition-all relative overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-2">Seal Memory <Sparkles size={18} /></span>
                        <div className="absolute inset-0 bg-white/20 blur-lg translate-y-full hover:translate-y-[-100%] transition-transform duration-1000" />
                    </button>
                )}
            </div>
        </GlassCard>
      </div>
    </div>
  );
};