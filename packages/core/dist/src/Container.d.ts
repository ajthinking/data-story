import { Computer } from "./types/Computer";
import { ServiceProvider } from "./types/ServiceProvider";
export declare class Container {
    providers: ServiceProvider[];
    computers: Map<string, Computer>;
    register(provider: ServiceProvider | ServiceProvider[]): void;
    boot(): void;
    addComputers(computers: Map<string, Computer>): void;
    descriptions(): import(".").NodeDescription[];
}
