import { BrowserRouter, Routes, Route } from "react-router-dom"

import { CreateUserForm } from "./components/CreateUserForm"

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateUserForm />} />
      </Routes>
    </BrowserRouter>
  )
}
