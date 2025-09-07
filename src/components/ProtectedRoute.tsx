"use client"

import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import FullScreenLoader from "./Loader"

export default function ProtectedRoute() {
  const { isLoggedIn, loading } = useAuth()

  if (loading) return <FullScreenLoader />

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />
}