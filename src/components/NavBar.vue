<template>
  <header class="relative z-10">
    <div
      class="h-16 bg-gradient-to-r from-[#2E79B7] via-[#2B6AA3] to-[#2B5A87] shadow flex items-center justify-between pr-4 lg:pr-8 text-white">
      <div class="flex items-center gap-3">
        <!-- Toggle mobile -->
        <button
          class="p-2 rounded hover:bg-white/10 transition lg:hidden"
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

        <!-- Collapse desktop -->
        <button
          class="hidden lg:flex p-2 rounded hover:bg-white/10 transition"
          @click="$emit('toggleCollapse')">
          <svg
            v-if="sidebarCollapse"
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 5l7 7-7 7" />
          </svg>
          <svg
            v-else
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div class="text-l font-semibold">
          Selamat Datang, {{ user?.nama || "Peserta" }}
        </div>
      </div>

      <button
        class="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-[#c62828] shadow-md transition"
        @click="handleLogout"
        :disabled="loading">
        <span v-if="loading">...</span>
        <span v-else>Logout</span>
      </button>
    </div>
  </header>
  <div
    v-if="loading"
    class="fixed inset-0 flex items-center justify-center bg-black/40 z-70">
    <div class="flex flex-col items-center space-y-3">
      <!-- Spinner -->
      <div
        class="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      <span class="text-white text-lg">Logging out...</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { logout } from "../services/authServices";
import { useUserStore } from "../stores/userStore";

defineProps({
  sidebarCollapse: Boolean, // dari Layout.vue
});

const router = useRouter();
const loading = ref(false);
const userStore = useUserStore();

const user = computed(() => userStore.user);

const handleLogout = async () => {
  loading.value = true;
  try {
    await logout();
  } catch (e) {
    console.error("Logout error:", e);
  } finally {
    loading.value = false;
    router.push("/login");
  }
};
</script>
