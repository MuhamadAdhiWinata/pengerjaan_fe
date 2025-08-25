<template>
  <div>
    <div
      v-for="(opt, i) in question.options"
      :key="i"
      class="p-2 border rounded mb-2 cursor-pointer transition hover:bg-gray-100 flex items-center gap-2"
      :class="{ 'bg-blue-100 border-blue-400': modelValue === i }"
      @click="$emit('update:modelValue', i)">
      <!-- Label A, B, C, D -->
      <span class="font-bold w-6 text-center">
        {{ String.fromCharCode(65 + i) }}.
      </span>
      <span>{{ opt }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  question: { type: Object, required: true },
  modelValue: { type: Number, default: null },
});

defineEmits(["update:modelValue"]);
</script>
