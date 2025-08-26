<template>
  <KeepAlive>
    <component
      :is="currentView"
      :peserta-id="pesertaId"
      :kd-master-event="selectedEvent?.kd"
      :event="selectedEvent"
      @selectEvent="handleSelectEvent"
      @back="handleBack" />
  </KeepAlive>
</template>

<script setup>
import { computed } from "vue";
import { useHomeStore } from "../stores/homeStore";
import ListEvent from "./ListEvent.vue";
import ListJadwal from "./ListJadwal.vue";

const pesertaId = 293958;
const homeStore = useHomeStore();

const currentView = computed(() => {
  return homeStore.view === "ListEvent" ? ListEvent : ListJadwal;
});

const selectedEvent = computed(() => homeStore.selectedEvent);

const handleSelectEvent = (event) => {
  homeStore.selectedEvent = event;
  homeStore.view = "ListJadwal";
};

const handleBack = () => {
  homeStore.view = "ListEvent";
};
</script>
