<template>
  <header class="header-primary flex items-center justify-between p-4 mb-4">
    <!-- Back Button -->
    <button class="flex items-center gap-2 transition" @click="handleBack">
      <BackIcon class="w-6 h-6" />
    </button>

    <!-- Title -->
    <h1 class="text-header">
      {{ isVerified ? "Mulai Ujian" : "Masukkan Token Ujian" }}
    </h1>

    <div class="w-6"></div>
  </header>

  <div class="flex items-center justify-center">
    <div class="border border-sky-200 rounded-lg w-full max-w-md p-6 space-y-6">
      <!-- Info Jadwal -->
      <div class="card-primary p-5">
        <h2 class="text-middle mb-4 text-center">Informasi Ujian</h2>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="text-sm text-slate-500">Nama Soal</span>
            <span class="text-middle">{{ jadwal.nama_soal }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-slate-500">Waktu Pengerjaan</span>
            <span class="text-middle">{{ jadwal.waktu }} Menit</span>
          </div>
        </div>
      </div>

      <!-- Input Token -->
      <div>
        <label for="token-input" class="block text-middle mb-2">
          Masukkan Token
        </label>
        <input
          id="token-input"
          v-model="token"
          :type="isVerified ? 'password' : 'text'"
          placeholder="Contoh: AV2FKE"
          class="w-full px-2 py-1 rounded-lg border border-sky-300 transition focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
          :class="{
            'border-red-500': message && !success,
            'bg-gray-100 cursor-not-allowed text-gray-500': isVerified,
          }"
          :disabled="isVerified"
          @keyup.enter="submitToken" />

        <!-- Pesan Validasi -->
        <p
          v-if="message"
          class="mt-2 text-sm"
          :class="success ? 'text-green-600' : 'text-red-500'">
          {{ message }}
        </p>
      </div>

      <!-- Tombol Submit / Mulai -->
      <button
        @click="isVerified ? startTest() : submitToken()"
        :disabled="loading || (!token.trim() && !isVerified)"
        class="w-full flex items-center justify-center gap-2 font-semibold px-6 py-3 mb-5 rounded-lg transition"
        :class="isVerified ? 'btn-green' : 'btn-primary'">
        <span v-if="loading && !isVerified" class="flex items-center gap-2">
          <span
            class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          Memverifikasi...
        </span>
        <span v-else>{{ isVerified ? "Mulai" : "Submit" }}</span>
      </button>
    </div>
  </div>
  <!-- <pre>{{ tokenStore.activeResult?.data?.soal_generate }}</pre> -->
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useTokenStore } from "../../stores/tokenStore";
import { useHomeStore } from "../../stores/homeStore";
import BackIcon from "../../assets/icons/BackIcon.svg";
import Swal from "sweetalert2";

const props = defineProps({
  pesertaId: Number,
  kdMasterEvent: Number,
  event: Object,
  jadwal: Object,
});

const emit = defineEmits(["back", "to-test"]);

const homeStore = useHomeStore();
const tokenStore = useTokenStore();
const { loading } = storeToRefs(tokenStore);

const token = ref("");
const message = ref("");
const success = ref(false);
const isVerified = ref(false);

// Get jadwal dari home store
const jadwal = ref({
  kd_jenis: homeStore.selectedJadwal?.kd_jenis,
  nama_soal: homeStore.selectedJadwal?.ijin_nama,
  waktu: homeStore.selectedJadwal?.waktu,
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
    isVerified.value = true; // tombol berubah jadi "Mulai"
  }
};

async function startTest() {
  const result = await Swal.fire({
    title: "Siap ikut ujian?",
    text: "Pastikan kamu sudah siap sebelum mulai.",
    showCancelButton: true,
    confirmButtonText: "Ya, Mulai",
    cancelButtonText: "Batal",
    confirmButtonColor: "#2e79b7",
    cancelButtonColor: "#d33",
    background: "#f9fafb",
  });

  if (result.isConfirmed) {
    emit("to-test");
  }
}
</script>
