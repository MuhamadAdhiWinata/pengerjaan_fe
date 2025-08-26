// stores/homeStore.js
import { defineStore } from "pinia";

export const useHomeStore = defineStore("home", {
  state: () => ({
    view: "ListEvent",
    selectedEvent: null,
  }),
});
