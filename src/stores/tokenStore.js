// stores/tokenStore.js
import { defineStore } from "pinia";
import { validateJenisKode } from "../services/tokenService";

const safeParse = (v) => {
  if (typeof v !== "string") return v;
  try {
    return JSON.parse(v);
  } catch {
    return v;
  }
};

export const useTokenStore = defineStore("token", {
  state: () => ({
    tokensByKey: {},
    activeResult: null,
    loading: false,
    error: null,
  }),
  actions: {
    async verifyToken(kdJenis, kode) {
      const key = `${kdJenis}-${kode}`;

      // kalau sudah ada di cache store
      if (this.tokensByKey[key]) {
        this.activeResult = this.tokensByKey[key];
        return this.tokensByKey[key];
      }

      this.loading = true;
      this.error = null;

      try {
        const result = await validateJenisKode(kdJenis, kode);
        const rawData = result?.data || {};

        const parsedData = {
          ...rawData,
          soal_generate: safeParse(rawData.soal_generate),
        };

        const finalResult = { ...result, data: parsedData };

        this.tokensByKey[key] = finalResult;
        this.activeResult = finalResult;

        // 🔹 simpan ke localStorage
        localStorage.setItem("soalResult", JSON.stringify(finalResult));

        return finalResult;
      } catch (err) {
        console.error("TokenStore Error:", err);
        this.error = "Gagal memverifikasi token.";
        return { success: false, message: this.error };
      } finally {
        this.loading = false;
      }
    },

    // 🔹 load ulang dari localStorage saat refresh
    loadFromStorage() {
      const saved = localStorage.getItem("soalResult");
      if (saved) {
        try {
          this.activeResult = JSON.parse(saved);
        } catch (err) {
          console.error("❌ Gagal parse soalResult:", err);
          this.activeResult = null;
        }
      }
    },

    clearCache() {
      this.tokensByKey = {};
      this.activeResult = null;
      localStorage.removeItem("soalResult");
    },
  },
});
