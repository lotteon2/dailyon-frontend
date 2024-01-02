export enum NotificationType {
  PRODUCT_RESTOCK = 'PRODUCT_RESTOCK',
  ORDER_COMPLETE = 'ORDER_COMPLETE',
  ORDER_SHIPPED = 'ORDER_SHIPPED'
  // ... 계속 추가됨.
}

export interface Notification {
  id: string // 알림 ID
  message: string // 알림 메시지
  linkUrl: string // 관련 링크 URL
  notificationType: NotificationType // 알림 유형
  read: boolean // 읽음 상태
}
