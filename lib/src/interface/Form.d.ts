import { IBuildContext } from "./IBuildContext";
export declare type ParserFn = (code: string, context: IBuildContext) => any;
export declare type PostFn = (code: string, context: IBuildContext) => any;
export declare type BatchParserFn = (code: string, context: IBuildContext) => any[];
export declare type Default = any | ((context: IBuildContext) => any);
export interface Form {
    parser?: ParserFn;
    batchparser?: BatchParserFn;
    post?: PostFn;
    default?: Default;
    children: Field[];
}
export interface CompiledForm extends Form {
    prefix_field_map: Map<string, Field>;
    name_field_map: Map<string, Field>;
}
export interface FormField {
    key: string;
    isArray?: boolean;
    shortcut?: string;
}
export interface FormRefField extends FormField {
    ref: string;
    kind: "ref";
}
export interface NestFormField extends FormField {
    def: Form;
    kind: "nest";
}
export interface PrimitiveField extends FormField {
    type: Function;
    default?: Default;
    batchparser?: (code: string, context: IBuildContext) => any[];
    kind: "primitive";
}
export declare type Field = FormRefField | NestFormField | PrimitiveField;
