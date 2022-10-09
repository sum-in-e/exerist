import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { WorkoutLog } from '@common/types/workoutLogType';
import { firebaseDB } from '@firebase';

// -------------------

export interface GetDailyLogByDocIdParmas {
  docId: string;
}

/**
 * @remarks docId로 DailyLog 데이터를 가져오는 API
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
 * @remarks docId에 해당하는 DailyLog에서 workoutLogs를 업데이트하는 API
 * @memo workoutLogs 내의 각 log 수정, 삭제 시 이 API를 사용합니다. 대신 각 기능별로 API를 호출하는 mutation을 별도 분리하였다.
 * 수정, 삭제의 경우는 이미 firestore DB에 해당 doc이 존재해야 UI가 보여지고 해당 액션이 가능하기 때문에 updateDoc으로만 처리한다.
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

export interface CreateWorkoutLogByDocIdParams {
  docId: string;
  workoutLogsData: WorkoutLog[];
}

/**
 * @remarks docId에 해당하는 DailyLog-workoutLogs에 운동을 추가하는 API
 * @memo updateDoc은 특정 필드만 업데이트 가능 /  setDoc은 doc 자체를 덮어씌움
 * setDoc으로 전부 처리하면 이미 데이터가 있는 경우에도 해당 데이터를 무시하고 새로운 데이터가 덮어 씌워지기때문에 분기처리하여 사용한다.
 */
const createWorkoutLogsByDocId = async (
  params: CreateWorkoutLogByDocIdParams
) => {
  const { docId, workoutLogsData } = params;

  const docRef = doc(firebaseDB, 'dailyLog', docId);
  const getDocById = await getDoc(docRef);

  if (getDocById.exists()) {
    // 해당 날짜의 doc이 이미 있으니 updateDoc
    const docSnap = await updateDoc(docRef, { workoutLogs: workoutLogsData });
    return docSnap;
  } else {
    // 해당 날짜의 doc이 없으니 setDoc으로 doc 생성과 동시에 내부에 workoutLogsData까지 생성
    const docSnap = await setDoc(docRef, { workoutLogs: workoutLogsData });
    return docSnap;
  }
};

// -------------------

export default {
  getDailyLogByDocId,
  updateWorkoutLogsByDocId,
  createWorkoutLogsByDocId,
};
