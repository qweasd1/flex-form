"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = require("../src/syntax/Util");
describe("splitParameter", () => {
    it('plain text', function () {
        expect(Util_1.splitParameter("abc bcd cde")).toEqual(["abc", "bcd", "cde"]);
    });
    it('single quote text', function () {
        expect(Util_1.splitParameter("abc 'bcd' cde")).toEqual(["abc", "bcd", "cde"]);
    });
    it('double quote text', function () {
        expect(Util_1.splitParameter('abc "bcd" cde')).toEqual(["abc", "bcd", "cde"]);
    });
    it('escape text', function () {
        expect(Util_1.splitParameter(`abc '\\'bcd\\"' cde`)).toEqual(["abc", `'bcd"`, "cde"]);
    });
    it('cmd line like', function () {
        expect(Util_1.splitParameter(` -t  -i  --some  good `)).toEqual(["-t", `-i`, "--some", "good"]);
    });
});
//# sourceMappingURL=Util.Test.js.map