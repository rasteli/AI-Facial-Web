import { UpdateItem } from "../UpdateItem"
import { items } from "../../utils/homeItems"
import { useAuth } from "../../contexts/AuthContext"

export function Home() {
  const { user, signOut } = useAuth()

  return (
    <div>
      <h1>Dados do usuário: {user?.name}</h1>
      <ul>
        <li>
          <label htmlFor="">ID</label>
          <input type="text" defaultValue={user?.id} disabled />
        </li>
        {items.map((item, index) => (
          <UpdateItem
            key={index}
            user={user}
            label={item.label}
            update={item.update}
            select={item.select}
            htmlFor={item.htmlFor}
            inputType={item.inputType}
            defaultItem={item.htmlFor}
          />
        ))}
      </ul>
      <button onClick={signOut}>Sair</button>
    </div>
  )
}
