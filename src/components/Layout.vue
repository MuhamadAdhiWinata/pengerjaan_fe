<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" :sidebarCollapse="sidebarCollapse" />

    <!-- Overlay buat mobile -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 bg-black/40 z-30 lg:hidden"
      @click="sidebarOpen = false"></div>

    <!-- Konten utama -->
    <div
      :class="[
        'flex-1 flex flex-col transition-all duration-300 ease-in-out',
        sidebarCollapse ? 'lg:ml-16' : 'lg:ml-64',
      ]">
      <Navbar
        @toggleSidebar="sidebarOpen = !sidebarOpen"
        @toggleCollapse="sidebarCollapse = !sidebarCollapse"
        :sidebarCollapse="sidebarCollapse" />
      <main class="flex-1 px-3 py-6 overflow-y-auto">
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

const sidebarOpen = ref(false); // mobile
const sidebarCollapse = ref(false); // desktop
</script>
