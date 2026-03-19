import React, { useState } from 'react';
import { BookOpen, Calendar as CalendarIcon, Settings, Star } from 'lucide-react';
import TodayTasks from './components/TodayTasks';
import LearningCalendar from './components/LearningCalendar';
import ManageSubjects from './components/ManageSubjects';
import FocusTimer from './components/FocusTimer';
import { Subject, Task } from './types';
import { getLocalDateString } from './utils';

const INITIAL_SUBJECTS: Subject[] = [
  { id: '1', name: '语文', icon: '📖', color: 'bg-[#FFE4E1] text-[#FF6B81] border-[#FFB6C1]' },
  { id: '2', name: '数学', icon: '🔢', color: 'bg-[#E0F2FE] text-[#0284C7] border-[#BAE6FD]' },
  { id: '3', name: '英语', icon: '🌍', color: 'bg-[#DCFCE7] text-[#16A34A] border-[#BBF7D0]' },
  { id: '4', name: '美术', icon: '🎨', color: 'bg-[#FFEDD5] text-[#EA580C] border-[#FED7AA]' },
];

const todayStr = getLocalDateString();

const INITIAL_TASKS: Task[] = [
  { id: 't1', date: todayStr, subjectId: '1', name: '背课文', points: 10, completed: false, timeSpent: 0 },
  { id: 't2', date: todayStr, subjectId: '1', name: '词语听写', points: 10, completed: true, timeSpent: 120 },
  { id: 't3', date: todayStr, subjectId: '2', name: '口算练习', points: 10, completed: false, timeSpent: 0 },
  { id: 't4', date: todayStr, subjectId: '3', name: '单词背诵', points: 10, completed: false, timeSpent: 0 },
];

export default function App() {
  const [subjects, setSubjects] = useState<Subject[]>(INITIAL_SUBJECTS);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [activeTab, setActiveTab] = useState<'tasks' | 'calendar' | 'subjects'>('tasks');
  const [points, setPoints] = useState(310);
  const [focusedTaskId, setFocusedTaskId] = useState<string | null>(null);

  const handleAddSubject = (subjectData: Omit<Subject, 'id'>) => {
    const newSubject = { ...subjectData, id: Date.now().toString() };
    setSubjects([...subjects, newSubject]);
  };

  const handleDeleteSubject = (id: string) => {
    setSubjects(subjects.filter(s => s.id !== id));
  };

  const handleAddTask = (taskData: Omit<Task, 'id' | 'timeSpent' | 'completed'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      completed: false,
      timeSpent: 0,
    };
    setTasks([...tasks, newTask]);
  };

  const handleToggleComplete = (id: string) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const newlyCompleted = !t.completed;
        if (newlyCompleted) {
          setPoints(p => p + t.points);
        } else {
          setPoints(p => p - t.points);
        }
        return { ...t, completed: newlyCompleted, isRunning: false };
      }
      return t;
    }));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleStartFocus = (id: string) => {
    setFocusedTaskId(id);
  };

  const handleExitFocus = (timeAdded: number) => {
    if (focusedTaskId) {
      setTasks(tasks.map(t => t.id === focusedTaskId ? { ...t, timeSpent: t.timeSpent + timeAdded } : t));
    }
    setFocusedTaskId(null);
  };

  const handleCompleteFocus = (timeAdded: number) => {
    if (focusedTaskId) {
      setTasks(tasks.map(t => {
        if (t.id === focusedTaskId) {
          setPoints(p => p + t.points);
          return { ...t, timeSpent: t.timeSpent + timeAdded, completed: true };
        }
        return t;
      }));
    }
    setFocusedTaskId(null);
  };

  const todayTasks = tasks.filter(t => t.date === todayStr);
  const focusedTask = tasks.find(t => t.id === focusedTaskId);
  const focusedSubject = focusedTask ? subjects.find(s => s.id === focusedTask.subjectId) : null;

  return (
    <div className="min-h-screen bg-[#FFF0F5] text-[#5D4037] font-sans pb-24 selection:bg-[#FFB6C1] selection:text-white">
      {focusedTaskId && focusedTask && focusedSubject ? (
        <FocusTimer 
          task={focusedTask} 
          subject={focusedSubject} 
          onExit={handleExitFocus} 
          onComplete={handleCompleteFocus} 
        />
      ) : (
        <>
          {/* Header */}
          <div className="bg-white px-5 pt-14 pb-6 shadow-[0_4px_0_#FFE4E1] sticky top-0 z-20 border-b-4 border-[#FFE4E1] rounded-b-[2rem]">
            <div className="flex justify-between items-center mb-6 max-w-2xl mx-auto">
              <h1 className="text-2xl font-black flex items-center gap-2 text-[#FF9EBB] tracking-tight drop-shadow-sm">
                <span className="text-3xl">🌟</span> 每日学习机
              </h1>
              <div className="bg-[#FFF8E7] text-[#D97706] px-5 py-2 rounded-full text-lg font-black flex items-center gap-1.5 border-2 border-[#FDE68A] shadow-[0_2px_0_#FDE68A]">
                <Star size={20} fill="currentColor" className="text-[#FBBF24]" /> {points}
              </div>
            </div>

            {/* Tabs */}
            <div className="flex bg-[#FFF0F5] p-2 rounded-full max-w-2xl mx-auto border-2 border-[#FFE4E1]">
              <button
                onClick={() => setActiveTab('tasks')}
                className={`flex-1 py-3.5 text-base font-black rounded-full flex items-center justify-center gap-2 transition-all duration-300 ${activeTab === 'tasks' ? 'bg-[#FFB6C1] text-white shadow-[0_4px_0_#FF9EBB] -translate-y-1' : 'text-[#8D6E63] hover:bg-white/50'}`}
              >
                <BookOpen size={20} strokeWidth={3} /> 今日任务
              </button>
              <button
                onClick={() => setActiveTab('calendar')}
                className={`flex-1 py-3.5 text-base font-black rounded-full flex items-center justify-center gap-2 transition-all duration-300 ${activeTab === 'calendar' ? 'bg-[#FFB6C1] text-white shadow-[0_4px_0_#FF9EBB] -translate-y-1' : 'text-[#8D6E63] hover:bg-white/50'}`}
              >
                <CalendarIcon size={20} strokeWidth={3} /> 学习日历
              </button>
              <button
                onClick={() => setActiveTab('subjects')}
                className={`flex-1 py-3.5 text-base font-black rounded-full flex items-center justify-center gap-2 transition-all duration-300 ${activeTab === 'subjects' ? 'bg-[#FFB6C1] text-white shadow-[0_4px_0_#FF9EBB] -translate-y-1' : 'text-[#8D6E63] hover:bg-white/50'}`}
              >
                <Settings size={20} strokeWidth={3} /> 管理科目
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-5 max-w-2xl mx-auto mt-4">
            {activeTab === 'tasks' && (
              <TodayTasks 
                tasks={todayTasks} 
                subjects={subjects} 
                onAddTask={handleAddTask}
                onToggleComplete={handleToggleComplete}
                onDeleteTask={handleDeleteTask}
                onStartFocus={handleStartFocus}
                points={points}
              />
            )}
            {activeTab === 'calendar' && (
              <LearningCalendar tasks={tasks} subjects={subjects} />
            )}
            {activeTab === 'subjects' && (
              <ManageSubjects 
                subjects={subjects} 
                onAddSubject={handleAddSubject}
                onDeleteSubject={handleDeleteSubject}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
