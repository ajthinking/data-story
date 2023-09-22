import 'reactflow/dist/style.css';
import { ServerConfig } from './clients/ServerConfig';
import { Diagram } from '@data-story/core';
export declare const Workbench: ({ server, diagram, callback }: {
    server?: ServerConfig | undefined;
    diagram?: Diagram | undefined;
    callback?: ((options: any) => void) | undefined;
}) => JSX.Element;
