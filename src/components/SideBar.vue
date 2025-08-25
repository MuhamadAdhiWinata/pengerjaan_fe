<template>
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-[#2E79B7] via-[#2B6AA3] to-[#2B5A87] shadow-2xl transform transition-transform duration-500 ease-in-out',
      sidebarOpen ? 'translate-x-0' : '-translate-x-full',
    ]">
    <!-- Header Logo -->
    <div
      class="h-32 flex flex-col items-center justify-center border-b border-white/10 space-y-2">
      <img
        src="../assets/ms logo.jpg"
        alt="Logo"
        class="w-16 h-16 rounded-full border-4 border-white shadow-lg" />
      <span class="font-extrabold text-lg tracking-wide">
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
        active-class="bg-white/20 text-white font-semibold">
        <!-- pakai <img> karena icon = URL -->
        <img :src="item.icon" class="w-5 h-5 mr-3" />
        {{ item.label }}
      </router-link>
    </nav>
  </aside>
</template>

<script setup>
import HomeIcon from "../assets/icons/HomeIcon.svg";
import PayIcon from "../assets/icons/PayIcon.svg";

defineProps({
  sidebarOpen: Boolean,
});

// Daftar menu (tinggal tambah di sini)
const menuItems = [
  { label: "Home", path: "/home", icon: HomeIcon },
  { label: "Soal", path: "/soal", icon: PayIcon },
];
</script>
