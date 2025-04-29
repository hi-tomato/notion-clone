export interface DiaryItem {
  id: string;
  createdAt: Date | string;
  markDownText: string;
  tags: string;
}

export interface ToastState {
  showSuccess: boolean;
  showError: boolean;
  errorMessage: string;
  successMessage: string;
}
