import {BatchParserFn, Default, FormField, Form, ParserFn, PostFn, PrimitiveField} from "../interface/Form";

export interface IBaseFieldBuilder<TBuilder, TField> {
  default(value: Default): TBuilder

  batchparser(value: BatchParserFn): TBuilder

  create(): TField

  // for encapsulate field logic
  attach(plugin: (builder: TBuilder) => void): TBuilder
}

export interface IBaseFormFieldBuilder<TBuilder, TField> extends IBaseFieldBuilder<TBuilder, TField> {
  parser(value: ParserFn): TBuilder

  post(value: PostFn): TBuilder

  fields(...childBuilders: (INestFormFieldBuilder | IPrimitiveFieldBuilder)[]): TBuilder
}

export interface IFormBuilder extends IBaseFormFieldBuilder<IFormBuilder, Form> {

}

export interface IBaseNestFormFieldBuilder<TBuilder, TField> extends IBaseFieldBuilder<TBuilder, TField> {
  array: TBuilder
  shortcut(value: string):TBuilder
}

export interface INestFormFieldBuilder extends IBaseNestFormFieldBuilder<INestFormFieldBuilder, FormField> {
  parser(value: ParserFn): INestFormFieldBuilder

  post(value: PostFn): INestFormFieldBuilder

  fields(...childBuilders: (INestFormFieldBuilder | IPrimitiveFieldBuilder)[]): INestFormFieldBuilder
  ref(formId:string):INestFormFieldBuilder
}

export interface IPrimitiveFieldBuilder extends IBaseNestFormFieldBuilder<IPrimitiveFieldBuilder, PrimitiveField> {

}

export class FormBuilder implements FormBuilder {

  context:any = {}
  childrenBuilder = []

  constructor(){

  }

  parser(value: ParserFn): FormBuilder {
    this.context.parser = value
    return this
  }

  post(value: PostFn): FormBuilder {
    this.context.post = value
    return this
  }

  fields(...childBuilders: (INestFormFieldBuilder | IPrimitiveFieldBuilder)[]): FormBuilder {
    this.childrenBuilder.push(...childBuilders)
    return this
  }

  default(value: Default): FormBuilder {
    this.context.default = value
    return this
  }


  batchparser(value: BatchParserFn): FormBuilder {
    this.context.batchparser = value
    return this
  }

  create(): Form {
    this.context.children = this.childrenBuilder.map(x=>x.create())
    return this.context;
  }

  attach(plugin: (builder: FormBuilder) => void): FormBuilder {
    plugin(this)
    return this;
  }

}

export class PrimitiveFieldBuilder implements IPrimitiveFieldBuilder{

  context:any = {}

  constructor(key:string, type:Function){
    this.context.key = key
    this.context.type = type
    this.context.kind = "primitive"
  }

  get array (): IPrimitiveFieldBuilder{
    this.context.isArray = true
    return this
  }

  shortcut(value: string): IPrimitiveFieldBuilder {
    this.context.shortcut = value
    return this;
  }

  default(value: Default): IPrimitiveFieldBuilder {
    this.context.default = value
    return this;
  }

  batchparser(value: BatchParserFn): IPrimitiveFieldBuilder {
    this.context.batchparser = value
    return this;
  }

  create(): PrimitiveField {
    return this.context;
  }

  attach(plugin: (builder: IPrimitiveFieldBuilder) => void): IPrimitiveFieldBuilder {
    plugin(this)
    return this;
  }

}

export class NestFormBuilder implements INestFormFieldBuilder {


  private _formBuilder:FormBuilder = new FormBuilder()
  context:any = {}

  constructor(key:string){
    this.context.kind = "nest"
    this.context.key = key
  }

  get array (): INestFormFieldBuilder{
    this.context.isArray = true
    return this
  }

  shortcut(value: string): INestFormFieldBuilder {
    this.context.shortcut = value
    return this;
  }
  ref(formId: string): INestFormFieldBuilder {
    this.context.kind = "ref"
    this.context.ref = formId
    return this
  }


  default(value: Default): INestFormFieldBuilder {
    this._formBuilder.default(value)
    return this
  }

  batchparser(value: BatchParserFn): INestFormFieldBuilder {
    this._formBuilder.batchparser(value)
    return this;
  }

  create(): FormField {
    if(this.context.kind === "nest"){
      this.context.def = this._formBuilder.create()
    }
    return this.context
  }

  attach(plugin: (builder: INestFormFieldBuilder) => void): INestFormFieldBuilder {
    plugin(this)
    return this
  }

  parser(value: ParserFn): INestFormFieldBuilder {
    this._formBuilder.parser(value)
    return this;
  }

  post(value: PostFn): INestFormFieldBuilder {
    this._formBuilder.post(value)
    return this;
  }

  fields(...childBuilders: (INestFormFieldBuilder | IPrimitiveFieldBuilder)[]): INestFormFieldBuilder {
    this._formBuilder.fields(...childBuilders)
    return this
  }

}



const defaultStringBatchparser = ()=>{

}



