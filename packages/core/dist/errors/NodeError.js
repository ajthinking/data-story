"use strict";
class CustomError extends Error {
    constructor(message, extraInfo) {
        super(message);
        this.name = 'CustomError';
        this.code = 400;
        this.extraInfo = extraInfo; // Add an extra property
    }
}
