<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Daftar Event</h1>

    <!-- Loading -->
    <p v-if="loading" class="text-gray-500">Memuat data...</p>

    <!-- Error -->
    <p v-if="error" class="text-red-500">{{ error }}</p>

    <!-- List event -->
    <div
      v-if="events.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="event in events"
        :key="event.kd"
        class="bg-white shadow-md rounded-lg p-4 border-2 hover:shadow-lg transition">
        <h2 class="font-semibold text-lg">{{ event.nama_event }}</h2>
        <p class="text-gray-600">Tanggal: {{ event.tgl_pelaksanaan }}</p>
        <p class="text-sm mt-2">
          Status:
          <span :class="event.status_aktif ? 'text-green-600' : 'text-red-600'">
            {{ event.status_aktif ? "Aktif" : "Tidak Aktif" }}
          </span>
        </p>
        <p class="text-sm">
          Peserta:
          <span
            :class="event.status_peserta ? 'text-blue-600' : 'text-gray-600'">
            {{ event.status_peserta ? "Terdaftar" : "Belum Terdaftar" }}
          </span>
        </p>
      </div>
    </div>

    <!-- Jika kosong -->
    <p v-else-if="!loading && !error" class="text-gray-500">
      Belum ada event tersedia.
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const events = ref([]);
const loading = ref(false);
const error = ref(null);

const pesertaId = 293958;

const fetchEvents = async () => {
  loading.value = true;
  error.value = null;
  try {
    const res = await axios.get(
      `http://new_pengerjaan.test/api/peserta/${pesertaId}/events`
    );
    events.value = res.data.data.events; // ambil dari data.events
  } catch (err) {
    error.value = "Gagal memuat data event.";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchEvents);
</script>
