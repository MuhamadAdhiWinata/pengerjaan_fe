<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#2E79B7] via-[#2B6AA3] to-[#2B5A87]">
    <div
      class="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md text-center border border-white/20">
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
        <div>
          <input
            type="text"
            v-model="username"
            placeholder="Username"
            class="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/30" />
        </div>
        <div>
          <input
            type="password"
            v-model="password"
            placeholder="Password"
            class="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/30" />
        </div>
        <button
          type="submit"
          class="w-full py-3 bg-[#e53935] hover:bg-[#c62828] rounded-lg font-bold text-white shadow-lg transition"
          @click="goToDashboaed">
          Login
        </button>
      </form>

      <!-- Footer -->
      <p class="text-sm text-white/70 mt-6">
        © {{ new Date().getFullYear() }} MediaScanter
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const username = ref("");
const password = ref("");

const handleLogin = () => {
  // TODO: tambahkan logic autentikasi
  console.log("Login attempt:", username.value, password.value);
};

const goToDashboaed = () => {
  router.push("/");
};
</script>
