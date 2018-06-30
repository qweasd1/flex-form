import {IFormResolver} from "../interface/IFormResolver";
import {CompiledForm, Form, Field, PrimitiveField, Default} from "../interface/Form";
import {IFormManager} from "../interface/IFormManager";
import {IBuildContext} from "../interface/IBuildContext";
import {isArray, isFunction, isString, isObject} from "./Util";
import {FormBuildError} from "./Exception";



export class FormResolver implements IFormResolver {

  constructor(public formManager: IFormManager) {

  }

  build(fomrId:string, input: any, context: any): any {
    const form = this.formManager.get(fomrId)
    let result = input
    result = this._recursiveBuildForm(form, result, {...context,form})
    return result;
  }

  private _getForm(formRef: Field): CompiledForm {
    switch (formRef.kind) {
      case "ref":
        return this.formManager.get(formRef.ref)
      case "nest":
        return formRef.def as CompiledForm
    }
  }

  private _recursiveBuildForm(form: CompiledForm, result: any, context: IBuildContext): any {
    context.form = form
    // Phase-0 if input is null, populate with default, if no default, directly return null
    if(result === undefined || result === null){
      if(form.default === undefined){
        return result
      }
      else {
        result = this._calculateValue(form.default,result,context)
      }
    }

    // Phase-1 if the input is string, first parse it
    if (isString(result) && form.parser) {
      result = form.parser(result, context)
    }

    if(!isObject(result)){
      return result
    }


    // Phase-2 populate prefix to full name
    Object.keys(result).forEach((key) => {
      if (form.prefix_field_map.has(key)) {
        const field = form.prefix_field_map.get(key)
        const value = result[key]
        this._replacePrefix(result, key, field.key, value)
      }
    })


    // Phase-3 populate child forms
    Object.keys(result).forEach((fullname) => {
      if (form.name_field_map.has(fullname)) {
        const field = form.name_field_map.get(fullname)
        let value = result[fullname]
        if (field.kind !== "primitive") {
          if (field.isArray) {
            result[fullname] = this._recursiveBuildFormArray(this._getForm(field), value, context)
          }
          else {
            const childForm = this._getForm(field)
            value = this._calculateValue(childForm.default, value, context)
            result[fullname] = this._recursiveBuildForm(childForm, value, context)
          }
        }
        else {

          if(field.isArray){
            result[fullname] = this._buildPrimitiveArray(field,value,context)
          }
          else {
            if (value !== null) {
              result[fullname] = field.type(value)
            }
            else {
              result[fullname] = this._calculateValue(field.default, value, context)
            }
          }
        }
      }
    })

    // Phase-4 trigger post

    result = form.post(result, context)

    return result
  }

  private _recursiveBuildFormArray(form: CompiledForm, result: any, context: IBuildContext): any[] {

    context.form = form
    let flattened_result = null
    if (isString(result)) {
      flattened_result = form.batchparser(result, context)
    }
    else {
      if (!isArray(result)) {
        throw new FormBuildError(`can't build form array from: ${result}`)
      }

      // check if there are elements is string
      flattened_result = []
      result.forEach((item)=>{
        if(isString(item)){
          flattened_result.push(...form.batchparser(item,context))
        }
        else {
          flattened_result.push(item)
        }
      })


    }

    return flattened_result.map((item) => {
      return this._recursiveBuildForm(form, item, context)
    })
  }

  private _buildPrimitiveArray(field: PrimitiveField, result: any, context: IBuildContext) {
    if (isString(result) && field.batchparser) {
      result = field.batchparser(result, context).map((item) => {
        return field.type(item)
      })
    }
    else {
      result = [field.type(result)]
    }
    return result
  }

  private _replacePrefix(result: any, prefix: string, fullname: string, value) {
    delete result[prefix]
    result[fullname] = value

  }

  private _calculateValue(defaultValue: any, value: any, context: IBuildContext) {
    if (value !== null) {
      return value
    }
    else {
      if (isFunction(defaultValue)) {
        return defaultValue(context)
      }
      else {
        return defaultValue
      }
    }
  }

}