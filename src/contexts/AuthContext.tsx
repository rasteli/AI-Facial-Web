import { useContext, useEffect, useState, createContext } from "react"

import { api } from "../services/api"
import { User } from "../entities/User"
import { UserPostOrPutPayload } from "../entities/UserPayload"

interface AuthProviderProps {
  children: React.ReactNode
}

interface AuthResponse {
  token: string
  user: User
}

interface ResetResponse {
  message: string
}

interface AuthContextData {
  user: User | null
  isLoading: boolean
  signOut: () => void
  logIn: (payload: UserPostOrPutPayload) => Promise<void>
  signUp: (payload: UserPostOrPutPayload) => Promise<void>
  // sendResetEmail: (email: string) => Promise<ResetResponse>
  // resetPassword: (user_id: string, password: string) => Promise<void>
}

const AuthContext = createContext({} as AuthContextData)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async function () {
      const token = localStorage.getItem("@IA:token")

      if (token) {
        setTokenToHeaders(token)

        try {
          const { data } = await api.get<AuthResponse>("/user")

          setUser(data.user)
        } catch (error) {
          console.log(error)
        }
      }

      setIsLoading(false)
    })()
  }, [])

  function setTokenToHeaders(token: string) {
    api.defaults.headers.common.authorization = `Bearer ${token}`
  }

  async function authenticateUser(
    route: string,
    payload: UserPostOrPutPayload
  ) {
    const response = await api.post<AuthResponse>(route, payload)

    const { token, user } = response.data

    setUser(user)
    setTokenToHeaders(token)
    localStorage.setItem("@IA:token", token)
  }

  async function signUp(payload: UserPostOrPutPayload) {
    const body = {
      name: payload.name,
      nickname: payload.nickname,
      email: payload.email,
      password: payload.password,
      phone: payload.phone,
      gender: payload.gender,
      birthDate: payload.birthDate
    }

    await authenticateUser("/signup", body)
  }

  async function logIn(payload: UserPostOrPutPayload) {
    const body = {
      email: payload.email,
      password: payload.password
    }

    await authenticateUser("/login", body)
  }

  // async function resetPassword(user_id: string, password: string) {
  //   await authenticateUser("/reset-password", { user_id, password })
  // }

  // async function sendResetEmail(email: string) {
  //   const response = await api.post<ResetResponse>("/send-reset", { email })

  //   return response.data
  // }

  function signOut() {
    setUser(null)
    localStorage.removeItem("@IA:token")
  }

  const value: AuthContextData = {
    user,
    isLoading,
    logIn,
    signUp,
    signOut
    // resetPassword,
    // sendResetEmail
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
