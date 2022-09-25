import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { FirebaseError } from 'firebase/app';
import dailyLog, {
  UpdateWorkoutLogsByDocIdParams,
} from '@specifics/exerist/modules/api/dailyLog';

export const useUpdateWorkoutLogsByDocIdMutation = (): UseMutationResult<
  void,
  FirebaseError,
  UpdateWorkoutLogsByDocIdParams
> => {
  return useMutation(dailyLog.updateWorkoutLogsByDocId, {
    onError: (error) => {
      alert('저장에 실패했습니다.');
    },
  });
};
