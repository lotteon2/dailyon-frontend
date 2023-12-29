import axios from 'axios'

export const uploadImageToS3 = async (presignedUrl: string, file: File) => {
  return putBinaryType(presignedUrl, file)
}

const putBinaryType = async (url: string, data?: any): Promise<void> => {
  return await axios.put(url, data, {
    headers: {
      timeout: 0,
      processData: false,
      contentType: data.type
    }
  })
}
