<template>
  <div class="bg-slate-300 min-h-screen">
    <HeaderSoal />

    <div v-if="soal" class="max-w-4xl mx-auto px-6 py-8">
      <!-- Progress & Nomor Soal -->
      <div
        class="flex items-center justify-between bg-white shadow-sm rounded-xl px-6 py-4 mb-6 border border-gray-100">
        <p class="text-gray-600 font-semibold tracking-wide">
          Soal <span class="text-brand">{{ currentIndex + 1 }}</span> /
          {{ soal.soal_generate.questions.length }}
        </p>
        <span
          class="btn-primary font-semibold text-sm inline-flex items-center justify-center px-4 py-1">
          Nomor {{ currentIndex + 1 }}
        </span>
      </div>

      <!-- Pertanyaan -->
      <div class="mid-container p-6 mb-8">
        <p class="text-questions mb-4">{{ currentQuestion.question }}</p>

        <!-- Jenis Soal -->
        <MultipleChoiceQuestion
          v-if="currentQuestion.type === 'multiple_choice'"
          :question="currentQuestion"
          v-model="userAnswers[currentQuestion.id]" />
        <EssayQuestion
          v-else-if="currentQuestion.type === 'essay'"
          :question="currentQuestion"
          v-model="userAnswers[currentQuestion.id]" />
        <CheckboxQuestion
          v-else-if="currentQuestion.type === 'checkbox'"
          :question="currentQuestion"
          v-model="userAnswers[currentQuestion.id]" />
        <FillBlankQuestion
          v-else-if="currentQuestion.type === 'fillblank'"
          :question="currentQuestion"
          v-model="userAnswers[currentQuestion.id]" />
        <MatchingQuestion
          v-else-if="currentQuestion.type === 'matching'"
          :question="currentQuestion"
          v-model="userAnswers[currentQuestion.id]" />
      </div>

      <!-- Navigation Buttons -->
      <div class="flex items-center justify-between mt-6">
        <button
          class="btn btn-secondary flex items-center gap-2 text-sm font-bold"
          :disabled="currentIndex === 0"
          @click="currentIndex--">
          Soal Sebelumnya
        </button>

        <button
          class="btn btn-primary flex items-center gap-2 text-sm font-bold"
          @click="currentIndex++"
          :disabled="currentIndex === soal.soal_generate.questions.length - 1">
          Soal Selanjutnya
        </button>
      </div>
    </div>
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
import HeaderSoal from "../components/soal/HeaderSoal.vue";

const jenisId = 1445;
const soalStore = useSoalStore();
// console.log(soalStore.cache);

const currentIndex = ref(0);
const userAnswers = ref({});

const soal = computed(() => soalStore.getSoal(jenisId));

onMounted(async () => {
  await soalStore.fetchSoal(jenisId);
});

const currentQuestion = computed(() => {
  if (!soal.value) return null;
  return soal.value.soal_generate?.questions?.[currentIndex.value];
});
</script>
