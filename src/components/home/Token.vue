<template>
  <!-- Back Button -->
  <button class="back-button" @click="handleBack">
    <img :src="BackIcon" alt="Back" class="back-icon" />
  </button>
  <div class="token-container">
    <div class="token-content">
      <h2 class="section-title">Masukkan Token Ujian</h2>

      <!-- Jadwal Info -->
      <div class="jadwal-info-card">
        <div class="info-item">
          <span class="info-label">Nama Soal</span>
          <span class="info-value">{{ jadwal.nama_soal }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Waktu Pengerjaan</span>
          <span class="info-value">{{ jadwal.waktu }} Menit</span>
        </div>
      </div>

      <!-- Token Input -->
      <div class="token-input-group">
        <label for="token-input" class="input-label">Token</label>
        <input
          id="token-input"
          v-model="token"
          type="text"
          placeholder="Masukkan token di sini"
          class="token-input"
          :class="{ 'input-error': message && !success }"
          @keyup.enter="submitToken" />

        <!-- Validation Message -->
        <p
          v-if="message"
          class="validation-message"
          :class="success ? 'success' : 'error'">
          {{ message }}
        </p>
      </div>

      <!-- Submit Button -->
      <button
        @click="submitToken"
        :disabled="loading || !token.trim()"
        class="submit-button">
        <span v-if="loading">
          <span class="button-spinner"></span>
          Memverifikasi...
        </span>
        <span v-else>Submit Token</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useTokenStore } from "../../stores/tokenStore";
import { useHomeStore } from "../../stores/homeStore";
import BackIcon from "../../assets/icons/BackIcon.svg";

const emit = defineEmits(["back", "to-test"]);

const homeStore = useHomeStore();
const tokenStore = useTokenStore();
const { loading } = storeToRefs(tokenStore);

const token = ref("");
const message = ref("");
const success = ref(false);

// Get jadwal from home store
const jadwal = ref({
  kd_jenis: homeStore.selectedJadwal?.kd_jenis || 1445,
  nama_soal: homeStore.selectedJadwal?.ijin_nama || "AKM",
  waktu: homeStore.selectedJadwal?.waktu || 90,
});

const handleBack = () => {
  emit("back");
};

const submitToken = async () => {
  if (!token.value.trim()) {
    message.value = "Masukkan TOKEN dengan benar";
    success.value = false;
    return;
  }

  const result = await tokenStore.verifyToken(
    jadwal.value.kd_jenis,
    token.value
  );

  message.value = result.message;
  success.value = result.success;

  if (result.success) {
    // Navigate to test page on success
    setTimeout(() => {
      emit("to-test");
    }, 1000);
  }
};
</script>

<style scoped>
.token-container {
  padding: 1rem;
  max-width: 500px;
  margin: 0 auto;
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

.token-content {
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

.jadwal-info-card {
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 0.5rem;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-label {
  font-size: 0.875rem;
  color: #64748b;
}

.info-value {
  font-weight: 600;
  color: #1e293b;
}

.token-input-group {
  margin-bottom: 1.5rem;
}

.input-label {
  display: block;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.token-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.token-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.token-input.input-error {
  border-color: #ef4444;
}

.validation-message {
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.validation-message.success {
  color: #16a34a;
}

.validation-message.error {
  color: #ef4444;
}

.submit-button {
  width: 100%;
  background: linear-gradient(to right, #2e79b7, #2b6aa3, #2b5a87);
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.submit-button:hover:not(:disabled) {
  filter: brightness(110%);
}

.submit-button:active:not(:disabled) {
  filter: brightness(90%);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.button-spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
