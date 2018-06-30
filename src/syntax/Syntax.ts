import {BatchParserFn, Default, Form, FormField, ParserFn, PostFn, PrimitiveField} from "../interface/Form";
import {
  FormBuilder, IFormBuilder, INestFormFieldBuilder, IPrimitiveFieldBuilder, NestFormBuilder,
  PrimitiveFieldBuilder
} from "./Builder";
import {splitParameter} from "./Util";


export function form():IFormBuilder{
  return new FormBuilder()
}

export function subform(name:string):INestFormFieldBuilder{
  return new NestFormBuilder(name).batchparser(splitParameter)
}

export function str(name:string):IPrimitiveFieldBuilder {
  return new PrimitiveFieldBuilder(name,String).default("").batchparser(splitParameter)
}

export function num(name:string):IPrimitiveFieldBuilder {
  return new PrimitiveFieldBuilder(name,Number).default(0).batchparser(splitParameter)
}

export function bool(name:string):IPrimitiveFieldBuilder {
  return new PrimitiveFieldBuilder(name,Boolean).default(true).batchparser(splitParameter)
}


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

