<template>
  <div v-if="soal" class="max-w-3xl mx-auto p-6">
    <!-- Header -->
    <!-- <h1 class="text-2xl font-bold">{{ soal.jenis }}</h1>
    <p class="text-gray-500">Waktu: {{ soal.waktu }} menit</p> -->

    <!-- Soal -->
    <div class="mt-6">
      <p class="font-semibold mb-4">
        Soal {{ currentIndex + 1 }} dari
        {{ soal.soal_generate.questions.length }}
      </p>
      <p class="mb-4">{{ currentQuestion.question }}</p>

      <!-- Multiple Choice -->
      <MultipleChoiceQuestion
        v-if="currentQuestion.type === 'multiple_choice'"
        :question="currentQuestion"
        v-model="userAnswers[currentQuestion.id]" />

      <!-- Essay -->
      <EssayQuestion
        v-else-if="currentQuestion.type === 'essay'"
        :question="currentQuestion"
        v-model="userAnswers[currentQuestion.id]" />

      <!-- Checkbox -->
      <CheckboxQuestion
        v-else-if="currentQuestion.type === 'checkbox'"
        :question="currentQuestion"
        v-model="userAnswers[currentQuestion.id]" />

      <!-- Fill in the blank -->
      <FillBlankQuestion
        v-else-if="currentQuestion.type === 'fillblank'"
        :question="currentQuestion"
        v-model="userAnswers[currentQuestion.id]" />

      <!-- Matching -->
      <MatchingQuestion
        v-else-if="currentQuestion.type === 'matching'"
        :question="currentQuestion"
        v-model="userAnswers[currentQuestion.id]" />
    </div>

    <!-- Navigation -->
    <div class="flex justify-between mt-6">
      <button
        class="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        :disabled="currentIndex === 0"
        @click="currentIndex--">
        Sebelumnya
      </button>
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded"
        @click="currentIndex++"
        :disabled="currentIndex === soal.soal_generate.questions.length - 1">
        Selanjutnya
      </button>
    </div>

    <!-- Debug -->
    <pre class="mt-6 bg-gray-100 p-3 rounded">
      {{ userAnswers }}
    </pre>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useSoalStore } from "../stores/soalStore";

import MatchingQuestion from "../components/soal/MatchingQuestion.vue";
import MultipleChoiceQuestion from "../components/soal/MultipleChoiceQuestion.vue";
import EssayQuestion from "../components/soal/EssayQuestion.vue";
import CheckboxQuestion from "../components/soal/CheckboxQuestion.vue";
import FillBlankQuestion from "../components/soal/FillBlankQuestion.vue";

const jenisId = 1445; // nanti bisa ambil dari route params
const soalStore = useSoalStore();
// console.log(soalStore.cache);

const currentIndex = ref(0);
const userAnswers = ref({});

// ambil dari cache via getter (reactive)
const soal = computed(() => soalStore.getSoal(jenisId));

onMounted(async () => {
  // akan fetch hanya jika belum ada / TTL expired / force=true
  await soalStore.fetchSoal(jenisId);
});

const currentQuestion = computed(() => {
  if (!soal.value) return null;
  return soal.value.soal_generate?.questions?.[currentIndex.value];
});
</script>
