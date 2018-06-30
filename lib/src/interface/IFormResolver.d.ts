export interface IFormResolver {
    build(formId: string, input: any, context: any): any;
}
