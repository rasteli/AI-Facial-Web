import { useState } from "react"
import Select from "react-select"

import styles from "./styles.module.scss"
import { User } from "../../entities/User"

import { useAuth } from "../../contexts/AuthContext"

export interface IsToUpdate {
  name?: boolean
  email?: boolean
  phone?: boolean
  gender?: boolean
  nickname?: boolean
  password?: boolean
  birthDate?: boolean
}

export interface ToUpdate {
  name?: string
  email?: string
  phone?: string
  gender?: string
  nickname?: string
  password?: string
  birthDate?: string
}

export type DefaultItem =
  | "name"
  | "email"
  | "phone"
  | "gender"
  | "nickname"
  | "password"
  | "birthDate"
  | "gender"

interface UpdateItemProps {
  htmlFor: string
  label: string
  inputType: string
  user: User | null
  defaultItem: DefaultItem
}

export function UpdateItem({
  htmlFor,
  label,
  inputType,
  user,
  defaultItem
}: UpdateItemProps) {
  const { updateUser } = useAuth()

  const [isToUpdate, setIsToUpdate] = useState<IsToUpdate>({
    name: false,
    email: false,
    phone: false,
    gender: false,
    nickname: false,
    password: false,
    birthDate: false
  })

  const [toUpdate, setToUpdate] = useState<ToUpdate>({
    name: "",
    email: "",
    phone: "",
    gender: "",
    nickname: "",
    password: "",
    birthDate: ""
  })

  function toggleIsToUpdate(toggle: boolean) {
    setIsToUpdate(prevState => {
      return { ...prevState, [defaultItem]: toggle }
    })
  }

  return (
    <li className={styles.container}>
      {user && (
        <>
          <div className={styles.inputBlock}>
            <label htmlFor={htmlFor}>{label}</label>
            {inputType === "select" ? (
              <Select
                defaultValue={{ value: user?.gender, label: user?.gender }}
                isDisabled={!isToUpdate[defaultItem]}
                options={[
                  { value: "Masculino", label: "Masculino" },
                  { value: "Feminino", label: "Feminino" }
                ]}
                onChange={e =>
                  setToUpdate(prevState => {
                    return { ...prevState, gender: e?.value }
                  })
                }
              />
            ) : (
              <input
                required
                type={inputType}
                defaultValue={user[defaultItem]}
                readOnly={!isToUpdate[defaultItem]}
                onClick={() => toggleIsToUpdate(true)}
                onBlur={() => toggleIsToUpdate(false)}
                onChange={e =>
                  setToUpdate(prevState => {
                    return {
                      ...prevState,
                      [defaultItem]: e.target.value
                    }
                  })
                }
              />
            )}
          </div>
        </>
      )}
    </li>
  )
}
