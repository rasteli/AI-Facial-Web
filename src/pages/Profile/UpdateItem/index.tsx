import Select from "react-select"

import styles from "./styles.module.scss"

import { User } from "@/entities/User"
import { useUpdate } from "@/contexts/UpdateContext"
import { customStyles, options } from "@/utils/reactSelect"

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
  const { isToUpdate, setIsToUpdate, setToUpdate } = useUpdate()

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
              <>
                <Select
                  defaultValue={{ value: user?.gender, label: user?.gender }}
                  isDisabled={!isToUpdate[defaultItem]}
                  onBlur={() => toggleIsToUpdate(false)}
                  styles={customStyles}
                  options={options}
                  onChange={e =>
                    setToUpdate(prevState => {
                      return { ...prevState, gender: e?.value }
                    })
                  }
                />
                {!isToUpdate[defaultItem] && (
                  <div
                    className={styles.selectOverlay}
                    onClick={() => toggleIsToUpdate(true)}
                  ></div>
                )}
              </>
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
