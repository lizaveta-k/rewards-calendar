import type { Image } from './image';

export interface Task {
  id: number;
  imageId: Image['id'];
  name: string;
  path: string;
}
