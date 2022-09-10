import { FormEvent, useState } from "react"

import styles from "./styles.module.scss"

import { Alert, Variant } from "../Alert"
import { useAuth } from "../../contexts/AuthContext"

export function RequestPasswordReset() {
  const { sendResetEmail } = useAuth()

  const [email, setEmail] = useState("")
  const [alertMessage, setAlertMessage] = useState("")

  const [isOpen, setIsOpen] = useState(false)
  const [variant, setVariant] = useState<Variant>("success")

  async function handleFormSubmit(e: FormEvent) {
    e.preventDefault()

    try {
      const response = await sendResetEmail(email)
      setAlertMessage(response)
      setVariant("success")
    } catch (error: any) {
      setAlertMessage(error.response.data.error)
      setVariant("danger")
    }

    setEmail("")
    setIsOpen(true)
  }

  return (
    <main className={styles.container}>
      {isOpen && (
        <Alert message={alertMessage} setIsOpen={setIsOpen} variant={variant} />
      )}

      <div className={styles.innerContainer}>
        <h1>REDEFINIÇÃO DE SENHA</h1>

        <form onSubmit={handleFormSubmit}>
          <div className={styles.info}>
            <p>
              Insira seu email. Se ele estiver vinculado a uma conta, enviaremos
              um email com instruções para a redefinição da senha.
            </p>
          </div>

          <label htmlFor="email">EMAIL</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <hr />

          <button type="submit">ENVIAR EMAIL</button>
        </form>
      </div>
    </main>
  )
}
