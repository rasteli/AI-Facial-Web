import { FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Select from "react-select"

import styles from "./styles.module.scss"

import { Alert } from "../Alert"
import { useAuth } from "../../contexts/AuthContext"

export function CreateUserForm() {
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

  const [name, setName] = useState("")
  const [nickname, setNickname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rePassword, setRePassword] = useState("")
  const [phone, setPhone] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [gender, setGender] = useState<string | undefined>("")

  async function handleFormSubmit(e: FormEvent) {
    e.preventDefault()

    if (password !== rePassword) return

    const payload = {
      name,
      nickname,
      email,
      password,
      phone,
      gender,
      birthDate
    }

    try {
      await signUp(payload)
      navigate("/webcam", { replace: false, state: { requestType: "signUp" } })
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
        <h1>CADASTRE SUAS INFORMAÇÕES</h1>

        <form onSubmit={handleFormSubmit}>
          <label htmlFor="name">NOME</label>
          <input type="text" onChange={e => setName(e.target.value)} required />
          <label htmlFor="nickname">APELIDO</label>
          <input
            type="text"
            onChange={e => setNickname(e.target.value)}
            required
          />
          <label htmlFor="email">EMAIL</label>
          <input
            type="email"
            onChange={e => setEmail(e.target.value)}
            required
          />

          <div className={styles.inputBlock}>
            <div className={styles.inputInBlock}>
              <label htmlFor="password">SENHA</label>
              <input
                type="password"
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputInBlock}>
              <label htmlFor="password">CONFRIMAR SENHA</label>
              <input
                type="password"
                onChange={e => setRePassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.inputBlock}>
            <div className={styles.inputInBlock}>
              <label htmlFor="phone">TELEFONE</label>
              <input
                type="tel"
                onChange={e => setPhone(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputInBlock}>
              <label htmlFor="gender">SEXO</label>
              <Select
                className={styles.reactSelect}
                onChange={e => setGender(e?.value)}
                options={[
                  { value: "Masculino", label: "Masculino" },
                  { value: "Feminino", label: "Feminino" }
                ]}
              />
            </div>
          </div>

          <label htmlFor="date">DATA DE NASCIMENTO</label>
          <input
            type="date"
            onChange={e => setBirthDate(e.target.value)}
            required
          />

          <hr />

          <div className={styles.buttons}>
            <button
              type="button"
              onClick={() => {
                navigate("/login", { replace: false })
              }}
            >
              FAZER LOGIN
            </button>
            <button type="submit">CADASTRAR</button>
          </div>
        </form>
      </div>
    </main>
  )
}
