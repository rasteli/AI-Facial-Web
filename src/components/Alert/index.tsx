import { useEffect } from "react"
import styles from "./styles.module.scss"

export type Variant = "success" | "danger" | "info"

interface AlertProps {
  message: string
  variant: Variant
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
