import axios from "axios"

export const faceApi = axios.create({
  baseURL: import.meta.env.VITE_FACE_API_BASE_URL
})
