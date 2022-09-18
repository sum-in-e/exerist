import { WorkoutLog } from './workoutLogType';

export interface DailyLog {
  id: string; // ex. 2022-09-18
  isComplete: boolean;
  memo: string;
  workoutLogs: WorkoutLog[];
}
