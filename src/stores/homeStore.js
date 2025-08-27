// stores/homeStore.js
import { defineStore } from "pinia";

export const useHomeStore = defineStore("home", {
  state: () => ({
    view: "ListEvent",
    selectedEvent: null,
    selectedJadwal: null,
  }),
  actions: {
    setView(view) {
      if (["ListEvent", "ListJadwal", "Token", "TestPage"].includes(view)) {
        this.view = view;
      }
    },
    setSelectedEvent(event) {
      this.selectedEvent = event;
    },
    setSelectedJadwal(jadwal) {
      this.selectedJadwal = jadwal;
    },
    navigateBack() {
      const navigationFlow = {
        TestPage: "Token",
        Token: "ListJadwal",
        ListJadwal: "ListEvent",
        ListEvent: "ListEvent",
      };
      this.view = navigationFlow[this.view];
    },
  },
});
