"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exception_1 = require("./Exception");
function returnInput(value) {
    return value;
}
function returnNull() {
    return null;
}
class FormManager {
    constructor() {
        this.id_form_map = new Map();
    }
    register(id, form) {
        this.id_form_map.set(id, this._compileForm(form.create()));
    }
    get(formId) {
        if (this.id_form_map.has(formId)) {
            return this.id_form_map.get(formId);
        }
        else {
            throw new Exception_1.FormNotRegisterError(`form: ${formId} not found`);
        }
    }
    _compileForm(form) {
        let prefix_field_map = new Map();
        let name_field_map = new Map();
        let compiledForm = {
            parser: form.parser || returnInput,
            batchparser: form.batchparser || returnInput,
            post: form.post || returnInput,
            default: form.default || returnNull,
            prefix_field_map,
            name_field_map,
            children: form.children.map(field => {
                if (field.kind === "primitive" || field.kind === "ref") {
                    name_field_map.set(field.key, field);
                    if (field.shortcut) {
                        prefix_field_map.set(field.shortcut, field);
                    }
                    return field;
                }
                else {
                    let compiledField = { ...field };
                    compiledField.def = this._compileForm(compiledField.def);
                    name_field_map.set(compiledField.key, compiledField);
                    if (compiledField.shortcut) {
                        prefix_field_map.set(compiledField.shortcut, compiledField);
                    }
                    return compiledField;
                }
            })
        };
        return compiledForm;
    }
}
exports.FormManager = FormManager;
//# sourceMappingURL=FormManager.js.map