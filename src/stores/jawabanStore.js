import { defineStore } from "pinia";
import { submitJawaban } from "../services/jawabanService";

export const useJawabanStore = defineStore("jawaban", {
  state: () => ({
    answers: {}, // { [questionId]: value }
    loading: false,
    lastResponse: null,
  }),
  actions: {
    setAnswer(questionId, value) {
      this.answers[questionId] = value;
    },
    async submit(kd) {
      this.loading = true;
      try {
        const res = await submitJawaban(kd, this.answers);
        this.lastResponse = res;
        return res;
      } finally {
        this.loading = false;
      }
    },
    clear() {
      this.answers = {};
      this.lastResponse = null;
    },
  },
  persist: true,
});
