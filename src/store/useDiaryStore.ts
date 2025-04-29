import { create } from 'zustand';

interface DiaryState {
  markDownText: string;
  tags: string;
  setMarkDownText: (markDownText: string) => void;
  setTags: (tags: string) => void;
}
const useDiaryStore = create<DiaryState>((set) => ({
  markDownText: '',
  tags: '',
  setMarkDownText: (markDownText) => set({ markDownText }),
  setTags: (tags) => set({ tags }),
}));

export default useDiaryStore;
