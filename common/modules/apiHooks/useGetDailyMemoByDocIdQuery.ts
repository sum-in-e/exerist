import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { FirebaseError } from 'firebase/app';
import { DocumentData } from 'firebase/firestore';
import { queryKeys } from '@common/modules/queryKeys';
import dailyMemo, {
  GetDailyMemoByDocIdParmas,
} from '@common/modules/api/dailyMemo';

export const useGetDailyMemoByDocIdQuery = (
  params: GetDailyMemoByDocIdParmas,
  options?: UseQueryOptions<DocumentData, FirebaseError, DocumentData>
) => {
  return useQuery<DocumentData, FirebaseError, DocumentData>(
    queryKeys.getDailyMemoByDocId(params),
    () => dailyMemo.getDailyMemoyDocId(params),
    {
      ...options,
    }
  );
};
