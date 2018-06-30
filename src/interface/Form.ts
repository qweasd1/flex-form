import {IBuildContext} from "./IBuildContext";

export type ParserFn = (code: string, context: IBuildContext) => any
export type PostFn = (code: string, context: IBuildContext) => any
export type BatchParserFn = (code: string, context: IBuildContext) => any[]
export type Default = any | ((context:IBuildContext)=>any)

export interface Form {

  // parse shortcut literal to object
  parser?: ParserFn

  // parse shortcut literal to array of object (if batch parser not provided, we can use a default one)
  batchparser?: BatchParserFn

  // before parse any child forms
  // pre: (value: any, context: any) => any

  post?: PostFn

  // to get the default value for this form
  default?: Default

  children: Field[]
}

export interface CompiledForm extends Form {
  prefix_field_map:Map<string,Field>
  name_field_map:Map<string,Field>
}



export interface FormField {
  key: string
  isArray?: boolean
  shortcut?: string
}

export interface FormRefField extends FormField {
  // id of referenced form
  ref: string,
  kind:"ref"
}

export interface NestFormField extends FormField {
  // definition
  def: Form
  kind:"nest"
}


export interface PrimitiveField extends FormField {
  type: Function // can be Boolean, String, Number, default to be string
  default?:Default
  batchparser?:(code: string, context: IBuildContext) => any[],
  kind: "primitive"
}


export type Field = FormRefField | NestFormField | PrimitiveField



