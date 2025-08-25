<template>
  <div class="flex h-screen bg-white font-sans">
    <!-- Sidebar -->
    <aside
      :class="[
        'fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-[#2E79B7] via-[#2B6AA3] to-[#2B5A87] shadow-2xl transform transition-transform duration-500 ease-in-out',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
      ]">
      <div
        class="h-32 flex flex-col items-center justify-center border-b border-white/10 space-y-2">
        <img
          src="../assets/ms logo.jpg"
          alt="Logo"
          class="w-16 h-16 rounded-full border-4 border-white shadow-lg" />
        <span class="font-extrabold text-lg tracking-wide">
          <span class="text-white">Media</span>
          <span class="text-red-600 text-shadow-2xs text-shadow-white"
            >Scanter</span
          >
        </span>
      </div>

      <nav class="mt-4 space-y-1">
        <a
          href="#"
          class="flex items-center px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 transition rounded-lg mx-2">
          <svg
            class="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 12h18M3 6h18M3 18h18" />
          </svg>
          Dashboard
        </a>
        <a
          href="#"
          class="flex items-center px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 transition rounded-lg mx-2">
          <svg
            class="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 13l4 4L19 7" />
          </svg>
          Menu 2
        </a>
      </nav>
    </aside>

    <!-- Overlay (mobile only) -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-30 lg:hidden"
      @click="sidebarOpen = false"></div>

    <!-- Main Area -->
    <div
      class="flex-1 flex flex-col transition-all duration-500"
      :class="{ 'lg:ml-64': sidebarOpen }">
      <!-- Navbar -->
      <header class="relative z-10">
        <div
          class="h-16 bg-gradient-to-r from-[#2E79B7] via-[#2B6AA3] to-[#2B5A87] shadow flex items-center justify-between px-4 lg:px-8 text-white">
          <div class="flex items-center gap-3">
            <button
              class="p-2 rounded hover:bg-white/10 transition"
              @click="sidebarOpen = !sidebarOpen">
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
            <span class="font-extrabold text-lg tracking-wide">
              <span class="text-white">Media</span
              ><span class="text-red-600">Scanter</span>
            </span>
          </div>

          <button
            class="px-4 py-2 bg-[#e53935] text-white rounded-lg hover:bg-[#c62828] shadow-md transition">
            Logout
          </button>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-6 overflow-y-auto bg-white">
        <div
          class="relative bg-white rounded-2xl shadow-[0_28px_60px_-20px_rgba(0,0,0,0.35)] border border-gray-100 p-6">
          <!-- watermark lembut di sisi kanan -->
          <div
            class="pointer-events-none absolute inset-y-0 right-0 w-48 opacity-5"
            style="
              background: radial-gradient(
                140px 140px at 80% 30%,
                #000 0,
                transparent 60%
              );
            "></div>

          <!-- isi kamu di sini -->
          <h1 class="text-xl font-bold text-[#2B5A87] mb-4">Halaman Dummy</h1>
          <p class="text-gray-600">Ini area konten utama…</p>
          <!-- <div class="display-flex border">
            <SoalView />
          </div> -->
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import SoalView from "./soalView.vue";

const sidebarOpen = ref(true);
</script>

<style>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 1s ease-out;
}
</style>
