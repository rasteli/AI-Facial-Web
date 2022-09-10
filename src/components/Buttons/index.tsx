import styles from "./styles.module.scss"
import { DefaultItem, IsToUpdate, ToUpdate } from "../UpdateItem"
import { AuthFunc } from "../../contexts/AuthContext"

interface ButtonsProps {
  defaultItem: DefaultItem
  isToUpdate: IsToUpdate
  toUpdate: ToUpdate
  updateUser: AuthFunc
  setIsToUpdate: React.Dispatch<React.SetStateAction<IsToUpdate>>
}

export function Buttons({
  defaultItem,
  isToUpdate,
  toUpdate,
  setIsToUpdate,
  updateUser
}: ButtonsProps) {
  function toggleIsToUpdate() {
    setIsToUpdate(prevState => {
      return { ...prevState, [defaultItem]: !prevState[defaultItem] }
    })
  }

  function handleSave() {
    updateUser(toUpdate)
    toggleIsToUpdate()
  }

  return isToUpdate[defaultItem] ? (
    <button className={styles.saveBTN} onClick={handleSave}>
      SALVAR
    </button>
  ) : (
    <button className={styles.updateBTN} onClick={toggleIsToUpdate}>
      ALTERAR
    </button>
  )
}
