import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis } from 'recharts';
import { EffectRating } from '../types';

interface EffectRadarProps {
  effects: EffectRating;
  color?: string;
}

export const EffectRadar: React.FC<EffectRadarProps> = ({ effects, color = "#2dd4bf" }) => {
  const data = [
    { subject: 'Focus', A: effects.focus, fullMark: 10 },
    { subject: 'Relax', A: effects.relaxation, fullMark: 10 },
    { subject: 'Euphoria', A: effects.euphoria, fullMark: 10 },
    { subject: 'Creativity', A: effects.creativity, fullMark: 10 },
    { subject: 'Sleepy', A: effects.sleepiness, fullMark: 10 },
  ];

  return (
    <div className="h-[240px] w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="65%" data={data}>
          <PolarGrid stroke="rgba(255,255,255,0.1)" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11, fontFamily: 'Playfair Display', fontStyle: 'italic' }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
          <Radar
            name="Effects"
            dataKey="A"
            stroke={color}
            strokeWidth={2}
            fill={color}
            fillOpacity={0.2}
          />
        </RadarChart>
      </ResponsiveContainer>
      {/* Glow effect behind the chart */}
      <div className="absolute inset-0 bg-teal-500/10 blur-3xl rounded-full -z-10" />
    </div>
  );
};