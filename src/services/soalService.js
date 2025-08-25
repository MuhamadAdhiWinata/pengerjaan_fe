import api from "./api";

export const getSoalByJenis = async (id) => {
  try {
    const response = await api.get(`/jenis/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching soal:", error);
    throw new Error("Gagal mengambil data soal");
  }
};
