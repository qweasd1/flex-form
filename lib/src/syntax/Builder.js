"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FormBuilder {
    constructor() {
        this.context = {};
        this.childrenBuilder = [];
    }
    parser(value) {
        this.context.parser = value;
        return this;
    }
    post(value) {
        this.context.post = value;
        return this;
    }
    fields(...childBuilders) {
        this.childrenBuilder.push(...childBuilders);
        return this;
    }
    default(value) {
        this.context.default = value;
        return this;
    }
    batchparser(value) {
        this.context.batchparser = value;
        return this;
    }
    create() {
        this.context.children = this.childrenBuilder.map(x => x.create());
        return this.context;
    }
    attach(plugin) {
        plugin(this);
        return this;
    }
}
exports.FormBuilder = FormBuilder;
class PrimitiveFieldBuilder {
    constructor(key, type) {
        this.context = {};
        this.context.key = key;
        this.context.type = type;
        this.context.kind = "primitive";
    }
    get array() {
        this.context.isArray = true;
        return this;
    }
    shortcut(value) {
        this.context.shortcut = value;
        return this;
    }
    default(value) {
        this.context.default = value;
        return this;
    }
    batchparser(value) {
        this.context.batchparser = value;
        return this;
    }
    create() {
        return this.context;
    }
    attach(plugin) {
        plugin(this);
        return this;
    }
}
exports.PrimitiveFieldBuilder = PrimitiveFieldBuilder;
class NestFormBuilder {
    constructor(key) {
        this._formBuilder = new FormBuilder();
        this.context = {};
        this.context.kind = "nest";
        this.context.key = key;
    }
    get array() {
        this.context.isArray = true;
        return this;
    }
    shortcut(value) {
        this.context.shortcut = value;
        return this;
    }
    ref(formId) {
        this.context.kind = "ref";
        this.context.ref = formId;
        return this;
    }
    default(value) {
        this._formBuilder.default(value);
        return this;
    }
    batchparser(value) {
        this._formBuilder.batchparser(value);
        return this;
    }
    create() {
        if (this.context.kind === "nest") {
            this.context.def = this._formBuilder.create();
        }
        return this.context;
    }
    attach(plugin) {
        plugin(this);
        return this;
    }
    parser(value) {
        this._formBuilder.parser(value);
        return this;
    }
    post(value) {
        this._formBuilder.post(value);
        return this;
    }
    fields(...childBuilders) {
        this._formBuilder.fields(...childBuilders);
        return this;
    }
}
exports.NestFormBuilder = NestFormBuilder;
const defaultStringBatchparser = () => {
};
//# sourceMappingURL=Builder.js.map