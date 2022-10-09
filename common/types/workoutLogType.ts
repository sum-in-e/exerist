import { WorkoutListAll } from './workoutType';

export interface WorkoutLog {
  id: string;
  group: MuscleGroups;
  name: WorkoutListAll;
  memo: string;
}

export type MuscleGroups =
  | 'Chest'
  | 'Back'
  | 'Leg'
  | 'Arm'
  | 'Shoulder'
  | 'Core';
