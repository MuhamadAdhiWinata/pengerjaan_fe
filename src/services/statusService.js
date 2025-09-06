import api from "./api";

export const getStatusUji = async ({ kd_peserta, kd_ijin, kd_jenis }) => {
  try {
    const res = await api.get(`/peserta/${kd_peserta}/status-uji`, {
      params: { kd_peserta, kd_ijin, kd_jenis },
    });

    return {
      success: res.data.success,
      message: res.data.message,
      data: res.data.data,
    };
  } catch (err) {
    console.error("Error getStatusUji:", err);
    return {
      success: false,
      message: err.response?.data?.message || "Gagal cek status ujian",
      data: null,
    };
  }
};
