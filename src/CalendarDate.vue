<template>
  <DropZone class="date" @drop="handleDrop($event as Task['id'])">
    <div :class="containerClass" ref="container">
      <span class="day-number"> {{ formattedDate }}</span>
      <RewardsList :rewards="visibleRewards" />
      <div
        class="more-button"
        v-if="rewards.length > maxVisibleRewards"
        @click="openMoreRewardsPopover"
      >
        + {{ rewards.length - maxVisibleRewards }} more
      </div>
    </div>
    <BasePopover
      class="popover"
      v-if="showPopover"
      @close-popover="handleClosePopover"
      :style="[popoverSize, popoverPosition]"
      :title="dayOfTheWeek + ', ' + formattedDate"
    >
      <RewardsList
        :rewards="rewards"
        :style="{ maxHeight: rewardsListMaxHeight }"
      />
    </BasePopover>
  </DropZone>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import type { Reward } from './types/reward';
import type { Task } from './types/task';
import DropZone from './dnd/DropZone.vue';
import BasePopover from './BasePopover.vue';
import RewardsList from './RewardsList.vue';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { addReward } from './services/reward';

interface CalendarDateProps {
  date: number;
  rewards: Reward[];
  containerClass?: unknown;
}

const queryClient = useQueryClient();

const container = ref<HTMLElement | null>(null);
const showPopover = ref(false);
const rewardsListMaxHeight = ref('');
const popoverSize = reactive({
  height: '',
  width: '',
});
const popoverPosition = reactive({
  top: '',
  left: '',
});

const maxVisibleRewards = 8;

const props = defineProps<CalendarDateProps>();

const formattedDate = computed(() => {
  return new Date(props.date).getDate();
});

const dayOfTheWeek = computed(() => {
  return new Date(props.date).toLocaleString('en-US', { weekday: 'short' });
});

const visibleRewards = computed(() => {
  return props.rewards.slice(0, maxVisibleRewards);
});

function openMoreRewardsPopover(): void {
  if (!container.value) return;
  const cellHeight = container.value.clientHeight;
  const cellWidth = container.value.clientWidth;
  rewardsListMaxHeight.value = cellHeight + 'px';

  popoverSize.height = cellHeight + 80 + 'px';
  popoverSize.width = cellWidth + 40 + 'px';

  popoverPosition.top = '-40px';
  popoverPosition.left = '-20px';

  showPopover.value = !showPopover.value;
}

function handleClosePopover(): void {
  showPopover.value = false;
}

const createRewardMutation = useMutation({
  mutationFn: addReward,
  onSuccess: (data) => {
    queryClient.setQueryData<Reward[]>(['rewards'], (old) => {
      if (old) return [...old, data];
    });
  },
});

function handleDrop(id: Task['id']): void {
  createRewardMutation.mutate({ id, date: props.date });
}
</script>

<style scoped>
.date {
  padding: 0px;
  box-shadow: 0px 0px 0px 1px;
  position: relative;
}

.today {
  background-color: var(--primary-color);
}

.day-number {
  padding: 4px;
}

.more-button {
  width: 100%;
  cursor: pointer;
  text-align: center;
  background-color: var(--secondary-bg);
}

.more-button:hover {
  font-weight: bold;
}

.date:nth-child(7n) .popover {
  left: -50px !important;
}
</style>
