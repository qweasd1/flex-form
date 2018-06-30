import { BatchParserFn, Default, FormField, Form, ParserFn, PostFn, PrimitiveField } from "../interface/Form";
export interface IBaseFieldBuilder<TBuilder, TField> {
    default(value: Default): TBuilder;
    batchparser(value: BatchParserFn): TBuilder;
    create(): TField;
    attach(plugin: (builder: TBuilder) => void): TBuilder;
}
export interface IBaseFormFieldBuilder<TBuilder, TField> extends IBaseFieldBuilder<TBuilder, TField> {
    parser(value: ParserFn): TBuilder;
    post(value: PostFn): TBuilder;
    fields(...childBuilders: (INestFormFieldBuilder | IPrimitiveFieldBuilder)[]): TBuilder;
}
export interface IFormBuilder extends IBaseFormFieldBuilder<IFormBuilder, Form> {
}
export interface IBaseNestFormFieldBuilder<TBuilder, TField> extends IBaseFieldBuilder<TBuilder, TField> {
    array: TBuilder;
    shortcut(value: string): TBuilder;
}
export interface INestFormFieldBuilder extends IBaseNestFormFieldBuilder<INestFormFieldBuilder, FormField> {
    parser(value: ParserFn): INestFormFieldBuilder;
    post(value: PostFn): INestFormFieldBuilder;
    fields(...childBuilders: (INestFormFieldBuilder | IPrimitiveFieldBuilder)[]): INestFormFieldBuilder;
    ref(formId: string): INestFormFieldBuilder;
}
export interface IPrimitiveFieldBuilder extends IBaseNestFormFieldBuilder<IPrimitiveFieldBuilder, PrimitiveField> {
}
export declare class FormBuilder implements FormBuilder {
    context: any;
    childrenBuilder: any[];
    constructor();
    parser(value: ParserFn): FormBuilder;
    post(value: PostFn): FormBuilder;
    fields(...childBuilders: (INestFormFieldBuilder | IPrimitiveFieldBuilder)[]): FormBuilder;
    default(value: Default): FormBuilder;
    batchparser(value: BatchParserFn): FormBuilder;
    create(): Form;
    attach(plugin: (builder: FormBuilder) => void): FormBuilder;
}
export declare class PrimitiveFieldBuilder implements IPrimitiveFieldBuilder {
    context: any;
    constructor(key: string, type: Function);
    readonly array: IPrimitiveFieldBuilder;
    shortcut(value: string): IPrimitiveFieldBuilder;
    default(value: Default): IPrimitiveFieldBuilder;
    batchparser(value: BatchParserFn): IPrimitiveFieldBuilder;
    create(): PrimitiveField;
    attach(plugin: (builder: IPrimitiveFieldBuilder) => void): IPrimitiveFieldBuilder;
}
export declare class NestFormBuilder implements INestFormFieldBuilder {
    private _formBuilder;
    context: any;
    constructor(key: string);
    readonly array: INestFormFieldBuilder;
    shortcut(value: string): INestFormFieldBuilder;
    ref(formId: string): INestFormFieldBuilder;
    default(value: Default): INestFormFieldBuilder;
    batchparser(value: BatchParserFn): INestFormFieldBuilder;
    create(): FormField;
    attach(plugin: (builder: INestFormFieldBuilder) => void): INestFormFieldBuilder;
    parser(value: ParserFn): INestFormFieldBuilder;
    post(value: PostFn): INestFormFieldBuilder;
    fields(...childBuilders: (INestFormFieldBuilder | IPrimitiveFieldBuilder)[]): INestFormFieldBuilder;
}
