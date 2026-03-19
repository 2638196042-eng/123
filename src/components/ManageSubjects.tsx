import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Subject } from '../types';

const SUBJECT_COLORS = [
  'bg-[#FFE4E1] text-[#FF6B81] border-[#FFB6C1]',
  'bg-[#E0F2FE] text-[#0284C7] border-[#BAE6FD]',
  'bg-[#DCFCE7] text-[#16A34A] border-[#BBF7D0]',
  'bg-[#FFEDD5] text-[#EA580C] border-[#FED7AA]',
  'bg-[#F3E8FF] text-[#9333EA] border-[#E9D5FF]',
  'bg-[#CCFBF1] text-[#0D9488] border-[#99F6E4]',
  'bg-[#FEF9C3] text-[#CA8A04] border-[#FEF08A]',
  'bg-[#E0E7FF] text-[#4F46E5] border-[#C7D2FE]',
];

const SUBJECT_ICONS = ['📖', '🔢', '🌍', '🎨', '🎵', '🏃', '💻', '🔬', '📝', '🧠', '🧸', '🌸'];

interface Props {
  subjects: Subject[];
  onAddSubject: (subject: Omit<Subject, 'id'>) => void;
  onDeleteSubject: (id: string) => void;
}

export default function ManageSubjects({ subjects, onAddSubject, onDeleteSubject }: Props) {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState(SUBJECT_ICONS[0]);
  const [color, setColor] = useState(SUBJECT_COLORS[0]);

  const handleAdd = () => {
    if (!name.trim()) return;
    onAddSubject({ name, icon, color });
    setName('');
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-[2.5rem] p-6 shadow-[0_8px_0_#FFE4E1] border-4 border-[#FFE4E1]">
        <h3 className="font-black text-[#5D4037] mb-6 flex items-center gap-2 text-xl">
          <span className="text-2xl">📚</span> 我的科目
        </h3>
        <div className="space-y-4">
          {subjects.map(subject => (
            <div key={subject.id} className="flex items-center justify-between bg-[#FFF0F5] p-4 rounded-3xl border-4 border-[#FFE4E1] hover:-translate-y-1 transition-transform">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl border-2 shadow-sm ${subject.color}`}>
                  {subject.icon}
                </div>
                <span className="font-black text-[#5D4037] text-lg">{subject.name}</span>
              </div>
              <button onClick={() => onDeleteSubject(subject.id)} className="w-12 h-12 rounded-full bg-white text-[#D1D5DB] flex items-center justify-center border-2 border-[#E5E7EB] shadow-[0_4px_0_#E5E7EB] hover:translate-y-1 hover:shadow-none hover:text-[#EF4444] hover:border-[#FCA5A5] transition-all">
                <Trash2 size={20} strokeWidth={2.5} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-6 shadow-[0_8px_0_#FFE4E1] border-4 border-[#FFE4E1]">
        <h3 className="font-black text-[#5D4037] mb-6 flex items-center gap-2 text-xl">
          <span className="text-2xl">➕</span> 添加新科目
        </h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-black text-[#8D6E63] mb-3">科目名称 ✏️</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="例如：体育、编程..."
              className="w-full bg-[#FFF0F5] border-4 border-[#FFE4E1] rounded-2xl px-5 py-4 text-base font-bold text-[#5D4037] placeholder-[#FFB6C1] focus:outline-none focus:border-[#FF9EBB] transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-black text-[#8D6E63] mb-3">选择图标 🎨</label>
            <div className="flex flex-wrap gap-3">
              {SUBJECT_ICONS.map(i => (
                <button
                  key={i}
                  onClick={() => setIcon(i)}
                  className={`w-14 h-14 rounded-full text-2xl flex items-center justify-center transition-all border-4 ${icon === i ? 'bg-[#FFF0F5] border-[#FF9EBB] shadow-[0_4px_0_#FF9EBB] -translate-y-1' : 'bg-white border-[#F3F4F6] hover:bg-[#F9FAFB]'}`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-black text-[#8D6E63] mb-3">选择颜色 🌈</label>
            <div className="flex flex-wrap gap-4">
              {SUBJECT_COLORS.map(c => {
                const bgColorClass = c.split(' ')[0];
                const borderColorClass = c.split(' ')[2];
                return (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-12 h-12 rounded-full ${bgColorClass} border-4 ${borderColorClass} transition-all ${color === c ? 'shadow-[0_4px_0_rgba(0,0,0,0.2)] -translate-y-1 scale-110' : 'hover:scale-110'}`}
                  />
                );
              })}
            </div>
          </div>

          <div className="pt-6 border-t-4 border-dashed border-[#FFE4E1]">
            <div className="flex items-center gap-4 p-5 border-4 border-dashed border-[#FFE4E1] rounded-3xl mb-6 bg-[#FFF0F5]">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl border-2 shadow-sm ${color}`}>
                {icon}
              </div>
              <span className="font-black text-[#8D6E63] text-lg">{name || '科目名称预览'}</span>
            </div>
            <button
              onClick={handleAdd}
              disabled={!name.trim()}
              className="w-full bg-[#FFB6C1] text-white rounded-2xl py-4 text-lg font-black disabled:opacity-50 border-4 border-[#FF9EBB] shadow-[0_6px_0_#FF9EBB] hover:translate-y-1 hover:shadow-[0_2px_0_#FF9EBB] active:translate-y-2 active:shadow-none transition-all"
            >
              确定添加 ✨
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
