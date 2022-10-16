import { GetDailyLogByDocIdParmas } from '@specifics/exerist/modules/api/dailyLog';
import { GetDailyMemoByDocIdParmas } from '@common/modules/api/dailyMemo';
import { GetMuscleLogByDocIdParmas } from '@specifics/exerist/modules/api/muscleLog';

export const queryKeys = {
  getDaiyLogByDocId: (params: GetDailyLogByDocIdParmas) =>
    ['dailyLog', params] as const,
  getDaiyMemoByDocId: (params: GetDailyMemoByDocIdParmas) =>
    ['dailyMemo', params] as const,
  getMuscleLogByDocId: (params: GetMuscleLogByDocIdParmas) =>
    ['muscleLog', params] as const,
};
