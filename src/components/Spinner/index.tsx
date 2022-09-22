import { useEffect, useState } from "react"
import styles from "./styles.module.scss"

export function Spinner() {
  const [spinner, setSpinner] = useState("")

  useEffect(() => {
    const timer = setInterval(() => {
      if (spinner.length === 3) {
        setSpinner("")
      } else {
        setSpinner(spinner + ".")
      }
    }, 500)

    return () => clearInterval(timer)
  }, [spinner])

  return <span className={styles.spinner}>{spinner}</span>
}
