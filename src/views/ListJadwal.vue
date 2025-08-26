<template>
  <button class="flex items-center gap-2">
    <img :src="BackIcon" alt="Back" class="w-7 h-7" />
  </button>
  <div class="p-6">
    <h2 class="text-xl font-bold mb-4">Program Minggu (PM)</h2>

    <!-- List Jadwal -->
    <div v-for="(jadwal, index) in jadwals" :key="jadwal.kd_ijin" class="mb-3">
      <div
        class="flex justify-between items-center bg-white shadow rounded p-3">
        <!-- Keterangan Jadwal -->
        <div>
          <p class="font-semibold">{{ index + 1 }}. {{ jadwal.ijin_nama }}</p>
          <p class="text-sm text-gray-600">({{ jadwal.kd_master_event }})</p>
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

          <!-- Belum dibuka -->
          <button
            v-else-if="new Date() < new Date(jadwal.mulai)"
            class="px-12 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 text-white text-xs font-semibold py-2 rounded-lg shadow mx-auto block cursor-not-allowed"
            disabled>
            Belum dibuka
          </button>

          <!-- Sudah lewat -->
          <button
            v-else-if="new Date() > new Date(jadwal.selesai)"
            class="px-12 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white text-xs font-semibold py-2 rounded-lg shadow mx-auto block cursor-not-allowed"
            disabled>
            Jadwal sudah lewat
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
import { getJadwalJenis } from "../services/jadwalService";
import BackIcon from "../assets/icons/BackIcon.svg";

const pesertaId = 293958;
const kdMasterEvent = 2373;

const jadwals = ref([]);

onMounted(async () => {
  jadwals.value = await getJadwalJenis(pesertaId, kdMasterEvent);
});

const mulaiTes = (jadwal) => {
  // logic pindah halaman ke pengerjaan soal
  console.log("Mulai tes:", jadwal);
};
</script>
