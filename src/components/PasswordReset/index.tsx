import { FormEvent, useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"

import styles from "./styles.module.scss"

import { Alert } from "../Alert"
import { useAuth } from "../../contexts/AuthContext"
import { useViewport } from "../../hooks/useViewport"
import { getErrorMessage } from "../../utils/getErrorMessage"

export function PasswordReset() {
  const navigate = useNavigate()
  const { aboveThreshold } = useViewport(540)

  const { resetPassword } = useAuth()
  const [searchParams] = useSearchParams()

  const [userId, setUserId] = useState("")
  const [resetToken, setResetToken] = useState("")

  const [password, setPassword] = useState("")
  const [rePassword, setRePassword] = useState("")

  const [isOpen, setIsOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

  useEffect(() => {
    const id = searchParams.get("id")
    const token = searchParams.get("token")

    if (id && token) {
      setUserId(id)
      setResetToken(token)
    }
  }, [])

  async function handleFormSubmit(e: FormEvent) {
    e.preventDefault()

    if (password !== rePassword) {
      setIsOpen(true)
      return setAlertMessage("Senhas não conferem.")
    }

    try {
      await resetPassword(userId, password, resetToken)
      navigate("/login", { replace: true })
    } catch (error: any) {
      const errorMessage = getErrorMessage(error)

      setIsOpen(true)
      setAlertMessage(errorMessage)
    }
  }

  return (
    <main className={styles.container}>
      {isOpen && (
        <Alert message={alertMessage} setIsOpen={setIsOpen} variant="danger" />
      )}

      {aboveThreshold && <div className={styles.headerHR} />}

      <div className={styles.innerContainer}>
        <h1>REDEFINIÇÃO DE SENHA</h1>

        <form onSubmit={handleFormSubmit}>
          <label htmlFor="password">NOVA SENHA</label>
          <input
            type="password"
            onChange={e => setPassword(e.target.value)}
            required
          />
          <label htmlFor="rePassword">REINSERIR NOVA SENHA</label>
          <input
            type="password"
            onChange={e => setRePassword(e.target.value)}
            required
          />

          <button type="submit">REDEFINIR SENHA</button>
        </form>
      </div>
    </main>
  )
}
