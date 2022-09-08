export interface UserPostOrPutPayload {
  name?: string
  email?: string
  phone?: string
  login?: string
  gender?: string
  nickname?: string
  password?: string
  birthDate?: string
}

export interface UserDeletePayload {
  id: string
}
