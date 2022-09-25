import { WorkoutLog } from './workoutLogType';

export interface DailyLog {
  id: string; // ex. 2022-09-18
  memo: string;
  workoutLogs: WorkoutLog[];
}
