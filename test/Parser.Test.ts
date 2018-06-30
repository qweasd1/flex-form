import {FormShortcutParser} from "../src/syntax/Parser";

it('FormShortcutParser （with start shorthand）', function () {
  expect(FormShortcutParser("ijk -n name -o -w -q=some -other")).toEqual({
    i:null,
    j:null,
    k:null,
    n:"name",
    o:null,
    w:null,
    q:"some",
    other:null
  })
});

it('FormShortcutParser (without start shorthand)', function () {
  expect(FormShortcutParser("-n name")).toEqual({
    i:null,
    j:null,
    k:null,
    n:"name"
  })
});