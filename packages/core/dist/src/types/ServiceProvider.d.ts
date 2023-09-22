import { Container } from "../Container";
export type ServiceProvider = {
    register: (container: Container) => void;
    boot: (container: Container) => void;
};
