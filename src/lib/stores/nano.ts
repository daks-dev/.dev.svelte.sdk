import { atom, deepMap, map } from 'nanostores';

export const meta = map<Record<string, Meta>>({});

export const status = deepMap<Record<string, Record<string, Meta>>>({});

export const twmerge = atom<Record<string, Record<string, string[]>[]>>({});
