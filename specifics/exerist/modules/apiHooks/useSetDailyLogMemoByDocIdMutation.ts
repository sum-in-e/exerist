import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { FirebaseError } from 'firebase/app';
import dailyLog, {
  SetDailyLogMemoByDocIdParams,
} from '@specifics/exerist/modules/api/dailyLog';

export const useSetDailyLogMemoByDocIdMutation = (): UseMutationResult<
  void,
  FirebaseError,
  SetDailyLogMemoByDocIdParams
> => {
  return useMutation(dailyLog.setDailyLogMemoByDocId, {
    onError: (error) => {
      alert('저장에 실패했습니다.');
    },
  });
};
