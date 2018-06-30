import {CompiledForm} from "./Form";
import {IBuildContext} from "./IBuildContext";

export interface IFormResolver {
  // build the form from the input
  build(formId: string, input: any, context:any): any


}