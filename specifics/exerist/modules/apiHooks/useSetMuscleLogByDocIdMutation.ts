import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { FirebaseError } from 'firebase/app';
import muscleLog, { SetMuscleLogMyDocIdParams } from '../api/muscleLog';

export const useSetMuscleLogByDocIdMutation = (): UseMutationResult<
  void,
  FirebaseError,
  SetMuscleLogMyDocIdParams
> => {
  return useMutation(muscleLog.setMuscleLogMyDocId, {
    onError: (error) => {
      alert('저장에 실패했습니다.');
    },
  });
};
