import { FormEvent, useState } from "react"
import { Link } from "react-router-dom"

import styles from "./styles.module.scss"
import { Alert } from "../Alert"
import { useAuth } from "../../contexts/AuthContext"

export function Login() {
  const { logIn } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [isOpen, setIsOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

  async function handleFormSubmit(e: FormEvent) {
    e.preventDefault()

    const payload = {
      email,
      password
    }

    try {
      await logIn(payload)
    } catch (error: any) {
      setAlertMessage(error.response.data.error)
      setIsOpen(true)
    }
  }

  return (
    <main className={styles.container}>
      {isOpen && (
        <Alert setIsOpen={setIsOpen} message={alertMessage} variant="danger" />
      )}

      <div className={styles.innerContainer}>
        <h1>ENTRE EM SUA CONTA</h1>

        <form onSubmit={handleFormSubmit}>
          <label htmlFor="email">EMAIL OU APELIDO</label>
          <input
            type="text"
            onChange={e => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">SENHA</label>
          <input
            type="password"
            onChange={e => setPassword(e.target.value)}
            required
          />

          <hr />

          <div className={styles.buttons}>
            <Link to="/signup">
              <button type="button">FAZER CADASTRO</button>
            </Link>
            <button type="submit">LOGIN</button>
          </div>
        </form>
      </div>
    </main>
  )
}
