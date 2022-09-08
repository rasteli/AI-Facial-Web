import axios from "axios"

export const api = axios.create({
  baseURL: import.meta.env.VITE_USER_API_BASE_URL
})
