import { AppRoutes } from "./routes"
import { useAuth } from "./contexts/AuthContext"

import { Webcam } from "./components/Webcam"

function App() {
  const { isLoading } = useAuth()

  return <Webcam />

  return isLoading ? <div>Loading...</div> : <AppRoutes />
}

export default App
