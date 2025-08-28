<template>
  <div class="flex flex-col min-h-screen bg-gray-50 font-sans">
    <!-- Header -->
    <header
      class="nav-header flex items-center justify-between px-6 py-4 shadow-md relative">
      <div class="flex items-center gap-3">
        <img src="../assets/ms logo.jpg" alt="Logo" class="w-9 h-9" />
        <span class="text-xl font-bold tracking-wide"
          >CBT Media <span class="text-yellow-300">Scanter</span></span
        >
      </div>
      <div class="flex items-center gap-5 text-sm">
        <div class="text-right">
          <p class="font-semibold">
            👋 Halo, <span class="text-white">Gege Wepe</span>
          </p>
          <p class="text-xs opacity-90">Peserta Ujian</p>
        </div>
        <div
          class="bg-white text-brand px-4 py-2 rounded-2xl shadow font-bold tracking-wider">
          ⏱ 99:84:01
        </div>
      </div>

      <!-- Progress bar -->
      <div class="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div
          class="h-1 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full transition-all duration-500"
          style="width: 40%"></div>
      </div>
    </header>

    <!-- Content -->
    <main class="flex-1 px-6 py-8 flex justify-center">
      <div class="w-full max-w-4xl space-y-8">
        <!-- Info Soal -->
        <div
          class="mid-container px-6 py-4 flex items-center justify-between shadow-md rounded-xl">
          <span
            class="font-semibold text-gray-600 tracking-wide flex items-center gap-3">
            SOAL NO.
            <span
              class="inline-flex items-center justify-center w-9 h-9 bg-gradient-to-br from-brand to-blue-800 text-white font-bold rounded-full shadow-md ring-2 ring-offset-2 ring-brand/40 animate-in fade-in zoom-in">
              2
            </span>
          </span>
          <span class="text-gray-400 text-sm">Tes Materi #2-1</span>
        </div>

        <!-- Card Soal -->
        <div
          class="mid-container p-8 space-y-6 shadow-lg rounded-2xl hover:shadow-xl transition">
          <p class="text-header">Obat sakit kepala?</p>
          <div class="space-y-4">
            <label
              v-for="(opsi, i) in opsiJawaban"
              :key="i"
              class="flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md hover:bg-blue-50 active:scale-95">
              <input
                type="radio"
                name="jawaban"
                class="w-4 h-4 text-brand"
                :value="opsi"
                v-model="jawaban" />
              <span class="text-gray-700">{{ opsi }}</span>
            </label>
          </div>
        </div>

        <!-- Navigasi Bawah -->
        <div class="flex items-center justify-between">
          <button
            class="btn btn-secondary flex items-center gap-2 rounded-xl shadow-sm active:scale-95">
            ⬅ Soal Sebelumnya
          </button>
          <div class="flex gap-4">
            <button
              class="btn btn-green rounded-xl px-6 py-2 shadow-sm active:scale-95">
              🤔 Ragu-Ragu
            </button>
            <button
              class="btn-primary flex items-center gap-2 rounded-xl px-6 py-2 shadow-md active:scale-95">
              Soal Selanjutnya ➡
            </button>
          </div>
        </div>

        <!-- Grid Nomor Soal -->
        <div class="mid-container p-4 shadow-sm rounded-xl">
          <div class="grid grid-cols-8 gap-2">
            <div
              v-for="n in 16"
              :key="n"
              :class="[
                'rounded-lg px-3 py-2 text-sm font-semibold text-center cursor-pointer transition hover:scale-105',
                n === 2
                  ? 'bg-blue-600 text-white'
                  : n < 2
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700',
              ]">
              {{ n }}
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";

const opsiJawaban = [
  "(A) Mancing",
  "(B) Main",
  "(C) Olahraga",
  "(D) Uang",
  "(E) Tidur",
];
const jawaban = ref(null);
</script>
