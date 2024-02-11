<template>
  <div class="container">
    <BaseIcon
      size="22"
      class="delete"
      title="Delete reward"
      @click="handleDeleteReward(reward.id)"
    >
      <IconDelete />
    </BaseIcon>
    <img class="reward" :src="reward.path" :title="reward.name" />
  </div>
</template>

<script setup lang="ts">
import type { Reward } from './types/reward';
import BaseIcon from './icons/BaseIcon.vue';
import IconDelete from './icons/IconDelete.vue';
import { useQueryClient, useMutation } from '@tanstack/vue-query';
import { deleteReward } from './services/reward';

defineProps<{ reward: Reward }>();

const queryClient = useQueryClient();

const deleteRewardMutation = useMutation({
  mutationFn: deleteReward,
  onSuccess: (_data, id) => {
    queryClient.setQueryData<Reward[]>(
      ['rewards'],
      (rewards) => rewards?.filter((reward) => reward.id !== id),
    );
  },
});

function handleDeleteReward(id: Reward['id']): void {
  if (confirm('Delete the reward?')) {
    deleteRewardMutation.mutate(id);
  }
}
</script>

<style scoped>
.reward {
  margin: 5px;
  width: 40px;
  height: 40px;
}

.container {
  margin-left: 1px;
  display: inline-block;
  position: relative;
}

.delete {
  position: absolute;
  z-index: 1;
  top: 0;
  right: -5px;
  visibility: hidden;
  background-color: var(--secondary-bg);
  border-radius: 50%;
}

.container:hover .delete {
  visibility: visible;
}
</style>
