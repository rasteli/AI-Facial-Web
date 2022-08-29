import { useParams } from "react-router-dom"

export function UserDetail() {
  const { id } = useParams()

  return <div>User ID: {id}</div>
}
