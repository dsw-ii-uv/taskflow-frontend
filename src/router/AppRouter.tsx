import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "@/context/AuthContext"
import { ReloadProvider } from "@/context/ReloadContext"
import ProtectedRoute from "@/components/ProtectedRoute"
import PublicRoute from "@/components/PublicRoute"
import AuthLayout from "@/layouts/AuthLayout"
import MainLayout from "@/layouts/MainLayout"
import Login from "@/pages/Login"
import Dashboard from "@/pages/Dashboard"
import Profile from "@/pages/Profile"
import Tasks from "@/pages/Tasks"
import { Toaster } from "sonner"

export default function AppRouter() {
  return (
    <AuthProvider>
      <ReloadProvider>
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
          <Toaster position="bottom-right" richColors />
        </BrowserRouter>
      </ReloadProvider>
    </AuthProvider>
  )
}