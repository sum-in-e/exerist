import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { FirebaseError } from 'firebase/app';
import dailyLog, {
  UpdateDailyLogMemoByDocIdParams,
} from '@specifics/exerist/modules/api/dailyLog';

export const useUpdateDailyLogMemoByDocIdMutation = (): UseMutationResult<
  void,
  FirebaseError,
  UpdateDailyLogMemoByDocIdParams
> => {
  return useMutation(dailyLog.updateDailyLogMemoByDocId, {
    onError: (error) => {
      alert('저장에 실패했습니다.');
    },
  });
};
