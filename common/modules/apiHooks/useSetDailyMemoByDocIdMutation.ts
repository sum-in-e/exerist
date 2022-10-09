import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { FirebaseError } from 'firebase/app';
import dailyMemo, {
  SetDailyMemoByDocIdParams,
} from '@common/modules/api/dailyMemo';

export const useSetDailyMemoByDocIdMutation = (): UseMutationResult<
  void,
  FirebaseError,
  SetDailyMemoByDocIdParams
> => {
  return useMutation(dailyMemo.setDailyMemoByDocId, {
    onError: (error) => {
      alert('저장에 실패했습니다.');
    },
  });
};
