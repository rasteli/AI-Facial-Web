import { useAuth } from "../../contexts/AuthContext"

export function Home() {
  const { user, signOut } = useAuth()

  return (
    <div>
      <h1>Dados do usuário: {user?.name}</h1>
      <ul>
        <li>ID: {user?.id}</li>
        <li>Apelido: {user?.nickname}</li>
        <li>Email: {user?.email}</li>
        <li>Sexo: {user?.gender}</li>
        <li>Telefone: {user?.phone}</li>
        <li>Data de nascimento: {user?.birthDate}</li>
      </ul>
      <button onClick={signOut}>Sair</button>
    </div>
  )
}
