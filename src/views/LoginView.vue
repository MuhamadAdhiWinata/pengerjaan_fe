<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#2E79B7] via-[#2B6AA3] to-[#2B5A87] relative">
    <!-- Login Card -->
    <div
      class="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md text-center border border-white/20 z-10">
      <!-- Logo -->
      <div class="flex flex-col items-center mb-6">
        <img
          src="../assets/ms logo.jpg"
          alt="Logo"
          class="w-20 h-20 rounded-full border-4 border-white shadow-lg mb-3" />
        <h1 class="text-2xl font-extrabold text-white tracking-wide">
          <span class="text-white drop-shadow-md">Media</span>
          <span class="text-red-600 drop-shadow-md">Scanter</span>
        </h1>
      </div>

      <!-- Form Login -->
      <form @submit.prevent="handleLogin" class="space-y-4">
        <input
          type="text"
          v-model="username"
          placeholder="Username"
          class="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/30" />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          class="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/30" />
        <button
          type="submit"
          class="w-full py-3 bg-[#e53935] hover:bg-[#c62828] rounded-lg font-bold text-white shadow-lg transition"
          :disabled="loading">
          Login
        </button>
      </form>

      <!-- Error Message -->
      <p
        v-if="error"
        class="mt-4 px-3 py-2 bg-red-100/50 text-red-600 font-semibold rounded-md text-sm transition-opacity duration-300">
        {{ error }}
      </p>

      <!-- Footer -->
      <p class="text-sm text-white/70 mt-6">
        © {{ new Date().getFullYear() }} MediaScanter
      </p>
    </div>

    <!-- Loading Modal -->
    <div
      v-if="loading"
      class="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div class="flex flex-col items-center space-y-3">
        <!-- Spinner -->
        <div
          class="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        <span class="text-white text-lg">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login, saveAuth } from "../services/authServices";

const router = useRouter();

const username = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

const handleLogin = async () => {
  loading.value = true;
  error.value = "";

  try {
    const res = await login(username.value, password.value);
    if (res.success) {
      saveAuth(res.token, res.user);
      router.push("/home");
    } else {
      error.value = res.message || "Login gagal";
    }
  } catch (err) {
    error.value = err.response?.data?.message || "Terjadi kesalahan server";
  } finally {
    loading.value = false;
  }
};
</script>
