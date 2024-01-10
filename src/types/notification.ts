// src/types/notification.ts

export enum NotificationType {
  PRODUCT_RESTOCK = 'PRODUCT_RESTOCK',
  ORDER_COMPLETE = 'ORDER_COMPLETE',
  ORDER_SHIPPED = 'ORDER_SHIPPED',
  ORDER_ARRIVED = 'ORDER_ARRIVED',
  AUCTION_END = 'AUCTION_END',
  GIFT_RECEIVED = 'GIFT_RECEIVED',
  POINTS_EARNED_SNS = 'POINTS_EARNED_SNS',
  HEARTBEAT = 'HEARTBEAT'
  // ... 계속 추가됨.
}

export interface Notification {
  id: string // 알림 ID
  message: string // 알림 메시지
  linkUrl: string // 관련 링크 URL
  notificationType: NotificationType // 알림 유형
  read: boolean // 읽음 상태
}
