import styles from "./styles.module.scss"

interface GrantPermissionProps {
  setCanVideo: React.Dispatch<React.SetStateAction<boolean>>
}

export function GrantPermission({ setCanVideo }: GrantPermissionProps) {
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
          OK
        </button>
      </div>
    </div>
  )
}
