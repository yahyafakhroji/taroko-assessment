import { atomWithStorage } from 'jotai/utils';

export const favoritesAtom = atomWithStorage<number[]>('favorites', []);
