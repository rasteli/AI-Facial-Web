import styles from "./styles.module.scss"
import userAvatar from "../../assets/user.png"

import { HR } from "../HR"
import { UpdateItem } from "../UpdateItem"
import { items } from "../../utils/homeItems"
import { useAuth } from "../../contexts/AuthContext"

export function UserProfile() {
  const { user, signOut } = useAuth()

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
      <button onClick={signOut}>Sair</button>
    </div>
  )
}
