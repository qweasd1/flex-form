import { IFormBuilder, INestFormFieldBuilder, IPrimitiveFieldBuilder } from "./Builder";
export declare function form(): IFormBuilder;
export declare function subform(name: string): INestFormFieldBuilder;
export declare function str(name: string): IPrimitiveFieldBuilder;
export declare function num(name: string): IPrimitiveFieldBuilder;
export declare function bool(name: string): IPrimitiveFieldBuilder;
