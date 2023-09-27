/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/reactflow/dist/style.css":
/*!*********************************************************************************************!*\
  !*** ../../node_modules/css-loader/dist/cjs.js!../../node_modules/reactflow/dist/style.css ***!
  \*********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../css-loader/dist/runtime/sourceMaps.js */ "../../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* this gets exported as style.css and can be used for the default theming */
/* these are the necessary styles for React Flow, they get used by base.css and style.css */
.react-flow__container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.react-flow__pane {
  z-index: 1;
  cursor: -webkit-grab;
  cursor: grab;
}
.react-flow__pane.selection {
    cursor: pointer;
  }
.react-flow__pane.dragging {
    cursor: -webkit-grabbing;
    cursor: grabbing;
  }
.react-flow__viewport {
  transform-origin: 0 0;
  z-index: 2;
  pointer-events: none;
}
.react-flow__renderer {
  z-index: 4;
}
.react-flow__selection {
  z-index: 6;
}
.react-flow__nodesselection-rect:focus,
.react-flow__nodesselection-rect:focus-visible {
  outline: none;
}
.react-flow .react-flow__edges {
  pointer-events: none;
  overflow: visible;
}
.react-flow__edge-path,
.react-flow__connection-path {
  stroke: #b1b1b7;
  stroke-width: 1;
  fill: none;
}
.react-flow__edge {
  pointer-events: visibleStroke;
  cursor: pointer;
}
.react-flow__edge.animated path {
    stroke-dasharray: 5;
    -webkit-animation: dashdraw 0.5s linear infinite;
            animation: dashdraw 0.5s linear infinite;
  }
.react-flow__edge.animated path.react-flow__edge-interaction {
    stroke-dasharray: none;
    -webkit-animation: none;
            animation: none;
  }
.react-flow__edge.inactive {
    pointer-events: none;
  }
.react-flow__edge.selected,
  .react-flow__edge:focus,
  .react-flow__edge:focus-visible {
    outline: none;
  }
.react-flow__edge.selected .react-flow__edge-path,
  .react-flow__edge:focus .react-flow__edge-path,
  .react-flow__edge:focus-visible .react-flow__edge-path {
    stroke: #555;
  }
.react-flow__edge-textwrapper {
    pointer-events: all;
  }
.react-flow__edge-textbg {
    fill: white;
  }
.react-flow__edge .react-flow__edge-text {
    pointer-events: none;
    -webkit-user-select: none;
       -moz-user-select: none;
            user-select: none;
  }
.react-flow__connection {
  pointer-events: none;
}
.react-flow__connection .animated {
    stroke-dasharray: 5;
    -webkit-animation: dashdraw 0.5s linear infinite;
            animation: dashdraw 0.5s linear infinite;
  }
.react-flow__connectionline {
  z-index: 1001;
}
.react-flow__nodes {
  pointer-events: none;
  transform-origin: 0 0;
}
.react-flow__node {
  position: absolute;
  -webkit-user-select: none;
     -moz-user-select: none;
          user-select: none;
  pointer-events: all;
  transform-origin: 0 0;
  box-sizing: border-box;
  cursor: -webkit-grab;
  cursor: grab;
}
.react-flow__node.dragging {
    cursor: -webkit-grabbing;
    cursor: grabbing;
  }
.react-flow__nodesselection {
  z-index: 3;
  transform-origin: left top;
  pointer-events: none;
}
.react-flow__nodesselection-rect {
    position: absolute;
    pointer-events: all;
    cursor: -webkit-grab;
    cursor: grab;
  }
.react-flow__handle {
  position: absolute;
  pointer-events: none;
  min-width: 5px;
  min-height: 5px;
  width: 6px;
  height: 6px;
  background: #1a192b;
  border: 1px solid white;
  border-radius: 100%;
}
.react-flow__handle.connectionindicator {
    pointer-events: all;
    cursor: crosshair;
  }
.react-flow__handle-bottom {
    top: auto;
    left: 50%;
    bottom: -4px;
    transform: translate(-50%, 0);
  }
.react-flow__handle-top {
    left: 50%;
    top: -4px;
    transform: translate(-50%, 0);
  }
.react-flow__handle-left {
    top: 50%;
    left: -4px;
    transform: translate(0, -50%);
  }
.react-flow__handle-right {
    right: -4px;
    top: 50%;
    transform: translate(0, -50%);
  }
.react-flow__edgeupdater {
  cursor: move;
  pointer-events: all;
}
.react-flow__panel {
  position: absolute;
  z-index: 5;
  margin: 15px;
}
.react-flow__panel.top {
    top: 0;
  }
.react-flow__panel.bottom {
    bottom: 0;
  }
.react-flow__panel.left {
    left: 0;
  }
.react-flow__panel.right {
    right: 0;
  }
.react-flow__panel.center {
    left: 50%;
    transform: translateX(-50%);
  }
.react-flow__attribution {
  font-size: 10px;
  background: rgba(255, 255, 255, 0.5);
  padding: 2px 3px;
  margin: 0;
}
.react-flow__attribution a {
    text-decoration: none;
    color: #999;
  }
@-webkit-keyframes dashdraw {
  from {
    stroke-dashoffset: 10;
  }
}
@keyframes dashdraw {
  from {
    stroke-dashoffset: 10;
  }
}
.react-flow__edgelabel-renderer {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  -webkit-user-select: none;
     -moz-user-select: none;
          user-select: none;
}
.react-flow__edge.updating .react-flow__edge-path {
      stroke: #777;
    }
.react-flow__edge-text {
    font-size: 10px;
  }
.react-flow__node.selectable:focus,
  .react-flow__node.selectable:focus-visible {
    outline: none;
  }
.react-flow__node-default,
.react-flow__node-input,
.react-flow__node-output,
.react-flow__node-group {
  padding: 10px;
  border-radius: 3px;
  width: 150px;
  font-size: 12px;
  color: #222;
  text-align: center;
  border-width: 1px;
  border-style: solid;
  border-color: #1a192b;
  background-color: white;
}
.react-flow__node-default.selectable:hover, .react-flow__node-input.selectable:hover, .react-flow__node-output.selectable:hover, .react-flow__node-group.selectable:hover {
      box-shadow: 0 1px 4px 1px rgba(0, 0, 0, 0.08);
    }
.react-flow__node-default.selectable.selected,
    .react-flow__node-default.selectable:focus,
    .react-flow__node-default.selectable:focus-visible,
    .react-flow__node-input.selectable.selected,
    .react-flow__node-input.selectable:focus,
    .react-flow__node-input.selectable:focus-visible,
    .react-flow__node-output.selectable.selected,
    .react-flow__node-output.selectable:focus,
    .react-flow__node-output.selectable:focus-visible,
    .react-flow__node-group.selectable.selected,
    .react-flow__node-group.selectable:focus,
    .react-flow__node-group.selectable:focus-visible {
      box-shadow: 0 0 0 0.5px #1a192b;
    }
.react-flow__node-group {
  background-color: rgba(240, 240, 240, 0.25);
}
.react-flow__nodesselection-rect,
.react-flow__selection {
  background: rgba(0, 89, 220, 0.08);
  border: 1px dotted rgba(0, 89, 220, 0.8);
}
.react-flow__nodesselection-rect:focus,
  .react-flow__nodesselection-rect:focus-visible,
  .react-flow__selection:focus,
  .react-flow__selection:focus-visible {
    outline: none;
  }
.react-flow__controls {
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.08);
}
.react-flow__controls-button {
    border: none;
    background: #fefefe;
    border-bottom: 1px solid #eee;
    box-sizing: content-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16px;
    height: 16px;
    cursor: pointer;
    -webkit-user-select: none;
       -moz-user-select: none;
            user-select: none;
    padding: 5px;
  }
.react-flow__controls-button:hover {
      background: #f4f4f4;
    }
.react-flow__controls-button svg {
      width: 100%;
      max-width: 12px;
      max-height: 12px;
    }
.react-flow__controls-button:disabled {
      pointer-events: none;
    }
.react-flow__controls-button:disabled svg {
        fill-opacity: 0.4;
      }
.react-flow__minimap {
  background-color: #fff;
}
.react-flow__resize-control {
  position: absolute;
}
.react-flow__resize-control.left,
.react-flow__resize-control.right {
  cursor: ew-resize;
}
.react-flow__resize-control.top,
.react-flow__resize-control.bottom {
  cursor: ns-resize;
}
.react-flow__resize-control.top.left,
.react-flow__resize-control.bottom.right {
  cursor: nwse-resize;
}
.react-flow__resize-control.bottom.left,
.react-flow__resize-control.top.right {
  cursor: nesw-resize;
}
/* handle styles */
.react-flow__resize-control.handle {
  width: 4px;
  height: 4px;
  border: 1px solid #fff;
  border-radius: 1px;
  background-color: #3367d9;
  transform: translate(-50%, -50%);
}
.react-flow__resize-control.handle.left {
  left: 0;
  top: 50%;
}
.react-flow__resize-control.handle.right {
  left: 100%;
  top: 50%;
}
.react-flow__resize-control.handle.top {
  left: 50%;
  top: 0;
}
.react-flow__resize-control.handle.bottom {
  left: 50%;
  top: 100%;
}
.react-flow__resize-control.handle.top.left {
  left: 0;
}
.react-flow__resize-control.handle.bottom.left {
  left: 0;
}
.react-flow__resize-control.handle.top.right {
  left: 100%;
}
.react-flow__resize-control.handle.bottom.right {
  left: 100%;
}
/* line styles */
.react-flow__resize-control.line {
  border-color: #3367d9;
  border-width: 0;
  border-style: solid;
}
.react-flow__resize-control.line.left,
.react-flow__resize-control.line.right {
  width: 1px;
  transform: translate(-50%, 0);
  top: 0;
  height: 100%;
}
.react-flow__resize-control.line.left {
  left: 0;
  border-left-width: 1px;
}
.react-flow__resize-control.line.right {
  left: 100%;
  border-right-width: 1px;
}
.react-flow__resize-control.line.top,
.react-flow__resize-control.line.bottom {
  height: 1px;
  transform: translate(0, -50%);
  left: 0;
  width: 100%;
}
.react-flow__resize-control.line.top {
  top: 0;
  border-top-width: 1px;
}
.react-flow__resize-control.line.bottom {
  border-bottom-width: 1px;
  top: 100%;
}
`, "",{"version":3,"sources":["webpack://./../../node_modules/reactflow/dist/style.css"],"names":[],"mappings":"AAAA,4EAA4E;AAC5E,2FAA2F;AAC3F;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,MAAM;EACN,OAAO;AACT;AACA;EACE,UAAU;EACV,oBAAoB;EACpB,YAAY;AACd;AACA;IACI,eAAe;EACjB;AACF;IACI,wBAAwB;IACxB,gBAAgB;EAClB;AACF;EACE,qBAAqB;EACrB,UAAU;EACV,oBAAoB;AACtB;AACA;EACE,UAAU;AACZ;AACA;EACE,UAAU;AACZ;AACA;;EAEE,aAAa;AACf;AACA;EACE,oBAAoB;EACpB,iBAAiB;AACnB;AACA;;EAEE,eAAe;EACf,eAAe;EACf,UAAU;AACZ;AACA;EACE,6BAA6B;EAC7B,eAAe;AACjB;AACA;IACI,mBAAmB;IACnB,gDAAgD;YACxC,wCAAwC;EAClD;AACF;IACI,sBAAsB;IACtB,uBAAuB;YACf,eAAe;EACzB;AACF;IACI,oBAAoB;EACtB;AACF;;;IAGI,aAAa;EACf;AACF;;;IAGI,YAAY;EACd;AACF;IACI,mBAAmB;EACrB;AACF;IACI,WAAW;EACb;AACF;IACI,oBAAoB;IACpB,yBAAyB;OACtB,sBAAsB;YACjB,iBAAiB;EAC3B;AACF;EACE,oBAAoB;AACtB;AACA;IACI,mBAAmB;IACnB,gDAAgD;YACxC,wCAAwC;EAClD;AACF;EACE,aAAa;AACf;AACA;EACE,oBAAoB;EACpB,qBAAqB;AACvB;AACA;EACE,kBAAkB;EAClB,yBAAyB;KACtB,sBAAsB;UACjB,iBAAiB;EACzB,mBAAmB;EACnB,qBAAqB;EACrB,sBAAsB;EACtB,oBAAoB;EACpB,YAAY;AACd;AACA;IACI,wBAAwB;IACxB,gBAAgB;EAClB;AACF;EACE,UAAU;EACV,0BAA0B;EAC1B,oBAAoB;AACtB;AACA;IACI,kBAAkB;IAClB,mBAAmB;IACnB,oBAAoB;IACpB,YAAY;EACd;AACF;EACE,kBAAkB;EAClB,oBAAoB;EACpB,cAAc;EACd,eAAe;EACf,UAAU;EACV,WAAW;EACX,mBAAmB;EACnB,uBAAuB;EACvB,mBAAmB;AACrB;AACA;IACI,mBAAmB;IACnB,iBAAiB;EACnB;AACF;IACI,SAAS;IACT,SAAS;IACT,YAAY;IACZ,6BAA6B;EAC/B;AACF;IACI,SAAS;IACT,SAAS;IACT,6BAA6B;EAC/B;AACF;IACI,QAAQ;IACR,UAAU;IACV,6BAA6B;EAC/B;AACF;IACI,WAAW;IACX,QAAQ;IACR,6BAA6B;EAC/B;AACF;EACE,YAAY;EACZ,mBAAmB;AACrB;AACA;EACE,kBAAkB;EAClB,UAAU;EACV,YAAY;AACd;AACA;IACI,MAAM;EACR;AACF;IACI,SAAS;EACX;AACF;IACI,OAAO;EACT;AACF;IACI,QAAQ;EACV;AACF;IACI,SAAS;IACT,2BAA2B;EAC7B;AACF;EACE,eAAe;EACf,oCAAoC;EACpC,gBAAgB;EAChB,SAAS;AACX;AACA;IACI,qBAAqB;IACrB,WAAW;EACb;AACF;EACE;IACE,qBAAqB;EACvB;AACF;AACA;EACE;IACE,qBAAqB;EACvB;AACF;AACA;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,oBAAoB;EACpB,yBAAyB;KACtB,sBAAsB;UACjB,iBAAiB;AAC3B;AACA;MACM,YAAY;IACd;AACJ;IACI,eAAe;EACjB;AACF;;IAEI,aAAa;EACf;AACF;;;;EAIE,aAAa;EACb,kBAAkB;EAClB,YAAY;EACZ,eAAe;EACf,WAAW;EACX,kBAAkB;EAClB,iBAAiB;EACjB,mBAAmB;EACnB,qBAAqB;EACrB,uBAAuB;AACzB;AACA;MACM,6CAA6C;IAC/C;AACJ;;;;;;;;;;;;MAYM,+BAA+B;IACjC;AACJ;EACE,2CAA2C;AAC7C;AACA;;EAEE,kCAAkC;EAClC,wCAAwC;AAC1C;AACA;;;;IAII,aAAa;EACf;AACF;EACE,2CAA2C;AAC7C;AACA;IACI,YAAY;IACZ,mBAAmB;IACnB,6BAA6B;IAC7B,uBAAuB;IACvB,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,WAAW;IACX,YAAY;IACZ,eAAe;IACf,yBAAyB;OACtB,sBAAsB;YACjB,iBAAiB;IACzB,YAAY;EACd;AACF;MACM,mBAAmB;IACrB;AACJ;MACM,WAAW;MACX,eAAe;MACf,gBAAgB;IAClB;AACJ;MACM,oBAAoB;IACtB;AACJ;QACQ,iBAAiB;MACnB;AACN;EACE,sBAAsB;AACxB;AACA;EACE,kBAAkB;AACpB;AACA;;EAEE,iBAAiB;AACnB;AACA;;EAEE,iBAAiB;AACnB;AACA;;EAEE,mBAAmB;AACrB;AACA;;EAEE,mBAAmB;AACrB;AACA,kBAAkB;AAClB;EACE,UAAU;EACV,WAAW;EACX,sBAAsB;EACtB,kBAAkB;EAClB,yBAAyB;EACzB,gCAAgC;AAClC;AACA;EACE,OAAO;EACP,QAAQ;AACV;AACA;EACE,UAAU;EACV,QAAQ;AACV;AACA;EACE,SAAS;EACT,MAAM;AACR;AACA;EACE,SAAS;EACT,SAAS;AACX;AACA;EACE,OAAO;AACT;AACA;EACE,OAAO;AACT;AACA;EACE,UAAU;AACZ;AACA;EACE,UAAU;AACZ;AACA,gBAAgB;AAChB;EACE,qBAAqB;EACrB,eAAe;EACf,mBAAmB;AACrB;AACA;;EAEE,UAAU;EACV,6BAA6B;EAC7B,MAAM;EACN,YAAY;AACd;AACA;EACE,OAAO;EACP,sBAAsB;AACxB;AACA;EACE,UAAU;EACV,uBAAuB;AACzB;AACA;;EAEE,WAAW;EACX,6BAA6B;EAC7B,OAAO;EACP,WAAW;AACb;AACA;EACE,MAAM;EACN,qBAAqB;AACvB;AACA;EACE,wBAAwB;EACxB,SAAS;AACX","sourcesContent":["/* this gets exported as style.css and can be used for the default theming */\n/* these are the necessary styles for React Flow, they get used by base.css and style.css */\n.react-flow__container {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n}\n.react-flow__pane {\n  z-index: 1;\n  cursor: -webkit-grab;\n  cursor: grab;\n}\n.react-flow__pane.selection {\n    cursor: pointer;\n  }\n.react-flow__pane.dragging {\n    cursor: -webkit-grabbing;\n    cursor: grabbing;\n  }\n.react-flow__viewport {\n  transform-origin: 0 0;\n  z-index: 2;\n  pointer-events: none;\n}\n.react-flow__renderer {\n  z-index: 4;\n}\n.react-flow__selection {\n  z-index: 6;\n}\n.react-flow__nodesselection-rect:focus,\n.react-flow__nodesselection-rect:focus-visible {\n  outline: none;\n}\n.react-flow .react-flow__edges {\n  pointer-events: none;\n  overflow: visible;\n}\n.react-flow__edge-path,\n.react-flow__connection-path {\n  stroke: #b1b1b7;\n  stroke-width: 1;\n  fill: none;\n}\n.react-flow__edge {\n  pointer-events: visibleStroke;\n  cursor: pointer;\n}\n.react-flow__edge.animated path {\n    stroke-dasharray: 5;\n    -webkit-animation: dashdraw 0.5s linear infinite;\n            animation: dashdraw 0.5s linear infinite;\n  }\n.react-flow__edge.animated path.react-flow__edge-interaction {\n    stroke-dasharray: none;\n    -webkit-animation: none;\n            animation: none;\n  }\n.react-flow__edge.inactive {\n    pointer-events: none;\n  }\n.react-flow__edge.selected,\n  .react-flow__edge:focus,\n  .react-flow__edge:focus-visible {\n    outline: none;\n  }\n.react-flow__edge.selected .react-flow__edge-path,\n  .react-flow__edge:focus .react-flow__edge-path,\n  .react-flow__edge:focus-visible .react-flow__edge-path {\n    stroke: #555;\n  }\n.react-flow__edge-textwrapper {\n    pointer-events: all;\n  }\n.react-flow__edge-textbg {\n    fill: white;\n  }\n.react-flow__edge .react-flow__edge-text {\n    pointer-events: none;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n            user-select: none;\n  }\n.react-flow__connection {\n  pointer-events: none;\n}\n.react-flow__connection .animated {\n    stroke-dasharray: 5;\n    -webkit-animation: dashdraw 0.5s linear infinite;\n            animation: dashdraw 0.5s linear infinite;\n  }\n.react-flow__connectionline {\n  z-index: 1001;\n}\n.react-flow__nodes {\n  pointer-events: none;\n  transform-origin: 0 0;\n}\n.react-flow__node {\n  position: absolute;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n  pointer-events: all;\n  transform-origin: 0 0;\n  box-sizing: border-box;\n  cursor: -webkit-grab;\n  cursor: grab;\n}\n.react-flow__node.dragging {\n    cursor: -webkit-grabbing;\n    cursor: grabbing;\n  }\n.react-flow__nodesselection {\n  z-index: 3;\n  transform-origin: left top;\n  pointer-events: none;\n}\n.react-flow__nodesselection-rect {\n    position: absolute;\n    pointer-events: all;\n    cursor: -webkit-grab;\n    cursor: grab;\n  }\n.react-flow__handle {\n  position: absolute;\n  pointer-events: none;\n  min-width: 5px;\n  min-height: 5px;\n  width: 6px;\n  height: 6px;\n  background: #1a192b;\n  border: 1px solid white;\n  border-radius: 100%;\n}\n.react-flow__handle.connectionindicator {\n    pointer-events: all;\n    cursor: crosshair;\n  }\n.react-flow__handle-bottom {\n    top: auto;\n    left: 50%;\n    bottom: -4px;\n    transform: translate(-50%, 0);\n  }\n.react-flow__handle-top {\n    left: 50%;\n    top: -4px;\n    transform: translate(-50%, 0);\n  }\n.react-flow__handle-left {\n    top: 50%;\n    left: -4px;\n    transform: translate(0, -50%);\n  }\n.react-flow__handle-right {\n    right: -4px;\n    top: 50%;\n    transform: translate(0, -50%);\n  }\n.react-flow__edgeupdater {\n  cursor: move;\n  pointer-events: all;\n}\n.react-flow__panel {\n  position: absolute;\n  z-index: 5;\n  margin: 15px;\n}\n.react-flow__panel.top {\n    top: 0;\n  }\n.react-flow__panel.bottom {\n    bottom: 0;\n  }\n.react-flow__panel.left {\n    left: 0;\n  }\n.react-flow__panel.right {\n    right: 0;\n  }\n.react-flow__panel.center {\n    left: 50%;\n    transform: translateX(-50%);\n  }\n.react-flow__attribution {\n  font-size: 10px;\n  background: rgba(255, 255, 255, 0.5);\n  padding: 2px 3px;\n  margin: 0;\n}\n.react-flow__attribution a {\n    text-decoration: none;\n    color: #999;\n  }\n@-webkit-keyframes dashdraw {\n  from {\n    stroke-dashoffset: 10;\n  }\n}\n@keyframes dashdraw {\n  from {\n    stroke-dashoffset: 10;\n  }\n}\n.react-flow__edgelabel-renderer {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n}\n.react-flow__edge.updating .react-flow__edge-path {\n      stroke: #777;\n    }\n.react-flow__edge-text {\n    font-size: 10px;\n  }\n.react-flow__node.selectable:focus,\n  .react-flow__node.selectable:focus-visible {\n    outline: none;\n  }\n.react-flow__node-default,\n.react-flow__node-input,\n.react-flow__node-output,\n.react-flow__node-group {\n  padding: 10px;\n  border-radius: 3px;\n  width: 150px;\n  font-size: 12px;\n  color: #222;\n  text-align: center;\n  border-width: 1px;\n  border-style: solid;\n  border-color: #1a192b;\n  background-color: white;\n}\n.react-flow__node-default.selectable:hover, .react-flow__node-input.selectable:hover, .react-flow__node-output.selectable:hover, .react-flow__node-group.selectable:hover {\n      box-shadow: 0 1px 4px 1px rgba(0, 0, 0, 0.08);\n    }\n.react-flow__node-default.selectable.selected,\n    .react-flow__node-default.selectable:focus,\n    .react-flow__node-default.selectable:focus-visible,\n    .react-flow__node-input.selectable.selected,\n    .react-flow__node-input.selectable:focus,\n    .react-flow__node-input.selectable:focus-visible,\n    .react-flow__node-output.selectable.selected,\n    .react-flow__node-output.selectable:focus,\n    .react-flow__node-output.selectable:focus-visible,\n    .react-flow__node-group.selectable.selected,\n    .react-flow__node-group.selectable:focus,\n    .react-flow__node-group.selectable:focus-visible {\n      box-shadow: 0 0 0 0.5px #1a192b;\n    }\n.react-flow__node-group {\n  background-color: rgba(240, 240, 240, 0.25);\n}\n.react-flow__nodesselection-rect,\n.react-flow__selection {\n  background: rgba(0, 89, 220, 0.08);\n  border: 1px dotted rgba(0, 89, 220, 0.8);\n}\n.react-flow__nodesselection-rect:focus,\n  .react-flow__nodesselection-rect:focus-visible,\n  .react-flow__selection:focus,\n  .react-flow__selection:focus-visible {\n    outline: none;\n  }\n.react-flow__controls {\n  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.08);\n}\n.react-flow__controls-button {\n    border: none;\n    background: #fefefe;\n    border-bottom: 1px solid #eee;\n    box-sizing: content-box;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 16px;\n    height: 16px;\n    cursor: pointer;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n            user-select: none;\n    padding: 5px;\n  }\n.react-flow__controls-button:hover {\n      background: #f4f4f4;\n    }\n.react-flow__controls-button svg {\n      width: 100%;\n      max-width: 12px;\n      max-height: 12px;\n    }\n.react-flow__controls-button:disabled {\n      pointer-events: none;\n    }\n.react-flow__controls-button:disabled svg {\n        fill-opacity: 0.4;\n      }\n.react-flow__minimap {\n  background-color: #fff;\n}\n.react-flow__resize-control {\n  position: absolute;\n}\n.react-flow__resize-control.left,\n.react-flow__resize-control.right {\n  cursor: ew-resize;\n}\n.react-flow__resize-control.top,\n.react-flow__resize-control.bottom {\n  cursor: ns-resize;\n}\n.react-flow__resize-control.top.left,\n.react-flow__resize-control.bottom.right {\n  cursor: nwse-resize;\n}\n.react-flow__resize-control.bottom.left,\n.react-flow__resize-control.top.right {\n  cursor: nesw-resize;\n}\n/* handle styles */\n.react-flow__resize-control.handle {\n  width: 4px;\n  height: 4px;\n  border: 1px solid #fff;\n  border-radius: 1px;\n  background-color: #3367d9;\n  transform: translate(-50%, -50%);\n}\n.react-flow__resize-control.handle.left {\n  left: 0;\n  top: 50%;\n}\n.react-flow__resize-control.handle.right {\n  left: 100%;\n  top: 50%;\n}\n.react-flow__resize-control.handle.top {\n  left: 50%;\n  top: 0;\n}\n.react-flow__resize-control.handle.bottom {\n  left: 50%;\n  top: 100%;\n}\n.react-flow__resize-control.handle.top.left {\n  left: 0;\n}\n.react-flow__resize-control.handle.bottom.left {\n  left: 0;\n}\n.react-flow__resize-control.handle.top.right {\n  left: 100%;\n}\n.react-flow__resize-control.handle.bottom.right {\n  left: 100%;\n}\n/* line styles */\n.react-flow__resize-control.line {\n  border-color: #3367d9;\n  border-width: 0;\n  border-style: solid;\n}\n.react-flow__resize-control.line.left,\n.react-flow__resize-control.line.right {\n  width: 1px;\n  transform: translate(-50%, 0);\n  top: 0;\n  height: 100%;\n}\n.react-flow__resize-control.line.left {\n  left: 0;\n  border-left-width: 1px;\n}\n.react-flow__resize-control.line.right {\n  left: 100%;\n  border-right-width: 1px;\n}\n.react-flow__resize-control.line.top,\n.react-flow__resize-control.line.bottom {\n  height: 1px;\n  transform: translate(0, -50%);\n  left: 0;\n  width: 100%;\n}\n.react-flow__resize-control.line.top {\n  top: 0;\n  border-top-width: 1px;\n}\n.react-flow__resize-control.line.bottom {\n  border-bottom-width: 1px;\n  top: 100%;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/runtime/api.js":
/*!*********************************************************!*\
  !*** ../../node_modules/css-loader/dist/runtime/api.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "../../node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!****************************************************************!*\
  !*** ../../node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "../../node_modules/react-hook-form/dist/index.cjs.js":
/*!************************************************************!*\
  !*** ../../node_modules/react-hook-form/dist/index.cjs.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
function e(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}Object.defineProperty(exports, "__esModule", ({value:!0}));var t=e(__webpack_require__(/*! react */ "react")),r=e=>"checkbox"===e.type,s=e=>e instanceof Date,a=e=>null==e;const n=e=>"object"==typeof e;var i=e=>!a(e)&&!Array.isArray(e)&&n(e)&&!s(e),o=e=>i(e)&&e.target?r(e.target)?e.target.checked:e.target.value:e,u=(e,t)=>e.has((e=>e.substring(0,e.search(/\.\d+(\.|$)/))||e)(t)),l=e=>{const t=e.constructor&&e.constructor.prototype;return i(t)&&t.hasOwnProperty("isPrototypeOf")},c="undefined"!=typeof window&&void 0!==window.HTMLElement&&"undefined"!=typeof document;function d(e){let t;const r=Array.isArray(e);if(e instanceof Date)t=new Date(e);else if(e instanceof Set)t=new Set(e);else{if(c&&(e instanceof Blob||e instanceof FileList)||!r&&!i(e))return e;if(t=r?[]:{},r||l(e))for(const r in e)e.hasOwnProperty(r)&&(t[r]=d(e[r]));else t=e}return t}var f=e=>Array.isArray(e)?e.filter(Boolean):[],m=e=>void 0===e,y=(e,t,r)=>{if(!t||!i(e))return r;const s=f(t.split(/[,[\].]+?/)).reduce(((e,t)=>a(e)?e:e[t]),e);return m(s)||s===e?m(e[t])?r:e[t]:s};const p={BLUR:"blur",FOCUS_OUT:"focusout",CHANGE:"change"},h={onBlur:"onBlur",onChange:"onChange",onSubmit:"onSubmit",onTouched:"onTouched",all:"all"},g="max",_="min",v="maxLength",b="minLength",x="pattern",A="required",V="validate",F=t.default.createContext(null),S=()=>t.default.useContext(F);var w=(e,t,r,s=!0)=>{const a={defaultValues:t._defaultValues};for(const n in e)Object.defineProperty(a,n,{get:()=>{const a=n;return t._proxyFormState[a]!==h.all&&(t._proxyFormState[a]=!s||h.all),r&&(r[a]=!0),e[a]}});return a},k=e=>i(e)&&!Object.keys(e).length,D=(e,t,r,s)=>{r(e);const{name:a,...n}=e;return k(n)||Object.keys(n).length>=Object.keys(t).length||Object.keys(n).find((e=>t[e]===(!s||h.all)))},C=e=>Array.isArray(e)?e:[e],E=(e,t,r)=>r&&t?e===t||Array.isArray(e)&&e.some((e=>e&&r&&e===t)):!e||!t||e===t||C(e).some((e=>e&&(e.startsWith(t)||t.startsWith(e))));function O(e){const r=t.default.useRef(e);r.current=e,t.default.useEffect((()=>{const t=!e.disabled&&r.current.subject&&r.current.subject.subscribe({next:r.current.next});return()=>{t&&t.unsubscribe()}}),[e.disabled])}function j(e){const r=S(),{control:s=r.control,disabled:a,name:n,exact:i}=e||{},[o,u]=t.default.useState(s._formState),l=t.default.useRef(!0),c=t.default.useRef({isDirty:!1,isLoading:!1,dirtyFields:!1,touchedFields:!1,isValidating:!1,isValid:!1,errors:!1}),d=t.default.useRef(n);return d.current=n,O({disabled:a,next:e=>l.current&&E(d.current,e.name,i)&&D(e,c.current,s._updateFormState)&&u({...s._formState,...e}),subject:s._subjects.state}),t.default.useEffect((()=>(l.current=!0,c.current.isValid&&s._updateValid(!0),()=>{l.current=!1})),[s]),w(o,s,c.current,!1)}var T=e=>"string"==typeof e,U=(e,t,r,s,a)=>T(e)?(s&&t.watch.add(e),y(r,e,a)):Array.isArray(e)?e.map((e=>(s&&t.watch.add(e),y(r,e)))):(s&&(t.watchAll=!0),r);function B(e){const r=S(),{control:s=r.control,name:a,defaultValue:n,disabled:i,exact:o}=e||{},u=t.default.useRef(a);u.current=a,O({disabled:i,subject:s._subjects.values,next:e=>{E(u.current,e.name,o)&&c(d(U(u.current,s._names,e.values||s._formValues,!1,n)))}});const[l,c]=t.default.useState(s._getWatch(a,n));return t.default.useEffect((()=>s._removeUnmounted())),l}var L=e=>/^\w*$/.test(e),N=e=>f(e.replace(/["|']|\]/g,"").split(/\.|\[/));function M(e,t,r){let s=-1;const a=L(t)?[t]:N(t),n=a.length,o=n-1;for(;++s<n;){const t=a[s];let n=r;if(s!==o){const r=e[t];n=i(r)||Array.isArray(r)?r:isNaN(+a[s+1])?{}:[]}e[t]=n,e=e[t]}return e}function R(e){const r=S(),{name:s,disabled:a,control:n=r.control,shouldUnregister:i}=e,l=u(n._names.array,s),c=B({control:n,name:s,defaultValue:y(n._formValues,s,y(n._defaultValues,s,e.defaultValue)),exact:!0}),f=j({control:n,name:s}),h=t.default.useRef(n.register(s,{...e.rules,value:c}));return h.current=n.register(s,e.rules),t.default.useEffect((()=>{const e=n._options.shouldUnregister||i,t=(e,t)=>{const r=y(n._fields,e);r&&(r._f.mount=t)};if(t(s,!0),e){const e=d(y(n._options.defaultValues,s));M(n._defaultValues,s,e),m(y(n._formValues,s))&&M(n._formValues,s,e)}return()=>{(l?e&&!n._state.action:e)?n.unregister(s):t(s,!1)}}),[s,n,l,i]),t.default.useEffect((()=>{n._updateDisabledField({disabled:a,fields:n._fields,name:s})}),[a,s,n]),{field:{name:s,value:c,disabled:a,onChange:t.default.useCallback((e=>h.current.onChange({target:{value:o(e),name:s},type:p.CHANGE})),[s]),onBlur:t.default.useCallback((()=>h.current.onBlur({target:{value:y(n._formValues,s),name:s},type:p.BLUR})),[s,n]),ref:e=>{const t=y(n._fields,s);t&&e&&(t._f.ref={focus:()=>e.focus(),select:()=>e.select(),setCustomValidity:t=>e.setCustomValidity(t),reportValidity:()=>e.reportValidity()})}},formState:f,fieldState:Object.defineProperties({},{invalid:{enumerable:!0,get:()=>!!y(f.errors,s)},isDirty:{enumerable:!0,get:()=>!!y(f.dirtyFields,s)},isTouched:{enumerable:!0,get:()=>!!y(f.touchedFields,s)},error:{enumerable:!0,get:()=>y(f.errors,s)}})}}const P="post";var q=(e,t,r,s,a)=>t?{...r[e],types:{...r[e]&&r[e].types?r[e].types:{},[s]:a||!0}}:{};const W=(e,t,r)=>{for(const s of r||Object.keys(e)){const r=y(e,s);if(r){const{_f:e,...s}=r;if(e&&t(e.name)){if(e.ref.focus){e.ref.focus();break}if(e.refs&&e.refs[0].focus){e.refs[0].focus();break}}else i(s)&&W(s,t)}}};var $=()=>{const e="undefined"==typeof performance?Date.now():1e3*performance.now();return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(t=>{const r=(16*Math.random()+e)%16|0;return("x"==t?r:3&r|8).toString(16)}))},H=(e,t,r={})=>r.shouldFocus||m(r.shouldFocus)?r.focusName||`${e}.${m(r.focusIndex)?t:r.focusIndex}.`:"",I=e=>({isOnSubmit:!e||e===h.onSubmit,isOnBlur:e===h.onBlur,isOnChange:e===h.onChange,isOnAll:e===h.all,isOnTouch:e===h.onTouched}),G=(e,t,r)=>!r&&(t.watchAll||t.watch.has(e)||[...t.watch].some((t=>e.startsWith(t)&&/^\.\w+/.test(e.slice(t.length))))),J=(e,t,r)=>{const s=f(y(e,r));return M(s,"root",t[r]),M(e,r,s),e},z=e=>"boolean"==typeof e,K=e=>"file"===e.type,Q=e=>"function"==typeof e,X=e=>{if(!c)return!1;const t=e?e.ownerDocument:0;return e instanceof(t&&t.defaultView?t.defaultView.HTMLElement:HTMLElement)},Y=e=>T(e),Z=e=>"radio"===e.type,ee=e=>e instanceof RegExp;const te={value:!1,isValid:!1},re={value:!0,isValid:!0};var se=e=>{if(Array.isArray(e)){if(e.length>1){const t=e.filter((e=>e&&e.checked&&!e.disabled)).map((e=>e.value));return{value:t,isValid:!!t.length}}return e[0].checked&&!e[0].disabled?e[0].attributes&&!m(e[0].attributes.value)?m(e[0].value)||""===e[0].value?re:{value:e[0].value,isValid:!0}:re:te}return te};const ae={isValid:!1,value:null};var ne=e=>Array.isArray(e)?e.reduce(((e,t)=>t&&t.checked&&!t.disabled?{isValid:!0,value:t.value}:e),ae):ae;function ie(e,t,r="validate"){if(Y(e)||Array.isArray(e)&&e.every(Y)||z(e)&&!e)return{type:r,message:Y(e)?e:"",ref:t}}var oe=e=>i(e)&&!ee(e)?e:{value:e,message:""},ue=async(e,t,s,n,o)=>{const{ref:u,refs:l,required:c,maxLength:d,minLength:f,min:p,max:h,pattern:F,validate:S,name:w,valueAsNumber:D,mount:C,disabled:E}=e._f,O=y(t,w);if(!C||E)return{};const j=l?l[0]:u,U=e=>{n&&j.reportValidity&&(j.setCustomValidity(z(e)?"":e||""),j.reportValidity())},B={},L=Z(u),N=r(u),M=L||N,R=(D||K(u))&&m(u.value)&&m(O)||X(u)&&""===u.value||""===O||Array.isArray(O)&&!O.length,P=q.bind(null,w,s,B),W=(e,t,r,s=v,a=b)=>{const n=e?t:r;B[w]={type:e?s:a,message:n,ref:u,...P(e?s:a,n)}};if(o?!Array.isArray(O)||!O.length:c&&(!M&&(R||a(O))||z(O)&&!O||N&&!se(l).isValid||L&&!ne(l).isValid)){const{value:e,message:t}=Y(c)?{value:!!c,message:c}:oe(c);if(e&&(B[w]={type:A,message:t,ref:j,...P(A,t)},!s))return U(t),B}if(!(R||a(p)&&a(h))){let e,t;const r=oe(h),n=oe(p);if(a(O)||isNaN(O)){const s=u.valueAsDate||new Date(O),a=e=>new Date((new Date).toDateString()+" "+e),i="time"==u.type,o="week"==u.type;T(r.value)&&O&&(e=i?a(O)>a(r.value):o?O>r.value:s>new Date(r.value)),T(n.value)&&O&&(t=i?a(O)<a(n.value):o?O<n.value:s<new Date(n.value))}else{const s=u.valueAsNumber||(O?+O:O);a(r.value)||(e=s>r.value),a(n.value)||(t=s<n.value)}if((e||t)&&(W(!!e,r.message,n.message,g,_),!s))return U(B[w].message),B}if((d||f)&&!R&&(T(O)||o&&Array.isArray(O))){const e=oe(d),t=oe(f),r=!a(e.value)&&O.length>+e.value,n=!a(t.value)&&O.length<+t.value;if((r||n)&&(W(r,e.message,t.message),!s))return U(B[w].message),B}if(F&&!R&&T(O)){const{value:e,message:t}=oe(F);if(ee(e)&&!O.match(e)&&(B[w]={type:x,message:t,ref:u,...P(x,t)},!s))return U(t),B}if(S)if(Q(S)){const e=ie(await S(O,t),j);if(e&&(B[w]={...e,...P(V,e.message)},!s))return U(e.message),B}else if(i(S)){let e={};for(const r in S){if(!k(e)&&!s)break;const a=ie(await S[r](O,t),j,r);a&&(e={...a,...P(r,a.message)},U(a.message),s&&(B[w]=e))}if(!k(e)&&(B[w]={ref:j,...e},!s))return B}return U(!0),B};function le(e,t){return[...e,...C(t)]}var ce=e=>Array.isArray(e)?e.map((()=>{})):void 0;function de(e,t,r){return[...e.slice(0,t),...C(r),...e.slice(t)]}var fe=(e,t,r)=>Array.isArray(e)?(m(e[r])&&(e[r]=void 0),e.splice(r,0,e.splice(t,1)[0]),e):[];function me(e,t){return[...C(t),...C(e)]}var ye=(e,t)=>m(t)?[]:function(e,t){let r=0;const s=[...e];for(const e of t)s.splice(e-r,1),r++;return f(s).length?s:[]}(e,C(t).sort(((e,t)=>e-t))),pe=(e,t,r)=>{e[t]=[e[r],e[r]=e[t]][0]};function he(e,t){const r=Array.isArray(t)?t:L(t)?[t]:N(t),s=1===r.length?e:function(e,t){const r=t.slice(0,-1).length;let s=0;for(;s<r;)e=m(e)?s++:e[t[s++]];return e}(e,r),a=r.length-1,n=r[a];return s&&delete s[n],0!==a&&(i(s)&&k(s)||Array.isArray(s)&&function(e){for(const t in e)if(e.hasOwnProperty(t)&&!m(e[t]))return!1;return!0}(s))&&he(e,r.slice(0,-1)),e}var ge=(e,t,r)=>(e[t]=r,e);function _e(){let e=[];return{get observers(){return e},next:t=>{for(const r of e)r.next&&r.next(t)},subscribe:t=>(e.push(t),{unsubscribe:()=>{e=e.filter((e=>e!==t))}}),unsubscribe:()=>{e=[]}}}var ve=e=>a(e)||!n(e);function be(e,t){if(ve(e)||ve(t))return e===t;if(s(e)&&s(t))return e.getTime()===t.getTime();const r=Object.keys(e),a=Object.keys(t);if(r.length!==a.length)return!1;for(const n of r){const r=e[n];if(!a.includes(n))return!1;if("ref"!==n){const e=t[n];if(s(r)&&s(e)||i(r)&&i(e)||Array.isArray(r)&&Array.isArray(e)?!be(r,e):r!==e)return!1}}return!0}var xe=e=>"select-multiple"===e.type,Ae=e=>Z(e)||r(e),Ve=e=>X(e)&&e.isConnected,Fe=e=>{for(const t in e)if(Q(e[t]))return!0;return!1};function Se(e,t={}){const r=Array.isArray(e);if(i(e)||r)for(const r in e)Array.isArray(e[r])||i(e[r])&&!Fe(e[r])?(t[r]=Array.isArray(e[r])?[]:{},Se(e[r],t[r])):a(e[r])||(t[r]=!0);return t}function we(e,t,r){const s=Array.isArray(e);if(i(e)||s)for(const s in e)Array.isArray(e[s])||i(e[s])&&!Fe(e[s])?m(t)||ve(r[s])?r[s]=Array.isArray(e[s])?Se(e[s],[]):{...Se(e[s])}:we(e[s],a(t)?{}:t[s],r[s]):r[s]=!be(e[s],t[s]);return r}var ke=(e,t)=>we(e,t,Se(t)),De=(e,{valueAsNumber:t,valueAsDate:r,setValueAs:s})=>m(e)?e:t?""===e?NaN:e?+e:e:r&&T(e)?new Date(e):s?s(e):e;function Ce(e){const t=e.ref;if(!(e.refs?e.refs.every((e=>e.disabled)):t.disabled))return K(t)?t.files:Z(t)?ne(e.refs).value:xe(t)?[...t.selectedOptions].map((({value:e})=>e)):r(t)?se(e.refs).value:De(m(t.value)?e.ref.value:t.value,e)}var Ee=(e,t,r,s)=>{const a={};for(const r of e){const e=y(t,r);e&&M(a,r,e._f)}return{criteriaMode:r,names:[...e],fields:a,shouldUseNativeValidation:s}},Oe=e=>m(e)?e:ee(e)?e.source:i(e)?ee(e.value)?e.value.source:e.value:e,je=e=>e.mount&&(e.required||e.min||e.max||e.maxLength||e.minLength||e.pattern||e.validate);function Te(e,t,r){const s=y(e,r);if(s||L(r))return{error:s,name:r};const a=r.split(".");for(;a.length;){const s=a.join("."),n=y(t,s),i=y(e,s);if(n&&!Array.isArray(n)&&r!==s)return{name:r};if(i&&i.type)return{name:s,error:i};a.pop()}return{name:r}}var Ue=(e,t,r,s,a)=>!a.isOnAll&&(!r&&a.isOnTouch?!(t||e):(r?s.isOnBlur:a.isOnBlur)?!e:!(r?s.isOnChange:a.isOnChange)||e),Be=(e,t)=>!f(y(e,t)).length&&he(e,t);const Le={mode:h.onSubmit,reValidateMode:h.onChange,shouldFocusError:!0};function Ne(e={},t){let n,l={...Le,...e},g={submitCount:0,isDirty:!1,isLoading:Q(l.defaultValues),isValidating:!1,isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,touchedFields:{},dirtyFields:{},errors:{}},_={},v=(i(l.defaultValues)||i(l.values))&&d(l.defaultValues||l.values)||{},b=l.shouldUnregister?{}:d(v),x={action:!1,mount:!1,watch:!1},A={mount:new Set,unMount:new Set,array:new Set,watch:new Set},V=0;const F={isDirty:!1,dirtyFields:!1,touchedFields:!1,isValidating:!1,isValid:!1,errors:!1},S={values:_e(),array:_e(),state:_e()},w=e.resetOptions&&e.resetOptions.keepDirtyValues,D=I(l.mode),E=I(l.reValidateMode),O=l.criteriaMode===h.all,j=async e=>{if(F.isValid||e){const e=l.resolver?k((await P()).errors):await q(_,!0);e!==g.isValid&&S.state.next({isValid:e})}},B=e=>F.isValidating&&S.state.next({isValidating:e}),L=(e,t,r,s)=>{const a=y(_,e);if(a){const n=y(b,e,m(r)?y(v,e):r);m(n)||s&&s.defaultChecked||t?M(b,e,t?n:Ce(a._f)):Y(e,n),x.mount&&j()}},N=(e,t,r,s,a)=>{let n=!1,i=!1;const o={name:e};if(!r||s){F.isDirty&&(i=g.isDirty,g.isDirty=o.isDirty=$(),n=i!==o.isDirty);const r=be(y(v,e),t);i=y(g.dirtyFields,e),r?he(g.dirtyFields,e):M(g.dirtyFields,e,!0),o.dirtyFields=g.dirtyFields,n=n||F.dirtyFields&&i!==!r}if(r){const t=y(g.touchedFields,e);t||(M(g.touchedFields,e,r),o.touchedFields=g.touchedFields,n=n||F.touchedFields&&t!==r)}return n&&a&&S.state.next(o),n?o:{}},R=(t,r,s,a)=>{const i=y(g.errors,t),o=F.isValid&&z(r)&&g.isValid!==r;var u;if(e.delayError&&s?(u=()=>((e,t)=>{M(g.errors,e,t),S.state.next({errors:g.errors})})(t,s),n=e=>{clearTimeout(V),V=setTimeout(u,e)},n(e.delayError)):(clearTimeout(V),n=null,s?M(g.errors,t,s):he(g.errors,t)),(s?!be(i,s):i)||!k(a)||o){const e={...a,...o&&z(r)?{isValid:r}:{},errors:g.errors,name:t};g={...g,...e},S.state.next(e)}B(!1)},P=async e=>l.resolver(b,l.context,Ee(e||A.mount,_,l.criteriaMode,l.shouldUseNativeValidation)),q=async(e,t,r={valid:!0})=>{for(const s in e){const a=e[s];if(a){const{_f:e,...s}=a;if(e){const s=A.array.has(e.name),n=await ue(a,b,O,l.shouldUseNativeValidation&&!t,s);if(n[e.name]&&(r.valid=!1,t))break;!t&&(y(n,e.name)?s?J(g.errors,n,e.name):M(g.errors,e.name,n[e.name]):he(g.errors,e.name))}s&&await q(s,t,r)}}return r.valid},$=(e,t)=>(e&&t&&M(b,e,t),!be(se(),v)),H=(e,t,r)=>U(e,A,{...x.mount?b:m(t)?v:T(e)?{[e]:t}:t},r,t),Y=(e,t,s={})=>{const n=y(_,e);let i=t;if(n){const s=n._f;s&&(!s.disabled&&M(b,e,De(t,s)),i=X(s.ref)&&a(t)?"":t,xe(s.ref)?[...s.ref.options].forEach((e=>e.selected=i.includes(e.value))):s.refs?r(s.ref)?s.refs.length>1?s.refs.forEach((e=>(!e.defaultChecked||!e.disabled)&&(e.checked=Array.isArray(i)?!!i.find((t=>t===e.value)):i===e.value))):s.refs[0]&&(s.refs[0].checked=!!i):s.refs.forEach((e=>e.checked=e.value===i)):K(s.ref)?s.ref.value="":(s.ref.value=i,s.ref.type||S.values.next({name:e,values:{...b}})))}(s.shouldDirty||s.shouldTouch)&&N(e,i,s.shouldTouch,s.shouldDirty,!0),s.shouldValidate&&re(e)},Z=(e,t,r)=>{for(const a in t){const n=t[a],i=`${e}.${a}`,o=y(_,i);!A.array.has(e)&&ve(n)&&(!o||o._f)||s(n)?Y(i,n,r):Z(i,n,r)}},ee=(e,r,s={})=>{const n=y(_,e),i=A.array.has(e),o=d(r);M(b,e,o),i?(S.array.next({name:e,values:{...b}}),(F.isDirty||F.dirtyFields)&&s.shouldDirty&&S.state.next({name:e,dirtyFields:ke(v,b),isDirty:$(e,o)})):!n||n._f||a(o)?Y(e,o,s):Z(e,o,s),G(e,A)&&S.state.next({...g}),S.values.next({name:e,values:{...b}}),!x.mount&&t()},te=async e=>{const t=e.target;let r=t.name,s=!0;const a=y(_,r);if(a){let i,u;const c=t.type?Ce(a._f):o(e),d=e.type===p.BLUR||e.type===p.FOCUS_OUT,f=!je(a._f)&&!l.resolver&&!y(g.errors,r)&&!a._f.deps||Ue(d,y(g.touchedFields,r),g.isSubmitted,E,D),m=G(r,A,d);M(b,r,c),d?(a._f.onBlur&&a._f.onBlur(e),n&&n(0)):a._f.onChange&&a._f.onChange(e);const h=N(r,c,d,!1),v=!k(h)||m;if(!d&&S.values.next({name:r,type:e.type,values:{...b}}),f)return F.isValid&&j(),v&&S.state.next({name:r,...m?{}:h});if(!d&&m&&S.state.next({...g}),B(!0),l.resolver){const{errors:e}=await P([r]),t=Te(g.errors,_,r),s=Te(e,_,t.name||r);i=s.error,r=s.name,u=k(e)}else i=(await ue(a,b,O,l.shouldUseNativeValidation))[r],s=isNaN(c)||c===y(b,r,c),s&&(i?u=!1:F.isValid&&(u=await q(_,!0)));s&&(a._f.deps&&re(a._f.deps),R(r,u,i,h))}},re=async(e,t={})=>{let r,s;const a=C(e);if(B(!0),l.resolver){const t=await(async e=>{const{errors:t}=await P(e);if(e)for(const r of e){const e=y(t,r);e?M(g.errors,r,e):he(g.errors,r)}else g.errors=t;return t})(m(e)?e:a);r=k(t),s=e?!a.some((e=>y(t,e))):r}else e?(s=(await Promise.all(a.map((async e=>{const t=y(_,e);return await q(t&&t._f?{[e]:t}:t)})))).every(Boolean),(s||g.isValid)&&j()):s=r=await q(_);return S.state.next({...!T(e)||F.isValid&&r!==g.isValid?{}:{name:e},...l.resolver||!e?{isValid:r}:{},errors:g.errors,isValidating:!1}),t.shouldFocus&&!s&&W(_,(e=>e&&y(g.errors,e)),e?a:A.mount),s},se=e=>{const t={...v,...x.mount?b:{}};return m(e)?t:T(e)?y(t,e):e.map((e=>y(t,e)))},ae=(e,t)=>({invalid:!!y((t||g).errors,e),isDirty:!!y((t||g).dirtyFields,e),isTouched:!!y((t||g).touchedFields,e),error:y((t||g).errors,e)}),ne=(e,t,r)=>{const s=(y(_,e,{_f:{}})._f||{}).ref;M(g.errors,e,{...t,ref:s}),S.state.next({name:e,errors:g.errors,isValid:!1}),r&&r.shouldFocus&&s&&s.focus&&s.focus()},ie=(e,t={})=>{for(const r of e?C(e):A.mount)A.mount.delete(r),A.array.delete(r),t.keepValue||(he(_,r),he(b,r)),!t.keepError&&he(g.errors,r),!t.keepDirty&&he(g.dirtyFields,r),!t.keepTouched&&he(g.touchedFields,r),!l.shouldUnregister&&!t.keepDefaultValue&&he(v,r);S.values.next({values:{...b}}),S.state.next({...g,...t.keepDirty?{isDirty:$()}:{}}),!t.keepIsValid&&j()},oe=({disabled:e,name:t,field:r,fields:s})=>{if(z(e)){const a=e?void 0:y(b,t,Ce(r?r._f:y(s,t)._f));M(b,t,a),N(t,a,!1,!1,!0)}},le=(e,t={})=>{let r=y(_,e);const s=z(t.disabled);return M(_,e,{...r||{},_f:{...r&&r._f?r._f:{ref:{name:e}},name:e,mount:!0,...t}}),A.mount.add(e),r?oe({field:r,disabled:t.disabled,name:e}):L(e,!0,t.value),{...s?{disabled:t.disabled}:{},...l.progressive?{required:!!t.required,min:Oe(t.min),max:Oe(t.max),minLength:Oe(t.minLength),maxLength:Oe(t.maxLength),pattern:Oe(t.pattern)}:{},name:e,onChange:te,onBlur:te,ref:s=>{if(s){le(e,t),r=y(_,e);const a=m(s.value)&&s.querySelectorAll&&s.querySelectorAll("input,select,textarea")[0]||s,n=Ae(a),i=r._f.refs||[];if(n?i.find((e=>e===a)):a===r._f.ref)return;M(_,e,{_f:{...r._f,...n?{refs:[...i.filter(Ve),a,...Array.isArray(y(v,e))?[{}]:[]],ref:{type:a.type,name:e}}:{ref:a}}}),L(e,!1,void 0,a)}else r=y(_,e,{}),r._f&&(r._f.mount=!1),(l.shouldUnregister||t.shouldUnregister)&&(!u(A.array,e)||!x.action)&&A.unMount.add(e)}}},ce=()=>l.shouldFocusError&&W(_,(e=>e&&y(g.errors,e)),A.mount),de=(e,t)=>async r=>{r&&(r.preventDefault&&r.preventDefault(),r.persist&&r.persist());let s=d(b);if(S.state.next({isSubmitting:!0}),l.resolver){const{errors:e,values:t}=await P();g.errors=e,s=t}else await q(_);he(g.errors,"root"),k(g.errors)?(S.state.next({errors:{}}),await e(s,r)):(t&&await t({...g.errors},r),ce(),setTimeout(ce)),S.state.next({isSubmitted:!0,isSubmitting:!1,isSubmitSuccessful:k(g.errors),submitCount:g.submitCount+1,errors:g.errors})},fe=(r,s={})=>{const a=r?d(r):v,n=d(a),i=r&&!k(r)?n:v;if(s.keepDefaultValues||(v=a),!s.keepValues){if(s.keepDirtyValues||w)for(const e of A.mount)y(g.dirtyFields,e)?M(i,e,y(b,e)):ee(e,y(i,e));else{if(c&&m(r))for(const e of A.mount){const t=y(_,e);if(t&&t._f){const e=Array.isArray(t._f.refs)?t._f.refs[0]:t._f.ref;if(X(e)){const t=e.closest("form");if(t){t.reset();break}}}}_={}}b=e.shouldUnregister?s.keepDefaultValues?d(v):{}:d(i),S.array.next({values:{...i}}),S.values.next({values:{...i}})}A={mount:new Set,unMount:new Set,array:new Set,watch:new Set,watchAll:!1,focus:""},!x.mount&&t(),x.mount=!F.isValid||!!s.keepIsValid,x.watch=!!e.shouldUnregister,S.state.next({submitCount:s.keepSubmitCount?g.submitCount:0,isDirty:s.keepDirty?g.isDirty:!(!s.keepDefaultValues||be(r,v)),isSubmitted:!!s.keepIsSubmitted&&g.isSubmitted,dirtyFields:s.keepDirtyValues?g.dirtyFields:s.keepDefaultValues&&r?ke(v,r):{},touchedFields:s.keepTouched?g.touchedFields:{},errors:s.keepErrors?g.errors:{},isSubmitting:!1,isSubmitSuccessful:!1})},me=(e,t)=>fe(Q(e)?e(b):e,t);return{control:{register:le,unregister:ie,getFieldState:ae,handleSubmit:de,setError:ne,_executeSchema:P,_getWatch:H,_getDirty:$,_updateValid:j,_removeUnmounted:()=>{for(const e of A.unMount){const t=y(_,e);t&&(t._f.refs?t._f.refs.every((e=>!Ve(e))):!Ve(t._f.ref))&&ie(e)}A.unMount=new Set},_updateFieldArray:(e,t=[],r,s,a=!0,n=!0)=>{if(s&&r){if(x.action=!0,n&&Array.isArray(y(_,e))){const t=r(y(_,e),s.argA,s.argB);a&&M(_,e,t)}if(n&&Array.isArray(y(g.errors,e))){const t=r(y(g.errors,e),s.argA,s.argB);a&&M(g.errors,e,t),Be(g.errors,e)}if(F.touchedFields&&n&&Array.isArray(y(g.touchedFields,e))){const t=r(y(g.touchedFields,e),s.argA,s.argB);a&&M(g.touchedFields,e,t)}F.dirtyFields&&(g.dirtyFields=ke(v,b)),S.state.next({name:e,isDirty:$(e,t),dirtyFields:g.dirtyFields,errors:g.errors,isValid:g.isValid})}else M(b,e,t)},_updateDisabledField:oe,_getFieldArray:t=>f(y(x.mount?b:v,t,e.shouldUnregister?y(v,t,[]):[])),_reset:fe,_resetDefaultValues:()=>Q(l.defaultValues)&&l.defaultValues().then((e=>{me(e,l.resetOptions),S.state.next({isLoading:!1})})),_updateFormState:e=>{g={...g,...e}},_subjects:S,_proxyFormState:F,get _fields(){return _},get _formValues(){return b},get _state(){return x},set _state(e){x=e},get _defaultValues(){return v},get _names(){return A},set _names(e){A=e},get _formState(){return g},set _formState(e){g=e},get _options(){return l},set _options(e){l={...l,...e}}},trigger:re,register:le,handleSubmit:de,watch:(e,t)=>Q(e)?S.values.subscribe({next:r=>e(H(void 0,t),r)}):H(e,t,!0),setValue:ee,getValues:se,reset:me,resetField:(e,t={})=>{y(_,e)&&(m(t.defaultValue)?ee(e,y(v,e)):(ee(e,t.defaultValue),M(v,e,t.defaultValue)),t.keepTouched||he(g.touchedFields,e),t.keepDirty||(he(g.dirtyFields,e),g.isDirty=t.defaultValue?$(e,y(v,e)):$()),t.keepError||(he(g.errors,e),F.isValid&&j()),S.state.next({...g}))},clearErrors:e=>{e&&C(e).forEach((e=>he(g.errors,e))),S.state.next({errors:e?g.errors:{}})},unregister:ie,setError:ne,setFocus:(e,t={})=>{const r=y(_,e),s=r&&r._f;if(s){const e=s.refs?s.refs[0]:s.ref;e.focus&&(e.focus(),t.shouldSelect&&e.select())}},getFieldState:ae}}exports.Controller=e=>e.render(R(e)),exports.Form=function(e){const r=S(),[s,a]=t.default.useState(!1),{control:n=r.control,onSubmit:i,children:o,action:u,method:l=P,headers:c,encType:d,onError:f,render:m,onSuccess:p,validateStatus:h,...g}=e,_=async t=>{let r=!1,s="";await n.handleSubmit((async e=>{const a=new FormData;let o="";try{o=JSON.stringify(e)}catch(e){}for(const t of n._names.mount)a.append(t,y(e,t));if(i&&await i({data:e,event:t,method:l,formData:a,formDataJson:o}),u)try{const e=[c&&c["Content-Type"],d].some((e=>e&&e.includes("json"))),t=await fetch(u,{method:l,headers:{...c,...d?{"Content-Type":d}:{}},body:e?o:a});t&&(h?!h(t.status):t.status<200||t.status>=300)?(r=!0,f&&f({response:t}),s=String(t.status)):p&&p({response:t})}catch(e){r=!0,f&&f({error:e})}}))(t),r&&e.control&&(e.control._subjects.state.next({isSubmitSuccessful:!1}),e.control.setError("root.server",{type:s}))};return t.default.useEffect((()=>{a(!0)}),[]),m?t.default.createElement(t.default.Fragment,null,m({submit:_})):t.default.createElement("form",{noValidate:s,action:u,method:l,encType:d,onSubmit:_,...g},o)},exports.FormProvider=e=>{const{children:r,...s}=e;return t.default.createElement(F.Provider,{value:s},r)},exports.appendErrors=q,exports.get=y,exports.set=M,exports.useController=R,exports.useFieldArray=function(e){const r=S(),{control:s=r.control,name:a,keyName:n="id",shouldUnregister:i}=e,[o,u]=t.default.useState(s._getFieldArray(a)),l=t.default.useRef(s._getFieldArray(a).map($)),c=t.default.useRef(o),f=t.default.useRef(a),m=t.default.useRef(!1);f.current=a,c.current=o,s._names.array.add(a),e.rules&&s.register(a,e.rules),O({next:({values:e,name:t})=>{if(t===f.current||!t){const t=y(e,f.current);Array.isArray(t)&&(u(t),l.current=t.map($))}},subject:s._subjects.array});const p=t.default.useCallback((e=>{m.current=!0,s._updateFieldArray(a,e)}),[s,a]);return t.default.useEffect((()=>{if(s._state.action=!1,G(a,s._names)&&s._subjects.state.next({...s._formState}),m.current&&(!I(s._options.mode).isOnSubmit||s._formState.isSubmitted))if(s._options.resolver)s._executeSchema([a]).then((e=>{const t=y(e.errors,a),r=y(s._formState.errors,a);(r?!t&&r.type||t&&(r.type!==t.type||r.message!==t.message):t&&t.type)&&(t?M(s._formState.errors,a,t):he(s._formState.errors,a),s._subjects.state.next({errors:s._formState.errors}))}));else{const e=y(s._fields,a);e&&e._f&&ue(e,s._formValues,s._options.criteriaMode===h.all,s._options.shouldUseNativeValidation,!0).then((e=>!k(e)&&s._subjects.state.next({errors:J(s._formState.errors,e,a)})))}s._subjects.values.next({name:a,values:{...s._formValues}}),s._names.focus&&W(s._fields,(e=>!!e&&e.startsWith(s._names.focus||""))),s._names.focus="",s._updateValid(),m.current=!1}),[o,a,s]),t.default.useEffect((()=>(!y(s._formValues,a)&&s._updateFieldArray(a),()=>{(s._options.shouldUnregister||i)&&s.unregister(a)})),[a,s,n,i]),{swap:t.default.useCallback(((e,t)=>{const r=s._getFieldArray(a);pe(r,e,t),pe(l.current,e,t),p(r),u(r),s._updateFieldArray(a,r,pe,{argA:e,argB:t},!1)}),[p,a,s]),move:t.default.useCallback(((e,t)=>{const r=s._getFieldArray(a);fe(r,e,t),fe(l.current,e,t),p(r),u(r),s._updateFieldArray(a,r,fe,{argA:e,argB:t},!1)}),[p,a,s]),prepend:t.default.useCallback(((e,t)=>{const r=C(d(e)),n=me(s._getFieldArray(a),r);s._names.focus=H(a,0,t),l.current=me(l.current,r.map($)),p(n),u(n),s._updateFieldArray(a,n,me,{argA:ce(e)})}),[p,a,s]),append:t.default.useCallback(((e,t)=>{const r=C(d(e)),n=le(s._getFieldArray(a),r);s._names.focus=H(a,n.length-1,t),l.current=le(l.current,r.map($)),p(n),u(n),s._updateFieldArray(a,n,le,{argA:ce(e)})}),[p,a,s]),remove:t.default.useCallback((e=>{const t=ye(s._getFieldArray(a),e);l.current=ye(l.current,e),p(t),u(t),s._updateFieldArray(a,t,ye,{argA:e})}),[p,a,s]),insert:t.default.useCallback(((e,t,r)=>{const n=C(d(t)),i=de(s._getFieldArray(a),e,n);s._names.focus=H(a,e,r),l.current=de(l.current,e,n.map($)),p(i),u(i),s._updateFieldArray(a,i,de,{argA:e,argB:ce(t)})}),[p,a,s]),update:t.default.useCallback(((e,t)=>{const r=d(t),n=ge(s._getFieldArray(a),e,r);l.current=[...n].map(((t,r)=>t&&r!==e?l.current[r]:$())),p(n),u([...n]),s._updateFieldArray(a,n,ge,{argA:e,argB:r},!0,!1)}),[p,a,s]),replace:t.default.useCallback((e=>{const t=C(d(e));l.current=t.map($),p([...t]),u([...t]),s._updateFieldArray(a,[...t],(e=>e),{},!0,!1)}),[p,a,s]),fields:t.default.useMemo((()=>o.map(((e,t)=>({...e,[n]:l.current[t]||$()})))),[o,n])}},exports.useForm=function(e={}){const r=t.default.useRef(),s=t.default.useRef(),[a,n]=t.default.useState({isDirty:!1,isValidating:!1,isLoading:Q(e.defaultValues),isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,submitCount:0,dirtyFields:{},touchedFields:{},errors:{},defaultValues:Q(e.defaultValues)?void 0:e.defaultValues});r.current||(r.current={...Ne(e,(()=>n((e=>({...e}))))),formState:a});const i=r.current.control;return i._options=e,O({subject:i._subjects.state,next:e=>{D(e,i._proxyFormState,i._updateFormState,!0)&&n({...i._formState})}}),t.default.useEffect((()=>{e.values&&!be(e.values,s.current)?(i._reset(e.values,i._options.resetOptions),s.current=e.values):i._resetDefaultValues()}),[e.values,i]),t.default.useEffect((()=>{i._state.mount||(i._updateValid(),i._state.mount=!0),i._state.watch&&(i._state.watch=!1,i._subjects.state.next({...i._formState})),i._removeUnmounted()})),r.current.formState=w(a,i),r.current},exports.useFormContext=S,exports.useFormState=j,exports.useWatch=B;
//# sourceMappingURL=index.cjs.js.map


/***/ }),

/***/ "../../node_modules/react/cjs/react-jsx-runtime.development.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/react/cjs/react-jsx-runtime.development.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  (function() {
'use strict';

var React = __webpack_require__(/*! react */ "react");

// ATTENTION
// When adding new symbols to this file,
// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
// The Symbol used to tag the ReactElement-like types.
var REACT_ELEMENT_TYPE = Symbol.for('react.element');
var REACT_PORTAL_TYPE = Symbol.for('react.portal');
var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
var REACT_CONTEXT_TYPE = Symbol.for('react.context');
var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
var REACT_MEMO_TYPE = Symbol.for('react.memo');
var REACT_LAZY_TYPE = Symbol.for('react.lazy');
var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';
function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable !== 'object') {
    return null;
  }

  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }

  return null;
}

var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

function error(format) {
  {
    {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      printWarning('error', format, args);
    }
  }
}

function printWarning(level, format, args) {
  // When changing this logic, you might want to also
  // update consoleWithStackDev.www.js as well.
  {
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = ReactDebugCurrentFrame.getStackAddendum();

    if (stack !== '') {
      format += '%s';
      args = args.concat([stack]);
    } // eslint-disable-next-line react-internal/safe-string-coercion


    var argsWithFormat = args.map(function (item) {
      return String(item);
    }); // Careful: RN currently depends on this prefix

    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
    // breaks IE9: https://github.com/facebook/react/issues/13610
    // eslint-disable-next-line react-internal/no-production-logging

    Function.prototype.apply.call(console[level], console, argsWithFormat);
  }
}

// -----------------------------------------------------------------------------

var enableScopeAPI = false; // Experimental Create Event Handle API.
var enableCacheElement = false;
var enableTransitionTracing = false; // No known bugs, but needs performance testing

var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
// stuff. Intended to enable React core members to more easily debug scheduling
// issues in DEV builds.

var enableDebugTracing = false; // Track which Fiber(s) schedule render work.

var REACT_MODULE_REFERENCE;

{
  REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
}

function isValidElementType(type) {
  if (typeof type === 'string' || typeof type === 'function') {
    return true;
  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


  if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing  || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden  || type === REACT_OFFSCREEN_TYPE || enableScopeAPI  || enableCacheElement  || enableTransitionTracing ) {
    return true;
  }

  if (typeof type === 'object' && type !== null) {
    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
      return true;
    }
  }

  return false;
}

function getWrappedName(outerType, innerType, wrapperName) {
  var displayName = outerType.displayName;

  if (displayName) {
    return displayName;
  }

  var functionName = innerType.displayName || innerType.name || '';
  return functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName;
} // Keep in sync with react-reconciler/getComponentNameFromFiber


function getContextName(type) {
  return type.displayName || 'Context';
} // Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.


function getComponentNameFromType(type) {
  if (type == null) {
    // Host root, text node or just invalid type.
    return null;
  }

  {
    if (typeof type.tag === 'number') {
      error('Received an unexpected object in getComponentNameFromType(). ' + 'This is likely a bug in React. Please file an issue.');
    }
  }

  if (typeof type === 'function') {
    return type.displayName || type.name || null;
  }

  if (typeof type === 'string') {
    return type;
  }

  switch (type) {
    case REACT_FRAGMENT_TYPE:
      return 'Fragment';

    case REACT_PORTAL_TYPE:
      return 'Portal';

    case REACT_PROFILER_TYPE:
      return 'Profiler';

    case REACT_STRICT_MODE_TYPE:
      return 'StrictMode';

    case REACT_SUSPENSE_TYPE:
      return 'Suspense';

    case REACT_SUSPENSE_LIST_TYPE:
      return 'SuspenseList';

  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        var context = type;
        return getContextName(context) + '.Consumer';

      case REACT_PROVIDER_TYPE:
        var provider = type;
        return getContextName(provider._context) + '.Provider';

      case REACT_FORWARD_REF_TYPE:
        return getWrappedName(type, type.render, 'ForwardRef');

      case REACT_MEMO_TYPE:
        var outerName = type.displayName || null;

        if (outerName !== null) {
          return outerName;
        }

        return getComponentNameFromType(type.type) || 'Memo';

      case REACT_LAZY_TYPE:
        {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;

          try {
            return getComponentNameFromType(init(payload));
          } catch (x) {
            return null;
          }
        }

      // eslint-disable-next-line no-fallthrough
    }
  }

  return null;
}

var assign = Object.assign;

// Helpers to patch console.logs to avoid logging during side-effect free
// replaying on render function. This currently only patches the object
// lazily which won't cover if the log function was extracted eagerly.
// We could also eagerly patch the method.
var disabledDepth = 0;
var prevLog;
var prevInfo;
var prevWarn;
var prevError;
var prevGroup;
var prevGroupCollapsed;
var prevGroupEnd;

function disabledLog() {}

disabledLog.__reactDisabledLog = true;
function disableLogs() {
  {
    if (disabledDepth === 0) {
      /* eslint-disable react-internal/no-production-logging */
      prevLog = console.log;
      prevInfo = console.info;
      prevWarn = console.warn;
      prevError = console.error;
      prevGroup = console.group;
      prevGroupCollapsed = console.groupCollapsed;
      prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

      var props = {
        configurable: true,
        enumerable: true,
        value: disabledLog,
        writable: true
      }; // $FlowFixMe Flow thinks console is immutable.

      Object.defineProperties(console, {
        info: props,
        log: props,
        warn: props,
        error: props,
        group: props,
        groupCollapsed: props,
        groupEnd: props
      });
      /* eslint-enable react-internal/no-production-logging */
    }

    disabledDepth++;
  }
}
function reenableLogs() {
  {
    disabledDepth--;

    if (disabledDepth === 0) {
      /* eslint-disable react-internal/no-production-logging */
      var props = {
        configurable: true,
        enumerable: true,
        writable: true
      }; // $FlowFixMe Flow thinks console is immutable.

      Object.defineProperties(console, {
        log: assign({}, props, {
          value: prevLog
        }),
        info: assign({}, props, {
          value: prevInfo
        }),
        warn: assign({}, props, {
          value: prevWarn
        }),
        error: assign({}, props, {
          value: prevError
        }),
        group: assign({}, props, {
          value: prevGroup
        }),
        groupCollapsed: assign({}, props, {
          value: prevGroupCollapsed
        }),
        groupEnd: assign({}, props, {
          value: prevGroupEnd
        })
      });
      /* eslint-enable react-internal/no-production-logging */
    }

    if (disabledDepth < 0) {
      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
    }
  }
}

var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
var prefix;
function describeBuiltInComponentFrame(name, source, ownerFn) {
  {
    if (prefix === undefined) {
      // Extract the VM specific prefix used by each line.
      try {
        throw Error();
      } catch (x) {
        var match = x.stack.trim().match(/\n( *(at )?)/);
        prefix = match && match[1] || '';
      }
    } // We use the prefix to ensure our stacks line up with native stack frames.


    return '\n' + prefix + name;
  }
}
var reentry = false;
var componentFrameCache;

{
  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
  componentFrameCache = new PossiblyWeakMap();
}

function describeNativeComponentFrame(fn, construct) {
  // If something asked for a stack inside a fake render, it should get ignored.
  if ( !fn || reentry) {
    return '';
  }

  {
    var frame = componentFrameCache.get(fn);

    if (frame !== undefined) {
      return frame;
    }
  }

  var control;
  reentry = true;
  var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

  Error.prepareStackTrace = undefined;
  var previousDispatcher;

  {
    previousDispatcher = ReactCurrentDispatcher.current; // Set the dispatcher in DEV because this might be call in the render function
    // for warnings.

    ReactCurrentDispatcher.current = null;
    disableLogs();
  }

  try {
    // This should throw.
    if (construct) {
      // Something should be setting the props in the constructor.
      var Fake = function () {
        throw Error();
      }; // $FlowFixMe


      Object.defineProperty(Fake.prototype, 'props', {
        set: function () {
          // We use a throwing setter instead of frozen or non-writable props
          // because that won't throw in a non-strict mode function.
          throw Error();
        }
      });

      if (typeof Reflect === 'object' && Reflect.construct) {
        // We construct a different control for this case to include any extra
        // frames added by the construct call.
        try {
          Reflect.construct(Fake, []);
        } catch (x) {
          control = x;
        }

        Reflect.construct(fn, [], Fake);
      } else {
        try {
          Fake.call();
        } catch (x) {
          control = x;
        }

        fn.call(Fake.prototype);
      }
    } else {
      try {
        throw Error();
      } catch (x) {
        control = x;
      }

      fn();
    }
  } catch (sample) {
    // This is inlined manually because closure doesn't do it for us.
    if (sample && control && typeof sample.stack === 'string') {
      // This extracts the first frame from the sample that isn't also in the control.
      // Skipping one frame that we assume is the frame that calls the two.
      var sampleLines = sample.stack.split('\n');
      var controlLines = control.stack.split('\n');
      var s = sampleLines.length - 1;
      var c = controlLines.length - 1;

      while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
        // We expect at least one stack frame to be shared.
        // Typically this will be the root most one. However, stack frames may be
        // cut off due to maximum stack limits. In this case, one maybe cut off
        // earlier than the other. We assume that the sample is longer or the same
        // and there for cut off earlier. So we should find the root most frame in
        // the sample somewhere in the control.
        c--;
      }

      for (; s >= 1 && c >= 0; s--, c--) {
        // Next we find the first one that isn't the same which should be the
        // frame that called our sample function and the control.
        if (sampleLines[s] !== controlLines[c]) {
          // In V8, the first line is describing the message but other VMs don't.
          // If we're about to return the first line, and the control is also on the same
          // line, that's a pretty good indicator that our sample threw at same line as
          // the control. I.e. before we entered the sample frame. So we ignore this result.
          // This can happen if you passed a class to function component, or non-function.
          if (s !== 1 || c !== 1) {
            do {
              s--;
              c--; // We may still have similar intermediate frames from the construct call.
              // The next one that isn't the same should be our match though.

              if (c < 0 || sampleLines[s] !== controlLines[c]) {
                // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at '); // If our component frame is labeled "<anonymous>"
                // but we have a user-provided "displayName"
                // splice it in to make the stack more readable.


                if (fn.displayName && _frame.includes('<anonymous>')) {
                  _frame = _frame.replace('<anonymous>', fn.displayName);
                }

                {
                  if (typeof fn === 'function') {
                    componentFrameCache.set(fn, _frame);
                  }
                } // Return the line we found.


                return _frame;
              }
            } while (s >= 1 && c >= 0);
          }

          break;
        }
      }
    }
  } finally {
    reentry = false;

    {
      ReactCurrentDispatcher.current = previousDispatcher;
      reenableLogs();
    }

    Error.prepareStackTrace = previousPrepareStackTrace;
  } // Fallback to just using the name if we couldn't make it throw.


  var name = fn ? fn.displayName || fn.name : '';
  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

  {
    if (typeof fn === 'function') {
      componentFrameCache.set(fn, syntheticFrame);
    }
  }

  return syntheticFrame;
}
function describeFunctionComponentFrame(fn, source, ownerFn) {
  {
    return describeNativeComponentFrame(fn, false);
  }
}

function shouldConstruct(Component) {
  var prototype = Component.prototype;
  return !!(prototype && prototype.isReactComponent);
}

function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {

  if (type == null) {
    return '';
  }

  if (typeof type === 'function') {
    {
      return describeNativeComponentFrame(type, shouldConstruct(type));
    }
  }

  if (typeof type === 'string') {
    return describeBuiltInComponentFrame(type);
  }

  switch (type) {
    case REACT_SUSPENSE_TYPE:
      return describeBuiltInComponentFrame('Suspense');

    case REACT_SUSPENSE_LIST_TYPE:
      return describeBuiltInComponentFrame('SuspenseList');
  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_FORWARD_REF_TYPE:
        return describeFunctionComponentFrame(type.render);

      case REACT_MEMO_TYPE:
        // Memo may contain any component type so we recursively resolve it.
        return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

      case REACT_LAZY_TYPE:
        {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;

          try {
            // Lazy may contain any component type so we recursively resolve it.
            return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
          } catch (x) {}
        }
    }
  }

  return '';
}

var hasOwnProperty = Object.prototype.hasOwnProperty;

var loggedTypeFailures = {};
var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;

function setCurrentlyValidatingElement(element) {
  {
    if (element) {
      var owner = element._owner;
      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
      ReactDebugCurrentFrame.setExtraStackFrame(stack);
    } else {
      ReactDebugCurrentFrame.setExtraStackFrame(null);
    }
  }
}

function checkPropTypes(typeSpecs, values, location, componentName, element) {
  {
    // $FlowFixMe This is okay but Flow doesn't know it.
    var has = Function.call.bind(hasOwnProperty);

    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.

        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            // eslint-disable-next-line react-internal/prod-error-codes
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
            err.name = 'Invariant Violation';
            throw err;
          }

          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
        } catch (ex) {
          error$1 = ex;
        }

        if (error$1 && !(error$1 instanceof Error)) {
          setCurrentlyValidatingElement(element);

          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);

          setCurrentlyValidatingElement(null);
        }

        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error$1.message] = true;
          setCurrentlyValidatingElement(element);

          error('Failed %s type: %s', location, error$1.message);

          setCurrentlyValidatingElement(null);
        }
      }
    }
  }
}

var isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

function isArray(a) {
  return isArrayImpl(a);
}

/*
 * The `'' + value` pattern (used in in perf-sensitive code) throws for Symbol
 * and Temporal.* types. See https://github.com/facebook/react/pull/22064.
 *
 * The functions in this module will throw an easier-to-understand,
 * easier-to-debug exception with a clear errors message message explaining the
 * problem. (Instead of a confusing exception thrown inside the implementation
 * of the `value` object).
 */
// $FlowFixMe only called in DEV, so void return is not possible.
function typeName(value) {
  {
    // toStringTag is needed for namespaced types like Temporal.Instant
    var hasToStringTag = typeof Symbol === 'function' && Symbol.toStringTag;
    var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || 'Object';
    return type;
  }
} // $FlowFixMe only called in DEV, so void return is not possible.


function willCoercionThrow(value) {
  {
    try {
      testStringCoercion(value);
      return false;
    } catch (e) {
      return true;
    }
  }
}

function testStringCoercion(value) {
  // If you ended up here by following an exception call stack, here's what's
  // happened: you supplied an object or symbol value to React (as a prop, key,
  // DOM attribute, CSS property, string ref, etc.) and when React tried to
  // coerce it to a string using `'' + value`, an exception was thrown.
  //
  // The most common types that will cause this exception are `Symbol` instances
  // and Temporal objects like `Temporal.Instant`. But any object that has a
  // `valueOf` or `[Symbol.toPrimitive]` method that throws will also cause this
  // exception. (Library authors do this to prevent users from using built-in
  // numeric operators like `+` or comparison operators like `>=` because custom
  // methods are needed to perform accurate arithmetic or comparison.)
  //
  // To fix the problem, coerce this object or symbol value to a string before
  // passing it to React. The most reliable way is usually `String(value)`.
  //
  // To find which value is throwing, check the browser or debugger console.
  // Before this exception was thrown, there should be `console.error` output
  // that shows the type (Symbol, Temporal.PlainDate, etc.) that caused the
  // problem and how that type was used: key, atrribute, input value prop, etc.
  // In most cases, this console output also shows the component and its
  // ancestor components where the exception happened.
  //
  // eslint-disable-next-line react-internal/safe-string-coercion
  return '' + value;
}
function checkKeyStringCoercion(value) {
  {
    if (willCoercionThrow(value)) {
      error('The provided key is an unsupported type %s.' + ' This value must be coerced to a string before before using it here.', typeName(value));

      return testStringCoercion(value); // throw (to help callers find troubleshooting comments)
    }
  }
}

var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};
var specialPropKeyWarningShown;
var specialPropRefWarningShown;
var didWarnAboutStringRefs;

{
  didWarnAboutStringRefs = {};
}

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.key !== undefined;
}

function warnIfStringRefCannotBeAutoConverted(config, self) {
  {
    if (typeof config.ref === 'string' && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
      var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);

      if (!didWarnAboutStringRefs[componentName]) {
        error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);

        didWarnAboutStringRefs[componentName] = true;
      }
    }
  }
}

function defineKeyPropWarningGetter(props, displayName) {
  {
    var warnAboutAccessingKey = function () {
      if (!specialPropKeyWarningShown) {
        specialPropKeyWarningShown = true;

        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    };

    warnAboutAccessingKey.isReactWarning = true;
    Object.defineProperty(props, 'key', {
      get: warnAboutAccessingKey,
      configurable: true
    });
  }
}

function defineRefPropWarningGetter(props, displayName) {
  {
    var warnAboutAccessingRef = function () {
      if (!specialPropRefWarningShown) {
        specialPropRefWarningShown = true;

        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    };

    warnAboutAccessingRef.isReactWarning = true;
    Object.defineProperty(props, 'ref', {
      get: warnAboutAccessingRef,
      configurable: true
    });
  }
}
/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, instanceof check
 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} props
 * @param {*} key
 * @param {string|object} ref
 * @param {*} owner
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @internal
 */


var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,
    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,
    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.

    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    }); // self and source are DEV only properties.

    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    }); // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.

    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });

    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};
/**
 * https://github.com/reactjs/rfcs/pull/107
 * @param {*} type
 * @param {object} props
 * @param {string} key
 */

function jsxDEV(type, config, maybeKey, source, self) {
  {
    var propName; // Reserved names are extracted

    var props = {};
    var key = null;
    var ref = null; // Currently, key can be spread in as a prop. This causes a potential
    // issue if key is also explicitly declared (ie. <div {...props} key="Hi" />
    // or <div key="Hi" {...props} /> ). We want to deprecate key spread,
    // but as an intermediary step, we will use jsxDEV for everything except
    // <div {...props} key="Hi" />, because we aren't currently able to tell if
    // key is explicitly declared to be undefined or not.

    if (maybeKey !== undefined) {
      {
        checkKeyStringCoercion(maybeKey);
      }

      key = '' + maybeKey;
    }

    if (hasValidKey(config)) {
      {
        checkKeyStringCoercion(config.key);
      }

      key = '' + config.key;
    }

    if (hasValidRef(config)) {
      ref = config.ref;
      warnIfStringRefCannotBeAutoConverted(config, self);
    } // Remaining properties are added to a new props object


    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    } // Resolve default props


    if (type && type.defaultProps) {
      var defaultProps = type.defaultProps;

      for (propName in defaultProps) {
        if (props[propName] === undefined) {
          props[propName] = defaultProps[propName];
        }
      }
    }

    if (key || ref) {
      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }

      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }

    return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
  }
}

var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

function setCurrentlyValidatingElement$1(element) {
  {
    if (element) {
      var owner = element._owner;
      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
      ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
    } else {
      ReactDebugCurrentFrame$1.setExtraStackFrame(null);
    }
  }
}

var propTypesMisspellWarningShown;

{
  propTypesMisspellWarningShown = false;
}
/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a ReactElement.
 * @final
 */


function isValidElement(object) {
  {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }
}

function getDeclarationErrorAddendum() {
  {
    if (ReactCurrentOwner$1.current) {
      var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);

      if (name) {
        return '\n\nCheck the render method of `' + name + '`.';
      }
    }

    return '';
  }
}

function getSourceInfoErrorAddendum(source) {
  {
    if (source !== undefined) {
      var fileName = source.fileName.replace(/^.*[\\\/]/, '');
      var lineNumber = source.lineNumber;
      return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
    }

    return '';
  }
}
/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */


var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  {
    var info = getDeclarationErrorAddendum();

    if (!info) {
      var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

      if (parentName) {
        info = "\n\nCheck the top-level render call using <" + parentName + ">.";
      }
    }

    return info;
  }
}
/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */


function validateExplicitKey(element, parentType) {
  {
    if (!element._store || element._store.validated || element.key != null) {
      return;
    }

    element._store.validated = true;
    var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
      return;
    }

    ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
    // property, it may be the creator of the child that's responsible for
    // assigning it a key.

    var childOwner = '';

    if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
      // Give the component that originally created this child.
      childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
    }

    setCurrentlyValidatingElement$1(element);

    error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);

    setCurrentlyValidatingElement$1(null);
  }
}
/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */


function validateChildKeys(node, parentType) {
  {
    if (typeof node !== 'object') {
      return;
    }

    if (isArray(node)) {
      for (var i = 0; i < node.length; i++) {
        var child = node[i];

        if (isValidElement(child)) {
          validateExplicitKey(child, parentType);
        }
      }
    } else if (isValidElement(node)) {
      // This element was passed in a valid location.
      if (node._store) {
        node._store.validated = true;
      }
    } else if (node) {
      var iteratorFn = getIteratorFn(node);

      if (typeof iteratorFn === 'function') {
        // Entry iterators used to provide implicit keys,
        // but now we print a separate warning for them later.
        if (iteratorFn !== node.entries) {
          var iterator = iteratorFn.call(node);
          var step;

          while (!(step = iterator.next()).done) {
            if (isValidElement(step.value)) {
              validateExplicitKey(step.value, parentType);
            }
          }
        }
      }
    }
  }
}
/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */


function validatePropTypes(element) {
  {
    var type = element.type;

    if (type === null || type === undefined || typeof type === 'string') {
      return;
    }

    var propTypes;

    if (typeof type === 'function') {
      propTypes = type.propTypes;
    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
    // Inner props are checked in the reconciler.
    type.$$typeof === REACT_MEMO_TYPE)) {
      propTypes = type.propTypes;
    } else {
      return;
    }

    if (propTypes) {
      // Intentionally inside to avoid triggering lazy initializers:
      var name = getComponentNameFromType(type);
      checkPropTypes(propTypes, element.props, 'prop', name, element);
    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
      propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

      var _name = getComponentNameFromType(type);

      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
    }

    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
    }
  }
}
/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */


function validateFragmentProps(fragment) {
  {
    var keys = Object.keys(fragment.props);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      if (key !== 'children' && key !== 'key') {
        setCurrentlyValidatingElement$1(fragment);

        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);

        setCurrentlyValidatingElement$1(null);
        break;
      }
    }

    if (fragment.ref !== null) {
      setCurrentlyValidatingElement$1(fragment);

      error('Invalid attribute `ref` supplied to `React.Fragment`.');

      setCurrentlyValidatingElement$1(null);
    }
  }
}

function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
  {
    var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.

    if (!validType) {
      var info = '';

      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
        info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
      }

      var sourceInfo = getSourceInfoErrorAddendum(source);

      if (sourceInfo) {
        info += sourceInfo;
      } else {
        info += getDeclarationErrorAddendum();
      }

      var typeString;

      if (type === null) {
        typeString = 'null';
      } else if (isArray(type)) {
        typeString = 'array';
      } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
        typeString = "<" + (getComponentNameFromType(type.type) || 'Unknown') + " />";
        info = ' Did you accidentally export a JSX literal instead of a component?';
      } else {
        typeString = typeof type;
      }

      error('React.jsx: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
    }

    var element = jsxDEV(type, props, key, source, self); // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.

    if (element == null) {
      return element;
    } // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)


    if (validType) {
      var children = props.children;

      if (children !== undefined) {
        if (isStaticChildren) {
          if (isArray(children)) {
            for (var i = 0; i < children.length; i++) {
              validateChildKeys(children[i], type);
            }

            if (Object.freeze) {
              Object.freeze(children);
            }
          } else {
            error('React.jsx: Static children should always be an array. ' + 'You are likely explicitly calling React.jsxs or React.jsxDEV. ' + 'Use the Babel transform instead.');
          }
        } else {
          validateChildKeys(children, type);
        }
      }
    }

    if (type === REACT_FRAGMENT_TYPE) {
      validateFragmentProps(element);
    } else {
      validatePropTypes(element);
    }

    return element;
  }
} // These two functions exist to still get child warnings in dev
// even with the prod transform. This means that jsxDEV is purely
// opt-in behavior for better messages but that we won't stop
// giving you warnings if you use production apis.

function jsxWithValidationStatic(type, props, key) {
  {
    return jsxWithValidation(type, props, key, true);
  }
}
function jsxWithValidationDynamic(type, props, key) {
  {
    return jsxWithValidation(type, props, key, false);
  }
}

var jsx =  jsxWithValidationDynamic ; // we may want to special case jsxs internally to take advantage of static children.
// for now we can ship identical prod functions

var jsxs =  jsxWithValidationStatic ;

exports.Fragment = REACT_FRAGMENT_TYPE;
exports.jsx = jsx;
exports.jsxs = jsxs;
  })();
}


/***/ }),

/***/ "../../node_modules/react/jsx-runtime.js":
/*!***********************************************!*\
  !*** ../../node_modules/react/jsx-runtime.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-jsx-runtime.development.js */ "../../node_modules/react/cjs/react-jsx-runtime.development.js");
}


/***/ }),

/***/ "../../node_modules/reactflow/dist/umd/index.js":
/*!******************************************************!*\
  !*** ../../node_modules/reactflow/dist/umd/index.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

!function(e,t){ true?t(exports,__webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js"),__webpack_require__(/*! react */ "react"),__webpack_require__(/*! react-dom */ "react-dom")):0}(this,(function(e,t,n,o){"use strict";function r(e){if("string"==typeof e||"number"==typeof e)return""+e;let t="";if(Array.isArray(e))for(let n,o=0;o<e.length;o++)""!==(n=r(e[o]))&&(t+=(t&&" ")+n);else for(let n in e)e[n]&&(t+=(t&&" ")+n);return t}function i(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var a,s,l,c={},u={},d={},h={get exports(){return d},set exports(e){d=e}},f={};function g(){return s||(s=1,function(e){e.exports=function(){if(a)return f;a=1;var e=n,t="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},o=e.useState,r=e.useEffect,i=e.useLayoutEffect,s=e.useDebugValue;function l(e){var n=e.getSnapshot;e=e.value;try{var o=n();return!t(e,o)}catch(e){return!0}}var c="undefined"==typeof window||void 0===window.document||void 0===window.document.createElement?function(e,t){return t()}:function(e,t){var n=t(),a=o({inst:{value:n,getSnapshot:t}}),c=a[0].inst,u=a[1];return i((function(){c.value=n,c.getSnapshot=t,l(c)&&u({inst:c})}),[e,n,t]),r((function(){return l(c)&&u({inst:c}),e((function(){l(c)&&u({inst:c})}))}),[e]),s(n),n};return f.useSyncExternalStore=void 0!==e.useSyncExternalStore?e.useSyncExternalStore:c,f}()}(h)),d}
/**
   * @license React
   * use-sync-external-store-shim/with-selector.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */!function(e){e.exports=function(){if(l)return u;l=1;var e=n,t=g(),o="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},r=t.useSyncExternalStore,i=e.useRef,a=e.useEffect,s=e.useMemo,c=e.useDebugValue;return u.useSyncExternalStoreWithSelector=function(e,t,n,l,u){var d=i(null);if(null===d.current){var h={hasValue:!1,value:null};d.current=h}else h=d.current;d=s((function(){function e(e){if(!a){if(a=!0,r=e,e=l(e),void 0!==u&&h.hasValue){var t=h.value;if(u(t,e))return i=t}return i=e}if(t=i,o(r,e))return t;var n=l(e);return void 0!==u&&u(t,n)?t:(r=e,i=n)}var r,i,a=!1,s=void 0===n?null:n;return[function(){return e(t())},null===s?void 0:function(){return e(s())}]}),[t,n,l,u]);var f=r(e,d[0],d[1]);return a((function(){h.hasValue=!0,h.value=f}),[f]),c(f),f},u}()}({get exports(){return c},set exports(e){c=e}});var p=i(c);const m=e=>{let t;const n=new Set,o=(e,o)=>{const r="function"==typeof e?e(t):e;if(!Object.is(r,t)){const e=t;t=(null!=o?o:"object"!=typeof r)?r:Object.assign({},t,r),n.forEach((n=>n(t,e)))}},r=()=>t,i={setState:o,getState:r,subscribe:e=>(n.add(e),()=>n.delete(e)),destroy:()=>{console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),n.clear()}};return t=e(o,r,i),i},{useSyncExternalStoreWithSelector:y}=p;function v(e,t=e.getState,o){const r=y(e.subscribe,e.getState,e.getServerState||e.getState,t,o);return n.useDebugValue(r),r}const x=(e,t)=>{const n=(e=>e?m(e):m)(e),o=(e,o=t)=>v(n,e,o);return Object.assign(o,n),o};function b(e,t){if(Object.is(e,t))return!0;if("object"!=typeof e||null===e||"object"!=typeof t||null===t)return!1;if(e instanceof Map&&t instanceof Map){if(e.size!==t.size)return!1;for(const[n,o]of e)if(!Object.is(o,t.get(n)))return!1;return!0}if(e instanceof Set&&t instanceof Set){if(e.size!==t.size)return!1;for(const n of e)if(!t.has(n))return!1;return!0}const n=Object.keys(e);if(n.length!==Object.keys(t).length)return!1;for(let o=0;o<n.length;o++)if(!Object.prototype.hasOwnProperty.call(t,n[o])||!Object.is(e[n[o]],t[n[o]]))return!1;return!0}var w={value:()=>{}};function S(){for(var e,t=0,n=arguments.length,o={};t<n;++t){if(!(e=arguments[t]+"")||e in o||/[\s.]/.test(e))throw new Error("illegal type: "+e);o[e]=[]}return new E(o)}function E(e){this._=e}function C(e,t){return e.trim().split(/^|\s+/).map((function(e){var n="",o=e.indexOf(".");if(o>=0&&(n=e.slice(o+1),e=e.slice(0,o)),e&&!t.hasOwnProperty(e))throw new Error("unknown type: "+e);return{type:e,name:n}}))}function _(e,t){for(var n,o=0,r=e.length;o<r;++o)if((n=e[o]).name===t)return n.value}function N(e,t,n){for(var o=0,r=e.length;o<r;++o)if(e[o].name===t){e[o]=w,e=e.slice(0,o).concat(e.slice(o+1));break}return null!=n&&e.push({name:t,value:n}),e}E.prototype=S.prototype={constructor:E,on:function(e,t){var n,o=this._,r=C(e+"",o),i=-1,a=r.length;if(!(arguments.length<2)){if(null!=t&&"function"!=typeof t)throw new Error("invalid callback: "+t);for(;++i<a;)if(n=(e=r[i]).type)o[n]=N(o[n],e.name,t);else if(null==t)for(n in o)o[n]=N(o[n],e.name,null);return this}for(;++i<a;)if((n=(e=r[i]).type)&&(n=_(o[n],e.name)))return n},copy:function(){var e={},t=this._;for(var n in t)e[n]=t[n].slice();return new E(e)},call:function(e,t){if((n=arguments.length-2)>0)for(var n,o,r=new Array(n),i=0;i<n;++i)r[i]=arguments[i+2];if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(i=0,n=(o=this._[e]).length;i<n;++i)o[i].value.apply(t,r)},apply:function(e,t,n){if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(var o=this._[e],r=0,i=o.length;r<i;++r)o[r].value.apply(t,n)}};var M="http://www.w3.org/1999/xhtml",k={svg:"http://www.w3.org/2000/svg",xhtml:M,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function P(e){var t=e+="",n=t.indexOf(":");return n>=0&&"xmlns"!==(t=e.slice(0,n))&&(e=e.slice(n+1)),k.hasOwnProperty(t)?{space:k[t],local:e}:e}function A(e){return function(){var t=this.ownerDocument,n=this.namespaceURI;return n===M&&t.documentElement.namespaceURI===M?t.createElement(e):t.createElementNS(n,e)}}function O(e){return function(){return this.ownerDocument.createElementNS(e.space,e.local)}}function z(e){var t=P(e);return(t.local?O:A)(t)}function I(){}function R(e){return null==e?I:function(){return this.querySelector(e)}}function D(e){return null==e?[]:Array.isArray(e)?e:Array.from(e)}function $(){return[]}function j(e){return null==e?$:function(){return this.querySelectorAll(e)}}function B(e){return function(){return this.matches(e)}}function T(e){return function(t){return t.matches(e)}}var L=Array.prototype.find;function V(){return this.firstElementChild}var H=Array.prototype.filter;function X(){return Array.from(this.children)}function Y(e){return new Array(e.length)}function F(e,t){this.ownerDocument=e.ownerDocument,this.namespaceURI=e.namespaceURI,this._next=null,this._parent=e,this.__data__=t}function Z(e){return function(){return e}}function U(e,t,n,o,r,i){for(var a,s=0,l=t.length,c=i.length;s<c;++s)(a=t[s])?(a.__data__=i[s],o[s]=a):n[s]=new F(e,i[s]);for(;s<l;++s)(a=t[s])&&(r[s]=a)}function W(e,t,n,o,r,i,a){var s,l,c,u=new Map,d=t.length,h=i.length,f=new Array(d);for(s=0;s<d;++s)(l=t[s])&&(f[s]=c=a.call(l,l.__data__,s,t)+"",u.has(c)?r[s]=l:u.set(c,l));for(s=0;s<h;++s)c=a.call(e,i[s],s,i)+"",(l=u.get(c))?(o[s]=l,l.__data__=i[s],u.delete(c)):n[s]=new F(e,i[s]);for(s=0;s<d;++s)(l=t[s])&&u.get(f[s])===l&&(r[s]=l)}function K(e){return e.__data__}function q(e){return"object"==typeof e&&"length"in e?e:Array.from(e)}function G(e,t){return e<t?-1:e>t?1:e>=t?0:NaN}function Q(e){return function(){this.removeAttribute(e)}}function J(e){return function(){this.removeAttributeNS(e.space,e.local)}}function ee(e,t){return function(){this.setAttribute(e,t)}}function te(e,t){return function(){this.setAttributeNS(e.space,e.local,t)}}function ne(e,t){return function(){var n=t.apply(this,arguments);null==n?this.removeAttribute(e):this.setAttribute(e,n)}}function oe(e,t){return function(){var n=t.apply(this,arguments);null==n?this.removeAttributeNS(e.space,e.local):this.setAttributeNS(e.space,e.local,n)}}function re(e){return e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView}function ie(e){return function(){this.style.removeProperty(e)}}function ae(e,t,n){return function(){this.style.setProperty(e,t,n)}}function se(e,t,n){return function(){var o=t.apply(this,arguments);null==o?this.style.removeProperty(e):this.style.setProperty(e,o,n)}}function le(e,t){return e.style.getPropertyValue(t)||re(e).getComputedStyle(e,null).getPropertyValue(t)}function ce(e){return function(){delete this[e]}}function ue(e,t){return function(){this[e]=t}}function de(e,t){return function(){var n=t.apply(this,arguments);null==n?delete this[e]:this[e]=n}}function he(e){return e.trim().split(/^|\s+/)}function fe(e){return e.classList||new ge(e)}function ge(e){this._node=e,this._names=he(e.getAttribute("class")||"")}function pe(e,t){for(var n=fe(e),o=-1,r=t.length;++o<r;)n.add(t[o])}function me(e,t){for(var n=fe(e),o=-1,r=t.length;++o<r;)n.remove(t[o])}function ye(e){return function(){pe(this,e)}}function ve(e){return function(){me(this,e)}}function xe(e,t){return function(){(t.apply(this,arguments)?pe:me)(this,e)}}function be(){this.textContent=""}function we(e){return function(){this.textContent=e}}function Se(e){return function(){var t=e.apply(this,arguments);this.textContent=null==t?"":t}}function Ee(){this.innerHTML=""}function Ce(e){return function(){this.innerHTML=e}}function _e(e){return function(){var t=e.apply(this,arguments);this.innerHTML=null==t?"":t}}function Ne(){this.nextSibling&&this.parentNode.appendChild(this)}function Me(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function ke(){return null}function Pe(){var e=this.parentNode;e&&e.removeChild(this)}function Ae(){var e=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function Oe(){var e=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function ze(e){return e.trim().split(/^|\s+/).map((function(e){var t="",n=e.indexOf(".");return n>=0&&(t=e.slice(n+1),e=e.slice(0,n)),{type:e,name:t}}))}function Ie(e){return function(){var t=this.__on;if(t){for(var n,o=0,r=-1,i=t.length;o<i;++o)n=t[o],e.type&&n.type!==e.type||n.name!==e.name?t[++r]=n:this.removeEventListener(n.type,n.listener,n.options);++r?t.length=r:delete this.__on}}}function Re(e,t,n){return function(){var o,r=this.__on,i=function(e){return function(t){e.call(this,t,this.__data__)}}(t);if(r)for(var a=0,s=r.length;a<s;++a)if((o=r[a]).type===e.type&&o.name===e.name)return this.removeEventListener(o.type,o.listener,o.options),this.addEventListener(o.type,o.listener=i,o.options=n),void(o.value=t);this.addEventListener(e.type,i,n),o={type:e.type,name:e.name,value:t,listener:i,options:n},r?r.push(o):this.__on=[o]}}function De(e,t,n){var o=re(e),r=o.CustomEvent;"function"==typeof r?r=new r(t,n):(r=o.document.createEvent("Event"),n?(r.initEvent(t,n.bubbles,n.cancelable),r.detail=n.detail):r.initEvent(t,!1,!1)),e.dispatchEvent(r)}function $e(e,t){return function(){return De(this,e,t)}}function je(e,t){return function(){return De(this,e,t.apply(this,arguments))}}F.prototype={constructor:F,appendChild:function(e){return this._parent.insertBefore(e,this._next)},insertBefore:function(e,t){return this._parent.insertBefore(e,t)},querySelector:function(e){return this._parent.querySelector(e)},querySelectorAll:function(e){return this._parent.querySelectorAll(e)}},ge.prototype={add:function(e){this._names.indexOf(e)<0&&(this._names.push(e),this._node.setAttribute("class",this._names.join(" ")))},remove:function(e){var t=this._names.indexOf(e);t>=0&&(this._names.splice(t,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(e){return this._names.indexOf(e)>=0}};var Be=[null];function Te(e,t){this._groups=e,this._parents=t}function Le(){return new Te([[document.documentElement]],Be)}function Ve(e){return"string"==typeof e?new Te([[document.querySelector(e)]],[document.documentElement]):new Te([[e]],Be)}function He(e,t){if(e=function(e){let t;for(;t=e.sourceEvent;)e=t;return e}(e),void 0===t&&(t=e.currentTarget),t){var n=t.ownerSVGElement||t;if(n.createSVGPoint){var o=n.createSVGPoint();return o.x=e.clientX,o.y=e.clientY,[(o=o.matrixTransform(t.getScreenCTM().inverse())).x,o.y]}if(t.getBoundingClientRect){var r=t.getBoundingClientRect();return[e.clientX-r.left-t.clientLeft,e.clientY-r.top-t.clientTop]}}return[e.pageX,e.pageY]}Te.prototype=Le.prototype={constructor:Te,select:function(e){"function"!=typeof e&&(e=R(e));for(var t=this._groups,n=t.length,o=new Array(n),r=0;r<n;++r)for(var i,a,s=t[r],l=s.length,c=o[r]=new Array(l),u=0;u<l;++u)(i=s[u])&&(a=e.call(i,i.__data__,u,s))&&("__data__"in i&&(a.__data__=i.__data__),c[u]=a);return new Te(o,this._parents)},selectAll:function(e){e="function"==typeof e?function(e){return function(){return D(e.apply(this,arguments))}}(e):j(e);for(var t=this._groups,n=t.length,o=[],r=[],i=0;i<n;++i)for(var a,s=t[i],l=s.length,c=0;c<l;++c)(a=s[c])&&(o.push(e.call(a,a.__data__,c,s)),r.push(a));return new Te(o,r)},selectChild:function(e){return this.select(null==e?V:function(e){return function(){return L.call(this.children,e)}}("function"==typeof e?e:T(e)))},selectChildren:function(e){return this.selectAll(null==e?X:function(e){return function(){return H.call(this.children,e)}}("function"==typeof e?e:T(e)))},filter:function(e){"function"!=typeof e&&(e=B(e));for(var t=this._groups,n=t.length,o=new Array(n),r=0;r<n;++r)for(var i,a=t[r],s=a.length,l=o[r]=[],c=0;c<s;++c)(i=a[c])&&e.call(i,i.__data__,c,a)&&l.push(i);return new Te(o,this._parents)},data:function(e,t){if(!arguments.length)return Array.from(this,K);var n=t?W:U,o=this._parents,r=this._groups;"function"!=typeof e&&(e=Z(e));for(var i=r.length,a=new Array(i),s=new Array(i),l=new Array(i),c=0;c<i;++c){var u=o[c],d=r[c],h=d.length,f=q(e.call(u,u&&u.__data__,c,o)),g=f.length,p=s[c]=new Array(g),m=a[c]=new Array(g),y=l[c]=new Array(h);n(u,d,p,m,y,f,t);for(var v,x,b=0,w=0;b<g;++b)if(v=p[b]){for(b>=w&&(w=b+1);!(x=m[w])&&++w<g;);v._next=x||null}}return(a=new Te(a,o))._enter=s,a._exit=l,a},enter:function(){return new Te(this._enter||this._groups.map(Y),this._parents)},exit:function(){return new Te(this._exit||this._groups.map(Y),this._parents)},join:function(e,t,n){var o=this.enter(),r=this,i=this.exit();return"function"==typeof e?(o=e(o))&&(o=o.selection()):o=o.append(e+""),null!=t&&(r=t(r))&&(r=r.selection()),null==n?i.remove():n(i),o&&r?o.merge(r).order():r},merge:function(e){for(var t=e.selection?e.selection():e,n=this._groups,o=t._groups,r=n.length,i=o.length,a=Math.min(r,i),s=new Array(r),l=0;l<a;++l)for(var c,u=n[l],d=o[l],h=u.length,f=s[l]=new Array(h),g=0;g<h;++g)(c=u[g]||d[g])&&(f[g]=c);for(;l<r;++l)s[l]=n[l];return new Te(s,this._parents)},selection:function(){return this},order:function(){for(var e=this._groups,t=-1,n=e.length;++t<n;)for(var o,r=e[t],i=r.length-1,a=r[i];--i>=0;)(o=r[i])&&(a&&4^o.compareDocumentPosition(a)&&a.parentNode.insertBefore(o,a),a=o);return this},sort:function(e){function t(t,n){return t&&n?e(t.__data__,n.__data__):!t-!n}e||(e=G);for(var n=this._groups,o=n.length,r=new Array(o),i=0;i<o;++i){for(var a,s=n[i],l=s.length,c=r[i]=new Array(l),u=0;u<l;++u)(a=s[u])&&(c[u]=a);c.sort(t)}return new Te(r,this._parents).order()},call:function(){var e=arguments[0];return arguments[0]=this,e.apply(null,arguments),this},nodes:function(){return Array.from(this)},node:function(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var o=e[t],r=0,i=o.length;r<i;++r){var a=o[r];if(a)return a}return null},size:function(){let e=0;for(const t of this)++e;return e},empty:function(){return!this.node()},each:function(e){for(var t=this._groups,n=0,o=t.length;n<o;++n)for(var r,i=t[n],a=0,s=i.length;a<s;++a)(r=i[a])&&e.call(r,r.__data__,a,i);return this},attr:function(e,t){var n=P(e);if(arguments.length<2){var o=this.node();return n.local?o.getAttributeNS(n.space,n.local):o.getAttribute(n)}return this.each((null==t?n.local?J:Q:"function"==typeof t?n.local?oe:ne:n.local?te:ee)(n,t))},style:function(e,t,n){return arguments.length>1?this.each((null==t?ie:"function"==typeof t?se:ae)(e,t,null==n?"":n)):le(this.node(),e)},property:function(e,t){return arguments.length>1?this.each((null==t?ce:"function"==typeof t?de:ue)(e,t)):this.node()[e]},classed:function(e,t){var n=he(e+"");if(arguments.length<2){for(var o=fe(this.node()),r=-1,i=n.length;++r<i;)if(!o.contains(n[r]))return!1;return!0}return this.each(("function"==typeof t?xe:t?ye:ve)(n,t))},text:function(e){return arguments.length?this.each(null==e?be:("function"==typeof e?Se:we)(e)):this.node().textContent},html:function(e){return arguments.length?this.each(null==e?Ee:("function"==typeof e?_e:Ce)(e)):this.node().innerHTML},raise:function(){return this.each(Ne)},lower:function(){return this.each(Me)},append:function(e){var t="function"==typeof e?e:z(e);return this.select((function(){return this.appendChild(t.apply(this,arguments))}))},insert:function(e,t){var n="function"==typeof e?e:z(e),o=null==t?ke:"function"==typeof t?t:R(t);return this.select((function(){return this.insertBefore(n.apply(this,arguments),o.apply(this,arguments)||null)}))},remove:function(){return this.each(Pe)},clone:function(e){return this.select(e?Oe:Ae)},datum:function(e){return arguments.length?this.property("__data__",e):this.node().__data__},on:function(e,t,n){var o,r,i=ze(e+""),a=i.length;if(!(arguments.length<2)){for(s=t?Re:Ie,o=0;o<a;++o)this.each(s(i[o],t,n));return this}var s=this.node().__on;if(s)for(var l,c=0,u=s.length;c<u;++c)for(o=0,l=s[c];o<a;++o)if((r=i[o]).type===l.type&&r.name===l.name)return l.value},dispatch:function(e,t){return this.each(("function"==typeof t?je:$e)(e,t))},[Symbol.iterator]:function*(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var o,r=e[t],i=0,a=r.length;i<a;++i)(o=r[i])&&(yield o)}};const Xe={passive:!1},Ye={capture:!0,passive:!1};function Fe(e){e.stopImmediatePropagation()}function Ze(e){e.preventDefault(),e.stopImmediatePropagation()}function Ue(e){var t=e.document.documentElement,n=Ve(e).on("dragstart.drag",Ze,Ye);"onselectstart"in t?n.on("selectstart.drag",Ze,Ye):(t.__noselect=t.style.MozUserSelect,t.style.MozUserSelect="none")}function We(e,t){var n=e.document.documentElement,o=Ve(e).on("dragstart.drag",null);t&&(o.on("click.drag",Ze,Ye),setTimeout((function(){o.on("click.drag",null)}),0)),"onselectstart"in n?o.on("selectstart.drag",null):(n.style.MozUserSelect=n.__noselect,delete n.__noselect)}var Ke=e=>()=>e;function qe(e,{sourceEvent:t,subject:n,target:o,identifier:r,active:i,x:a,y:s,dx:l,dy:c,dispatch:u}){Object.defineProperties(this,{type:{value:e,enumerable:!0,configurable:!0},sourceEvent:{value:t,enumerable:!0,configurable:!0},subject:{value:n,enumerable:!0,configurable:!0},target:{value:o,enumerable:!0,configurable:!0},identifier:{value:r,enumerable:!0,configurable:!0},active:{value:i,enumerable:!0,configurable:!0},x:{value:a,enumerable:!0,configurable:!0},y:{value:s,enumerable:!0,configurable:!0},dx:{value:l,enumerable:!0,configurable:!0},dy:{value:c,enumerable:!0,configurable:!0},_:{value:u}})}function Ge(e){return!e.ctrlKey&&!e.button}function Qe(){return this.parentNode}function Je(e,t){return null==t?{x:e.x,y:e.y}:t}function et(){return navigator.maxTouchPoints||"ontouchstart"in this}function tt(){var e,t,n,o,r=Ge,i=Qe,a=Je,s=et,l={},c=S("start","drag","end"),u=0,d=0;function h(e){e.on("mousedown.drag",f).filter(s).on("touchstart.drag",m).on("touchmove.drag",y,Xe).on("touchend.drag touchcancel.drag",v).style("touch-action","none").style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}function f(a,s){if(!o&&r.call(this,a,s)){var l=x(this,i.call(this,a,s),a,s,"mouse");l&&(Ve(a.view).on("mousemove.drag",g,Ye).on("mouseup.drag",p,Ye),Ue(a.view),Fe(a),n=!1,e=a.clientX,t=a.clientY,l("start",a))}}function g(o){if(Ze(o),!n){var r=o.clientX-e,i=o.clientY-t;n=r*r+i*i>d}l.mouse("drag",o)}function p(e){Ve(e.view).on("mousemove.drag mouseup.drag",null),We(e.view,n),Ze(e),l.mouse("end",e)}function m(e,t){if(r.call(this,e,t)){var n,o,a=e.changedTouches,s=i.call(this,e,t),l=a.length;for(n=0;n<l;++n)(o=x(this,s,e,t,a[n].identifier,a[n]))&&(Fe(e),o("start",e,a[n]))}}function y(e){var t,n,o=e.changedTouches,r=o.length;for(t=0;t<r;++t)(n=l[o[t].identifier])&&(Ze(e),n("drag",e,o[t]))}function v(e){var t,n,r=e.changedTouches,i=r.length;for(o&&clearTimeout(o),o=setTimeout((function(){o=null}),500),t=0;t<i;++t)(n=l[r[t].identifier])&&(Fe(e),n("end",e,r[t]))}function x(e,t,n,o,r,i){var s,d,f,g=c.copy(),p=He(i||n,t);if(null!=(f=a.call(e,new qe("beforestart",{sourceEvent:n,target:h,identifier:r,active:u,x:p[0],y:p[1],dx:0,dy:0,dispatch:g}),o)))return s=f.x-p[0]||0,d=f.y-p[1]||0,function n(i,a,c){var m,y=p;switch(i){case"start":l[r]=n,m=u++;break;case"end":delete l[r],--u;case"drag":p=He(c||a,t),m=u}g.call(i,e,new qe(i,{sourceEvent:a,subject:f,target:h,identifier:r,active:m,x:p[0]+s,y:p[1]+d,dx:p[0]-y[0],dy:p[1]-y[1],dispatch:g}),o)}}return h.filter=function(e){return arguments.length?(r="function"==typeof e?e:Ke(!!e),h):r},h.container=function(e){return arguments.length?(i="function"==typeof e?e:Ke(e),h):i},h.subject=function(e){return arguments.length?(a="function"==typeof e?e:Ke(e),h):a},h.touchable=function(e){return arguments.length?(s="function"==typeof e?e:Ke(!!e),h):s},h.on=function(){var e=c.on.apply(c,arguments);return e===c?h:e},h.clickDistance=function(e){return arguments.length?(d=(e=+e)*e,h):Math.sqrt(d)},h}function nt(e,t,n){e.prototype=t.prototype=n,n.constructor=e}function ot(e,t){var n=Object.create(e.prototype);for(var o in t)n[o]=t[o];return n}function rt(){}qe.prototype.on=function(){var e=this._.on.apply(this._,arguments);return e===this._?this:e};var it=.7,at=1/it,st="\\s*([+-]?\\d+)\\s*",lt="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",ct="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",ut=/^#([0-9a-f]{3,8})$/,dt=new RegExp(`^rgb\\(${st},${st},${st}\\)$`),ht=new RegExp(`^rgb\\(${ct},${ct},${ct}\\)$`),ft=new RegExp(`^rgba\\(${st},${st},${st},${lt}\\)$`),gt=new RegExp(`^rgba\\(${ct},${ct},${ct},${lt}\\)$`),pt=new RegExp(`^hsl\\(${lt},${ct},${ct}\\)$`),mt=new RegExp(`^hsla\\(${lt},${ct},${ct},${lt}\\)$`),yt={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};function vt(){return this.rgb().formatHex()}function xt(){return this.rgb().formatRgb()}function bt(e){var t,n;return e=(e+"").trim().toLowerCase(),(t=ut.exec(e))?(n=t[1].length,t=parseInt(t[1],16),6===n?wt(t):3===n?new _t(t>>8&15|t>>4&240,t>>4&15|240&t,(15&t)<<4|15&t,1):8===n?St(t>>24&255,t>>16&255,t>>8&255,(255&t)/255):4===n?St(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|240&t,((15&t)<<4|15&t)/255):null):(t=dt.exec(e))?new _t(t[1],t[2],t[3],1):(t=ht.exec(e))?new _t(255*t[1]/100,255*t[2]/100,255*t[3]/100,1):(t=ft.exec(e))?St(t[1],t[2],t[3],t[4]):(t=gt.exec(e))?St(255*t[1]/100,255*t[2]/100,255*t[3]/100,t[4]):(t=pt.exec(e))?Ot(t[1],t[2]/100,t[3]/100,1):(t=mt.exec(e))?Ot(t[1],t[2]/100,t[3]/100,t[4]):yt.hasOwnProperty(e)?wt(yt[e]):"transparent"===e?new _t(NaN,NaN,NaN,0):null}function wt(e){return new _t(e>>16&255,e>>8&255,255&e,1)}function St(e,t,n,o){return o<=0&&(e=t=n=NaN),new _t(e,t,n,o)}function Et(e){return e instanceof rt||(e=bt(e)),e?new _t((e=e.rgb()).r,e.g,e.b,e.opacity):new _t}function Ct(e,t,n,o){return 1===arguments.length?Et(e):new _t(e,t,n,null==o?1:o)}function _t(e,t,n,o){this.r=+e,this.g=+t,this.b=+n,this.opacity=+o}function Nt(){return`#${At(this.r)}${At(this.g)}${At(this.b)}`}function Mt(){const e=kt(this.opacity);return`${1===e?"rgb(":"rgba("}${Pt(this.r)}, ${Pt(this.g)}, ${Pt(this.b)}${1===e?")":`, ${e})`}`}function kt(e){return isNaN(e)?1:Math.max(0,Math.min(1,e))}function Pt(e){return Math.max(0,Math.min(255,Math.round(e)||0))}function At(e){return((e=Pt(e))<16?"0":"")+e.toString(16)}function Ot(e,t,n,o){return o<=0?e=t=n=NaN:n<=0||n>=1?e=t=NaN:t<=0&&(e=NaN),new It(e,t,n,o)}function zt(e){if(e instanceof It)return new It(e.h,e.s,e.l,e.opacity);if(e instanceof rt||(e=bt(e)),!e)return new It;if(e instanceof It)return e;var t=(e=e.rgb()).r/255,n=e.g/255,o=e.b/255,r=Math.min(t,n,o),i=Math.max(t,n,o),a=NaN,s=i-r,l=(i+r)/2;return s?(a=t===i?(n-o)/s+6*(n<o):n===i?(o-t)/s+2:(t-n)/s+4,s/=l<.5?i+r:2-i-r,a*=60):s=l>0&&l<1?0:a,new It(a,s,l,e.opacity)}function It(e,t,n,o){this.h=+e,this.s=+t,this.l=+n,this.opacity=+o}function Rt(e){return(e=(e||0)%360)<0?e+360:e}function Dt(e){return Math.max(0,Math.min(1,e||0))}function $t(e,t,n){return 255*(e<60?t+(n-t)*e/60:e<180?n:e<240?t+(n-t)*(240-e)/60:t)}nt(rt,bt,{copy(e){return Object.assign(new this.constructor,this,e)},displayable(){return this.rgb().displayable()},hex:vt,formatHex:vt,formatHex8:function(){return this.rgb().formatHex8()},formatHsl:function(){return zt(this).formatHsl()},formatRgb:xt,toString:xt}),nt(_t,Ct,ot(rt,{brighter(e){return e=null==e?at:Math.pow(at,e),new _t(this.r*e,this.g*e,this.b*e,this.opacity)},darker(e){return e=null==e?it:Math.pow(it,e),new _t(this.r*e,this.g*e,this.b*e,this.opacity)},rgb(){return this},clamp(){return new _t(Pt(this.r),Pt(this.g),Pt(this.b),kt(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:Nt,formatHex:Nt,formatHex8:function(){return`#${At(this.r)}${At(this.g)}${At(this.b)}${At(255*(isNaN(this.opacity)?1:this.opacity))}`},formatRgb:Mt,toString:Mt})),nt(It,(function(e,t,n,o){return 1===arguments.length?zt(e):new It(e,t,n,null==o?1:o)}),ot(rt,{brighter(e){return e=null==e?at:Math.pow(at,e),new It(this.h,this.s,this.l*e,this.opacity)},darker(e){return e=null==e?it:Math.pow(it,e),new It(this.h,this.s,this.l*e,this.opacity)},rgb(){var e=this.h%360+360*(this.h<0),t=isNaN(e)||isNaN(this.s)?0:this.s,n=this.l,o=n+(n<.5?n:1-n)*t,r=2*n-o;return new _t($t(e>=240?e-240:e+120,r,o),$t(e,r,o),$t(e<120?e+240:e-120,r,o),this.opacity)},clamp(){return new It(Rt(this.h),Dt(this.s),Dt(this.l),kt(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const e=kt(this.opacity);return`${1===e?"hsl(":"hsla("}${Rt(this.h)}, ${100*Dt(this.s)}%, ${100*Dt(this.l)}%${1===e?")":`, ${e})`}`}}));var jt=e=>()=>e;function Bt(e){return 1==(e=+e)?Tt:function(t,n){return n-t?function(e,t,n){return e=Math.pow(e,n),t=Math.pow(t,n)-e,n=1/n,function(o){return Math.pow(e+o*t,n)}}(t,n,e):jt(isNaN(t)?n:t)}}function Tt(e,t){var n=t-e;return n?function(e,t){return function(n){return e+n*t}}(e,n):jt(isNaN(e)?t:e)}var Lt=function e(t){var n=Bt(t);function o(e,t){var o=n((e=Ct(e)).r,(t=Ct(t)).r),r=n(e.g,t.g),i=n(e.b,t.b),a=Tt(e.opacity,t.opacity);return function(t){return e.r=o(t),e.g=r(t),e.b=i(t),e.opacity=a(t),e+""}}return o.gamma=e,o}(1);function Vt(e,t){return e=+e,t=+t,function(n){return e*(1-n)+t*n}}var Ht=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,Xt=new RegExp(Ht.source,"g");function Yt(e,t){var n,o,r,i=Ht.lastIndex=Xt.lastIndex=0,a=-1,s=[],l=[];for(e+="",t+="";(n=Ht.exec(e))&&(o=Xt.exec(t));)(r=o.index)>i&&(r=t.slice(i,r),s[a]?s[a]+=r:s[++a]=r),(n=n[0])===(o=o[0])?s[a]?s[a]+=o:s[++a]=o:(s[++a]=null,l.push({i:a,x:Vt(n,o)})),i=Xt.lastIndex;return i<t.length&&(r=t.slice(i),s[a]?s[a]+=r:s[++a]=r),s.length<2?l[0]?function(e){return function(t){return e(t)+""}}(l[0].x):function(e){return function(){return e}}(t):(t=l.length,function(e){for(var n,o=0;o<t;++o)s[(n=l[o]).i]=n.x(e);return s.join("")})}var Ft,Zt=180/Math.PI,Ut={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function Wt(e,t,n,o,r,i){var a,s,l;return(a=Math.sqrt(e*e+t*t))&&(e/=a,t/=a),(l=e*n+t*o)&&(n-=e*l,o-=t*l),(s=Math.sqrt(n*n+o*o))&&(n/=s,o/=s,l/=s),e*o<t*n&&(e=-e,t=-t,l=-l,a=-a),{translateX:r,translateY:i,rotate:Math.atan2(t,e)*Zt,skewX:Math.atan(l)*Zt,scaleX:a,scaleY:s}}function Kt(e,t,n,o){function r(e){return e.length?e.pop()+" ":""}return function(i,a){var s=[],l=[];return i=e(i),a=e(a),function(e,o,r,i,a,s){if(e!==r||o!==i){var l=a.push("translate(",null,t,null,n);s.push({i:l-4,x:Vt(e,r)},{i:l-2,x:Vt(o,i)})}else(r||i)&&a.push("translate("+r+t+i+n)}(i.translateX,i.translateY,a.translateX,a.translateY,s,l),function(e,t,n,i){e!==t?(e-t>180?t+=360:t-e>180&&(e+=360),i.push({i:n.push(r(n)+"rotate(",null,o)-2,x:Vt(e,t)})):t&&n.push(r(n)+"rotate("+t+o)}(i.rotate,a.rotate,s,l),function(e,t,n,i){e!==t?i.push({i:n.push(r(n)+"skewX(",null,o)-2,x:Vt(e,t)}):t&&n.push(r(n)+"skewX("+t+o)}(i.skewX,a.skewX,s,l),function(e,t,n,o,i,a){if(e!==n||t!==o){var s=i.push(r(i)+"scale(",null,",",null,")");a.push({i:s-4,x:Vt(e,n)},{i:s-2,x:Vt(t,o)})}else 1===n&&1===o||i.push(r(i)+"scale("+n+","+o+")")}(i.scaleX,i.scaleY,a.scaleX,a.scaleY,s,l),i=a=null,function(e){for(var t,n=-1,o=l.length;++n<o;)s[(t=l[n]).i]=t.x(e);return s.join("")}}}var qt=Kt((function(e){const t=new("function"==typeof DOMMatrix?DOMMatrix:WebKitCSSMatrix)(e+"");return t.isIdentity?Ut:Wt(t.a,t.b,t.c,t.d,t.e,t.f)}),"px, ","px)","deg)"),Gt=Kt((function(e){return null==e?Ut:(Ft||(Ft=document.createElementNS("http://www.w3.org/2000/svg","g")),Ft.setAttribute("transform",e),(e=Ft.transform.baseVal.consolidate())?Wt((e=e.matrix).a,e.b,e.c,e.d,e.e,e.f):Ut)}),", ",")",")");function Qt(e){return((e=Math.exp(e))+1/e)/2}var Jt,en,tn=function e(t,n,o){function r(e,r){var i,a,s=e[0],l=e[1],c=e[2],u=r[0],d=r[1],h=r[2],f=u-s,g=d-l,p=f*f+g*g;if(p<1e-12)a=Math.log(h/c)/t,i=function(e){return[s+e*f,l+e*g,c*Math.exp(t*e*a)]};else{var m=Math.sqrt(p),y=(h*h-c*c+o*p)/(2*c*n*m),v=(h*h-c*c-o*p)/(2*h*n*m),x=Math.log(Math.sqrt(y*y+1)-y),b=Math.log(Math.sqrt(v*v+1)-v);a=(b-x)/t,i=function(e){var o,r=e*a,i=Qt(x),u=c/(n*m)*(i*(o=t*r+x,((o=Math.exp(2*o))-1)/(o+1))-function(e){return((e=Math.exp(e))-1/e)/2}(x));return[s+u*f,l+u*g,c*i/Qt(t*r+x)]}}return i.duration=1e3*a*t/Math.SQRT2,i}return r.rho=function(t){var n=Math.max(.001,+t),o=n*n;return e(n,o,o*o)},r}(Math.SQRT2,2,4),nn=0,on=0,rn=0,an=0,sn=0,ln=0,cn="object"==typeof performance&&performance.now?performance:Date,un="object"==typeof window&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(e){setTimeout(e,17)};function dn(){return sn||(un(hn),sn=cn.now()+ln)}function hn(){sn=0}function fn(){this._call=this._time=this._next=null}function gn(e,t,n){var o=new fn;return o.restart(e,t,n),o}function pn(){sn=(an=cn.now())+ln,nn=on=0;try{!function(){dn(),++nn;for(var e,t=Jt;t;)(e=sn-t._time)>=0&&t._call.call(void 0,e),t=t._next;--nn}()}finally{nn=0,function(){var e,t,n=Jt,o=1/0;for(;n;)n._call?(o>n._time&&(o=n._time),e=n,n=n._next):(t=n._next,n._next=null,n=e?e._next=t:Jt=t);en=e,yn(o)}(),sn=0}}function mn(){var e=cn.now(),t=e-an;t>1e3&&(ln-=t,an=e)}function yn(e){nn||(on&&(on=clearTimeout(on)),e-sn>24?(e<1/0&&(on=setTimeout(pn,e-cn.now()-ln)),rn&&(rn=clearInterval(rn))):(rn||(an=cn.now(),rn=setInterval(mn,1e3)),nn=1,un(pn)))}function vn(e,t,n){var o=new fn;return t=null==t?0:+t,o.restart((n=>{o.stop(),e(n+t)}),t,n),o}fn.prototype=gn.prototype={constructor:fn,restart:function(e,t,n){if("function"!=typeof e)throw new TypeError("callback is not a function");n=(null==n?dn():+n)+(null==t?0:+t),this._next||en===this||(en?en._next=this:Jt=this,en=this),this._call=e,this._time=n,yn()},stop:function(){this._call&&(this._call=null,this._time=1/0,yn())}};var xn=S("start","end","cancel","interrupt"),bn=[];function wn(e,t,n,o,r,i){var a=e.__transition;if(a){if(n in a)return}else e.__transition={};!function(e,t,n){var o,r=e.__transition;function i(e){n.state=1,n.timer.restart(a,n.delay,n.time),n.delay<=e&&a(e-n.delay)}function a(i){var c,u,d,h;if(1!==n.state)return l();for(c in r)if((h=r[c]).name===n.name){if(3===h.state)return vn(a);4===h.state?(h.state=6,h.timer.stop(),h.on.call("interrupt",e,e.__data__,h.index,h.group),delete r[c]):+c<t&&(h.state=6,h.timer.stop(),h.on.call("cancel",e,e.__data__,h.index,h.group),delete r[c])}if(vn((function(){3===n.state&&(n.state=4,n.timer.restart(s,n.delay,n.time),s(i))})),n.state=2,n.on.call("start",e,e.__data__,n.index,n.group),2===n.state){for(n.state=3,o=new Array(d=n.tween.length),c=0,u=-1;c<d;++c)(h=n.tween[c].value.call(e,e.__data__,n.index,n.group))&&(o[++u]=h);o.length=u+1}}function s(t){for(var r=t<n.duration?n.ease.call(null,t/n.duration):(n.timer.restart(l),n.state=5,1),i=-1,a=o.length;++i<a;)o[i].call(e,r);5===n.state&&(n.on.call("end",e,e.__data__,n.index,n.group),l())}function l(){for(var o in n.state=6,n.timer.stop(),delete r[t],r)return;delete e.__transition}r[t]=n,n.timer=gn(i,0,n.time)}(e,n,{name:t,index:o,group:r,on:xn,tween:bn,time:i.time,delay:i.delay,duration:i.duration,ease:i.ease,timer:null,state:0})}function Sn(e,t){var n=Cn(e,t);if(n.state>0)throw new Error("too late; already scheduled");return n}function En(e,t){var n=Cn(e,t);if(n.state>3)throw new Error("too late; already running");return n}function Cn(e,t){var n=e.__transition;if(!n||!(n=n[t]))throw new Error("transition not found");return n}function _n(e,t){var n,o,r,i=e.__transition,a=!0;if(i){for(r in t=null==t?null:t+"",i)(n=i[r]).name===t?(o=n.state>2&&n.state<5,n.state=6,n.timer.stop(),n.on.call(o?"interrupt":"cancel",e,e.__data__,n.index,n.group),delete i[r]):a=!1;a&&delete e.__transition}}function Nn(e,t){var n,o;return function(){var r=En(this,e),i=r.tween;if(i!==n)for(var a=0,s=(o=n=i).length;a<s;++a)if(o[a].name===t){(o=o.slice()).splice(a,1);break}r.tween=o}}function Mn(e,t,n){var o,r;if("function"!=typeof n)throw new Error;return function(){var i=En(this,e),a=i.tween;if(a!==o){r=(o=a).slice();for(var s={name:t,value:n},l=0,c=r.length;l<c;++l)if(r[l].name===t){r[l]=s;break}l===c&&r.push(s)}i.tween=r}}function kn(e,t,n){var o=e._id;return e.each((function(){var e=En(this,o);(e.value||(e.value={}))[t]=n.apply(this,arguments)})),function(e){return Cn(e,o).value[t]}}function Pn(e,t){var n;return("number"==typeof t?Vt:t instanceof bt?Lt:(n=bt(t))?(t=n,Lt):Yt)(e,t)}function An(e){return function(){this.removeAttribute(e)}}function On(e){return function(){this.removeAttributeNS(e.space,e.local)}}function zn(e,t,n){var o,r,i=n+"";return function(){var a=this.getAttribute(e);return a===i?null:a===o?r:r=t(o=a,n)}}function In(e,t,n){var o,r,i=n+"";return function(){var a=this.getAttributeNS(e.space,e.local);return a===i?null:a===o?r:r=t(o=a,n)}}function Rn(e,t,n){var o,r,i;return function(){var a,s,l=n(this);if(null!=l)return(a=this.getAttribute(e))===(s=l+"")?null:a===o&&s===r?i:(r=s,i=t(o=a,l));this.removeAttribute(e)}}function Dn(e,t,n){var o,r,i;return function(){var a,s,l=n(this);if(null!=l)return(a=this.getAttributeNS(e.space,e.local))===(s=l+"")?null:a===o&&s===r?i:(r=s,i=t(o=a,l));this.removeAttributeNS(e.space,e.local)}}function $n(e,t){return function(n){this.setAttribute(e,t.call(this,n))}}function jn(e,t){return function(n){this.setAttributeNS(e.space,e.local,t.call(this,n))}}function Bn(e,t){var n,o;function r(){var r=t.apply(this,arguments);return r!==o&&(n=(o=r)&&jn(e,r)),n}return r._value=t,r}function Tn(e,t){var n,o;function r(){var r=t.apply(this,arguments);return r!==o&&(n=(o=r)&&$n(e,r)),n}return r._value=t,r}function Ln(e,t){return function(){Sn(this,e).delay=+t.apply(this,arguments)}}function Vn(e,t){return t=+t,function(){Sn(this,e).delay=t}}function Hn(e,t){return function(){En(this,e).duration=+t.apply(this,arguments)}}function Xn(e,t){return t=+t,function(){En(this,e).duration=t}}function Yn(e,t){if("function"!=typeof t)throw new Error;return function(){En(this,e).ease=t}}function Fn(e,t,n){var o,r,i=function(e){return(e+"").trim().split(/^|\s+/).every((function(e){var t=e.indexOf(".");return t>=0&&(e=e.slice(0,t)),!e||"start"===e}))}(t)?Sn:En;return function(){var a=i(this,e),s=a.on;s!==o&&(r=(o=s).copy()).on(t,n),a.on=r}}var Zn=Le.prototype.constructor;function Un(e){return function(){this.style.removeProperty(e)}}function Wn(e,t,n){return function(o){this.style.setProperty(e,t.call(this,o),n)}}function Kn(e,t,n){var o,r;function i(){var i=t.apply(this,arguments);return i!==r&&(o=(r=i)&&Wn(e,i,n)),o}return i._value=t,i}function qn(e){return function(t){this.textContent=e.call(this,t)}}function Gn(e){var t,n;function o(){var o=e.apply(this,arguments);return o!==n&&(t=(n=o)&&qn(o)),t}return o._value=e,o}var Qn=0;function Jn(e,t,n,o){this._groups=e,this._parents=t,this._name=n,this._id=o}function eo(){return++Qn}var to=Le.prototype;Jn.prototype={constructor:Jn,select:function(e){var t=this._name,n=this._id;"function"!=typeof e&&(e=R(e));for(var o=this._groups,r=o.length,i=new Array(r),a=0;a<r;++a)for(var s,l,c=o[a],u=c.length,d=i[a]=new Array(u),h=0;h<u;++h)(s=c[h])&&(l=e.call(s,s.__data__,h,c))&&("__data__"in s&&(l.__data__=s.__data__),d[h]=l,wn(d[h],t,n,h,d,Cn(s,n)));return new Jn(i,this._parents,t,n)},selectAll:function(e){var t=this._name,n=this._id;"function"!=typeof e&&(e=j(e));for(var o=this._groups,r=o.length,i=[],a=[],s=0;s<r;++s)for(var l,c=o[s],u=c.length,d=0;d<u;++d)if(l=c[d]){for(var h,f=e.call(l,l.__data__,d,c),g=Cn(l,n),p=0,m=f.length;p<m;++p)(h=f[p])&&wn(h,t,n,p,f,g);i.push(f),a.push(l)}return new Jn(i,a,t,n)},selectChild:to.selectChild,selectChildren:to.selectChildren,filter:function(e){"function"!=typeof e&&(e=B(e));for(var t=this._groups,n=t.length,o=new Array(n),r=0;r<n;++r)for(var i,a=t[r],s=a.length,l=o[r]=[],c=0;c<s;++c)(i=a[c])&&e.call(i,i.__data__,c,a)&&l.push(i);return new Jn(o,this._parents,this._name,this._id)},merge:function(e){if(e._id!==this._id)throw new Error;for(var t=this._groups,n=e._groups,o=t.length,r=n.length,i=Math.min(o,r),a=new Array(o),s=0;s<i;++s)for(var l,c=t[s],u=n[s],d=c.length,h=a[s]=new Array(d),f=0;f<d;++f)(l=c[f]||u[f])&&(h[f]=l);for(;s<o;++s)a[s]=t[s];return new Jn(a,this._parents,this._name,this._id)},selection:function(){return new Zn(this._groups,this._parents)},transition:function(){for(var e=this._name,t=this._id,n=eo(),o=this._groups,r=o.length,i=0;i<r;++i)for(var a,s=o[i],l=s.length,c=0;c<l;++c)if(a=s[c]){var u=Cn(a,t);wn(a,e,n,c,s,{time:u.time+u.delay+u.duration,delay:0,duration:u.duration,ease:u.ease})}return new Jn(o,this._parents,e,n)},call:to.call,nodes:to.nodes,node:to.node,size:to.size,empty:to.empty,each:to.each,on:function(e,t){var n=this._id;return arguments.length<2?Cn(this.node(),n).on.on(e):this.each(Fn(n,e,t))},attr:function(e,t){var n=P(e),o="transform"===n?Gt:Pn;return this.attrTween(e,"function"==typeof t?(n.local?Dn:Rn)(n,o,kn(this,"attr."+e,t)):null==t?(n.local?On:An)(n):(n.local?In:zn)(n,o,t))},attrTween:function(e,t){var n="attr."+e;if(arguments.length<2)return(n=this.tween(n))&&n._value;if(null==t)return this.tween(n,null);if("function"!=typeof t)throw new Error;var o=P(e);return this.tween(n,(o.local?Bn:Tn)(o,t))},style:function(e,t,n){var o="transform"==(e+="")?qt:Pn;return null==t?this.styleTween(e,function(e,t){var n,o,r;return function(){var i=le(this,e),a=(this.style.removeProperty(e),le(this,e));return i===a?null:i===n&&a===o?r:r=t(n=i,o=a)}}(e,o)).on("end.style."+e,Un(e)):"function"==typeof t?this.styleTween(e,function(e,t,n){var o,r,i;return function(){var a=le(this,e),s=n(this),l=s+"";return null==s&&(this.style.removeProperty(e),l=s=le(this,e)),a===l?null:a===o&&l===r?i:(r=l,i=t(o=a,s))}}(e,o,kn(this,"style."+e,t))).each(function(e,t){var n,o,r,i,a="style."+t,s="end."+a;return function(){var l=En(this,e),c=l.on,u=null==l.value[a]?i||(i=Un(t)):void 0;c===n&&r===u||(o=(n=c).copy()).on(s,r=u),l.on=o}}(this._id,e)):this.styleTween(e,function(e,t,n){var o,r,i=n+"";return function(){var a=le(this,e);return a===i?null:a===o?r:r=t(o=a,n)}}(e,o,t),n).on("end.style."+e,null)},styleTween:function(e,t,n){var o="style."+(e+="");if(arguments.length<2)return(o=this.tween(o))&&o._value;if(null==t)return this.tween(o,null);if("function"!=typeof t)throw new Error;return this.tween(o,Kn(e,t,null==n?"":n))},text:function(e){return this.tween("text","function"==typeof e?function(e){return function(){var t=e(this);this.textContent=null==t?"":t}}(kn(this,"text",e)):function(e){return function(){this.textContent=e}}(null==e?"":e+""))},textTween:function(e){var t="text";if(arguments.length<1)return(t=this.tween(t))&&t._value;if(null==e)return this.tween(t,null);if("function"!=typeof e)throw new Error;return this.tween(t,Gn(e))},remove:function(){return this.on("end.remove",function(e){return function(){var t=this.parentNode;for(var n in this.__transition)if(+n!==e)return;t&&t.removeChild(this)}}(this._id))},tween:function(e,t){var n=this._id;if(e+="",arguments.length<2){for(var o,r=Cn(this.node(),n).tween,i=0,a=r.length;i<a;++i)if((o=r[i]).name===e)return o.value;return null}return this.each((null==t?Nn:Mn)(n,e,t))},delay:function(e){var t=this._id;return arguments.length?this.each(("function"==typeof e?Ln:Vn)(t,e)):Cn(this.node(),t).delay},duration:function(e){var t=this._id;return arguments.length?this.each(("function"==typeof e?Hn:Xn)(t,e)):Cn(this.node(),t).duration},ease:function(e){var t=this._id;return arguments.length?this.each(Yn(t,e)):Cn(this.node(),t).ease},easeVarying:function(e){if("function"!=typeof e)throw new Error;return this.each(function(e,t){return function(){var n=t.apply(this,arguments);if("function"!=typeof n)throw new Error;En(this,e).ease=n}}(this._id,e))},end:function(){var e,t,n=this,o=n._id,r=n.size();return new Promise((function(i,a){var s={value:a},l={value:function(){0==--r&&i()}};n.each((function(){var n=En(this,o),r=n.on;r!==e&&((t=(e=r).copy())._.cancel.push(s),t._.interrupt.push(s),t._.end.push(l)),n.on=t})),0===r&&i()}))},[Symbol.iterator]:to[Symbol.iterator]};var no={time:null,delay:0,duration:250,ease:function(e){return((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2}};function oo(e,t){for(var n;!(n=e.__transition)||!(n=n[t]);)if(!(e=e.parentNode))throw new Error(`transition ${t} not found`);return n}Le.prototype.interrupt=function(e){return this.each((function(){_n(this,e)}))},Le.prototype.transition=function(e){var t,n;e instanceof Jn?(t=e._id,e=e._name):(t=eo(),(n=no).time=dn(),e=null==e?null:e+"");for(var o=this._groups,r=o.length,i=0;i<r;++i)for(var a,s=o[i],l=s.length,c=0;c<l;++c)(a=s[c])&&wn(a,e,t,c,s,n||oo(a,t));return new Jn(o,this._parents,e,t)};var ro=e=>()=>e;function io(e,{sourceEvent:t,target:n,transform:o,dispatch:r}){Object.defineProperties(this,{type:{value:e,enumerable:!0,configurable:!0},sourceEvent:{value:t,enumerable:!0,configurable:!0},target:{value:n,enumerable:!0,configurable:!0},transform:{value:o,enumerable:!0,configurable:!0},_:{value:r}})}function ao(e,t,n){this.k=e,this.x=t,this.y=n}ao.prototype={constructor:ao,scale:function(e){return 1===e?this:new ao(this.k*e,this.x,this.y)},translate:function(e,t){return 0===e&0===t?this:new ao(this.k,this.x+this.k*e,this.y+this.k*t)},apply:function(e){return[e[0]*this.k+this.x,e[1]*this.k+this.y]},applyX:function(e){return e*this.k+this.x},applyY:function(e){return e*this.k+this.y},invert:function(e){return[(e[0]-this.x)/this.k,(e[1]-this.y)/this.k]},invertX:function(e){return(e-this.x)/this.k},invertY:function(e){return(e-this.y)/this.k},rescaleX:function(e){return e.copy().domain(e.range().map(this.invertX,this).map(e.invert,e))},rescaleY:function(e){return e.copy().domain(e.range().map(this.invertY,this).map(e.invert,e))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};var so=new ao(1,0,0);function lo(e){e.stopImmediatePropagation()}function co(e){e.preventDefault(),e.stopImmediatePropagation()}function uo(e){return!(e.ctrlKey&&"wheel"!==e.type||e.button)}function ho(){var e=this;return e instanceof SVGElement?(e=e.ownerSVGElement||e).hasAttribute("viewBox")?[[(e=e.viewBox.baseVal).x,e.y],[e.x+e.width,e.y+e.height]]:[[0,0],[e.width.baseVal.value,e.height.baseVal.value]]:[[0,0],[e.clientWidth,e.clientHeight]]}function fo(){return this.__zoom||so}function go(e){return-e.deltaY*(1===e.deltaMode?.05:e.deltaMode?1:.002)*(e.ctrlKey?10:1)}function po(){return navigator.maxTouchPoints||"ontouchstart"in this}function mo(e,t,n){var o=e.invertX(t[0][0])-n[0][0],r=e.invertX(t[1][0])-n[1][0],i=e.invertY(t[0][1])-n[0][1],a=e.invertY(t[1][1])-n[1][1];return e.translate(r>o?(o+r)/2:Math.min(0,o)||Math.max(0,r),a>i?(i+a)/2:Math.min(0,i)||Math.max(0,a))}function yo(){var e,t,n,o=uo,r=ho,i=mo,a=go,s=po,l=[0,1/0],c=[[-1/0,-1/0],[1/0,1/0]],u=250,d=tn,h=S("start","zoom","end"),f=500,g=0,p=10;function m(e){e.property("__zoom",fo).on("wheel.zoom",C,{passive:!1}).on("mousedown.zoom",_).on("dblclick.zoom",N).filter(s).on("touchstart.zoom",M).on("touchmove.zoom",k).on("touchend.zoom touchcancel.zoom",P).style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}function y(e,t){return(t=Math.max(l[0],Math.min(l[1],t)))===e.k?e:new ao(t,e.x,e.y)}function v(e,t,n){var o=t[0]-n[0]*e.k,r=t[1]-n[1]*e.k;return o===e.x&&r===e.y?e:new ao(e.k,o,r)}function x(e){return[(+e[0][0]+ +e[1][0])/2,(+e[0][1]+ +e[1][1])/2]}function b(e,t,n,o){e.on("start.zoom",(function(){w(this,arguments).event(o).start()})).on("interrupt.zoom end.zoom",(function(){w(this,arguments).event(o).end()})).tween("zoom",(function(){var e=this,i=arguments,a=w(e,i).event(o),s=r.apply(e,i),l=null==n?x(s):"function"==typeof n?n.apply(e,i):n,c=Math.max(s[1][0]-s[0][0],s[1][1]-s[0][1]),u=e.__zoom,h="function"==typeof t?t.apply(e,i):t,f=d(u.invert(l).concat(c/u.k),h.invert(l).concat(c/h.k));return function(e){if(1===e)e=h;else{var t=f(e),n=c/t[2];e=new ao(n,l[0]-t[0]*n,l[1]-t[1]*n)}a.zoom(null,e)}}))}function w(e,t,n){return!n&&e.__zooming||new E(e,t)}function E(e,t){this.that=e,this.args=t,this.active=0,this.sourceEvent=null,this.extent=r.apply(e,t),this.taps=0}function C(e,...t){if(o.apply(this,arguments)){var n=w(this,t).event(e),r=this.__zoom,s=Math.max(l[0],Math.min(l[1],r.k*Math.pow(2,a.apply(this,arguments)))),u=He(e);if(n.wheel)n.mouse[0][0]===u[0]&&n.mouse[0][1]===u[1]||(n.mouse[1]=r.invert(n.mouse[0]=u)),clearTimeout(n.wheel);else{if(r.k===s)return;n.mouse=[u,r.invert(u)],_n(this),n.start()}co(e),n.wheel=setTimeout(d,150),n.zoom("mouse",i(v(y(r,s),n.mouse[0],n.mouse[1]),n.extent,c))}function d(){n.wheel=null,n.end()}}function _(e,...t){if(!n&&o.apply(this,arguments)){var r=e.currentTarget,a=w(this,t,!0).event(e),s=Ve(e.view).on("mousemove.zoom",h,!0).on("mouseup.zoom",f,!0),l=He(e,r),u=e.clientX,d=e.clientY;Ue(e.view),lo(e),a.mouse=[l,this.__zoom.invert(l)],_n(this),a.start()}function h(e){if(co(e),!a.moved){var t=e.clientX-u,n=e.clientY-d;a.moved=t*t+n*n>g}a.event(e).zoom("mouse",i(v(a.that.__zoom,a.mouse[0]=He(e,r),a.mouse[1]),a.extent,c))}function f(e){s.on("mousemove.zoom mouseup.zoom",null),We(e.view,a.moved),co(e),a.event(e).end()}}function N(e,...t){if(o.apply(this,arguments)){var n=this.__zoom,a=He(e.changedTouches?e.changedTouches[0]:e,this),s=n.invert(a),l=n.k*(e.shiftKey?.5:2),d=i(v(y(n,l),a,s),r.apply(this,t),c);co(e),u>0?Ve(this).transition().duration(u).call(b,d,a,e):Ve(this).call(m.transform,d,a,e)}}function M(n,...r){if(o.apply(this,arguments)){var i,a,s,l,c=n.touches,u=c.length,d=w(this,r,n.changedTouches.length===u).event(n);for(lo(n),a=0;a<u;++a)l=[l=He(s=c[a],this),this.__zoom.invert(l),s.identifier],d.touch0?d.touch1||d.touch0[2]===l[2]||(d.touch1=l,d.taps=0):(d.touch0=l,i=!0,d.taps=1+!!e);e&&(e=clearTimeout(e)),i&&(d.taps<2&&(t=l[0],e=setTimeout((function(){e=null}),f)),_n(this),d.start())}}function k(e,...t){if(this.__zooming){var n,o,r,a,s=w(this,t).event(e),l=e.changedTouches,u=l.length;for(co(e),n=0;n<u;++n)r=He(o=l[n],this),s.touch0&&s.touch0[2]===o.identifier?s.touch0[0]=r:s.touch1&&s.touch1[2]===o.identifier&&(s.touch1[0]=r);if(o=s.that.__zoom,s.touch1){var d=s.touch0[0],h=s.touch0[1],f=s.touch1[0],g=s.touch1[1],p=(p=f[0]-d[0])*p+(p=f[1]-d[1])*p,m=(m=g[0]-h[0])*m+(m=g[1]-h[1])*m;o=y(o,Math.sqrt(p/m)),r=[(d[0]+f[0])/2,(d[1]+f[1])/2],a=[(h[0]+g[0])/2,(h[1]+g[1])/2]}else{if(!s.touch0)return;r=s.touch0[0],a=s.touch0[1]}s.zoom("touch",i(v(o,r,a),s.extent,c))}}function P(e,...o){if(this.__zooming){var r,i,a=w(this,o).event(e),s=e.changedTouches,l=s.length;for(lo(e),n&&clearTimeout(n),n=setTimeout((function(){n=null}),f),r=0;r<l;++r)i=s[r],a.touch0&&a.touch0[2]===i.identifier?delete a.touch0:a.touch1&&a.touch1[2]===i.identifier&&delete a.touch1;if(a.touch1&&!a.touch0&&(a.touch0=a.touch1,delete a.touch1),a.touch0)a.touch0[1]=this.__zoom.invert(a.touch0[0]);else if(a.end(),2===a.taps&&(i=He(i,this),Math.hypot(t[0]-i[0],t[1]-i[1])<p)){var c=Ve(this).on("dblclick.zoom");c&&c.apply(this,arguments)}}}return m.transform=function(e,t,n,o){var r=e.selection?e.selection():e;r.property("__zoom",fo),e!==r?b(e,t,n,o):r.interrupt().each((function(){w(this,arguments).event(o).start().zoom(null,"function"==typeof t?t.apply(this,arguments):t).end()}))},m.scaleBy=function(e,t,n,o){m.scaleTo(e,(function(){var e=this.__zoom.k,n="function"==typeof t?t.apply(this,arguments):t;return e*n}),n,o)},m.scaleTo=function(e,t,n,o){m.transform(e,(function(){var e=r.apply(this,arguments),o=this.__zoom,a=null==n?x(e):"function"==typeof n?n.apply(this,arguments):n,s=o.invert(a),l="function"==typeof t?t.apply(this,arguments):t;return i(v(y(o,l),a,s),e,c)}),n,o)},m.translateBy=function(e,t,n,o){m.transform(e,(function(){return i(this.__zoom.translate("function"==typeof t?t.apply(this,arguments):t,"function"==typeof n?n.apply(this,arguments):n),r.apply(this,arguments),c)}),null,o)},m.translateTo=function(e,t,n,o,a){m.transform(e,(function(){var e=r.apply(this,arguments),a=this.__zoom,s=null==o?x(e):"function"==typeof o?o.apply(this,arguments):o;return i(so.translate(s[0],s[1]).scale(a.k).translate("function"==typeof t?-t.apply(this,arguments):-t,"function"==typeof n?-n.apply(this,arguments):-n),e,c)}),o,a)},E.prototype={event:function(e){return e&&(this.sourceEvent=e),this},start:function(){return 1==++this.active&&(this.that.__zooming=this,this.emit("start")),this},zoom:function(e,t){return this.mouse&&"mouse"!==e&&(this.mouse[1]=t.invert(this.mouse[0])),this.touch0&&"touch"!==e&&(this.touch0[1]=t.invert(this.touch0[0])),this.touch1&&"touch"!==e&&(this.touch1[1]=t.invert(this.touch1[0])),this.that.__zoom=t,this.emit("zoom"),this},end:function(){return 0==--this.active&&(delete this.that.__zooming,this.emit("end")),this},emit:function(e){var t=Ve(this.that).datum();h.call(e,this.that,new io(e,{sourceEvent:this.sourceEvent,target:m,type:e,transform:this.that.__zoom,dispatch:h}),t)}},m.wheelDelta=function(e){return arguments.length?(a="function"==typeof e?e:ro(+e),m):a},m.filter=function(e){return arguments.length?(o="function"==typeof e?e:ro(!!e),m):o},m.touchable=function(e){return arguments.length?(s="function"==typeof e?e:ro(!!e),m):s},m.extent=function(e){return arguments.length?(r="function"==typeof e?e:ro([[+e[0][0],+e[0][1]],[+e[1][0],+e[1][1]]]),m):r},m.scaleExtent=function(e){return arguments.length?(l[0]=+e[0],l[1]=+e[1],m):[l[0],l[1]]},m.translateExtent=function(e){return arguments.length?(c[0][0]=+e[0][0],c[1][0]=+e[1][0],c[0][1]=+e[0][1],c[1][1]=+e[1][1],m):[[c[0][0],c[0][1]],[c[1][0],c[1][1]]]},m.constrain=function(e){return arguments.length?(i=e,m):i},m.duration=function(e){return arguments.length?(u=+e,m):u},m.interpolate=function(e){return arguments.length?(d=e,m):d},m.on=function(){var e=h.on.apply(h,arguments);return e===h?m:e},m.clickDistance=function(e){return arguments.length?(g=(e=+e)*e,m):Math.sqrt(g)},m.tapDistance=function(e){return arguments.length?(p=+e,m):p},m}ao.prototype;const vo=n.createContext(null),xo=vo.Provider,bo=e=>`Node type "${e}" not found. Using fallback type "default".`,wo=()=>"The React Flow parent container needs a width and a height to render the graph.",So=()=>"Only child nodes can use a parent extent.",Eo=e=>`Marker type "${e}" doesn't exist.`,Co=(e,t)=>`Couldn't create edge for ${e?"target":"source"} handle id: "${e?t.targetHandle:t.sourceHandle}", edge id: ${t.id}.`,_o=()=>"Handle: No node id found. Make sure to only use a Handle inside a custom Node.",No=e=>`Edge type "${e}" not found. Using fallback type "default".`,Mo=e=>`Node with id "${e}" does not exist, it may have been removed. This can happen when a node is deleted before the "onNodeClick" handler is called.`,ko=(()=>"[React Flow]: Seems like you have not used zustand provider as an ancestor. Help: https://reactflow.dev/error#001")();function Po(e,t){const o=n.useContext(vo);if(null===o)throw new Error(ko);return v(o,e,t)}const Ao=()=>{const e=n.useContext(vo);if(null===e)throw new Error(ko);return n.useMemo((()=>({getState:e.getState,setState:e.setState,subscribe:e.subscribe,destroy:e.destroy})),[e])},Oo=e=>e.userSelectionActive?"none":"all";function zo({position:e,children:n,className:o,style:i,...a}){const s=Po(Oo),l=`${e}`.split("-");return t.jsx("div",{className:r(["react-flow__panel",o,...l]),style:{...i,pointerEvents:s},...a,children:n})}function Io({proOptions:e,position:n="bottom-right"}){return e?.hideAttribution?null:t.jsx(zo,{position:n,className:"react-flow__attribution","data-message":"Please only hide this attribution when you are subscribed to React Flow Pro: https://pro.reactflow.dev",children:t.jsx("a",{href:"https://reactflow.dev",target:"_blank",rel:"noopener noreferrer","aria-label":"React Flow attribution",children:"React Flow"})})}var Ro=n.memo((({x:e,y:o,label:i,labelStyle:a={},labelShowBg:s=!0,labelBgStyle:l={},labelBgPadding:c=[2,4],labelBgBorderRadius:u=2,children:d,className:h,...f})=>{const g=n.useRef(null),[p,m]=n.useState({x:0,y:0,width:0,height:0}),y=r(["react-flow__edge-textwrapper",h]);return n.useEffect((()=>{if(g.current){const e=g.current.getBBox();m({x:e.x,y:e.y,width:e.width,height:e.height})}}),[i]),void 0!==i&&i?t.jsxs("g",{transform:`translate(${e-p.width/2} ${o-p.height/2})`,className:y,visibility:p.width?"visible":"hidden",...f,children:[s&&t.jsx("rect",{width:p.width+2*c[0],x:-c[0],y:-c[1],height:p.height+2*c[1],className:"react-flow__edge-textbg",style:l,rx:u,ry:u}),t.jsx("text",{className:"react-flow__edge-text",y:p.height/2,dy:"0.3em",ref:g,style:a,children:i}),d]}):null}));const Do=e=>({width:e.offsetWidth,height:e.offsetHeight}),$o=(e,t=0,n=1)=>Math.min(Math.max(e,t),n),jo=(e={x:0,y:0},t)=>({x:$o(e.x,t[0][0],t[1][0]),y:$o(e.y,t[0][1],t[1][1])}),Bo=(e,t,n)=>e<t?$o(Math.abs(e-t),1,50)/50:e>n?-$o(Math.abs(e-n),1,50)/50:0,To=(e,t)=>[20*Bo(e.x,35,t.width-35),20*Bo(e.y,35,t.height-35)],Lo=e=>e.getRootNode?.()||window?.document,Vo=(e,t)=>({x:Math.min(e.x,t.x),y:Math.min(e.y,t.y),x2:Math.max(e.x2,t.x2),y2:Math.max(e.y2,t.y2)}),Ho=({x:e,y:t,width:n,height:o})=>({x:e,y:t,x2:e+n,y2:t+o}),Xo=({x:e,y:t,x2:n,y2:o})=>({x:e,y:t,width:n-e,height:o-t}),Yo=e=>({...e.positionAbsolute||{x:0,y:0},width:e.width||0,height:e.height||0}),Fo=(e,t)=>Xo(Vo(Ho(e),Ho(t))),Zo=(e,t)=>{const n=Math.max(0,Math.min(e.x+e.width,t.x+t.width)-Math.max(e.x,t.x)),o=Math.max(0,Math.min(e.y+e.height,t.y+t.height)-Math.max(e.y,t.y));return Math.ceil(n*o)},Uo=e=>!isNaN(e)&&isFinite(e),Wo=Symbol.for("internals"),Ko=["Enter"," ","Escape"];function qo(e){const t=((e=>"nativeEvent"in e)(e)?e.nativeEvent:e).composedPath?.()?.[0]||e.target;return["INPUT","SELECT","TEXTAREA"].includes(t?.nodeName)||t?.hasAttribute("contenteditable")||!!t?.closest(".nokey")}const Go=e=>"clientX"in e,Qo=(e,t)=>{const n=Go(e),o=n?e.clientX:e.touches?.[0].clientX,r=n?e.clientY:e.touches?.[0].clientY;return{x:o-(t?.left??0),y:r-(t?.top??0)}},Jo=()=>"undefined"!=typeof navigator&&navigator?.userAgent?.indexOf("Mac")>=0,er=({id:e,path:n,labelX:o,labelY:r,label:i,labelStyle:a,labelShowBg:s,labelBgStyle:l,labelBgPadding:c,labelBgBorderRadius:u,style:d,markerEnd:h,markerStart:f,interactionWidth:g=20})=>t.jsxs(t.Fragment,{children:[t.jsx("path",{id:e,style:d,d:n,fill:"none",className:"react-flow__edge-path",markerEnd:h,markerStart:f}),g&&t.jsx("path",{d:n,fill:"none",strokeOpacity:0,strokeWidth:g,className:"react-flow__edge-interaction"}),i&&Uo(o)&&Uo(r)?t.jsx(Ro,{x:o,y:r,label:i,labelStyle:a,labelShowBg:s,labelBgStyle:l,labelBgPadding:c,labelBgBorderRadius:u}):null]});er.displayName="BaseEdge";function tr(e,t,n){return void 0===n?n:o=>{const r=t().edges.find((t=>t.id===e));r&&n(o,{...r})}}function nr({sourceX:e,sourceY:t,targetX:n,targetY:o}){const r=Math.abs(n-e)/2,i=n<e?n+r:n-r,a=Math.abs(o-t)/2;return[i,o<t?o+a:o-a,r,a]}function or({sourceX:e,sourceY:t,targetX:n,targetY:o,sourceControlX:r,sourceControlY:i,targetControlX:a,targetControlY:s}){const l=.125*e+.375*r+.375*a+.125*n,c=.125*t+.375*i+.375*s+.125*o;return[l,c,Math.abs(l-e),Math.abs(c-t)]}var rr,ir,ar,sr,lr,cr;function ur({pos:t,x1:n,y1:o,x2:r,y2:i}){return t===e.Position.Left||t===e.Position.Right?[.5*(n+r),o]:[n,.5*(o+i)]}function dr({sourceX:t,sourceY:n,sourcePosition:o=e.Position.Bottom,targetX:r,targetY:i,targetPosition:a=e.Position.Top}){const[s,l]=ur({pos:o,x1:t,y1:n,x2:r,y2:i}),[c,u]=ur({pos:a,x1:r,y1:i,x2:t,y2:n}),[d,h,f,g]=or({sourceX:t,sourceY:n,targetX:r,targetY:i,sourceControlX:s,sourceControlY:l,targetControlX:c,targetControlY:u});return[`M${t},${n} C${s},${l} ${c},${u} ${r},${i}`,d,h,f,g]}e.ConnectionMode=void 0,(rr=e.ConnectionMode||(e.ConnectionMode={})).Strict="strict",rr.Loose="loose",e.PanOnScrollMode=void 0,(ir=e.PanOnScrollMode||(e.PanOnScrollMode={})).Free="free",ir.Vertical="vertical",ir.Horizontal="horizontal",e.SelectionMode=void 0,(ar=e.SelectionMode||(e.SelectionMode={})).Partial="partial",ar.Full="full",e.ConnectionLineType=void 0,(sr=e.ConnectionLineType||(e.ConnectionLineType={})).Bezier="default",sr.Straight="straight",sr.Step="step",sr.SmoothStep="smoothstep",sr.SimpleBezier="simplebezier",e.MarkerType=void 0,(lr=e.MarkerType||(e.MarkerType={})).Arrow="arrow",lr.ArrowClosed="arrowclosed",e.Position=void 0,(cr=e.Position||(e.Position={})).Left="left",cr.Top="top",cr.Right="right",cr.Bottom="bottom";const hr=n.memo((({sourceX:n,sourceY:o,targetX:r,targetY:i,sourcePosition:a=e.Position.Bottom,targetPosition:s=e.Position.Top,label:l,labelStyle:c,labelShowBg:u,labelBgStyle:d,labelBgPadding:h,labelBgBorderRadius:f,style:g,markerEnd:p,markerStart:m,interactionWidth:y})=>{const[v,x,b]=dr({sourceX:n,sourceY:o,sourcePosition:a,targetX:r,targetY:i,targetPosition:s});return t.jsx(er,{path:v,labelX:x,labelY:b,label:l,labelStyle:c,labelShowBg:u,labelBgStyle:d,labelBgPadding:h,labelBgBorderRadius:f,style:g,markerEnd:p,markerStart:m,interactionWidth:y})}));hr.displayName="SimpleBezierEdge";const fr={[e.Position.Left]:{x:-1,y:0},[e.Position.Right]:{x:1,y:0},[e.Position.Top]:{x:0,y:-1},[e.Position.Bottom]:{x:0,y:1}},gr=(e,t)=>Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2));function pr({source:t,sourcePosition:n=e.Position.Bottom,target:o,targetPosition:r=e.Position.Top,center:i,offset:a}){const s=fr[n],l=fr[r],c={x:t.x+s.x*a,y:t.y+s.y*a},u={x:o.x+l.x*a,y:o.y+l.y*a},d=(({source:t,sourcePosition:n=e.Position.Bottom,target:o})=>n===e.Position.Left||n===e.Position.Right?t.x<o.x?{x:1,y:0}:{x:-1,y:0}:t.y<o.y?{x:0,y:1}:{x:0,y:-1})({source:c,sourcePosition:n,target:u}),h=0!==d.x?"x":"y",f=d[h];let g,p,m=[];const y={x:0,y:0},v={x:0,y:0},[x,b,w,S]=nr({sourceX:t.x,sourceY:t.y,targetX:o.x,targetY:o.y});if(s[h]*l[h]==-1){g=i.x||x,p=i.y||b;const e=[{x:g,y:c.y},{x:g,y:u.y}],t=[{x:c.x,y:p},{x:u.x,y:p}];m=s[h]===f?"x"===h?e:t:"x"===h?t:e}else{const e=[{x:c.x,y:u.y}],i=[{x:u.x,y:c.y}];if(m="x"===h?s.x===f?i:e:s.y===f?e:i,n===r){const e=Math.abs(t[h]-o[h]);if(e<=a){const n=Math.min(a-1,a-e);s[h]===f?y[h]=(c[h]>t[h]?-1:1)*n:v[h]=(u[h]>o[h]?-1:1)*n}}if(n!==r){const t="x"===h?"y":"x",n=s[h]===l[t],o=c[t]>u[t],r=c[t]<u[t];(1===s[h]&&(!n&&o||n&&r)||1!==s[h]&&(!n&&r||n&&o))&&(m="x"===h?e:i)}const d={x:c.x+y.x,y:c.y+y.y},x={x:u.x+v.x,y:u.y+v.y};Math.max(Math.abs(d.x-m[0].x),Math.abs(x.x-m[0].x))>=Math.max(Math.abs(d.y-m[0].y),Math.abs(x.y-m[0].y))?(g=(d.x+x.x)/2,p=m[0].y):(g=m[0].x,p=(d.y+x.y)/2)}return[[t,{x:c.x+y.x,y:c.y+y.y},...m,{x:u.x+v.x,y:u.y+v.y},o],g,p,w,S]}function mr({sourceX:t,sourceY:n,sourcePosition:o=e.Position.Bottom,targetX:r,targetY:i,targetPosition:a=e.Position.Top,borderRadius:s=5,centerX:l,centerY:c,offset:u=20}){const[d,h,f,g,p]=pr({source:{x:t,y:n},sourcePosition:o,target:{x:r,y:i},targetPosition:a,center:{x:l,y:c},offset:u});return[d.reduce(((e,t,n)=>{let o="";return o=n>0&&n<d.length-1?function(e,t,n,o){const r=Math.min(gr(e,t)/2,gr(t,n)/2,o),{x:i,y:a}=t;if(e.x===i&&i===n.x||e.y===a&&a===n.y)return`L${i} ${a}`;if(e.y===a)return`L ${i+r*(e.x<n.x?-1:1)},${a}Q ${i},${a} ${i},${a+r*(e.y<n.y?1:-1)}`;const s=e.x<n.x?1:-1;return`L ${i},${a+r*(e.y<n.y?-1:1)}Q ${i},${a} ${i+r*s},${a}`}(d[n-1],t,d[n+1],s):`${0===n?"M":"L"}${t.x} ${t.y}`,e+=o}),""),h,f,g,p]}const yr=n.memo((({sourceX:n,sourceY:o,targetX:r,targetY:i,label:a,labelStyle:s,labelShowBg:l,labelBgStyle:c,labelBgPadding:u,labelBgBorderRadius:d,style:h,sourcePosition:f=e.Position.Bottom,targetPosition:g=e.Position.Top,markerEnd:p,markerStart:m,pathOptions:y,interactionWidth:v})=>{const[x,b,w]=mr({sourceX:n,sourceY:o,sourcePosition:f,targetX:r,targetY:i,targetPosition:g,borderRadius:y?.borderRadius,offset:y?.offset});return t.jsx(er,{path:x,labelX:b,labelY:w,label:a,labelStyle:s,labelShowBg:l,labelBgStyle:c,labelBgPadding:u,labelBgBorderRadius:d,style:h,markerEnd:p,markerStart:m,interactionWidth:v})}));yr.displayName="SmoothStepEdge";const vr=n.memo((e=>t.jsx(yr,{...e,pathOptions:n.useMemo((()=>({borderRadius:0,offset:e.pathOptions?.offset})),[e.pathOptions?.offset])})));function xr({sourceX:e,sourceY:t,targetX:n,targetY:o}){const[r,i,a,s]=nr({sourceX:e,sourceY:t,targetX:n,targetY:o});return[`M ${e},${t}L ${n},${o}`,r,i,a,s]}vr.displayName="StepEdge";const br=n.memo((({sourceX:e,sourceY:n,targetX:o,targetY:r,label:i,labelStyle:a,labelShowBg:s,labelBgStyle:l,labelBgPadding:c,labelBgBorderRadius:u,style:d,markerEnd:h,markerStart:f,interactionWidth:g})=>{const[p,m,y]=xr({sourceX:e,sourceY:n,targetX:o,targetY:r});return t.jsx(er,{path:p,labelX:m,labelY:y,label:i,labelStyle:a,labelShowBg:s,labelBgStyle:l,labelBgPadding:c,labelBgBorderRadius:u,style:d,markerEnd:h,markerStart:f,interactionWidth:g})}));function wr(e,t){return e>=0?.5*e:25*t*Math.sqrt(-e)}function Sr({pos:t,x1:n,y1:o,x2:r,y2:i,c:a}){switch(t){case e.Position.Left:return[n-wr(n-r,a),o];case e.Position.Right:return[n+wr(r-n,a),o];case e.Position.Top:return[n,o-wr(o-i,a)];case e.Position.Bottom:return[n,o+wr(i-o,a)]}}function Er({sourceX:t,sourceY:n,sourcePosition:o=e.Position.Bottom,targetX:r,targetY:i,targetPosition:a=e.Position.Top,curvature:s=.25}){const[l,c]=Sr({pos:o,x1:t,y1:n,x2:r,y2:i,c:s}),[u,d]=Sr({pos:a,x1:r,y1:i,x2:t,y2:n,c:s}),[h,f,g,p]=or({sourceX:t,sourceY:n,targetX:r,targetY:i,sourceControlX:l,sourceControlY:c,targetControlX:u,targetControlY:d});return[`M${t},${n} C${l},${c} ${u},${d} ${r},${i}`,h,f,g,p]}br.displayName="StraightEdge";const Cr=n.memo((({sourceX:n,sourceY:o,targetX:r,targetY:i,sourcePosition:a=e.Position.Bottom,targetPosition:s=e.Position.Top,label:l,labelStyle:c,labelShowBg:u,labelBgStyle:d,labelBgPadding:h,labelBgBorderRadius:f,style:g,markerEnd:p,markerStart:m,pathOptions:y,interactionWidth:v})=>{const[x,b,w]=Er({sourceX:n,sourceY:o,sourcePosition:a,targetX:r,targetY:i,targetPosition:s,curvature:y?.curvature});return t.jsx(er,{path:x,labelX:b,labelY:w,label:l,labelStyle:c,labelShowBg:u,labelBgStyle:d,labelBgPadding:h,labelBgBorderRadius:f,style:g,markerEnd:p,markerStart:m,interactionWidth:v})}));Cr.displayName="BezierEdge";const _r=n.createContext(null),Nr=_r.Provider;_r.Consumer;const Mr=()=>n.useContext(_r),kr=e=>"id"in e&&"source"in e&&"target"in e,Pr=e=>"id"in e&&!("source"in e)&&!("target"in e),Ar=({source:e,sourceHandle:t,target:n,targetHandle:o})=>`reactflow__edge-${e}${t||""}-${n}${o||""}`,Or=(e,t)=>{if(void 0===e)return"";if("string"==typeof e)return e;return`${t?`${t}__`:""}${Object.keys(e).sort().map((t=>`${t}=${e[t]}`)).join("&")}`},zr=(e,t)=>{if(!e.source||!e.target)return t;let n;return n=kr(e)?{...e}:{...e,id:Ar(e)},((e,t)=>t.some((t=>!(t.source!==e.source||t.target!==e.target||t.sourceHandle!==e.sourceHandle&&(t.sourceHandle||e.sourceHandle)||t.targetHandle!==e.targetHandle&&(t.targetHandle||e.targetHandle)))))(n,t)?t:t.concat(n)},Ir=({x:e,y:t},[n,o,r],i,[a,s])=>{const l={x:(e-n)/r,y:(t-o)/r};return i?{x:a*Math.round(l.x/a),y:s*Math.round(l.y/s)}:l},Rr=({x:e,y:t},[n,o,r])=>({x:e*r+n,y:t*r+o}),Dr=(e,t=[0,0])=>{if(!e)return{x:0,y:0,positionAbsolute:{x:0,y:0}};const n=(e.width??0)*t[0],o=(e.height??0)*t[1],r={x:e.position.x-n,y:e.position.y-o};return{...r,positionAbsolute:e.positionAbsolute?{x:e.positionAbsolute.x-n,y:e.positionAbsolute.y-o}:r}},$r=(e,t=[0,0])=>{if(0===e.length)return{x:0,y:0,width:0,height:0};const n=e.reduce(((e,n)=>{const{x:o,y:r}=Dr(n,t).positionAbsolute;return Vo(e,Ho({x:o,y:r,width:n.width||0,height:n.height||0}))}),{x:1/0,y:1/0,x2:-1/0,y2:-1/0});return Xo(n)},jr=(e,t,[n,o,r]=[0,0,1],i=!1,a=!1,s=[0,0])=>{const l={x:(t.x-n)/r,y:(t.y-o)/r,width:t.width/r,height:t.height/r},c=[];return e.forEach((e=>{const{width:t,height:n,selectable:o=!0,hidden:r=!1}=e;if(a&&!o||r)return!1;const{positionAbsolute:u}=Dr(e,s),d={x:u.x,y:u.y,width:t||0,height:n||0},h=Zo(l,d);(void 0===t||void 0===n||null===t||null===n||i&&h>0||h>=(t||0)*(n||0)||e.dragging)&&c.push(e)})),c},Br=(e,t)=>{const n=e.map((e=>e.id));return t.filter((e=>n.includes(e.source)||n.includes(e.target)))},Tr=(e,t,n,o,r,i=.1)=>{const a=t/(e.width*(1+i)),s=n/(e.height*(1+i)),l=Math.min(a,s),c=$o(l,o,r);return[t/2-(e.x+e.width/2)*c,n/2-(e.y+e.height/2)*c,c]},Lr=(e,t=0)=>e.transition().duration(t);function Vr(e,t,n,o){return(t[n]||[]).reduce(((t,r)=>(`${e.id}-${r.id}-${n}`!==o&&t.push({id:r.id||null,type:n,nodeId:e.id,x:(e.positionAbsolute?.x??0)+r.x+r.width/2,y:(e.positionAbsolute?.y??0)+r.y+r.height/2}),t)),[])}const Hr={source:null,target:null,sourceHandle:null,targetHandle:null},Xr=()=>({handleDomNode:null,isValid:!1,connection:Hr,endHandle:null});function Yr(t,n,o,r,i,a,s){const l="target"===i,c=s.querySelector(`.react-flow__handle[data-id="${t?.nodeId}-${t?.id}-${t?.type}"]`),u={...Xr(),handleDomNode:c};if(c){const t=Fr(void 0,c),i=c.getAttribute("data-nodeid"),s=c.getAttribute("data-handleid"),d=c.classList.contains("connectable"),h=c.classList.contains("connectableend"),f={source:l?i:o,sourceHandle:l?s:r,target:l?o:i,targetHandle:l?r:s};u.connection=f;d&&h&&(n===e.ConnectionMode.Strict?l&&"source"===t||!l&&"target"===t:i!==o||s!==r)&&(u.endHandle={nodeId:i,handleId:s,type:t},u.isValid=a(f))}return u}function Fr(e,t){return e||(t?.classList.contains("target")?"target":t?.classList.contains("source")?"source":null)}function Zr(e){e?.classList.remove("valid","connecting","react-flow__handle-valid","react-flow__handle-connecting")}function Ur(e,t){let n=null;return t?n="valid":e&&!t&&(n="invalid"),n}function Wr({event:e,handleId:t,nodeId:n,onConnect:o,isTarget:r,getState:i,setState:a,isValidConnection:s,edgeUpdaterType:l,onEdgeUpdateEnd:c}){const u=Lo(e.target),{connectionMode:d,domNode:h,autoPanOnConnect:f,connectionRadius:g,onConnectStart:p,panBy:m,getNodes:y,cancelConnection:v}=i();let x,b=0;const{x:w,y:S}=Qo(e),E=u?.elementFromPoint(w,S),C=Fr(l,E),_=h?.getBoundingClientRect();if(!_||!C)return;let N,M=Qo(e,_),k=!1,P=null,A=!1,O=null;const z=function({nodes:e,nodeId:t,handleId:n,handleType:o}){return e.reduce(((e,r)=>{if(r[Wo]){const{handleBounds:i}=r[Wo];let a=[],s=[];i&&(a=Vr(r,i,"source",`${t}-${n}-${o}`),s=Vr(r,i,"target",`${t}-${n}-${o}`)),e.push(...a,...s)}return e}),[])}({nodes:y(),nodeId:n,handleId:t,handleType:C}),I=()=>{if(!f)return;const[e,t]=To(M,_);m({x:e,y:t}),b=requestAnimationFrame(I)};function R(e){const{transform:o}=i();M=Qo(e,_);const{handle:l,validHandleResult:c}=function(e,t,n,o,r,i){const{x:a,y:s}=Qo(e),l=t.elementsFromPoint(a,s).find((e=>e.classList.contains("react-flow__handle")));if(l){const e=l.getAttribute("data-nodeid");if(e){const t=Fr(void 0,l),o=l.getAttribute("data-handleid"),r=i({nodeId:e,id:o,type:t});if(r)return{handle:{id:o,type:t,nodeId:e,x:n.x,y:n.y},validHandleResult:r}}}let c=[],u=1/0;if(r.forEach((e=>{const t=Math.sqrt((e.x-n.x)**2+(e.y-n.y)**2);if(t<=o){const n=i(e);t<=u&&(t<u?c=[{handle:e,validHandleResult:n}]:t===u&&c.push({handle:e,validHandleResult:n}),u=t)}})),!c.length)return{handle:null,validHandleResult:Xr()};if(1===c.length)return c[0];const d=c.some((({validHandleResult:e})=>e.isValid)),h=c.some((({handle:e})=>"target"===e.type));return c.find((({handle:e,validHandleResult:t})=>h?"target"===e.type:!d||t.isValid))||c[0]}(e,u,Ir(M,o,!1,[1,1]),g,z,(e=>Yr(e,d,n,t,r?"target":"source",s,u)));if(x=l,k||(I(),k=!0),O=c.handleDomNode,P=c.connection,A=c.isValid,a({connectionPosition:x&&A?Rr({x:x.x,y:x.y},o):M,connectionStatus:Ur(!!x,A),connectionEndHandle:c.endHandle}),!x&&!A&&!O)return Zr(N);P.source!==P.target&&O&&(Zr(N),N=O,O.classList.add("connecting","react-flow__handle-connecting"),O.classList.toggle("valid",A),O.classList.toggle("react-flow__handle-valid",A))}function D(e){(x||O)&&P&&A&&o?.(P),i().onConnectEnd?.(e),l&&c?.(e),Zr(N),v(),cancelAnimationFrame(b),k=!1,A=!1,P=null,O=null,u.removeEventListener("mousemove",R),u.removeEventListener("mouseup",D),u.removeEventListener("touchmove",R),u.removeEventListener("touchend",D)}a({connectionPosition:M,connectionStatus:null,connectionNodeId:n,connectionHandleId:t,connectionHandleType:C,connectionStartHandle:{nodeId:n,handleId:t,type:C},connectionEndHandle:null}),p?.(e,{nodeId:n,handleId:t,handleType:C}),u.addEventListener("mousemove",R),u.addEventListener("mouseup",D),u.addEventListener("touchmove",R),u.addEventListener("touchend",D)}const Kr=()=>!0,qr=e=>({connectionStartHandle:e.connectionStartHandle,connectOnClick:e.connectOnClick,noPanClassName:e.noPanClassName}),Gr=n.forwardRef((({type:n="source",position:o=e.Position.Top,isValidConnection:i,isConnectable:a=!0,isConnectableStart:s=!0,isConnectableEnd:l=!0,id:c,onConnect:u,children:d,className:h,onMouseDown:f,onTouchStart:g,...p},m)=>{const y=c||null,v="target"===n,x=Ao(),w=Mr(),{connectOnClick:S,noPanClassName:E}=Po(qr,b),{connecting:C,clickConnecting:_}=Po(((e,t,n)=>o=>{const{connectionStartHandle:r,connectionEndHandle:i,connectionClickStartHandle:a}=o;return{connecting:r?.nodeId===e&&r?.handleId===t&&r?.type===n||i?.nodeId===e&&i?.handleId===t&&i?.type===n,clickConnecting:a?.nodeId===e&&a?.handleId===t&&a?.type===n}})(w,y,n),b);w||x.getState().onError?.("010",_o());const N=e=>{const{defaultEdgeOptions:t,onConnect:n,hasDefaultEdges:o}=x.getState(),r={...t,...e};if(o){const{edges:e,setEdges:t}=x.getState();t(zr(r,e))}n?.(r),u?.(r)},M=e=>{if(!w)return;const t=Go(e);s&&(t&&0===e.button||!t)&&Wr({event:e,handleId:y,nodeId:w,onConnect:N,isTarget:v,getState:x.getState,setState:x.setState,isValidConnection:i||x.getState().isValidConnection||Kr}),t?f?.(e):g?.(e)};return t.jsx("div",{"data-handleid":y,"data-nodeid":w,"data-handlepos":o,"data-id":`${w}-${y}-${n}`,className:r(["react-flow__handle",`react-flow__handle-${o}`,"nodrag",E,h,{source:!v,target:v,connectable:a,connectablestart:s,connectableend:l,connecting:_,connectionindicator:a&&(s&&!C||l&&C)}]),onMouseDown:M,onTouchStart:M,onClick:S?e=>{const{onClickConnectStart:t,onClickConnectEnd:o,connectionClickStartHandle:r,connectionMode:a,isValidConnection:l}=x.getState();if(!w||!r&&!s)return;if(!r)return t?.(e,{nodeId:w,handleId:y,handleType:n}),void x.setState({connectionClickStartHandle:{nodeId:w,type:n,handleId:y}});const c=Lo(e.target),u=i||l||Kr,{connection:d,isValid:h}=Yr({nodeId:w,id:y,type:n},a,r.nodeId,r.handleId||null,r.type,u,c);h&&N(d),o?.(e),x.setState({connectionClickStartHandle:null})}:void 0,ref:m,...p,children:d})}));Gr.displayName="Handle";var Qr=n.memo(Gr);const Jr=({data:n,isConnectable:o,targetPosition:r=e.Position.Top,sourcePosition:i=e.Position.Bottom})=>t.jsxs(t.Fragment,{children:[t.jsx(Qr,{type:"target",position:r,isConnectable:o}),n?.label,t.jsx(Qr,{type:"source",position:i,isConnectable:o})]});Jr.displayName="DefaultNode";var ei=n.memo(Jr);const ti=({data:n,isConnectable:o,sourcePosition:r=e.Position.Bottom})=>t.jsxs(t.Fragment,{children:[n?.label,t.jsx(Qr,{type:"source",position:r,isConnectable:o})]});ti.displayName="InputNode";var ni=n.memo(ti);const oi=({data:n,isConnectable:o,targetPosition:r=e.Position.Top})=>t.jsxs(t.Fragment,{children:[t.jsx(Qr,{type:"target",position:r,isConnectable:o}),n?.label]});oi.displayName="OutputNode";var ri=n.memo(oi);const ii=()=>null;ii.displayName="GroupNode";const ai=e=>({selectedNodes:e.getNodes().filter((e=>e.selected)),selectedEdges:e.edges.filter((e=>e.selected))}),si=e=>e.id;function li(e,t){return b(e.selectedNodes.map(si),t.selectedNodes.map(si))&&b(e.selectedEdges.map(si),t.selectedEdges.map(si))}const ci=n.memo((({onSelectionChange:e})=>{const t=Ao(),{selectedNodes:o,selectedEdges:r}=Po(ai,li);return n.useEffect((()=>{const n={nodes:o,edges:r};e?.(n),t.getState().onSelectionChange?.(n)}),[o,r,e]),null}));ci.displayName="SelectionListener";const ui=e=>!!e.onSelectionChange;function di({onSelectionChange:e}){const n=Po(ui);return e||n?t.jsx(ci,{onSelectionChange:e}):null}const hi=e=>({setNodes:e.setNodes,setEdges:e.setEdges,setDefaultNodesAndEdges:e.setDefaultNodesAndEdges,setMinZoom:e.setMinZoom,setMaxZoom:e.setMaxZoom,setTranslateExtent:e.setTranslateExtent,setNodeExtent:e.setNodeExtent,reset:e.reset});function fi(e,t){n.useEffect((()=>{void 0!==e&&t(e)}),[e])}function gi(e,t,o){n.useEffect((()=>{void 0!==t&&o({[e]:t})}),[t])}const pi=({nodes:e,edges:t,defaultNodes:o,defaultEdges:r,onConnect:i,onConnectStart:a,onConnectEnd:s,onClickConnectStart:l,onClickConnectEnd:c,nodesDraggable:u,nodesConnectable:d,nodesFocusable:h,edgesFocusable:f,edgesUpdatable:g,elevateNodesOnSelect:p,minZoom:m,maxZoom:y,nodeExtent:v,onNodesChange:x,onEdgesChange:w,elementsSelectable:S,connectionMode:E,snapGrid:C,snapToGrid:_,translateExtent:N,connectOnClick:M,defaultEdgeOptions:k,fitView:P,fitViewOptions:A,onNodesDelete:O,onEdgesDelete:z,onNodeDrag:I,onNodeDragStart:R,onNodeDragStop:D,onSelectionDrag:$,onSelectionDragStart:j,onSelectionDragStop:B,noPanClassName:T,nodeOrigin:L,rfId:V,autoPanOnConnect:H,autoPanOnNodeDrag:X,onError:Y,connectionRadius:F,isValidConnection:Z})=>{const{setNodes:U,setEdges:W,setDefaultNodesAndEdges:K,setMinZoom:q,setMaxZoom:G,setTranslateExtent:Q,setNodeExtent:J,reset:ee}=Po(hi,b),te=Ao();return n.useEffect((()=>{const e=r?.map((e=>({...e,...k})));return K(o,e),()=>{ee()}}),[]),gi("defaultEdgeOptions",k,te.setState),gi("connectionMode",E,te.setState),gi("onConnect",i,te.setState),gi("onConnectStart",a,te.setState),gi("onConnectEnd",s,te.setState),gi("onClickConnectStart",l,te.setState),gi("onClickConnectEnd",c,te.setState),gi("nodesDraggable",u,te.setState),gi("nodesConnectable",d,te.setState),gi("nodesFocusable",h,te.setState),gi("edgesFocusable",f,te.setState),gi("edgesUpdatable",g,te.setState),gi("elementsSelectable",S,te.setState),gi("elevateNodesOnSelect",p,te.setState),gi("snapToGrid",_,te.setState),gi("snapGrid",C,te.setState),gi("onNodesChange",x,te.setState),gi("onEdgesChange",w,te.setState),gi("connectOnClick",M,te.setState),gi("fitViewOnInit",P,te.setState),gi("fitViewOnInitOptions",A,te.setState),gi("onNodesDelete",O,te.setState),gi("onEdgesDelete",z,te.setState),gi("onNodeDrag",I,te.setState),gi("onNodeDragStart",R,te.setState),gi("onNodeDragStop",D,te.setState),gi("onSelectionDrag",$,te.setState),gi("onSelectionDragStart",j,te.setState),gi("onSelectionDragStop",B,te.setState),gi("noPanClassName",T,te.setState),gi("nodeOrigin",L,te.setState),gi("rfId",V,te.setState),gi("autoPanOnConnect",H,te.setState),gi("autoPanOnNodeDrag",X,te.setState),gi("onError",Y,te.setState),gi("connectionRadius",F,te.setState),gi("isValidConnection",Z,te.setState),fi(e,U),fi(t,W),fi(m,q),fi(y,G),fi(N,Q),fi(v,J),null},mi={display:"none"},yi={position:"absolute",width:1,height:1,margin:-1,border:0,padding:0,overflow:"hidden",clip:"rect(0px, 0px, 0px, 0px)",clipPath:"inset(100%)"},vi="react-flow__node-desc",xi="react-flow__edge-desc",bi=e=>e.ariaLiveMessage;function wi({rfId:e}){const n=Po(bi);return t.jsx("div",{id:`react-flow__aria-live-${e}`,"aria-live":"assertive","aria-atomic":"true",style:yi,children:n})}function Si({rfId:e,disableKeyboardA11y:n}){return t.jsxs(t.Fragment,{children:[t.jsxs("div",{id:`${vi}-${e}`,style:mi,children:["Press enter or space to select a node.",!n&&"You can then use the arrow keys to move the node around."," Press delete to remove it and escape to cancel."," "]}),t.jsx("div",{id:`${xi}-${e}`,style:mi,children:"Press enter or space to select an edge. You can then press delete to remove it or escape to cancel."}),!n&&t.jsx(wi,{rfId:e})]})}const Ei="undefined"!=typeof document?document:null;var Ci=(e=null,t={target:Ei})=>{const[o,r]=n.useState(!1),i=n.useRef(!1),a=n.useRef(new Set([])),[s,l]=n.useMemo((()=>{if(null!==e){const t=(Array.isArray(e)?e:[e]).filter((e=>"string"==typeof e)).map((e=>e.split("+"))),n=t.reduce(((e,t)=>e.concat(...t)),[]);return[t,n]}return[[],[]]}),[e]);return n.useEffect((()=>{if(null!==e){const e=e=>{if(i.current=e.ctrlKey||e.metaKey||e.shiftKey,!i.current&&qo(e))return!1;const t=Ni(e.code,l);a.current.add(e[t]),_i(s,a.current,!1)&&(e.preventDefault(),r(!0))},n=e=>{if(!i.current&&qo(e))return!1;const t=Ni(e.code,l);_i(s,a.current,!0)?(r(!1),a.current.clear()):a.current.delete(e[t]),"Meta"===e.key&&a.current.clear(),i.current=!1},o=()=>{a.current.clear(),r(!1)};return t?.target?.addEventListener("keydown",e),t?.target?.addEventListener("keyup",n),window.addEventListener("blur",o),()=>{t?.target?.removeEventListener("keydown",e),t?.target?.removeEventListener("keyup",n),window.removeEventListener("blur",o)}}}),[e,r]),o};function _i(e,t,n){return e.filter((e=>n||e.length===t.size)).some((e=>e.every((e=>t.has(e)))))}function Ni(e,t){return t.includes(e)?"code":"key"}function Mi(e,t,n,o){if(!e.parentNode)return n;const r=t.get(e.parentNode),i=Dr(r,o);return Mi(r,t,{x:(n.x??0)+i.x,y:(n.y??0)+i.y,z:(r[Wo]?.z??0)>(n.z??0)?r[Wo]?.z??0:n.z??0},o)}function ki(e,t,n){e.forEach((o=>{if(o.parentNode&&!e.has(o.parentNode))throw new Error(`Parent node ${o.parentNode} not found`);if(o.parentNode||n?.[o.id]){const{x:r,y:i,z:a}=Mi(o,e,{...o.position,z:o[Wo]?.z??0},t);o.positionAbsolute={x:r,y:i},o[Wo].z=a,n?.[o.id]&&(o[Wo].isParent=!0)}}))}function Pi(e,t,n,o){const r=new Map,i={},a=o?1e3:0;return e.forEach((e=>{const n=(Uo(e.zIndex)?e.zIndex:0)+(e.selected?a:0),o=t.get(e.id),s={width:o?.width,height:o?.height,...e,positionAbsolute:{x:e.position.x,y:e.position.y}};e.parentNode&&(s.parentNode=e.parentNode,i[e.parentNode]=!0),Object.defineProperty(s,Wo,{enumerable:!1,value:{handleBounds:o?.[Wo]?.handleBounds,z:n}}),r.set(e.id,s)})),ki(r,n,i),r}function Ai(e,t={}){const{getNodes:n,width:o,height:r,minZoom:i,maxZoom:a,d3Zoom:s,d3Selection:l,fitViewOnInitDone:c,fitViewOnInit:u,nodeOrigin:d}=e(),h=t.initial&&!c&&u;if(s&&l&&(h||!t.initial)){const e=n().filter((e=>{const n=t.includeHiddenNodes?e.width&&e.height:!e.hidden;return t.nodes?.length?n&&t.nodes.some((t=>t.id===e.id)):n})),c=e.every((e=>e.width&&e.height));if(e.length>0&&c){const n=$r(e,d),[c,u,h]=Tr(n,o,r,t.minZoom??i,t.maxZoom??a,t.padding??.1),f=so.translate(c,u).scale(h);return"number"==typeof t.duration&&t.duration>0?s.transform(Lr(l,t.duration),f):s.transform(l,f),!0}}return!1}function Oi(e,t){return e.forEach((e=>{const n=t.get(e.id);n&&t.set(n.id,{...n,[Wo]:n[Wo],selected:e.selected})})),new Map(t)}function zi(e,t){return t.map((t=>{const n=e.find((e=>e.id===t.id));return n&&(t.selected=n.selected),t}))}function Ii({changedNodes:e,changedEdges:t,get:n,set:o}){const{nodeInternals:r,edges:i,onNodesChange:a,onEdgesChange:s,hasDefaultNodes:l,hasDefaultEdges:c}=n();e?.length&&(l&&o({nodeInternals:Oi(e,r)}),a?.(e)),t?.length&&(c&&o({edges:zi(t,i)}),s?.(t))}const Ri=()=>{},Di={zoomIn:Ri,zoomOut:Ri,zoomTo:Ri,getZoom:()=>1,setViewport:Ri,getViewport:()=>({x:0,y:0,zoom:1}),fitView:()=>!1,setCenter:Ri,fitBounds:Ri,project:e=>e,viewportInitialized:!1},$i=e=>({d3Zoom:e.d3Zoom,d3Selection:e.d3Selection});function ji(){const e=(()=>{const e=Ao(),{d3Zoom:t,d3Selection:o}=Po($i,b),r=n.useMemo((()=>o&&t?{zoomIn:e=>t.scaleBy(Lr(o,e?.duration),1.2),zoomOut:e=>t.scaleBy(Lr(o,e?.duration),1/1.2),zoomTo:(e,n)=>t.scaleTo(Lr(o,n?.duration),e),getZoom:()=>e.getState().transform[2],setViewport:(n,r)=>{const[i,a,s]=e.getState().transform,l=so.translate(n.x??i,n.y??a).scale(n.zoom??s);t.transform(Lr(o,r?.duration),l)},getViewport:()=>{const[t,n,o]=e.getState().transform;return{x:t,y:n,zoom:o}},fitView:t=>Ai(e.getState,t),setCenter:(n,r,i)=>{const{width:a,height:s,maxZoom:l}=e.getState(),c=void 0!==i?.zoom?i.zoom:l,u=a/2-n*c,d=s/2-r*c,h=so.translate(u,d).scale(c);t.transform(Lr(o,i?.duration),h)},fitBounds:(n,r)=>{const{width:i,height:a,minZoom:s,maxZoom:l}=e.getState(),[c,u,d]=Tr(n,i,a,s,l,r?.padding??.1),h=so.translate(c,u).scale(d);t.transform(Lr(o,r?.duration),h)},project:t=>{const{transform:n,snapToGrid:o,snapGrid:r}=e.getState();return Ir(t,n,o,r)},viewportInitialized:!0}:Di),[t,o]);return r})(),t=Ao(),o=n.useCallback((()=>t.getState().getNodes().map((e=>({...e})))),[]),r=n.useCallback((e=>t.getState().nodeInternals.get(e)),[]),i=n.useCallback((()=>{const{edges:e=[]}=t.getState();return e.map((e=>({...e})))}),[]),a=n.useCallback((e=>{const{edges:n=[]}=t.getState();return n.find((t=>t.id===e))}),[]),s=n.useCallback((e=>{const{getNodes:n,setNodes:o,hasDefaultNodes:r,onNodesChange:i}=t.getState(),a=n(),s="function"==typeof e?e(a):e;if(r)o(s);else if(i){i(0===s.length?a.map((e=>({type:"remove",id:e.id}))):s.map((e=>({item:e,type:"reset"}))))}}),[]),l=n.useCallback((e=>{const{edges:n=[],setEdges:o,hasDefaultEdges:r,onEdgesChange:i}=t.getState(),a="function"==typeof e?e(n):e;if(r)o(a);else if(i){i(0===a.length?n.map((e=>({type:"remove",id:e.id}))):a.map((e=>({item:e,type:"reset"}))))}}),[]),c=n.useCallback((e=>{const n=Array.isArray(e)?e:[e],{getNodes:o,setNodes:r,hasDefaultNodes:i,onNodesChange:a}=t.getState();if(i){r([...o(),...n])}else if(a){a(n.map((e=>({item:e,type:"add"}))))}}),[]),u=n.useCallback((e=>{const n=Array.isArray(e)?e:[e],{edges:o=[],setEdges:r,hasDefaultEdges:i,onEdgesChange:a}=t.getState();if(i)r([...o,...n]);else if(a){a(n.map((e=>({item:e,type:"add"}))))}}),[]),d=n.useCallback((()=>{const{getNodes:e,edges:n=[],transform:o}=t.getState(),[r,i,a]=o;return{nodes:e().map((e=>({...e}))),edges:n.map((e=>({...e}))),viewport:{x:r,y:i,zoom:a}}}),[]),h=n.useCallback((({nodes:e,edges:n})=>{const{nodeInternals:o,getNodes:r,edges:i,hasDefaultNodes:a,hasDefaultEdges:s,onNodesDelete:l,onEdgesDelete:c,onNodesChange:u,onEdgesChange:d}=t.getState(),h=(e||[]).map((e=>e.id)),f=(n||[]).map((e=>e.id)),g=r().reduce(((e,t)=>{const n=!h.includes(t.id)&&t.parentNode&&e.find((e=>e.id===t.parentNode));return("boolean"!=typeof t.deletable||t.deletable)&&(h.includes(t.id)||n)&&e.push(t),e}),[]),p=i.filter((e=>"boolean"!=typeof e.deletable||e.deletable)),m=p.filter((e=>f.includes(e.id)));if(g||m){const e=Br(g,p),n=[...m,...e],r=n.reduce(((e,t)=>(e.includes(t.id)||e.push(t.id),e)),[]);if((s||a)&&(s&&t.setState({edges:i.filter((e=>!r.includes(e.id)))}),a&&(g.forEach((e=>{o.delete(e.id)})),t.setState({nodeInternals:new Map(o)}))),r.length>0&&(c?.(n),d&&d(r.map((e=>({id:e,type:"remove"}))))),g.length>0&&(l?.(g),u)){u(g.map((e=>({id:e.id,type:"remove"}))))}}}),[]),f=n.useCallback((e=>{const n=Uo((o=e).width)&&Uo(o.height)&&Uo(o.x)&&Uo(o.y);var o;const r=n?null:t.getState().nodeInternals.get(e.id);return[n?e:Yo(r),r,n]}),[]),g=n.useCallback(((e,n=!0,o)=>{const[r,i,a]=f(e);return r?(o||t.getState().getNodes()).filter((t=>{if(!(a||t.id!==i.id&&t.positionAbsolute))return!1;const o=Yo(t),s=Zo(o,r);return n&&s>0||s>=e.width*e.height})):[]}),[]),p=n.useCallback(((e,t,n=!0)=>{const[o]=f(e);if(!o)return!1;const r=Zo(o,t);return n&&r>0||r>=e.width*e.height}),[]);return n.useMemo((()=>({...e,getNodes:o,getNode:r,getEdges:i,getEdge:a,setNodes:s,setEdges:l,addNodes:c,addEdges:u,toObject:d,deleteElements:h,getIntersectingNodes:g,isNodeIntersecting:p})),[e,o,r,i,a,s,l,c,u,d,h,g,p])}const Bi={position:"absolute",width:"100%",height:"100%",top:0,left:0},Ti=e=>({x:e.x,y:e.y,zoom:e.k}),Li=(e,t)=>e.target.closest(`.${t}`),Vi=(e,t)=>2===t&&Array.isArray(e)&&e.includes(2),Hi=e=>{const t=e.ctrlKey&&Jo()?10:1;return-e.deltaY*(1===e.deltaMode?.05:e.deltaMode?1:.002)*t},Xi=e=>({d3Zoom:e.d3Zoom,d3Selection:e.d3Selection,d3ZoomHandler:e.d3ZoomHandler,userSelectionActive:e.userSelectionActive}),Yi=({onMove:o,onMoveStart:r,onMoveEnd:i,onPaneContextMenu:a,zoomOnScroll:s=!0,zoomOnPinch:l=!0,panOnScroll:c=!1,panOnScrollSpeed:u=.5,panOnScrollMode:d=e.PanOnScrollMode.Free,zoomOnDoubleClick:h=!0,elementsSelectable:f,panOnDrag:g=!0,defaultViewport:p,translateExtent:m,minZoom:y,maxZoom:v,zoomActivationKeyCode:x,preventScrolling:w=!0,children:S,noWheelClassName:E,noPanClassName:C})=>{const _=n.useRef(),N=Ao(),M=n.useRef(!1),k=n.useRef(!1),P=n.useRef(null),A=n.useRef({x:0,y:0,zoom:0}),{d3Zoom:O,d3Selection:z,d3ZoomHandler:I,userSelectionActive:R}=Po(Xi,b),D=Ci(x),$=n.useRef(0),j=n.useRef(!1),B=n.useRef();return function(e){const t=Ao();n.useEffect((()=>{let n;const o=()=>{if(!e.current)return;const n=Do(e.current);0!==n.height&&0!==n.width||t.getState().onError?.("004",wo()),t.setState({width:n.width||500,height:n.height||500})};return o(),window.addEventListener("resize",o),e.current&&(n=new ResizeObserver((()=>o())),n.observe(e.current)),()=>{window.removeEventListener("resize",o),n&&e.current&&n.unobserve(e.current)}}),[])}(P),n.useEffect((()=>{if(P.current){const e=P.current.getBoundingClientRect(),t=yo().scaleExtent([y,v]).translateExtent(m),n=Ve(P.current).call(t),o=so.translate(p.x,p.y).scale($o(p.zoom,y,v)),r=[[0,0],[e.width,e.height]],i=t.constrain()(o,r,m);t.transform(n,i),t.wheelDelta(Hi),N.setState({d3Zoom:t,d3Selection:n,d3ZoomHandler:n.on("wheel.zoom"),transform:[i.x,i.y,i.k],domNode:P.current.closest(".react-flow")})}}),[]),n.useEffect((()=>{z&&O&&(!c||D||R?void 0!==I&&z.on("wheel.zoom",(function(e,t){if(!w||Li(e,E))return null;e.preventDefault(),I.call(this,e,t)}),{passive:!1}):z.on("wheel.zoom",(t=>{if(Li(t,E))return!1;t.preventDefault(),t.stopImmediatePropagation();const n=z.property("__zoom").k||1,a=Jo();if(t.ctrlKey&&l&&a){const e=He(t),o=Hi(t),r=n*Math.pow(2,o);return void O.scaleTo(z,r,e,t)}const s=1===t.deltaMode?20:1;let c=d===e.PanOnScrollMode.Vertical?0:t.deltaX*s,h=d===e.PanOnScrollMode.Horizontal?0:t.deltaY*s;!a&&t.shiftKey&&d!==e.PanOnScrollMode.Vertical&&(c=t.deltaY*s,h=0),O.translateBy(z,-c/n*u,-h/n*u,{internal:!0});const f=Ti(z.property("__zoom")),{onViewportChangeStart:g,onViewportChange:p,onViewportChangeEnd:m}=N.getState();clearTimeout(B.current),j.current||(j.current=!0,r?.(t,f),g?.(f)),j.current&&(o?.(t,f),p?.(f),B.current=setTimeout((()=>{i?.(t,f),m?.(f),j.current=!1}),150))}),{passive:!1}))}),[R,c,d,z,O,I,D,l,w,E,r,o,i]),n.useEffect((()=>{O&&O.on("start",(e=>{if(!e.sourceEvent||e.sourceEvent.internal)return null;$.current=e.sourceEvent?.button;const{onViewportChangeStart:t}=N.getState(),n=Ti(e.transform);M.current=!0,A.current=n,"mousedown"===e.sourceEvent?.type&&N.setState({paneDragging:!0}),t?.(n),r?.(e.sourceEvent,n)}))}),[O,r]),n.useEffect((()=>{O&&(R&&!M.current?O.on("zoom",null):R||O.on("zoom",(e=>{const{onViewportChange:t}=N.getState();if(N.setState({transform:[e.transform.x,e.transform.y,e.transform.k]}),k.current=!(!a||!Vi(g,$.current??0)),(o||t)&&!e.sourceEvent?.internal){const n=Ti(e.transform);t?.(n),o?.(e.sourceEvent,n)}})))}),[R,O,o,g,a]),n.useEffect((()=>{O&&O.on("end",(e=>{if(!e.sourceEvent||e.sourceEvent.internal)return null;const{onViewportChangeEnd:t}=N.getState();if(M.current=!1,N.setState({paneDragging:!1}),a&&Vi(g,$.current??0)&&!k.current&&a(e.sourceEvent),k.current=!1,(i||t)&&(n=A.current,o=e.transform,n.x!==o.x||n.y!==o.y||n.zoom!==o.k)){const n=Ti(e.transform);A.current=n,clearTimeout(_.current),_.current=setTimeout((()=>{t?.(n),i?.(e.sourceEvent,n)}),c?150:0)}var n,o}))}),[O,c,g,i,a]),n.useEffect((()=>{O&&O.filter((e=>{const t=D||s,n=l&&e.ctrlKey;if(1===e.button&&"mousedown"===e.type&&(Li(e,"react-flow__node")||Li(e,"react-flow__edge")))return!0;if(!(g||t||c||h||l))return!1;if(R)return!1;if(!h&&"dblclick"===e.type)return!1;if(Li(e,E)&&"wheel"===e.type)return!1;if(Li(e,C)&&"wheel"!==e.type)return!1;if(!l&&e.ctrlKey&&"wheel"===e.type)return!1;if(!t&&!c&&!n&&"wheel"===e.type)return!1;if(!g&&("mousedown"===e.type||"touchstart"===e.type))return!1;if(Array.isArray(g)&&!g.includes(e.button)&&("mousedown"===e.type||"touchstart"===e.type))return!1;const o=Array.isArray(g)&&g.includes(e.button)||!e.button||e.button<=1;return(!e.ctrlKey||"wheel"===e.type)&&o}))}),[R,O,s,l,c,h,g,f,D]),t.jsx("div",{className:"react-flow__renderer",ref:P,style:Bi,children:S})},Fi=e=>({userSelectionActive:e.userSelectionActive,userSelectionRect:e.userSelectionRect});function Zi(){const{userSelectionActive:e,userSelectionRect:n}=Po(Fi,b);return e&&n?t.jsx("div",{className:"react-flow__selection react-flow__container",style:{width:n.width,height:n.height,transform:`translate(${n.x}px, ${n.y}px)`}}):null}function Ui(e,t){const n=e.find((e=>e.id===t.parentNode));if(n){const e=t.position.x+t.width-n.width,o=t.position.y+t.height-n.height;if(e>0||o>0||t.position.x<0||t.position.y<0){if(n.style={...n.style}||{},n.style.width=n.style.width??n.width,n.style.height=n.style.height??n.height,e>0&&(n.style.width+=e),o>0&&(n.style.height+=o),t.position.x<0){const e=Math.abs(t.position.x);n.position.x=n.position.x-e,n.style.width+=e,t.position.x=0}if(t.position.y<0){const e=Math.abs(t.position.y);n.position.y=n.position.y-e,n.style.height+=e,t.position.y=0}n.width=n.style.width,n.height=n.style.height}}}function Wi(e,t){if(e.some((e=>"reset"===e.type)))return e.filter((e=>"reset"===e.type)).map((e=>e.item));const n=e.filter((e=>"add"===e.type)).map((e=>e.item));return t.reduce(((t,n)=>{const o=e.filter((e=>e.id===n.id));if(0===o.length)return t.push(n),t;const r={...n};for(const e of o)if(e)switch(e.type){case"select":r.selected=e.selected;break;case"position":void 0!==e.position&&(r.position=e.position),void 0!==e.positionAbsolute&&(r.positionAbsolute=e.positionAbsolute),void 0!==e.dragging&&(r.dragging=e.dragging),r.expandParent&&Ui(t,r);break;case"dimensions":void 0!==e.dimensions&&(r.width=e.dimensions.width,r.height=e.dimensions.height),void 0!==e.updateStyle&&(r.style={...r.style||{},...e.dimensions}),"boolean"==typeof e.resizing&&(r.resizing=e.resizing),r.expandParent&&Ui(t,r);break;case"remove":return t}return t.push(r),t}),n)}function Ki(e,t){return Wi(e,t)}function qi(e,t){return Wi(e,t)}const Gi=(e,t)=>({id:e,type:"select",selected:t});function Qi(e,t){return e.reduce(((e,n)=>{const o=t.includes(n.id);return!n.selected&&o?(n.selected=!0,e.push(Gi(n.id,!0))):n.selected&&!o&&(n.selected=!1,e.push(Gi(n.id,!1))),e}),[])}const Ji=(e,t)=>n=>{n.target===t.current&&e?.(n)},ea=e=>({userSelectionActive:e.userSelectionActive,elementsSelectable:e.elementsSelectable,dragging:e.paneDragging}),ta=n.memo((({isSelecting:o,selectionMode:i=e.SelectionMode.Full,panOnDrag:a,onSelectionStart:s,onSelectionEnd:l,onPaneClick:c,onPaneContextMenu:u,onPaneScroll:d,onPaneMouseEnter:h,onPaneMouseMove:f,onPaneMouseLeave:g,children:p})=>{const m=n.useRef(null),y=Ao(),v=n.useRef(0),x=n.useRef(0),w=n.useRef(),{userSelectionActive:S,elementsSelectable:E,dragging:C}=Po(ea,b),_=()=>{y.setState({userSelectionActive:!1,userSelectionRect:null}),v.current=0,x.current=0},N=e=>{c?.(e),y.getState().resetSelectedElements(),y.setState({nodesSelectionActive:!1})},M=d?e=>d(e):void 0,k=E&&(o||S);return t.jsxs("div",{className:r(["react-flow__pane",{dragging:C,selection:o}]),onClick:k?void 0:Ji(N,m),onContextMenu:Ji((e=>{Array.isArray(a)&&a?.includes(2)?e.preventDefault():u?.(e)}),m),onWheel:Ji(M,m),onMouseEnter:k?void 0:h,onMouseDown:k?e=>{const{resetSelectedElements:t,domNode:n}=y.getState();if(w.current=n?.getBoundingClientRect(),!E||!o||0!==e.button||e.target!==m.current||!w.current)return;const{x:r,y:i}=Qo(e,w.current);t(),y.setState({userSelectionRect:{width:0,height:0,startX:r,startY:i,x:r,y:i}}),s?.(e)}:void 0,onMouseMove:k?t=>{const{userSelectionRect:n,nodeInternals:r,edges:a,transform:s,onNodesChange:l,onEdgesChange:c,nodeOrigin:u,getNodes:d}=y.getState();if(!o||!w.current||!n)return;y.setState({userSelectionActive:!0,nodesSelectionActive:!1});const h=Qo(t,w.current),f=n.startX??0,g=n.startY??0,p={...n,x:h.x<f?h.x:f,y:h.y<g?h.y:g,width:Math.abs(h.x-f),height:Math.abs(h.y-g)},m=d(),b=jr(r,p,s,i===e.SelectionMode.Partial,!0,u),S=Br(b,a).map((e=>e.id)),E=b.map((e=>e.id));if(v.current!==E.length){v.current=E.length;const e=Qi(m,E);e.length&&l?.(e)}if(x.current!==S.length){x.current=S.length;const e=Qi(a,S);e.length&&c?.(e)}y.setState({userSelectionRect:p})}:f,onMouseUp:k?e=>{if(0!==e.button)return;const{userSelectionRect:t}=y.getState();!S&&t&&e.target===m.current&&N?.(e),y.setState({nodesSelectionActive:v.current>0}),_(),l?.(e)}:void 0,onMouseLeave:k?e=>{S&&(y.setState({nodesSelectionActive:v.current>0}),l?.(e)),_()}:g,ref:m,style:Bi,children:[p,t.jsx(Zi,{})]})}));function na(e,t){if(!e.parentNode)return!1;const n=t.get(e.parentNode);return!!n&&(!!n.selected||na(n,t))}function oa(e,t,n){let o=e;do{if(o?.matches(t))return!0;if(o===n.current)return!1;o=o.parentElement}while(o);return!1}function ra(e,t,n,o){return Array.from(e.values()).filter((n=>(n.selected||n.id===o)&&(!n.parentNode||!na(n,e))&&(n.draggable||t&&void 0===n.draggable))).map((e=>({id:e.id,position:e.position||{x:0,y:0},positionAbsolute:e.positionAbsolute||{x:0,y:0},distance:{x:n.x-(e.positionAbsolute?.x??0),y:n.y-(e.positionAbsolute?.y??0)},delta:{x:0,y:0},extent:e.extent,parentNode:e.parentNode,width:e.width,height:e.height})))}function ia(e,t,n,o,r=[0,0],i){const a=function(e,t){return t&&"parent"!==t?[t[0],[t[1][0]-(e.width||0),t[1][1]-(e.height||0)]]:t}(e,e.extent||o);let s=a;if("parent"===e.extent)if(e.parentNode&&e.width&&e.height){const t=n.get(e.parentNode),{x:o,y:i}=Dr(t,r).positionAbsolute;s=t&&Uo(o)&&Uo(i)&&Uo(t.width)&&Uo(t.height)?[[o+e.width*r[0],i+e.height*r[1]],[o+t.width-e.width+e.width*r[0],i+t.height-e.height+e.height*r[1]]]:s}else i?.("005",So()),s=a;else if(e.extent&&e.parentNode){const t=n.get(e.parentNode),{x:o,y:i}=Dr(t,r).positionAbsolute;s=[[e.extent[0][0]+o,e.extent[0][1]+i],[e.extent[1][0]+o,e.extent[1][1]+i]]}let l={x:0,y:0};if(e.parentNode){const t=n.get(e.parentNode);l=Dr(t,r).positionAbsolute}const c=s&&"parent"!==s?jo(t,s):t;return{position:{x:c.x-l.x,y:c.y-l.y},positionAbsolute:c}}function aa({nodeId:e,dragItems:t,nodeInternals:n}){const o=t.map((e=>({...n.get(e.id),position:e.position,positionAbsolute:e.positionAbsolute})));return[e?o.find((t=>t.id===e)):o[0],o]}ta.displayName="Pane";const sa=(e,t,n,o)=>{const r=t.querySelectorAll(e);if(!r||!r.length)return null;const i=Array.from(r),a=t.getBoundingClientRect(),s=a.width*o[0],l=a.height*o[1];return i.map((e=>{const t=e.getBoundingClientRect();return{id:e.getAttribute("data-handleid"),position:e.getAttribute("data-handlepos"),x:(t.left-a.left-s)/n,y:(t.top-a.top-l)/n,...Do(e)}}))};function la(e,t,n){return void 0===n?n:o=>{const r=t().nodeInternals.get(e);r&&n(o,{...r})}}function ca({id:e,store:t,unselect:n=!1,nodeRef:o}){const{addSelectedNodes:r,unselectNodesAndEdges:i,multiSelectionActive:a,nodeInternals:s,onError:l}=t.getState(),c=s.get(e);c?(t.setState({nodesSelectionActive:!1}),c.selected?(n||c.selected&&a)&&(i({nodes:[c]}),requestAnimationFrame((()=>o?.current?.blur()))):r([e])):l?.("012",Mo(e))}function ua(){const e=Ao(),t=n.useCallback((({sourceEvent:t})=>{const{transform:n,snapGrid:o,snapToGrid:r}=e.getState(),i=t.touches?t.touches[0].clientX:t.clientX,a=t.touches?t.touches[0].clientY:t.clientY,s={x:(i-n[0])/n[2],y:(a-n[1])/n[2]};return{xSnapped:r?o[0]*Math.round(s.x/o[0]):s.x,ySnapped:r?o[1]*Math.round(s.y/o[1]):s.y,...s}}),[]);return t}function da(e){return(t,n,o)=>e?.(t,o)}function ha({nodeRef:e,disabled:t=!1,noDragClassName:o,handleSelector:r,nodeId:i,isSelectable:a,selectNodesOnDrag:s}){const l=Ao(),[c,u]=n.useState(!1),d=n.useRef([]),h=n.useRef({x:null,y:null}),f=n.useRef(0),g=n.useRef(null),p=n.useRef({x:0,y:0}),m=n.useRef(null),y=n.useRef(!1),v=ua();return n.useEffect((()=>{if(e?.current){const n=Ve(e.current),c=({x:e,y:t})=>{const{nodeInternals:n,onNodeDrag:o,onSelectionDrag:r,updateNodePositions:a,nodeExtent:s,snapGrid:c,snapToGrid:f,nodeOrigin:g,onError:p}=l.getState();h.current={x:e,y:t};let y=!1,v={x:0,y:0,x2:0,y2:0};if(d.current.length>1&&s){const e=$r(d.current,g);v=Ho(e)}if(d.current=d.current.map((o=>{const r={x:e-o.distance.x,y:t-o.distance.y};f&&(r.x=c[0]*Math.round(r.x/c[0]),r.y=c[1]*Math.round(r.y/c[1]));const i=[[s[0][0],s[0][1]],[s[1][0],s[1][1]]];d.current.length>1&&s&&!o.extent&&(i[0][0]=o.positionAbsolute.x-v.x+s[0][0],i[1][0]=o.positionAbsolute.x+(o.width??0)-v.x2+s[1][0],i[0][1]=o.positionAbsolute.y-v.y+s[0][1],i[1][1]=o.positionAbsolute.y+(o.height??0)-v.y2+s[1][1]);const a=ia(o,r,n,i,g,p);return y=y||o.position.x!==a.position.x||o.position.y!==a.position.y,o.position=a.position,o.positionAbsolute=a.positionAbsolute,o})),!y)return;a(d.current,!0,!0),u(!0);const x=i?o:da(r);if(x&&m.current){const[e,t]=aa({nodeId:i,dragItems:d.current,nodeInternals:n});x(m.current,e,t)}},x=()=>{if(!g.current)return;const[e,t]=To(p.current,g.current);if(0!==e||0!==t){const{transform:n,panBy:o}=l.getState();h.current.x=(h.current.x??0)-e/n[2],h.current.y=(h.current.y??0)-t/n[2],o({x:e,y:t})&&c(h.current)}f.current=requestAnimationFrame(x)};if(!t){const t=tt().on("start",(t=>{const{nodeInternals:n,multiSelectionActive:o,domNode:r,nodesDraggable:c,unselectNodesAndEdges:u,onNodeDragStart:f,onSelectionDragStart:m}=l.getState(),y=i?f:da(m);s||o||!i||n.get(i)?.selected||u(),i&&a&&s&&ca({id:i,store:l,nodeRef:e});const x=v(t);if(h.current=x,d.current=ra(n,c,x,i),y&&d.current){const[e,o]=aa({nodeId:i,dragItems:d.current,nodeInternals:n});y(t.sourceEvent,e,o)}g.current=r?.getBoundingClientRect()||null,p.current=Qo(t.sourceEvent,g.current)})).on("drag",(e=>{const t=v(e),{autoPanOnNodeDrag:n}=l.getState();!y.current&&n&&(y.current=!0,x()),h.current.x===t.xSnapped&&h.current.y===t.ySnapped||!d.current||(m.current=e.sourceEvent,p.current=Qo(e.sourceEvent,g.current),c(t))})).on("end",(e=>{if(u(!1),y.current=!1,cancelAnimationFrame(f.current),d.current){const{updateNodePositions:t,nodeInternals:n,onNodeDragStop:o,onSelectionDragStop:r}=l.getState(),a=i?o:da(r);if(t(d.current,!1,!1),a){const[t,o]=aa({nodeId:i,dragItems:d.current,nodeInternals:n});a(e.sourceEvent,t,o)}}})).filter((t=>{const n=t.target;return!t.button&&(!o||!oa(n,`.${o}`,e))&&(!r||oa(n,r,e))}));return n.call(t),()=>{n.on(".drag",null)}}n.on(".drag",null)}}),[e,t,o,r,a,l,i,s,v]),c}function fa(){const e=Ao();return n.useCallback((t=>{const{nodeInternals:n,nodeExtent:o,updateNodePositions:r,getNodes:i,snapToGrid:a,snapGrid:s,onError:l,nodesDraggable:c}=e.getState(),u=i().filter((e=>e.selected&&(e.draggable||c&&void 0===e.draggable))),d=a?s[0]:5,h=a?s[1]:5,f=t.isShiftPressed?4:1,g=t.x*d*f,p=t.y*h*f;r(u.map((e=>{if(e.positionAbsolute){const t={x:e.positionAbsolute.x+g,y:e.positionAbsolute.y+p};a&&(t.x=s[0]*Math.round(t.x/s[0]),t.y=s[1]*Math.round(t.y/s[1]));const{positionAbsolute:r,position:i}=ia(e,t,n,o,void 0,l);e.position=i,e.positionAbsolute=r}return e})),!0,!1)}),[])}const ga={ArrowUp:{x:0,y:-1},ArrowDown:{x:0,y:1},ArrowLeft:{x:-1,y:0},ArrowRight:{x:1,y:0}};var pa=e=>{const o=({id:o,type:i,data:a,xPos:s,yPos:l,xPosOrigin:c,yPosOrigin:u,selected:d,onClick:h,onMouseEnter:f,onMouseMove:g,onMouseLeave:p,onContextMenu:m,onDoubleClick:y,style:v,className:x,isDraggable:b,isSelectable:w,isConnectable:S,isFocusable:E,selectNodesOnDrag:C,sourcePosition:_,targetPosition:N,hidden:M,resizeObserver:k,dragHandle:P,zIndex:A,isParent:O,noDragClassName:z,noPanClassName:I,initialized:R,disableKeyboardA11y:D,ariaLabel:$,rfId:j})=>{const B=Ao(),T=n.useRef(null),L=n.useRef(_),V=n.useRef(N),H=n.useRef(i),X=w||b||h||f||g||p,Y=fa(),F=la(o,B.getState,f),Z=la(o,B.getState,g),U=la(o,B.getState,p),W=la(o,B.getState,m),K=la(o,B.getState,y);n.useEffect((()=>{if(T.current&&!M){const e=T.current;return k?.observe(e),()=>k?.unobserve(e)}}),[M]),n.useEffect((()=>{const e=H.current!==i,t=L.current!==_,n=V.current!==N;T.current&&(e||t||n)&&(e&&(H.current=i),t&&(L.current=_),n&&(V.current=N),B.getState().updateNodeDimensions([{id:o,nodeElement:T.current,forceUpdate:!0}]))}),[o,i,_,N]);const q=ha({nodeRef:T,disabled:M||!b,noDragClassName:z,handleSelector:P,nodeId:o,isSelectable:w,selectNodesOnDrag:C});return M?null:t.jsx("div",{className:r(["react-flow__node",`react-flow__node-${i}`,{[I]:b},x,{selected:d,selectable:w,parent:O,dragging:q}]),ref:T,style:{zIndex:A,transform:`translate(${c}px,${u}px)`,pointerEvents:X?"all":"none",visibility:R?"visible":"hidden",...v},"data-id":o,"data-testid":`rf__node-${o}`,onMouseEnter:F,onMouseMove:Z,onMouseLeave:U,onContextMenu:W,onClick:e=>{if(!w||C&&b||ca({id:o,store:B,nodeRef:T}),h){const t=B.getState().nodeInternals.get(o);t&&h(e,{...t})}},onDoubleClick:K,onKeyDown:E?e=>{if(!qo(e))if(Ko.includes(e.key)&&w){const t="Escape"===e.key;ca({id:o,store:B,unselect:t,nodeRef:T})}else!D&&b&&d&&Object.prototype.hasOwnProperty.call(ga,e.key)&&(B.setState({ariaLiveMessage:`Moved selected node ${e.key.replace("Arrow","").toLowerCase()}. New position, x: ${~~s}, y: ${~~l}`}),Y({x:ga[e.key].x,y:ga[e.key].y,isShiftPressed:e.shiftKey}))}:void 0,tabIndex:E?0:void 0,role:E?"button":void 0,"aria-describedby":D?void 0:`${vi}-${j}`,"aria-label":$,children:t.jsx(Nr,{value:o,children:t.jsx(e,{id:o,data:a,type:i,xPos:s,yPos:l,selected:d,isConnectable:S,sourcePosition:_,targetPosition:N,dragging:q,dragHandle:P,zIndex:A})})})};return o.displayName="NodeWrapper",n.memo(o)};const ma=e=>{const t=e.getNodes().filter((e=>e.selected));return{...$r(t,e.nodeOrigin),transformString:`translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]})`,userSelectionActive:e.userSelectionActive}};var ya=n.memo((function({onSelectionContextMenu:e,noPanClassName:o,disableKeyboardA11y:i}){const a=Ao(),{width:s,height:l,x:c,y:u,transformString:d,userSelectionActive:h}=Po(ma,b),f=fa(),g=n.useRef(null);if(n.useEffect((()=>{i||g.current?.focus({preventScroll:!0})}),[i]),ha({nodeRef:g}),h||!s||!l)return null;const p=e?t=>{const n=a.getState().getNodes().filter((e=>e.selected));e(t,n)}:void 0;return t.jsx("div",{className:r(["react-flow__nodesselection","react-flow__container",o]),style:{transform:d},children:t.jsx("div",{ref:g,className:"react-flow__nodesselection-rect",onContextMenu:p,tabIndex:i?void 0:-1,onKeyDown:i?void 0:e=>{Object.prototype.hasOwnProperty.call(ga,e.key)&&f({x:ga[e.key].x,y:ga[e.key].y,isShiftPressed:e.shiftKey})},style:{width:s,height:l,top:u,left:c}})})}));const va=e=>e.nodesSelectionActive,xa=({children:e,onPaneClick:o,onPaneMouseEnter:r,onPaneMouseMove:i,onPaneMouseLeave:a,onPaneContextMenu:s,onPaneScroll:l,deleteKeyCode:c,onMove:u,onMoveStart:d,onMoveEnd:h,selectionKeyCode:f,selectionOnDrag:g,selectionMode:p,onSelectionStart:m,onSelectionEnd:y,multiSelectionKeyCode:v,panActivationKeyCode:x,zoomActivationKeyCode:b,elementsSelectable:w,zoomOnScroll:S,zoomOnPinch:E,panOnScroll:C,panOnScrollSpeed:_,panOnScrollMode:N,zoomOnDoubleClick:M,panOnDrag:k,defaultViewport:P,translateExtent:A,minZoom:O,maxZoom:z,preventScrolling:I,onSelectionContextMenu:R,noWheelClassName:D,noPanClassName:$,disableKeyboardA11y:j})=>{const B=Po(va),T=Ci(f),L=Ci(x)||k,V=T||g&&!0!==L;return(({deleteKeyCode:e,multiSelectionKeyCode:t})=>{const o=Ao(),{deleteElements:r}=ji(),i=Ci(e),a=Ci(t);n.useEffect((()=>{if(i){const{edges:e,getNodes:t}=o.getState(),n=t().filter((e=>e.selected)),i=e.filter((e=>e.selected));r({nodes:n,edges:i}),o.setState({nodesSelectionActive:!1})}}),[i]),n.useEffect((()=>{o.setState({multiSelectionActive:a})}),[a])})({deleteKeyCode:c,multiSelectionKeyCode:v}),t.jsx(Yi,{onMove:u,onMoveStart:d,onMoveEnd:h,onPaneContextMenu:s,elementsSelectable:w,zoomOnScroll:S,zoomOnPinch:E,panOnScroll:C,panOnScrollSpeed:_,panOnScrollMode:N,zoomOnDoubleClick:M,panOnDrag:!T&&L,defaultViewport:P,translateExtent:A,minZoom:O,maxZoom:z,zoomActivationKeyCode:b,preventScrolling:I,noWheelClassName:D,noPanClassName:$,children:t.jsxs(ta,{onSelectionStart:m,onSelectionEnd:y,onPaneClick:o,onPaneMouseEnter:r,onPaneMouseMove:i,onPaneMouseLeave:a,onPaneContextMenu:s,onPaneScroll:l,panOnDrag:L,isSelecting:!!V,selectionMode:p,children:[e,B&&t.jsx(ya,{onSelectionContextMenu:R,noPanClassName:$,disableKeyboardA11y:j})]})})};xa.displayName="FlowRenderer";var ba=n.memo(xa);function wa(e){return{...{input:pa(e.input||ni),default:pa(e.default||ei),output:pa(e.output||ri),group:pa(e.group||ii)},...Object.keys(e).filter((e=>!["input","default","output","group"].includes(e))).reduce(((t,n)=>(t[n]=pa(e[n]||ei),t)),{})}}const Sa=e=>({nodesDraggable:e.nodesDraggable,nodesConnectable:e.nodesConnectable,nodesFocusable:e.nodesFocusable,elementsSelectable:e.elementsSelectable,updateNodeDimensions:e.updateNodeDimensions,onError:e.onError}),Ea=o=>{const{nodesDraggable:r,nodesConnectable:i,nodesFocusable:a,elementsSelectable:s,updateNodeDimensions:l,onError:c}=Po(Sa,b),u=(d=o.onlyRenderVisibleElements,Po(n.useCallback((e=>d?jr(e.nodeInternals,{x:0,y:0,width:e.width,height:e.height},e.transform,!0):e.getNodes()),[d])));var d;const h=n.useRef(),f=n.useMemo((()=>{if("undefined"==typeof ResizeObserver)return null;const e=new ResizeObserver((e=>{const t=e.map((e=>({id:e.target.getAttribute("data-id"),nodeElement:e.target,forceUpdate:!0})));l(t)}));return h.current=e,e}),[]);return n.useEffect((()=>()=>{h?.current?.disconnect()}),[]),t.jsx("div",{className:"react-flow__nodes",style:Bi,children:u.map((n=>{let l=n.type||"default";o.nodeTypes[l]||(c?.("003",bo(l)),l="default");const u=o.nodeTypes[l]||o.nodeTypes.default,d=!!(n.draggable||r&&void 0===n.draggable),h=!!(n.selectable||s&&void 0===n.selectable),g=!!(n.connectable||i&&void 0===n.connectable),p=!!(n.focusable||a&&void 0===n.focusable),m=o.nodeExtent?jo(n.positionAbsolute,o.nodeExtent):n.positionAbsolute,y=m?.x??0,v=m?.y??0,x=(({x:e,y:t,width:n,height:o,origin:r})=>n&&o?r[0]<0||r[1]<0||r[0]>1||r[1]>1?{x:e,y:t}:{x:e-n*r[0],y:t-o*r[1]}:{x:e,y:t})({x:y,y:v,width:n.width??0,height:n.height??0,origin:o.nodeOrigin});return t.jsx(u,{id:n.id,className:n.className,style:n.style,type:l,data:n.data,sourcePosition:n.sourcePosition||e.Position.Bottom,targetPosition:n.targetPosition||e.Position.Top,hidden:n.hidden,xPos:y,yPos:v,xPosOrigin:x.x,yPosOrigin:x.y,selectNodesOnDrag:o.selectNodesOnDrag,onClick:o.onNodeClick,onMouseEnter:o.onNodeMouseEnter,onMouseMove:o.onNodeMouseMove,onMouseLeave:o.onNodeMouseLeave,onContextMenu:o.onNodeContextMenu,onDoubleClick:o.onNodeDoubleClick,selected:!!n.selected,isDraggable:d,isSelectable:h,isConnectable:g,isFocusable:p,resizeObserver:f,dragHandle:n.dragHandle,zIndex:n[Wo]?.z??0,isParent:!!n[Wo]?.isParent,noDragClassName:o.noDragClassName,noPanClassName:o.noPanClassName,initialized:!!n.width&&!!n.height,rfId:o.rfId,disableKeyboardA11y:o.disableKeyboardA11y,ariaLabel:n.ariaLabel},n.id)}))})};Ea.displayName="NodeRenderer";var Ca=n.memo(Ea);const _a=(t,n,o)=>o===e.Position.Left?t-n:o===e.Position.Right?t+n:t,Na=(t,n,o)=>o===e.Position.Top?t-n:o===e.Position.Bottom?t+n:t,Ma="react-flow__edgeupdater",ka=({position:e,centerX:n,centerY:o,radius:i=10,onMouseDown:a,onMouseEnter:s,onMouseOut:l,type:c})=>t.jsx("circle",{onMouseDown:a,onMouseEnter:s,onMouseOut:l,className:r([Ma,`${Ma}-${c}`]),cx:_a(n,i,e),cy:Na(o,i,e),r:i,stroke:"transparent",fill:"transparent"}),Pa=()=>!0;var Aa=e=>{const o=({id:o,className:i,type:a,data:s,onClick:l,onEdgeDoubleClick:c,selected:u,animated:d,label:h,labelStyle:f,labelShowBg:g,labelBgStyle:p,labelBgPadding:m,labelBgBorderRadius:y,style:v,source:x,target:b,sourceX:w,sourceY:S,targetX:E,targetY:C,sourcePosition:_,targetPosition:N,elementsSelectable:M,hidden:k,sourceHandleId:P,targetHandleId:A,onContextMenu:O,onMouseEnter:z,onMouseMove:I,onMouseLeave:R,edgeUpdaterRadius:D,onEdgeUpdate:$,onEdgeUpdateStart:j,onEdgeUpdateEnd:B,markerEnd:T,markerStart:L,rfId:V,ariaLabel:H,isFocusable:X,isUpdatable:Y,pathOptions:F,interactionWidth:Z})=>{const U=n.useRef(null),[W,K]=n.useState(!1),[q,G]=n.useState(!1),Q=Ao(),J=n.useMemo((()=>`url(#${Or(L,V)})`),[L,V]),ee=n.useMemo((()=>`url(#${Or(T,V)})`),[T,V]);if(k)return null;const te=tr(o,Q.getState,c),ne=tr(o,Q.getState,O),oe=tr(o,Q.getState,z),re=tr(o,Q.getState,I),ie=tr(o,Q.getState,R),ae=(e,t)=>{if(0!==e.button)return;const{edges:n,isValidConnection:r}=Q.getState(),i=t?b:x,a=(t?A:P)||null,s=t?"target":"source",l=r||Pa,c=t,u=n.find((e=>e.id===o));G(!0),j?.(e,u,s);Wr({event:e,handleId:a,nodeId:i,onConnect:e=>$?.(u,e),isTarget:c,getState:Q.getState,setState:Q.setState,isValidConnection:l,edgeUpdaterType:s,onEdgeUpdateEnd:e=>{G(!1),B?.(e,u,s)}})},se=()=>K(!0),le=()=>K(!1),ce=!M&&!l;return t.jsxs("g",{className:r(["react-flow__edge",`react-flow__edge-${a}`,i,{selected:u,animated:d,inactive:ce,updating:W}]),onClick:e=>{const{edges:t,addSelectedEdges:n}=Q.getState();if(M&&(Q.setState({nodesSelectionActive:!1}),n([o])),l){const n=t.find((e=>e.id===o));l(e,n)}},onDoubleClick:te,onContextMenu:ne,onMouseEnter:oe,onMouseMove:re,onMouseLeave:ie,onKeyDown:X?e=>{if(Ko.includes(e.key)&&M){const{unselectNodesAndEdges:t,addSelectedEdges:n,edges:r}=Q.getState();"Escape"===e.key?(U.current?.blur(),t({edges:[r.find((e=>e.id===o))]})):n([o])}}:void 0,tabIndex:X?0:void 0,role:X?"button":"img","data-testid":`rf__edge-${o}`,"aria-label":null===H?void 0:H||`Edge from ${x} to ${b}`,"aria-describedby":X?`${xi}-${V}`:void 0,ref:U,children:[!q&&t.jsx(e,{id:o,source:x,target:b,selected:u,animated:d,label:h,labelStyle:f,labelShowBg:g,labelBgStyle:p,labelBgPadding:m,labelBgBorderRadius:y,data:s,style:v,sourceX:w,sourceY:S,targetX:E,targetY:C,sourcePosition:_,targetPosition:N,sourceHandleId:P,targetHandleId:A,markerStart:J,markerEnd:ee,pathOptions:F,interactionWidth:Z}),Y&&t.jsxs(t.Fragment,{children:[("source"===Y||!0===Y)&&t.jsx(ka,{position:_,centerX:w,centerY:S,radius:D,onMouseDown:e=>ae(e,!0),onMouseEnter:se,onMouseOut:le,type:"source"}),("target"===Y||!0===Y)&&t.jsx(ka,{position:N,centerX:E,centerY:C,radius:D,onMouseDown:e=>ae(e,!1),onMouseEnter:se,onMouseOut:le,type:"target"})]})]})};return o.displayName="EdgeWrapper",n.memo(o)};function Oa(e){return{...{default:Aa(e.default||Cr),straight:Aa(e.bezier||br),step:Aa(e.step||vr),smoothstep:Aa(e.step||yr),simplebezier:Aa(e.simplebezier||hr)},...Object.keys(e).filter((e=>!["default","bezier"].includes(e))).reduce(((t,n)=>(t[n]=Aa(e[n]||Cr),t)),{})}}function za(t,n,o=null){const r=(o?.x||0)+n.x,i=(o?.y||0)+n.y,a=o?.width||n.width,s=o?.height||n.height;switch(t){case e.Position.Top:return{x:r+a/2,y:i};case e.Position.Right:return{x:r+a,y:i+s/2};case e.Position.Bottom:return{x:r+a/2,y:i+s};case e.Position.Left:return{x:r,y:i+s/2}}}function Ia(e,t){return e?1!==e.length&&t?t&&e.find((e=>e.id===t))||null:e[0]:null}function Ra(e){const t=e?.[Wo]?.handleBounds||null,n=t&&e?.width&&e?.height&&void 0!==e?.positionAbsolute?.x&&void 0!==e?.positionAbsolute?.y;return[{x:e?.positionAbsolute?.x||0,y:e?.positionAbsolute?.y||0,width:e?.width||0,height:e?.height||0},t,!!n]}const Da=[{level:0,isMaxLevel:!0,edges:[]}];function $a(e,t,o){return function(e,t,n=!1){let o=-1;const r=e.reduce(((e,r)=>{const i=Uo(r.zIndex);let a=i?r.zIndex:0;if(n){const e=t.get(r.target),n=t.get(r.source),o=r.selected||e?.selected||n?.selected,s=Math.max(n?.[Wo]?.z||0,e?.[Wo]?.z||0,1e3);a=(i?r.zIndex:0)+(o?s:0)}return e[a]?e[a].push(r):e[a]=[r],o=a>o?a:o,e}),{}),i=Object.entries(r).map((([e,t])=>{const n=+e;return{edges:t,level:n,isMaxLevel:n===o}}));return 0===i.length?Da:i}(Po(n.useCallback((n=>e?n.edges.filter((e=>{const o=t.get(e.source),r=t.get(e.target);return o?.width&&o?.height&&r?.width&&r?.height&&function({sourcePos:e,targetPos:t,sourceWidth:n,sourceHeight:o,targetWidth:r,targetHeight:i,width:a,height:s,transform:l}){const c={x:Math.min(e.x,t.x),y:Math.min(e.y,t.y),x2:Math.max(e.x+n,t.x+r),y2:Math.max(e.y+o,t.y+i)};c.x===c.x2&&(c.x2+=1),c.y===c.y2&&(c.y2+=1);const u=Ho({x:(0-l[0])/l[2],y:(0-l[1])/l[2],width:a/l[2],height:s/l[2]}),d=Math.max(0,Math.min(u.x2,c.x2)-Math.max(u.x,c.x)),h=Math.max(0,Math.min(u.y2,c.y2)-Math.max(u.y,c.y));return Math.ceil(d*h)>0}({sourcePos:o.positionAbsolute||{x:0,y:0},targetPos:r.positionAbsolute||{x:0,y:0},sourceWidth:o.width,sourceHeight:o.height,targetWidth:r.width,targetHeight:r.height,width:n.width,height:n.height,transform:n.transform})})):n.edges),[e,t])),t,o)}const ja={[e.MarkerType.Arrow]:({color:e="none",strokeWidth:n=1})=>t.jsx("polyline",{stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:n,fill:"none",points:"-5,-4 0,0 -5,4"}),[e.MarkerType.ArrowClosed]:({color:e="none",strokeWidth:n=1})=>t.jsx("polyline",{stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:n,fill:e,points:"-5,-4 0,0 -5,4 -5,-4"})};const Ba=({id:e,type:o,color:r,width:i=12.5,height:a=12.5,markerUnits:s="strokeWidth",strokeWidth:l,orient:c="auto-start-reverse"})=>{const u=function(e){const t=Ao();return n.useMemo((()=>Object.prototype.hasOwnProperty.call(ja,e)?ja[e]:(t.getState().onError?.("009",Eo(e)),null)),[e])}(o);return u?t.jsx("marker",{className:"react-flow__arrowhead",id:e,markerWidth:`${i}`,markerHeight:`${a}`,viewBox:"-10 -10 20 20",markerUnits:s,orient:c,refX:"0",refY:"0",children:t.jsx(u,{color:r,strokeWidth:l})}):null},Ta=({defaultColor:e,rfId:o})=>{const r=Po(n.useCallback((({defaultColor:e,rfId:t})=>n=>{const o=[];return n.edges.reduce(((n,r)=>([r.markerStart,r.markerEnd].forEach((r=>{if(r&&"object"==typeof r){const i=Or(r,t);o.includes(i)||(n.push({id:i,color:r.color||e,...r}),o.push(i))}})),n)),[]).sort(((e,t)=>e.id.localeCompare(t.id)))})({defaultColor:e,rfId:o}),[e,o]),((e,t)=>!(e.length!==t.length||e.some(((e,n)=>e.id!==t[n].id)))));return t.jsx("defs",{children:r.map((e=>t.jsx(Ba,{id:e.id,type:e.type,color:e.color,width:e.width,height:e.height,markerUnits:e.markerUnits,strokeWidth:e.strokeWidth,orient:e.orient},e.id)))})};Ta.displayName="MarkerDefinitions";var La=n.memo(Ta);const Va=e=>({nodesConnectable:e.nodesConnectable,edgesFocusable:e.edgesFocusable,edgesUpdatable:e.edgesUpdatable,elementsSelectable:e.elementsSelectable,width:e.width,height:e.height,connectionMode:e.connectionMode,nodeInternals:e.nodeInternals,onError:e.onError}),Ha=({defaultMarkerColor:n,onlyRenderVisibleElements:o,elevateEdgesOnSelect:i,rfId:a,edgeTypes:s,noPanClassName:l,onEdgeUpdate:c,onEdgeContextMenu:u,onEdgeMouseEnter:d,onEdgeMouseMove:h,onEdgeMouseLeave:f,onEdgeClick:g,edgeUpdaterRadius:p,onEdgeDoubleClick:m,onEdgeUpdateStart:y,onEdgeUpdateEnd:v,children:x})=>{const{edgesFocusable:w,edgesUpdatable:S,elementsSelectable:E,width:C,height:_,connectionMode:N,nodeInternals:M,onError:k}=Po(Va,b),P=$a(o,M,i);return C?t.jsxs(t.Fragment,{children:[P.map((({level:o,edges:i,isMaxLevel:x})=>t.jsxs("svg",{style:{zIndex:o},width:C,height:_,className:"react-flow__edges react-flow__container",children:[x&&t.jsx(La,{defaultColor:n,rfId:a}),t.jsx("g",{children:i.map((n=>{const[o,i,x]=Ra(M.get(n.source)),[b,C,_]=Ra(M.get(n.target));if(!x||!_)return null;let P=n.type||"default";s[P]||(k?.("011",No(P)),P="default");const A=s[P]||s.default,O=N===e.ConnectionMode.Strict?C.target:(C.target??[]).concat(C.source??[]),z=Ia(i.source,n.sourceHandle),I=Ia(O,n.targetHandle),R=z?.position||e.Position.Bottom,D=I?.position||e.Position.Top,$=!!(n.focusable||w&&void 0===n.focusable),j=void 0!==c&&(n.updatable||S&&void 0===n.updatable);if(!z||!I)return k?.("008",Co(z,n)),null;const{sourceX:B,sourceY:T,targetX:L,targetY:V}=((e,t,n,o,r,i)=>{const a=za(n,e,t),s=za(i,o,r);return{sourceX:a.x,sourceY:a.y,targetX:s.x,targetY:s.y}})(o,z,R,b,I,D);return t.jsx(A,{id:n.id,className:r([n.className,l]),type:P,data:n.data,selected:!!n.selected,animated:!!n.animated,hidden:!!n.hidden,label:n.label,labelStyle:n.labelStyle,labelShowBg:n.labelShowBg,labelBgStyle:n.labelBgStyle,labelBgPadding:n.labelBgPadding,labelBgBorderRadius:n.labelBgBorderRadius,style:n.style,source:n.source,target:n.target,sourceHandleId:n.sourceHandle,targetHandleId:n.targetHandle,markerEnd:n.markerEnd,markerStart:n.markerStart,sourceX:B,sourceY:T,targetX:L,targetY:V,sourcePosition:R,targetPosition:D,elementsSelectable:E,onEdgeUpdate:c,onContextMenu:u,onMouseEnter:d,onMouseMove:h,onMouseLeave:f,onClick:g,edgeUpdaterRadius:p,onEdgeDoubleClick:m,onEdgeUpdateStart:y,onEdgeUpdateEnd:v,rfId:a,ariaLabel:n.ariaLabel,isFocusable:$,isUpdatable:j,pathOptions:"pathOptions"in n?n.pathOptions:void 0,interactionWidth:n.interactionWidth},n.id)}))})]},o))),x]}):null};Ha.displayName="EdgeRenderer";var Xa=n.memo(Ha);const Ya=e=>`translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]})`;function Fa({children:e}){const n=Po(Ya);return t.jsx("div",{className:"react-flow__viewport react-flow__container",style:{transform:n},children:e})}const Za={[e.Position.Left]:e.Position.Right,[e.Position.Right]:e.Position.Left,[e.Position.Top]:e.Position.Bottom,[e.Position.Bottom]:e.Position.Top},Ua=({nodeId:o,handleType:r,style:i,type:a=e.ConnectionLineType.Bezier,CustomComponent:s,connectionStatus:l})=>{const{fromNode:c,handleId:u,toX:d,toY:h,connectionMode:f}=Po(n.useCallback((e=>({fromNode:e.nodeInternals.get(o),handleId:e.connectionHandleId,toX:(e.connectionPosition.x-e.transform[0])/e.transform[2],toY:(e.connectionPosition.y-e.transform[1])/e.transform[2],connectionMode:e.connectionMode})),[o]),b),g=c?.[Wo]?.handleBounds;let p=g?.[r];if(f===e.ConnectionMode.Loose&&(p=p||g?.["source"===r?"target":"source"]),!c||!p)return null;const m=u?p.find((e=>e.id===u)):p[0],y=m?m.x+m.width/2:(c.width??0)/2,v=m?m.y+m.height/2:c.height??0,x=(c.positionAbsolute?.x??0)+y,w=(c.positionAbsolute?.y??0)+v,S=m?.position,E=S?Za[S]:null;if(!S||!E)return null;if(s)return t.jsx(s,{connectionLineType:a,connectionLineStyle:i,fromNode:c,fromHandle:m,fromX:x,fromY:w,toX:d,toY:h,fromPosition:S,toPosition:E,connectionStatus:l});let C="";const _={sourceX:x,sourceY:w,sourcePosition:S,targetX:d,targetY:h,targetPosition:E};return a===e.ConnectionLineType.Bezier?[C]=Er(_):a===e.ConnectionLineType.Step?[C]=mr({..._,borderRadius:0}):a===e.ConnectionLineType.SmoothStep?[C]=mr(_):a===e.ConnectionLineType.SimpleBezier?[C]=dr(_):C=`M${x},${w} ${d},${h}`,t.jsx("path",{d:C,fill:"none",className:"react-flow__connection-path",style:i})};Ua.displayName="ConnectionLine";const Wa=e=>({nodeId:e.connectionNodeId,handleType:e.connectionHandleType,nodesConnectable:e.nodesConnectable,connectionStatus:e.connectionStatus,width:e.width,height:e.height});function Ka({containerStyle:e,style:n,type:o,component:i}){const{nodeId:a,handleType:s,nodesConnectable:l,width:c,height:u,connectionStatus:d}=Po(Wa,b);return!!(a&&s&&c&&l)?t.jsx("svg",{style:e,width:c,height:u,className:"react-flow__edges react-flow__connectionline react-flow__container",children:t.jsx("g",{className:r(["react-flow__connection",d]),children:t.jsx(Ua,{nodeId:a,handleType:s,style:n,type:o,CustomComponent:i,connectionStatus:d})})}):null}function qa(e,t){n.useRef(null),Ao();return n.useMemo((()=>t(e)),[e])}const Ga=({nodeTypes:e,edgeTypes:o,onMove:r,onMoveStart:i,onMoveEnd:a,onInit:s,onNodeClick:l,onEdgeClick:c,onNodeDoubleClick:u,onEdgeDoubleClick:d,onNodeMouseEnter:h,onNodeMouseMove:f,onNodeMouseLeave:g,onNodeContextMenu:p,onSelectionContextMenu:m,onSelectionStart:y,onSelectionEnd:v,connectionLineType:x,connectionLineStyle:b,connectionLineComponent:w,connectionLineContainerStyle:S,selectionKeyCode:E,selectionOnDrag:C,selectionMode:_,multiSelectionKeyCode:N,panActivationKeyCode:M,zoomActivationKeyCode:k,deleteKeyCode:P,onlyRenderVisibleElements:A,elementsSelectable:O,selectNodesOnDrag:z,defaultViewport:I,translateExtent:R,minZoom:D,maxZoom:$,preventScrolling:j,defaultMarkerColor:B,zoomOnScroll:T,zoomOnPinch:L,panOnScroll:V,panOnScrollSpeed:H,panOnScrollMode:X,zoomOnDoubleClick:Y,panOnDrag:F,onPaneClick:Z,onPaneMouseEnter:U,onPaneMouseMove:W,onPaneMouseLeave:K,onPaneScroll:q,onPaneContextMenu:G,onEdgeUpdate:Q,onEdgeContextMenu:J,onEdgeMouseEnter:ee,onEdgeMouseMove:te,onEdgeMouseLeave:ne,edgeUpdaterRadius:oe,onEdgeUpdateStart:re,onEdgeUpdateEnd:ie,noDragClassName:ae,noWheelClassName:se,noPanClassName:le,elevateEdgesOnSelect:ce,disableKeyboardA11y:ue,nodeOrigin:de,nodeExtent:he,rfId:fe})=>{const ge=qa(e,wa),pe=qa(o,Oa);return function(e){const t=ji(),o=n.useRef(!1);n.useEffect((()=>{!o.current&&t.viewportInitialized&&e&&(setTimeout((()=>e(t)),1),o.current=!0)}),[e,t.viewportInitialized])}(s),t.jsx(ba,{onPaneClick:Z,onPaneMouseEnter:U,onPaneMouseMove:W,onPaneMouseLeave:K,onPaneContextMenu:G,onPaneScroll:q,deleteKeyCode:P,selectionKeyCode:E,selectionOnDrag:C,selectionMode:_,onSelectionStart:y,onSelectionEnd:v,multiSelectionKeyCode:N,panActivationKeyCode:M,zoomActivationKeyCode:k,elementsSelectable:O,onMove:r,onMoveStart:i,onMoveEnd:a,zoomOnScroll:T,zoomOnPinch:L,zoomOnDoubleClick:Y,panOnScroll:V,panOnScrollSpeed:H,panOnScrollMode:X,panOnDrag:F,defaultViewport:I,translateExtent:R,minZoom:D,maxZoom:$,onSelectionContextMenu:m,preventScrolling:j,noDragClassName:ae,noWheelClassName:se,noPanClassName:le,disableKeyboardA11y:ue,children:t.jsxs(Fa,{children:[t.jsx(Xa,{edgeTypes:pe,onEdgeClick:c,onEdgeDoubleClick:d,onEdgeUpdate:Q,onlyRenderVisibleElements:A,onEdgeContextMenu:J,onEdgeMouseEnter:ee,onEdgeMouseMove:te,onEdgeMouseLeave:ne,onEdgeUpdateStart:re,onEdgeUpdateEnd:ie,edgeUpdaterRadius:oe,defaultMarkerColor:B,noPanClassName:le,elevateEdgesOnSelect:!!ce,disableKeyboardA11y:ue,rfId:fe,children:t.jsx(Ka,{style:b,type:x,component:w,containerStyle:S})}),t.jsx("div",{className:"react-flow__edgelabel-renderer"}),t.jsx(Ca,{nodeTypes:ge,onNodeClick:l,onNodeDoubleClick:u,onNodeMouseEnter:h,onNodeMouseMove:f,onNodeMouseLeave:g,onNodeContextMenu:p,selectNodesOnDrag:z,onlyRenderVisibleElements:A,noPanClassName:le,noDragClassName:ae,disableKeyboardA11y:ue,nodeOrigin:de,nodeExtent:he,rfId:fe})]})})};Ga.displayName="GraphView";var Qa=n.memo(Ga);const Ja=[[Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY],[Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY]],es={rfId:"1",width:0,height:0,transform:[0,0,1],nodeInternals:new Map,edges:[],onNodesChange:null,onEdgesChange:null,hasDefaultNodes:!1,hasDefaultEdges:!1,d3Zoom:null,d3Selection:null,d3ZoomHandler:void 0,minZoom:.5,maxZoom:2,translateExtent:Ja,nodeExtent:Ja,nodesSelectionActive:!1,userSelectionActive:!1,userSelectionRect:null,connectionNodeId:null,connectionHandleId:null,connectionHandleType:"source",connectionPosition:{x:0,y:0},connectionStatus:null,connectionMode:e.ConnectionMode.Strict,domNode:null,paneDragging:!1,noPanClassName:"nopan",nodeOrigin:[0,0],snapGrid:[15,15],snapToGrid:!1,nodesDraggable:!0,nodesConnectable:!0,nodesFocusable:!0,edgesFocusable:!0,edgesUpdatable:!0,elementsSelectable:!0,elevateNodesOnSelect:!0,fitViewOnInit:!1,fitViewOnInitDone:!1,fitViewOnInitOptions:void 0,multiSelectionActive:!1,connectionStartHandle:null,connectionEndHandle:null,connectionClickStartHandle:null,connectOnClick:!0,ariaLiveMessage:"",autoPanOnConnect:!0,autoPanOnNodeDrag:!0,connectionRadius:20,onError:(e,t)=>{},isValidConnection:void 0},ts=()=>{return e=(e,t)=>({...es,setNodes:n=>{const{nodeInternals:o,nodeOrigin:r,elevateNodesOnSelect:i}=t();e({nodeInternals:Pi(n,o,r,i)})},getNodes:()=>Array.from(t().nodeInternals.values()),setEdges:n=>{const{defaultEdgeOptions:o={}}=t();e({edges:n.map((e=>({...o,...e})))})},setDefaultNodesAndEdges:(n,o)=>{const r=void 0!==n,i=void 0!==o,a=r?Pi(n,new Map,t().nodeOrigin,t().elevateNodesOnSelect):new Map;e({nodeInternals:a,edges:i?o:[],hasDefaultNodes:r,hasDefaultEdges:i})},updateNodeDimensions:n=>{const{onNodesChange:o,nodeInternals:r,fitViewOnInit:i,fitViewOnInitDone:a,fitViewOnInitOptions:s,domNode:l,nodeOrigin:c}=t(),u=l?.querySelector(".react-flow__viewport");if(!u)return;const d=window.getComputedStyle(u),{m22:h}=new window.DOMMatrixReadOnly(d.transform),f=n.reduce(((e,t)=>{const n=r.get(t.id);if(n){const o=Do(t.nodeElement);o.width&&o.height&&(n.width!==o.width||n.height!==o.height||t.forceUpdate)&&(r.set(n.id,{...n,[Wo]:{...n[Wo],handleBounds:{source:sa(".source",t.nodeElement,h,c),target:sa(".target",t.nodeElement,h,c)}},...o}),e.push({id:n.id,type:"dimensions",dimensions:o}))}return e}),[]);ki(r,c);const g=a||i&&!a&&Ai(t,{initial:!0,...s});e({nodeInternals:new Map(r),fitViewOnInitDone:g}),f?.length>0&&o?.(f)},updateNodePositions:(e,n=!0,o=!1)=>{const{triggerNodeChanges:r}=t();r(e.map((e=>{const t={id:e.id,type:"position",dragging:o};return n&&(t.positionAbsolute=e.positionAbsolute,t.position=e.position),t})))},triggerNodeChanges:n=>{const{onNodesChange:o,nodeInternals:r,hasDefaultNodes:i,nodeOrigin:a,getNodes:s,elevateNodesOnSelect:l}=t();if(n?.length){if(i){const t=Pi(Ki(n,s()),r,a,l);e({nodeInternals:t})}o?.(n)}},addSelectedNodes:n=>{const{multiSelectionActive:o,edges:r,getNodes:i}=t();let a,s=null;o?a=n.map((e=>Gi(e,!0))):(a=Qi(i(),n),s=Qi(r,[])),Ii({changedNodes:a,changedEdges:s,get:t,set:e})},addSelectedEdges:n=>{const{multiSelectionActive:o,edges:r,getNodes:i}=t();let a,s=null;o?a=n.map((e=>Gi(e,!0))):(a=Qi(r,n),s=Qi(i(),[])),Ii({changedNodes:s,changedEdges:a,get:t,set:e})},unselectNodesAndEdges:({nodes:n,edges:o}={})=>{const{edges:r,getNodes:i}=t(),a=o||r;Ii({changedNodes:(n||i()).map((e=>(e.selected=!1,Gi(e.id,!1)))),changedEdges:a.map((e=>Gi(e.id,!1))),get:t,set:e})},setMinZoom:n=>{const{d3Zoom:o,maxZoom:r}=t();o?.scaleExtent([n,r]),e({minZoom:n})},setMaxZoom:n=>{const{d3Zoom:o,minZoom:r}=t();o?.scaleExtent([r,n]),e({maxZoom:n})},setTranslateExtent:n=>{t().d3Zoom?.translateExtent(n),e({translateExtent:n})},resetSelectedElements:()=>{const{edges:n,getNodes:o}=t();Ii({changedNodes:o().filter((e=>e.selected)).map((e=>Gi(e.id,!1))),changedEdges:n.filter((e=>e.selected)).map((e=>Gi(e.id,!1))),get:t,set:e})},setNodeExtent:n=>{const{nodeInternals:o}=t();o.forEach((e=>{e.positionAbsolute=jo(e.position,n)})),e({nodeExtent:n,nodeInternals:new Map(o)})},panBy:e=>{const{transform:n,width:o,height:r,d3Zoom:i,d3Selection:a,translateExtent:s}=t();if(!i||!a||!e.x&&!e.y)return!1;const l=so.translate(n[0]+e.x,n[1]+e.y).scale(n[2]),c=[[0,0],[o,r]],u=i?.constrain()(l,c,s);return i.transform(a,u),n[0]!==u.x||n[1]!==u.y||n[2]!==u.k},cancelConnection:()=>e({connectionNodeId:es.connectionNodeId,connectionHandleId:es.connectionHandleId,connectionHandleType:es.connectionHandleType,connectionStatus:es.connectionStatus,connectionStartHandle:es.connectionStartHandle,connectionEndHandle:es.connectionEndHandle}),reset:()=>e({...es})}),t=Object.is,e?x(e,t):x;var e,t},ns=({children:e})=>{const o=n.useRef(null);return o.current||(o.current=ts()),t.jsx(xo,{value:o.current,children:e})};ns.displayName="ReactFlowProvider";const os=({children:e})=>n.useContext(vo)?t.jsx(t.Fragment,{children:e}):t.jsx(ns,{children:e});os.displayName="ReactFlowWrapper";const rs={input:ni,default:ei,output:ri,group:ii},is={default:Cr,straight:br,step:vr,smoothstep:yr,simplebezier:hr},as=[0,0],ss=[15,15],ls={x:0,y:0,zoom:1},cs={width:"100%",height:"100%",overflow:"hidden",position:"relative",zIndex:0},us=n.forwardRef((({nodes:n,edges:o,defaultNodes:i,defaultEdges:a,className:s,nodeTypes:l=rs,edgeTypes:c=is,onNodeClick:u,onEdgeClick:d,onInit:h,onMove:f,onMoveStart:g,onMoveEnd:p,onConnect:m,onConnectStart:y,onConnectEnd:v,onClickConnectStart:x,onClickConnectEnd:b,onNodeMouseEnter:w,onNodeMouseMove:S,onNodeMouseLeave:E,onNodeContextMenu:C,onNodeDoubleClick:_,onNodeDragStart:N,onNodeDrag:M,onNodeDragStop:k,onNodesDelete:P,onEdgesDelete:A,onSelectionChange:O,onSelectionDragStart:z,onSelectionDrag:I,onSelectionDragStop:R,onSelectionContextMenu:D,onSelectionStart:$,onSelectionEnd:j,connectionMode:B=e.ConnectionMode.Strict,connectionLineType:T=e.ConnectionLineType.Bezier,connectionLineStyle:L,connectionLineComponent:V,connectionLineContainerStyle:H,deleteKeyCode:X="Backspace",selectionKeyCode:Y="Shift",selectionOnDrag:F=!1,selectionMode:Z=e.SelectionMode.Full,panActivationKeyCode:U="Space",multiSelectionKeyCode:W=(Jo()?"Meta":"Control"),zoomActivationKeyCode:K=(Jo()?"Meta":"Control"),snapToGrid:q=!1,snapGrid:G=ss,onlyRenderVisibleElements:Q=!1,selectNodesOnDrag:J=!0,nodesDraggable:ee,nodesConnectable:te,nodesFocusable:ne,nodeOrigin:oe=as,edgesFocusable:re,edgesUpdatable:ie,elementsSelectable:ae,defaultViewport:se=ls,minZoom:le=.5,maxZoom:ce=2,translateExtent:ue=Ja,preventScrolling:de=!0,nodeExtent:he,defaultMarkerColor:fe="#b1b1b7",zoomOnScroll:ge=!0,zoomOnPinch:pe=!0,panOnScroll:me=!1,panOnScrollSpeed:ye=.5,panOnScrollMode:ve=e.PanOnScrollMode.Free,zoomOnDoubleClick:xe=!0,panOnDrag:be=!0,onPaneClick:we,onPaneMouseEnter:Se,onPaneMouseMove:Ee,onPaneMouseLeave:Ce,onPaneScroll:_e,onPaneContextMenu:Ne,children:Me,onEdgeUpdate:ke,onEdgeContextMenu:Pe,onEdgeDoubleClick:Ae,onEdgeMouseEnter:Oe,onEdgeMouseMove:ze,onEdgeMouseLeave:Ie,onEdgeUpdateStart:Re,onEdgeUpdateEnd:De,edgeUpdaterRadius:$e=10,onNodesChange:je,onEdgesChange:Be,noDragClassName:Te="nodrag",noWheelClassName:Le="nowheel",noPanClassName:Ve="nopan",fitView:He=!1,fitViewOptions:Xe,connectOnClick:Ye=!0,attributionPosition:Fe,proOptions:Ze,defaultEdgeOptions:Ue,elevateNodesOnSelect:We=!0,elevateEdgesOnSelect:Ke=!1,disableKeyboardA11y:qe=!1,autoPanOnConnect:Ge=!0,autoPanOnNodeDrag:Qe=!0,connectionRadius:Je=20,isValidConnection:et,onError:tt,style:nt,id:ot,...rt},it)=>{const at=ot||"1";return t.jsx("div",{...rt,style:{...nt,...cs},ref:it,className:r(["react-flow",s]),"data-testid":"rf__wrapper",id:ot,children:t.jsxs(os,{children:[t.jsx(Qa,{onInit:h,onMove:f,onMoveStart:g,onMoveEnd:p,onNodeClick:u,onEdgeClick:d,onNodeMouseEnter:w,onNodeMouseMove:S,onNodeMouseLeave:E,onNodeContextMenu:C,onNodeDoubleClick:_,nodeTypes:l,edgeTypes:c,connectionLineType:T,connectionLineStyle:L,connectionLineComponent:V,connectionLineContainerStyle:H,selectionKeyCode:Y,selectionOnDrag:F,selectionMode:Z,deleteKeyCode:X,multiSelectionKeyCode:W,panActivationKeyCode:U,zoomActivationKeyCode:K,onlyRenderVisibleElements:Q,selectNodesOnDrag:J,defaultViewport:se,translateExtent:ue,minZoom:le,maxZoom:ce,preventScrolling:de,zoomOnScroll:ge,zoomOnPinch:pe,zoomOnDoubleClick:xe,panOnScroll:me,panOnScrollSpeed:ye,panOnScrollMode:ve,panOnDrag:be,onPaneClick:we,onPaneMouseEnter:Se,onPaneMouseMove:Ee,onPaneMouseLeave:Ce,onPaneScroll:_e,onPaneContextMenu:Ne,onSelectionContextMenu:D,onSelectionStart:$,onSelectionEnd:j,onEdgeUpdate:ke,onEdgeContextMenu:Pe,onEdgeDoubleClick:Ae,onEdgeMouseEnter:Oe,onEdgeMouseMove:ze,onEdgeMouseLeave:Ie,onEdgeUpdateStart:Re,onEdgeUpdateEnd:De,edgeUpdaterRadius:$e,defaultMarkerColor:fe,noDragClassName:Te,noWheelClassName:Le,noPanClassName:Ve,elevateEdgesOnSelect:Ke,rfId:at,disableKeyboardA11y:qe,nodeOrigin:oe,nodeExtent:he}),t.jsx(pi,{nodes:n,edges:o,defaultNodes:i,defaultEdges:a,onConnect:m,onConnectStart:y,onConnectEnd:v,onClickConnectStart:x,onClickConnectEnd:b,nodesDraggable:ee,nodesConnectable:te,nodesFocusable:ne,edgesFocusable:re,edgesUpdatable:ie,elementsSelectable:ae,elevateNodesOnSelect:We,minZoom:le,maxZoom:ce,nodeExtent:he,onNodesChange:je,onEdgesChange:Be,snapToGrid:q,snapGrid:G,connectionMode:B,translateExtent:ue,connectOnClick:Ye,defaultEdgeOptions:Ue,fitView:He,fitViewOptions:Xe,onNodesDelete:P,onEdgesDelete:A,onNodeDragStart:N,onNodeDrag:M,onNodeDragStop:k,onSelectionDrag:I,onSelectionDragStart:z,onSelectionDragStop:R,noPanClassName:Ve,nodeOrigin:oe,rfId:at,autoPanOnConnect:Ge,autoPanOnNodeDrag:Qe,onError:tt,connectionRadius:Je,isValidConnection:et}),t.jsx(di,{onSelectionChange:O}),Me,t.jsx(Io,{proOptions:Ze,position:Fe}),t.jsx(Si,{rfId:at,disableKeyboardA11y:qe})]})})}));us.displayName="ReactFlow";const ds=e=>e.domNode?.querySelector(".react-flow__edgelabel-renderer");const hs=e=>e.getNodes();const fs=e=>e.edges;const gs=e=>({x:e.transform[0],y:e.transform[1],zoom:e.transform[2]});function ps(e){return t=>{const[o,r]=n.useState(t),i=n.useCallback((t=>r((n=>e(t,n)))),[]);return[o,r,i]}}const ms=ps(Ki),ys=ps(qi);const vs={includeHiddenNodes:!1};const xs=({id:e,x:n,y:o,width:i,height:a,style:s,color:l,strokeColor:c,strokeWidth:u,className:d,borderRadius:h,shapeRendering:f,onClick:g,selected:p})=>{const{background:m,backgroundColor:y}=s||{},v=l||m||y;return t.jsx("rect",{className:r(["react-flow__minimap-node",{selected:p},d]),x:n,y:o,rx:h,ry:h,width:i,height:a,fill:v,stroke:c,strokeWidth:u,shapeRendering:f,onClick:g?t=>g(t,e):void 0})};xs.displayName="MiniMapNode";var bs=n.memo(xs);const ws=e=>e.nodeOrigin,Ss=e=>e.getNodes().filter((e=>!e.hidden&&e.width&&e.height)),Es=e=>e instanceof Function?e:()=>e;var Cs=n.memo((function({nodeStrokeColor:e="transparent",nodeColor:n="#e2e2e2",nodeClassName:o="",nodeBorderRadius:r=5,nodeStrokeWidth:i=2,nodeComponent:a=bs,onClick:s}){const l=Po(Ss,b),c=Po(ws),u=Es(n),d=Es(e),h=Es(o),f="undefined"==typeof window||window.chrome?"crispEdges":"geometricPrecision";return t.jsx(t.Fragment,{children:l.map((e=>{const{x:n,y:o}=Dr(e,c).positionAbsolute;return t.jsx(a,{x:n,y:o,width:e.width,height:e.height,style:e.style,selected:e.selected,className:h(e),color:u(e),borderRadius:r,strokeColor:d(e),strokeWidth:i,shapeRendering:f,onClick:s,id:e.id},e.id)}))})}));const _s=e=>{const t=e.getNodes(),n={x:-e.transform[0]/e.transform[2],y:-e.transform[1]/e.transform[2],width:e.width/e.transform[2],height:e.height/e.transform[2]};return{viewBB:n,boundingRect:t.length>0?Fo($r(t,e.nodeOrigin),n):n,rfId:e.rfId}};function Ns({style:e,className:o,nodeStrokeColor:i="transparent",nodeColor:a="#e2e2e2",nodeClassName:s="",nodeBorderRadius:l=5,nodeStrokeWidth:c=2,nodeComponent:u,maskColor:d="rgb(240, 240, 240, 0.6)",maskStrokeColor:h="none",maskStrokeWidth:f=1,position:g="bottom-right",onClick:p,onNodeClick:m,pannable:y=!1,zoomable:v=!1,ariaLabel:x="React Flow mini map",inversePan:w=!1,zoomStep:S=10,offsetScale:E=5}){const C=Ao(),_=n.useRef(null),{boundingRect:N,viewBB:M,rfId:k}=Po(_s,b),P=e?.width??200,A=e?.height??150,O=N.width/P,z=N.height/A,I=Math.max(O,z),R=I*P,D=I*A,$=E*I,j=N.x-(R-N.width)/2-$,B=N.y-(D-N.height)/2-$,T=R+2*$,L=D+2*$,V=`react-flow__minimap-desc-${k}`,H=n.useRef(0);H.current=I,n.useEffect((()=>{if(_.current){const e=Ve(_.current),t=e=>{const{transform:t,d3Selection:n,d3Zoom:o}=C.getState();if("wheel"!==e.sourceEvent.type||!n||!o)return;const r=-e.sourceEvent.deltaY*(1===e.sourceEvent.deltaMode?.05:e.sourceEvent.deltaMode?1:.002)*S,i=t[2]*Math.pow(2,r);o.scaleTo(n,i)},n=e=>{const{transform:t,d3Selection:n,d3Zoom:o,translateExtent:r,width:i,height:a}=C.getState();if("mousemove"!==e.sourceEvent.type||!n||!o)return;const s=H.current*Math.max(1,t[2])*(w?-1:1),l={x:t[0]-e.sourceEvent.movementX*s,y:t[1]-e.sourceEvent.movementY*s},c=[[0,0],[i,a]],u=so.translate(l.x,l.y).scale(t[2]),d=o.constrain()(u,c,r);o.transform(n,d)},o=yo().on("zoom",y?n:null).on("zoom.wheel",v?t:null);return e.call(o),()=>{e.on("zoom",null)}}}),[y,v,w,S]);const X=p?e=>{const t=He(e);p(e,{x:t[0],y:t[1]})}:void 0,Y=m?(e,t)=>{const n=C.getState().nodeInternals.get(t);m(e,n)}:void 0;return t.jsx(zo,{position:g,style:e,className:r(["react-flow__minimap",o]),"data-testid":"rf__minimap",children:t.jsxs("svg",{width:P,height:A,viewBox:`${j} ${B} ${T} ${L}`,role:"img","aria-labelledby":V,ref:_,onClick:X,children:[x&&t.jsx("title",{id:V,children:x}),t.jsx(Cs,{onClick:Y,nodeColor:a,nodeStrokeColor:i,nodeBorderRadius:l,nodeClassName:s,nodeStrokeWidth:c,nodeComponent:u}),t.jsx("path",{className:"react-flow__minimap-mask",d:`M${j-$},${B-$}h${T+2*$}v${L+2*$}h${-T-2*$}z\n        M${M.x},${M.y}h${M.width}v${M.height}h${-M.width}z`,fill:d,fillRule:"evenodd",stroke:h,strokeWidth:f,pointerEvents:"none"})]})})}Ns.displayName="MiniMap";var Ms=n.memo(Ns);function ks(e,t){if(Object.is(e,t))return!0;if("object"!=typeof e||null===e||"object"!=typeof t||null===t)return!1;if(e instanceof Map&&t instanceof Map){if(e.size!==t.size)return!1;for(const[n,o]of e)if(!Object.is(o,t.get(n)))return!1;return!0}if(e instanceof Set&&t instanceof Set){if(e.size!==t.size)return!1;for(const n of e)if(!t.has(n))return!1;return!0}const n=Object.keys(e);if(n.length!==Object.keys(t).length)return!1;for(let o=0;o<n.length;o++)if(!Object.prototype.hasOwnProperty.call(t,n[o])||!Object.is(e[n[o]],t[n[o]]))return!1;return!0}function Ps(){return t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32",children:t.jsx("path",{d:"M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z"})})}function As(){return t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 5",children:t.jsx("path",{d:"M0 0h32v4.2H0z"})})}function Os(){return t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 30",children:t.jsx("path",{d:"M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z"})})}function zs(){return t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 25 32",children:t.jsx("path",{d:"M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z"})})}function Is(){return t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 25 32",children:t.jsx("path",{d:"M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z"})})}const Rs=({children:e,className:n,...o})=>t.jsx("button",{type:"button",className:r(["react-flow__controls-button",n]),...o,children:e});Rs.displayName="ControlButton";const Ds=e=>({isInteractive:e.nodesDraggable||e.nodesConnectable||e.elementsSelectable,minZoomReached:e.transform[2]<=e.minZoom,maxZoomReached:e.transform[2]>=e.maxZoom}),$s=({style:e,showZoom:o=!0,showFitView:i=!0,showInteractive:a=!0,fitViewOptions:s,onZoomIn:l,onZoomOut:c,onFitView:u,onInteractiveChange:d,className:h,children:f,position:g="bottom-left"})=>{const p=Ao(),[m,y]=n.useState(!1),{isInteractive:v,minZoomReached:x,maxZoomReached:b}=Po(Ds,ks),{zoomIn:w,zoomOut:S,fitView:E}=ji();if(n.useEffect((()=>{y(!0)}),[]),!m)return null;return t.jsxs(zo,{className:r(["react-flow__controls",h]),position:g,style:e,"data-testid":"rf__controls",children:[o&&t.jsxs(t.Fragment,{children:[t.jsx(Rs,{onClick:()=>{w(),l?.()},className:"react-flow__controls-zoomin",title:"zoom in","aria-label":"zoom in",disabled:b,children:t.jsx(Ps,{})}),t.jsx(Rs,{onClick:()=>{S(),c?.()},className:"react-flow__controls-zoomout",title:"zoom out","aria-label":"zoom out",disabled:x,children:t.jsx(As,{})})]}),i&&t.jsx(Rs,{className:"react-flow__controls-fitview",onClick:()=>{E(s),u?.()},title:"fit view","aria-label":"fit view",children:t.jsx(Os,{})}),a&&t.jsx(Rs,{className:"react-flow__controls-interactive",onClick:()=>{p.setState({nodesDraggable:!v,nodesConnectable:!v,elementsSelectable:!v}),d?.(!v)},title:"toggle interactivity","aria-label":"toggle interactivity",children:v?t.jsx(Is,{}):t.jsx(zs,{})}),f]})};$s.displayName="Controls";var js,Bs=n.memo($s);function Ts({color:e,dimensions:n,lineWidth:o}){return t.jsx("path",{stroke:e,strokeWidth:o,d:`M${n[0]/2} 0 V${n[1]} M0 ${n[1]/2} H${n[0]}`})}function Ls({color:e,radius:n}){return t.jsx("circle",{cx:n,cy:n,r:n,fill:e})}e.BackgroundVariant=void 0,(js=e.BackgroundVariant||(e.BackgroundVariant={})).Lines="lines",js.Dots="dots",js.Cross="cross";const Vs={[e.BackgroundVariant.Dots]:"#91919a",[e.BackgroundVariant.Lines]:"#eee",[e.BackgroundVariant.Cross]:"#e2e2e2"},Hs={[e.BackgroundVariant.Dots]:1,[e.BackgroundVariant.Lines]:1,[e.BackgroundVariant.Cross]:6},Xs=e=>({transform:e.transform,patternId:`pattern-${e.rfId}`});function Ys({id:o,variant:i=e.BackgroundVariant.Dots,gap:a=20,size:s,lineWidth:l=1,offset:c=2,color:u,style:d,className:h}){const f=n.useRef(null),{transform:g,patternId:p}=Po(Xs,b),m=u||Vs[i],y=s||Hs[i],v=i===e.BackgroundVariant.Dots,x=i===e.BackgroundVariant.Cross,w=Array.isArray(a)?a:[a,a],S=[w[0]*g[2]||1,w[1]*g[2]||1],E=y*g[2],C=x?[E,E]:S,_=v?[E/c,E/c]:[C[0]/c,C[1]/c];return t.jsxs("svg",{className:r(["react-flow__background",h]),style:{...d,position:"absolute",width:"100%",height:"100%",top:0,left:0},ref:f,"data-testid":"rf__background",children:[t.jsx("pattern",{id:p+o,x:g[0]%S[0],y:g[1]%S[1],width:S[0],height:S[1],patternUnits:"userSpaceOnUse",patternTransform:`translate(-${_[0]},-${_[1]})`,children:v?t.jsx(Ls,{color:m,radius:E/c}):t.jsx(Ts,{dimensions:C,color:m,lineWidth:l})}),t.jsx("rect",{x:"0",y:"0",width:"100%",height:"100%",fill:`url(#${p+o})`})]})}Ys.displayName="Background";var Fs=n.memo(Ys);const Zs=e=>e.domNode?.querySelector(".react-flow__renderer");function Us({children:e}){const t=Po(Zs);return t?o.createPortal(e,t):null}const Ws=(e,t)=>e.length===t.length&&e.every(((e,n)=>((e,t)=>e?.positionAbsolute?.x===t?.positionAbsolute?.x&&e?.positionAbsolute?.y===t?.positionAbsolute?.y&&e?.width===t?.width&&e?.height===t?.height&&e?.selected===t?.selected&&e?.[Wo]?.z===t?.[Wo]?.z)(e,t[n]))),Ks=e=>({transform:e.transform,nodeOrigin:e.nodeOrigin,selectedNodesCount:e.getNodes().filter((e=>e.selected)).length});function qs(t,n,o,r,i){let a=.5;"start"===i?a=0:"end"===i&&(a=1);let s=[(t.x+t.width*a)*n[2]+n[0],t.y*n[2]+n[1]-r],l=[-100*a,-100];switch(o){case e.Position.Right:s=[(t.x+t.width)*n[2]+n[0]+r,(t.y+t.height*a)*n[2]+n[1]],l=[0,-100*a];break;case e.Position.Bottom:s[1]=(t.y+t.height)*n[2]+n[1]+r,l[1]=0;break;case e.Position.Left:s=[t.x*n[2]+n[0]-r,(t.y+t.height*a)*n[2]+n[1]],l=[-100,-100*a]}return`translate(${s[0]}px, ${s[1]}px) translate(${l[0]}%, ${l[1]}%)`}var Gs;e.ResizeControlVariant=void 0,(Gs=e.ResizeControlVariant||(e.ResizeControlVariant={})).Line="line",Gs.Handle="handle";const Qs={width:0,height:0,x:0,y:0},Js={...Qs,pointerX:0,pointerY:0,aspectRatio:1};var el=n.memo((function({nodeId:o,position:i,variant:a=e.ResizeControlVariant.Handle,className:s,style:l={},children:c,color:u,minWidth:d=10,minHeight:h=10,maxWidth:f=Number.MAX_VALUE,maxHeight:g=Number.MAX_VALUE,keepAspectRatio:p=!1,shouldResize:m,onResizeStart:y,onResize:v,onResizeEnd:x}){const b=Mr(),w="string"==typeof o?o:b,S=Ao(),E=n.useRef(null),C=n.useRef(Js),_=n.useRef(Qs),N=ua(),M=a===e.ResizeControlVariant.Line?"right":"bottom-right",k=i??M;n.useEffect((()=>{if(!E.current||!w)return;const e=Ve(E.current),t=k.includes("right")||k.includes("left"),n=k.includes("bottom")||k.includes("top"),o=k.includes("left"),r=k.includes("top"),i=tt().on("start",(e=>{const t=S.getState().nodeInternals.get(w),{xSnapped:n,ySnapped:o}=N(e);_.current={width:t?.width??0,height:t?.height??0,x:t?.position.x??0,y:t?.position.y??0},C.current={..._.current,pointerX:n,pointerY:o,aspectRatio:_.current.width/_.current.height},y?.(e,{..._.current})})).on("drag",(e=>{const{nodeInternals:i,triggerNodeChanges:a}=S.getState(),{xSnapped:s,ySnapped:l}=N(e),c=i.get(w);if(c){const i=[],{pointerX:u,pointerY:y,width:x,height:b,x:S,y:E,aspectRatio:N}=C.current,{x:M,y:k,width:P,height:A}=_.current,O=Math.floor(t?s-u:0),z=Math.floor(n?l-y:0);let I=$o(x+(o?-O:O),d,f),R=$o(b+(r?-z:z),h,g);if(p){const e=I/R,o=t&&n;I=e<=N&&o||n&&!t?R*N:I,R=e>N&&o||t&&!n?I/N:R,I>=f?(I=f,R=f/N):I<=d&&(I=d,R=d/N),R>=g?(R=g,I=g*N):R<=h&&(R=h,I=h*N)}const D=I!==P,$=R!==A;if(o||r){const e=o?S-(I-x):S,t=r?E-(R-b):E,n=e!==M&&D,a=t!==k&&$;if(n||a){const o={id:c.id,type:"position",position:{x:n?e:M,y:a?t:k}};i.push(o),_.current.x=o.position.x,_.current.y=o.position.y}}if(D||$){const e={id:w,type:"dimensions",updateStyle:!0,resizing:!0,dimensions:{width:I,height:R}};i.push(e),_.current.width=I,_.current.height=R}if(0===i.length)return;const j=function({width:e,prevWidth:t,height:n,prevHeight:o,invertX:r,invertY:i}){const a=e-t,s=n-o,l=[a>0?1:a<0?-1:0,s>0?1:s<0?-1:0];return a&&r&&(l[0]=-1*l[0]),s&&i&&(l[1]=-1*l[1]),l}({width:_.current.width,prevWidth:P,height:_.current.height,prevHeight:A,invertX:o,invertY:r}),B={..._.current,direction:j},T=m?.(e,B);if(!1===T)return;v?.(e,B),a(i)}})).on("end",(e=>{const t={id:w,type:"dimensions",resizing:!1};x?.(e,{..._.current}),S.getState().triggerNodeChanges([t])}));return e.call(i),()=>{e.on(".drag",null)}}),[w,k,d,h,f,g,p,N,y,v,x]);const P=k.split("-"),A=a===e.ResizeControlVariant.Line?"borderColor":"backgroundColor",O=u?{...l,[A]:u}:l;return t.jsx("div",{className:r(["react-flow__resize-control","nodrag",...P,a,s]),ref:E,style:O,children:c})}));const tl=["top-left","top-right","bottom-left","bottom-right"],nl=["top","right","bottom","left"];e.Background=Fs,e.BaseEdge=er,e.BezierEdge=Cr,e.ControlButton=Rs,e.Controls=Bs,e.EdgeLabelRenderer=function({children:e}){const t=Po(ds);return t?o.createPortal(e,t):null},e.EdgeText=Ro,e.Handle=Qr,e.MiniMap=Ms,e.NodeResizeControl=el,e.NodeResizer=function({nodeId:n,isVisible:o=!0,handleClassName:r,handleStyle:i,lineClassName:a,lineStyle:s,color:l,minWidth:c=10,minHeight:u=10,maxWidth:d=Number.MAX_VALUE,maxHeight:h=Number.MAX_VALUE,keepAspectRatio:f=!1,shouldResize:g,onResizeStart:p,onResize:m,onResizeEnd:y}){return o?t.jsxs(t.Fragment,{children:[nl.map((o=>t.jsx(el,{className:a,style:s,nodeId:n,position:o,variant:e.ResizeControlVariant.Line,color:l,minWidth:c,minHeight:u,maxWidth:d,maxHeight:h,onResizeStart:p,keepAspectRatio:f,shouldResize:g,onResize:m,onResizeEnd:y},o))),tl.map((e=>t.jsx(el,{className:r,style:i,nodeId:n,position:e,color:l,minWidth:c,minHeight:u,maxWidth:d,maxHeight:h,onResizeStart:p,keepAspectRatio:f,shouldResize:g,onResize:m,onResizeEnd:y},e)))]}):null},e.NodeToolbar=function({nodeId:o,children:i,className:a,style:s,isVisible:l,position:c=e.Position.Top,offset:u=10,align:d="center",...h}){const f=Mr(),g=n.useCallback((e=>(Array.isArray(o)?o:[o||f||""]).reduce(((t,n)=>{const o=e.nodeInternals.get(n);return o&&t.push(o),t}),[])),[o,f]),p=Po(g,Ws),{transform:m,nodeOrigin:y,selectedNodesCount:v}=Po(Ks,b);if(!("boolean"==typeof l?l:1===p.length&&p[0].selected&&1===v)||!p.length)return null;const x=$r(p,y),w=Math.max(...p.map((e=>(e[Wo]?.z||1)+1))),S={position:"absolute",transform:qs(x,m,c,u,d),zIndex:w,...s};return t.jsx(Us,{children:t.jsx("div",{style:S,className:r(["react-flow__node-toolbar",a]),...h,children:i})})},e.Panel=zo,e.ReactFlow=us,e.ReactFlowProvider=ns,e.SimpleBezierEdge=hr,e.SmoothStepEdge=yr,e.StepEdge=vr,e.StraightEdge=br,e.addEdge=zr,e.applyEdgeChanges=qi,e.applyNodeChanges=Ki,e.boxToRect=Xo,e.clamp=$o,e.default=us,e.getBezierPath=Er,e.getBoundsOfRects=Fo,e.getConnectedEdges=Br,e.getIncomers=(e,t,n)=>{if(!Pr(e))return[];const o=n.filter((t=>t.target===e.id)).map((e=>e.source));return t.filter((e=>o.includes(e.id)))},e.getMarkerEnd=(e,t)=>void 0!==t&&t?`url(#${t})`:void 0!==e?`url(#react-flow__${e})`:"none",e.getNodePositionWithOrigin=Dr,e.getOutgoers=(e,t,n)=>{if(!Pr(e))return[];const o=n.filter((t=>t.source===e.id)).map((e=>e.target));return t.filter((e=>o.includes(e.id)))},e.getRectOfNodes=$r,e.getSimpleBezierPath=dr,e.getSmoothStepPath=mr,e.getStraightPath=xr,e.getTransformForBounds=Tr,e.internalsSymbol=Wo,e.isEdge=kr,e.isNode=Pr,e.rectToBox=Ho,e.updateEdge=(e,t,n,o={shouldReplaceId:!0})=>{const{id:r,...i}=e;if(!t.source||!t.target)return n;if(!n.find((e=>e.id===r)))return n;const a={...i,id:o.shouldReplaceId?Ar(t):r,source:t.source,target:t.target,sourceHandle:t.sourceHandle,targetHandle:t.targetHandle};return n.filter((e=>e.id!==r)).concat(a)},e.useEdges=function(){return Po(fs,b)},e.useEdgesState=ys,e.useGetPointerPosition=ua,e.useKeyPress=Ci,e.useNodeId=Mr,e.useNodes=function(){return Po(hs,b)},e.useNodesInitialized=function(e=vs){return Po((e=>t=>0!==t.nodeInternals.size&&t.getNodes().filter((t=>!!e.includeHiddenNodes||!t.hidden)).every((e=>void 0!==e[Wo]?.handleBounds)))(e))},e.useNodesState=ms,e.useOnSelectionChange=function({onChange:e}){const t=Ao();n.useEffect((()=>{t.setState({onSelectionChange:e})}),[e])},e.useOnViewportChange=function({onStart:e,onChange:t,onEnd:o}){const r=Ao();n.useEffect((()=>{r.setState({onViewportChangeStart:e})}),[e]),n.useEffect((()=>{r.setState({onViewportChange:t})}),[t]),n.useEffect((()=>{r.setState({onViewportChangeEnd:o})}),[o])},e.useReactFlow=ji,e.useStore=Po,e.useStoreApi=Ao,e.useUpdateNodeInternals=function(){const e=Ao();return n.useCallback((t=>{const{domNode:n,updateNodeDimensions:o}=e.getState(),r=(Array.isArray(t)?t:[t]).reduce(((e,t)=>{const o=n?.querySelector(`.react-flow__node[data-id="${t}"]`);return o&&e.push({id:t,nodeElement:o,forceUpdate:!0}),e}),[]);requestAnimationFrame((()=>o(r)))}),[])},e.useViewport=function(){return Po(gs,b)},Object.defineProperty(e,"__esModule",{value:!0})}));


/***/ }),

/***/ "../../node_modules/reactflow/dist/style.css":
/*!***************************************************!*\
  !*** ../../node_modules/reactflow/dist/style.css ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../style-loader/dist/runtime/styleDomAPI.js */ "../../node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../style-loader/dist/runtime/insertBySelector.js */ "../../node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../style-loader/dist/runtime/insertStyleElement.js */ "../../node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../style-loader/dist/runtime/styleTagTransform.js */ "../../node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../css-loader/dist/cjs.js!./style.css */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/reactflow/dist/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!********************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \********************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**************************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "../../node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js":
/*!**************************************************************************************************!*\
  !*** ../../node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  (function() {

          'use strict';

/* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
if (
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' &&
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart ===
    'function'
) {
  __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
}
          var React = __webpack_require__(/*! react */ "react");

var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

function error(format) {
  {
    {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      printWarning('error', format, args);
    }
  }
}

function printWarning(level, format, args) {
  // When changing this logic, you might want to also
  // update consoleWithStackDev.www.js as well.
  {
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = ReactDebugCurrentFrame.getStackAddendum();

    if (stack !== '') {
      format += '%s';
      args = args.concat([stack]);
    } // eslint-disable-next-line react-internal/safe-string-coercion


    var argsWithFormat = args.map(function (item) {
      return String(item);
    }); // Careful: RN currently depends on this prefix

    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
    // breaks IE9: https://github.com/facebook/react/issues/13610
    // eslint-disable-next-line react-internal/no-production-logging

    Function.prototype.apply.call(console[level], console, argsWithFormat);
  }
}

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y // eslint-disable-line no-self-compare
  ;
}

var objectIs = typeof Object.is === 'function' ? Object.is : is;

// dispatch for CommonJS interop named imports.

var useState = React.useState,
    useEffect = React.useEffect,
    useLayoutEffect = React.useLayoutEffect,
    useDebugValue = React.useDebugValue;
var didWarnOld18Alpha = false;
var didWarnUncachedGetSnapshot = false; // Disclaimer: This shim breaks many of the rules of React, and only works
// because of a very particular set of implementation details and assumptions
// -- change any one of them and it will break. The most important assumption
// is that updates are always synchronous, because concurrent rendering is
// only available in versions of React that also have a built-in
// useSyncExternalStore API. And we only use this shim when the built-in API
// does not exist.
//
// Do not assume that the clever hacks used by this hook also work in general.
// The point of this shim is to replace the need for hacks by other libraries.

function useSyncExternalStore(subscribe, getSnapshot, // Note: The shim does not use getServerSnapshot, because pre-18 versions of
// React do not expose a way to check if we're hydrating. So users of the shim
// will need to track that themselves and return the correct value
// from `getSnapshot`.
getServerSnapshot) {
  {
    if (!didWarnOld18Alpha) {
      if (React.startTransition !== undefined) {
        didWarnOld18Alpha = true;

        error('You are using an outdated, pre-release alpha of React 18 that ' + 'does not support useSyncExternalStore. The ' + 'use-sync-external-store shim will not work correctly. Upgrade ' + 'to a newer pre-release.');
      }
    }
  } // Read the current snapshot from the store on every render. Again, this
  // breaks the rules of React, and only works here because of specific
  // implementation details, most importantly that updates are
  // always synchronous.


  var value = getSnapshot();

  {
    if (!didWarnUncachedGetSnapshot) {
      var cachedValue = getSnapshot();

      if (!objectIs(value, cachedValue)) {
        error('The result of getSnapshot should be cached to avoid an infinite loop');

        didWarnUncachedGetSnapshot = true;
      }
    }
  } // Because updates are synchronous, we don't queue them. Instead we force a
  // re-render whenever the subscribed state changes by updating an some
  // arbitrary useState hook. Then, during render, we call getSnapshot to read
  // the current value.
  //
  // Because we don't actually use the state returned by the useState hook, we
  // can save a bit of memory by storing other stuff in that slot.
  //
  // To implement the early bailout, we need to track some things on a mutable
  // object. Usually, we would put that in a useRef hook, but we can stash it in
  // our useState hook instead.
  //
  // To force a re-render, we call forceUpdate({inst}). That works because the
  // new object always fails an equality check.


  var _useState = useState({
    inst: {
      value: value,
      getSnapshot: getSnapshot
    }
  }),
      inst = _useState[0].inst,
      forceUpdate = _useState[1]; // Track the latest getSnapshot function with a ref. This needs to be updated
  // in the layout phase so we can access it during the tearing check that
  // happens on subscribe.


  useLayoutEffect(function () {
    inst.value = value;
    inst.getSnapshot = getSnapshot; // Whenever getSnapshot or subscribe changes, we need to check in the
    // commit phase if there was an interleaved mutation. In concurrent mode
    // this can happen all the time, but even in synchronous mode, an earlier
    // effect may have mutated the store.

    if (checkIfSnapshotChanged(inst)) {
      // Force a re-render.
      forceUpdate({
        inst: inst
      });
    }
  }, [subscribe, value, getSnapshot]);
  useEffect(function () {
    // Check for changes right before subscribing. Subsequent changes will be
    // detected in the subscription handler.
    if (checkIfSnapshotChanged(inst)) {
      // Force a re-render.
      forceUpdate({
        inst: inst
      });
    }

    var handleStoreChange = function () {
      // TODO: Because there is no cross-renderer API for batching updates, it's
      // up to the consumer of this library to wrap their subscription event
      // with unstable_batchedUpdates. Should we try to detect when this isn't
      // the case and print a warning in development?
      // The store changed. Check if the snapshot changed since the last time we
      // read from the store.
      if (checkIfSnapshotChanged(inst)) {
        // Force a re-render.
        forceUpdate({
          inst: inst
        });
      }
    }; // Subscribe to the store and return a clean-up function.


    return subscribe(handleStoreChange);
  }, [subscribe]);
  useDebugValue(value);
  return value;
}

function checkIfSnapshotChanged(inst) {
  var latestGetSnapshot = inst.getSnapshot;
  var prevValue = inst.value;

  try {
    var nextValue = latestGetSnapshot();
    return !objectIs(prevValue, nextValue);
  } catch (error) {
    return true;
  }
}

function useSyncExternalStore$1(subscribe, getSnapshot, getServerSnapshot) {
  // Note: The shim does not use getServerSnapshot, because pre-18 versions of
  // React do not expose a way to check if we're hydrating. So users of the shim
  // will need to track that themselves and return the correct value
  // from `getSnapshot`.
  return getSnapshot();
}

var canUseDOM = !!(typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined');

var isServerEnvironment = !canUseDOM;

var shim = isServerEnvironment ? useSyncExternalStore$1 : useSyncExternalStore;
var useSyncExternalStore$2 = React.useSyncExternalStore !== undefined ? React.useSyncExternalStore : shim;

exports.useSyncExternalStore = useSyncExternalStore$2;
          /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
if (
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' &&
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop ===
    'function'
) {
  __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
}
        
  })();
}


/***/ }),

/***/ "../../node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js":
/*!****************************************************************************************************************!*\
  !*** ../../node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * use-sync-external-store-shim/with-selector.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  (function() {

          'use strict';

/* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
if (
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' &&
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart ===
    'function'
) {
  __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
}
          var React = __webpack_require__(/*! react */ "react");
var shim = __webpack_require__(/*! use-sync-external-store/shim */ "../../node_modules/use-sync-external-store/shim/index.js");

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y // eslint-disable-line no-self-compare
  ;
}

var objectIs = typeof Object.is === 'function' ? Object.is : is;

var useSyncExternalStore = shim.useSyncExternalStore;

// for CommonJS interop.

var useRef = React.useRef,
    useEffect = React.useEffect,
    useMemo = React.useMemo,
    useDebugValue = React.useDebugValue; // Same as useSyncExternalStore, but supports selector and isEqual arguments.

function useSyncExternalStoreWithSelector(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
  // Use this to track the rendered snapshot.
  var instRef = useRef(null);
  var inst;

  if (instRef.current === null) {
    inst = {
      hasValue: false,
      value: null
    };
    instRef.current = inst;
  } else {
    inst = instRef.current;
  }

  var _useMemo = useMemo(function () {
    // Track the memoized state using closure variables that are local to this
    // memoized instance of a getSnapshot function. Intentionally not using a
    // useRef hook, because that state would be shared across all concurrent
    // copies of the hook/component.
    var hasMemo = false;
    var memoizedSnapshot;
    var memoizedSelection;

    var memoizedSelector = function (nextSnapshot) {
      if (!hasMemo) {
        // The first time the hook is called, there is no memoized result.
        hasMemo = true;
        memoizedSnapshot = nextSnapshot;

        var _nextSelection = selector(nextSnapshot);

        if (isEqual !== undefined) {
          // Even if the selector has changed, the currently rendered selection
          // may be equal to the new selection. We should attempt to reuse the
          // current value if possible, to preserve downstream memoizations.
          if (inst.hasValue) {
            var currentSelection = inst.value;

            if (isEqual(currentSelection, _nextSelection)) {
              memoizedSelection = currentSelection;
              return currentSelection;
            }
          }
        }

        memoizedSelection = _nextSelection;
        return _nextSelection;
      } // We may be able to reuse the previous invocation's result.


      // We may be able to reuse the previous invocation's result.
      var prevSnapshot = memoizedSnapshot;
      var prevSelection = memoizedSelection;

      if (objectIs(prevSnapshot, nextSnapshot)) {
        // The snapshot is the same as last time. Reuse the previous selection.
        return prevSelection;
      } // The snapshot has changed, so we need to compute a new selection.


      // The snapshot has changed, so we need to compute a new selection.
      var nextSelection = selector(nextSnapshot); // If a custom isEqual function is provided, use that to check if the data
      // has changed. If it hasn't, return the previous selection. That signals
      // to React that the selections are conceptually equal, and we can bail
      // out of rendering.

      // If a custom isEqual function is provided, use that to check if the data
      // has changed. If it hasn't, return the previous selection. That signals
      // to React that the selections are conceptually equal, and we can bail
      // out of rendering.
      if (isEqual !== undefined && isEqual(prevSelection, nextSelection)) {
        return prevSelection;
      }

      memoizedSnapshot = nextSnapshot;
      memoizedSelection = nextSelection;
      return nextSelection;
    }; // Assigning this to a constant so that Flow knows it can't change.


    // Assigning this to a constant so that Flow knows it can't change.
    var maybeGetServerSnapshot = getServerSnapshot === undefined ? null : getServerSnapshot;

    var getSnapshotWithSelector = function () {
      return memoizedSelector(getSnapshot());
    };

    var getServerSnapshotWithSelector = maybeGetServerSnapshot === null ? undefined : function () {
      return memoizedSelector(maybeGetServerSnapshot());
    };
    return [getSnapshotWithSelector, getServerSnapshotWithSelector];
  }, [getSnapshot, getServerSnapshot, selector, isEqual]),
      getSelection = _useMemo[0],
      getServerSelection = _useMemo[1];

  var value = useSyncExternalStore(subscribe, getSelection, getServerSelection);
  useEffect(function () {
    inst.hasValue = true;
    inst.value = value;
  }, [value]);
  useDebugValue(value);
  return value;
}

exports.useSyncExternalStoreWithSelector = useSyncExternalStoreWithSelector;
          /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
if (
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' &&
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop ===
    'function'
) {
  __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
}
        
  })();
}


/***/ }),

/***/ "../../node_modules/use-sync-external-store/shim/index.js":
/*!****************************************************************!*\
  !*** ../../node_modules/use-sync-external-store/shim/index.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ../cjs/use-sync-external-store-shim.development.js */ "../../node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js");
}


/***/ }),

/***/ "../../node_modules/use-sync-external-store/shim/with-selector.js":
/*!************************************************************************!*\
  !*** ../../node_modules/use-sync-external-store/shim/with-selector.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ../cjs/use-sync-external-store-shim/with-selector.development.js */ "../../node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js");
}


/***/ }),

/***/ "../../node_modules/zustand/esm/index.js":
/*!***********************************************!*\
  !*** ../../node_modules/zustand/esm/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   create: () => (/* binding */ create),
/* harmony export */   createStore: () => (/* reexport safe */ zustand_vanilla__WEBPACK_IMPORTED_MODULE_0__.createStore),
/* harmony export */   "default": () => (/* binding */ react),
/* harmony export */   useStore: () => (/* binding */ useStore)
/* harmony export */ });
/* harmony import */ var zustand_vanilla__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zustand/vanilla */ "../../node_modules/zustand/esm/vanilla.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var use_sync_external_store_shim_with_selector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! use-sync-external-store/shim/with-selector.js */ "../../node_modules/use-sync-external-store/shim/with-selector.js");





const { useSyncExternalStoreWithSelector } = use_sync_external_store_shim_with_selector_js__WEBPACK_IMPORTED_MODULE_2__;
let didWarnAboutEqualityFn = false;
function useStore(api, selector = api.getState, equalityFn) {
  if ( true && equalityFn && !didWarnAboutEqualityFn) {
    console.warn(
      "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"
    );
    didWarnAboutEqualityFn = true;
  }
  const slice = useSyncExternalStoreWithSelector(
    api.subscribe,
    api.getState,
    api.getServerState || api.getState,
    selector,
    equalityFn
  );
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useDebugValue)(slice);
  return slice;
}
const createImpl = (createState) => {
  if ( true && typeof createState !== "function") {
    console.warn(
      "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`."
    );
  }
  const api = typeof createState === "function" ? (0,zustand_vanilla__WEBPACK_IMPORTED_MODULE_0__.createStore)(createState) : createState;
  const useBoundStore = (selector, equalityFn) => useStore(api, selector, equalityFn);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
const create = (createState) => createState ? createImpl(createState) : createImpl;
var react = (createState) => {
  if (true) {
    console.warn(
      "[DEPRECATED] Default export is deprecated. Instead use `import { create } from 'zustand'`."
    );
  }
  return create(createState);
};




/***/ }),

/***/ "../../node_modules/zustand/esm/shallow.js":
/*!*************************************************!*\
  !*** ../../node_modules/zustand/esm/shallow.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ shallow$1),
/* harmony export */   shallow: () => (/* binding */ shallow)
/* harmony export */ });
function shallow(objA, objB) {
  if (Object.is(objA, objB)) {
    return true;
  }
  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }
  if (objA instanceof Map && objB instanceof Map) {
    if (objA.size !== objB.size)
      return false;
    for (const [key, value] of objA) {
      if (!Object.is(value, objB.get(key))) {
        return false;
      }
    }
    return true;
  }
  if (objA instanceof Set && objB instanceof Set) {
    if (objA.size !== objB.size)
      return false;
    for (const value of objA) {
      if (!objB.has(value)) {
        return false;
      }
    }
    return true;
  }
  const keysA = Object.keys(objA);
  if (keysA.length !== Object.keys(objB).length) {
    return false;
  }
  for (let i = 0; i < keysA.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !Object.is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }
  return true;
}
var shallow$1 = (objA, objB) => {
  if (true) {
    console.warn(
      "[DEPRECATED] Default export is deprecated. Instead use `import { shallow } from 'zustand/shallow'`."
    );
  }
  return shallow(objA, objB);
};




/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "../core/dist/Application.js":
/*!***********************************!*\
  !*** ../core/dist/Application.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Application = void 0;
const ComputerFactory_1 = __webpack_require__(/*! ./ComputerFactory */ "../core/dist/ComputerFactory.js");
const NodeDescriptionFactory_1 = __webpack_require__(/*! ./NodeDescriptionFactory */ "../core/dist/NodeDescriptionFactory.js");
class Application {
    constructor() {
        this.providers = [];
        this.computers = new Map();
        this.hooks = new Map();
    }
    register(provider) {
        this.providers.push(...(Array.isArray(provider) ? provider : [provider]));
    }
    boot() {
        this.providers.forEach(provider => {
            provider.register(this);
            provider.boot(this);
        });
    }
    addComputers(computers) {
        if (computers instanceof Map) {
            this.computers = new Map([...this.computers, ...computers]);
        }
        else {
            const newComputers = new Map(computers.map(config => {
                const computer = new ComputerFactory_1.ComputerFactory().get(config);
                return [computer.name, computer];
            }));
            this.computers = new Map([...this.computers, ...newComputers]);
        }
    }
    addHooks(hooks) {
        this.hooks = new Map([...this.hooks, ...Object.entries(hooks)]);
    }
    descriptions() {
        return Array.from(this.computers.values()).map(computer => {
            return NodeDescriptionFactory_1.NodeDescriptionFactory.fromComputer(computer);
        });
    }
}
exports.Application = Application;


/***/ }),

/***/ "../core/dist/ComputerFactory.js":
/*!***************************************!*\
  !*** ../core/dist/ComputerFactory.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComputerFactory = void 0;
const Param_1 = __webpack_require__(/*! ./Param */ "../core/dist/Param.js");
/**
 * Ensure all inputs/outputs are Port
 */
const portableToPort = (portable) => {
    return typeof portable === 'string'
        ? ({ name: portable, schema: {} })
        : portable;
};
class ComputerFactory {
    constructor(computerConfigs = []) {
        this.computerConfigs = computerConfigs;
    }
    get(config) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return Object.assign(Object.assign({}, structuredClone({
            name: (_a = config.name) !== null && _a !== void 0 ? _a : 'unnamed',
            label: (_c = (_b = config.label) !== null && _b !== void 0 ? _b : config.name) !== null && _c !== void 0 ? _c : 'unlabeled',
            category: config.category,
            inputs: (_e = (_d = config.inputs) === null || _d === void 0 ? void 0 : _d.map(portableToPort)) !== null && _e !== void 0 ? _e : [],
            outputs: (_g = (_f = config.outputs) === null || _f === void 0 ? void 0 : _f.map(portableToPort)) !== null && _g !== void 0 ? _g : [],
            params: Object.assign(Object.assign({}, Param_1.DefaultParams), ((_h = config.params) !== null && _h !== void 0 ? _h : {})),
            tags: (_j = config.tags) !== null && _j !== void 0 ? _j : [],
        })), { 
            // Methods
            run: (_k = config.run) !== null && _k !== void 0 ? _k : (function () { return __asyncGenerator(this, arguments, function* () { }); }), canRun: config.canRun });
    }
}
exports.ComputerFactory = ComputerFactory;


/***/ }),

/***/ "../core/dist/Diagram.js":
/*!*******************************!*\
  !*** ../core/dist/Diagram.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Diagram = void 0;
class Diagram {
    constructor(nodes, links) {
        this.nodes = nodes;
        this.links = links;
        this.viewport = {
            x: 0,
            y: 0,
            zoom: 1
        };
    }
    linksConnectedToPortId(id) {
        return this.links.filter(link => link.sourcePortId === id || link.targetPortId === id);
    }
    nodeWithInputPortId(portId) {
        return this.nodes.find(node => {
            return node.inputs.find(input => input.id === portId);
        });
    }
    nodeWithOutputPortId(portId) {
        return this.nodes.find(node => {
            return node.outputs.find(output => output.id === portId);
        });
    }
    linksAtInput(node, name) {
        const port = node.inputs.find(input => input.name === name);
        return this.linksConnectedToPortId(port.id);
    }
    linksAtOutput(node, name) {
        const port = node.outputs.find(input => input.name === name);
        return this.linksConnectedToPortId(port.id);
    }
    directAncestor(node) {
        const inputLinks = node.inputs.flatMap(input => this.linksConnectedToPortId(input.id));
        const outputPortIds = inputLinks.map(link => link.sourcePortId);
        return outputPortIds.map(portId => this.nodeWithOutputPortId(portId));
    }
    directDescendant(node) {
        const outputLinks = node.outputs.flatMap(output => this.linksConnectedToPortId(output.id));
        const inputPortIds = outputLinks.map(link => link.targetPortId);
        return inputPortIds.map(portId => this.nodeWithInputPortId(portId));
    }
}
exports.Diagram = Diagram;


/***/ }),

/***/ "../core/dist/DiagramBuilder.js":
/*!**************************************!*\
  !*** ../core/dist/DiagramBuilder.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DiagramBuilder = void 0;
const ComputerFactory_1 = __webpack_require__(/*! ./ComputerFactory */ "../core/dist/ComputerFactory.js");
const Diagram_1 = __webpack_require__(/*! ./Diagram */ "../core/dist/Diagram.js");
const PositionGuesser_1 = __webpack_require__(/*! ./PositionGuesser */ "../core/dist/PositionGuesser.js");
class DiagramBuilder {
    constructor() {
        this.previousNode = null;
        this.fromDirective = null;
        this.toDirective = null;
        this.diagram = new Diagram_1.Diagram([], []);
    }
    from(directive) {
        this.fromDirective = directive;
        return this;
    }
    on(directive) {
        return this.from(directive);
    }
    to(directive) {
        this.toDirective = directive;
        return this;
    }
    add(config, params = {}) {
        var _a, _b;
        const computer = new ComputerFactory_1.ComputerFactory().get(config);
        const nodeId = `${computer.name}.${this.getScopedId(computer.name)}`;
        const node = {
            id: nodeId,
            type: computer.name,
            // The inputs have not yet been assigned ids, to it here
            inputs: ((_a = computer.inputs) !== null && _a !== void 0 ? _a : []).map(input => {
                return Object.assign(Object.assign({}, input), { id: `${nodeId}.${input.name}`, name: input.name });
            }),
            // The outputs have not yet been assigned ids, to it here
            outputs: ((_b = computer.outputs) !== null && _b !== void 0 ? _b : []).map(output => {
                return Object.assign(Object.assign({}, output), { id: `${nodeId}.${output.name}`, name: output.name });
            }),
            // default params
            params: computer.params,
        };
        // set explicit params
        for (const [key, value] of Object.entries(params)) {
            node.params[key].value = value;
        }
        node.position = new PositionGuesser_1.PositionGuesser(this.diagram).guess(node);
        this.diagram.nodes.push(node);
        this.link(node);
        this.previousNode = node;
        this.fromDirective = null;
        return this;
    }
    get() {
        return this.diagram;
    }
    getScopedId(computerName) {
        const max = this.diagram.nodes
            .filter(node => node.type === computerName)
            .map(node => node.id)
            .map(id => id.split('.')[1])
            .map(id => parseInt(id))
            .reduce((max, id) => Math.max(max, id), 0);
        return max + 1;
    }
    link(newNode) {
        const originPort = this.getPortToLinkTo();
        const newNodePort = this.toDirective
            ? newNode.inputs.find(input => input.name === this.toDirective)
            : newNode.inputs.at(0);
        if (!originPort || !newNodePort)
            return;
        const link = {
            id: `${originPort.id}--->${newNodePort.id}`,
            sourcePortId: originPort.id,
            targetPortId: newNodePort.id,
        };
        this.diagram.links.push(link);
    }
    getPortToLinkTo() {
        if (!this.previousNode)
            return;
        // 1. Default: First port on the most recent node
        if (!this.fromDirective) {
            return this.previousNode.outputs.at(0);
        }
        // 2. A specified port on the most recent node
        if (
        // Is a port name
        typeof this.fromDirective === 'string'
            // Is not in format "node.port"
            && !this.fromDirective.includes('.')) {
            const port = this.previousNode.outputs.find(output => output.name === this.fromDirective);
            console.log(this.previousNode.outputs);
            if (!port)
                throw new Error(`Bad on directive: ${this.fromDirective}. Port not found on ${this.previousNode.id}`);
            return port;
        }
        // 3. A specified port on a specified node
        if (
        // Is a port name
        typeof this.fromDirective === 'string'
            // Is not in format "node.port"
            && this.fromDirective.includes('.')) {
            const parts = this.fromDirective.split('.');
            // Node counter may be omitted - assume 1
            const [nodeType, nodeId, portName] = parts.length === 3
                ? parts
                : [parts.at(0), 1, parts.at(1)];
            const origin = this.diagram.nodes.find(node => node.id === `${nodeType}.${nodeId}`);
            if (!origin)
                throw new Error(`Bad on directive: ${this.fromDirective}. Could not find origin node`);
            const port = origin === null || origin === void 0 ? void 0 : origin.outputs.find(output => output.name === portName);
            if (!port)
                throw new Error(`Bad on directive: ${this.fromDirective}. Could not find origin port`);
            return port;
        }
        // No port found
        return undefined;
    }
}
exports.DiagramBuilder = DiagramBuilder;


/***/ }),

/***/ "../core/dist/ExecutionMemory.js":
/*!***************************************!*\
  !*** ../core/dist/ExecutionMemory.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExecutionMemory = void 0;
class ExecutionMemory {
    constructor(values = {}) {
        this.history = [];
        this.nodeStatuses = values.nodeStatuses || new Map();
        this.nodeRunners = values.nodeRunners || new Map();
        this.linkItems = values.linkItems || new Map();
        this.linkCounts = values.linkCounts || new Map();
        this.inputDevices = values.inputDevices || new Map();
        this.outputDevices = values.outputDevices || new Map();
        this.hooks = values.hooks || [];
    }
    getNodeStatus(nodeId) {
        return this.nodeStatuses.get(nodeId);
    }
    setNodeStatus(nodeId, status) {
        this.history.push(`Setting node ${nodeId} to ${status}`);
        this.nodeStatuses.set(nodeId, status);
    }
    getNodeStatuses() {
        return this.nodeStatuses;
    }
    getNodeRunner(nodeId) {
        return this.nodeRunners.get(nodeId);
    }
    setNodeRunner(nodeId, status) {
        this.history.push(`Setting node ${nodeId} runner`);
        this.nodeRunners.set(nodeId, status);
    }
    getLinkItems(linkId) {
        return this.linkItems.get(linkId);
    }
    pullLinkItems(linkId, count = Infinity) {
        const linkItems = this.linkItems.get(linkId);
        const pulled = linkItems.splice(0, count);
        this.history.push(`Pulled in ${pulled.length} items from link ${linkId}`);
        return pulled;
    }
    pushLinkItems(linkId, items) {
        const linkItems = this.linkItems.get(linkId);
        linkItems.push(...items);
        this.history.push(`Pushed ${items.length} items to link ${linkId}`);
    }
    setLinkItems(linkId, items) {
        this.history.push(`Setting link ${linkId} items: ${JSON.stringify(items)}`);
        this.linkItems.set(linkId, items);
    }
    getLinkCount(linkId) {
        return this.linkCounts.get(linkId);
    }
    getLinkCounts() {
        return this.linkCounts;
    }
    setLinkCount(linkId, count) {
        this.history.push(`Setting link ${linkId} count to ${count}`);
        this.linkCounts.set(linkId, count);
    }
    getInputDevice(nodeId) {
        return this.inputDevices.get(nodeId);
    }
    setInputDevice(nodeId, device) {
        this.history.push(`Setting node ${nodeId} input device`);
        this.inputDevices.set(nodeId, device);
    }
    getHistory() {
        return this.history;
    }
    pushHistoryMessage(message) {
        this.history.push(message);
    }
    pushHooks(hooks) {
        this.hooks.push(...hooks);
    }
    pullHooks() {
        const pulled = [...this.hooks];
        this.hooks = [];
        return pulled;
    }
}
exports.ExecutionMemory = ExecutionMemory;


/***/ }),

/***/ "../core/dist/Executor.js":
/*!********************************!*\
  !*** ../core/dist/Executor.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Executor = void 0;
const OutputDevice_1 = __webpack_require__(/*! ./OutputDevice */ "../core/dist/OutputDevice.js");
;
const isFinished_1 = __webpack_require__(/*! ./utils/isFinished */ "../core/dist/utils/isFinished.js");
const ExecutionMemory_1 = __webpack_require__(/*! ./ExecutionMemory */ "../core/dist/ExecutionMemory.js");
const InputDevice_1 = __webpack_require__(/*! ./InputDevice */ "../core/dist/InputDevice.js");
const mapToRecord_1 = __webpack_require__(/*! ./utils/mapToRecord */ "../core/dist/utils/mapToRecord.js");
class Executor {
    constructor(diagram, computers, storage) {
        this.diagram = diagram;
        this.computers = computers;
        this.storage = storage;
        this.memory = new ExecutionMemory_1.ExecutionMemory({
            nodeStatuses: new Map(),
            nodeRunners: new Map(),
            linkItems: new Map(),
            linkCounts: new Map(),
            inputDevices: new Map(),
            outputDevices: new Map(),
        });
    }
    boot() {
        // Configure the memory's initial state
        for (const link of this.diagram.links) {
            // Set all links to be empty
            this.memory.setLinkItems(link.id, []);
            this.memory.setLinkCount(link.id, 0);
        }
        for (const node of this.diagram.nodes) {
            // Set all nodes to available
            this.memory.setNodeStatus(node.id, 'AVAILABLE');
            // Register input devices
            // Potentially, if configured, reuse already present input device
            // (e.g. if the node is a sub diagram)
            const inputDevice = this.memory.inputDevices.get(node.id)
                || this.makeInputDevice(node, this.memory);
            // Register output devices
            // Potentially, if configured, reuse already present output device
            // (e.g. if the node is a sub diagram)
            const outputDevice = this.memory.outputDevices.get(node.id)
                || this.makeOutputDevice(node, this.memory);
            this.memory.inputDevices.set(node.id, inputDevice);
            this.memory.outputDevices.set(node.id, outputDevice);
            // Initialize runner generators
            const computer = this.computers.get(node.type);
            this.memory.setNodeRunner(node.id, computer.run({
                input: inputDevice,
                output: outputDevice,
                params: this.makeParamsDevice(computer, node),
                storage: this.storage,
                hooks: {
                    register: (hook) => {
                        this.memory.pushHooks([hook]);
                    }
                },
                executorFactory: (diagram) => {
                    return new Executor(diagram, this.computers, this.storage);
                },
                node,
            }));
        }
    }
    execute() {
        return __asyncGenerator(this, arguments, function* execute_1() {
            this.boot();
            this.memory.pushHistoryMessage('Starting execution 🚀');
            let pendingPromises = [];
            let executionError;
            while (!this.isComplete() && !executionError) {
                // cleanup old promises that are done
                pendingPromises = yield __await(this.clearFinishedPromises(pendingPromises)
                // Start execution of all nodes that can run
                );
                // Start execution of all nodes that can run
                const runnables = this.getRunnableNodes();
                const promises = runnables.map(node => {
                    // Put node in busy state
                    this.memory.setNodeStatus(node.id, 'BUSY');
                    // Run
                    const runner = this.memory.getNodeRunner(node.id);
                    return runner.next()
                        .then((result) => {
                        if (result.done) {
                            this.memory.setNodeStatus(node.id, 'COMPLETE');
                            // TODO: The problem with this implementation:
                            // If a node is done, but its output is not yet consumed,
                            // then yes we can mark node as complete, but we will not be
                            // able to complete decendant nodes depending on it.
                            // Because they probably still have the just outputted items to process.
                            // So, we have to wait until the "cleanup" loop.
                            // This can be solved by having a "consumed" flag on the node ??
                            // Or, upon a "rounds complete event" the input device can notify ??
                            // Or something else...
                            this.diagram.directDescendant(node).forEach(node => {
                                this.attemptToMarkNodeComplete(node);
                            });
                            return;
                        }
                        // Not done, so node is available again!
                        this.memory.setNodeStatus(node.id, 'AVAILABLE');
                    })
                        .catch((error) => {
                        console.log("Registering an execution error");
                        this.memory.pushHistoryMessage(error.message || 'Error in node');
                        executionError = error;
                    });
                });
                // Add this batch of promises to the pending list
                pendingPromises.push(...promises);
                // Attempt cleanup of not runnables (TODO: EXPENSIVE?)
                const notRunnables = this.diagram.nodes.filter(node => !runnables.includes(node));
                for (const notRunnable of notRunnables) {
                    this.attemptToMarkNodeComplete(notRunnable);
                }
                // If no promises, then we might be stuck
                if (pendingPromises.length === 0) {
                    this.memory.pushHistoryMessage('No pending promises.');
                    // Check for nodes we can mark as complete
                    for (const node of this.diagram.nodes) {
                        this.attemptToMarkNodeComplete(node);
                    }
                }
                // await only the first state change since
                // it can open up for more nodes to proceed immediately
                if (pendingPromises.length > 0) {
                    yield __await(Promise.race(pendingPromises));
                    yield yield __await({
                        type: 'ExecutionUpdate',
                        counts: (0, mapToRecord_1.mapToRecord)(this.memory.getLinkCounts()),
                        hooks: this.memory.pullHooks(),
                    });
                }
            }
            if (executionError) {
                console.log("Rethrowing the execution error in an awaitable timeline");
                throw (executionError);
            }
            yield yield __await({
                type: 'ExecutionUpdate',
                counts: (0, mapToRecord_1.mapToRecord)(this.memory.getLinkCounts()),
                hooks: this.memory.pullHooks(),
            });
        });
    }
    isComplete() {
        for (const status of this.memory.getNodeStatuses().values()) {
            if (status !== 'COMPLETE')
                return false;
        }
        return true;
    }
    clearFinishedPromises(promises) {
        return __awaiter(this, void 0, void 0, function* () {
            const passed = [];
            for (const promise of promises) {
                if (yield (0, isFinished_1.isFinished)(promise))
                    continue;
                passed.push(promise);
            }
            return passed;
        });
    }
    getRunnableNodes() {
        return this.diagram.nodes.filter(node => {
            // If the computer implements a custom hook
            const computer = this.computers.get(node.type);
            const hook = computer.canRun;
            if (hook)
                return hook({
                    isAvailable: () => this.memory.getNodeStatus(node.id) === 'AVAILABLE',
                    input: this.memory.getInputDevice(node.id)
                });
            // Decide with some heuristics
            return this.canRunNodeDefault(node);
        });
    }
    // TODO: this should be renamed to SHOULD_RUN_NODE_DEFAULT ?!
    canRunNodeDefault(node) {
        // Get the nodes input device
        const input = this.memory.getInputDevice(node.id);
        // Must be available
        if (this.memory.getNodeStatus(node.id) !== 'AVAILABLE')
            return false;
        // If one input port, it must not be empty
        if (node.inputs.length === 1 && !input.haveItemsAtInput(node.inputs.at(0).name))
            return false;
        // If two or more ports, all items must be awaited
        if (node.inputs.length >= 2 && !input.haveAllItemsAtAllInputs())
            return false;
        // All passed
        return true;
    }
    makeInputDevice(node, memory) {
        return new InputDevice_1.InputDevice(node, this.diagram, memory, this.makeParamsDevice(this.computers.get(node.type), node));
    }
    makeOutputDevice(node, memory) {
        let map = {};
        for (const output of node.outputs) {
            const connectedLinks = this.diagram.linksConnectedToPortId(output.id);
            map[output.name] = connectedLinks.map(link => link.id);
        }
        return new OutputDevice_1.OutputDevice(map, memory);
    }
    makeParamsDevice(computer, node) {
        const device = {};
        for (const param of Object.values(node.params)) {
            device[param.name] = param.value;
        }
        return device;
    }
    /**
     * Marks nodes as complete if some default heuristics are met.
     */
    attemptToMarkNodeComplete(node) {
        // Node must not be busy
        if (this.memory.getNodeStatus(node.id) === 'BUSY')
            return;
        // Node must have no awaiting items at links
        const input = this.memory.getInputDevice(node.id);
        if (input.haveItemsAtAnyInput())
            return;
        // Node must have no incomplete ancestors
        const ancestors = this.diagram.directAncestor(node);
        for (const ancestor of ancestors) {
            if (this.memory.getNodeStatus(ancestor.id) !== 'COMPLETE')
                return;
        }
        // Passed all checks, so mark as complete
        this.memory.setNodeStatus(node.id, 'COMPLETE');
    }
}
exports.Executor = Executor;


/***/ }),

/***/ "../core/dist/InputDevice.js":
/*!***********************************!*\
  !*** ../core/dist/InputDevice.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InputDevice = void 0;
const ItemWithParams_1 = __webpack_require__(/*! ./ItemWithParams */ "../core/dist/ItemWithParams.js");
class InputDevice {
    constructor(
    // The node that is using this input device
    node, 
    // The node topology
    diagram, 
    // The current execution state
    memory, 
    // The params passed in the node
    params) {
        this.node = node;
        this.diagram = diagram;
        this.memory = memory;
        this.params = params;
    }
    /**
     * Shorthand to pull items at 'input'
     */
    pull(count) {
        return this.pullFrom('input', count);
    }
    /**
     * Removes and return items at edges connected to input with name
     */
    pullFrom(name, count = Infinity) {
        let remaining = count;
        const pulled = [];
        const links = this.diagram.linksAtInput(this.node, name);
        for (const link of links) {
            const batch = this.memory.pullLinkItems(link.id, remaining);
            pulled.push(...batch);
            remaining -= batch.length;
            if (remaining === 0)
                break;
        }
        // Enhance ItemValue to ItemWithParams
        return pulled.map(item => new ItemWithParams_1.ItemWithParams(item, this.params));
    }
    havePort(name) {
        return this.node.inputs.some(input => input.name === name);
    }
    haveItemsAtInput(name) {
        const port = this.node.inputs.find(input => input.name === name);
        const links = this.diagram.linksConnectedToPortId(port.id);
        for (const link of links) {
            if (this.memory.getLinkItems(link.id).length > 0)
                return true;
        }
        return false;
    }
    haveAllItemsAtInput(name) {
        const port = this.node.inputs.find(input => input.name === name);
        const links = this.diagram.linksConnectedToPortId(port.id);
        for (const link of links) {
            const sourcePort = link.sourcePortId;
            const sourceNode = this.diagram.nodeWithOutputPortId(sourcePort);
            const sourceStatus = this.memory.getNodeStatus(sourceNode.id);
            if (sourceStatus !== 'COMPLETE')
                return false;
        }
        return true;
    }
    haveAllItemsAtAllInputs() {
        for (const input of this.node.inputs) {
            if (!this.haveAllItemsAtInput(input.name))
                return false;
        }
        return true;
    }
    haveItemsAtAnyInput() {
        for (const input of this.node.inputs) {
            if (this.haveItemsAtInput(input.name))
                return true;
        }
        return false;
    }
    /**
     * @visibleForTesting
     */
    setItemsAt(linkId, items) {
        this.memory.setLinkItems(linkId, items);
    }
}
exports.InputDevice = InputDevice;


/***/ }),

/***/ "../core/dist/ItemWithParams.js":
/*!**************************************!*\
  !*** ../core/dist/ItemWithParams.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemWithParams = exports.isItemWithParams = void 0;
const evalMath_1 = __webpack_require__(/*! ./utils/evalMath */ "../core/dist/utils/evalMath.js");
const isItemWithParams = (item) => {
    // This does not always catch all cases
    if (item instanceof ItemWithParams)
        return true;
    if (item !== null
        && typeof item === 'object'
        && 'type' in item && item.type === 'ItemWithParams'
        && 'value' in item
        && 'params' in item)
        return true;
    // const isLikelyItemWithParams = typeof i === 'object' && 'value' in i && 'params' in i
    return false;
};
exports.isItemWithParams = isItemWithParams;
class ItemWithParams {
    constructor(value, params) {
        this.type = 'ItemWithParams';
        this.value = value;
        this.params = new Proxy({}, {
            get: (_, prop) => {
                const paramValue = params[prop];
                // We can only use params that exist
                if (!paramValue)
                    return undefined;
                // We can only interpolate strings params
                if (typeof paramValue !== 'string')
                    return paramValue;
                // We can only use object properties when interpolating
                if (typeof this.value !== 'object')
                    return paramValue;
                /** Replace template strings with item properties
                * Example: { greeting: "Hi ${name}!"}
                * Becomes: { greeting: "Hi Bob!"}
                * When the item value is { name: "Bob" }
                */
                let value = paramValue.replace(/\${(\w+)}/g, (_, name) => {
                    return this.value[name];
                });
                /** Replaces function calls */
                value = value.replace(/@(\w+)\((.*)\)/g, (_, fn, expression) => {
                    if (fn === 'evalMath')
                        return String((0, evalMath_1.evalMath)(expression));
                    // If we don't know the function, just return the expression
                    return expression;
                });
                return value;
            }
        });
    }
}
exports.ItemWithParams = ItemWithParams;
const i1 = { i: 1 };


/***/ }),

/***/ "../core/dist/LinkGuesser.js":
/*!***********************************!*\
  !*** ../core/dist/LinkGuesser.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LinkGuesser = void 0;
class LinkGuesser {
    constructor(diagram) {
        this.diagram = diagram;
    }
    guess(node) {
        const previousNode = this.diagram.nodes.at(-1);
        if (!previousNode)
            return null;
        const firstOutput = previousNode.outputs.at(0);
        if (!firstOutput)
            return null;
        const firstInput = node.inputs.at(0);
        if (!firstInput)
            return null;
        return {
            id: `${firstOutput.id}--->${firstInput.id}`,
            sourcePortId: firstOutput.id,
            targetPortId: firstInput.id,
        };
    }
}
exports.LinkGuesser = LinkGuesser;


/***/ }),

/***/ "../core/dist/NodeDescriptionFactory.js":
/*!**********************************************!*\
  !*** ../core/dist/NodeDescriptionFactory.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NodeDescriptionFactory = void 0;
exports.NodeDescriptionFactory = {
    fromComputer: (computer) => {
        return {
            name: computer.name,
            label: computer.label,
            category: computer.category,
            inputs: computer.inputs,
            outputs: computer.outputs,
            params: computer.params,
            tags: computer.tags,
        };
    },
};


/***/ }),

/***/ "../core/dist/NullStorage.js":
/*!***********************************!*\
  !*** ../core/dist/NullStorage.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NullStorage = void 0;
class NullStorage {
    constructor() {
        this.currentExecutionId = '1';
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    createExecution() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    putExecutionItems(key, items) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.NullStorage = NullStorage;


/***/ }),

/***/ "../core/dist/OutputDevice.js":
/*!************************************!*\
  !*** ../core/dist/OutputDevice.js ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OutputDevice = void 0;
const ItemWithParams_1 = __webpack_require__(/*! ./ItemWithParams */ "../core/dist/ItemWithParams.js");
class OutputDevice {
    constructor(portLinkMap = {}, memory) {
        this.portLinkMap = portLinkMap;
        this.memory = memory;
    }
    push(items) {
        return this.pushTo('output', items);
    }
    pushTo(name, itemable) {
        const connectedLinks = this.portLinkMap[name];
        // When outputting we should not be in a params infused ItemWithParams
        const items = itemable.map(i => (0, ItemWithParams_1.isItemWithParams)(i) ? i.value : i);
        for (const linkId of connectedLinks) {
            // Update items on link
            this.memory.pushLinkItems(linkId, items);
            // Update link counts
            const count = this.memory.getLinkCount(linkId);
            this.memory.setLinkCount(linkId, count + items.length);
        }
    }
    /**
     *
     * (Test) Utility to get items have been outputted through a port
     */
    itemsOutputtedThrough(name) {
        var _a;
        const [connectedLink] = this.portLinkMap[name];
        return (_a = this.memory.getLinkItems(connectedLink)) !== null && _a !== void 0 ? _a : [];
    }
}
exports.OutputDevice = OutputDevice;


/***/ }),

/***/ "../core/dist/Param.js":
/*!*****************************!*\
  !*** ../core/dist/Param.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DefaultParams = exports.label = exports.name = void 0;
exports.name = {
    id: 'name',
    name: 'name',
    type: 'string',
    value: '',
    rows: 1,
};
exports.label = {
    id: 'label',
    name: 'label',
    type: 'string',
    value: '',
    rows: 1,
};
exports.DefaultParams = { name: exports.name, label: exports.label };


/***/ }),

/***/ "../core/dist/ParamBuilder.js":
/*!************************************!*\
  !*** ../core/dist/ParamBuilder.js ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ParamBuilder = exports.text = exports.select = exports.json = exports.number = exports.string = void 0;
const string = (name) => new ParamBuilder({ name, type: 'string' });
exports.string = string;
const number = (name) => new ParamBuilder({ name, type: 'number' });
exports.number = number;
const json = (name) => new ParamBuilder({ name, type: 'json' });
exports.json = json;
const select = (name) => new ParamBuilder({ name, type: 'select' });
exports.select = select;
const text = (name) => new ParamBuilder({ name, type: 'text' });
exports.text = text;
class ParamBuilder {
    constructor(options) {
        this.defaultRows = 1;
        this.paramValue = undefined;
        this.name = options.name;
        this.type = options.type;
        this.defaultRows = options.rows || (options.type === 'json' ? 12 : 1);
    }
    value(value) {
        this.paramValue = value;
        return this;
    }
    schemaFromPort(portName) {
        this.inputSchemaFromPort = portName;
        return this;
    }
    options(options) {
        this.selectOptions = options;
        return this;
    }
    rows(rows) {
        this.defaultRows = rows;
        return this;
    }
    get() {
        return {
            id: this.name,
            name: this.name,
            type: this.type,
            value: this.paramValue,
            rows: this.defaultRows,
            selectOptions: this.selectOptions,
            inputSchemaFromPort: this.inputSchemaFromPort
        };
    }
}
exports.ParamBuilder = ParamBuilder;


/***/ }),

/***/ "../core/dist/PositionGuesser.js":
/*!***************************************!*\
  !*** ../core/dist/PositionGuesser.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PositionGuesser = void 0;
class PositionGuesser {
    constructor(diagram) {
        this.diagram = diagram;
    }
    guess(node) {
        var _a, _b;
        // Defines starting position for new nodes
        const startX = 75;
        const startY = 50;
        // Spacing between nodes
        const spaceX = 200;
        const spaceY = 200;
        // Get the max X and Y positions of existing nodes
        const maxX = this.diagram.nodes.map((node) => node.position.x).reduce((max, x) => Math.max(max, x), 0);
        const maxY = this.diagram.nodes.map((node) => node.position.y).reduce((max, y) => Math.max(max, y), 0);
        const isStarterNode = node.inputs.length === 0;
        if (isStarterNode) {
            return { x: startX, y: maxY === 0 ? startY : maxY + spaceY };
        }
        const mostRecentNode = this.diagram.nodes.at(-1);
        const baseX = (_a = mostRecentNode === null || mostRecentNode === void 0 ? void 0 : mostRecentNode.position.x) !== null && _a !== void 0 ? _a : maxX;
        return { x: baseX + spaceX, y: (_b = mostRecentNode === null || mostRecentNode === void 0 ? void 0 : mostRecentNode.position.y) !== null && _b !== void 0 ? _b : startY + spaceY };
    }
}
exports.PositionGuesser = PositionGuesser;


/***/ }),

/***/ "../core/dist/computers/ConsoleLog/ConsoleLog.js":
/*!*******************************************************!*\
  !*** ../core/dist/computers/ConsoleLog/ConsoleLog.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConsoleLog = void 0;
const ParamBuilder_1 = __webpack_require__(/*! ../../ParamBuilder */ "../core/dist/ParamBuilder.js");
exports.ConsoleLog = {
    name: 'ConsoleLog',
    label: 'Console.log',
    inputs: ['input'],
    params: {
        message: (0, ParamBuilder_1.string)('message').value(undefined).get(),
    },
    run({ input, hooks, params: rawParams }) {
        return __asyncGenerator(this, arguments, function* run_1() {
            while (true) {
                const incoming = input.pull();
                for (const item of incoming) {
                    hooks.register({
                        type: 'CONSOLE_LOG',
                        args: [
                            // If nothing passed log the whole item 
                            rawParams.message === undefined
                                ? item.value
                                : item.params.message
                        ]
                    });
                }
                yield yield __await(void 0);
            }
        });
    },
};


/***/ }),

/***/ "../core/dist/computers/ConsoleLog/index.js":
/*!**************************************************!*\
  !*** ../core/dist/computers/ConsoleLog/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConsoleLog = void 0;
var ConsoleLog_1 = __webpack_require__(/*! ./ConsoleLog */ "../core/dist/computers/ConsoleLog/ConsoleLog.js");
Object.defineProperty(exports, "ConsoleLog", ({ enumerable: true, get: function () { return ConsoleLog_1.ConsoleLog; } }));


/***/ }),

/***/ "../core/dist/computers/Merge/Merge.js":
/*!*********************************************!*\
  !*** ../core/dist/computers/Merge/Merge.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Merge = void 0;
const ParamBuilder_1 = __webpack_require__(/*! ../../ParamBuilder */ "../core/dist/ParamBuilder.js");
exports.Merge = {
    name: 'Merge',
    inputs: ['requestors', 'suppliers'],
    outputs: [
        'merged',
        'not_merged',
    ],
    params: {
        requestor_merge_property: (0, ParamBuilder_1.string)('requestor_merge_property')
            .schemaFromPort('requestors')
            .get(),
        supplier_merge_property: (0, ParamBuilder_1.string)('supplier_merge_property')
            .schemaFromPort('suppliers')
            .get(),
    },
    canRun({ isAvailable, input }) {
        return [
            isAvailable(),
            input.haveItemsAtInput('requestors'),
            input.haveAllItemsAtInput('suppliers')
        ].every(Boolean);
    },
    run({ input, output, params }) {
        return __asyncGenerator(this, arguments, function* run_1() {
            // The suppliers are potentially referenced multiple times,
            // therefore we keep them outside the loop
            const suppliers = input.pullFrom('suppliers').map(i => i.value);
            while (true) {
                const requestors = input.pullFrom('requestors').map(i => i.value);
                for (const requestor of requestors) {
                    const requestorKey = params.requestor_merge_property;
                    const requestorValue = requestor[requestorKey];
                    const supplierKey = params.supplier_merge_property;
                    const supplierMatch = suppliers.find(supplier => {
                        return supplier[supplierKey] === requestorValue;
                    });
                    if (supplierMatch) {
                        const merged = Object.assign(Object.assign({}, requestor), supplierMatch);
                        output.pushTo('merged', [merged]);
                    }
                    else {
                        output.pushTo('not_merged', [requestor]);
                    }
                }
                yield yield __await(void 0);
            }
        });
    },
};


/***/ }),

/***/ "../core/dist/computers/Merge/index.js":
/*!*********************************************!*\
  !*** ../core/dist/computers/Merge/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Merge = void 0;
var Merge_1 = __webpack_require__(/*! ./Merge */ "../core/dist/computers/Merge/Merge.js");
Object.defineProperty(exports, "Merge", ({ enumerable: true, get: function () { return Merge_1.Merge; } }));


/***/ }),

/***/ "../core/dist/computers/Pass/Pass.js":
/*!*******************************************!*\
  !*** ../core/dist/computers/Pass/Pass.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Pass = void 0;
exports.Pass = {
    name: 'Pass',
    inputs: ['input'],
    outputs: ['output'],
    run({ input, output }) {
        return __asyncGenerator(this, arguments, function* run_1() {
            while (true) {
                const incoming = input.pull();
                output.push(incoming);
                yield yield __await(void 0);
            }
        });
    },
};


/***/ }),

/***/ "../core/dist/computers/Pass/index.js":
/*!********************************************!*\
  !*** ../core/dist/computers/Pass/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Pass = void 0;
var Pass_1 = __webpack_require__(/*! ./Pass */ "../core/dist/computers/Pass/Pass.js");
Object.defineProperty(exports, "Pass", ({ enumerable: true, get: function () { return Pass_1.Pass; } }));


/***/ }),

/***/ "../core/dist/computers/Sample/Sample.js":
/*!***********************************************!*\
  !*** ../core/dist/computers/Sample/Sample.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Sample = void 0;
const ParamBuilder_1 = __webpack_require__(/*! ../../ParamBuilder */ "../core/dist/ParamBuilder.js");
exports.Sample = {
    name: 'Sample',
    inputs: ['input'],
    outputs: ['sampled', 'not_sampled'],
    params: {
        sample_rate: (0, ParamBuilder_1.number)('sample_rate').value(2).get(),
    },
    run({ input, output, params: { sample_rate } }) {
        return __asyncGenerator(this, arguments, function* run_1() {
            let i = 0;
            while (true) {
                const [item] = input.pull(1);
                const port = i++ % sample_rate === 0
                    ? 'sampled'
                    : 'not_sampled';
                output.pushTo(port, [item]);
                yield yield __await(void 0);
            }
        });
    },
};


/***/ }),

/***/ "../core/dist/computers/Sample/index.js":
/*!**********************************************!*\
  !*** ../core/dist/computers/Sample/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Sample = void 0;
var Sample_1 = __webpack_require__(/*! ./Sample */ "../core/dist/computers/Sample/Sample.js");
Object.defineProperty(exports, "Sample", ({ enumerable: true, get: function () { return Sample_1.Sample; } }));


/***/ }),

/***/ "../core/dist/computers/Signal/Signal.js":
/*!***********************************************!*\
  !*** ../core/dist/computers/Signal/Signal.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Signal = void 0;
const ParamBuilder_1 = __webpack_require__(/*! ../../ParamBuilder */ "../core/dist/ParamBuilder.js");
const sleep_1 = __webpack_require__(/*! ../../utils/sleep */ "../core/dist/utils/sleep.js");
exports.Signal = {
    name: 'Signal',
    inputs: [],
    outputs: [{
            name: 'output',
            schema: {
                id: 'any',
            }
        }],
    params: {
        period: (0, ParamBuilder_1.number)('period').value(50).get(),
        count: (0, ParamBuilder_1.number)('count').value(300).get(),
    },
    run({ output, params: { period, count } }) {
        return __asyncGenerator(this, arguments, function* run_1() {
            let i = 1;
            while (i <= count) {
                yield __await((0, sleep_1.sleep)(period));
                output.push([{
                        id: i++
                    }]);
                yield yield __await(void 0);
            }
        });
    },
};


/***/ }),

/***/ "../core/dist/computers/Signal/index.js":
/*!**********************************************!*\
  !*** ../core/dist/computers/Signal/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Signal = void 0;
var Signal_1 = __webpack_require__(/*! ./Signal */ "../core/dist/computers/Signal/Signal.js");
Object.defineProperty(exports, "Signal", ({ enumerable: true, get: function () { return Signal_1.Signal; } }));


/***/ }),

/***/ "../core/dist/computers/Updates/Updates.js":
/*!*************************************************!*\
  !*** ../core/dist/computers/Updates/Updates.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Updates = void 0;
const ParamBuilder_1 = __webpack_require__(/*! ../../ParamBuilder */ "../core/dist/ParamBuilder.js");
exports.Updates = {
    name: 'Updates',
    label: 'Updates',
    inputs: ['input'],
    params: {
        json: (0, ParamBuilder_1.string)('json').value('').get(),
    },
    run({ input, hooks, params: rawParams }) {
        return __asyncGenerator(this, arguments, function* run_1() {
            while (true) {
                const incoming = input.pull();
                for (const item of incoming) {
                    hooks.register({
                        type: 'UPDATES',
                        args: [item.params.json]
                    });
                }
                yield yield __await(void 0);
            }
        });
    },
};


/***/ }),

/***/ "../core/dist/computers/Updates/index.js":
/*!***********************************************!*\
  !*** ../core/dist/computers/Updates/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Updates = void 0;
var Updates_1 = __webpack_require__(/*! ./Updates */ "../core/dist/computers/Updates/Updates.js");
Object.defineProperty(exports, "Updates", ({ enumerable: true, get: function () { return Updates_1.Updates; } }));


/***/ }),

/***/ "../core/dist/deriveFrom.js":
/*!**********************************!*\
  !*** ../core/dist/deriveFrom.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deriveFrom = void 0;
const Param_1 = __webpack_require__(/*! ./Param */ "../core/dist/Param.js");
const ComputerFactory_1 = __webpack_require__(/*! ./ComputerFactory */ "../core/dist/ComputerFactory.js");
// TODO is this duplicating ComputerFactory?
const deriveFrom = (computerConfig, options) => {
    const template = new ComputerFactory_1.ComputerFactory().get(computerConfig);
    template.name = options.name;
    template.tags = [
        ...(template.tags || []),
        ...(options.tags || []),
    ];
    template.category = options.category || template.category;
    template.label = options.label || template.label;
    if (!template.params)
        template.params = {};
    template.params = Object.assign(Object.assign({}, Param_1.DefaultParams), template.params);
    for (const [paramName, paramValue] of Object.entries(options.params || {})) {
        template.params[paramName].value = paramValue;
    }
    return template;
};
exports.deriveFrom = deriveFrom;


/***/ }),

/***/ "../core/dist/index.js":
/*!*****************************!*\
  !*** ../core/dist/index.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deriveFrom = exports.Sample = exports.Pass = exports.Merge = exports.Updates = exports.Executor = exports.NullStorage = exports.LinkGuesser = exports.PositionGuesser = exports.Diagram = exports.ComputerFactory = exports.ConsoleLog = exports.Signal = exports.DiagramBuilder = exports.Application = exports.flattenObjectOneLevel = exports.pascalToSentenceCase = exports.get = void 0;
var get_1 = __webpack_require__(/*! ./utils/get */ "../core/dist/utils/get.js");
Object.defineProperty(exports, "get", ({ enumerable: true, get: function () { return get_1.get; } }));
var pascalToSentenceCase_1 = __webpack_require__(/*! ./utils/pascalToSentenceCase */ "../core/dist/utils/pascalToSentenceCase.js");
Object.defineProperty(exports, "pascalToSentenceCase", ({ enumerable: true, get: function () { return pascalToSentenceCase_1.pascalToSentenceCase; } }));
var flattenObjectOneLevel_1 = __webpack_require__(/*! ./utils/flattenObjectOneLevel */ "../core/dist/utils/flattenObjectOneLevel.js");
Object.defineProperty(exports, "flattenObjectOneLevel", ({ enumerable: true, get: function () { return flattenObjectOneLevel_1.flattenObjectOneLevel; } }));
var Application_1 = __webpack_require__(/*! ./Application */ "../core/dist/Application.js");
Object.defineProperty(exports, "Application", ({ enumerable: true, get: function () { return Application_1.Application; } }));
var DiagramBuilder_1 = __webpack_require__(/*! ./DiagramBuilder */ "../core/dist/DiagramBuilder.js");
Object.defineProperty(exports, "DiagramBuilder", ({ enumerable: true, get: function () { return DiagramBuilder_1.DiagramBuilder; } }));
var Signal_1 = __webpack_require__(/*! ./computers/Signal */ "../core/dist/computers/Signal/index.js");
Object.defineProperty(exports, "Signal", ({ enumerable: true, get: function () { return Signal_1.Signal; } }));
var ConsoleLog_1 = __webpack_require__(/*! ./computers/ConsoleLog */ "../core/dist/computers/ConsoleLog/index.js");
Object.defineProperty(exports, "ConsoleLog", ({ enumerable: true, get: function () { return ConsoleLog_1.ConsoleLog; } }));
var ComputerFactory_1 = __webpack_require__(/*! ./ComputerFactory */ "../core/dist/ComputerFactory.js");
Object.defineProperty(exports, "ComputerFactory", ({ enumerable: true, get: function () { return ComputerFactory_1.ComputerFactory; } }));
var Diagram_1 = __webpack_require__(/*! ./Diagram */ "../core/dist/Diagram.js");
Object.defineProperty(exports, "Diagram", ({ enumerable: true, get: function () { return Diagram_1.Diagram; } }));
var PositionGuesser_1 = __webpack_require__(/*! ./PositionGuesser */ "../core/dist/PositionGuesser.js");
Object.defineProperty(exports, "PositionGuesser", ({ enumerable: true, get: function () { return PositionGuesser_1.PositionGuesser; } }));
var LinkGuesser_1 = __webpack_require__(/*! ./LinkGuesser */ "../core/dist/LinkGuesser.js");
Object.defineProperty(exports, "LinkGuesser", ({ enumerable: true, get: function () { return LinkGuesser_1.LinkGuesser; } }));
var NullStorage_1 = __webpack_require__(/*! ./NullStorage */ "../core/dist/NullStorage.js");
Object.defineProperty(exports, "NullStorage", ({ enumerable: true, get: function () { return NullStorage_1.NullStorage; } }));
var Executor_1 = __webpack_require__(/*! ./Executor */ "../core/dist/Executor.js");
Object.defineProperty(exports, "Executor", ({ enumerable: true, get: function () { return Executor_1.Executor; } }));
var Updates_1 = __webpack_require__(/*! ./computers/Updates */ "../core/dist/computers/Updates/index.js");
Object.defineProperty(exports, "Updates", ({ enumerable: true, get: function () { return Updates_1.Updates; } }));
var Merge_1 = __webpack_require__(/*! ./computers/Merge */ "../core/dist/computers/Merge/index.js");
Object.defineProperty(exports, "Merge", ({ enumerable: true, get: function () { return Merge_1.Merge; } }));
var Pass_1 = __webpack_require__(/*! ./computers/Pass */ "../core/dist/computers/Pass/index.js");
Object.defineProperty(exports, "Pass", ({ enumerable: true, get: function () { return Pass_1.Pass; } }));
var Sample_1 = __webpack_require__(/*! ./computers/Sample */ "../core/dist/computers/Sample/index.js");
Object.defineProperty(exports, "Sample", ({ enumerable: true, get: function () { return Sample_1.Sample; } }));
var deriveFrom_1 = __webpack_require__(/*! ./deriveFrom */ "../core/dist/deriveFrom.js");
Object.defineProperty(exports, "deriveFrom", ({ enumerable: true, get: function () { return deriveFrom_1.deriveFrom; } }));


/***/ }),

/***/ "../core/dist/utils/evalMath.js":
/*!**************************************!*\
  !*** ../core/dist/utils/evalMath.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.evalMath = void 0;
function evalMath(expression) {
    // Remove whitespace
    expression = expression.replace(/\s+/g, "");
    // Ensure the expression only contains valid characters
    if (!/^[\d+\-*/\(\)\.\s]*$/.test(expression)) {
        throw new Error('Invalid characters in expression');
    }
    // Evaluate the expression
    let result;
    try {
        result = eval(expression);
    }
    catch (error) {
        throw new Error('Error evaluating expression: ' + error.message);
    }
    return result;
}
exports.evalMath = evalMath;


/***/ }),

/***/ "../core/dist/utils/flattenObjectOneLevel.js":
/*!***************************************************!*\
  !*** ../core/dist/utils/flattenObjectOneLevel.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.flattenObjectOneLevel = void 0;
function flattenObjectOneLevel(obj) {
    const flattened = {};
    for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            for (const subKey in obj[key]) {
                flattened[subKey] = obj[key][subKey];
            }
        }
        else {
            flattened[key] = obj[key];
        }
    }
    return flattened;
}
exports.flattenObjectOneLevel = flattenObjectOneLevel;


/***/ }),

/***/ "../core/dist/utils/get.js":
/*!*********************************!*\
  !*** ../core/dist/utils/get.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.get = void 0;
function get(target, path, delimiter = '.') {
    if (!path) {
        return target;
    }
    const pathParts = path.split(delimiter);
    let result = target;
    for (const pathPart of pathParts) {
        if (result === null || result === undefined) {
            return undefined;
        }
        result = result[pathPart];
    }
    return result;
}
exports.get = get;


/***/ }),

/***/ "../core/dist/utils/isFinished.js":
/*!****************************************!*\
  !*** ../core/dist/utils/isFinished.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isFinished = void 0;
const sleep_1 = __webpack_require__(/*! ./sleep */ "../core/dist/utils/sleep.js");
function isFinished(promise) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Promise.race([
            (0, sleep_1.sleep)(0),
            promise.then(() => true, () => true)
        ]);
    });
}
exports.isFinished = isFinished;


/***/ }),

/***/ "../core/dist/utils/mapToRecord.js":
/*!*****************************************!*\
  !*** ../core/dist/utils/mapToRecord.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mapToRecord = void 0;
function mapToRecord(map) {
    return Object.fromEntries(map.entries());
}
exports.mapToRecord = mapToRecord;


/***/ }),

/***/ "../core/dist/utils/pascalToSentenceCase.js":
/*!**************************************************!*\
  !*** ../core/dist/utils/pascalToSentenceCase.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pascalToSentenceCase = void 0;
function pascalToSentenceCase(input) {
    return input
        .replace(/([A-Z])/g, ' $1')
        .trim();
}
exports.pascalToSentenceCase = pascalToSentenceCase;


/***/ }),

/***/ "../core/dist/utils/sleep.js":
/*!***********************************!*\
  !*** ../core/dist/utils/sleep.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sleep = void 0;
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
exports.sleep = sleep;


/***/ }),

/***/ "./dist/components/Cat/Cat.js":
/*!************************************!*\
  !*** ./dist/components/Cat/Cat.js ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Cat = void 0;
const jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
const react_1 = __webpack_require__(/*! react */ "react");
const CatStore_1 = __webpack_require__(/*! ./CatStore */ "./dist/components/Cat/CatStore.js");
const zustand_1 = __webpack_require__(/*! zustand */ "../../node_modules/zustand/esm/index.js");
const Cat = () => {
    const store = (0, react_1.useContext)(CatStore_1.CatStoreContext);
    if (!store)
        throw new Error('Missing CatStoreContext.Provider in the tree');
    const { meows, incrementMeows } = (0, zustand_1.useStore)(store, (s) => ({
        meows: s.meows,
        incrementMeows: s.incrementMeows,
    }));
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("span", { children: ["Cat meowed ", meows, " times"] }), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: incrementMeows }, { children: "Meow!" }))] }));
};
exports.Cat = Cat;


/***/ }),

/***/ "./dist/components/Cat/CatStore.js":
/*!*****************************************!*\
  !*** ./dist/components/Cat/CatStore.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CatStoreContext = exports.createCatStore = void 0;
const react_1 = __webpack_require__(/*! react */ "react");
const zustand_1 = __webpack_require__(/*! zustand */ "../../node_modules/zustand/esm/index.js");
const createCatStore = (initProps) => {
    const DEFAULT_PROPS = {
        meows: 0,
    };
    return (0, zustand_1.createStore)()((set, get) => (Object.assign(Object.assign(Object.assign({}, DEFAULT_PROPS), initProps), { incrementMeows: () => set(state => ({ meows: state.meows + 1 })) })));
};
exports.createCatStore = createCatStore;
exports.CatStoreContext = (0, react_1.createContext)(null);


/***/ }),

/***/ "./dist/components/Cat/CatWrapper.js":
/*!*******************************************!*\
  !*** ./dist/components/Cat/CatWrapper.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CatWrapper = void 0;
const jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
const react_1 = __webpack_require__(/*! react */ "react");
const Cat_1 = __webpack_require__(/*! ./Cat */ "./dist/components/Cat/Cat.js");
const CatStore_1 = __webpack_require__(/*! ./CatStore */ "./dist/components/Cat/CatStore.js");
const CatWrapper = () => {
    const store = (0, react_1.useRef)((0, CatStore_1.createCatStore)()).current;
    return ((0, jsx_runtime_1.jsx)(CatStore_1.CatStoreContext.Provider, Object.assign({ value: store }, { children: (0, jsx_runtime_1.jsx)(Cat_1.Cat, {}) })));
};
exports.CatWrapper = CatWrapper;


/***/ }),

/***/ "./dist/components/DataStory/DataStory.js":
/*!************************************************!*\
  !*** ./dist/components/DataStory/DataStory.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DataStory = void 0;
const jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
const Workbench_1 = __webpack_require__(/*! ./Workbench */ "./dist/components/DataStory/Workbench.js");
const DataStory = ({ server, diagram, callback }) => {
    return (0, jsx_runtime_1.jsx)(Workbench_1.Workbench, { server: server, diagram: diagram, callback: callback });
};
exports.DataStory = DataStory;


/***/ }),

/***/ "./dist/components/DataStory/Workbench.js":
/*!************************************************!*\
  !*** ./dist/components/DataStory/Workbench.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
exports.Workbench = void 0;
const jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
__webpack_require__(/*! reactflow/dist/style.css */ "../../node_modules/reactflow/dist/style.css");
const dataStoryControls_1 = __webpack_require__(/*! ./dataStoryControls */ "./dist/components/DataStory/dataStoryControls.js");
const react_1 = __webpack_require__(/*! react */ "react");
const reactflow_1 = __importStar(__webpack_require__(/*! reactflow */ "../../node_modules/reactflow/dist/umd/index.js"));
const DataStoryNodeComponent_1 = __importDefault(__webpack_require__(/*! ../Node/DataStoryNodeComponent */ "./dist/components/Node/DataStoryNodeComponent.js"));
const runModal_1 = __webpack_require__(/*! ./modals/runModal */ "./dist/components/DataStory/modals/runModal.js");
const configModal_1 = __webpack_require__(/*! ./modals/configModal */ "./dist/components/DataStory/modals/configModal.js");
const addNodeModal_1 = __webpack_require__(/*! ./modals/addNodeModal */ "./dist/components/DataStory/modals/addNodeModal.js");
const store_1 = __webpack_require__(/*! ./store/store */ "./dist/components/DataStory/store/store.js");
const shallow_1 = __webpack_require__(/*! zustand/shallow */ "../../node_modules/zustand/esm/shallow.js");
const nodeSettingsModal_1 = __webpack_require__(/*! ./modals/nodeSettingsModal/nodeSettingsModal */ "./dist/components/DataStory/modals/nodeSettingsModal/nodeSettingsModal.js");
const DataStoryCommentNodeComponent_1 = __importDefault(__webpack_require__(/*! ../Node/DataStoryCommentNodeComponent */ "./dist/components/Node/DataStoryCommentNodeComponent.js"));
const DataStoryInputNodeComponent_1 = __importDefault(__webpack_require__(/*! ../Node/DataStoryInputNodeComponent */ "./dist/components/Node/DataStoryInputNodeComponent.js"));
const useHotkeys_1 = __webpack_require__(/*! ./useHotkeys */ "./dist/components/DataStory/useHotkeys.js");
const nodeTypes = {
    dataStoryNodeComponent: DataStoryNodeComponent_1.default,
    dataStoryCommentNodeComponent: DataStoryCommentNodeComponent_1.default,
    dataStoryInputNodeComponent: DataStoryInputNodeComponent_1.default,
    // dataStoryOutputNodeComponent: DataStoryNodeComponent,
};
const Workbench = ({ server, diagram, callback }) => {
    const selector = (state) => ({
        nodes: state.nodes,
        edges: state.edges,
        onNodesChange: state.onNodesChange,
        onEdgesChange: state.onEdgesChange,
        connect: state.connect,
        onInit: state.onInit,
        openNodeModalId: state.openNodeModalId,
        setOpenNodeModalId: state.setOpenNodeModalId,
        traverseNodes: state.traverseNodes,
    });
    const { connect, nodes, edges, onNodesChange, onEdgesChange, onInit, openNodeModalId, setOpenNodeModalId, traverseNodes } = (0, store_1.useStore)(selector, shallow_1.shallow);
    const [showConfigModal, setShowConfigModal] = (0, react_1.useState)(false);
    const [showRunModal, setShowRunModal] = (0, react_1.useState)(false);
    const [showAddNodeModal, setShowAddNodeModal] = (0, react_1.useState)(false);
    (0, useHotkeys_1.useHotkeys)({
        nodes,
        openNodeModalId,
        setShowRunModal,
        setOpenNodeModalId,
        showConfigModal,
        showRunModal,
        showAddNodeModal,
        traverseNodes,
        setShowAddNodeModal,
    });
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(reactflow_1.default, Object.assign({ className: "bg-gray-50", nodes: nodes, edges: edges, nodeTypes: nodeTypes, onNodesChange: onNodesChange, onEdgesChange: onEdgesChange, onConnect: connect, onInit: (rfInstance) => {
                    onInit({
                        rfInstance,
                        server,
                        diagram,
                        callback
                    });
                }, minZoom: 0.25, maxZoom: 8 }, { children: [(0, jsx_runtime_1.jsx)(dataStoryControls_1.DataStoryControls, { setShowRunModal: setShowRunModal, setShowAddNodeModal: setShowAddNodeModal, setShowConfigModal: setShowConfigModal }), (0, jsx_runtime_1.jsx)(reactflow_1.Background, { color: "#E7E7E7", variant: reactflow_1.BackgroundVariant.Lines })] })), showConfigModal && (0, jsx_runtime_1.jsx)(configModal_1.ConfigModal, { setShowModal: setShowConfigModal }), showRunModal && (0, jsx_runtime_1.jsx)(runModal_1.RunModal, { setShowModal: setShowRunModal }), showAddNodeModal && (0, jsx_runtime_1.jsx)(addNodeModal_1.AddNodeModal, { setShowModal: setShowAddNodeModal }), openNodeModalId && (0, jsx_runtime_1.jsx)(nodeSettingsModal_1.NodeSettingsModal, {})] }));
};
exports.Workbench = Workbench;


/***/ }),

/***/ "./dist/components/DataStory/clients/JsClient.js":
/*!*******************************************************!*\
  !*** ./dist/components/DataStory/clients/JsClient.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JsClient = void 0;
const core_1 = __webpack_require__(/*! @data-story/core */ "../core/dist/index.js");
class JsClient {
    constructor(setAvailableNodes, updateEdgeCounts, setNodes, setEdges, 
    // private setViewport: (viewport: any) => void,
    app) {
        this.setAvailableNodes = setAvailableNodes;
        this.updateEdgeCounts = updateEdgeCounts;
        this.setNodes = setNodes;
        this.setEdges = setEdges;
        this.app = app;
    }
    init() {
        this.setAvailableNodes(this.app.descriptions());
        console.log("Connected to server: JS");
    }
    describe() { }
    run(diagram) {
        console.log("Running in JS Client?");
        const storage = new core_1.NullStorage();
        const executor = new core_1.Executor(diagram, this.app.computers, storage);
        const execution = executor.execute();
        const handleUpdates = (iterator) => {
            iterator.next().then(({ value: update, done }) => {
                if (!done) {
                    this.updateEdgeCounts(update.counts);
                    for (const hook of update.hooks) {
                        if (hook.type === 'CONSOLE_LOG') {
                            console.log(...hook.args);
                        }
                        else {
                            const userHook = this.app.hooks.get(hook.type);
                            if (userHook) {
                                userHook(...hook.args);
                            }
                        }
                        if (hook.type === 'UPDATES') {
                            const providedCallback = (...data) => {
                                console.log("THIS IS THE UPDATE HOOK!");
                                console.log("DataPassed", data);
                            };
                            providedCallback(...hook.args);
                        }
                    }
                    // Then wait for the next one
                    handleUpdates(iterator);
                }
                else {
                    setTimeout(() => alert("Execution complete 💫"), 100);
                }
            });
        };
        // Not sure what this is but it works
        handleUpdates(execution[Symbol.asyncIterator]());
    }
    open(name) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    save(name, reactFlow) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.JsClient = JsClient;


/***/ }),

/***/ "./dist/components/DataStory/clients/SocketClient.js":
/*!***********************************************************!*\
  !*** ./dist/components/DataStory/clients/SocketClient.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SocketClient = void 0;
class SocketClient {
    constructor(setAvailableNodes, updateEdgeCounts, setNodes, setEdges) {
        this.setAvailableNodes = setAvailableNodes;
        this.updateEdgeCounts = updateEdgeCounts;
        this.setNodes = setNodes;
        this.setEdges = setEdges;
        this.maxReconnectTries = 100;
        this.reconnectTimeout = 1000;
        this.reconnectTries = 0;
    }
    init() {
        this.socket = new WebSocket("ws://localhost:3100");
        // Register on open
        this.socket.onopen = () => {
            console.log("Connected to server: localhost:3100");
            // Ask the server to describe capabilites
            this.describe();
        };
        // Register on error
        this.socket.onerror = (error) => {
            console.log("WebSocket error: ", error);
        };
        // Register on close
        this.socket.onclose = () => {
            console.log("WebSocket closed.");
            if (this.reconnectTries < this.maxReconnectTries) {
                setTimeout(() => {
                    console.log("Reconnecting...");
                    this.reconnectTries++;
                    this.init();
                }, this.reconnectTimeout);
            }
            else {
                console.log("Max reconnect tries reached. Is the server running?");
            }
        };
        this.socket.onmessage = ((data) => {
            const parsed = JSON.parse(data.data);
            if (parsed.type === "DescribeResponse") {
                this.setAvailableNodes(parsed.availableNodes);
                return;
            }
            if (parsed.type === "ExecutionUpdate") {
                this.updateEdgeCounts(parsed.counts);
                for (const hook of parsed.hooks) {
                    if (hook.type === 'CONSOLE_LOG') {
                        console.log(...hook.args);
                    }
                    if (hook.type === 'UPDATES') {
                        const providedCallback = (...data) => {
                            console.log("THIS IS THE UPDATE HOOK!");
                            console.log("DataPassed", data);
                        };
                        providedCallback(...hook.args);
                    }
                }
                return;
            }
            if (parsed.type === "ExecutionResult") {
                setTimeout(() => alert("Execution complete 💫"), 100);
                return;
            }
            if (parsed.type === "ExecutionFailure") {
                console.error("Execution failed: ", {
                    history: parsed.history,
                });
                setTimeout(() => alert(parsed.message), 100);
                return;
            }
            if (parsed.type === "OpenResponse") {
                const flow = parsed.flow;
                // const { x = 0, y = 0, zoom = 1 } = flow.viewport;
                this.setNodes(flow.nodes || []);
                this.setEdges(flow.edges || []);
                return;
            }
            throw ("Unknown message type: " + parsed.type);
        });
    }
    describe() {
        const message = JSON.stringify({
            type: "describe",
        });
        this.socket.send(message);
    }
    run(diagram) {
        const message = JSON.stringify({
            type: "run",
            diagram,
        }, null, 2);
        this.socket.send(message);
    }
    open(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = JSON.stringify({
                type: "open",
                name,
            });
            this.socket.send(message);
        });
    }
    save(name, reactFlow) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = JSON.stringify({
                type: "save",
                name,
                reactFlow
            });
            this.socket.send(message);
        });
    }
}
exports.SocketClient = SocketClient;


/***/ }),

/***/ "./dist/components/DataStory/dataStoryControls.js":
/*!********************************************************!*\
  !*** ./dist/components/DataStory/dataStoryControls.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DataStoryControls = void 0;
const jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
const reactflow_1 = __webpack_require__(/*! reactflow */ "../../node_modules/reactflow/dist/umd/index.js");
const runIcon_1 = __webpack_require__(/*! ./icons/runIcon */ "./dist/components/DataStory/icons/runIcon.js");
const addNodeIcon_1 = __webpack_require__(/*! ./icons/addNodeIcon */ "./dist/components/DataStory/icons/addNodeIcon.js");
const saveIcon_1 = __webpack_require__(/*! ./icons/saveIcon */ "./dist/components/DataStory/icons/saveIcon.js");
const store_1 = __webpack_require__(/*! ./store/store */ "./dist/components/DataStory/store/store.js");
const shallow_1 = __webpack_require__(/*! zustand/shallow */ "../../node_modules/zustand/esm/shallow.js");
const openIcon_1 = __webpack_require__(/*! ./icons/openIcon */ "./dist/components/DataStory/icons/openIcon.js");
const configIcon_1 = __webpack_require__(/*! ./icons/configIcon */ "./dist/components/DataStory/icons/configIcon.js");
function DataStoryControls({ 
// setShowConfigModal,
setShowRunModal, setShowAddNodeModal, setShowConfigModal, }) {
    // const router = useRouter();
    const selector = (state) => ({
        onSave: state.onSave,
    });
    const { onSave } = (0, store_1.useStore)(selector, shallow_1.shallow);
    return (0, jsx_runtime_1.jsxs)(reactflow_1.Controls, Object.assign({ position: 'top-left', showInteractive: false, showZoom: false, showFitView: false }, { children: [(0, jsx_runtime_1.jsx)(reactflow_1.ControlButton, Object.assign({ title: "Run", "aria-label": "Run", onClick: () => setShowRunModal(true) }, { children: (0, jsx_runtime_1.jsx)(runIcon_1.RunIcon, {}) })), (0, jsx_runtime_1.jsx)(reactflow_1.ControlButton, Object.assign({ onClick: () => setShowAddNodeModal(true), title: "Add Node", "aria-label": "Add Node" }, { children: (0, jsx_runtime_1.jsx)(addNodeIcon_1.AddNodeIcon, {}) })), (0, jsx_runtime_1.jsx)(reactflow_1.ControlButton, Object.assign({ onClick: () => onSave(), title: "Save", "aria-label": "Save" }, { children: (0, jsx_runtime_1.jsx)(saveIcon_1.SaveIcon, {}) })), (0, jsx_runtime_1.jsx)(reactflow_1.ControlButton, Object.assign({ onClick: () => { }, title: "Open", "aria-label": "Open" }, { children: (0, jsx_runtime_1.jsx)(openIcon_1.OpenIcon, {}) })), (0, jsx_runtime_1.jsx)(reactflow_1.ControlButton, Object.assign({ onClick: () => setShowConfigModal(true), title: "Config", "aria-label": "Config" }, { children: (0, jsx_runtime_1.jsx)(configIcon_1.ConfigIcon, {}) }))] }));
}
exports.DataStoryControls = DataStoryControls;


/***/ }),

/***/ "./dist/components/DataStory/hooks/makeNodeAndConnection.js":
/*!******************************************************************!*\
  !*** ./dist/components/DataStory/hooks/makeNodeAndConnection.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.makeNodeAndConnection = void 0;
const core_1 = __webpack_require__(/*! @data-story/core */ "../core/dist/index.js");
const reactFlowToDiagram_1 = __webpack_require__(/*! ../../../reactFlowToDiagram */ "./dist/reactFlowToDiagram.js");
const makeNodeAndConnection = (diagram, nodeDescription) => {
    var _a, _b;
    const scopedId = (name) => {
        const max = diagram.nodes
            .filter((node) => node.type === name)
            .map((node) => node.id)
            .map((id) => id.split('.')[1])
            .map((id) => parseInt(id))
            .reduce((max, id) => Math.max(max, id), 0);
        return max + 1;
    };
    const counter = scopedId(nodeDescription.name);
    const id = `${nodeDescription.name}.${counter}`;
    const flowNode = {
        id,
        position: new core_1.PositionGuesser(diagram).guess(nodeDescription),
        data: {
            // Ensure two nodes of same type don't share the same params object
            params: structuredClone(nodeDescription.params),
            computer: nodeDescription.name,
            label: (_a = nodeDescription.label) !== null && _a !== void 0 ? _a : nodeDescription.name,
            inputs: nodeDescription.inputs.map((input) => {
                return Object.assign({ id: `${id}.${input.name}` }, input);
            }),
            outputs: nodeDescription.outputs.map((output) => {
                return Object.assign({ id: `${id}.${output.name}` }, output);
            }),
        },
        selected: true,
        type: (_b = {
            Comment: "dataStoryCommentNodeComponent",
            //Input: "dataStoryInputNodeComponent",
            //Output: "dataStoryOutputNodeComponent",
        }[nodeDescription.name]) !== null && _b !== void 0 ? _b : "dataStoryNodeComponent",
    };
    const node = (0, reactFlowToDiagram_1.reactFlowNodeToDiagramNode)(flowNode);
    const link = new core_1.LinkGuesser(diagram).guess(node);
    const connection = link ? {
        source: diagram.nodeWithOutputPortId(link.sourcePortId).id,
        target: id,
        sourceHandle: link.sourcePortId,
        targetHandle: link.targetPortId,
    } : null;
    return [flowNode, connection];
};
exports.makeNodeAndConnection = makeNodeAndConnection;
// const connection: {
//   id: string;
//   sourceHandle: string | undefined;
//   targetHandle: string | undefined;
//   source: string;
//   target: string;
// } | null


/***/ }),

/***/ "./dist/components/DataStory/hooks/useEscapeKey.js":
/*!*********************************************************!*\
  !*** ./dist/components/DataStory/hooks/useEscapeKey.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useEscapeKey = void 0;
const react_1 = __webpack_require__(/*! react */ "react");
const KEY_NAME_ESC = 'Escape';
const KEY_EVENT_TYPE = 'keyup';
function useEscapeKey(handleClose) {
    const handleEscKey = (0, react_1.useCallback)((event) => {
        if (event.key === KEY_NAME_ESC) {
            handleClose();
        }
    }, [handleClose]);
    (0, react_1.useEffect)(() => {
        document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false);
        return () => {
            document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false);
        };
    }, [handleEscKey]);
}
exports.useEscapeKey = useEscapeKey;


/***/ }),

/***/ "./dist/components/DataStory/icons/addNodeIcon.js":
/*!********************************************************!*\
  !*** ./dist/components/DataStory/icons/addNodeIcon.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddNodeIcon = void 0;
const jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
function AddNodeIcon() {
    return ((0, jsx_runtime_1.jsx)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "4 4 20 20", strokeWidth: 2.5, stroke: "currentColor", className: "w-6 h-6 text-gray-700" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 4.5v15m7.5-7.5h-15" }) })));
}
exports.AddNodeIcon = AddNodeIcon;


/***/ }),

/***/ "./dist/components/DataStory/icons/configIcon.js":
/*!*******************************************************!*\
  !*** ./dist/components/DataStory/icons/configIcon.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigIcon = void 0;
const jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
function ConfigIcon() {
    return ((0, jsx_runtime_1.jsxs)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "2.5 2.5 21.5 21.5", strokeWidth: 2.0, stroke: "currentColor", className: "w-6 h-6 text-gray-700" }, { children: [(0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" }), (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" })] })));
}
exports.ConfigIcon = ConfigIcon;


/***/ }),

/***/ "./dist/components/DataStory/icons/openIcon.js":
/*!*****************************************************!*\
  !*** ./dist/components/DataStory/icons/openIcon.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OpenIcon = void 0;
const jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
function OpenIcon() {
    return ((0, jsx_runtime_1.jsx)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 2, stroke: "currentColor", className: "w-6 h-6 text-gray-700" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" }) })));
}
exports.OpenIcon = OpenIcon;


/***/ }),

/***/ "./dist/components/DataStory/icons/portIcon.js":
/*!*****************************************************!*\
  !*** ./dist/components/DataStory/icons/portIcon.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PortIcon = void 0;
const jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
function PortIcon({ fill = "#50C878" }) {
    return ((0, jsx_runtime_1.jsx)("svg", Object.assign({ viewBox: "0 0 24 24", className: "w-3 h-3", fill: fill }, { children: (0, jsx_runtime_1.jsx)("polygon", { points: "0,0 24,12, 0,24, 0,0" }) })));
}
exports.PortIcon = PortIcon;


/***/ }),

/***/ "./dist/components/DataStory/icons/runIcon.js":
/*!****************************************************!*\
  !*** ./dist/components/DataStory/icons/runIcon.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RunIcon = void 0;
const jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
function RunIcon() {
    return ((0, jsx_runtime_1.jsx)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "2 2 20 20", strokeWidth: 2.0, stroke: "currentColor", className: "w-6 h-6 text-gray-700" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" }) })));
}
exports.RunIcon = RunIcon;


/***/ }),

/***/ "./dist/components/DataStory/icons/saveIcon.js":
/*!*****************************************************!*\
  !*** ./dist/components/DataStory/icons/saveIcon.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SaveIcon = void 0;
const jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
function SaveIcon() {
    return ((0, jsx_runtime_1.jsx)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 2.0, stroke: "currentColor", className: "w-6 h-6 text-gray-700" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" }) })));
}
exports.SaveIcon = SaveIcon;


/***/ }),

/***/ "./dist/components/DataStory/index.js":
/*!********************************************!*\
  !*** ./dist/components/DataStory/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DataStory = void 0;
var DataStory_1 = __webpack_require__(/*! ./DataStory */ "./dist/components/DataStory/DataStory.js");
Object.defineProperty(exports, "DataStory", ({ enumerable: true, get: function () { return DataStory_1.DataStory; } }));


/***/ }),

/***/ "./dist/components/DataStory/modal.js":
/*!********************************************!*\
  !*** ./dist/components/DataStory/modal.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Modal = void 0;
const jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
const react_1 = __webpack_require__(/*! react */ "react");
const useEscapeKey_1 = __webpack_require__(/*! ./hooks/useEscapeKey */ "./dist/components/DataStory/hooks/useEscapeKey.js");
function Modal({ setShowModal, title, children, primaryAction, onPrimaryAction, }) {
    (0, useEscapeKey_1.useEscapeKey)(() => setShowModal(false));
    const modalRef = (0, react_1.useRef)(null);
    // Listen for click outside
    (0, react_1.useEffect)(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current !== null && !modalRef.current.contains(event.target)) {
                setShowModal(false);
            }
        };
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalRef]);
    return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ ref: modalRef, className: "relative w-full max-w-4xl my-8 mx-auto px-8" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none" }, { children: [title && ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex items-start justify-between px-8 py-2 border-solid border-slate-200 rounded-t" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "pr-4 mt-4 flex flex-col align-center justify-middleitems-center justify-center text-lg text-gray-400 font-bold tracking widest" }, { children: title })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "p-1 ml-auto text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none", onClick: () => setShowModal(false) }, { children: (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "text-gray-500 h-6 w-6 text-2xl block outline-none focus:outline-none" }, { children: "\u00D7" })) }))] }))), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "max-h-128 overflow-y-scroll relative pb-6 pt-4 px-6 flex-auto space-y-1" }, { children: children })), primaryAction && ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ className: "text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150", type: "button", onClick: () => setShowModal(false) }, { children: "Close" })), primaryAction && (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150", type: "button", onClick: onPrimaryAction }, { children: primaryAction }))] }))), (0, jsx_runtime_1.jsx)("div", { className: "h-12" })] })) })) })), (0, jsx_runtime_1.jsx)("div", { className: "opacity-25 fixed inset-0 z-40 bg-black" })] });
}
exports.Modal = Modal;


/***/ }),

/***/ "./dist/components/DataStory/modals/addNodeModal.js":
/*!**********************************************************!*\
  !*** ./dist/components/DataStory/modals/addNodeModal.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddNodeModal = void 0;
const jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
const react_1 = __webpack_require__(/*! react */ "react");
const shallow_1 = __webpack_require__(/*! zustand/shallow */ "../../node_modules/zustand/esm/shallow.js");
const makeNodeAndConnection_1 = __webpack_require__(/*! ../hooks/makeNodeAndConnection */ "./dist/components/DataStory/hooks/makeNodeAndConnection.js");
const modal_1 = __webpack_require__(/*! ../modal */ "./dist/components/DataStory/modal.js");
const store_1 = __webpack_require__(/*! ../store/store */ "./dist/components/DataStory/store/store.js");
const AddNodeModal = ({ setShowModal }) => {
    const inputReference = (0, react_1.useRef)(null);
    const [search, setSearch] = (0, react_1.useState)("");
    (0, react_1.useEffect)(() => {
        var _a;
        (_a = inputReference === null || inputReference === void 0 ? void 0 : inputReference.current) === null || _a === void 0 ? void 0 : _a.focus();
    }, []);
    const selector = (state) => ({
        toDiagram: state.toDiagram,
        nodes: state.nodes,
        edges: state.edges,
        addNode: state.addNode,
        connect: state.connect,
        availableNodes: state.availableNodes,
    });
    const { toDiagram, nodes, edges, addNode, connect, availableNodes } = (0, store_1.useStore)(selector, shallow_1.shallow);
    const doAddNode = (nodeDescription) => {
        const [node, connection] = (0, makeNodeAndConnection_1.makeNodeAndConnection)(toDiagram(), nodeDescription);
        // Call React Flow hooks to add node and link to store
        addNode(node);
        if (connection)
            connect(connection);
        // Close modal
        setShowModal(false);
    };
    const matchingNodes = availableNodes
        .sort((a, b) => {
        if ((a.category || '') < (b.category || ''))
            return -1;
        if ((a.category || '') > (b.category || ''))
            return 1;
        return 0;
    })
        .filter((nodeDescription) => {
        return JSON.stringify(nodeDescription).toLowerCase().includes(search.toLowerCase());
    });
    return ((0, jsx_runtime_1.jsxs)(modal_1.Modal, Object.assign({ setShowModal: setShowModal }, { children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("input", { className: "w-full bg-white mb-2 text-gray-500 font-mono text-sm border border-gray-100 rounded px-4 py-4", placeholder: "Type format, action, resource ...", value: search, onChange: (e) => setSearch(e.target.value), ref: inputReference }) }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "group grid grid-cols-2 gap-2" }, { children: matchingNodes.map((nodeDescription) => {
                    return ((0, jsx_runtime_1.jsxs)("button", Object.assign({ tabIndex: 0, className: "flex justify-between font-bold cursor-pointer bg-slate-100 hover:bg-slate-200 text-gray-400 flex items-center px-4 py-2 border border-gray-300 text-base shadow", onClick: () => doAddNode(nodeDescription) }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "text-gray-500 text-sm" }, { children: [(0, jsx_runtime_1.jsxs)("span", Object.assign({ className: "text-indigo-500 font-mono" }, { children: [nodeDescription.category || 'Core', "::"] })), nodeDescription.label || nodeDescription.name] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex space-x-1" }, { children: nodeDescription.tags.map((tag) => {
                                    let style = "bg-blue-300 border px-2 rounded tracking-wide text-xxs text-white";
                                    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: style }, { children: tag }), tag));
                                }) }))] }), nodeDescription.name));
                }) }))] })));
};
exports.AddNodeModal = AddNodeModal;


/***/ }),

/***/ "./dist/components/DataStory/modals/configModal.js":
/*!*********************************************************!*\
  !*** ./dist/components/DataStory/modals/configModal.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigModal = void 0;
const jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
const shallow_1 = __webpack_require__(/*! zustand/shallow */ "../../node_modules/zustand/esm/shallow.js");
const modal_1 = __webpack_require__(/*! ../modal */ "./dist/components/DataStory/modal.js");
const store_1 = __webpack_require__(/*! ../store/store */ "./dist/components/DataStory/store/store.js");
const core_1 = __webpack_require__(/*! @data-story/core */ "../core/dist/index.js");
const ConfigModal = ({ setShowModal }) => {
    const selector = (state) => ({
        serverConfig: state.serverConfig,
        setServerConfig: state.setServerConfig,
    });
    const { serverConfig, setServerConfig } = (0, store_1.useStore)(selector, shallow_1.shallow);
    const handleTypeChange = (event) => {
        const type = event.target.value;
        if (type === 'SOCKET') {
            setServerConfig({
                type: 'SOCKET',
                url: 'ws://localhost:3100'
            });
        }
        if (type === 'JS') {
            setServerConfig({
                type: 'JS',
                // TODO provide a default app here?
                app: new core_1.Application(),
            });
        }
    };
    console.log("aaa", serverConfig, "bbb");
    return ((0, jsx_runtime_1.jsx)(modal_1.Modal, Object.assign({ title: "Config", setShowModal: setShowModal }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex flex-col space-y-2" }, { children: ["This is the config modal!", (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "w-full px-4 space-x-2 align-end text-gray-500 text-xs" }, { children: [(0, jsx_runtime_1.jsx)("label", { children: "Server" }), (0, jsx_runtime_1.jsxs)("select", Object.assign({ value: serverConfig.type, onChange: handleTypeChange }, { children: [(0, jsx_runtime_1.jsx)("option", Object.assign({ value: "SOCKET" }, { children: "WebSocket" })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "JS" }, { children: "JS" }))] }))] }))] })) })));
};
exports.ConfigModal = ConfigModal;


/***/ }),

/***/ "./dist/components/DataStory/modals/nodeSettingsModal/nodeSettingsModal.js":
/*!*********************************************************************************!*\
  !*** ./dist/components/DataStory/modals/nodeSettingsModal/nodeSettingsModal.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NodeSettingsModal = void 0;
const jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
const tabs_1 = __webpack_require__(/*! ./tabs */ "./dist/components/DataStory/modals/nodeSettingsModal/tabs/index.js");
const shallow_1 = __webpack_require__(/*! zustand/shallow */ "../../node_modules/zustand/esm/shallow.js");
const store_1 = __webpack_require__(/*! ../../store/store */ "./dist/components/DataStory/store/store.js");
const react_hook_form_1 = __webpack_require__(/*! react-hook-form */ "../../node_modules/react-hook-form/dist/index.cjs.js");
const useEscapeKey_1 = __webpack_require__(/*! ../../hooks/useEscapeKey */ "./dist/components/DataStory/hooks/useEscapeKey.js");
const react_1 = __webpack_require__(/*! react */ "react");
const core_1 = __webpack_require__(/*! @data-story/core */ "../core/dist/index.js");
const TAB_COMPONENTS = {
    Params: tabs_1.Params,
    InputSchemas: tabs_1.InputSchemas,
    OutputSchemas: tabs_1.OutputSchemas,
    Code: tabs_1.Code,
    Config: tabs_1.Config,
};
const NodeSettingsModal = () => {
    const [tab, setTab] = (0, react_1.useState)('Params');
    const selector = (state) => ({
        nodes: state.nodes,
        openNodeModalId: state.openNodeModalId,
        setOpenNodeModalId: state.setOpenNodeModalId,
        refreshNodes: state.refreshNodes,
        setNodes: state.setNodes,
    });
    const { nodes, openNodeModalId, setOpenNodeModalId, setNodes } = (0, store_1.useStore)(selector, shallow_1.shallow);
    const node = nodes.find((node) => node.id === openNodeModalId);
    const defaultParamValues = Object.values(node.data.params).reduce((acc, param) => {
        acc[param.name] = param.value;
        return acc;
    }, {});
    const form = (0, react_hook_form_1.useForm)({
        defaultValues: Object.assign(Object.assign({}, defaultParamValues), { label: node.data.label })
    });
    const close = () => setOpenNodeModalId(null);
    const saveAndClose = () => {
        form.handleSubmit((submitted) => {
            setNodes(nodes.map((n) => {
                if (n.id === node.id) {
                    const newData = Object.assign({}, n.data);
                    for (const [key, value] of Object.entries(submitted)) {
                        newData.params[key].value = value;
                    }
                    newData.label = submitted.label;
                    n.data = newData;
                }
                return n;
            }));
        })();
        close();
    };
    (0, useEscapeKey_1.useEscapeKey)(close);
    const TabComponent = TAB_COMPONENTS[tab];
    return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex justify-center overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none" }, { children: (0, jsx_runtime_1.jsx)("form", Object.assign({ className: "relative w-full max-w-4xl my-8 mx-auto px-8" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex items-start justify-between px-8 py-2 border-solid border-slate-200 rounded-t" }, { children: [(0, jsx_runtime_1.jsx)("input", Object.assign({}, form.register('label'), { className: "pr-4 bg-white mt-4 flex flex-col align-center justify-middleitems-center justify-center text-lg text-gray-400 font-bold tracking widest" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "cursor-pointer p-1 ml-auto text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none", onClick: close }, { children: (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "text-gray-500 h-6 w-6 text-2xl block outline-none focus:outline-none" }, { children: "\u00D7" })) }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "mx-8 flex space-x-8 text-xxs uppercase text-gray-400" }, { children: Object.keys(TAB_COMPONENTS).map((key) => ((0, jsx_runtime_1.jsx)("div", Object.assign({ onClick: () => setTab(key), className: `pb-2 hover:text-gray-500 cursor-pointer ${tab === key && "border-b-2 border-blue-400"}` }, { children: (0, core_1.pascalToSentenceCase)(key) }), key))) })), (0, jsx_runtime_1.jsx)(TabComponent, { node: node, register: form.register, form: form }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ className: "text-gray-500 focus:text-gray-800 background-transparent font-bold uppercase px-6 py-2 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150", type: "button", onClick: close }, { children: "Close" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "bg-blue-500 focus:bg-blue-700 text-white active:bg-blue-600 font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150", type: "button", onClick: saveAndClose }, { children: "Save" }))] })), (0, jsx_runtime_1.jsx)("div", { className: "h-12" })] })) })) })), (0, jsx_runtime_1.jsx)("div", { className: "opacity-25 fixed inset-0 z-40 bg-black" })] });
};
exports.NodeSettingsModal = NodeSettingsModal;


/***/ }),

/***/ "./dist/components/DataStory/modals/nodeSettingsModal/tabs/Code.js":
/*!*************************************************************************!*\
  !*** ./dist/components/DataStory/modals/nodeSettingsModal/tabs/Code.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Code = void 0;
const jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
function Code({ node }) {
    return (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "max-h-128 overflow-y-scroll relative pb-6 pt-4 px-6 flex-auto space-y-1 text-sm font-mono text-gray-800" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex flex-col" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "mt-2 mb-1 text-xs text-gray-400" }, { children: "Node as JSON" })), (0, jsx_runtime_1.jsx)("textarea", { readOnly: true, placeholder: `{ "someProperty": "string"}`, className: "w-full h-96 text-xs text-gray-400 font-mono px-2 py-1 border rounded border-blue-200", value: JSON.stringify(node, null, 2) })] })) }));
}
exports.Code = Code;


/***/ }),

/***/ "./dist/components/DataStory/modals/nodeSettingsModal/tabs/Config.js":
/*!***************************************************************************!*\
  !*** ./dist/components/DataStory/modals/nodeSettingsModal/tabs/Config.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Config = void 0;
const jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
function Config({ node, register }) {
    return (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "max-h-128 overflow-y-scroll relative pb-6 pt-4 px-6 flex-auto space-y-1 text-xs font-mono text-gray-800" }, { children: "Nothing here yet" }));
}
exports.Config = Config;


/***/ }),

/***/ "./dist/components/DataStory/modals/nodeSettingsModal/tabs/InputSchemas.js":
/*!*********************************************************************************!*\
  !*** ./dist/components/DataStory/modals/nodeSettingsModal/tabs/InputSchemas.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InputSchemas = void 0;
const jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
function InputSchemas({ node, register }) {
    return (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "max-h-128 overflow-y-scroll relative pb-6 pt-4 px-6 flex-auto space-y-1 text-sm font-mono text-gray-800" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex flex-col" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "mt-2 mb-1 text-xs text-gray-400" }, { children: "Input Schema" })), (0, jsx_runtime_1.jsx)("textarea", { placeholder: `{ "someProperty": "string"}`, className: "w-full bg-white h-48 text-xs text-gray-400 px-2 py-1 border rounded border-blue-200", defaultValue: JSON.stringify(node.data.inputs, null, 2) })] })) }));
}
exports.InputSchemas = InputSchemas;


/***/ }),

/***/ "./dist/components/DataStory/modals/nodeSettingsModal/tabs/OutputSchemas.js":
/*!**********************************************************************************!*\
  !*** ./dist/components/DataStory/modals/nodeSettingsModal/tabs/OutputSchemas.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OutputSchemas = void 0;
const jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
function OutputSchemas({ node, register }) {
    return (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "max-h-128 overflow-y-scroll relative pb-6 pt-4 px-6 flex-auto space-y-1 text-sm font-mono text-gray-800" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex flex-col" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "mt-2 mb-1 text-xs text-gray-400" }, { children: "Output Schema" })), (0, jsx_runtime_1.jsx)("textarea", { placeholder: `{ "someProperty": "string"}`, className: "w-full bg-white h-48 text-xs text-gray-400 px-2 py-1 border rounded border-blue-200", defaultValue: JSON.stringify(node.data.outputs, null, 2) })] })) }));
}
exports.OutputSchemas = OutputSchemas;


/***/ }),

/***/ "./dist/components/DataStory/modals/nodeSettingsModal/tabs/Params.js":
/*!***************************************************************************!*\
  !*** ./dist/components/DataStory/modals/nodeSettingsModal/tabs/Params.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Params = void 0;
const jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
const number_1 = __webpack_require__(/*! ../../../../forms/inputs/number */ "./dist/components/forms/inputs/number.js");
const text_1 = __webpack_require__(/*! ../../../../forms/inputs/text */ "./dist/components/forms/inputs/text.js");
const select_1 = __webpack_require__(/*! ../../../../forms/inputs/select */ "./dist/components/forms/inputs/select.js");
const InterpolatableTextarea_1 = __webpack_require__(/*! ../../../../forms/inputs/interpolatable/InterpolatableTextarea */ "./dist/components/forms/inputs/interpolatable/InterpolatableTextarea.js");
const core_1 = __webpack_require__(/*! @data-story/core */ "../core/dist/index.js");
function Params({ node, form }) {
    const nonDefaultParams = Object.values(node.data.params).filter((param) => {
        return param.name !== 'name' && param.name !== 'label';
    });
    return (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "max-h-128 overflow-y-scroll relative pb-6 pt-4 px-6 flex-auto space-y-1" }, { children: [nonDefaultParams.map(param => {
                var _a, _b;
                const inputSchema = param.inputSchemaFromPort
                    ? (_a = node.data.inputs.find(i => i.name === param.inputSchemaFromPort)) === null || _a === void 0 ? void 0 : _a.schema
                    : (_b = (0, core_1.flattenObjectOneLevel)(node.data.inputs)) === null || _b === void 0 ? void 0 : _b.schema;
                return (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex flex-col" }, { children: [param.type === 'string' && (0, jsx_runtime_1.jsx)(InterpolatableTextarea_1.InterPolatableTextArea, { form: form, label: param.name, id: param.name, inputSchema: inputSchema || {}, rows: param.rows }), param.type === 'text' && (0, jsx_runtime_1.jsx)(text_1.Text, { register: form.register, label: param.name, id: param.name }), param.type === 'number' && (0, jsx_runtime_1.jsx)(number_1.Number, { register: form.register, label: param.name, id: param.name }), param.type === 'json' && (0, jsx_runtime_1.jsx)(InterpolatableTextarea_1.InterPolatableTextArea, { form: form, label: param.name, id: param.name, inputSchema: inputSchema || {}, rows: param.rows }), param.type === 'select' && (0, jsx_runtime_1.jsx)(select_1.Select, { register: form.register, label: param.name, id: param.name, options: param.selectOptions })] }), param.name);
            }), nonDefaultParams.length === 0 && (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "text-xs text-gray-400" }, { children: "No parameters" }))] }));
}
exports.Params = Params;


/***/ }),

/***/ "./dist/components/DataStory/modals/nodeSettingsModal/tabs/index.js":
/*!**************************************************************************!*\
  !*** ./dist/components/DataStory/modals/nodeSettingsModal/tabs/index.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Params = exports.OutputSchemas = exports.InputSchemas = exports.Config = exports.Code = void 0;
var Code_1 = __webpack_require__(/*! ./Code */ "./dist/components/DataStory/modals/nodeSettingsModal/tabs/Code.js");
Object.defineProperty(exports, "Code", ({ enumerable: true, get: function () { return Code_1.Code; } }));
var Config_1 = __webpack_require__(/*! ./Config */ "./dist/components/DataStory/modals/nodeSettingsModal/tabs/Config.js");
Object.defineProperty(exports, "Config", ({ enumerable: true, get: function () { return Config_1.Config; } }));
var InputSchemas_1 = __webpack_require__(/*! ./InputSchemas */ "./dist/components/DataStory/modals/nodeSettingsModal/tabs/InputSchemas.js");
Object.defineProperty(exports, "InputSchemas", ({ enumerable: true, get: function () { return InputSchemas_1.InputSchemas; } }));
var OutputSchemas_1 = __webpack_require__(/*! ./OutputSchemas */ "./dist/components/DataStory/modals/nodeSettingsModal/tabs/OutputSchemas.js");
Object.defineProperty(exports, "OutputSchemas", ({ enumerable: true, get: function () { return OutputSchemas_1.OutputSchemas; } }));
var Params_1 = __webpack_require__(/*! ./Params */ "./dist/components/DataStory/modals/nodeSettingsModal/tabs/Params.js");
Object.defineProperty(exports, "Params", ({ enumerable: true, get: function () { return Params_1.Params; } }));


/***/ }),

/***/ "./dist/components/DataStory/modals/runModal.js":
/*!******************************************************!*\
  !*** ./dist/components/DataStory/modals/runModal.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RunModal = void 0;
const jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
const shallow_1 = __webpack_require__(/*! zustand/shallow */ "../../node_modules/zustand/esm/shallow.js");
const modal_1 = __webpack_require__(/*! ../modal */ "./dist/components/DataStory/modal.js");
const store_1 = __webpack_require__(/*! ../store/store */ "./dist/components/DataStory/store/store.js");
const react_1 = __webpack_require__(/*! react */ "react");
const RunModal = ({ setShowModal }) => {
    const runButtonReference = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        var _a;
        (_a = runButtonReference === null || runButtonReference === void 0 ? void 0 : runButtonReference.current) === null || _a === void 0 ? void 0 : _a.focus();
    }, []);
    const selector = (state) => ({
        onRun: state.onRun,
        serverConfig: state.serverConfig,
    });
    const { onRun, serverConfig } = (0, store_1.useStore)(selector, shallow_1.shallow);
    return ((0, jsx_runtime_1.jsx)(modal_1.Modal, Object.assign({ title: "Run", setShowModal: setShowModal }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex flex-col space-y-2" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "text-xs mb-4 text-gray-500" }, { children: ["Server: ", (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "ml-2 font-mono text-gray-600" }, { children: (() => {
                                if (serverConfig.type === 'SOCKET') {
                                    return serverConfig.url;
                                }
                                if (serverConfig.type === 'JS') {
                                    return 'JS';
                                }
                                return 'Unknown';
                            })() }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex w-full space-x-2 align-end" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ ref: runButtonReference, className: "flex items-center justify-center space-y-4 space-x-2 my-4 font-mono text-xs w-full uppercase px-8 py-1 rounded text-gray-50 bg-blue-500 hover:bg-blue-600", onClick: () => {
                            onRun();
                            setShowModal(false);
                        } }, { children: "Run" })) }))] })) })));
};
exports.RunModal = RunModal;


/***/ }),

/***/ "./dist/components/DataStory/store/store.js":
/*!**************************************************!*\
  !*** ./dist/components/DataStory/store/store.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useStore = void 0;
const zustand_1 = __webpack_require__(/*! zustand */ "../../node_modules/zustand/esm/index.js");
const reactflow_1 = __webpack_require__(/*! reactflow */ "../../node_modules/reactflow/dist/umd/index.js");
const SocketClient_1 = __webpack_require__(/*! ../clients/SocketClient */ "./dist/components/DataStory/clients/SocketClient.js");
const JsClient_1 = __webpack_require__(/*! ../clients/JsClient */ "./dist/components/DataStory/clients/JsClient.js");
const reactFlowToDiagram_1 = __webpack_require__(/*! ../../../reactFlowToDiagram */ "./dist/reactFlowToDiagram.js");
const reactFlowFromDiagram_1 = __webpack_require__(/*! ../../../reactFlowFromDiagram */ "./dist/reactFlowFromDiagram.js");
exports.useStore = (0, zustand_1.create)((set, get) => ({
    // DEFAULTS
    serverConfig: { type: 'SOCKET', url: 'ws://localhost:3100' },
    flowName: 'untitled',
    rfInstance: undefined,
    nodes: [],
    edges: [],
    server: null,
    availableNodes: [],
    openNodeModalId: null,
    // METHODS
    toDiagram: () => {
        const reactFlowObject = get().rfInstance.toObject();
        return (0, reactFlowToDiagram_1.reactFlowToDiagram)(reactFlowObject);
    },
    setServerConfig: (config) => {
        set({ serverConfig: config });
        console.log("TODO: We should reconnect to the server now...");
    },
    setFlowName: (name) => {
        set({
            flowName: name,
        });
    },
    onNodesChange: (changes) => {
        set({
            nodes: (0, reactflow_1.applyNodeChanges)(changes, get().nodes),
        });
    },
    onEdgesChange: (changes) => {
        set({
            edges: (0, reactflow_1.applyEdgeChanges)(changes, get().edges),
        });
    },
    connect: (connection) => {
        const fromHandleId = connection.sourceHandle;
        const toHandleId = connection.targetHandle;
        set({
            edges: (0, reactflow_1.addEdge)(Object.assign(Object.assign({}, connection), { id: `${fromHandleId}--->${toHandleId}` }), get().edges),
        });
        // Calculate input schema for the target node
        const targetNode = get().nodes.find(node => node.id === connection.target);
        if (targetNode) {
            get().calculateInputSchema(targetNode);
        }
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes.map(node => {
                    // When adding a node, deselect all other nodes
                    node.selected = false;
                    return node;
                }), node],
        });
    },
    updateNode: (node) => {
        set({
            nodes: get().nodes.map(existingNode => {
                if (existingNode.id === node.id) {
                    return node;
                }
                return existingNode;
            }),
        });
    },
    setNodes: (nodes) => {
        set({
            nodes: [...nodes],
        });
    },
    refreshNodes: () => {
        console.log(get().nodes);
        set({
            nodes: [...get().nodes],
        });
    },
    setEdges(edges) {
        set({ edges });
    },
    onInit: (options) => {
        set({
            serverConfig: options.server || {
                type: 'SOCKET',
                url: 'ws://localhost:3100'
            }
        });
        set({ rfInstance: options.rfInstance });
        get().onInitServer(get().serverConfig);
        if (options.diagram) {
            const flow = (0, reactFlowFromDiagram_1.reactFlowFromDiagram)(options.diagram);
            get().setNodes(flow.nodes);
            get().setEdges(flow.edges);
        }
        if (options.callback) {
            const run = () => {
                var _a;
                (_a = get().server) === null || _a === void 0 ? void 0 : _a.run(
                // TODO it seems this does not await setNodes/setEdges?
                get().toDiagram());
            };
            options.callback({ run });
        }
    },
    onRun: () => {
        get().server.run(get().toDiagram());
    },
    onInitServer: (serverConfig) => {
        if (serverConfig.type === 'JS') {
            const server = new JsClient_1.JsClient(get().setAvailableNodes, get().updateEdgeCounts, (nodes) => set({ nodes }), (edges) => set({ edges }), 
            // (viewport) => set({ viewport }),
            serverConfig.app);
            set({ server });
            server.init();
        }
        if (serverConfig.type === 'SOCKET') {
            const server = new SocketClient_1.SocketClient(get().setAvailableNodes, get().updateEdgeCounts, (nodes) => set({ nodes }), (edges) => set({ edges }));
            set({ server });
            server.init();
        }
    },
    setAvailableNodes: (availableNodes) => {
        set({ availableNodes });
    },
    updateEdgeCounts: (edgeCounts) => {
        for (const [id, count] of Object.entries(edgeCounts)) {
            const edge = get().edges.find(edge => edge.id === id);
            if (edge)
                edge.label = count;
        }
        const newEdges = get().edges.map((edge) => {
            Object.entries(edgeCounts).forEach(([id, count]) => {
                if (edge.id === id) {
                    edge.label = count;
                    edge.labelBgStyle = {
                        opacity: 0.6,
                    };
                }
            });
            return edge;
        });
        get().setEdges(newEdges);
    },
    setOpenNodeModalId: (id) => {
        set({ openNodeModalId: id });
    },
    onOpen: () => {
        get().server.open("demo.story.json");
        console.log("Opening...");
    },
    open: (nodes, edges) => {
        get().setNodes(nodes);
        get().setEdges(edges);
    },
    onSave: () => {
        let name = get().flowName;
        if (name === "untitled" || name === "" || name === undefined) {
            alert("Please choose a name before saving.");
            return;
        }
        if (!name.endsWith(".json"))
            name = name + ".json";
        get().server.save(name, get().rfInstance.toObject());
        console.log("Saving...");
    },
    traverseNodes: (direction) => {
        const selectedNodes = get().nodes.filter(node => node.selected);
        // If multiple nodes are selected we cant navigate
        if (selectedNodes.length > 1)
            return;
        // If no nodes are selected, select the first node
        if (selectedNodes.length === 0 && get().nodes.length > 0) {
            const firstNode = get().nodes.at(0);
            firstNode.selected = true;
            get().updateNode(firstNode);
            return;
        }
        // // If one node is selected, navigate
        if (selectedNodes.length === 1 && get().nodes.length > 0) {
            const node = selectedNodes.at(0);
            const otherNodes = get().nodes.filter(otherNode => otherNode.id !== node.id);
            // Find the closest node in the direction
            if (direction === 'up') {
                const closestNode = otherNodes.reduce((closest, otherNode) => {
                    if (otherNode.position.y < node.position.y) {
                        if (closest === null)
                            return otherNode;
                        if (otherNode.position.y > closest.position.y)
                            return otherNode;
                    }
                    return closest;
                }, null);
                if (closestNode) {
                    node.selected = false;
                    get().updateNode(node);
                    closestNode.selected = true;
                    get().updateNode(closestNode);
                }
            }
            if (direction === 'down') {
                const closestNode = otherNodes.reduce((closest, otherNode) => {
                    if (otherNode.position.y > node.position.y) {
                        if (closest === null)
                            return otherNode;
                        if (otherNode.position.y < closest.position.y)
                            return otherNode;
                    }
                    return closest;
                }, null);
                if (closestNode) {
                    node.selected = false;
                    get().updateNode(node);
                    closestNode.selected = true;
                    get().updateNode(closestNode);
                }
            }
            if (direction === 'left') {
                const closestNode = otherNodes.reduce((closest, otherNode) => {
                    if (otherNode.position.x < node.position.x) {
                        if (closest === null)
                            return otherNode;
                        if (otherNode.position.x > closest.position.x)
                            return otherNode;
                    }
                    return closest;
                }, null);
                if (closestNode) {
                    node.selected = false;
                    get().updateNode(node);
                    closestNode.selected = true;
                    get().updateNode(closestNode);
                }
            }
            if (direction === 'right') {
                const closestNode = otherNodes.reduce((closest, otherNode) => {
                    if (otherNode.position.x > node.position.x) {
                        if (closest === null)
                            return otherNode;
                        if (otherNode.position.x < closest.position.x)
                            return otherNode;
                    }
                    return closest;
                }, null);
                if (closestNode) {
                    node.selected = false;
                    get().updateNode(node);
                    closestNode.selected = true;
                    get().updateNode(closestNode);
                }
            }
        }
    },
    calculateInputSchema: (node) => {
        const links = get().edges.filter(edge => edge.target === node.id);
        const inputSchemas = {};
        links.forEach(link => {
            var _a, _b, _c;
            const sourceNode = get().nodes.find(node => node.id === link.source);
            if (!sourceNode)
                return;
            const sourcePortName = (_a = sourceNode.data.outputs.find(output => output.id === link.sourceHandle)) === null || _a === void 0 ? void 0 : _a.name;
            const targetPortName = (_b = node.data.inputs.find(input => input.id === link.targetHandle)) === null || _b === void 0 ? void 0 : _b.name;
            if (!sourcePortName || !targetPortName)
                return;
            const outputSchema = (_c = sourceNode.data.outputs.find(output => output.id === link.sourceHandle)) === null || _c === void 0 ? void 0 : _c.schema;
            const inputPort = node.data.inputs.find(input => input.id === link.targetHandle);
            inputPort.schema = outputSchema !== null && outputSchema !== void 0 ? outputSchema : {};
        });
        // node.data.inputSchemas = inputSchemas
        // get().updateNode(node)
    },
}));


/***/ }),

/***/ "./dist/components/DataStory/useHotkeys.js":
/*!*************************************************!*\
  !*** ./dist/components/DataStory/useHotkeys.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useHotkeys = void 0;
const react_1 = __webpack_require__(/*! react */ "react");
function useHotkeys({ nodes, openNodeModalId, setShowRunModal, setOpenNodeModalId, showConfigModal, showRunModal, showAddNodeModal, traverseNodes, setShowAddNodeModal, }) {
    (0, react_1.useEffect)(() => {
        // restore enterkey event listener
        // (it is disabled when the addNodeModal is open)
        if (!showAddNodeModal) {
            window.addEventListener("keydown", handleEnterPress);
        }
        function handleKeyPress(event) {
            // Swedish Mac keyboard 🤷‍♂️
            const shiftR = event.shiftKey && event.code === "KeyR";
            const shiftPlus = event.shiftKey && event.code === "Minus";
            const arrowUp = event.code === "ArrowUp";
            const arrowDown = event.code === "ArrowDown";
            const arrowLeft = event.code === "ArrowLeft";
            const arrowRight = event.code === "ArrowRight";
            const enter = event.code === "Enter";
            // Ensure no modal is already open
            if ([
                openNodeModalId,
                showConfigModal,
                showRunModal,
                showAddNodeModal,
            ].find(Boolean))
                return;
            // Open modal!
            if (shiftR)
                setShowRunModal(true);
            if (shiftPlus) {
                // When opening the add node modal, we want to disable the enter key      
                window.removeEventListener("keydown", handleEnterPress);
                setShowAddNodeModal(true);
            }
            // Open node settings modal
            const openable = (() => {
                const selectedNodes = nodes.filter((node) => node.selected);
                const one = selectedNodes.length === 1;
                if (!one)
                    return null;
                return selectedNodes.at(0);
            })();
            // Select nodes
            if (arrowUp)
                traverseNodes("up");
            if (arrowDown)
                traverseNodes("down");
            if (arrowLeft)
                traverseNodes("left");
            if (arrowRight)
                traverseNodes("right");
        }
        function handleEnterPress(event) {
            // Swedish Mac keyboard 🤷‍♂️
            const enter = event.code === "Enter";
            // Ensure no modal is already open
            if ([
                openNodeModalId,
                showConfigModal,
                showRunModal,
                showAddNodeModal,
            ].find(Boolean))
                return;
            // Open node settings modal
            const openable = (() => {
                const selectedNodes = nodes.filter((node) => node.selected);
                const one = selectedNodes.length === 1;
                if (!one)
                    return null;
                return selectedNodes.at(0);
            })();
            if (enter && openable && !showAddNodeModal)
                setOpenNodeModalId(openable.id);
        }
        // Add the event listener when the component mounts
        window.addEventListener("keyup", handleKeyPress);
        window.addEventListener("keydown", handleEnterPress);
        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener("keyup", handleKeyPress);
            window.removeEventListener("keydown", handleEnterPress);
        };
    }, [
        nodes,
        openNodeModalId,
        setOpenNodeModalId,
        showConfigModal,
        showRunModal,
        showAddNodeModal,
        traverseNodes,
    ]);
}
exports.useHotkeys = useHotkeys;


/***/ }),

/***/ "./dist/components/Node/CustomHandle.js":
/*!**********************************************!*\
  !*** ./dist/components/Node/CustomHandle.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
const react_1 = __webpack_require__(/*! react */ "react");
const reactflow_1 = __webpack_require__(/*! reactflow */ "../../node_modules/reactflow/dist/umd/index.js");
const portIcon_1 = __webpack_require__(/*! ../DataStory/icons/portIcon */ "./dist/components/DataStory/icons/portIcon.js");
const CustomHandle = ({ id, isConnectable, isInput }) => {
    if (isInput)
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex items-left justify-start -ml-3" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "absolute my-0.5 hover:bg-red-500" }, { children: (0, jsx_runtime_1.jsx)(portIcon_1.PortIcon, {}) })), (0, jsx_runtime_1.jsx)(reactflow_1.Handle, { className: "relative bg-red-500", type: "target", position: reactflow_1.Position.Left, style: { opacity: 0, position: "relative", height: 12, width: 12, top: 8, left: 0 }, id: id, isConnectable: isConnectable })] })));
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex w-full items-right justify-end -mx-4" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "absolute my-0.5" }, { children: (0, jsx_runtime_1.jsx)(portIcon_1.PortIcon, {}) })), (0, jsx_runtime_1.jsx)(reactflow_1.Handle, { className: "relative", type: "source", position: reactflow_1.Position.Right, style: { opacity: 0, backgroundColor: "", position: "relative", height: 12, width: 12, top: 8, right: 0 }, id: id, isConnectable: isConnectable })] })));
};
exports["default"] = (0, react_1.memo)(CustomHandle);


/***/ }),

/***/ "./dist/components/Node/DataStoryCommentNodeComponent.js":
/*!***************************************************************!*\
  !*** ./dist/components/Node/DataStoryCommentNodeComponent.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
const react_1 = __webpack_require__(/*! react */ "react");
const store_1 = __webpack_require__(/*! ../DataStory/store/store */ "./dist/components/DataStory/store/store.js");
const shallow_1 = __webpack_require__(/*! zustand/shallow */ "../../node_modules/zustand/esm/shallow.js");
const DataStoryCommentNodeComponent = ({ id, data }) => {
    const selector = (state) => ({
        setOpenNodeModalId: state.setOpenNodeModalId,
    });
    const { setOpenNodeModalId } = (0, store_1.useStore)(selector, shallow_1.shallow);
    return (((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "max-w-xl text-xs font-mono bg-gray-50 text-blue-600 p-4 rounded shadow-xl", onDoubleClick: () => setOpenNodeModalId(id) }, { children: data.params.content.value }))));
};
exports["default"] = (0, react_1.memo)(DataStoryCommentNodeComponent);


/***/ }),

/***/ "./dist/components/Node/DataStoryInputNodeComponent.js":
/*!*************************************************************!*\
  !*** ./dist/components/Node/DataStoryInputNodeComponent.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
const react_1 = __webpack_require__(/*! react */ "react");
const store_1 = __webpack_require__(/*! ../DataStory/store/store */ "./dist/components/DataStory/store/store.js");
const shallow_1 = __webpack_require__(/*! zustand/shallow */ "../../node_modules/zustand/esm/shallow.js");
const reactflow_1 = __webpack_require__(/*! reactflow */ "../../node_modules/reactflow/dist/umd/index.js");
const portIcon_1 = __webpack_require__(/*! ../DataStory/icons/portIcon */ "./dist/components/DataStory/icons/portIcon.js");
const DataStoryInputNodeComponent = ({ id, data, selected }) => {
    const selector = (state) => ({
        setOpenNodeModalId: state.setOpenNodeModalId,
    });
    const { setOpenNodeModalId } = (0, store_1.useStore)(selector, shallow_1.shallow);
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "text-xs" + (selected ? " shadow-xl" : ""), onDoubleClick: () => {
            setOpenNodeModalId(id);
        } }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex w-full items-right justify-end -mx-4" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "rounded-l rounded-full py-1 text-xs font-bold font-mono tracking-wide border border-gray-400 rounded bg-amber-400 text-gray-100 px-2" + (selected ? ' bg-blue-700 shadow-xl' : '') }, { children: [(0, jsx_runtime_1.jsx)("div", { className: "w-24" }), "Demo Input"] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex flex-col items-center justify-center" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "absolute my-0.5 -ml-2" }, { children: (0, jsx_runtime_1.jsx)(portIcon_1.PortIcon, {}) })), (0, jsx_runtime_1.jsx)(reactflow_1.Handle, { className: "relative", type: "source", position: reactflow_1.Position.Right, style: { opacity: 0, backgroundColor: "", position: "relative", height: 12, width: 12, top: 6, right: 6 }, id: id, isConnectable: true })] }))] })) })));
};
exports["default"] = (0, react_1.memo)(DataStoryInputNodeComponent);


/***/ }),

/***/ "./dist/components/Node/DataStoryNodeComponent.js":
/*!********************************************************!*\
  !*** ./dist/components/Node/DataStoryNodeComponent.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
const react_1 = __webpack_require__(/*! react */ "react");
const store_1 = __webpack_require__(/*! ../DataStory/store/store */ "./dist/components/DataStory/store/store.js");
const shallow_1 = __webpack_require__(/*! zustand/shallow */ "../../node_modules/zustand/esm/shallow.js");
const CustomHandle_1 = __importDefault(__webpack_require__(/*! ./CustomHandle */ "./dist/components/Node/CustomHandle.js"));
const DataStoryNodeComponent = ({ id, data, selected }) => {
    const selector = (state) => ({
        setOpenNodeModalId: state.setOpenNodeModalId,
    });
    const { setOpenNodeModalId } = (0, store_1.useStore)(selector, shallow_1.shallow);
    return (((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "text-xs" + (selected ? ' shadow-xl' : ''), onDoubleClick: () => {
            setOpenNodeModalId(id);
        } }, { children: [(0, jsx_runtime_1.jsx)("div", { className: "w-32" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex py-1 text-xs font-bold font-mono tracking-wide border border-gray-400 rounded bg-blue-600 text-gray-100 px-2" + (selected ? ' bg-blue-700 shadow-xl' : '') }, { children: data.label })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex flex-col mx-2" }, { children: [data.inputs.map((input) => ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex border border-gray-300 rounded px-2 py-1 bg-gray-50" }, { children: [(0, jsx_runtime_1.jsx)(CustomHandle_1.default, { id: input.id, isConnectable: true, isInput: true }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "ml-2 w-full text-gray-500" }, { children: input.name }))] }), input.id))), data.outputs.map((output) => ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex pl-3 border border-gray-300 rounded px-2 py-1 bg-gray-50" }, { children: [data.inputs.length > 0 && (0, jsx_runtime_1.jsx)("div", { className: "w-2" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "w-full text-gray-500" }, { children: output.name })), (0, jsx_runtime_1.jsx)(CustomHandle_1.default, { id: output.id, isConnectable: true, isInput: false })] }), output.id)))] }))] }))));
};
exports["default"] = (0, react_1.memo)(DataStoryNodeComponent);


/***/ }),

/***/ "./dist/components/forms/inputs/interpolatable/InterpolatableTextarea.js":
/*!*******************************************************************************!*\
  !*** ./dist/components/forms/inputs/interpolatable/InterpolatableTextarea.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InterPolatableTextArea = void 0;
const jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
const react_1 = __webpack_require__(/*! react */ "react");
const InterPolatableTextArea = ({ form, label, rows, id, inputSchema }) => {
    const [i] = (0, react_1.useState)('');
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex flex-col" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "mt-2 mb-1 text-xs text-gray-400" }, { children: label })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex w-full" }, { children: [(0, jsx_runtime_1.jsx)("textarea", Object.assign({ rows: rows, placeholder: "", className: "w-full bg-white text-xs text-gray-500 px-2 py-1 border border-blue-200" }, form.register(id))), (0, jsx_runtime_1.jsxs)("select", Object.assign({ value: i, onChange: (e) => {
                            form.setValue(id, form.getValues(id) + '${' + e.target.value + '}');
                        }, className: "ml-1 max-h-6 border border-gray-300 text-xs w-6 text-gray-400 bg-gray-300 hover:border-gray-400 focus:outline-none appearance-none" }, { children: [(0, jsx_runtime_1.jsx)("option", {}), Object.keys(inputSchema).map((key) => {
                                return (0, jsx_runtime_1.jsx)("option", Object.assign({ className: "text-gray-400" }, { children: key }), key);
                            })] }))] }))] }), id));
};
exports.InterPolatableTextArea = InterPolatableTextArea;


/***/ }),

/***/ "./dist/components/forms/inputs/number.js":
/*!************************************************!*\
  !*** ./dist/components/forms/inputs/number.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Number = void 0;
const jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
const Number = ({ register, label, id }) => {
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex flex-col" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "mt-2 mb-1 text-xs text-gray-400" }, { children: label })), (0, jsx_runtime_1.jsx)("input", Object.assign({ type: "number", className: "w-full bg-white text-xs text-gray-400 px-2 py-1 border rounded border-blue-200" }, register(id)))] }), id));
};
exports.Number = Number;


/***/ }),

/***/ "./dist/components/forms/inputs/select.js":
/*!************************************************!*\
  !*** ./dist/components/forms/inputs/select.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Select = void 0;
const jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
const Select = ({ register, label, id, options }) => {
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex flex-col" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "mt-2 mb-1 text-xs text-gray-400" }, { children: label })), (0, jsx_runtime_1.jsx)("select", Object.assign({ className: "w-full text-xs text-gray-400 px-2 py-1 border rounded border-blue-200" }, register(id), { children: options.map((option) => {
                    return ((0, jsx_runtime_1.jsx)("option", Object.assign({ value: option, className: "text-gray-400" }, { children: option }), option));
                }) }))] }), id));
};
exports.Select = Select;


/***/ }),

/***/ "./dist/components/forms/inputs/text.js":
/*!**********************************************!*\
  !*** ./dist/components/forms/inputs/text.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Text = void 0;
const jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ "../../node_modules/react/jsx-runtime.js");
const Text = ({ register, label, id }) => {
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex flex-col" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "mt-2 mb-1 text-xs text-gray-400" }, { children: label })), (0, jsx_runtime_1.jsx)("textarea", Object.assign({ rows: 1, className: "w-full bg-white text-xs text-gray-400 px-2 py-1 border rounded border-blue-200" }, register(id)))] }), id));
};
exports.Text = Text;


/***/ }),

/***/ "./dist/reactFlowFromDiagram.js":
/*!**************************************!*\
  !*** ./dist/reactFlowFromDiagram.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.reactFlowFromDiagram = void 0;
const reactFlowFromDiagram = (diagram) => {
    return {
        nodes: diagram.nodes.map(node => {
            var _a, _b;
            return {
                "width": 128,
                "height": 52,
                "id": node.id,
                "position": {
                    "x": node.position.x,
                    "y": node.position.y
                },
                data: {
                    params: node.params,
                    "computer": node.type,
                    "label": (((_b = (_a = node === null || node === void 0 ? void 0 : node.params) === null || _a === void 0 ? void 0 : _a.label) === null || _b === void 0 ? void 0 : _b.value) || node.type),
                    "inputs": node.inputs.map(input => {
                        return {
                            "id": `${node.id}.${input.name}`,
                            "name": input.name,
                            "schema": input.schema,
                        };
                    }),
                    "outputs": node.outputs.map(output => {
                        return {
                            "id": `${node.id}.${output.name}`,
                            "name": output.name,
                            "schema": output.schema,
                        };
                    }),
                },
                type: "dataStoryNodeComponent",
            };
        }),
        edges: diagram.links.map(link => {
            return {
                "sourceHandle": link.sourcePortId,
                "targetHandle": link.targetPortId,
                "source": diagram.nodes.find(node => node.outputs.find(output => output.id === link.sourcePortId) !== undefined).id,
                "target": diagram.nodes.find(node => node.inputs.find(input => input.id === link.targetPortId) !== undefined).id,
                "id": link.id,
            };
        }),
        "viewport": {
            "x": 0,
            "y": 0,
            "zoom": 1
        }
    };
};
exports.reactFlowFromDiagram = reactFlowFromDiagram;


/***/ }),

/***/ "./dist/reactFlowToDiagram.js":
/*!************************************!*\
  !*** ./dist/reactFlowToDiagram.js ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.reactFlowToDiagram = exports.reactFlowNodeToDiagramNode = void 0;
const core_1 = __webpack_require__(/*! @data-story/core */ "../core/dist/index.js");
const reactFlowNodeToDiagramNode = (flowNode) => {
    return {
        id: flowNode.id,
        type: flowNode.data.computer,
        inputs: flowNode.data.inputs.map(input => {
            var _a;
            return {
                id: input.id,
                name: (_a = input === null || input === void 0 ? void 0 : input.id) === null || _a === void 0 ? void 0 : _a.split(".").pop(),
                schema: input.schema,
            };
        }),
        outputs: flowNode.data.outputs.map(output => {
            var _a;
            return {
                id: output.id,
                name: (_a = output === null || output === void 0 ? void 0 : output.id) === null || _a === void 0 ? void 0 : _a.split(".").pop(),
                schema: output.schema,
            };
        }),
        params: flowNode.data.params || {},
        position: flowNode.position,
    };
};
exports.reactFlowNodeToDiagramNode = reactFlowNodeToDiagramNode;
const reactFlowToDiagram = (flow) => {
    const nodes = flow.nodes.map(flowNode => {
        return {
            id: flowNode.id,
            type: flowNode.data.computer,
            inputs: flowNode.data.inputs.map(input => {
                var _a;
                return {
                    id: input.id,
                    name: (_a = input === null || input === void 0 ? void 0 : input.id) === null || _a === void 0 ? void 0 : _a.split(".").pop(),
                    schema: input.schema,
                };
            }),
            outputs: flowNode.data.outputs.map(output => {
                var _a;
                return {
                    id: output.id,
                    name: (_a = output === null || output === void 0 ? void 0 : output.id) === null || _a === void 0 ? void 0 : _a.split(".").pop(),
                    schema: output.schema,
                };
            }),
            params: flowNode.data.params || {},
            position: flowNode.position,
        };
    });
    const links = flow.edges.map(edge => {
        return {
            id: edge.id,
            sourcePortId: edge.sourceHandle,
            targetPortId: edge.targetHandle
        };
    });
    return new core_1.Diagram(nodes, links);
};
exports.reactFlowToDiagram = reactFlowToDiagram;


/***/ }),

/***/ "../../node_modules/zustand/esm/vanilla.mjs":
/*!**************************************************!*\
  !*** ../../node_modules/zustand/esm/vanilla.mjs ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createStore: () => (/* binding */ createStore),
/* harmony export */   "default": () => (/* binding */ vanilla)
/* harmony export */ });
const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object") ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const destroy = () => {
    if (( false ? 0 : void 0) !== "production") {
      console.warn(
        "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
      );
    }
    listeners.clear();
  };
  const api = { setState, getState, subscribe, destroy };
  state = createState(setState, getState, api);
  return api;
};
const createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;
var vanilla = (createState) => {
  if (( false ? 0 : void 0) !== "production") {
    console.warn(
      "[DEPRECATED] Default export is deprecated. Instead use import { createStore } from 'zustand/vanilla'."
    );
  }
  return createStore(createState);
};




/***/ })

/******/ 	});
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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;
/*!***********************!*\
  !*** ./dist/index.js ***!
  \***********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.stuffFromUi = exports.Cat = exports.CatWrapper = exports.DataStory = void 0;
var DataStory_1 = __webpack_require__(/*! ./components/DataStory */ "./dist/components/DataStory/index.js");
Object.defineProperty(exports, "DataStory", ({ enumerable: true, get: function () { return DataStory_1.DataStory; } }));
var CatWrapper_1 = __webpack_require__(/*! ./components/Cat/CatWrapper */ "./dist/components/Cat/CatWrapper.js");
Object.defineProperty(exports, "CatWrapper", ({ enumerable: true, get: function () { return CatWrapper_1.CatWrapper; } }));
var Cat_1 = __webpack_require__(/*! ./components/Cat/Cat */ "./dist/components/Cat/Cat.js");
Object.defineProperty(exports, "Cat", ({ enumerable: true, get: function () { return Cat_1.Cat; } }));
exports.stuffFromUi = 123;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=bundle.js.map