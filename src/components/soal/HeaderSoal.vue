<template>
  <div class="pb-12">
    <header class="nav-header fixed w-full z-40">
      <div class="h-16 flex items-center justify-between px-4 lg:px-6">
        <div class="flex items-center space-x-3">
          <img
            src="../../assets/ms logo.jpg"
            alt="Logo"
            class="rounded-full border-2 border-white shadow-lg w-10 h-10" />
          <div class="space-x-1">
            <span class="text-white drop-shadow-md">CBT Media</span>
            <span class="text-red-600 drop-shadow-md">Scanter</span>
          </div>
        </div>
        <div class="text-xs font-medium tracking-wide">
          Selamat Datang,
          <span class="text-sm font-medium tracking-wide">
            {{ pesertaNama }}
          </span>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useUserStore } from "../../stores/userStore";

const userStore = useUserStore();
const pesertaNama = computed(() => userStore.user?.nama || "Peserta");
</script>
