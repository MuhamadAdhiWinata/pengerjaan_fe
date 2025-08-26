import { defineStore } from "pinia";
import { getJadwalJenis } from "../services/jadwalService";

export const useJadwalStore = defineStore("jadwal", {
  state: () => ({
    jadwalsByKey: {},
    loading: false,
    error: null,
  }),
  actions: {
    async fetchJadwals(pesertaId, kdMasterEvent) {
      const key = `${pesertaId}-${kdMasterEvent}`;

      if (this.jadwalsByKey[key]) {
        return this.jadwalsByKey[key];
      }

      this.loading = true;
      this.error = null;

      try {
        const jadwals = await getJadwalJenis(pesertaId, kdMasterEvent);
        this.jadwalsByKey[key] = jadwals;
        return jadwals;
      } catch (err) {
        console.error(err);
        this.error = "Gagal memuat data jadwal.";
        return [];
      } finally {
        this.loading = false;
      }
    },
  },
});
