import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "@/context/AuthContext"
import ProtectedRoute from "@/components/ProtectedRoute"
import PublicRoute from "@/components/PublicRoute"

import AuthLayout from "@/layouts/AuthLayout"
import MainLayout from "@/layouts/MainLayout"
import Login from "@/pages/Login"
import Dashboard from "@/pages/Dashboard"
import Profile from "@/pages/Profile"
import Tasks from "@/pages/Tasks"

export default function AppRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<AuthLayout />}>
              <Route index element={<Login />} />
            </Route>
          </Route>

          {/* Rutas privadas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="/perfil" element={<Profile />} />
              <Route path="/tareas" element={<Tasks />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}