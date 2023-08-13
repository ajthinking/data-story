import { createContext } from 'react';
import { createStore } from 'zustand';

type DataStoryProps = {
  // TODO
}

interface DataStoryState extends DataStoryProps {
  // TODO
}

type DataStoryStore = ReturnType<typeof createDataStoryStore>

export const createDataStoryStore = (initProps?: Partial<DataStoryProps>) => {
  const DEFAULT_PROPS: DataStoryProps = {
    // TODO
  }
  return createStore<DataStoryState>()((set, get) => ({
    ...DEFAULT_PROPS,
    ...initProps,
  }))
}

export const DataStoryStoreContext = createContext<DataStoryStore | null>(null)