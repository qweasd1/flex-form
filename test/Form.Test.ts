import {Form} from "../src/interface/Form";
import {IBuildContext} from "../src/interface/IBuildContext";
import {FormManager} from "../src/model/FormManager";
import {FormResolver} from "../src/model/FormResolver";
import {IFormManager} from "../src/interface/IFormManager";
import {IFormResolver} from "../src/interface/IFormResolver";
import {form, num, str, subform} from "../src/syntax/Syntax";


let manager: IFormManager
let formResolver: IFormResolver

beforeEach(() => {
  manager = new FormManager()
  formResolver = new FormResolver(manager)

})

it('single field ', function () {
  manager.register("t", form().parser(() => ({a: null})).fields(
    str("a").default("some")
  ))
  expect(formResolver.build("t", "ab", {})).toEqual({a: "some"})
});


it('ref subform ', function () {

  manager.register("t", form().parser(() => ({sub: null})).fields(
    subform("sub").ref("t2")
  ))

  manager.register("t2", form().parser(() => ({a: null})).fields(
    str("a").default("some")
  ))

  expect(formResolver.build("t", {sub:"aa"}, {})).toEqual({
    sub: {
      a: "some"
    }
  })
});

it('nest subform ', function () {

  manager.register("t", form().parser(() => ({sub: null})).fields(
    subform("sub").parser(() => ({a: null})).fields(
    str("a").default("some")
  )
  ))

  expect(formResolver.build("t", {sub:"aa"}, {})).toEqual({
    sub: {
      a: "some"
    }
  })
});

it('primitive array', function () {

  manager.register("t", form().fields(
    str("sub").array,
    num("sub2").array
  ))

  expect(formResolver.build("t", {sub:`aa 'bb  dd' "cc"`,sub2:"1 2 323"}, {})).toEqual({
    sub: ["aa","bb  dd", "cc"],
    sub2:[1,2,323]
  })
});

it('form array (expand batch literal)', function () {

  manager.register("t", form().fields(
    subform("sub").array.parser((value)=>({name:value})).fields(
      str("name")
    )

  ))

  expect(formResolver.build("t", {sub:`aa 'bb  dd' "cc"`}, {})).toEqual({
    sub: [
      {
        name:"aa"
      },
      {
        name:"bb  dd"
      },
      {
        name:"cc"
      }
    ],
  })
});

it('form array (expand item literal)', function () {

  manager.register("t", form().fields(
    subform("sub").array.parser((value)=>({name:value})).fields(
      str("name")
    )

  ))

  expect(formResolver.build("t", {sub:[
      {
        name:"aa",
      },
      `"bb dd" cc`
    ]}, {})).toEqual({
    sub: [
      {
        name:"aa"
      },
      {
        name:"bb dd"
      },
      {
        name:"cc"
      }
    ],
  })
});






