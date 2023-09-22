import { Diagram } from "../../Diagram";
export type RunMessage = {
    type: "run";
    diagram: Diagram;
};
