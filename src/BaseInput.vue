<template>
  <input
    class="base-input"
    :value="modelValue"
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement).value)
    "
  />
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
}>();

defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>

<style scoped>
.base-input {
  font-size: 1.1em;
  display: block;
  margin-top: 0.5em;
  margin-bottom: 1em;
  border: 2px solid var(--border-color);
}

.base-input:focus {
  outline: none;
}
</style>
