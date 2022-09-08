import styles from "./styles.module.scss"
import { DefaultItem, ToUpdate } from "../UpdateItem"

interface ButtonsProps {
  update: ToUpdate
  defaultItem: DefaultItem
  toUpdate: ToUpdate
  setToUpdate: React.Dispatch<React.SetStateAction<ToUpdate>>
}

export function Buttons({
  defaultItem,
  update,
  toUpdate,
  setToUpdate
}: ButtonsProps) {
  return toUpdate[defaultItem] ? (
    <button className={styles.saveBTN}>SALVAR</button>
  ) : (
    <button
      className={styles.updateBTN}
      onClick={() =>
        setToUpdate(toUpdate => {
          return { ...toUpdate, ...update }
        })
      }
    >
      ALTERAR
    </button>
  )
}
