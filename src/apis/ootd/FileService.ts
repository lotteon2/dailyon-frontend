import axios from 'axios'

export const uploadImageToS3 = async (preSignedUrl: string, file: File) => {
  try {
    await putBinaryType(preSignedUrl, file)
  } catch (error: any) {
    console.error(error)
    throw error
  }
}

export const putBinaryType = async (url: string, data?: any): Promise<void> => {
  try {
    await axios.put(url, data, {
      headers: {
        timeout: 0,
        processData: false,
        'Content-Type': data.type
      }
    })
  } catch (error: any) {
    console.error(error)
    throw error
  }
}