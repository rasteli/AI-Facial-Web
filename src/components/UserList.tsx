import { Link } from "react-router-dom"

import { User } from "../entities/User"
import { useFetch } from "../hooks/useFetch"

interface Response {
  users: User[]
}

export function UserList() {
  const { data, error } = useFetch<Response>("users", "get")

  return (
    <ul>
      {data?.users.map(user => (
        <li key={user.id}>
          <Link to={`/users/${user.id}`}>{user.name}</Link>
        </li>
      ))}
    </ul>
  )
}
