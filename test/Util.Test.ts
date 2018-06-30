import {splitParameter} from "../src/syntax/Util";

describe("splitParameter",()=>{
  it('plain text', function () {
    expect(splitParameter("abc bcd cde")).toEqual(["abc","bcd","cde"])
  });

  it('single quote text', function () {
    expect(splitParameter("abc 'bcd' cde")).toEqual(["abc","bcd","cde"])
  });

  it('double quote text', function () {
    expect(splitParameter('abc "bcd" cde')).toEqual(["abc","bcd","cde"])
  });

  it('escape text', function () {
    expect(splitParameter(`abc '\\'bcd\\"' cde`)).toEqual(["abc",`'bcd"`,"cde"])
  });

  it('cmd line like', function () {
    expect(splitParameter(` -t  -i  --some  good `)).toEqual(["-t",`-i`,"--some", "good"])
  });
})