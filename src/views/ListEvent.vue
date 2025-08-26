<template>
  <div class="p-2">
    <!-- Judul Section -->
    <div
      class="bg-gradient-to-r from-[#2E79B7] via-[#2B6AA3] to-[#2B5A87] text-white text-2xl font-bold px-4 py-2 rounded shadow mb-4">
      Daftar CBT yang bisa Kamu kerjakan
    </div>

    <!-- Loading -->
    <p v-if="loading" class="text-gray-500">Memuat data...</p>

    <!-- Error -->
    <p v-if="error" class="text-red-500">{{ error }}</p>

    <div class="p-2">
      <!-- List Event -->
      <div v-if="events.length > 0" class="space-y-4">
        <div
          v-for="event in events"
          :key="event.kd"
          class="bg-white rounded-lg shadow p-4 border border-gray-200">
          <!-- Nama Program -->
          <p class="text-gray-700 font-medium mb-3">Program Minggu (PM)</p>

          <!-- Tombol Event -->
          <button
            class="px-12 bg-gradient-to-r from-[#2E79B7] via-[#2B6AA3] to-[#2B5A87] hover:brightness-110 active:brightness-90 hover:shadow-lg transition text-white font-bold py-2 rounded-lg shadow mx-auto block">
            {{ event.nama_event }}
          </button>
        </div>
      </div>

      <!-- Jika kosong -->
      <p
        v-else
        class="text-gray-500 flex justify-center items-center text-center">
        Belum ada event tersedia...
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useEventStore } from "../stores/eventStore";

const pesertaId = 293958;
const eventStore = useEventStore();

const events = ref([]);
const loading = ref(false);
const error = ref(null);

onMounted(async () => {
  loading.value = true;
  try {
    events.value = await eventStore.fetchEvents(pesertaId);
  } catch (err) {
    error.value = "Gagal memuat data event.";
  } finally {
    loading.value = false;
  }
});
</script>
