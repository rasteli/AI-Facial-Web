import { useEffect } from "react"
import styles from "./styles.module.scss"

interface AlertProps {
  message: string
  variant: "success" | "danger" | "info"
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function Alert({ message, variant, setIsOpen }: AlertProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false)
    }, 5500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <dialog open className={styles[variant]}>
      {message}
    </dialog>
  )
}
