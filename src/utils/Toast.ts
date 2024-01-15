import { notification } from 'ant-design-vue'

export const openInternalServerErrorNotification = () => {
  notification['error']({
    message: '서버 내부 오류',
    description:
      INTERNAL_SERVER_ERROR_MSG
  })
}

export const openInfoNotification = (message: string, description: string) => {
  notification['info']({
    message: message,
    description: description
  })
}