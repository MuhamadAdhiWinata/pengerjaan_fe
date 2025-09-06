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
            <span class="text-middle">{{ namaSoal }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-slate-500">Waktu Pengerjaan</span>
            <span class="text-middle">{{ waktu }} Menit</span>
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
  {{ jawaban }}
</template>

<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useTokenStore } from "../../stores/tokenStore";
import { useStatusStore } from "../../stores/statusStore"; // <-- ini
import { getStatusUji } from "../../services/statusService";
import BackIcon from "../../assets/icons/BackIcon.svg";
import Swal from "sweetalert2";

const props = defineProps({
  pesertaId: Number,
  kdMasterEvent: Number,
  event: Object,
  jadwal: Object,
});

const emit = defineEmits(["back", "to-test", "to-finished", "to-expired"]);

const tokenStore = useTokenStore();
const { loading } = storeToRefs(tokenStore);

const statusStore = useStatusStore(); // <-- ini

const token = ref("");
const message = ref("");
const success = ref(false);
const isVerified = ref(false);

const namaSoal = computed(() => props.jadwal?.ijin_nama);
const waktu = computed(() => props.jadwal?.waktu);

const handleBack = () => emit("back");

const submitToken = async () => {
  if (!token.value.trim()) {
    message.value = "Masukkan TOKEN dengan benar";
    success.value = false;
    return;
  }

  const result = await tokenStore.verifyToken(
    props.jadwal.kd_jenis,
    token.value
  );

  message.value = result.message;
  success.value = result.success;

  if (result.success) {
    isVerified.value = true;
  }
};

async function startTest() {
  const confirm = await Swal.fire({
    title: "Siap ikut ujian?",
    text: "Pastikan kamu sudah siap sebelum mulai.",
    showCancelButton: true,
    confirmButtonText: "Ya, Mulai",
    cancelButtonText: "Batal",
    confirmButtonColor: "#2e79b7",
    cancelButtonColor: "#d33",
    background: "#f9fafb",
  });

  if (!confirm.isConfirmed) return;

  const payload = {
    kd_peserta: props.jadwal.kd_peserta,
    kd_ijin: props.jadwal.kd_ijin,
    kd_jenis: props.jadwal.kd_jenis,
  };

  const res = await getStatusUji(payload);

  if (!res.success) {
    Swal.fire("Error", res.message, "error");
    return;
  }

  const { status, jawaban } = res.data;

  // ✅ isi store + auto start timer
  statusStore.setStatusUji({ status, jawaban });
  statusStore.startTimer();

  switch (status) {
    case "mulai":
    case "lanjut":
      tokenStore.activeResult = { ...tokenStore.activeResult, jawaban };
      emit("to-test");
      break;
    case "selesai":
      emit("to-finished");
      break;
    case "expired":
      emit("to-expired");
      break;
    default:
      Swal.fire("Info", `Status tidak diketahui: ${status}`, "warning");
  }
}
</script>
