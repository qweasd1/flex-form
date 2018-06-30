import { IFormManager } from "../interface/IFormManager";
import { CompiledForm } from "../interface/Form";
import { IFormBuilder } from "../syntax/Builder";
export declare class FormManager implements IFormManager {
    private id_form_map;
    register(id: string, form: IFormBuilder): void;
    get(formId: string): CompiledForm;
    private _compileForm;
}
