import { BrowserRouter, Routes, Route } from "react-router-dom"

import { Home } from "./components/Home"
import { Login } from "./components/Login"
import { Webcam } from "./components/Webcam"
import { PrivateRoute } from "./components/PrivateRoute"
import { PasswordReset } from "./components/PasswordReset"
import { CreateUserForm } from "./components/CreateUserForm"
import { RequestPasswordReset } from "./components/RequestPasswordReset"

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/webcam" element={<Webcam />} />
        <Route path="/signup" element={<CreateUserForm />} />
        <Route path="/passwordReset" element={<PasswordReset />} />
        <Route path="/requestPassword" element={<RequestPasswordReset />} />
      </Routes>
    </BrowserRouter>
  )
}
