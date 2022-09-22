import React from "react"
import ReactDOM from "react-dom/client"

import "./styles/global.css"
import "regenerator-runtime/runtime"

import App from "./App"
import { AuthProvider } from "./contexts/AuthContext"
import { UpdateProvider } from "./contexts/UpdateContext"
import { MessageProvider } from "./contexts/MessageContext"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <UpdateProvider>
        <MessageProvider>
          <App />
        </MessageProvider>
      </UpdateProvider>
    </AuthProvider>
  </React.StrictMode>
)
