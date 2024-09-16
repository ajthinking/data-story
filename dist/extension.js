/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(__webpack_require__(1));
const DiagramEditorProvider_1 = __webpack_require__(2);
function activate(context) {
    context.subscriptions.push(vscode.window.registerCustomEditorProvider('ds-ext.diagramEditor', new DiagramEditorProvider_1.DiagramEditorProvider(context)));
}
function deactivate() { }


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DiagramEditorProvider = void 0;
const vscode = __importStar(__webpack_require__(1));
const DiagramDocument_1 = __webpack_require__(3);
const path_1 = __importDefault(__webpack_require__(4));
const fs_1 = __importDefault(__webpack_require__(5));
const onReady_1 = __webpack_require__(6);
class DiagramEditorProvider {
    context;
    _onDidChangeCustomDocument = new vscode.EventEmitter();
    onDidChangeCustomDocument = this._onDidChangeCustomDocument.event;
    static register(context) {
        const provider = new DiagramEditorProvider(context);
        return vscode.window.registerCustomEditorProvider('ds-ext.diagramEditor', provider);
    }
    constructor(context) {
        this.context = context;
    }
    async openCustomDocument(uri, _openContext, _token) {
        return DiagramDocument_1.DiagramDocument.create(uri);
    }
    resolveCustomEditor(document, webviewPanel, _token) {
        webviewPanel.webview.options = {
            enableScripts: true
        };
        // Set the webview's HTML content
        webviewPanel.webview.html = this.getWebviewContent(webviewPanel.webview, document);
        // Handle messages from the webview
        webviewPanel.webview.onDidReceiveMessage(event => {
            const handlers = {
                ready: onReady_1.onReady,
            };
            const handler = handlers[event.type];
            if (!handler)
                throw Error(`No handler found for event type: ${event.type}`);
            handler({ webviewPanel, event });
        });
    }
    getWebviewContent(webview, document) {
        const diagramData = Buffer.from(document.data).toString('utf8');
        const manifestPath = path_1.default.join(this.context.extensionPath, 'my-react-app', 'build', 'asset-manifest.json');
        // Read the manifest file
        const manifest = JSON.parse(fs_1.default.readFileSync(manifestPath, 'utf8'));
        // Get the correct JS and CSS file paths from the manifest
        const mainScript = manifest['files']['main.js'];
        const mainStyle = manifest['files']['main.css'];
        // Resolve URIs for the React app's main.js and main.css
        const scriptUri = webview.asWebviewUri(vscode.Uri.file(path_1.default.join(this.context.extensionPath, 'my-react-app', 'build', mainScript)));
        const styleUri = webview.asWebviewUri(vscode.Uri.file(path_1.default.join(this.context.extensionPath, 'my-react-app', 'build', mainStyle)));
        // Inject file URI and diagram data into the window object
        const fileUri = webview.asWebviewUri(document.uri);
        // Return HTML content for the Webview
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>React App</title>
            <link href="${styleUri}" rel="stylesheet">
        </head>
        <body>
            <div id="root"></div>
            <script src="${scriptUri}"></script>
            <script>
                // Provide the VS Code API and initial data (file URI and diagram content)
                window.vscode = acquireVsCodeApi();
                window.initialData = {
                    fileUri: "${fileUri}",  // Pass file URI
                    diagramData: ${JSON.stringify(diagramData)}  // Pass the diagram data as a JSON string
                };
            </script>
        </body>
        </html>
    `;
    }
    // Save changes to the document
    saveCustomDocument(document, cancellation) {
        return document.save();
    }
    // Save the document as a new file
    saveCustomDocumentAs(document, destination, cancellation) {
        return document.saveAs(destination);
    }
    // Revert the document to its original state
    revertCustomDocument(document, cancellation) {
        return document.revert();
    }
    // Handle document backup (for dirty or untitled files)
    backupCustomDocument(document, context, // Use CustomDocumentBackupContext instead of Uri
    cancellation) {
        return document.backup(context.destination, cancellation);
    }
    async save(document, data) {
        document.update(Buffer.from(data, 'utf8'));
        await document.save();
    }
}
exports.DiagramEditorProvider = DiagramEditorProvider;


/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DiagramDocument = void 0;
const vscode = __importStar(__webpack_require__(1));
class DiagramDocument {
    uri;
    documentData;
    static async create(uri) {
        // Read the file content here and create the document
        const fileData = await vscode.workspace.fs.readFile(uri);
        return new DiagramDocument(uri, fileData);
    }
    constructor(uri, documentData) {
        this.uri = uri;
        this.documentData = documentData;
    }
    get data() {
        return this.documentData;
    }
    dispose() {
        // Clean up resources here if needed
    }
    // Save the document to the file system
    async save() {
        await vscode.workspace.fs.writeFile(this.uri, this.documentData);
    }
    // Save the document to a different location (Save As functionality)
    async saveAs(targetResource) {
        await vscode.workspace.fs.writeFile(targetResource, this.documentData);
    }
    // Revert the document to its original state
    async revert() {
        const originalData = await vscode.workspace.fs.readFile(this.uri);
        this.documentData = originalData;
    }
    // Backup document, required for untitled or dirty editors
    async backup(destination, _token) {
        await this.saveAs(destination);
        return {
            id: destination.toString(),
            delete: () => vscode.workspace.fs.delete(destination)
        };
    }
    // A method to update the document data
    update(newData) {
        this.documentData = newData;
    }
}
exports.DiagramDocument = DiagramDocument;


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.onReady = void 0;
const onReady = ({ webviewPanel }) => {
    webviewPanel.webview.postMessage({
        type: 'init',
        data: {
            message: 'Hello from the extension!',
            additionalInfo: 'This is the initial data from the extension.'
        }
    });
};
exports.onReady = onReady;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map