<template>
  <div class="flex">
    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" />

    <!-- Konten utama -->
    <div
      :class="[
        'flex-1 flex flex-col min-h-screen transition-all duration-500 ease-in-out',
        sidebarOpen ? 'ml-64' : 'ml-0',
      ]">
      <Navbar @toggleSidebar="sidebarOpen = !sidebarOpen" />
      <main class="flex-1 px-3 py-6 overflow-y-auto bg-white">
        <div
          class="relative bg-white rounded-2xl shadow-[0_28px_60px_-20px_rgba(0,0,0,0.35)] border border-gray-100 p-6">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Sidebar from "./Sidebar.vue";
import Navbar from "./Navbar.vue";

const sidebarOpen = ref(true);
</script>
