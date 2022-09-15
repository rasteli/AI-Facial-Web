import React, { useContext, useEffect, useState, createContext } from "react"

import { api } from "../services/api"
import { User } from "../entities/User"
import { UserPostOrPutPayload } from "../entities/UserPayload"

export type AuthFunc = (payload: UserPostOrPutPayload) => Promise<void>

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
  logIn: AuthFunc
  signUp: AuthFunc
  updateUser: AuthFunc
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  sendResetEmail: (email: string) => Promise<string>
  resetPassword: (
    user_id: string,
    password: string,
    resetToken: string
  ) => Promise<void>
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
    method: "post" | "put",
    payload: UserPostOrPutPayload
  ) {
    const response = await api[method]<AuthResponse>(route, payload)

    const { token, user } = response.data

    setUser(user)

    if (token) {
      setTokenToHeaders(token)
      localStorage.setItem("@IA:token", token)
    }
  }

  async function signUp(payload: UserPostOrPutPayload) {
    await authenticateUser("/signup", "post", payload)
  }

  async function logIn(payload: UserPostOrPutPayload) {
    await authenticateUser("/login", "post", payload)
  }

  async function updateUser(payload: UserPostOrPutPayload) {
    await authenticateUser("/users", "put", payload)
  }

  async function sendResetEmail(email: string) {
    const response = await api.post<ResetResponse>("/request-reset", { email })

    return response.data.message
  }

  async function resetPassword(
    user_id: string,
    password: string,
    resetToken: string
  ) {
    await authenticateUser("/reset-password", "put", {
      user_id,
      password,
      resetToken
    })
  }

  function signOut() {
    setUser(null)
    localStorage.removeItem("@IA:token")
  }

  const value: AuthContextData = {
    user,
    isLoading,
    logIn,
    signUp,
    signOut,
    setUser,
    updateUser,
    resetPassword,
    sendResetEmail
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
