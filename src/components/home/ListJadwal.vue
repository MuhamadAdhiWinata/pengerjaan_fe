<template>
  <!-- Back Button -->
  <button class="back-button" @click="handleBack">
    <img :src="BackIcon" alt="Back" class="back-icon" />
  </button>
  <div class="list-jadwal-container">
    <div class="jadwal-content">
      <h2 class="section-title">Program Minggu (PM)</h2>

      <!-- Loading State -->
      <div v-if="loading && jadwals.length === 0" class="loading-state">
        <p>Memuat jadwal...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-state">
        <p>{{ error }}</p>
        <button @click="loadJadwals" class="retry-button">Coba Lagi</button>
      </div>

      <!-- Empty State -->
      <div v-else-if="jadwals.length === 0" class="empty-state">
        <p>Belum ada jadwal tersedia...</p>
      </div>

      <!-- Jadwal List -->
      <div v-else class="jadwal-list">
        <div
          v-for="(jadwal, index) in jadwals"
          :key="jadwal.kd_ijin"
          class="jadwal-item">
          <div class="jadwal-info">
            <p class="jadwal-name">{{ index + 1 }}. {{ jadwal.ijin_nama }}</p>
            <p class="event-name">{{ event?.nama_event }}</p>
          </div>

          <div class="jadwal-action">
            <button
              v-if="jadwal.status_akm === 4"
              class="completed-button"
              disabled>
              Terimakasih telah menyelesaikan CBT
            </button>
            <button v-else @click="handleMulaiTes(jadwal)" class="start-button">
              MULAI! (Durasi tes {{ jadwal.waktu }} menit)
            </button>
          </div>
        </div>
      </div>
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

<style scoped>
.list-jadwal-container {
  padding: 0rem;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: #3b82f6;
  background: none;
  border: none;
  cursor: pointer;
}

.back-icon {
  width: 1.75rem;
  height: 1.75rem;
}

.jadwal-content {
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.jadwal-list {
  display: grid;
  gap: 0.75rem;
}

.jadwal-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border-radius: 0.5rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.jadwal-info {
  flex: 1;
}

.jadwal-name {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.event-name {
  font-size: 0.875rem;
  color: #6b7280;
}

.jadwal-action {
  margin-top: 0.5rem;
}

.completed-button {
  background: linear-gradient(to right, #16a34a, #15803d);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  opacity: 0.9;
}

.start-button {
  background: linear-gradient(to right, #2e79b7, #2b6aa3, #2b5a87);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s;
}

.start-button:hover {
  filter: brightness(110%);
}

.start-button:active {
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
