import api from "./api";

export const validateJenisKode = async (kdJenis, kode) => {
  try {
    const res = await api.post("/validate-jenis-kode", {
      kd_jenis: kdJenis,
      kode,
    });

    return {
      success: res.data.success || false,
      message: res.data.message || "Terjadi kesalahan",
      data: res.data.data || {},
    };
  } catch (error) {
    console.error("Error validating token:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Gagal validasi TOKEN",
      data: {},
    };
  }
};
