<template>
  <form @submit.prevent="handleAddTask">
    <div class="form-title">
      <h2>Add new task</h2>
    </div>
    <label for="taskName">Enter task name</label>
    <BaseInput v-model.trim="taskName" id="taskName" />
    <p class="rewards-box-label">Choose a reward image</p>
    <div class="rewards-images">
      <p v-if="!images" class="loading-text">Loading images...</p>
      <div
        class="reward-container"
        :class="{ selected: selectedImageId === image.id }"
        v-for="image in images"
        :key="image.id"
        @click="selectedImageId = image.id"
      >
        <img class="rewards-image" :src="image.path" />
      </div>
    </div>
    <div class="btns-container">
      <BaseButton
        type="submit"
        class="button save-button"
        :disabled="taskName.length < 1 || !selectedImageId"
      >
        Save
      </BaseButton>
      <BaseButton class="button" @click="$emit('closeModal')">
        Cancel
      </BaseButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from './BaseButton.vue';
import BaseInput from './BaseInput.vue';
import type { Image } from './types/image';
import type { Task } from './types/task';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { addTask } from './services/task';
import { getImages } from './services/image';

const emit = defineEmits<{
  closeModal: [];
}>();

const queryClient = useQueryClient();

const taskName = ref('');
const selectedImageId = ref<Image['id'] | null>(null);

const { data: images } = useQuery({
  queryKey: ['images'],
  queryFn: getImages,
  staleTime: Infinity,
  gcTime: Infinity,
});

const createTaskMutation = useMutation({
  mutationFn: addTask,
  onSuccess: (data) => {
    queryClient.setQueryData<Task[]>(['tasks'], (old) => {
      if (old) return [...old, data];
    });
  },
});

function handleAddTask(): void {
  if (!selectedImageId.value) return;
  createTaskMutation.mutate({
    name: taskName.value,
    imageId: selectedImageId.value,
  });
  emit('closeModal');
}
</script>

<style scoped>
form {
  margin-bottom: 0;
  font-size: 1.3em;
}

.form-title {
  display: block;
  margin-bottom: 1rem;
  text-align: center;
}

.rewards-images {
  width: 500px;
  height: 250px;
  background-color: var(--primary-bg);
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  border: 2px solid var(--border-color);
}

.rewards-image {
  height: 40px;
  width: 40px;
  display: block;
}

.reward-container {
  margin: 4px;
  padding: 10px;
}

.rewards-box-label {
  margin-bottom: 0.5em;
}

.reward-container:hover,
.selected {
  border-radius: 50%;
  background-color: var(--primary-color);
}

.reward-container:active {
  opacity: 60%;
}
.btns-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5em;
}

.button {
  margin: 1em;
}

.save-button:disabled {
  opacity: 50%;
}

.loading-text {
  margin-left: 5px;
}
</style>
