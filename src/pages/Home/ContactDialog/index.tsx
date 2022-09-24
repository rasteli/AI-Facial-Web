import { FormEvent, useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"

import styles from "./styles.module.scss"

import { api } from "../../../services/api"
import { Alert, Variant } from "../../../components/Alert"
import { getErrorMessage } from "../../../utils/getErrorMessage"

export function ContactDialog() {
  const [message, setMessage] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [variant, setVariant] = useState<Variant>("success")

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    try {
      const response = await api.post("/contact", data)
      setMessage(response.data.message)
      setVariant("success")
    } catch (error: any) {
      const errorMessage = getErrorMessage(error)

      setMessage(errorMessage)
      setVariant("danger")
    } finally {
      setIsOpen(true)
    }
  }

  return (
    <>
      {isOpen && (
        <Alert message={message} setIsOpen={setIsOpen} variant={variant} />
      )}

      <Dialog.Portal className={styles.portal}>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          <Dialog.Title className={styles.title}>Fale conosco</Dialog.Title>

          <form onSubmit={handleSubmit}>
            <div className={styles.inputBlock}>
              <label htmlFor="email">Seu email</label>
              <input
                required
                className={styles.inputField}
                type="text"
                id="email"
                name="email"
                placeholder="johndoe@email.com"
              />
            </div>

            <div className={styles.inputBlock}>
              <label htmlFor="subject">Assunto</label>
              <input
                required
                className={styles.inputField}
                type="text"
                id="subject"
                name="subject"
                placeholder="Sobre o que deseja falar?"
              />
            </div>

            <div className={styles.inputBlock}>
              <label htmlFor="description">Descrição</label>
              <textarea
                required
                className={`${styles.inputField} ${styles.textarea}`}
                name="description"
                id="description"
                placeholder="Descreva detalhadamente o assunto"
              ></textarea>
            </div>

            <footer>
              <Dialog.Close type="button">Cancelar</Dialog.Close>

              <button type="submit">Enviar</button>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </>
  )
}
