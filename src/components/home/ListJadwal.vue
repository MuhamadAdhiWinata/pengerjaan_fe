<template>
  <header class="header-primary flex items-center justify-between p-4 mb-4">
    <!-- Back Button -->
    <button
      class="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition"
      @click="handleBack">
      <img :src="BackIcon" alt="Back" class="w-6 h-6" />
    </button>

    <!-- Title -->
    <h1 class="text-header">Program Minggu (PM)</h1>

    <!-- Spacer / bisa isi action lain -->
    <div class="w-6"></div>
  </header>

  <!-- Loading State -->
  <div v-if="loading && jadwals.length === 0" class="text-center p-8">
    <p>Memuat jadwal...</p>
  </div>

  <!-- Error State -->
  <div v-else-if="error" class="text-center p-8 text-red-500">
    <p>{{ error }}</p>
    <button
      @click="loadJadwals"
      class="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600">
      Coba Lagi
    </button>
  </div>

  <!-- Empty State -->
  <div v-else-if="jadwals.length === 0" class="text-center p-8">
    <p>Belum ada jadwal tersedia...</p>
  </div>

  <!-- Jadwal List -->
  <div
    v-for="(jadwal, index) in jadwals"
    :key="jadwal.kd_ijin"
    class="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white rounded-lg p-4 border border-gray-200 shadow-sm gap-3 mb-2">
    <!-- Info -->
    <div class="flex-1">
      <p class="text-base font-medium mb-1">
        {{ index + 1 }}. {{ jadwal.ijin_nama }}
      </p>
      <p class="text-sm text-gray-500">{{ event?.nama_event }}</p>
    </div>

    <!-- Action -->
    <div class="mt-2 sm:mt-0 sm:ml-4">
      <button
        v-if="jadwal.status_akm === 4"
        class="btn-green w-full sm:w-auto"
        disabled>
        Terimakasih telah menyelesaikan CBT
      </button>

      <button
        v-else
        @click="handleMulaiTes(jadwal)"
        class="btn-primary w-full sm:w-auto">
        Mulai! (Durasi tes {{ jadwal.waktu }} menit)
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useJadwalStore } from "../../stores/jadwalStore";
import { useHomeStore } from "../../stores/homeStore";
import BackIcon from "../../assets/icons/BackIcon.svg";

const props = defineProps({
  pesertaId: {
    type: Number,
    required: true,
  },
  kdMasterEvent: {
    type: [Number, String],
    required: true,
  },
  event: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["back", "to-token"]);

const jadwalStore = useJadwalStore();
const homeStore = useHomeStore();
const { loading, error } = storeToRefs(jadwalStore);
const jadwals = ref([]);

onMounted(() => {
  loadJadwals();
});

const loadJadwals = async () => {
  jadwals.value = await jadwalStore.fetchJadwals(
    props.pesertaId,
    props.kdMasterEvent
  );
};

const handleBack = () => {
  emit("back");
};

const handleMulaiTes = (jadwal) => {
  jadwalStore.setSelected(jadwal);
  homeStore.setSelectedJadwal(jadwal);
  emit("to-token");
};
</script>
