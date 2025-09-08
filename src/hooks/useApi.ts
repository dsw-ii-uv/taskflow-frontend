"use client"

export function useApi() {
  const request = async <T>(url: string, method: string, body?: T) => {
    const token = localStorage.getItem("auth")
    try {
      const response = await fetch(url, {
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

  return request
}