<template>
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-60 bg-gradient-to-b from-[#2E79B7] via-[#2B6AA3] to-[#2B5A87] shadow-2xl transform transition-all duration-300 ease-in-out',
      sidebarOpen ? 'translate-x-0' : '-translate-x-full',
      'lg:translate-x-0',
      sidebarCollapse ? 'lg:w-16 w-64' : 'w-64',
    ]">
    <!-- Header Logo -->
    <div
      class="h-32 flex flex-col items-center justify-center border-b border-white/10 space-y-2"
      :class="sidebarCollapse ? 'lg:px-2' : ''">
      <img
        src="../assets/ms logo.jpg"
        alt="Logo"
        class="rounded-full border-4 border-white shadow-lg transition-all duration-300"
        :class="sidebarCollapse ? 'lg:w-10 lg:h-10 w-16 h-16' : 'w-16 h-16'" />
      <span
        class="font-extrabold text-lg tracking-wide transition-opacity duration-300"
        :class="
          sidebarCollapse
            ? 'lg:opacity-0 lg:absolute opacity-100'
            : 'opacity-100'
        ">
        <span class="text-white drop-shadow-md">Media</span>
        <span class="text-red-600 drop-shadow-md">Scanter</span>
      </span>
    </div>

    <!-- Menu -->
    <nav class="mt-4 space-y-1">
      <router-link
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="flex items-center px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 transition rounded-lg mx-2"
        :class="sidebarCollapse ? 'lg:justify-center' : ''"
        active-class="bg-white/20 text-white font-semibold">
        <img
          :src="item.icon"
          class="w-5 h-5"
          :class="sidebarCollapse ? 'lg:mr-0' : 'mr-3'" />
        <span
          :class="
            sidebarCollapse
              ? 'lg:opacity-0 lg:w-0 lg:absolute opacity-100'
              : 'opacity-100'
          ">
          {{ item.label }}
        </span>
      </router-link>
    </nav>
  </aside>
</template>

<script setup>
import HomeIcon from "../assets/icons/HomeIcon.svg";
import PayIcon from "../assets/icons/PayIcon.svg";

defineProps({
  sidebarOpen: Boolean,
  sidebarCollapse: Boolean,
});

// Daftar menu (tinggal tambah di sini)
const menuItems = [
  { label: "Home", path: "/home", icon: HomeIcon },
  { label: "Page", path: "/page", icon: PayIcon },
];
</script>
