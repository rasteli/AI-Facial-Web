import { Face } from "./Face"

export interface User {
  id: string
  face: Face
  name: string
  email: string
  phone: string
  gender: string
  nickname: string
  birthDate: string
  password: string
}
