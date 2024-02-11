<template>
  <DraggableItem :payload="task.id">
    <img class="task-image" draggable="false" :src="task.path" />
  </DraggableItem>
</template>

<script setup lang="ts">
import DraggableItem from './dnd/DraggableItem.vue';
import type { Task } from './types/task';

defineProps<{ task: Task }>();
</script>

<style scoped>
.task-image {
  width: 60px;
  margin: 10px;
  cursor: grab;
}
</style>
