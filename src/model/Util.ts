export function isString(value:any){
  return typeof value === "string"
}

export function isFunction(value:any){
  return typeof value === "function"
}

export function isArray(value:any){
  return Array.isArray(value)
}

export function isObject(value:any){
  return typeof value === "object" && !Array.isArray(value)
}
