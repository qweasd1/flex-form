const WHITESPACES = new Set([" ","\t"])
const QUOTES = new Set(["'",'"'])
const ESCAPE = "\\"


enum MatchState {
  start = -1,
  plain = 0,
  quote = 1,
  whitespace = 2,
  escape = 3,
}


export function splitParameter(text: string) : string[] {
  let cache = []
  let result = []
  let endQuote = null

  text = text.trim()

  let state:any = MatchState.start


  for(let i=0;i < text.length;i++){
    const char = text[i]

    switch (state){
      case MatchState.start:
      case MatchState.whitespace:
        if(QUOTES.has(char)){
          endQuote = char
          state = MatchState.quote
        }
        else if(WHITESPACES.has(char)){
          // ignore this char
        }
        else {
          cache.push(char)
          state = MatchState.plain
        }
        break
      case MatchState.plain:
        if(WHITESPACES.has(char)){
          result.push(cache.join(""))
          cache = []
          state = MatchState.whitespace
        }
        else {
          cache.push(char)
        }

        break
      case MatchState.quote:
        if(char === ESCAPE){
          state = MatchState.escape
        }
        else if(char === endQuote) {
          result.push(cache.join(""))
          cache = []
          state = MatchState.whitespace
          endQuote = null
        }
        else {
          cache.push(char)
        }
        break
      case MatchState.escape:
        cache.push(char)
        state = MatchState.quote
    }
  }

  if(endQuote !== null){
    throw Error("quote not ended for: " + text)
  }
  if(cache.length > 0){
    result.push(cache.join(""))
  }

  return result
}