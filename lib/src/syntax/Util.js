"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WHITESPACES = new Set([" ", "\t"]);
const QUOTES = new Set(["'", '"']);
const ESCAPE = "\\";
var MatchState;
(function (MatchState) {
    MatchState[MatchState["start"] = -1] = "start";
    MatchState[MatchState["plain"] = 0] = "plain";
    MatchState[MatchState["quote"] = 1] = "quote";
    MatchState[MatchState["whitespace"] = 2] = "whitespace";
    MatchState[MatchState["escape"] = 3] = "escape";
})(MatchState || (MatchState = {}));
function splitParameter(text) {
    let cache = [];
    let result = [];
    let endQuote = null;
    text = text.trim();
    let state = MatchState.start;
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        switch (state) {
            case MatchState.start:
            case MatchState.whitespace:
                if (QUOTES.has(char)) {
                    endQuote = char;
                    state = MatchState.quote;
                }
                else if (WHITESPACES.has(char)) {
                    // ignore this char
                }
                else {
                    cache.push(char);
                    state = MatchState.plain;
                }
                break;
            case MatchState.plain:
                if (WHITESPACES.has(char)) {
                    result.push(cache.join(""));
                    cache = [];
                    state = MatchState.whitespace;
                }
                else {
                    cache.push(char);
                }
                break;
            case MatchState.quote:
                if (char === ESCAPE) {
                    state = MatchState.escape;
                }
                else if (char === endQuote) {
                    result.push(cache.join(""));
                    cache = [];
                    state = MatchState.whitespace;
                    endQuote = null;
                }
                else {
                    cache.push(char);
                }
                break;
            case MatchState.escape:
                cache.push(char);
                state = MatchState.quote;
        }
    }
    if (endQuote !== null) {
        throw Error("quote not ended for: " + text);
    }
    if (cache.length > 0) {
        result.push(cache.join(""));
    }
    return result;
}
exports.splitParameter = splitParameter;
//# sourceMappingURL=Util.js.map