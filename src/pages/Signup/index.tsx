import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import Select from "react-select"

import styles from "./styles.module.scss"
import form from "../../assets/form.png"

import { Alert } from "../../components/Alert"
import { useAuth } from "../../contexts/AuthContext"
import { useViewport } from "../../hooks/useViewport"
import { customStyles } from "../../utils/reactSelect"
import { getErrorMessage } from "../../utils/getErrorMessage"

export function Signup() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const { aboveThreshold } = useViewport(540)

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

    try {
      if (!gender) {
        throw new Error("Campo de seleção não pode ser vazio.")
      }

      if (password !== rePassword) {
        throw new Error("Senhas não coincidem.")
      }

      const payload = {
        name,
        nickname,
        email,
        password,
        phone,
        gender,
        birthDate
      }

      await signUp(payload)
      navigate("/webcam", { replace: false, state: { requestType: "signup" } })
    } catch (error: any) {
      const errorMessage = getErrorMessage(error)

      setAlertMessage(errorMessage)
      setIsOpen(true)
    }
  }

  return (
    <div className={styles.container}>
      {isOpen && (
        <Alert setIsOpen={setIsOpen} message={alertMessage} variant="danger" />
      )}

      {aboveThreshold && <div className={styles.headerHR} />}

      <main className={styles.innerContainer}>
        <h1>CADASTRE SUAS INFORMAÇÕES</h1>

        <form onSubmit={handleFormSubmit}>
          <label htmlFor="name">NOME</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={e => setName(e.target.value)}
            required
          />

          <div className={styles.hr} />

          <label htmlFor="nickname">APELIDO</label>
          <input
            id="nickname"
            name="nickname"
            type="text"
            onChange={e => setNickname(e.target.value)}
            required
          />

          <div className={styles.hr} />

          <label htmlFor="email">EMAIL</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={e => setEmail(e.target.value)}
            required
          />

          <div className={styles.hr} />

          <div className={styles.inputBlock}>
            <div className={styles.inputInBlock}>
              <label htmlFor="password">SENHA</label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            {!aboveThreshold && <div className={styles.hr} />}

            <div className={styles.inputInBlock}>
              <label htmlFor="re-password">CONFRIMAR SENHA</label>
              <input
                id="re-password"
                name="re-password"
                type="password"
                onChange={e => setRePassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.hr} />

          <div className={styles.inputBlock}>
            <div className={styles.inputInBlock}>
              <label htmlFor="phone">TELEFONE</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                onChange={e => setPhone(e.target.value)}
                required
              />
            </div>

            {!aboveThreshold && <div className={styles.hr} />}

            <div className={styles.inputInBlock}>
              <label htmlFor="gender">SEXO</label>
              <Select
                id="gender"
                name="gender"
                className={styles.reactSelect}
                onChange={e => setGender(e?.value)}
                styles={customStyles}
                options={[
                  { value: "Masculino", label: "Masculino" },
                  { value: "Feminino", label: "Feminino" }
                ]}
              />
            </div>
          </div>

          <div className={styles.hr} />

          <label htmlFor="date">DATA DE NASCIMENTO</label>
          <input
            id="date"
            name="date"
            type="date"
            onChange={e => setBirthDate(e.target.value)}
            required
          />

          <div className={styles.hr} />

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
      </main>

      {aboveThreshold && (
        <aside>
          <img src={form} alt="" />
        </aside>
      )}
    </div>
  )
}
