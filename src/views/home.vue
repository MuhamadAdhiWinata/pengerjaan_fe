<template>
  <div>
    <KeepAlive>
      <component
        :is="currentView"
        :peserta-id="pesertaId"
        :kd-master-event="selectedEvent?.kd"
        :event="selectedEvent"
        :jadwal="selectedJadwal"
        @back="handleBack"
        @to-token="goToToken"
        @select-event="handleSelectEvent"
        @to-test="goToTest" />
    </KeepAlive>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useHomeStore } from "../stores/homeStore";
import { useUserStore } from "../stores/userStore";

// Components
import ListEvent from "../components/home/ListEvent.vue";
import ListJadwal from "../components/home/ListJadwal.vue";
import Token from "../components/home/Token.vue";
import TestPage from "../components/home/TestPage.vue";

const router = useRouter();
const homeStore = useHomeStore();
const { view, selectedEvent, selectedJadwal } = storeToRefs(homeStore);

const userStore = useUserStore();
const user = computed(() => userStore.user);
const pesertaId = computed(() => user.value?.kd);

const componentMap = {
  ListEvent,
  ListJadwal,
  Token,
  TestPage,
};

const currentView = computed(() => componentMap[view.value] || ListEvent);

const handleSelectEvent = (event) => {
  homeStore.setSelectedEvent(event);
  homeStore.setView("ListJadwal");
};

const handleBack = () => {
  homeStore.navigateBack();
};

const goToToken = () => {
  homeStore.setView("Token");
};

const goToTest = () => {
  router.push("/soal");
};
</script>

<style scoped></style>
