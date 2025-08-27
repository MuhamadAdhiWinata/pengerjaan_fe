<template>
  <div class="p-4">
    <!-- Header Section -->
    <header class="header-primary p-4 mb-4">
      <h1 class="text-xl font-bold m-0">Daftar CBT yang bisa Kamu kerjakan</h1>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="text-center p-8">
      <p>Memuat data...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center p-8 text-red-500">
      <p>{{ error }}</p>
      <button
        @click="loadEvents"
        class="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600">
        Coba Lagi
      </button>
    </div>

    <!-- Empty State -->
    <div v-else-if="events.length === 0" class="text-center p-8">
      <p>Belum ada event tersedia...</p>
    </div>

    <!-- Event List -->
    <div v-else class="grid gap-4">
      <div v-for="event in events" :key="event.kd" class="mid-container p-6">
        <p class="text-gray-700 font-medium mb-3">Program Minggu (PM)</p>
        <button
          class="btn-primary px-12 py-2 mx-auto block"
          @click="handleEventSelect(event)">
          {{ event.nama_event }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useEventStore } from "../../stores/eventStore";

const props = defineProps({
  pesertaId: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["select-event"]);

const eventStore = useEventStore();
const { loading, error } = storeToRefs(eventStore);
const events = ref([]);

onMounted(() => {
  loadEvents();
});

const loadEvents = async () => {
  events.value = await eventStore.fetchEvents(props.pesertaId);
};

const handleEventSelect = (event) => {
  emit("select-event", event);
};
</script>
