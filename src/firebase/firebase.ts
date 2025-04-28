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
  // Firestore 업데이트용 타입
  [key: string]: void;
};

export const todosCollection = collection(db, 'todos');

export const addTodoDocument = async (data: TodoItem) => {
  console.log('Adding todo with data:', data);
  try {
    const docRef = await addDoc(todosCollection, data);
    console.log('Document added with ID:', docRef.id);
    return docRef;
  } catch (error) {
    console.error('Error adding document:', error);
    throw error;
  }
};

export const getTodoDocument = async (): Promise<TodoItem[]> => {
  console.log('서버 데이터 찾아보기...');
  try {
    const querySnapshot = await getDocs(todosCollection);
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
  console.log('Updating todo with ID:', id);
  console.log('Update data:', data);

  try {
    const docRef = doc(todosCollection, id);
    const result = await updateDoc(docRef, data);
    console.log('Update successful');
    return result;
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};

export const deleteTodoDocument = async (id: string) => {
  return await deleteDoc(doc(todosCollection, id));
};
