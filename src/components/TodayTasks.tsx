import React, { useState } from 'react';
import { Check, Trash2, Timer, Plus, Play, Star } from 'lucide-react';
import { Subject, Task } from '../types';
import { getLocalDateString } from '../utils';

interface Props {
  tasks: Task[];
  subjects: Subject[];
  onAddTask: (task: Omit<Task, 'id' | 'timeSpent' | 'completed'>) => void;
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onStartFocus: (id: string) => void;
  points: number;
}

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0 && s === 0) return '';
  return `${m}:${s.toString().padStart(2, '0')}`;
};

export default function TodayTasks({ tasks, subjects, onAddTask, onToggleComplete, onDeleteTask, onStartFocus, points }: Props) {
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0]?.id || '');

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);
  const totalTasks = tasks.length;
  const completedCount = completedTasks.length;

  const handleAdd = () => {
    if (!newTaskName.trim() || !selectedSubjectId) return;
    onAddTask({
      name: newTaskName,
      subjectId: selectedSubjectId,
      points: 10,
      date: getLocalDateString(),
    });
    setNewTaskName('');
    setIsAdding(false);
  };

  const renderTask = (task: Task) => {
    const subject = subjects.find(s => s.id === task.subjectId);
    if (!subject) return null;

    return (
      <div key={task.id} className={`flex items-center justify-between p-4 rounded-[2rem] mb-4 transition-all duration-300 border-4 ${task.completed ? 'bg-[#F9FAFB] border-[#F3F4F6] opacity-70' : 'bg-white border-[#FFE4E1] shadow-[0_6px_0_#FFE4E1] hover:-translate-y-1 hover:shadow-[0_8px_0_#FFE4E1]'}`}>
        <div className="flex items-center gap-4 flex-1">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl border-2 border-white shadow-sm ${subject.color}`}>
            {subject.icon}
          </div>
          <div>
            <div className={`font-black text-lg ${task.completed ? 'line-through text-[#9CA3AF]' : 'text-[#5D4037]'}`}>{task.name}</div>
            <div className="text-sm font-bold text-[#FF9EBB] flex items-center gap-1.5 mt-1">
              {subject.name} • <span className="text-[#FBBF24]">+{task.points}</span><Star size={14} fill="currentColor" className="text-[#FBBF24] -ml-0.5" />
              {task.timeSpent > 0 && (
                <span className="ml-2 text-[#8B5CF6] flex items-center gap-1 bg-[#EDE9FE] px-2.5 py-0.5 rounded-full border border-[#DDD6FE]">
                  <Timer size={14} strokeWidth={3} /> {formatTime(task.timeSpent)}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {!task.completed && (
            <button 
              onClick={() => onStartFocus(task.id)}
              className="w-12 h-12 rounded-full bg-[#FFF0F5] text-[#FF9EBB] flex items-center justify-center border-2 border-[#FFE4E1] shadow-[0_4px_0_#FFE4E1] hover:translate-y-1 hover:shadow-none active:bg-[#FFE4E1] transition-all"
            >
              <Play size={22} fill="currentColor" className="ml-1" />
            </button>
          )}
          <button 
            onClick={() => onToggleComplete(task.id)}
            className={`w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-[0_4px_0_rgba(0,0,0,0.1)] hover:translate-y-1 hover:shadow-none transition-all ${task.completed ? 'bg-[#A7F3D0] text-[#059669] border-[#6EE7B7] shadow-[0_4px_0_#6EE7B7]' : 'bg-white text-[#D1D5DB] border-[#E5E7EB] shadow-[0_4px_0_#E5E7EB] hover:text-[#34D399] hover:border-[#34D399]'}`}
          >
            <Check size={24} strokeWidth={4} />
          </button>
          <button 
            onClick={() => onDeleteTask(task.id)}
            className="w-12 h-12 rounded-full bg-white text-[#D1D5DB] flex items-center justify-center border-2 border-[#E5E7EB] shadow-[0_4px_0_#E5E7EB] hover:translate-y-1 hover:shadow-none hover:text-[#EF4444] hover:border-[#FCA5A5] transition-all"
          >
            <Trash2 size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Level Card - Chiikawa Style */}
      <div className="bg-[#FFB6C1] rounded-[2.5rem] p-6 text-white shadow-[0_8px_0_#FF9EBB] border-4 border-[#FF9EBB] relative overflow-hidden">
        <div className="absolute top-0 right-0 text-6xl opacity-20 -mr-2 -mt-2 rotate-12">✨</div>
        <div className="absolute bottom-0 left-0 text-6xl opacity-20 -ml-2 -mb-2 -rotate-12">🌸</div>
        <div className="flex justify-between items-center relative z-10">
          <div>
            <div className="text-sm font-bold opacity-90 mb-1 flex items-center gap-1">
              当前称号 🎀
            </div>
            <div className="text-3xl font-black tracking-tight flex items-center gap-2 mb-3 text-white drop-shadow-md">
              学习小能手
            </div>
            <div className="text-xs font-bold bg-white/30 inline-block px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/40 shadow-sm">
              再得 190 分升级 ➔
            </div>
          </div>
          <div className="text-right bg-white/20 p-4 rounded-3xl border border-white/30 backdrop-blur-sm shadow-sm">
            <div className="text-sm font-bold opacity-90 mb-1">总积分</div>
            <div className="text-4xl font-black flex items-center justify-end gap-1 drop-shadow-md">
              <Star fill="currentColor" className="text-[#FFE066]" size={32} /> {points}
            </div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-[2.5rem] p-6 shadow-[0_8px_0_#FFE4E1] border-4 border-[#FFE4E1]">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h3 className="font-black text-[#5D4037] text-xl flex items-center gap-2">今日进度 🚀</h3>
            <p className="text-sm font-bold text-[#FF9EBB] mt-1">{new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' })}</p>
          </div>
          <div className="text-base font-black text-[#FF9EBB] bg-[#FFF0F5] px-4 py-2 rounded-full border-2 border-[#FFE4E1]">
            <span className="text-2xl">{completedCount}</span>/{totalTasks} <span className="text-xs">完成</span>
          </div>
        </div>
        <div className="h-5 bg-[#FFF0F5] rounded-full overflow-hidden border-2 border-[#FFE4E1] p-0.5">
          <div 
            className="h-full bg-gradient-to-r from-[#FF9EBB] to-[#FFB6C1] transition-all duration-1000 ease-out rounded-full relative overflow-hidden" 
            style={{ width: totalTasks === 0 ? '0%' : `${(completedCount / totalTasks) * 100}%` }}
          >
            <div className="absolute inset-0 bg-white/20 w-full h-full" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.3) 10px, rgba(255,255,255,0.3) 20px)' }}></div>
          </div>
        </div>
      </div>

      {/* Pending Tasks */}
      <div>
        <div className="flex items-center gap-2 mb-5 px-2">
          <div className="w-2 h-6 bg-[#FF9EBB] rounded-full"></div>
          <h3 className="font-black text-[#5D4037] text-xl">待完成 ({pendingTasks.length})</h3>
        </div>
        
        {pendingTasks.map(renderTask)}

        {isAdding ? (
          <div className="bg-white p-6 rounded-[2.5rem] shadow-[0_8px_0_#FFE4E1] border-4 border-[#FFE4E1] mt-6 animate-in zoom-in-95 duration-200">
            <div className="mb-5">
              <label className="block text-sm font-black text-[#8D6E63] mb-3">选择科目 📚</label>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide px-1">
                {subjects.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSubjectId(s.id)}
                    className={`flex-shrink-0 px-5 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 transition-all border-2 ${selectedSubjectId === s.id ? s.color + ' border-current shadow-[0_4px_0_currentColor] -translate-y-1' : 'bg-[#F3F4F6] text-[#9CA3AF] border-[#E5E7EB] hover:bg-[#E5E7EB]'}`}
                  >
                    <span className="text-xl">{s.icon}</span> {s.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-black text-[#8D6E63] mb-3">任务名称 ✏️</label>
              <input
                autoFocus
                type="text"
                value={newTaskName}
                onChange={e => setNewTaskName(e.target.value)}
                placeholder="例如：背课文、口算练习..."
                className="w-full bg-[#FFF0F5] border-4 border-[#FFE4E1] rounded-2xl px-5 py-4 text-base font-bold text-[#5D4037] placeholder-[#FFB6C1] focus:outline-none focus:border-[#FF9EBB] transition-all"
              />
            </div>
            <div className="flex gap-4">
              <button 
                onClick={handleAdd}
                disabled={!newTaskName.trim()}
                className="flex-1 bg-[#FFB6C1] text-white rounded-2xl py-4 text-lg font-black disabled:opacity-50 border-4 border-[#FF9EBB] shadow-[0_6px_0_#FF9EBB] hover:translate-y-1 hover:shadow-[0_2px_0_#FF9EBB] active:translate-y-2 active:shadow-none transition-all"
              >
                确定添加 ✨
              </button>
              <button 
                onClick={() => setIsAdding(false)}
                className="px-8 bg-white text-[#9CA3AF] rounded-2xl py-4 text-lg font-black border-4 border-[#E5E7EB] shadow-[0_6px_0_#E5E7EB] hover:translate-y-1 hover:shadow-[0_2px_0_#E5E7EB] active:translate-y-2 active:shadow-none transition-all"
              >
                取消
              </button>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => setIsAdding(true)}
            className="w-full py-5 border-4 border-dashed border-[#FFB6C1] bg-[#FFF0F5] text-[#FF9EBB] rounded-[2.5rem] font-black text-lg flex items-center justify-center gap-2 hover:bg-[#FFE4E1] hover:scale-[1.02] active:scale-95 transition-all mt-6 shadow-sm"
          >
            <Plus size={24} strokeWidth={3} /> 添加新任务 🧸
          </button>
        )}
      </div>

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="pt-8 mt-8 border-t-4 border-dashed border-[#FFE4E1]">
          <div className="flex items-center gap-2 mb-5 px-2 opacity-80">
            <div className="w-2 h-6 bg-[#34D399] rounded-full"></div>
            <h3 className="font-black text-[#5D4037] text-xl">已完成 ({completedTasks.length}) 🎉</h3>
          </div>
          {completedTasks.map(renderTask)}
        </div>
      )}
    </div>
  );
}
