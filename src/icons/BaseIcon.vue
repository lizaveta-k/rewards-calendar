<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    role="presentation"
  >
    <title :id="title" lang="en">
      {{ title }}
    </title>
    <g fill="currentColor">
      <slot />
    </g>
  </svg>
</template>

<script setup lang="ts">
interface BaseIconProps {
  title?: string;
  size?: string | number;
}

withDefaults(defineProps<BaseIconProps>(), {
  title: 'box',
  size: 24,
});
</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
  margin-bottom: -2px;
  cursor: pointer;
}
</style>
