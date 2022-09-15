import React from "react"
import ReactDOM from "react-dom/client"
import "./styles/global.css"

import App from "./App"
import { AuthProvider } from "./contexts/AuthContext"
import { UpdateProvider } from "./contexts/UpdateContext"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <UpdateProvider>
        <App />
      </UpdateProvider>
    </AuthProvider>
  </React.StrictMode>
)
