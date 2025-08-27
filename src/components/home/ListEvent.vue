<template>
  <div class="list-event-container">
    <!-- Header Section -->
    <header class="event-header">
      <h1>Daftar CBT yang bisa Kamu kerjakan</h1>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <p>Memuat data...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
      <button @click="loadEvents" class="retry-button">Coba Lagi</button>
    </div>

    <!-- Empty State -->
    <div v-else-if="events.length === 0" class="empty-state">
      <p>Belum ada event tersedia...</p>
    </div>

    <!-- Event List -->
    <div v-else class="events-grid">
      <div v-for="event in events" :key="event.kd" class="event-card">
        <p class="program-name">Program Minggu (PM)</p>
        <button class="event-button" @click="handleEventSelect(event)">
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

<style scoped>
.list-event-container {
  padding: 1rem;
}

.event-header {
  background: linear-gradient(to right, #2e79b7, #2b6aa3, #2b5a87);
  color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  text-align: center;
}

.event-header h1 {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}

.events-grid {
  display: grid;
  gap: 1rem;
}

.event-card {
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.program-name {
  color: #374151;
  font-weight: 500;
  margin-bottom: 0.75rem;
}

.event-button {
  background: linear-gradient(to right, #2e79b7, #2b6aa3, #2b5a87);
  color: white;
  font-weight: bold;
  padding: 0.5rem 3rem;
  border-radius: 0.5rem;
  margin: 0 auto;
  display: block;
  transition: all 0.2s;
}

.event-button:hover {
  filter: brightness(110%);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.event-button:active {
  filter: brightness(90%);
}

.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 2rem;
}

.error-state {
  color: #ef4444;
}

.retry-button {
  background: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  margin-top: 0.5rem;
}
</style>
