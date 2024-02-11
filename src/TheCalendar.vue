<template>
  <div class="calendar">
    <div class="month-nav">
      <a @click="moveMonth(-1)">
        <BaseIcon title="Previous month">
          <IconLeft />
        </BaseIcon>
      </a>
      <h1 class="month-name">
        {{ currentMonthName }}
      </h1>
      <a @click="moveMonth(1)">
        <BaseIcon title="Next month">
          <IconRight />
        </BaseIcon>
      </a>
    </div>
    <div class="weekdays">
      <div class="day" v-for="weekday in weekdays" :key="weekday">
        {{ weekday }}
      </div>
    </div>
    <div class="month">
      <CalendarDate
        v-for="day in days"
        :date="day.timestamp"
        :key="day.timestamp"
        :rewards="day.rewards"
        :container-class="{ 'other-month': isDayNotInMonth(day.timestamp) }"
        :class="{
          today: isToday(day.timestamp),
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Reward } from './types/reward';
import CalendarDate from './CalendarDate.vue';
import BaseIcon from './icons/BaseIcon.vue';
import IconLeft from './icons/IconLeft.vue';
import IconRight from './icons/IconRight.vue';
import { useQuery } from '@tanstack/vue-query';
import { getRewards } from './services/reward';

type RewardsGroupByDate = Record<Reward['date'], Reward[]>;

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const today = ref(new Date());
const startDate = ref(new Date());
const currentMonth = ref(startDate.value.getMonth());

// Month dates in the calendar are filled with date objects with the time set to 0 hours.
// In order to find the current one among these dates, by comparing timestamps we set its time to 0 hours.
today.value.setHours(0, 0, 0, 0);

setUpdateTodayDateTimer();

const { data: rewards } = useQuery({
  queryKey: ['rewards'],
  queryFn: getRewards,
  select: groupRewardsByDate,
  staleTime: Infinity,
});

const currentMonthName = computed(() => {
  return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
    startDate.value,
  );
});

const days = computed(() => {
  const date = new Date(
    startDate.value.getFullYear(),
    startDate.value.getMonth(),
  );

  let firstWeekDayOfMonth = date.getDay();
  firstWeekDayOfMonth = firstWeekDayOfMonth === 0 ? 6 : firstWeekDayOfMonth - 1;

  const days = [];

  // The standard calendar grid has 42 cells,
  // which include the dates of the current month,
  // the previous month and the next month. 6 weeks * 7 days = 42.
  const datesInGrid = 42;
  date.setDate(date.getDate() - firstWeekDayOfMonth);
  for (let i = 0; i < datesInGrid; i++) {
    const timestamp = date.getTime();
    days.push({
      timestamp,
      rewards: rewards.value?.[timestamp] ?? [],
    });
    date.setDate(date.getDate() + 1);
  }
  return days;
});

function groupRewardsByDate(rewards: Reward[]): RewardsGroupByDate {
  const groups: RewardsGroupByDate = {};
  rewards.forEach((reward) => {
    groups[reward.date] ??= [];
    groups[reward.date].push(reward);
  });
  return groups;
}

function isToday(timestamp: number): boolean {
  return today.value.getTime() === timestamp;
}

function isDayNotInMonth(timestamp: number): boolean {
  return currentMonth.value !== new Date(timestamp).getMonth();
}

function moveMonth(step: number): void {
  startDate.value = new Date(
    startDate.value.setMonth(startDate.value.getMonth() + step),
  );
  currentMonth.value = startDate.value.getMonth();
}

function getMillisecondsUntilNextDay(): number {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow.getTime() - now.getTime();
}
// The function updates the current date when the next day arrives,
// in case the user has not reloaded the page.
function setUpdateTodayDateTimer(): void {
  setTimeout(() => {
    today.value = new Date();
    today.value.setHours(0, 0, 0, 0);
    setUpdateTodayDateTimer();
  }, getMillisecondsUntilNextDay());
}
</script>

<style scoped>
.calendar {
  float: right;
  width: 80%;
  margin-right: 15px;
  height: 100%;
}

.month-nav {
  text-align: center;
}

h1 {
  display: inline-block;
}

a {
  display: inline-block;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 20px;
  background-color: var(--primary-color);
}

.day {
  text-align: center;
}

.month {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 1px;
  height: 100%;
}

.month-name {
  margin: 13px;
}

a {
  cursor: pointer;
}

:deep(.other-month) {
  opacity: 0.5;
}
</style>
