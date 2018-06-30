import {IFormManager} from "../interface/IFormManager";
import {CompiledForm, Field, PrimitiveField, Form} from "../interface/Form";
import {FormNotRegisterError} from "./Exception";
import {IFormBuilder} from "../syntax/Builder";

function returnInput(value){
    return value
}

function returnNull(){
  return null
}


export class FormManager implements IFormManager {
  private id_form_map = new Map<string,CompiledForm>()

  register(id:string, form: IFormBuilder) {
    this.id_form_map.set(id,this._compileForm(form.create()))
  }

  get(formId: string): CompiledForm {
    if(this.id_form_map.has(formId)){
      return this.id_form_map.get(formId)
    }
    else{
      throw new FormNotRegisterError(`form: ${formId} not found`)
    }
  }

  private _compileForm(form:Form): CompiledForm{
    let prefix_field_map = new Map<string, Field>()
    let name_field_map = new Map<string, Field>()
    let compiledForm:CompiledForm = {
      parser:form.parser || returnInput,
      batchparser:form.batchparser || returnInput,
      post: form.post || returnInput,
      default:form.default || returnNull,
      prefix_field_map,
      name_field_map,
      children: form.children.map(field=>{
        if(field.kind === "primitive" || field.kind === "ref"){
          name_field_map.set(field.key,field)
          if(field.shortcut){
            prefix_field_map.set(field.shortcut,field)
          }
          return field
        }
        else {
          let compiledField = {...field}
          compiledField.def = this._compileForm(compiledField.def)
          name_field_map.set(compiledField.key,compiledField)
          if(compiledField.shortcut){
            prefix_field_map.set(compiledField.shortcut,compiledField)
          }
          return compiledField
        }
      })
    }
    return compiledForm
  }

}