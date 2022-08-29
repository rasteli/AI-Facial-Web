import Select from "react-select"
import styles from "./styles.module.scss"

export function CreateUserForm() {
  return (
    <main className={styles.container}>
      <div className={styles.innerContainer}>
        <h1>CADASTRE SUAS INFORMAÇÕES</h1>

        <form>
          <label htmlFor="name">NOME</label>
          <input type="text" />
          <label htmlFor="nickname">APELIDO</label>
          <input type="text" />
          <label htmlFor="email">EMAIL</label>
          <input type="email" />

          <div className={styles.inputBlock}>
            <div className={styles.inputInBlock}>
              <label htmlFor="password">SENHA</label>
              <input type="password" />
            </div>
            <div className={styles.inputInBlock}>
              <label htmlFor="password">CONFRIMAR SENHA</label>
              <input type="password" />
            </div>
          </div>

          <div className={styles.inputBlock}>
            <div className={styles.inputInBlock}>
              <label htmlFor="phone">TELEFONE</label>
              <input type="tel" />
            </div>
            <div className={styles.inputInBlock}>
              <label htmlFor="gender">GÊNERO</label>
              <Select
                className={styles.reactSelect}
                options={[
                  { value: "male", label: "Masculino" },
                  { value: "female", label: "Feminino" }
                ]}
              />
            </div>
          </div>

          <label htmlFor="date">DATA DE NASCIMENTO</label>
          <input type="date" />

          <hr />

          <div className={styles.buttons}>
            <button type="button">FAZER LOGIN</button>
            <button type="submit">CADASTRAR</button>
          </div>
        </form>
      </div>
    </main>
  )
}
