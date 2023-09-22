"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execAsync = void 0;
const child_process_1 = require("child_process");
function execAsync(command) {
    return new Promise((resolve, reject) => {
        (0, child_process_1.exec)(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            if (stderr) {
                reject(new Error(stderr));
                return;
            }
            resolve(stdout);
        });
    });
}
exports.execAsync = execAsync;
