import api from "./api";
import { useUserStore } from "../stores/userStore";

export async function login(username, sandi) {
  const response = await api.post("/auth/login", { username, sandi });
  const { token } = response.data;

  saveAuth(token);

  // ambil user info dan simpan ke store
  const userStore = useUserStore();
  const user = await fetchMe();
  if (user) userStore.setUser(user);

  return response.data;
}

export function saveAuth(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function clearAuth() {
  localStorage.removeItem("token");
}

export async function logout() {
  const userStore = useUserStore();

  try {
    await api.post("/auth/logout");
  } catch (_) {
    // bisa diabaikan kalau server gak respon
  } finally {
    clearAuth();
    userStore.clearUser();
  }
}

export async function fetchMe() {
  try {
    const token = getToken();
    if (!token) return null;

    const res = await api.get("/auth/me");
    return res.data.user;
  } catch (err) {
    clearAuth();
    return null;
  }
}

// 🔹 inisialisasi user saat app di-refresh
export async function initUser() {
  const userStore = useUserStore();
  if (!getToken()) return;

  const user = await fetchMe();
  if (user) {
    userStore.setUser(user);
  } else {
    userStore.clearUser();
  }
}
