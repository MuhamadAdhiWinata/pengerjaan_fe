<template>
  <header class="relative z-10">
    <div
      class="h-16 bg-gradient-to-r from-[#2E79B7] via-[#2B6AA3] to-[#2B5A87] shadow flex items-center justify-between px-4 lg:px-8 text-white">
      <div class="flex items-center gap-3">
        <button
          class="p-2 rounded hover:bg-white/10 transition"
          @click="$emit('toggleSidebar')">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div class="text-l font-semibold">Selamat Datang, {{ "Peserta" }}</div>
      </div>

      <button
        class="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-[#c62828] shadow-md transition"
        @click="logout">
        Logout
      </button>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const logout = () => {
  router.push("/login");
};
</script>
