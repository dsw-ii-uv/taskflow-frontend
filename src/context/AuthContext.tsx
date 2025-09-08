"use client"

import { createContext, useContext, useState, useEffect } from "react"

type AuthContextType = {
  isLoggedIn: boolean
  loading: boolean
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const authToken = localStorage.getItem("auth")
    if (authToken) setIsLoggedIn(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [])

  const login = (token: string) => {
    setIsLoggedIn(true)
    localStorage.setItem("auth", token)
  }

  const logout = () => {
    setLoading(true)
    setIsLoggedIn(false)
    setTimeout(() => {
      setLoading(false)
    }, 1000);
    localStorage.removeItem("auth")
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider")
  return context
}
