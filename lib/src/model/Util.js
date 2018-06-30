"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isString(value) {
    return typeof value === "string";
}
exports.isString = isString;
function isFunction(value) {
    return typeof value === "function";
}
exports.isFunction = isFunction;
function isArray(value) {
    return Array.isArray(value);
}
exports.isArray = isArray;
function isObject(value) {
    return typeof value === "object" && !Array.isArray(value);
}
exports.isObject = isObject;
//# sourceMappingURL=Util.js.map