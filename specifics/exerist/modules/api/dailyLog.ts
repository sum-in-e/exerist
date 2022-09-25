import { DailyLog } from '@common/types/dailyLogType';
import { WorkoutLog } from '@common/types/workoutLogType';
import { firebaseDB } from '@firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

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

export interface SetDailyLogMemoByDocIdParams {
  docId: string;
  memo: string;
}

/**
 * @remarks docId에 해당하는 DailyLog에서 memo를 업데이트하는 API 입니다.
 * @memo updateDoc은 특정 필드만 업데이트 가능 /  setDoc은 doc 자체를 덮어씌움
 */
const setDailyLogMemoByDocId = async (params: SetDailyLogMemoByDocIdParams) => {
  const { docId, memo } = params;

  const docRef = doc(firebaseDB, 'dailyLog', docId);
  const getDocById = await getDoc(docRef);

  if (getDocById.exists()) {
    // 해당 날짜의 doc이 이미 있으니 updateDoc
    const docSnap = await updateDoc(docRef, { memo });
    return docSnap;
  } else {
    // 해당 날짜의 doc이 없으니 setDoc으로 doc 생성과 동시에 내부에 Memo까지 생성
    const docSnap = await setDoc(docRef, { memo });
    return docSnap;
  }
};

export default {
  getDailyLogByDocId,
  updateWorkoutLogsByDocId,
  setDailyLogMemoByDocId,
};
