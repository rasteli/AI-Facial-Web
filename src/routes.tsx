import { BrowserRouter, Routes, Route } from "react-router-dom"

import { CreateUserForm } from "./components/CreateUserForm"
import { UserDetail } from "./components/UserDetail"

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateUserForm />} />
        <Route path="/users/:id" element={<UserDetail />} />
      </Routes>
    </BrowserRouter>
  )
}
