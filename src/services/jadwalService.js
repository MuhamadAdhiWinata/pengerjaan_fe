import api from "./api";

export const getJadwalJenis = async (pesertaId, kdMasterEvent) => {
  try {
    const res = await api.get(
      `/peserta/${pesertaId}/event/${kdMasterEvent}/jadwal-jenis`
    );
    return res.data.data.jadwals;
  } catch (error) {
    console.error("Error fetching jadwal:", error);
    throw new Error("Gagal mengambil data jadwal");
  }
};
