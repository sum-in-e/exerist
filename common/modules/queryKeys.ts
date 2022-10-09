import { GetDailyLogByDocIdParmas } from '@specifics/exerist/modules/api/dailyLog';
import { GetDailyMemoByDocIdParmas } from '@common/modules/api/dailyMemo';

export const queryKeys = {
  getDaiyLogByDocId: (params: GetDailyLogByDocIdParmas) =>
    ['dailyLog', params] as const,
  getDaiyMemoByDocId: (params: GetDailyMemoByDocIdParmas) =>
    ['dailyMemo', params] as const,
};
