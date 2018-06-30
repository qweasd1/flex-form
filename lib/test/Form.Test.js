"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FormManager_1 = require("../src/model/FormManager");
const FormResolver_1 = require("../src/model/FormResolver");
const Syntax_1 = require("../src/syntax/Syntax");
let manager;
let formResolver;
beforeEach(() => {
    manager = new FormManager_1.FormManager();
    formResolver = new FormResolver_1.FormResolver(manager);
});
it('single field ', function () {
    manager.register("t", Syntax_1.form().parser(() => ({ a: null })).fields(Syntax_1.str("a").default("some")));
    expect(formResolver.build("t", "ab", {})).toEqual({ a: "some" });
});
it('ref subform ', function () {
    manager.register("t", Syntax_1.form().parser(() => ({ sub: null })).fields(Syntax_1.subform("sub").ref("t2")));
    manager.register("t2", Syntax_1.form().parser(() => ({ a: null })).fields(Syntax_1.str("a").default("some")));
    expect(formResolver.build("t", { sub: "aa" }, {})).toEqual({
        sub: {
            a: "some"
        }
    });
});
it('nest subform ', function () {
    manager.register("t", Syntax_1.form().parser(() => ({ sub: null })).fields(Syntax_1.subform("sub").parser(() => ({ a: null })).fields(Syntax_1.str("a").default("some"))));
    expect(formResolver.build("t", { sub: "aa" }, {})).toEqual({
        sub: {
            a: "some"
        }
    });
});
it('primitive array', function () {
    manager.register("t", Syntax_1.form().fields(Syntax_1.str("sub").array, Syntax_1.num("sub2").array));
    expect(formResolver.build("t", { sub: `aa 'bb  dd' "cc"`, sub2: "1 2 323" }, {})).toEqual({
        sub: ["aa", "bb  dd", "cc"],
        sub2: [1, 2, 323]
    });
});
it('form array (expand batch literal)', function () {
    manager.register("t", Syntax_1.form().fields(Syntax_1.subform("sub").array.parser((value) => ({ name: value })).fields(Syntax_1.str("name"))));
    expect(formResolver.build("t", { sub: `aa 'bb  dd' "cc"` }, {})).toEqual({
        sub: [
            {
                name: "aa"
            },
            {
                name: "bb  dd"
            },
            {
                name: "cc"
            }
        ],
    });
});
it('form array (expand item literal)', function () {
    manager.register("t", Syntax_1.form().fields(Syntax_1.subform("sub").array.parser((value) => ({ name: value })).fields(Syntax_1.str("name"))));
    expect(formResolver.build("t", { sub: [
            {
                name: "aa",
            },
            `"bb dd" cc`
        ] }, {})).toEqual({
        sub: [
            {
                name: "aa"
            },
            {
                name: "bb dd"
            },
            {
                name: "cc"
            }
        ],
    });
});
//# sourceMappingURL=Form.Test.js.map