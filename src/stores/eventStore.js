// stores/eventStore.js
import { defineStore } from "pinia";
import { getEventsByPeserta } from "../services/eventService";

export const useEventStore = defineStore("event", {
  state: () => ({
    eventsByPeserta: {},
    loading: false,
    error: null,
  }),
  getters: {
    getEventsByPesertaId: (state) => (pesertaId) => {
      return state.eventsByPeserta[pesertaId] || [];
    },
  },
  actions: {
    async fetchEvents(pesertaId) {
      if (this.eventsByPeserta[pesertaId]) {
        return this.eventsByPeserta[pesertaId];
      }

      this.loading = true;
      this.error = null;

      try {
        const events = await getEventsByPeserta(pesertaId);
        this.eventsByPeserta[pesertaId] = events;
        return events;
      } catch (err) {
        console.error("EventStore Error:", err);
        this.error = "Gagal memuat data event.";
        return [];
      } finally {
        this.loading = false;
      }
    },
    clearCache() {
      this.eventsByPeserta = {};
    },
  },
});
