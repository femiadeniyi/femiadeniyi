import {createTest} from "../createTest";

export default createTest({
    name:"test1",
    async test({page}){
        await page.goto("http://google.com")
    }
});