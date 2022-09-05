import axios from "axios"

export const faceApi = axios.create({
  baseURL: "http://localhost:8000"
})
