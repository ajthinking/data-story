"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Posts = exports.Users = exports.Todos = void 0;
const deriveFrom_1 = require("../../deriveFrom");
const Request_1 = require("../Request");
exports.Todos = (0, deriveFrom_1.deriveFrom)(Request_1.Request, {
    name: 'Todos',
    params: {
        url: 'https://jsonplaceholder.typicode.com/todos',
    },
    tags: ['JSON', 'Placeholder'],
    category: 'API',
});
exports.Users = (0, deriveFrom_1.deriveFrom)(Request_1.Request, {
    name: 'Users',
    params: {
        url: 'https://jsonplaceholder.typicode.com/users',
    },
    tags: ['JSON', 'Placeholder'],
    category: 'API',
});
exports.Posts = (0, deriveFrom_1.deriveFrom)(Request_1.Request, {
    name: 'Posts',
    params: {
        url: 'https://jsonplaceholder.typicode.com/posts',
    },
    tags: ['JSON', 'Placeholder'],
    category: 'API',
});
