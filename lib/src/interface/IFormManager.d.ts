import { CompiledForm } from "./Form";
import { IFormBuilder } from "../syntax/Builder";
export interface IFormManager {
    register(id: string, form: IFormBuilder): any;
    get(formId: string): CompiledForm;
}
