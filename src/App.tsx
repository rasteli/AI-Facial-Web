import { AppRoutes } from "./routes"
import { useAuth } from "./contexts/AuthContext"

function App() {
  const { isLoading } = useAuth()

  return isLoading ? <div>Loading...</div> : <AppRoutes />
}

export default App
