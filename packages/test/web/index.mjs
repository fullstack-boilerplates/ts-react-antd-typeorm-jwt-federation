import { hello } from "../apis/hello.mjs"
  ;
(async () => alert(await hello('world')))()