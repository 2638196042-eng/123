import React, { useState, useEffect } from 'react';
import { Task, Subject } from '../types';
import { Play, Pause, X, Check, Star } from 'lucide-react';

interface Props {
  task: Task;
  subject: Subject;
  onExit: (timeAdded: number) => void;
  onComplete: (timeAdded: number) => void;
}

export default function FocusTimer({ task, subject, onExit, onComplete }: Props) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => setSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-[#FFF0F5] z-50 flex flex-col items-center justify-center p-6 animate-in slide-in-from-bottom-full duration-500 font-sans text-[#5D4037]">
      {/* Floating cute elements */}
      <div className="absolute top-12 left-12 text-5xl animate-bounce" style={{ animationDuration: '3s' }}>☁️</div>
      <div className="absolute top-24 right-12 text-4xl animate-pulse">✨</div>
      <div className="absolute bottom-24 left-16 text-5xl animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>🌸</div>
      <div className="absolute bottom-32 right-20 text-4xl animate-pulse" style={{ animationDelay: '0.5s' }}>🎀</div>
      
      <div className="bg-white border-4 border-[#FFE4E1] shadow-[0_12px_0_#FFE4E1] rounded-[3rem] p-8 w-full max-w-md flex flex-col items-center relative z-10">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center text-5xl mb-6 border-4 border-white shadow-md ${subject.color}`}>
          {subject.icon}
        </div>
        
        <h2 className="text-3xl font-black mb-3 text-center text-[#5D4037]">{task.name}</h2>
        
        <div className="bg-[#FFF8E7] px-4 py-1.5 rounded-full border-2 border-[#FFE4B5] text-[#8D6E63] font-bold mb-10 flex items-center gap-1.5 shadow-sm">
          {subject.name} <Star size={16} className="text-yellow-400" fill="currentColor" /> +{task.points}
        </div>

        <div className="text-7xl font-black text-[#FF9EBB] tracking-widest mb-12 drop-shadow-sm font-mono">
          {formatTime(seconds)}
        </div>

        <div className="flex items-center gap-8">
          <button 
            onClick={() => setIsRunning(!isRunning)}
            className="w-16 h-16 rounded-full bg-[#FFF0F5] text-[#FF9EBB] flex items-center justify-center border-4 border-[#FFE4E1] shadow-[0_4px_0_#FFE4E1] hover:translate-y-1 hover:shadow-[0_2px_0_#FFE4E1] active:translate-y-2 active:shadow-none transition-all"
          >
            {isRunning ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
          </button>
          
          <button 
            onClick={() => onComplete(seconds)}
            className="w-24 h-24 rounded-full bg-[#A7F3D0] text-[#059669] flex items-center justify-center border-4 border-[#6EE7B7] shadow-[0_8px_0_#34D399] hover:translate-y-2 hover:shadow-[0_4px_0_#34D399] active:translate-y-4 active:shadow-none transition-all"
          >
            <Check size={48} strokeWidth={4} />
          </button>

          <button 
            onClick={() => onExit(seconds)}
            className="w-16 h-16 rounded-full bg-[#F3F4F6] text-[#9CA3AF] flex items-center justify-center border-4 border-[#E5E7EB] shadow-[0_4px_0_#D1D5DB] hover:translate-y-1 hover:shadow-[0_2px_0_#D1D5DB] active:translate-y-2 active:shadow-none transition-all"
          >
            <X size={28} strokeWidth={4} />
          </button>
        </div>
        
        <div className="mt-10 text-base text-[#8D6E63] font-bold bg-[#FFF0F5] px-6 py-2 rounded-full border-2 border-[#FFE4E1]">
          加油！专注的小可爱最棒啦 🧸
        </div>
      </div>
    </div>
  );
}
