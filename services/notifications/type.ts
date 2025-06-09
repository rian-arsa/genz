export interface Notification {
  id: string;
  userId: string;
  category: string;
  action: string;
  title: string;
  body: string;
  isRead: boolean;
  data: Record<string, any>;
  createdAt: string;
}

export interface NotificationHeader {
  notifications: Notification[];
  unreadCount: number;
}