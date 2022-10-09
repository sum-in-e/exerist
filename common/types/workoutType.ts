import { workoutListAll } from '@common/constants/workout';

export interface Workout {
  id: string;
  name: string;
}

export type ChestWorkoutList =
  typeof workoutListAll.Chest[keyof typeof workoutListAll.Chest];
export type BackWorkoutList =
  typeof workoutListAll.Back[keyof typeof workoutListAll.Back];
export type LegWorkoutList =
  typeof workoutListAll.Leg[keyof typeof workoutListAll.Leg];
export type ShoulderWorkoutList =
  typeof workoutListAll.Shoulder[keyof typeof workoutListAll.Shoulder];
export type ArmWorkoutList =
  typeof workoutListAll.Arm[keyof typeof workoutListAll.Arm];
export type CoreWorkoutList =
  typeof workoutListAll.Core[keyof typeof workoutListAll.Core];

export type WorkoutListAll =
  | ChestWorkoutList
  | BackWorkoutList
  | LegWorkoutList
  | ShoulderWorkoutList
  | ArmWorkoutList
  | CoreWorkoutList;
