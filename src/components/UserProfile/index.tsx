import styles from "./styles.module.scss"
import userAvatar from "../../assets/user.svg"
import logOut from "../../assets/logout.svg"

import { HR } from "../HR"
import { UpdateItem } from "../UpdateItem"
import { items } from "../../utils/homeItems"

import { useAuth } from "../../contexts/AuthContext"
import {
  useUpdate,
  defaultToUpdate,
  defaultIsToUpdate
} from "../../contexts/UpdateContext"

export function UserProfile() {
  const { user, signOut, updateUser } = useAuth()
  const { toUpdate, setToUpdate, setIsToUpdate } = useUpdate()

  async function handleUpdate() {
    await updateUser(toUpdate)
    setToUpdate(defaultToUpdate)
    setIsToUpdate(defaultIsToUpdate)
  }

  return (
    <div className={styles.container}>
      <header>
        <img src={userAvatar} alt="user avatar" />
        <div className={styles.user}>
          <h1>
            Perfil do usuário: <span>{user?.name}</span>
          </h1>
          <h5>
            ID: <span>{user?.id}</span>
          </h5>
        </div>
        <button className={styles.logOut} onClick={signOut}>
          <img src={logOut} alt="log out" />
        </button>
      </header>

      <HR />

      <ul>
        {items.map((item, index) => (
          <UpdateItem
            key={index}
            user={user}
            label={item.label}
            htmlFor={item.htmlFor}
            inputType={item.inputType}
            defaultItem={item.htmlFor}
          />
        ))}
      </ul>

      <button
        className={styles.save}
        onClick={handleUpdate}
        disabled={
          !Object.entries(toUpdate).some(([, value]) => value.length > 0)
        }
      >
        SALVAR
      </button>
    </div>
  )
}
