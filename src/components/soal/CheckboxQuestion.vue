<template>
  <div class="flex flex-col gap-3">
    <label
      v-for="(opt, i) in question.options"
      :key="i"
      class="flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition hover:bg-gray-50"
      :class="{ 'bg-blue-50 border-blue-400': localValue.includes(i) }">
      <!-- Checkbox -->
      <input
        type="checkbox"
        class="w-5 h-5 cursor-pointer accent-blue-500"
        :value="i"
        v-model="localValue" />
      <!-- Label -->
      <span class="flex-1">{{ opt }}</span>
    </label>
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
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);
const localValue = ref([...props.modelValue]);

watch(localValue, (val) => {
  emit("update:modelValue", val);
});

watch(
  () => props.modelValue,
  (val) => {
    if (JSON.stringify(val) !== JSON.stringify(localValue.value)) {
      localValue.value = [...val];
    }
  }
);
</script>
