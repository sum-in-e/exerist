import { DailyLog } from '@common/types/dailyLogType';
import { WorkoutLog } from '@common/types/workoutLogType';
import { firebaseDB } from '@firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

// -------------------

export interface GetDailyLogByDocIdParmas {
  docId: string;
}

/**
 * @remarks docId로 DailyLog 데이터를 가져오는 API 입니다.
 */
const getDailyLogByDocId = async (params: GetDailyLogByDocIdParmas) => {
  const { docId } = params;

  const docRef = doc(firebaseDB, 'dailyLog', docId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return undefined;
  }
};

// -------------------

export interface UpdateWorkoutLogsByDocIdParams {
  docId: string;
  workoutLogsData: WorkoutLog[];
}

/**
 * @remarks docId에 해당하는 DailyLog에서 workoutLogs를 업데이트하는 API 입니다.
 */
const updateWorkoutLogsByDocId = async (
  params: UpdateWorkoutLogsByDocIdParams
) => {
  const { docId, workoutLogsData } = params;

  const docRef = doc(firebaseDB, 'dailyLog', docId);
  const docSnap = await updateDoc(docRef, { workoutLogs: workoutLogsData });
  return docSnap;
};

// -------------------

export interface UpdateDailyLogMemoByDocIdParams {
  docId: string;
  memo: string;
}

/**
 * @remarks docId에 해당하는 DailyLog에서 memo를 업데이트하는 API 입니다.
 */
const updateDailyLogMemoByDocId = async (
  params: UpdateDailyLogMemoByDocIdParams
) => {
  const { docId, memo } = params;

  const docRef = doc(firebaseDB, 'dailyLog', docId);
  const docSnap = await updateDoc(docRef, { memo });
  return docSnap;
};

export default {
  getDailyLogByDocId,
  updateWorkoutLogsByDocId,
  updateDailyLogMemoByDocId,
};
