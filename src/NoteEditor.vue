<template>
  <div class="note-wrapper">
    <div class="note-container">
      <p class="note-header">Notes</p>
      <textarea
        class="note-editor"
        :value="note?.text"
        @blur="
          updateNoteMutation.mutate(
            ($event.target as HTMLTextAreaElement).value.trim(),
          )
        "
        placeholder="Type here..."
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery, useMutation } from '@tanstack/vue-query';
import { getNote, updateNote } from './services/note';

const { data: note } = useQuery({
  queryKey: ['note'],
  queryFn: getNote,
  staleTime: Infinity,
});

const updateNoteMutation = useMutation({
  mutationFn: updateNote,
});
</script>

<style scoped>
.note-wrapper {
  padding: 1em;
}

.note-container {
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  max-height: 100%;
  background-color: var(--note-header-bg);
}

.note-editor {
  position: absolute;
  box-sizing: border-box;
  padding: 10px;
  bottom: 0;
  resize: none;
  font-size: 1.5em;
  background-color: var(--note-body-bg);
  height: 80%;
  width: 100%;
  border: none;
  outline: none;
}

.note-header {
  font-size: 2em;
  margin-left: 0.3em;
}
</style>
