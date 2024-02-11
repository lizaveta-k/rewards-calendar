<template>
  <button :type="type" class="base-button">
    <slot />
  </button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ type?: 'button' | 'submit' }>(), {
  type: 'button',
});
</script>

<style scoped>
.base-button {
  position: relative;
  padding: 0.5rem;
  background-color: var(--primary-color);
  color: var(--text-color);
  text-align: center;
  border: none;
  font-size: 1.1em;
  cursor: pointer;
}

.base-button:hover {
  outline: 3px solid var(--primary-color);
}

.base-button:active {
  outline: none;
}
</style>
