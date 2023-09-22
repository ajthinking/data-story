#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: `.env.local` });
const core_1 = require("../core");
const SocketServer_1 = require("./SocketServer");
const server = new SocketServer_1.SocketServer({
    app: core_1.core,
    port: 3100
});
server.start();
