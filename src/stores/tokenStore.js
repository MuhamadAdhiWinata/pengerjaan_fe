// stores/tokenStore.js
import { defineStore } from "pinia";
import { validateJenisKode } from "../services/tokenService";

export const useTokenStore = defineStore("token", {
  state: () => ({
    tokensByKey: {},
    loading: false,
    error: null,
  }),
  actions: {
    async verifyToken(kdJenis, kode) {
      const key = `${kdJenis}-${kode}`;

      if (this.tokensByKey[key]) {
        return this.tokensByKey[key];
      }

      this.loading = true;
      this.error = null;

      try {
        const result = await validateJenisKode(kdJenis, kode);
        this.tokensByKey[key] = result;
        return result;
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
    },
  },
});
