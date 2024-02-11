import { makeApiRequest } from './request';
import type { Note } from '../types/note';

export function getNote(): Promise<Note> {
  return makeApiRequest('note');
}

export async function updateNote(text: Note['text']): Promise<void> {
  await makeApiRequest('note', 'POST', { text });
}
