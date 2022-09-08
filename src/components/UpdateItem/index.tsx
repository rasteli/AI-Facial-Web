import { useState } from "react"
import Select from "react-select"

import styles from "./styles.module.scss"

import { Buttons } from "../Buttons"
import { User } from "../../entities/User"

export interface ToUpdate {
  name?: boolean
  email?: boolean
  phone?: boolean
  gender?: boolean
  nickname?: boolean
  password?: boolean
  birthDate?: boolean
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
  update: ToUpdate
  select: boolean
}

export function UpdateItem({
  htmlFor,
  label,
  inputType,
  user,
  defaultItem,
  update,
  select
}: UpdateItemProps) {
  const [toUpdate, setToUpdate] = useState<ToUpdate>({
    name: false,
    email: false,
    phone: false,
    gender: false,
    nickname: false,
    password: false,
    birthDate: false
  })

  return (
    <li className={styles.container}>
      {user && (
        <>
          <div className={styles.inputBlock}>
            <label htmlFor={htmlFor}>{label}</label>
            {select ? (
              <Select
                defaultValue={{ value: user?.gender, label: user?.gender }}
                isDisabled={!toUpdate[defaultItem]}
                // className={styles.reactSelect}
                // onChange={e => setGender(e?.value)}
                options={[
                  { value: "Masculino", label: "Masculino" },
                  { value: "Feminino", label: "Feminino" }
                ]}
              />
            ) : (
              <input
                type={inputType}
                defaultValue={user[defaultItem]}
                disabled={!toUpdate[defaultItem]}
                required
              />
            )}
          </div>
          <Buttons
            defaultItem={defaultItem}
            update={update}
            toUpdate={toUpdate}
            setToUpdate={setToUpdate}
          />
        </>
      )}
    </li>
  )
}
