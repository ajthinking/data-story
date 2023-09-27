"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.core = void 0;
const Application_1 = require("./Application");
const coreNodeProvider_1 = require("./coreNodeProvider");
const nodeJsNodeProvider_1 = require("./node/nodeJsNodeProvider");
// This is the default app
const core = new Application_1.Application();
exports.core = core;
core.register([
    coreNodeProvider_1.coreNodeProvider,
    nodeJsNodeProvider_1.nodeJsNodesProvider,
]);
core.boot();
