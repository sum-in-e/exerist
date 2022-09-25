import { GetDailyLogByDocIdParmas } from '@specifics/exerist/modules/api/dailyLog';

export const queryKeys = {
  getDaiyLogByDocId: (params: GetDailyLogByDocIdParmas) =>
    ['dailyLog', params] as const,
};
