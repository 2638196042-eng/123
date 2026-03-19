import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Calendar as CalendarIcon } from 'lucide-react';
import { Subject, Task } from '../types';
import { getLocalDateString } from '../utils';

interface Props {
  tasks: Task[];
  subjects: Subject[];
}

export default function LearningCalendar({ tasks, subjects }: Props) {
  const [currentDate, setCurrentDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  
  const [selectedDate, setSelectedDate] = useState(() => getLocalDateString());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const getDayStatus = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayTasks = tasks.filter(t => t.date === dateStr);
    
    if (dayTasks.length === 0) return 'none';
    if (dayTasks.every(t => t.completed)) return 'all';
    if (dayTasks.some(t => t.completed)) return 'partial';
    return 'pending';
  };

  const selectedTasks = tasks.filter(t => t.date === selectedDate);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Calendar Card */}
      <div className="bg-white rounded-[2.5rem] p-6 shadow-[0_8px_0_#FFE4E1] border-4 border-[#FFE4E1]">
        <div className="flex items-center justify-between mb-8 bg-[#FFF0F5] p-2 rounded-full border-2 border-[#FFE4E1]">
          <button onClick={prevMonth} className="p-3 bg-white hover:bg-pink-50 rounded-full text-[#FF9EBB] transition-colors shadow-sm">
            <ChevronLeft size={24} strokeWidth={3} />
          </button>
          <h2 className="font-black text-xl text-[#5D4037]">
            {year}年 {month + 1}月 🌸
          </h2>
          <button onClick={nextMonth} className="p-3 bg-white hover:bg-pink-50 rounded-full text-[#FF9EBB] transition-colors shadow-sm">
            <ChevronRight size={24} strokeWidth={3} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-y-6 mb-6">
          {['日', '一', '二', '三', '四', '五', '六'].map(d => (
            <div key={d} className="text-center text-sm font-bold text-[#FF9EBB]">{d}</div>
          ))}
          
          {days.map((day, idx) => {
            if (day === null) return <div key={`empty-${idx}`} />;
            
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isSelected = dateStr === selectedDate;
            const status = getDayStatus(day);
            const isToday = dateStr === getLocalDateString();

            return (
              <div key={day} className="flex flex-col items-center justify-center">
                <button
                  onClick={() => setSelectedDate(dateStr)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-base font-bold transition-all relative
                    ${isSelected ? 'bg-[#FF9EBB] text-white shadow-[0_4px_0_#FF6B81] -translate-y-1' : 
                      isToday ? 'bg-[#FFF0F5] text-[#FF9EBB] border-2 border-[#FF9EBB]' : 'text-[#5D4037] hover:bg-[#FFF0F5]'}`}
                >
                  {day}
                  {status !== 'none' && (
                    <div className={`absolute -bottom-2 w-2.5 h-2.5 rounded-full border-2 border-white
                      ${status === 'all' ? 'bg-[#34D399]' : 
                        status === 'partial' ? 'bg-[#FBBF24]' : 'bg-[#D1D5DB]'}`} 
                    />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center gap-6 text-sm font-bold text-[#8D6E63] mt-8 pt-6 border-t-4 border-dashed border-[#FFF0F5]">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#34D399] border-2 border-white shadow-sm"></div> 全部完成</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#FBBF24] border-2 border-white shadow-sm"></div> 部分完成</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#D1D5DB] border-2 border-white shadow-sm"></div> 有任务</div>
        </div>
      </div>

      {/* Selected Day Record */}
      <div className="bg-white rounded-[2.5rem] p-6 shadow-[0_8px_0_#FFE4E1] border-4 border-[#FFE4E1]">
        <h3 className="font-black text-[#5D4037] mb-5 flex items-center gap-2 text-lg">
          <CalendarIcon size={24} className="text-[#FF9EBB]" strokeWidth={3} /> 
          {selectedDate} 的记录 📝
        </h3>
        
        {selectedTasks.length === 0 ? (
          <div className="text-center py-12 text-[#8D6E63] font-bold text-base bg-[#FFF0F5] rounded-3xl border-4 border-dashed border-[#FFE4E1]">
            这一天没有学习任务哦~ ☁️
          </div>
        ) : (
          <div className="space-y-4">
            {selectedTasks.map(task => {
              const subject = subjects.find(s => s.id === task.subjectId);
              if (!subject) return null;
              
              return (
                <div key={task.id} className="flex items-center justify-between bg-white p-4 rounded-3xl border-4 border-[#FFF0F5] shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 border-white shadow-sm ${subject.color}`}>
                      {subject.icon}
                    </div>
                    <div>
                      <div className="font-black text-[#5D4037] text-base">{task.name}</div>
                      <div className="text-sm font-bold text-[#FF9EBB] mt-0.5">
                        {subject.name} • +{task.points}⭐
                      </div>
                    </div>
                  </div>
                  {task.completed ? (
                    <div className="w-10 h-10 rounded-full bg-[#A7F3D0] text-[#059669] flex items-center justify-center border-2 border-[#6EE7B7] shadow-sm">
                      <Check size={20} strokeWidth={4} />
                    </div>
                  ) : (
                    <div className="text-sm font-bold text-[#9CA3AF] px-4 py-2 bg-[#F3F4F6] rounded-full border-2 border-[#E5E7EB]">未完成</div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
