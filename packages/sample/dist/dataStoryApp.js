"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataStoryApp = void 0;
const core_1 = require("@data-story/core");
const nodejs_1 = require("@data-story/nodejs");
// import { jsonNodeProvider } from './jsonNodeProvider';
exports.dataStoryApp = new core_1.Application()
    .register([
    core_1.coreNodeProvider,
    nodejs_1.nodeJsProvider,
    // jsonNodeProvider,
])
    .boot();
