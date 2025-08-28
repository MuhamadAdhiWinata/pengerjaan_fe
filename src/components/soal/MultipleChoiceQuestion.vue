<template>
  <div class="space-y-3">
    <div
      v-for="(opt, i) in question.options"
      :key="i"
      class="flex items-center gap-3 p-1 rounded-lg cursor-pointer transition duration-200"
      @click="$emit('update:modelValue', i)">
      <!-- Label A, B, C, D -->
      <span
        class="flex items-center border justify-center w-6 h-6 rounded-full font-semibold text-gray-700"
        :class="modelValue === i ? 'bg-primary text-white' : 'bg-white'">
        {{ String.fromCharCode(65 + i) }}
      </span>
      <span class="text-question">{{ opt }}</span>
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
