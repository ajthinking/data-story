import { ReactNode } from 'react';
export declare function Modal({ setShowModal, title, children, primaryAction, onPrimaryAction, }: {
    setShowModal: (showModal: boolean) => void;
    title?: string;
    children?: ReactNode;
    primaryAction?: string;
    onPrimaryAction?: () => void;
}): JSX.Element;
