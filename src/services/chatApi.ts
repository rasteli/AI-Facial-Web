import axios from "axios"

export const chatApi = axios.create({
  baseURL: "http://localhost:8087"
})
