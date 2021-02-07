import puppeteer from "puppeteer";

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;
type Browser = Awaited<ReturnType<typeof puppeteer.launch>>
type Page = Awaited<ReturnType<Browser["pages"]>>[0];

interface PuppeteerHelperProps {
    page: Page
}


export default async function createPuppeteer2Helpers({page}:PuppeteerHelperProps){
    return ({
        async delay(time?:number){
            await page.waitForTimeout(time || 1000)
        },
        exists: {
            async text({value,attr,tag}:{value:string,tag:string,attr:string}){
                try {
                    await page.waitForXPath(`//${tag || "*"}[translate(${attr}, '${value.toUpperCase()}', '${value.toLowerCase()}')='${value.toLowerCase()}']`,{visible: true,timeout:8000});
                    return true
                } catch (e) {
                    return false
                }
            },
        },
        type: {
            async text({value,text,attr,delay}:{value:string,text:string,attr:string,delay?:number}){
                await page.waitForXPath(`//*[translate(@${attr}, '${value.toUpperCase()}', '${value.toLowerCase()}')='${value.toLowerCase()}']`,{visible: true});
                await (await page.$x(`//*[translate(@${attr}, '${value.toUpperCase()}', '${value.toLowerCase()}')='${value.toLowerCase()}']`))[0].type(text,)
            },
        },
        click: {
            async tag({tag}:{tag:string}){
                await page.waitForXPath(`//${tag}`,{visible: true,});
                await (await page.$x(`//${tag}`))[0].click()
            },
            async textExact({text,tag}:{tag?:string,text:string}){
                await page.waitForXPath(`//${tag || "*"}[text()='${text}']`,{visible: true});
                await (await page.$x(`//${tag || "*"}[text()='${text}']`))[0].click()
            },
            async text({value,attr,tag}:{value:string,attr?:string,tag?:string}){
                console.log(attr || 33,"bink")
                await page.waitForXPath(`//${tag || "*"}[translate(${attr || "text()"}, '${value.toUpperCase()}', '${value.toLowerCase()}')='${value.toLowerCase()}']`,{visible: true});
                await (await page.$x(`//${tag || "*"}[translate(${attr || "text()"}, '${value.toUpperCase()}', '${value.toLowerCase()}')='${value.toLowerCase()}']`))[0].click()
            },
            async containTextExact({text,tag,attr}:{text:string,tag:string,attr:string}){
                await page.waitForXPath(`//${tag}[contains(${attr}, '${text}')]`, {visible:true})
                await (await page.$x(`//${tag}[contains(${attr}, '${text}')]`))[0].click()
            }
        },
        select(){

        },
        press: {
            async tab(){
                await page.keyboard.press("Tab");
            },
            async enter(){
                await page.keyboard.press("Enter",)
            },
            async type(text:string){
                await page.keyboard.type(text,)
            }
        }
    })
}