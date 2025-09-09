<template>
  <div class="bg-slate-300 min-h-screen">
    <HeaderSoal />
    <div v-if="!showFullReview">
      <div v-if="soal && currentQuestion" class="max-w-4xl mx-auto px-6 py-8">
        <!-- Progress & Nomor Soal -->
        <div
          class="flex items-center justify-between bg-white shadow-md rounded-xl px-4 md:px-6 py-3 mb-6 border border-gray-200 flex-wrap gap-3">
          <p
            class="text-gray-700 font-semibold tracking-wide text-sm md:text-base">
            Soal <span class="text-brand">{{ currentIndex + 1 }}</span> /
            {{ soal.soal_generate.questions.length }}
          </p>

          <!-- Timer + Button wrapper -->
          <div class="flex items-center gap-3">
            <div
              class="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 shadow-sm text-sm font-medium">
              <TimeIcon class="w-4 h-4 text-gray-600" />
              <span class="hidden sm:inline text-gray-600">Sisa waktu :</span>
              <span class="text-red-500 font-bold">{{ formattedTime }}</span>
            </div>
            <button
              class="btn-primary px-3 py-2 shadow-md flex items-center gap-1"
              @click="showReview = true">
              <DraftIcon class="w-4 h-4" />
              <span>DAFTAR SOAL</span>
            </button>
          </div>
        </div>

        <!-- Soal -->
        <div class="mid-container p-6 mb-8">
          <p class="text-questions mb-4">{{ currentQuestion.question }}</p>

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

        <!-- Navigation -->
        <div class="flex flex-wrap items-center justify-between mt-6 gap-2">
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
          <!-- Selanjutnya / Selesai -->
          <button
            v-if="currentIndex < soal.soal_generate.questions.length - 1"
            class="btn btn-primary flex items-center gap-2 font-bold text-xs sm:text-sm px-3 py-2 sm:px-5 sm:py-3"
            @click="currentIndex++">
            Selanjutnya
          </button>
          <button
            v-else
            class="btn btn-green flex items-center gap-2 font-bold text-xs sm:text-sm px-3 py-2 sm:px-5 sm:py-3"
            @click="goToReviewPage">
            Selesai
          </button>
        </div>
      </div>
      <!-- <pre>{{ jawabanStore.answers }}</pre> -->
      <!-- <pre>{{ jawaban.kd }}</pre> -->
    </div>

    <div v-else>
      <!-- full review page -->
      <div class="bg-slate-100 min-h-screen p-6">
        <div class="flex flex-wrap items-center justify-between">
          <h1 class="text-2xl font-bold mb-6">Review Jawaban</h1>
          <div
            class="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 shadow-sm text-sm font-medium">
            <TimeIcon class="w-4 h-4 text-gray-600" />
            <span class="hidden sm:inline text-gray-600">Sisa waktu :</span>
            <span class="text-red-500 font-bold">{{ formattedTime }}</span>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-4">
          <!-- di review button -->
          <button
            v-for="(q, i) in soal.soal_generate.questions"
            :key="i"
            @click="
              goToSoal(i);
              backToSoal();
            "
            class="flex flex-col items-center justify-center px-3 py-4 rounded-lg border text-sm transition"
            :class="
              getAnswerClass(currentIndex, i, userAnswers, q.id, raguRagu, true)
            ">
            <span class="text-sm font-bold">Soal {{ i + 1 }}</span>
            <span class="text-xs mt-1">
              {{
                getAnswerStatus(
                  currentIndex,
                  i,
                  userAnswers,
                  q.id,
                  raguRagu,
                  true
                )
              }}
            </span>
          </button>
        </div>

        <div class="w-50 px-2 py-4 text-sm font-semibold">
          <div class="flex justify-between">
            <span>Jumlah Soal</span>
            <span>: {{ soal.soal_generate.questions.length }}</span>
          </div>
          <div class="flex justify-between">
            <span>Dijawab</span>
            <span>: {{ totalAnswered }}</span>
          </div>
          <div class="flex justify-between">
            <span>Ragu-ragu</span>
            <span>: {{ totalRagu }}</span>
          </div>
          <div class="flex justify-between">
            <span>Belum Dikerjakan</span>
            <span>: {{ totalNotAnswered }}</span>
          </div>
        </div>

        <!-- Navigation -->
        <div class="mt-6 flex justify-between gap-2">
          <button
            class="btn btn-secondary flex items-center gap-2 font-bold text-xs sm:text-sm px-3 py-2 sm:px-5 sm:py-3"
            @click="backToSoal">
            Kembali ke Soal
          </button>

          <button
            class="btn btn-primary flex items-center gap-2 font-bold text-xs sm:text-sm px-3 py-2 sm:px-5 sm:py-3"
            @click="submitUjian">
            Submit Jawaban
          </button>
        </div>
      </div>
    </div>

    <!-- Review Modal -->
    <ReviewModal v-model="showReview" v-if="soal">
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
import { ref, onMounted, computed, onBeforeUnmount } from "vue";
import { storeToRefs } from "pinia";
import { useTokenStore } from "../stores/tokenStore";
import { useStatusStore } from "../stores/statusStore";
import { useJawabanStore } from "../stores/jawabanStore";
import {
  isAnswered,
  getAnswerStatus,
  getAnswerClass,
} from "../helpers/soalHelpers";

import MatchingQuestion from "../components/soal/MatchingQuestion.vue";
import MultipleChoiceQuestion from "../components/soal/MultipleChoiceQuestion.vue";
import EssayQuestion from "../components/soal/EssayQuestion.vue";
import CheckboxQuestion from "../components/soal/CheckboxQuestion.vue";
import FillBlankQuestion from "../components/soal/FillBlankQuestion.vue";
import HeaderSoal from "../components/soal/HeaderSoal.vue";
import ReviewModal from "../components/soal/ReviewModal.vue";

import DraftIcon from "../assets/icons/DraftIcon.svg";
import TimeIcon from "../assets/icons/TimeIcon.svg";

const currentIndex = ref(0);
const raguRagu = ref({});
const showReview = ref(false);
const showFullReview = ref(false);

//status pengerjaan
const statusStore = useStatusStore();
const { jawaban } = storeToRefs(statusStore);

//soal
const tokenStore = useTokenStore();
const soal = computed(() => tokenStore.activeResult?.data || null);
const currentQuestion = computed(() => {
  if (!soal.value) return null;
  return soal.value.soal_generate?.questions?.[currentIndex.value];
});

//submit jawaban
const jawabanStore = useJawabanStore();
const userAnswers = jawabanStore?.answers;

const totalAnswered = computed(() => {
  return (
    soal.value?.soal_generate.questions.filter(
      (q) => isAnswered(userAnswers[q.id]) && !raguRagu.value[q.id]
    ).length || 0
  );
});

const totalRagu = computed(() => {
  return (
    soal.value?.soal_generate.questions.filter((q) => raguRagu.value[q.id])
      .length || 0
  );
});

const totalNotAnswered = computed(() => {
  if (!soal.value) return 0;
  return (
    soal.value.soal_generate.questions.length -
    totalAnswered.value -
    totalRagu.value
  );
});

onMounted(() => {
  tokenStore.loadFromStorage();
  statusStore.startTimer();
});

onBeforeUnmount(() => {
  statusStore.stopTimer();
});

const formattedTime = computed(() => {
  const sisa = jawaban.value?.sisa || 0;
  const m = String(Math.floor(sisa / 60)).padStart(2, "0");
  const s = String(sisa % 60).padStart(2, "0");
  return `${m}:${s}`;
});

function goToSoal(i) {
  currentIndex.value = i;
  showReview.value = false;
}

function toggleRagu(qId) {
  raguRagu.value[qId] = !raguRagu.value[qId];
}

function goToReviewPage() {
  showFullReview.value = true;
}

function backToSoal() {
  showFullReview.value = false;
}

async function submitUjian() {
  const kd = jawaban.value?.kd; // pastikan ini ada
  if (!kd) {
    console.error("kd ujian tidak ditemukan");
    return;
  }

  const res = await jawabanStore.submit(kd);
  console.log("Response API:", res);
}
</script>
