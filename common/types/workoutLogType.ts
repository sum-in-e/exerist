export interface WorkoutLog {
  id: string;
  group: MuscleGroups;
  name: string;
  memo: string;
}

export type MuscleGroups =
  | 'Chest'
  | 'Back'
  | 'Leg'
  | 'Arm'
  | 'Shoulder'
  | 'Core';
