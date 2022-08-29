export interface UserPostOrPutPayload {
  name?: string
  email?: string
  phone?: string
  gender?: string
  nickname?: string
  birth_date?: Date
  password?: string
}

export interface UserDeletePayload {
  id: string
}
