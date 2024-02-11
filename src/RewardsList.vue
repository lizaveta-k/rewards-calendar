<template>
  <div class="rewards-container">
    <template v-for="reward in rewards" :key="reward.id">
      <DateReward :reward="reward" />
    </template>
  </div>
</template>

<script setup lang="ts">
import DateReward from './DateReward.vue';
import type { Reward } from './types/reward';

defineProps<{ rewards: Reward[] }>();
</script>

<style scoped>
.rewards-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0px 5px 5px 5px;
  overflow-y: auto;
}
</style>
