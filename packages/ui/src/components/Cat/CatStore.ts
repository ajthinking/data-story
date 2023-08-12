import { createContext } from 'react';
import { createStore } from 'zustand';

type CatProps = {
  meows: number;
}

interface CatState extends CatProps {
  incrementMeows: () => void
}

type CatStore = ReturnType<typeof createCatStore>

export const createCatStore = (initProps?: Partial<CatProps>) => {
  const DEFAULT_PROPS: CatProps = {
    meows: 0,
  }
  return createStore<CatState>()((set, get) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    incrementMeows: () => set(state => ({ meows: state.meows + 1 })),
  }))
}

export const CatStoreContext = createContext<CatStore | null>(null)