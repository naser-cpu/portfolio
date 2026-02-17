import { get, writable } from 'svelte/store';
import type { IAchievement } from '$lib/types';

const STORAGE_KEY = 'achievements';
const DURATION = 5000;

const isBrowser = typeof window !== 'undefined';

const ACHIEVEMENTS_DICTIONARY = {
  GMD_404: { _id: 'GMD_404', xp: 100 },
  GMD_LOGO: { _id: 'GMD_LOGO', xp: 50 },
  GMD_SOCIAL: { _id: 'GMD_SOCIAL', xp: 150 },
  GMD_BLOG: { _id: 'GMD_BLOG', xp: 100 },
  GMD_PROJECT: { _id: 'GMD_PROJECT', xp: 100 },
  GMD_SETUP: { _id: 'GMD_SETUP', xp: 50 },
  GMD_SONG: { _id: 'GMD_SONG', xp: 50 }
} as const satisfies Record<string, IAchievement>;

type AchievementMap = Record<string, boolean>;
type AchievementKey = keyof typeof ACHIEVEMENTS_DICTIONARY;

const readInitialMap = (): AchievementMap => {
  if (!isBrowser) return {};
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};

  try {
    const parsed = JSON.parse(raw);
    return typeof parsed === 'object' && parsed !== null ? (parsed as AchievementMap) : {};
  } catch {
    return {};
  }
};

const saveMap = (value: AchievementMap) => {
  if (!isBrowser) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
};

export const initAchievement = () => {
  const MAP = writable<AchievementMap>(readInitialMap());
  const NOTIFIER = writable<IAchievement[]>([]);

  return {
    subscribe: NOTIFIER.subscribe,
    unlocked: (key: AchievementKey) => Boolean(get(MAP)[key]),
    unlock: (key: AchievementKey, duration = DURATION) => {
      if (get(MAP)[key]) return;

      MAP.update((state) => {
        const nextState = { ...state, [key]: true };
        saveMap(nextState);
        return nextState;
      });

      NOTIFIER.update((state) => [ACHIEVEMENTS_DICTIONARY[key], ...state]);
      setTimeout(() => NOTIFIER.update((state) => state.slice(0, -1)), duration);
    }
  };
};

export const ACHIEVEMENTS = initAchievement();

