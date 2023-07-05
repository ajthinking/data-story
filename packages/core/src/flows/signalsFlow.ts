import { DiagramBuilder } from "../DiagramBuilder";
import { FileStorage } from "../FileStorage";
import { SerializedReactDiagramFactory } from "../SerializedReactDiagramFactory";
import { ConsoleLog, Signal, Sleep } from "../computers";

const diagram = new DiagramBuilder()
  .add(Signal)
  .add(Sleep)
  .add(ConsoleLog)
  .get()

export const signalsFlow = SerializedReactDiagramFactory.fromDiagram(diagram)