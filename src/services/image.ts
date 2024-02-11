import { makeApiRequest } from './request';
import type { Image } from '../types/image';

export function getImages(): Promise<Image[]> {
  return makeApiRequest('images');
}
