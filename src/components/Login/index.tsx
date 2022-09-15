import { FormEvent, useState, useEffect } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"

import styles from "./styles.module.scss"

import { HR } from "../HR"
import { Alert } from "../Alert"
import { useViewport } from "../../hooks/useViewport"

type LocationState = {
  error: boolean
  errorMessage: string
}

export function Login() {
  const location = useLocation()
  const navigate = useNavigate()
  const { aboveThreshold } = useViewport(540)

  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")

  const [isOpen, setIsOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

  useEffect(() => {
    // When returning from Webcam if there is any error
    // while trying to login.
    const state = location.state as LocationState

    if (state?.error) {
      setAlertMessage(state.errorMessage)
      setIsOpen(true)
    }
  }, [])

  async function handleFormSubmit(e: FormEvent) {
    e.preventDefault()

    navigate("/webcam", {
      replace: false,
      state: { requestType: "login", login, password }
    })
  }

  return (
    <div className={styles.container}>
      {isOpen && (
        <Alert setIsOpen={setIsOpen} message={alertMessage} variant="danger" />
      )}

      {aboveThreshold && <div className={styles.headerHR} />}

      <main className={styles.innerContainer}>
        <h1>ENTRE NA SUA CONTA</h1>

        <form onSubmit={handleFormSubmit}>
          <label htmlFor="email">EMAIL OU APELIDO</label>
          <input
            type="text"
            onChange={e => setLogin(e.target.value)}
            required
          />

          <HR />

          <label htmlFor="password">SENHA</label>
          <input
            type="password"
            onChange={e => setPassword(e.target.value)}
            required
          />

          <HR />

          <span className={styles.forgotPassword}>
            <Link to="/requestPassword">Esqueceu a senha?</Link>
          </span>

          <div className={styles.buttons}>
            <button
              type="button"
              onClick={() => {
                navigate("/signup", { replace: false })
              }}
            >
              FAZER CADASTRO
            </button>
            <button type="submit">LOGIN</button>
          </div>
        </form>
      </main>
    </div>
  )
}
