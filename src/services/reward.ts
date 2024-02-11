import { makeApiRequest } from './request';
import type { Reward } from '../types/reward';
import type { Task } from '@/types/task';

interface AddRewardParams {
  id: Task['id'];
  date: number;
}

export function getRewards(): Promise<Reward[]> {
  return makeApiRequest('rewards');
}

export function addReward(payload: AddRewardParams): Promise<Reward> {
  return makeApiRequest<Reward>('reward', 'POST', {
    date: payload.date,
    taskId: payload.id,
  });
}

export async function deleteReward(id: Reward['id']): Promise<void> {
  await makeApiRequest(`rewards/${id}`, 'DELETE');
}
