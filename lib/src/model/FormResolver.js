"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = require("./Util");
const Exception_1 = require("./Exception");
class FormResolver {
    constructor(formManager) {
        this.formManager = formManager;
    }
    build(fomrId, input, context) {
        const form = this.formManager.get(fomrId);
        let result = input;
        result = this._recursiveBuildForm(form, result, { ...context, form });
        return result;
    }
    _getForm(formRef) {
        switch (formRef.kind) {
            case "ref":
                return this.formManager.get(formRef.ref);
            case "nest":
                return formRef.def;
        }
    }
    _recursiveBuildForm(form, result, context) {
        context.form = form;
        // Phase-0 if input is null, populate with default, if no default, directly return null
        if (result === undefined || result === null) {
            if (form.default === undefined) {
                return result;
            }
            else {
                result = this._calculateValue(form.default, result, context);
            }
        }
        // Phase-1 if the input is string, first parse it
        if (Util_1.isString(result) && form.parser) {
            result = form.parser(result, context);
        }
        if (!Util_1.isObject(result)) {
            return result;
        }
        // Phase-2 populate prefix to full name
        Object.keys(result).forEach((key) => {
            if (form.prefix_field_map.has(key)) {
                const field = form.prefix_field_map.get(key);
                const value = result[key];
                this._replacePrefix(result, key, field.key, value);
            }
        });
        // Phase-3 populate child forms
        Object.keys(result).forEach((fullname) => {
            if (form.name_field_map.has(fullname)) {
                const field = form.name_field_map.get(fullname);
                let value = result[fullname];
                if (field.kind !== "primitive") {
                    if (field.isArray) {
                        result[fullname] = this._recursiveBuildFormArray(this._getForm(field), value, context);
                    }
                    else {
                        const childForm = this._getForm(field);
                        value = this._calculateValue(childForm.default, value, context);
                        result[fullname] = this._recursiveBuildForm(childForm, value, context);
                    }
                }
                else {
                    if (field.isArray) {
                        result[fullname] = this._buildPrimitiveArray(field, value, context);
                    }
                    else {
                        if (value !== null) {
                            result[fullname] = field.type(value);
                        }
                        else {
                            result[fullname] = this._calculateValue(field.default, value, context);
                        }
                    }
                }
            }
        });
        // Phase-4 trigger post
        result = form.post(result, context);
        return result;
    }
    _recursiveBuildFormArray(form, result, context) {
        context.form = form;
        let flattened_result = null;
        if (Util_1.isString(result)) {
            flattened_result = form.batchparser(result, context);
        }
        else {
            if (!Util_1.isArray(result)) {
                throw new Exception_1.FormBuildError(`can't build form array from: ${result}`);
            }
            // check if there are elements is string
            flattened_result = [];
            result.forEach((item) => {
                if (Util_1.isString(item)) {
                    flattened_result.push(...form.batchparser(item, context));
                }
                else {
                    flattened_result.push(item);
                }
            });
        }
        return flattened_result.map((item) => {
            return this._recursiveBuildForm(form, item, context);
        });
    }
    _buildPrimitiveArray(field, result, context) {
        if (Util_1.isString(result) && field.batchparser) {
            result = field.batchparser(result, context).map((item) => {
                return field.type(item);
            });
        }
        else {
            result = [field.type(result)];
        }
        return result;
    }
    _replacePrefix(result, prefix, fullname, value) {
        delete result[prefix];
        result[fullname] = value;
    }
    _calculateValue(defaultValue, value, context) {
        if (value !== null) {
            return value;
        }
        else {
            if (Util_1.isFunction(defaultValue)) {
                return defaultValue(context);
            }
            else {
                return defaultValue;
            }
        }
    }
}
exports.FormResolver = FormResolver;
//# sourceMappingURL=FormResolver.js.map