"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hubspot = void 0;
const api_client_1 = require("@hubspot/api-client");
exports.hubspot = new api_client_1.Client({
    accessToken: process.env.HUBSPOT_PRIVATE_APP_TOKEN,
    numberOfApiCallRetries: 3,
});
