import { useContext } from "react";
import { CatStoreContext } from "./CatStore";
import { useStore } from "zustand";

export const Cat = () => {
  const store = useContext(CatStoreContext)
  if (!store) throw new Error('Missing CatStoreContext.Provider in the tree')
  const { meows, incrementMeows } = useStore(store, (s) => ({
    meows: s.meows,
    incrementMeows: s.incrementMeows,
  }))

  return (
    <div>
      <span>Cat meowed {meows} times</span>
      <button onClick={incrementMeows}>Meow!</button> 
    </div>
  );
}