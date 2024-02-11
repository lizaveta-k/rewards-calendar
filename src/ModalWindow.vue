<template>
  <Teleport to="body">
    <div class="modal-backdrop" @click="$emit('closeModal')" />
    <div class="modal">
      <slot />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineEmits<{
  closeModal: [];
}>();
</script>

<style scoped>
.modal {
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border: 2px dashed var(--border-color);
  outline: 10px solid var(--primary-color);
  padding: 10px 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  background-color: var(--primary-bg);
  height: auto;
  z-index: 1;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--modal-backdrop-bg);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
