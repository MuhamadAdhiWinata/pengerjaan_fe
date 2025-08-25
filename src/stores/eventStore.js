import { defineStore } from "pinia";
import { getEventsByPeserta } from "../services/eventService";

export const useEventStore = defineStore("event", {
  state: () => ({
    eventsByPeserta: {}, // cache per pesertaId
    loading: false,
    error: null,
  }),
  actions: {
    async fetchEvents(pesertaId) {
      // kalau sudah ada cache → langsung balikin
      if (this.eventsByPeserta[pesertaId]) {
        return this.eventsByPeserta[pesertaId];
      }

      this.loading = true;
      this.error = null;
      try {
        const events = await getEventsByPeserta(pesertaId);
        this.eventsByPeserta[pesertaId] = events; // simpan cache
        return events;
      } catch (err) {
        console.error(err);
        this.error = "Gagal memuat data event.";
        return [];
      } finally {
        this.loading = false;
      }
    },
  },
});
