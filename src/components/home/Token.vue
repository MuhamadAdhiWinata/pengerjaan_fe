<template>
  <header class="header-primary flex items-center justify-between p-4 mb-4">
    <!-- Back Button -->
    <button
      class="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition"
      @click="handleBack">
      <img :src="BackIcon" alt="Back" class="w-6 h-6" />
    </button>

    <!-- Title -->
    <h1 class="text-xl font-bold">Masukkan Token Ujian</h1>

    <!-- Spacer / bisa isi action lain -->
    <div class="w-6"></div>
  </header>

  <!-- Jadwal Info -->
  <div class="card-primary p-5 mb-6">
    <div class="flex justify-between mb-3">
      <span class="text-sm text-slate-500">Nama Soal</span>
      <span class="font-semibold text-slate-800">{{ jadwal.nama_soal }}</span>
    </div>
    <div class="flex justify-between">
      <span class="text-sm text-slate-500">Waktu Pengerjaan</span>
      <span class="font-semibold text-slate-800">{{ jadwal.waktu }} Menit</span>
    </div>
  </div>

  <!-- Token Input -->
  <div class="mb-6">
    <label for="token-input" class="block font-medium text-gray-700 mb-2"
      >Token</label
    >
    <input
      id="token-input"
      v-model="token"
      type="text"
      placeholder="Masukkan token di sini"
      class="w-full px-4 py-3 rounded-lg border text-base transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
      :class="{ 'border-red-500': message && !success }"
      @keyup.enter="submitToken" />

    <!-- Validation Message -->
    <p
      v-if="message"
      class="text-sm mt-2"
      :class="success ? 'text-green-600' : 'text-red-500'">
      {{ message }}
    </p>
  </div>

  <!-- Submit Button -->
  <button
    @click="submitToken"
    :disabled="loading || !token.trim()"
    class="btn-primary w-full flex items-center justify-center gap-2 font-semibold px-6 py-3">
    <span v-if="loading" class="flex items-center gap-2">
      <span
        class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      Memverifikasi...
    </span>
    <span v-else>Submit Token</span>
  </button>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useTokenStore } from "../../stores/tokenStore";
import { useHomeStore } from "../../stores/homeStore";
import BackIcon from "../../assets/icons/BackIcon.svg";

const emit = defineEmits(["back", "to-test"]);

const homeStore = useHomeStore();
const tokenStore = useTokenStore();
const { loading } = storeToRefs(tokenStore);

const token = ref("");
const message = ref("");
const success = ref(false);

// Get jadwal from home store
const jadwal = ref({
  kd_jenis: homeStore.selectedJadwal?.kd_jenis || 1445,
  nama_soal: homeStore.selectedJadwal?.ijin_nama || "AKM",
  waktu: homeStore.selectedJadwal?.waktu || 90,
});

const handleBack = () => {
  emit("back");
};

const submitToken = async () => {
  if (!token.value.trim()) {
    message.value = "Masukkan TOKEN dengan benar";
    success.value = false;
    return;
  }

  const result = await tokenStore.verifyToken(
    jadwal.value.kd_jenis,
    token.value
  );

  message.value = result.message;
  success.value = result.success;

  if (result.success) {
    // Navigate to test page on success
    setTimeout(() => {
      emit("to-test");
    }, 1000);
  }
};
</script>
