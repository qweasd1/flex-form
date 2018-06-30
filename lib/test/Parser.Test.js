"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parser_1 = require("../src/syntax/Parser");
it('FormShortcutParser （with start shorthand）', function () {
    expect(Parser_1.FormShortcutParser("ijk -n name -o -w -q=some -other")).toEqual({
        i: null,
        j: null,
        k: null,
        n: "name",
        o: null,
        w: null,
        q: "some",
        other: null
    });
});
it('FormShortcutParser (without start shorthand)', function () {
    expect(Parser_1.FormShortcutParser("-n name")).toEqual({
        i: null,
        j: null,
        k: null,
        n: "name"
    });
});
//# sourceMappingURL=Parser.Test.js.map