import {CompiledForm, Form} from "./Form";
import {IFormBuilder} from "../syntax/Builder";

export interface IFormManager {

  register(id:string, form: IFormBuilder)

  get(formId: string): CompiledForm
}