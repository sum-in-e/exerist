import { doc, getDoc } from 'firebase/firestore';
import { firebaseDB } from '@firebase';

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

export default {
  getMuscleLogByDocId,
};
