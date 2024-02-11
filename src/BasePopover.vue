<template>
  <div class="popover-container" ref="popover">
    <div class="popover-header">
      <p class="popover-title">
        {{ title }}
      </p>
      <BaseIcon
        class="popover-close-btn"
        size="40"
        title="Close"
        @click="$emit('closePopover')"
      >
        <IconClose />
      </BaseIcon>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import BaseIcon from './icons/BaseIcon.vue';
import IconClose from './icons/IconClose.vue';

const popover = ref<HTMLDivElement | null>(null);

withDefaults(defineProps<{ title?: string }>(), { title: '' });

const emit = defineEmits<{
  closePopover: [];
}>();

function handleMouseDown(e: MouseEvent): void {
  if (e.target && !popover.value?.contains(e.target as Node)) {
    emit('closePopover');
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleMouseDown);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', handleMouseDown);
});
</script>

<style scoped>
.popover-container {
  position: absolute;
  z-index: 1;
  background: var(--primary-bg);
  border-radius: 5px;
  border: 2px dashed var(--border-color);
  outline: 10px solid var(--primary-color);
}

.popover-header {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.popover-title {
  grid-column: 2/3;
  justify-self: center;
}

.popover-close-btn {
  display: block;
  justify-self: end;
}
</style>
