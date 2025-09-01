<template>
  <div class="bg-slate-300 min-h-screen">
    <HeaderSoal />

    <div v-if="soal" class="max-w-4xl mx-auto px-6 py-8">
      <!-- Progress & Nomor Soal -->
      <div
        class="flex items-center justify-between bg-white shadow-sm rounded-xl px-6 py-4 mb-6 border border-gray-100">
        <p class="text-gray-600 font-semibold tracking-wide">
          Soal
          <span class="text-brand">{{ currentIndex + 1 }}</span> /
          {{ soal.soal_generate.questions.length }}
        </p>
        <button
          class="btn-primary font-semibold text-sm inline-flex items-center justify-center px-2 py-1"
          @click="showReview = true">
          progress
        </button>
      </div>

      <!-- Soal -->
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

      <!-- Navigation + Ragu-ragu -->
      <div class="flex flex-wrap items-center justify-between mt-6 gap-2">
        <!-- Sebelumnya -->
        <button
          class="btn btn-secondary flex items-center gap-2 font-bold text-xs sm:text-sm px-3 py-2 sm:px-5 sm:py-3"
          :disabled="currentIndex === 0"
          @click="currentIndex--">
          Sebelumnya
        </button>

        <!-- Ragu-ragu -->
        <button
          class="btn bg-yellow-100 flex items-center gap-1 sm:gap-2 font-bold border rounded-lg transition text-xs sm:text-sm px-2 py-1.5 sm:px-4 sm:py-2"
          :class="
            raguRagu[currentQuestion.id]
              ? ' border-yellow-400'
              : ' text-gray-600 border-gray-300'
          "
          @click="toggleRagu(currentQuestion.id)">
          <input
            type="checkbox"
            class="w-3 h-3 sm:w-4 sm:h-4 accent-yellow-500"
            :checked="raguRagu[currentQuestion.id]"
            readonly />
          Ragu-ragu
        </button>

        <!-- Selanjutnya -->
        <button
          class="btn btn-primary flex items-center gap-2 font-bold text-xs sm:text-sm px-3 py-2 sm:px-5 sm:py-3"
          @click="currentIndex++"
          :disabled="currentIndex === soal.soal_generate.questions.length - 1">
          Selanjutnya
        </button>
      </div>
    </div>

    <!-- Review Modal -->
    <ReviewModal v-model="showReview">
      <template #title>Pengerjaan</template>
      <div class="px-5 py-2 border-b">
        <div class="flex items-center justify-between mb-2">
          <p class="text-sm text-gray-600 font-medium">
            {{
              Math.round(
                (Object.keys(userAnswers).length /
                  soal.soal_generate.questions.length) *
                  100
              )
            }}% Selesai
          </p>
          <p class="text-sm text-gray-500">
            {{ Object.keys(userAnswers).length }} /
            {{ soal.soal_generate.questions.length }}
          </p>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            class="bg-brand h-2 rounded-full"
            :style="{
              width:
                (Object.keys(userAnswers).length /
                  soal.soal_generate.questions.length) *
                  100 +
                '%',
            }"></div>
        </div>
      </div>
      <div class="p-5">
        <div class="grid grid-cols-3 gap-4">
          <button
            v-for="(q, i) in soal.soal_generate.questions"
            :key="i"
            @click="goToSoal(i)"
            class="flex flex-col items-center justify-center px-3 py-4 rounded-lg border text-sm transition"
            :class="
              getAnswerClass(currentIndex, i, userAnswers, q.id, raguRagu)
            ">
            <span class="text-sm font-bold">Soal {{ i + 1 }}</span>
            <span class="text-xs mt-1">
              {{
                getAnswerStatus(currentIndex, i, userAnswers, q.id, raguRagu)
              }}
            </span>
          </button>
        </div>
      </div>
    </ReviewModal>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useTokenStore } from "../stores/tokenStore";
import { getAnswerStatus, getAnswerClass } from "../helpers/soalHelpers";

import MatchingQuestion from "../components/soal/MatchingQuestion.vue";
import MultipleChoiceQuestion from "../components/soal/MultipleChoiceQuestion.vue";
import EssayQuestion from "../components/soal/EssayQuestion.vue";
import CheckboxQuestion from "../components/soal/CheckboxQuestion.vue";
import FillBlankQuestion from "../components/soal/FillBlankQuestion.vue";
import HeaderSoal from "../components/soal/HeaderSoal.vue";
import ReviewModal from "../components/soal/ReviewModal.vue";

const currentIndex = ref(0);
const userAnswers = ref({});
const raguRagu = ref({});
const showReview = ref(false);

const tokenStore = useTokenStore();

const soal = computed(() => tokenStore.activeResult?.data || null);

const currentQuestion = computed(() => {
  if (!soal.value) return null;
  return soal.value.soal_generate?.questions?.[currentIndex.value];
});

function goToSoal(i) {
  currentIndex.value = i;
  showReview.value = false;
}

function toggleRagu(qId) {
  raguRagu.value[qId] = !raguRagu.value[qId];
}
</script>
