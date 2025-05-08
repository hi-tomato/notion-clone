export interface Notification {
  id: string;
  title: string;
  message: string;
  createdAt: Date;
  actionUrl?: string;
  isRead?: boolean;
  priority?: 'low' | 'medium' | 'high';
}

export interface ApiError {
  code: string;
  message: string;
}
