"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
