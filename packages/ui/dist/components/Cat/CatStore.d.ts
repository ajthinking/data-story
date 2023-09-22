/// <reference types="react" />
type CatProps = {
    meows: number;
};
interface CatState extends CatProps {
    incrementMeows: () => void;
}
export declare const createCatStore: (initProps?: Partial<CatProps>) => import("zustand").StoreApi<CatState>;
export declare const CatStoreContext: import("react").Context<import("zustand").StoreApi<CatState> | null>;
export {};
