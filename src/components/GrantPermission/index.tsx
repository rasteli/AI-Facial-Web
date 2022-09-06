import { useNavigate } from "react-router-dom"
import styles from "./styles.module.scss"

interface GrantPermissionProps {
  setCanVideo: React.Dispatch<React.SetStateAction<boolean>>
}

export function GrantPermission({ setCanVideo }: GrantPermissionProps) {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <p>
        Agora prosseguiremos para o escaneamento do seu rosto para efetivar a
        operação. Pronto?
      </p>
      <div className={styles.buttons}>
        <button
          onClick={() => {
            setCanVideo(true)
            localStorage.setItem("canVideo", "true")
          }}
        >
          SIM
        </button>
        <button onClick={() => navigate("/")}>NÃO</button>
      </div>
    </div>
  )
}
