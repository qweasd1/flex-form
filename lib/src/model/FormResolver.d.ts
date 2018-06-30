import { IFormResolver } from "../interface/IFormResolver";
import { IFormManager } from "../interface/IFormManager";
export declare class FormResolver implements IFormResolver {
    formManager: IFormManager;
    constructor(formManager: IFormManager);
    build(fomrId: string, input: any, context: any): any;
    private _getForm;
    private _recursiveBuildForm;
    private _recursiveBuildFormArray;
    private _buildPrimitiveArray;
    private _replacePrefix;
    private _calculateValue;
}
