import { useNavigate } from "react-router-dom"

import styles from "./styles.module.scss"
import userImg from "../../../assets/user.svg"
import izzoLogo from "../../../assets/izzo-logo.svg"

import { useAuth } from "../../../contexts/AuthContext"

export function Header() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <header className={styles.container}>
      <div className={styles.logoBox}>
        <img src={izzoLogo} alt="" />
      </div>
      <nav>
        {user ? (
          <a href="/profile" className={styles.profileNav}>
            {user.nickname}
            <img src={userImg} alt="" />
          </a>
        ) : (
          <>
            <button
              id="login"
              type="button"
              className={styles.formNav}
              onClick={() => {
                navigate("/login", { replace: false })
              }}
            >
              ENTRAR
            </button>
            <button
              id="signup"
              type="button"
              className={styles.formNav}
              onClick={() => {
                navigate("/signup", { replace: false })
              }}
            >
              CADASTRO
            </button>
          </>
        )}
      </nav>
    </header>
  )
}
