import { atomWithStorage } from 'jotai/utils';

export const userAtom = atomWithStorage('userToken', null);