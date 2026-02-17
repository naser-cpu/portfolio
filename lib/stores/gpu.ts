import { writable } from 'svelte/store';
import type { ITierResult } from '$lib/types';

export interface IGraphicsState extends Partial<ITierResult> {
  isThree: boolean;
  isLowEnd: boolean;
}

const STORAGE_KEY = 'gpu';
const INITIAL_STATE: IGraphicsState = { isThree: false, isLowEnd: false };
const isBrowser = typeof window !== 'undefined';

const readState = (): IGraphicsState => {
  if (!isBrowser) return INITIAL_STATE;
  const raw = window.sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return INITIAL_STATE;

  try {
    const parsed = JSON.parse(raw) as IGraphicsState;
    return { ...INITIAL_STATE, ...parsed };
  } catch {
    return INITIAL_STATE;
  }
};

const writeState = (value: IGraphicsState) => {
  if (!isBrowser) return;
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
};

export const initializeGPU = () => {
  const { subscribe, set } = writable<IGraphicsState>(readState());

  return {
    subscribe,
    change: (detectedGPU: ITierResult) => {
      const nextState: IGraphicsState = {
        ...detectedGPU,
        isThree: detectedGPU.tier >= 2,
        isLowEnd: detectedGPU.tier < 2
      };
      writeState(nextState);
      set(nextState);
    }
  };
};

export const GPU = initializeGPU();

