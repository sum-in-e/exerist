import { WorkoutLog } from './workoutLogType';

export interface DailyLog {
  memo: string;
  workoutLogs: WorkoutLog[];
}
