"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Builder_1 = require("./Builder");
const Util_1 = require("./Util");
function form() {
    return new Builder_1.FormBuilder();
}
exports.form = form;
function subform(name) {
    return new Builder_1.NestFormBuilder(name).batchparser(Util_1.splitParameter);
}
exports.subform = subform;
function str(name) {
    return new Builder_1.PrimitiveFieldBuilder(name, String).default("").batchparser(Util_1.splitParameter);
}
exports.str = str;
function num(name) {
    return new Builder_1.PrimitiveFieldBuilder(name, Number).default(0).batchparser(Util_1.splitParameter);
}
exports.num = num;
function bool(name) {
    return new Builder_1.PrimitiveFieldBuilder(name, Boolean).default(true).batchparser(Util_1.splitParameter);
}
exports.bool = bool;
// form()
//   .parser(()=>"")
//   .fields(
//     str("name").default(()=>"name").shortcut("n"),
//     str("age").default(()=>"name").shortcut("n"),
//
//     subform("another").fields(
//       str("some")
//     )
// )
//# sourceMappingURL=Syntax.js.map