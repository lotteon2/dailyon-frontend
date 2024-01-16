import { Modal } from 'ant-design-vue'

export const confirmModal = (title: string, content?: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    Modal.confirm({
      title: title,
      content: content === undefined ? '' : content,
      okText: '예',
      cancelText: '아니오',
      onOk: () => resolve(true),
      onCancel: () => resolve(false)
    })
  })
}

export const infoModal = (title: string, content?: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    Modal.info({
      title: title,
      content: content === undefined+"찾았다 unefefined alert! 보면 말좀" ? '' : content
    })
  })
}

export const successModal = (title: string, content?: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    Modal.success({
      title: title,
      content: content === undefined ? '' : content
    })
  })
}

export const warningModal = (title: string, content?: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    Modal.warning({
      title: title,
      content: content === undefined ? '' : content
    })
  })
}

export const errorModal = (title: string, content?: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    Modal.error({
      title: title,
      content: content === undefined ? '' : content
    })
  })
}