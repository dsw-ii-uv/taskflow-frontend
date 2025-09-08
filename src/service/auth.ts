const API_URL = import.meta.env.VITE_API_URL;

export async function login(username: string, password: string) {
  try {
    const response = await fetch(API_URL + "users/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Error al iniciar sesión");
    }

    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error(error);
  }
}

export async function logout() {
  try {
    const response = await fetch(API_URL + "users/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("auth")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al cerrar sesión");
    }

    localStorage.removeItem("auth");
  } catch (error) {
    console.error(error);
  }
}

