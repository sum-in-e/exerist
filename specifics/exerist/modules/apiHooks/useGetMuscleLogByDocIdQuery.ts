import { queryKeys } from '@common/modules/queryKeys';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { FirebaseError } from 'firebase/app';
import { DocumentData } from 'firebase/firestore';
import muscleLog, { GetMuscleLogByDocIdParmas } from '../api/muscleLog';

export const useGetMuscleLogByDocIdQuery = (
  params: GetMuscleLogByDocIdParmas,
  options?: UseQueryOptions<DocumentData, FirebaseError, DocumentData>
) => {
  return useQuery<DocumentData, FirebaseError, DocumentData>(
    queryKeys.getMuscleLogByDocId(params),
    () => muscleLog.getMuscleLogByDocId(params),
    {
      ...options,
    }
  );
};
