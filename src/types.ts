export type Subject = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

export type Task = {
  id: string;
  date: string;
  subjectId: string;
  name: string;
  points: number;
  completed: boolean;
  timeSpent: number;
  isRunning?: boolean;
};
