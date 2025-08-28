<!-- components/soal/EssayQuestion.vue -->
<template>
  <div>
    <textarea
      v-model="localValue"
      class="w-full border border-b-brand p-3 rounded-lg focus:ring-2 focus:ring-blue-400 text-question"
      rows="5"
      placeholder="Tulis jawabanmu di sini..."></textarea>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);
const localValue = ref(props.modelValue);

watch(localValue, (val) => {
  emit("update:modelValue", val);
});

watch(
  () => props.modelValue,
  (val) => {
    if (val !== localValue.value) localValue.value = val;
  }
);
</script>
