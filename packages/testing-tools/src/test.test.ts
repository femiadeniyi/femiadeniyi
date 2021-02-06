import createPuppeteer2Helpers from "./puppeteerHelpers";
import fs from "fs-extra"
export async function test(){
   const helpers = await createPuppeteer2Helpers({page:window.page})
   await window.page.goto("http://localhost:4098")

   await helpers.click.text({value:"click me"})
    const coverage = await window.page.evaluate(() => (window as any).__coverage__ )
    console.log(coverage,"coverage")
    await fs.emptyDir('cov')

   await Promise.all(
       Object.values(coverage).map((cov:any) => {
           if (
               cov &&
               typeof cov === 'object' &&
               typeof cov.path === 'string' &&
               typeof cov.hash === 'string'
           ) {
               return fs.writeJson(`cov/${cov.hash}.json`,{ [cov.path]: cov })
           }
           return Promise.resolve()
       })
   )
}
export default test