import { queryKeys } from '@common/modules/queryKeys';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { FirebaseError } from 'firebase/app';
import { DocumentData } from 'firebase/firestore';
import dailyLog, { GetDailyLogByDocIdParmas } from '../api/dailyLog';

export const useGetDailyLogByDocIdQuery = (
  params: GetDailyLogByDocIdParmas,
  options?: UseQueryOptions<DocumentData, FirebaseError, DocumentData>
) => {
  return useQuery<DocumentData, FirebaseError, DocumentData>(
    queryKeys.getDaiyLogByDocId(params),
    () => dailyLog.getDailyLogByDocId(params),
    {
      ...options,
    }
  );
};
