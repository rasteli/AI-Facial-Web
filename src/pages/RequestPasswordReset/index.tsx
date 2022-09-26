import { FormEvent, useState } from "react"

import styles from "./styles.module.scss"

import { api } from "@/services/api"
import { useViewport } from "@/hooks/useViewport"
import { Alert, Variant } from "@/components/Alert"
import { getErrorMessage } from "@/utils/getErrorMessage"

export function RequestPasswordReset() {
  const { aboveThreshold } = useViewport(540)

  const [email, setEmail] = useState("")
  const [alertMessage, setAlertMessage] = useState("")

  const [isOpen, setIsOpen] = useState(false)
  const [variant, setVariant] = useState<Variant>("success")

  async function handleFormSubmit(e: FormEvent) {
    e.preventDefault()

    try {
      const response = await api.post("/request-reset", { email })
      setAlertMessage(response.data.message)
      setVariant("success")
    } catch (error: any) {
      const errorMessage = getErrorMessage(error)

      setAlertMessage(errorMessage)
      setVariant("danger")
    } finally {
      setEmail("")
      setIsOpen(true)
    }
  }

  return (
    <main className={styles.container}>
      {isOpen && (
        <Alert message={alertMessage} setIsOpen={setIsOpen} variant={variant} />
      )}

      {aboveThreshold && <div className={styles.headerHR} />}

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
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <button type="submit">ENVIAR EMAIL</button>
        </form>
      </div>
    </main>
  )
}
