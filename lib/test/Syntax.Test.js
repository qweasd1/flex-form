"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Syntax_1 = require("../src/syntax/Syntax");
it('form: empty', function () {
    expect(Syntax_1.form().create()).toEqual({
        children: []
    });
});
it('form: with fields', function () {
    const batchparser = (code) => [true];
    const formBatchparser = (code) => [];
    expect(Syntax_1.form().batchparser(formBatchparser).fields(Syntax_1.str("some"), Syntax_1.num("other").default(1), Syntax_1.bool("last").default(true).batchparser(batchparser)).create()).toEqual({
        batchparser: formBatchparser,
        children: [
            {
                key: "some",
                kind: "primitive",
                type: String
            },
            {
                key: "other",
                kind: "primitive",
                type: Number,
                default: 1
            },
            {
                key: "last",
                kind: "primitive",
                type: Boolean,
                batchparser,
                default: true
            }
        ]
    });
});
it('form: with nest fields', function () {
    const batchparser = (code) => [true];
    const formBatchparser = (code) => [];
    expect(Syntax_1.form().fields(Syntax_1.subform("a").ref("other"), Syntax_1.subform("b").fields(Syntax_1.str("f1"), Syntax_1.num("f2")).shortcut("b")).create()).toEqual({
        children: [
            {
                key: "a",
                kind: "ref",
                ref: "other"
            },
            {
                key: "b",
                shortcut: "b",
                kind: "nest",
                def: {
                    children: [
                        {
                            key: "f1",
                            kind: "primitive",
                            type: String
                        },
                        {
                            key: "f2",
                            kind: "primitive",
                            type: Number
                        }
                    ]
                }
            }
        ]
    });
});
//# sourceMappingURL=Syntax.Test.js.map