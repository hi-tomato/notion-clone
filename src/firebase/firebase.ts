import { DiaryItem } from '@/types/diary-type';
import {
  TodoCategory,
  TodoItem,
  TodoPriority,
  TodoStatus,
} from '@/types/todo-type';
import { FirebaseError, initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  Unsubscribe,
  User,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getCountFromServer,
  setDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export const login = async (): Promise<User | null> => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log('로그인 성공 :', user);

    // 사용자 문서 생성 또는 업데이트
    try {
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(
        userDocRef,
        {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          lastLogin: new Date(),
        },
        { merge: true }
      );
      console.log('사용자 문서가 생성/업데이트되었습니다.');
    } catch (error) {
      console.error('사용자 문서 생성 중 오류:', error);
    }

    return user;
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      const errorMessage = error.message;
      console.log('로그인 실패 :', errorMessage);
    }
    return null;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
    console.log('로그아웃 성공!');
  } catch (error) {
    console.error('로그아웃 실패:', error);
  }
};

export const onUserStateChange = (
  callback: (user: User | null) => void
): Unsubscribe => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

// Firebase Utility Function
const db = getFirestore(app);
type TodoUpdateData = {
  [key: string]: void;
};

export const getUserTodosCollection = (userId: string) => {
  return collection(db, 'users', userId, 'todos');
};

// TODO: 상태 업데이트 (추가,삭제,업데이트)
export const addTodoDocument = async (data: TodoItem) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('사용자가 로그인되어 있지 않습니다.');
  }

  console.log('Adding todo with data:', data);
  try {
    const userTodosCollection = getUserTodosCollection(user.uid);
    const docRef = await addDoc(userTodosCollection, data);
    console.log('Document added with ID:', docRef.id);
    return docRef;
  } catch (error) {
    console.error('Error adding document:', error);
    throw error;
  }
};

export const getTodoDocument = async (): Promise<TodoItem[]> => {
  const user = auth.currentUser;

  if (!user) throw new Error('사용자가 로그인되지 않았습니다.');
  console.log('서버 데이터 찾아보기...');
  try {
    const userTodosCollection = getUserTodosCollection(user.uid);
    const querySnapshot = await getDocs(userTodosCollection);
    console.log('서버데이터 스냅샷:', querySnapshot);

    const todos: TodoItem[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      const createdAtField = data.createdAt;
      let createdAt: Date;
      if (createdAtField?.toDate) {
        createdAt = createdAtField.toDate();
      } else if (typeof createdAtField === 'string') {
        createdAt = new Date(createdAtField);
      } else if (createdAtField instanceof Date) {
        createdAt = createdAtField;
      } else {
        createdAt = new Date();
      }

      const todoItem: TodoItem = {
        id: doc.id,
        title: data.title as string,
        description: data.description as string,
        status: data.status as TodoStatus,
        priority: data.priority as TodoPriority,
        category: data.category as TodoCategory,
        createdAt: createdAt,
        progress: data.progress ?? 0,
        order: data.order ?? 0,
      };
      todos.push(todoItem);
    });
    console.log('Processed todos:', todos);

    return todos;
  } catch (error) {
    console.error('서버에서 데이터 받는데 문제가 생김', error);
    throw error;
  }
};

export const updateTodoDocument = async (
  id: string,
  data: TodoUpdateData
): Promise<void> => {
  const user = auth.currentUser;
  if (!user) throw new Error('사용자가 로그인되지 않았습니다.');
  console.log('Updating todo with ID:', id);
  console.log('Update data:', data);

  try {
    const docRef = doc(db, 'users', user.uid, 'todos', id);
    const result = await updateDoc(docRef, data);
    console.log('Update successful');
    return result;
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};

export const deleteTodoDocument = async (id: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error('사용자가 로그인되어 있지 않습니다.');
  try {
    const docRef = doc(db, 'users', user.uid, 'todos', id);
    return await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};

// Diary 데이터 추가
export const diaryCollection = collection(db, 'diary');

export const getDiaryDocument = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error('사용자가 로그인되어 있지 않습니다.');

  console.log('서버 데이터 찾아보기...');

  try {
    const userDiaryCollection = collection(db, 'users', user.uid, 'diary');
    const querySnapshot = await getDocs(userDiaryCollection);
    console.log('서버데이터 스냅샷:', querySnapshot);
    const diaries: DiaryItem[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log('Processed todos:', data);

      const diaryItem: DiaryItem = {
        id: doc.id as string,
        tags: data.tags as string,
        markDownText: data.markDownText as string,
        createdAt: data.createdAt as string | Date,
      };
      diaries.push(diaryItem);
    });

    return diaries;
  } catch (error) {
    console.error('서버에서 데이터 받는데 문제가 생김', error);
    throw error;
  }
};

// 총 사용자가 몇명인지
// type UserCountResult =
//   | { success: boolean; error: string; count: null }
//   | { success: boolean; count: number; timestamp: Date };

export const getUserCount = async () => {
  const user = auth.currentUser;
  console.log('현재 인증된 사용자:', user ? user.uid : '없음');

  if (!user) return null;

  const usersCollectionRef = collection(db, 'users');
  try {
    console.log('사용자 컬렉션 경로:', usersCollectionRef.path);
    const snapshot = await getCountFromServer(usersCollectionRef);
    console.log('조회 결과:', snapshot.data());
    return snapshot;
  } catch (error) {
    console.error(
      '총 유저의 숫자를 가져오는 중, 오류가 발생하였습니다.',
      error
    );
  }
};
