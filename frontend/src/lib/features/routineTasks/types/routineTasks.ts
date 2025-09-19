export interface Metric {
  name: string;
  value: number;
}

export interface Goal {
  target: Metric;
  progress?: Metric;
}

export interface TaskSchedule {
  fromTime: string; // DateTimeOffset as ISO string
  toTime: string; // DateTimeOffset as ISO string
  duration?: string; // TimeSpan as string
}

export interface TaskStreak {
  maxStreakDays: number;
  currentStreakDays: number;
}

export interface ITaskRepetition {
  lastDueDateTime: string; // DateTimeOffset as ISO string
  nextDueDate: string; // DateTimeOffset as ISO string
}

export interface DailyTask extends ITaskRepetition {
  type: 'daily';
}

export interface WeeklyTask extends ITaskRepetition {
  type: 'weekly';
}

export interface MonthlyTask extends ITaskRepetition {
  type: 'monthly';
}

export interface YearlyTask extends ITaskRepetition {
  type: 'yearly';
}

export interface CustomTask extends ITaskRepetition {
  type: 'custom';
  repeatsOnDays: number[]; // DayOfWeek enum values
}

export type TaskRepetition = DailyTask | WeeklyTask | MonthlyTask | YearlyTask | CustomTask;

export interface RoutineTask {
  id: number;
  name: string;
  routineId: number;
  notes?: string;
  taskSchedule?: TaskSchedule;
  goals: Goal[];
  repetition?: TaskRepetition;
  taskStreak?: TaskStreak;
}

export interface CreateRoutineTaskRequest {
  routineId: number;
  name: string;
  goalTargets?: Metric[];
  taskSchedule: TaskSchedule;
  notes?: string;
  repetitionType?: number; // RepetitionTypes enum
}

export interface CreateRoutineTaskResponse {
  newTaskId: number;
}

export interface UpdateRoutineTaskRequest {
  name?: string;
  notes?: string;
  taskSchedule?: TaskSchedule;
  goals?: Goal[];
  repetitionType?: number;
}

export interface CompleteTaskRequest {
  completed: boolean;
} 