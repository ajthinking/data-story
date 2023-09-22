import { Computer } from "./types/Computer";
import { ServiceProvider } from "./types/ServiceProvider";
export declare class Application {
    providers: ServiceProvider[];
    computers: Map<string, Computer>;
    hooks: Map<string, Function>;
    register(provider: ServiceProvider | ServiceProvider[]): void;
    boot(): void;
    addComputers(computers: Map<string, Computer>): void;
    addHooks(hooks: Record<string, Function>): void;
    descriptions(): import(".").NodeDescription[];
}
