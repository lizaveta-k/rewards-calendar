import { makeApiRequest } from './request';
import type { Task } from '../types/task';

interface AddTaskParams {
  name: string;
  imageId: number;
}

export function getTasks(): Promise<Task[]> {
  return makeApiRequest('tasks');
}

export function addTask(payload: AddTaskParams): Promise<Task> {
  return makeApiRequest<Task>('task', 'POST', {
    name: payload.name,
    imageId: payload.imageId,
  });
}

export async function deleteTask(id: Task['id']): Promise<void> {
  await makeApiRequest(`tasks/${id}`, 'DELETE');
}
