import api from "./api";

export async function login(username, sandi) {
  const response = await api.post("/auth/login", { username, sandi });
  return response.data;
}

export function saveAuth(token, user) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
}

export function getToken() {
  return localStorage.getItem("token");
}

export function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export const logout = async () => {
  try {
    const token = getToken();
    await api.post(
      "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    clearAuth();
  } catch (err) {
    clearAuth();
    throw err;
  }
};

// ==========================
// Fungsi baru untuk /auth/me
export const fetchMe = async () => {
  try {
    const token = getToken();
    if (!token) return null; // Belum login
    const res = await api.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Update localStorage user biar selalu sync
    saveAuth(token, res.data.user);
    return res.data.user;
  } catch (err) {
    clearAuth();
    return null;
  }
};
