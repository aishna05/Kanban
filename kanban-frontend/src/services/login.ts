import axios from "axios";

// login.ts
export async function login(username: string, password: string) {
  const res = await axios.post("http://localhost:8000/api/auth/token/", {
    username,
    password,
  });

  if (res.status === 200) {
    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);
  }
}
