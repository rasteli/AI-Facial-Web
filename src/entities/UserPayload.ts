export interface UserPostOrPutPayload {
  name?: string
  email?: string
  phone?: string
  gender?: string
  nickname?: string
  password?: string
  birthDate?: string
  login?: string
}

export interface UserDeletePayload {
  id: string
}
