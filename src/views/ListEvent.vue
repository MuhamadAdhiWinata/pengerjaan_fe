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
      </div>
    </div>

    <!-- Jika kosong -->
    <p v-else-if="!loading && !error" class="text-gray-500">
      Belum ada event tersedia.
    </p>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useEventStore } from "../stores/eventStore";

const pesertaId = 293958;
const eventStore = useEventStore();
const events = ref([]);

onMounted(async () => {
  events.value = await eventStore.fetchEvents(pesertaId);
});
</script>
