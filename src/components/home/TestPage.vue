<template>
  <div class="test-container">
    <!-- Back Button -->
    <button class="back-button" @click="handleBack">
      <img :src="BackIcon" alt="Back" class="back-icon" />
      <span>Kembali</span>
    </button>

    <div class="test-content">
      <h2 class="section-title">Halaman Tes</h2>

      <!-- Test Info -->
      <div class="test-info">
        <p>
          Anda sedang mengerjakan: <strong>{{ jadwal?.ijin_nama }}</strong>
        </p>
        <p>
          Durasi: <strong>{{ jadwal?.waktu }} menit</strong>
        </p>
        <p>
          Event: <strong>{{ event?.nama_event }}</strong>
        </p>
      </div>

      <!-- Timer -->
      <div class="timer-section">
        <h3>Waktu Tersisa</h3>
        <div class="timer">{{ formatTime(timeLeft) }}</div>
      </div>

      <!-- Test Content -->
      <div class="test-questions">
        <p>Soal-soal tes akan ditampilkan di sini...</p>
        <!-- Implement your test questions component here -->
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <button class="submit-test-button">Submit Tes</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import { useHomeStore } from "../../stores/homeStore";
import BackIcon from "../../assets/icons/BackIcon.svg";

const emit = defineEmits(["back"]);

const homeStore = useHomeStore();
const { selectedEvent: event, selectedJadwal: jadwal } = storeToRefs(homeStore);

const timeLeft = ref(jadwal.value?.waktu * 60 || 0); // Convert to seconds
let timerInterval = null;

onMounted(() => {
  // Start the timer
  timerInterval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      clearInterval(timerInterval);
      // Handle time's up logic here
    }
  }, 1000);
});

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
});

const handleBack = () => {
  emit("back");
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
};
</script>

<style scoped>
.test-container {
  padding: 1rem;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  color: #3b82f6;
  background: none;
  border: none;
  cursor: pointer;
}

.back-icon {
  width: 1.75rem;
  height: 1.75rem;
}

.test-content {
  background: white;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #1f2937;
}

.test-info {
  background: #f8fafc;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.test-info p {
  margin: 0.5rem 0;
}

.timer-section {
  text-align: center;
  margin-bottom: 2rem;
}

.timer-section h3 {
  font-size: 1rem;
  color: #64748b;
  margin-bottom: 0.5rem;
}

.timer {
  font-size: 2.5rem;
  font-weight: bold;
  color: #ef4444;
  font-family: monospace;
}

.test-questions {
  padding: 1.5rem;
  background: #f1f5f9;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.action-buttons {
  text-align: center;
}

.submit-test-button {
  background: linear-gradient(to right, #16a34a, #15803d);
  color: white;
  font-weight: 600;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-test-button:hover {
  filter: brightness(110%);
}

.submit-test-button:active {
  filter: brightness(90%);
}
</style>
