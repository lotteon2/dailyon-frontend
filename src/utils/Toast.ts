import { notification } from 'ant-design-vue'

export const openInternalServerErrorNotification = () => {
  notification['error']({
    message: '서버 내부 오류',
    description:
      '서버에 문제가 발생했습니다.'
  })
}