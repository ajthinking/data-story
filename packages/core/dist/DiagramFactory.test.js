"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DiagramFactory_1 = require("./DiagramFactory");
describe('fromReactFlow', () => {
    it('returns a diagram', () => {
        // This flow was created by hand in the UI as: Signal --> Ignore
        const flow = {
            "nodes": [
                {
                    "width": 128,
                    "height": 52,
                    "id": "Signal.1",
                    "position": {
                        "x": 75,
                        "y": 50
                    },
                    "data": {
                        "params": {
                            "name": {
                                "id": "name",
                                "name": "name",
                                "type": "string",
                                "value": "",
                                "rows": 1
                            },
                            "label": {
                                "id": "label",
                                "name": "label",
                                "type": "string",
                                "value": "",
                                "rows": 1
                            },
                            "period": {
                                "id": "period",
                                "name": "period",
                                "type": "number",
                                "value": 50,
                                "rows": 1
                            },
                            "count": {
                                "id": "count",
                                "name": "count",
                                "type": "number",
                                "value": 500,
                                "rows": 1
                            }
                        },
                        "computer": "Signal",
                        "label": "Signal",
                        "inputs": [],
                        "outputs": [
                            {
                                "id": "Signal.1.output",
                                "name": "output",
                                "schema": undefined,
                            }
                        ],
                    },
                    "selected": false,
                    "type": "dataStoryNodeComponent",
                    "positionAbsolute": {
                        "x": 75,
                        "y": 50
                    }
                },
                {
                    "width": 128,
                    "height": 52,
                    "id": "Ignore.1",
                    "position": {
                        "x": 275,
                        "y": 50
                    },
                    "data": {
                        "params": {
                            "name": {
                                "id": "name",
                                "name": "name",
                                "type": "string",
                                "value": "",
                                "rows": 1
                            },
                            "label": {
                                "id": "label",
                                "name": "label",
                                "type": "string",
                                "value": "",
                                "rows": 1
                            }
                        },
                        "computer": "Ignore",
                        "label": "Ignore",
                        "inputs": [
                            {
                                "id": "Ignore.1.input",
                                "name": "input",
                                "schema": undefined,
                            }
                        ],
                        "outputs": [],
                    },
                    "selected": false,
                    "type": "dataStoryNodeComponent",
                    "positionAbsolute": {
                        "x": 275,
                        "y": 50
                    }
                }
            ],
            "edges": [
                {
                    "id": "Signal.1.output--->Ignore.1.input",
                    "sourceHandle": "Signal.1.output",
                    "targetHandle": "Ignore.1.input",
                    "source": "Signal.1",
                    "target": "Ignore.1"
                }
            ],
            "viewport": {
                "x": 0,
                "y": 0,
                "zoom": 1
            }
        };
        const diagram = DiagramFactory_1.DiagramFactory.fromReactFlow(flow);
        expect(diagram.nodes.length).toBe(2);
        expect(diagram.links.length).toBe(1);
    });
});
