import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Tareas from "@/pages/Tasks";
import Perfil from "@/pages/Profile";
import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthLayout />} >
          <Route index element={<Login />} />
        </Route>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/tareas" element={<Tareas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}