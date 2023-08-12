import { useRef } from 'react'
import { Cat } from './Cat';
import { CatStoreContext, createCatStore } from './CatStore';

export const CatWrapper = () => {
  const store = useRef(createCatStore()).current

  return (
    <CatStoreContext.Provider value={store}>
      <Cat />
    </CatStoreContext.Provider>
  )
}