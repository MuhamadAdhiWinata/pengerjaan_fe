import api from "./api";

export async function submitJawaban(kd, payload) {
  try {
    const { data } = await api.post(`/jawaban/submit/${kd}`, payload);
    return data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Gagal submit jawaban",
      error,
    };
  }
}
