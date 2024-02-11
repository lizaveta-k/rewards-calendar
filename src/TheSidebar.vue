<template>
  <div class="sidebar">
    <TaskPicker />
    <NoteEditor />
  </div>
</template>

<script setup lang="ts">
import TaskPicker from './TaskPicker.vue';
import NoteEditor from './NoteEditor.vue';
</script>

<style scoped>
.sidebar {
  float: left;
  width: 17%;
  margin-top: 40px;
  margin-left: 15px;
}
</style>
