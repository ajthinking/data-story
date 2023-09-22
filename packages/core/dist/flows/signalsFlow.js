"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signalsFlow = void 0;
const DiagramBuilder_1 = require("../DiagramBuilder");
const SerializedReactDiagramFactory_1 = require("../SerializedReactDiagramFactory");
const computers_1 = require("../computers");
const diagram = new DiagramBuilder_1.DiagramBuilder()
    .add(computers_1.Signal)
    .add(computers_1.Sleep)
    .add(computers_1.ConsoleLog)
    .get();
exports.signalsFlow = SerializedReactDiagramFactory_1.SerializedReactDiagramFactory.fromDiagram(diagram);
