import { defineStore } from "pinia";
import { getSoalByJenis } from "../services/soalService";

const safeParse = (v) => {
  if (typeof v !== "string") return v;
  try {
    return JSON.parse(v);
  } catch {
    return v;
  }
};

export const useSoalStore = defineStore("soal", {
  state: () => ({
    // cache per ID: { soal, fetchedAt }
    cache: {}, // { [id]: { soal: {...}, fetchedAt: number } }
  }),

  getters: {
    getSoal: (state) => (id) => state.cache[id]?.soal ?? null,
    isFresh: (state) => (id, ttl) => {
      const e = state.cache[id];
      return !!e && Date.now() - e.fetchedAt < ttl;
    },
  },

  actions: {
    async fetchSoal(id, { force = false, ttl = 5 * 60 * 1000 } = {}) {
      // kalau sudah ada & masih fresh & bukan force → pakai cache
      if (!force && this.isFresh(id, ttl)) return this.cache[id].soal;

      const res = await getSoalByJenis(id);
      const parsed = {
        ...res.data,
        soal_generate: safeParse(res.data?.soal_generate),
      };
      this.cache[id] = { soal: parsed, fetchedAt: Date.now() };
      return parsed;
    },

    clear(id) {
      if (id) delete this.cache[id];
      else this.cache = {};
    },
  },
});
