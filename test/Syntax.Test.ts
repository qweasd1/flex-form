import {bool, form, num, str, subform} from "../src/syntax/Syntax";

it('form: empty', function () {
  expect(form().create()).toEqual({
    children: []
  })
});

it('form: with fields', function () {
  const batchparser = (code) => [true]
  const formBatchparser = (code) => []
  expect(form().batchparser(formBatchparser).fields(
    str("some"),
    num("other").default(1),
    bool("last").default(true).batchparser(batchparser)
  ).create()).toEqual({
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
  })
});

it('form: with nest fields', function () {
  const batchparser = (code) => [true]
  const formBatchparser = (code) => []
  expect(form().fields(
    subform("a").ref("other"),
    subform("b").fields(
      str("f1"),
      num("f2")
    ).shortcut("b")
  ).create()).toEqual({
    children: [
      {
        key: "a",
        kind: "ref",
        ref: "other"
      },
      {
        key:"b",
        shortcut:"b",
        kind:"nest",
        def:{
          children:[
            {
              key:"f1",
              kind:"primitive",
              type:String
            },
            {
              key:"f2",
              kind:"primitive",
              type:Number
            }
          ]
        }
      }
    ]
  })
});