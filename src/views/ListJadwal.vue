<template>
  <button class="flex items-center gap-2" @click="$emit('back')">
    <img :src="BackIcon" alt="Back" class="w-7 h-7" />
  </button>
  <div class="p-6">
    <h2 class="text-xl font-bold mb-4">Program Minggu (PM)</h2>

    <!-- Loading -->
    <div
      v-if="jadwalStore.loading && jadwals.length === 0"
      class="text-center py-6">
      <p class="text-gray-500 animate-pulse">Memuat jadwal...</p>
    </div>

    <!-- List Jadwal -->
    <div
      v-else
      v-for="(jadwal, index) in jadwals"
      :key="jadwal.kd_ijin"
      class="mb-3">
      <div
        class="flex justify-between items-center bg-white shadow rounded p-3">
        <!-- Keterangan Jadwal -->
        <div>
          <p class="font-semibold">{{ index + 1 }}. {{ jadwal.ijin_nama }}</p>
          <p class="text-sm text-gray-600">({{ event?.nama_event }})</p>
        </div>

        <!-- Tombol Aksi -->
        <div class="mt-2">
          <!-- Sudah selesai -->
          <button
            v-if="jadwal.status_akm === 4"
            class="px-8 bg-gradient-to-r from-green-600 via-green-600 to-green-700 hover:brightness-110 active:brightness-90 hover:shadow-lg transition text-white text-xs font-semibold py-2 rounded-lg shadow mx-auto block"
            disabled>
            Terimakasih telah menyelesaikan CBT
          </button>

          <!-- Bisa mulai -->
          <button
            v-else
            @click="mulaiTes(jadwal)"
            class="px-12 bg-gradient-to-r from-[#2E79B7] via-[#2B6AA3] to-[#2B5A87] hover:brightness-110 active:brightness-90 hover:shadow-lg transition text-white text-xs font-semibold py-2 rounded-lg shadow mx-auto block">
            MULAI! (Durasi tes {{ jadwal.waktu }} menit)
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useJadwalStore } from "../stores/jadwalStore";
import BackIcon from "../assets/icons/BackIcon.svg";

const emit = defineEmits(["back", "selectEvent"]);

const props = defineProps({
  pesertaId: { type: Number, required: true },
  kdMasterEvent: { type: Number, required: true },
  event: { type: Object, required: true },
});

const jadwals = ref([]);
const jadwalStore = useJadwalStore();

onMounted(async () => {
  jadwals.value = await jadwalStore.fetchJadwals(
    props.pesertaId,
    props.kdMasterEvent
  );
});

const mulaiTes = (jadwal) => {
  console.log("Mulai tes:", jadwal);
};
</script>
