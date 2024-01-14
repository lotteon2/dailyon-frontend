import { notification } from 'ant-design-vue'

export const openInternalServerErrorNotification = () => {
  notification['error']({
    message: '서버 내부 오류',
    description:
      INTERNAL_SERVER_ERROR_MSG
  })
}