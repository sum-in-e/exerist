import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firebaseDB } from '@firebase';
import { MuscleGroups } from '@common/types/workoutLogType';

export interface GetMuscleLogByDocIdParmas {
  docId: string;
}

/**
 * @remarks docId로 MuscleLoog 데이터를 가져오는 API
 */
const getMuscleLogByDocId = async (params: GetMuscleLogByDocIdParmas) => {
  const { docId } = params;

  const docRef = doc(firebaseDB, 'muscleLogForCalendar', docId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return undefined;
  }
};

// -------------------

export interface SetMuscleLogMyDocIdParams {
  docId: string;
  muscleLogData: MuscleGroups[] | [];
}

/**
 * @remarks docId에 해당하는 workoutLog에 당일 운동한 근육군을 추가하는 API
 * @memo muscleLogForCalendar콜렉션의 각 Doc에는 필드가 하나 뿐이기 때문에 updateDoc을 써도 얻는 이점이 없다.
 * 따라서 Doc 존재 여부를 체크하고 없을 경우 Doc 생성까지 해주는 setDoc을 사용하는 것으로 Doc이 존재하는 경우와 존재하지 않는 경우 모두 커버 가능함
 */
const setMuscleLogMyDocId = async (params: SetMuscleLogMyDocIdParams) => {
  const { docId, muscleLogData } = params;

  const docRef = doc(firebaseDB, 'muscleLogForCalendar', docId);

  const docSnap = await setDoc(docRef, { muscleLog: muscleLogData });
  return docSnap;
};

export default {
  getMuscleLogByDocId,
  setMuscleLogMyDocId,
};
