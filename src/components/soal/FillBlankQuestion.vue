<template>
  <div class="space-y-3">
    <p class="leading-relaxed flex flex-wrap gap-2">
      <template v-for="(p, i) in partsToRender" :key="i">
        <!-- BLANK -->
        <template v-if="p.t === 'blank'">
          <input
            type="text"
            v-model="local[iBlankIndex[i]]"
            :placeholder="p.placeholder || '...'"
            class="border border-gray-400 focus:border-[#286ca4] focus:outline-none px-1 text-question w-20" />
        </template>
        <!-- TEXT -->
        <span v-else>{{ p.v }}</span>
      </template>
    </p>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  question: { type: Object, required: true },
  modelValue: { type: Array, default: () => [] }, // jawaban user (array)
});
const emit = defineEmits(["update:modelValue"]);

/** Fallback builder kalau parts kosong → split text by "_____". */
function buildPartsFromText(text) {
  const token = "_____";
  if (!text?.includes(token)) return [{ t: "text", v: text || "" }];
  const chunks = text.split(token);
  const parts = [];
  chunks.forEach((chunk, idx) => {
    if (chunk) parts.push({ t: "text", v: chunk });
    if (idx < chunks.length - 1) parts.push({ t: "blank", key: `b${idx}` });
  });
  return parts;
}

const partsToRender = computed(() => {
  return Array.isArray(props.question.parts) && props.question.parts.length
    ? props.question.parts
    : buildPartsFromText(props.question.text || props.question.question || "");
});

/** Map index part → index blank di array jawaban */
const iBlankIndex = computed(() => {
  const map = {};
  let b = 0;
  partsToRender.value.forEach((p, i) => {
    if (p.t === "blank") map[i] = b++;
  });
  return map;
});

const blanksCount = computed(
  () => partsToRender.value.filter((p) => p.t === "blank").length
);

const local = ref(
  Array.from({ length: blanksCount.value }, (_, i) => props.modelValue[i] ?? "")
);

// sinkronisasi dua arah
watch(local, (v) => emit("update:modelValue", v), { deep: true });

watch(
  () => props.modelValue,
  (v) => {
    const next = Array.from(
      { length: blanksCount.value },
      (_, i) => v?.[i] ?? ""
    );
    // hindari assign kalau sama
    if (JSON.stringify(next) !== JSON.stringify(local.value))
      local.value = next;
  },
  { deep: true }
);

watch(blanksCount, (n) => {
  local.value = Array.from({ length: n }, (_, i) => local.value[i] ?? "");
});
</script>
