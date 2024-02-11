<template>
  <div class="task-picker">
    <div class="header-container">
      <h2 class="task-picker-title">Sticky<br />Rewards</h2>
      <div class="hang-hole" />
      <BaseButton class="new-task-btn" @click="showModal = !showModal">
        Add new
      </BaseButton>
    </div>
    <div class="task-picker-list">
      <p v-if="!tasks">Loading tasks...</p>
      <div
        v-else
        class="task-picker-item"
        v-for="task in tasks"
        :title="task.name"
        :key="task.id"
      >
        <TaskImage :task="task" />
        <BaseIcon
          class="delete"
          size="24"
          title="Delete task"
          @click="handleDeleteTask(task.id)"
        >
          <IconDelete />
        </BaseIcon>
      </div>
    </div>
    <ModalWindow v-if="showModal" @close-modal="handleCloseModal">
      <TaskForm @close-modal="handleCloseModal" />
    </ModalWindow>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Task } from './types/task';
import TaskImage from './TaskImage.vue';
import ModalWindow from './ModalWindow.vue';
import TaskForm from './TaskForm.vue';
import BaseButton from './BaseButton.vue';
import BaseIcon from './icons/BaseIcon.vue';
import IconDelete from './icons/IconDelete.vue';
import { useQuery, useQueryClient, useMutation } from '@tanstack/vue-query';
import { getTasks, deleteTask } from './services/task';

const showModal = ref(false);

const queryClient = useQueryClient();

const { data: tasks } = useQuery({
  queryKey: ['tasks'],
  queryFn: getTasks,
  staleTime: Infinity,
});

const deleteTaskMutation = useMutation({
  mutationFn: deleteTask,
  onSuccess: (_data, id) => {
    queryClient.setQueryData<Task[]>(
      ['tasks'],
      (tasks) => tasks?.filter((task) => task.id !== id),
    );
  },
});

function handleDeleteTask(id: Task['id']): void {
  if (confirm('Delete the task?')) {
    deleteTaskMutation.mutate(id);
  }
}

function handleCloseModal(): void {
  showModal.value = false;
}
</script>

<style scoped>
.task-picker {
  border: 2px solid var(--border-color);
  min-height: 461px;
}

.task-picker-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding-left: 20px;
  max-height: 400px;
  overflow-y: auto;
  padding-left: 4px;
}

.header-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 2%;
  border-bottom: 2px dashed var(--border-color);
  padding: 0 15px;
}

.hang-hole {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid var(--border-color);
}

.task-picker-item {
  display: grid;
}

.draggable,
.delete {
  grid-area: 1/2;
}
.delete {
  align-self: start;
  justify-self: end;
  visibility: hidden;
  background-color: var(--secondary-bg);
  border-radius: 50%;
}

.task-picker-item:hover .delete {
  visibility: visible;
}
.new-task-btn {
  width: auto;
  display: block;
  font-size: 1.3em;
  margin: 20px 0;
}
</style>
