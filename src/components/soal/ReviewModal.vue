<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    @click.self="close">
    <div
      ref="modalRef"
      class="bg-white rounded-xl shadow-lg w-[600px] max-h-[85vh] flex flex-col">
      <!-- Header -->
      <div class="flex items-center justify-between px-5 py-3 border-b">
        <h2
          id="modal-title"
          class="font-bold text-gray-800 flex items-center gap-2">
          <slot name="title">Pengerjaan</slot>
        </h2>
        <button
          @click="close"
          class="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded"
          aria-label="Tutup modal">
          ✕
        </button>
      </div>

      <!-- Body -->
      <div class="flex-1 overflow-y-auto">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  modelValue: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue"]);

function close() {
  emit("update:modelValue", false);
}

const modalRef = ref(null);

onMounted(() => {
  const onKey = (e) => {
    if (e.key === "Escape") close();
  };
  window.addEventListener("keydown", onKey);
  onUnmounted(() => window.removeEventListener("keydown", onKey));
});
</script>
