import api from "./api"; // wrapper axios kamu (kalau udah bikin)

export const getEventsByPeserta = async (pesertaId) => {
  try {
    const res = await api.get(`/peserta/${pesertaId}/events`);
    return res.data.data.events; // return langsung array events
  } catch (error) {
    console.error("Error fetching event:", error);
    throw new Error("Gagal mengambil data event");
  }
};
