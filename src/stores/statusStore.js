// stores/statusStore.js
import { defineStore } from "pinia";

export const useStatusStore = defineStore("status", {
  state: () => ({
    status: null,
    jawaban: null,
    timerInterval: null,
  }),
  actions: {
    setStatusUji({ status, jawaban }) {
      this.status = status;
      // ubah sisa jadi detik kalau masih dalam menit
      const waktu = Number(jawaban.sisa || jawaban.waktu);
      this.jawaban = {
        ...jawaban,
        // kalau angkanya masih kecil berarti menit, kalikan 60
        sisa: waktu > 3600 ? waktu : waktu * 60,
      };
    },
    startTimer() {
      if (!this.jawaban) return;
      if (this.timerInterval) clearInterval(this.timerInterval);

      this.timerInterval = setInterval(() => {
        if (this.jawaban.sisa > 0) {
          this.jawaban.sisa--;
        } else {
          clearInterval(this.timerInterval);
          this.status = "expired";
        }
      }, 1000);
    },
    stopTimer() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
    },
    clear() {
      this.stopTimer();
      this.status = null;
      this.jawaban = null;
    },
  },
  persist: true,
});
