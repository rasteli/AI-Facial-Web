import { BrowserRouter, Routes, Route } from "react-router-dom"

import { Home } from "./pages/Home"
import { Chat } from "./pages/Chat"
import { Login } from "./pages/Login"
import { Webcam } from "./pages/Webcam"
import { Signup } from "./pages/Signup"
import { Profile } from "./pages/Profile"
import { PasswordReset } from "./pages/PasswordReset"
import { RequestPasswordReset } from "./pages/RequestPasswordReset"

import { DynamicRoute } from "./components/DynamicRoute"

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/profile"
          element={
            <DynamicRoute type="protected">
              <Profile />
            </DynamicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <DynamicRoute type="public">
              <Login />
            </DynamicRoute>
          }
        />
        <Route path="/webcam" element={<Webcam />} />
        <Route
          path="/signup"
          element={
            <DynamicRoute type="public">
              <Signup />
            </DynamicRoute>
          }
        />
        <Route
          path="/passwordReset"
          element={
            <DynamicRoute type="public">
              <PasswordReset />
            </DynamicRoute>
          }
        />
        <Route
          path="/requestPassword"
          element={
            <DynamicRoute type="public">
              <RequestPasswordReset />
            </DynamicRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <DynamicRoute type="protected">
              <Chat />
            </DynamicRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
