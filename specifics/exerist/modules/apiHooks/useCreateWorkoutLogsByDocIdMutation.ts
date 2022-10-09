import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { FirebaseError } from 'firebase/app';
import dailyLog, {
  CreateWorkoutLogByDocIdParams,
} from '@specifics/exerist/modules/api/dailyLog';

export const useCreateWorkoutLogsByDocIdMutation = (): UseMutationResult<
  void,
  FirebaseError,
  CreateWorkoutLogByDocIdParams
> => {
  return useMutation(dailyLog.createWorkoutLogsByDocId, {
    onError: (error) => {
      alert('추가에 실패했습니다.');
    },
  });
};
