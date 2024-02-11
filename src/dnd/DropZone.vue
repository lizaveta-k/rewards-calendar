<template>
  <div ref="dropzone">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const dropzone = ref<HTMLDivElement | null>(null);
const emit = defineEmits<{
  drop: [value: unknown];
}>();

function handleDrop(event: Event): void {
  emit('drop', (event as CustomEvent).detail.payload);
}

onMounted(() => {
  dropzone.value?.addEventListener('dnd:drop', handleDrop);
});
</script>

<style></style>
