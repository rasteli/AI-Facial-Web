import { BrowserRouter, Routes, Route } from "react-router-dom"

import { Home } from "./components/Home"
import { Login } from "./components/Login"
import { PrivateRoute } from "./components/PrivateRoute"
import { CreateUserForm } from "./components/CreateUserForm"

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
        <Route path="/signup" element={<CreateUserForm />} />
      </Routes>
    </BrowserRouter>
  )
}
