"use client"

const API_URL = import.meta.env.VITE_API_URL;

export function useApi() {
  const request = async <T>(url: string, method: string, body?: T) => {
    const token = localStorage.getItem("auth")
    try {
      const response = await fetch(API_URL + url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Token ${token}` } : {}),
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
      })
      if (!response.ok) throw new Error("Error en la petición")
      return response.json()
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  return { request }
}