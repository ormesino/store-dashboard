export const login = async (email: string, password: string) => {
  const response = await fetch("http://localhost:8000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return await response.json();
}

export const register = async (user: Object) => {
  const response = await fetch("http://localhost:8000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return await response.json();
}

export const logout = async () => {
  const response = await fetch("http://localhost:8000/api/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}