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
    activeResult: null, // 🔑 hasil terakhir disimpan di sini
    loading: false,
    error: null,
  }),
  actions: {
    async verifyToken(kdJenis, kode) {
      const key = `${kdJenis}-${kode}`;

      if (this.tokensByKey[key]) {
        this.activeResult = this.tokensByKey[key];
        return this.tokensByKey[key];
      }

      this.loading = true;
      this.error = null;

      try {
        const result = await validateJenisKode(kdJenis, kode);

        // ⬇️ perbaikan di sini
        const rawData = result?.data || {};

        const parsedData = {
          ...rawData,
          soal_generate: safeParse(rawData.soal_generate),
        };

        const finalResult = { ...result, data: parsedData };

        this.tokensByKey[key] = finalResult;
        this.activeResult = finalResult;
        console.log("✅ Final Result:", finalResult); // debug
        return finalResult;
      } catch (err) {
        console.error("TokenStore Error:", err);
        this.error = "Gagal memverifikasi token.";
        return { success: false, message: this.error };
      } finally {
        this.loading = false;
      }
    },
    clearCache() {
      this.tokensByKey = {};
      this.activeResult = null;
    },
  },
});
