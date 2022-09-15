import React, { useContext, useState, createContext } from "react"

interface ToUpdate {
  name?: string
  email?: string
  phone?: string
  gender?: string
  nickname?: string
  password?: string
  birthDate?: string
}

interface IsToUpdate {
  name?: boolean
  email?: boolean
  phone?: boolean
  gender?: boolean
  nickname?: boolean
  password?: boolean
  birthDate?: boolean
}

interface UpdateProviderProps {
  children: React.ReactNode
}

interface UpdateContextData {
  toUpdate: ToUpdate
  isToUpdate: IsToUpdate
  setToUpdate: React.Dispatch<React.SetStateAction<ToUpdate>>
  setIsToUpdate: React.Dispatch<React.SetStateAction<IsToUpdate>>
}

const UpdateContext = createContext({} as UpdateContextData)

export const defaultToUpdate = {
  name: "",
  email: "",
  phone: "",
  gender: "",
  nickname: "",
  password: "",
  birthDate: ""
}

export const defaultIsToUpdate = {
  name: false,
  email: false,
  phone: false,
  gender: false,
  nickname: false,
  password: false,
  birthDate: false
}

export function useUpdate() {
  return useContext(UpdateContext)
}

export function UpdateProvider({ children }: UpdateProviderProps) {
  const [toUpdate, setToUpdate] = useState<ToUpdate>(defaultToUpdate)
  const [isToUpdate, setIsToUpdate] = useState<IsToUpdate>(defaultIsToUpdate)

  const value: UpdateContextData = {
    toUpdate,
    isToUpdate,
    setToUpdate,
    setIsToUpdate
  }

  return (
    <UpdateContext.Provider value={value}>{children}</UpdateContext.Provider>
  )
}
