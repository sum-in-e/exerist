import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { firebaseDB } from '@firebase';

// -------------------

export interface GetDailyMemoByDocIdParmas {
  docId: string;
}

/**
 * @remarks docId로 DailyMemo 데이터를 가져오는 API
 */
const getDailyMemoyDocId = async (params: GetDailyMemoByDocIdParmas) => {
  const { docId } = params;

  const docRef = doc(firebaseDB, 'dailyMemo', docId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return undefined;
  }
};

// -------------------

export interface SetDailyMemoByDocIdParams {
  docId: string;
  memo: string;
}

/**
 * @remarks docId에 해당하는 DailyMemo를 생성 혹은 업데이트하는 API
 * @memo updateDoc은 특정 필드만 업데이트 가능 /  setDoc은 doc 자체를 덮어씌움
 * setDoc으로 전부 처리하면 이미 데이터가 있는 경우에도 해당 데이터를 무시하고 새로운 데이터가 덮어 씌워지기때문에 분기처리하여 사용한다.
 */
const setDailyMemoByDocId = async (params: SetDailyMemoByDocIdParams) => {
  const { docId, memo } = params;

  const docRef = doc(firebaseDB, 'dailyMemo', docId);
  const getDocById = await getDoc(docRef);

  if (getDocById.exists()) {
    // 해당 날짜의 doc이 이미 있으니 memo 업데이트
    const docSnap = await updateDoc(docRef, { memo });
    return docSnap;
  } else {
    // 해당 날짜의 doc이 없으면 setDoc으로 doc 생성 + memo 필드 추가 / 생성당시 isCollected는 default로 false
    const docSnap = await setDoc(docRef, { memo, isCollected: false });
    return docSnap;
  }
};

// -------------------

export interface SetIsCollectedDailyMemoByDocIdParams {
  docId: string;
  isCollected: boolean;
}

/**
 * @remarks docId에 해당하는 DailyMemo의 isCollected 여부를 변경하는 API
 * @TODO 북마크 기능 추가 시 정상 동작 확인
 */
const setIsCollectedDailyMemoByDocId = async (
  params: SetIsCollectedDailyMemoByDocIdParams
) => {
  const { docId, isCollected } = params;

  const docRef = doc(firebaseDB, 'dailyMemo', docId);
  const getDocById = await getDoc(docRef);

  // 메모가 빈문자열이 아닌 경우에만 북마크 버튼 활성화 시킬 것이고 메모가 있다는 것은 doc이 있다는 거니까 setDoc을 쓸일이 없을 수 있으나
  // dailyMemo가 없는데 북마크가 되버릴 수 있는 예외 상황을 고려해 setDoc으로 Doc 생성하여 isCollected 여부 처리할 수 있도록 함.
  if (getDocById.exists()) {
    // 해당 날짜의 doc이 이미 있으니 업데이트
    const docSnap = await updateDoc(docRef, { isCollected });
    return docSnap;
  } else {
    // 해당 날짜의 doc이 없으면 setDoc으로 doc 생성 + isCollected 필드 추가
    const docSnap = await setDoc(docRef, { isCollected });
    return docSnap;
  }
};

export default {
  getDailyMemoyDocId,
  setDailyMemoByDocId,
  setIsCollectedDailyMemoByDocId,
};
