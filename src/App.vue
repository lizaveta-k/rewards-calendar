<template>
  <Sidebar />
  <Calendar />
</template>

<script setup lang="ts">
import Calendar from './TheCalendar.vue';
import Sidebar from './TheSidebar.vue';
</script>

<style>
html,
body {
  height: 80vh;
  margin: 0px;
  color: var(--text-color);
}

#app {
  height: 100%;
}
</style>
