<template>
  <div class="relative flex justify-between gap-10">
    <!-- Left Column -->
    <div class="flex flex-col gap-3 w-2/5">
      <div
        v-for="(item, idx) in question.left_items"
        :key="'L' + idx"
        class="p-3 border rounded-lg cursor-pointer select-none transition text-question"
        :class="getLeftClass(idx)"
        @click="selectLeft(idx)"
        ref="leftRefs">
        {{ item }}
      </div>
    </div>

    <!-- SVG Garis -->
    <svg class="absolute top-0 left-0 w-full h-full pointer-events-none">
      <line
        v-for="(match, i) in matches"
        :key="i"
        :x1="getBoxCenter(leftRefs[match.left], 'left')?.x"
        :y1="getBoxCenter(leftRefs[match.left], 'left')?.y"
        :x2="getBoxCenter(rightRefs[match.right], 'right')?.x"
        :y2="getBoxCenter(rightRefs[match.right], 'right')?.y"
        :class="getStrokeClass(i)"
        stroke-width="2" />
    </svg>

    <!-- Right Column -->
    <div class="flex flex-col gap-3 w-2/5">
      <div
        v-for="(item, idx) in question.right_items"
        :key="'R' + idx"
        class="p-3 border rounded-lg cursor-pointer select-none transition text-question"
        :class="getRightClass(idx)"
        @click="selectRight(idx)"
        ref="rightRefs">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";

const props = defineProps({
  question: { type: Object, required: true },
  modelValue: { type: Array, default: () => [] },
});

const emit = defineEmits(["update:modelValue"]);

const selectedLeft = ref(null);
const matches = ref([...props.modelValue]); // { left, right, colorIndex }

const leftRefs = ref([]);
const rightRefs = ref([]);

// warna pake tailwind
const colorPalette = [
  { bg: "bg-blue-200", border: "border-blue-500", stroke: "stroke-blue-500" },
  { bg: "bg-red-200", border: "border-red-500", stroke: "stroke-red-500" },
  {
    bg: "bg-purple-200",
    border: "border-purple-500",
    stroke: "stroke-purple-500",
  },
  {
    bg: "bg-green-200",
    border: "border-green-500",
    stroke: "stroke-green-500",
  },
  {
    bg: "bg-yellow-200",
    border: "border-yellow-500",
    stroke: "stroke-yellow-500",
  },
];

function selectLeft(idx) {
  selectedLeft.value = idx;
}

function selectRight(idx) {
  if (selectedLeft.value !== null) {
    matches.value = matches.value.filter(
      (m) => m.left !== selectedLeft.value && m.right !== idx
    );

    matches.value.push({
      left: selectedLeft.value,
      right: idx,
    });

    emit("update:modelValue", matches.value);
    selectedLeft.value = null;
  }
}

function getNextColor() {
  const nextIndex = matches.value.length; // jumlah match yg sudah ada
  return colorPalette[nextIndex % colorPalette.length];
}

function getLeftClass(idx) {
  const matchIndex = matches.value.findIndex((m) => m.left === idx);

  if (matchIndex !== -1) {
    // kalau sudah matched, pakai warna sesuai index match
    const color = colorPalette[matchIndex % colorPalette.length];
    return [color.bg, color.border];
  }

  if (selectedLeft.value === idx) {
    // kalau lagi dipilih tapi belum matched
    const color = getNextColor();
    return [color.bg, color.border];
  }

  return "bg-gray-100 hover:bg-gray-200";
}

function getRightClass(idx) {
  const matchIndex = matches.value.findIndex((m) => m.right === idx);
  if (matchIndex !== -1) {
    const color = colorPalette[matchIndex % colorPalette.length];
    return [color.bg, color.border];
  }
  return "bg-gray-100 hover:bg-gray-200";
}

function getStrokeClass(matchIndex) {
  const color = colorPalette[matchIndex % colorPalette.length];
  return color.stroke;
}

function getBoxCenter(el, side = "left") {
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  const parentRect = el.offsetParent.getBoundingClientRect();
  return {
    x:
      side === "left"
        ? rect.right - parentRect.left
        : rect.left - parentRect.left,
    y: rect.top - parentRect.top + rect.height / 2,
  };
}

nextTick(() => {
  leftRefs.value = [];
  rightRefs.value = [];
});
</script>
