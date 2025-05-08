import { diaryCollection } from '@/firebase/firebase';
import { DiaryItem, ToastState } from '@/types/diary-type';
import { addDoc } from 'firebase/firestore';
import { create } from 'zustand';

interface DiaryState {
  markDownText: string;
  tags: string;
  diaries: DiaryItem[];
  toast: ToastState;
  // fetchDiaries: () => Promise<DiaryItem[]>;

  setMarkDownText: (markDownText: string) => void;
  setTags: (tags: string) => void;
  setDiaries: (diaries: DiaryItem[]) => void;
  saveDiary: () => Promise<string>;
  showSuccess: (message: string) => void;
  showErrorToast: (message: string) => void;
  hideToasts: () => void;
}
const useDiaryStore = create<DiaryState>((set, get) => ({
  markDownText: '',
  tags: '',
  diaries: [],
  toast: {
    showSuccess: false,
    showError: false,
    errorMessage: '',
    successMessage: '',
  },

  setMarkDownText: (markDownText) => set({ markDownText }),

  setTags: (tags) => set({ tags }),

  setDiaries: (diaries) => set({ diaries }),

  saveDiary: async () => {
    const { markDownText, tags } = get();

    const newDiary = {
      markDownText,
      tags,
      createdAt: new Date().toISOString(),
    };

    try {
      const docRef = await addDoc(diaryCollection, newDiary);
      return docRef.id;
    } catch (error) {
      console.error('다이어리 저장 실패:', error);
      throw error;
    }
  },

  showSuccess: (message: string) => {
    set((state) => ({
      toast: {
        ...state.toast,
        showSuccess: true,
        successMessage: message,
      },
    }));

    setTimeout(() => {
      set((state) => ({
        toast: {
          ...state.toast,
          showSuccess: false,
        },
      }));
    }, 3000);
  },

  showErrorToast: (message: string) => {
    set((state) => ({
      toast: {
        ...state.toast,
        showError: true,
        errorMessage: message,
      },
    }));

    setTimeout(() => {
      set((state) => ({
        toast: {
          ...state.toast,
          showError: false,
        },
      }));
    }, 3000);
  },

  hideToasts: () =>
    set((state) => ({
      toast: {
        ...state.toast,
        showSuccess: false,
        showError: false,
      },
    })),
}));

export default useDiaryStore;
