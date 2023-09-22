/// <reference types="react" />
type DataStoryProps = {};
interface DataStoryState extends DataStoryProps {
}
export declare const createDataStoryStore: (initProps?: Partial<DataStoryProps>) => import("zustand").StoreApi<DataStoryState>;
export declare const DataStoryStoreContext: import("react").Context<import("zustand").StoreApi<DataStoryState> | null>;
export {};
