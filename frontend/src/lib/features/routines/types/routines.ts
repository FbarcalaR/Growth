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
  duration: string; // TimeSpan as string
}

export interface TaskStreak {
  maxStreakDays: number;
  currentStreakDays: number;
}

export interface TaskRepetition {
  // This will be serialized as JSON from the backend
  // We'll handle it as a generic object for now
  [key: string]: any;
}

export interface RoutineTask {
  id: number;
  name: string;
  repetition: TaskRepetition;
  goals: Goal[];
  taskSchedule: TaskSchedule;
  taskStreak: TaskStreak;
  notes?: string;
  routine?: Routine; // For nested responses
}

export interface Routine {
  id: number;
  name: string;
  tasks: RoutineTask[];
  goals: Goal[];
  startDate: string; // DateTimeOffset as ISO string
  totalDays: number;
}

export interface RoutinesResponse {
  routines: Routine[];
}

export interface CreateRoutineRequest {
  name: string;
  startDate: string;
}

export interface CreateRoutineResponse {
  newRoutineId: number;
}

export interface UpdateRoutineRequest {
  name?: string;
  startDate?: string;
  tasks?: RoutineTask[];
} 