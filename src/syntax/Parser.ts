import {splitParameter} from "./Util";

const CMD_OPTION_PREFIX_PATTERN = /^-(-)?/

/**
 * default parser to parse form by shortcut "ijk -t aa --name bbb"
 * @param {string} code
 * @returns {null}
 * @constructor
 */
export function FormShortcutParser(code:string){
  const result:any = {}
  const params = splitParameter(code)
  if(params.length === 0){
    return null
  }
  else {

    // expand shortcut at first parameter
    const first  = params[0]
    if(!first.startsWith("-")){
      for(let char of first){
        result[char] = null
      }
      params.shift()
    }

    // expand later parameters
    let cursor = 0
    while (cursor < params.length){
      const param = params[cursor]
      const key_value = param.split("=")
      key_value[0] = key_value[0].replace(CMD_OPTION_PREFIX_PATTERN,"")
      if(key_value.length === 2){
        result[key_value[0]] = key_value[1]
      }
      else {

        const key = key_value[0]
        if( (cursor+1) === params.length){
          result[key] = null
        }
        else {
          const nextValue = params[cursor + 1]
          if(nextValue.startsWith("-")){
            result[key] = null
          }
          else {
            result[key] = nextValue
            cursor++
          }
        }

      }
      cursor++
    }
  }
  return result
}