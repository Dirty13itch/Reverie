import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
  iridescent?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  onClick, 
  hoverEffect = false,
  iridescent = false
}) => {
  return (
    <div 
      onClick={onClick}
      className={`
        relative overflow-hidden
        bg-gradient-to-br from-white/[0.08] to-white/[0.01] backdrop-blur-[20px] md:backdrop-blur-[40px]
        border border-white/10
        shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]
        rounded-[2rem]
        transition-all duration-500 ease-out
        transform-gpu
        group
        ${hoverEffect ? 'active:scale-[0.98] md:hover:scale-[1.02] active:shadow-[0_10px_30px_rgba(216,180,254,0.15)] md:hover:shadow-[0_20px_50px_rgba(216,180,254,0.15)] cursor-pointer' : ''}
        ${iridescent ? 'md:hover:border-transparent' : ''}
        ${className}
      `}
    >
      {/* Internal Noise Texture for "Crystal" feel */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none z-0" />

      {/* Iridescent Border Animation Layer - Much more colorful */}
      {iridescent && (
        <div className="absolute inset-[-2px] rounded-[2rem] opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0 bg-gradient-to-r from-transparent via-fuchsia-500/50 to-teal-500/50 blur-md animate-shimmer" />
      )}

      {/* Glossy Reflection Gradient - Stronger top highlight */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.15] via-transparent to-black/30 pointer-events-none z-10" />
      
      {/* Inner Bevel */}
      <div className="absolute inset-[1px] rounded-[31px] border border-white/[0.05] pointer-events-none z-20 mix-blend-overlay" />

      {/* Content */}
      <div className="relative z-20 h-full">
        {children}
      </div>
    </div>
  );
};