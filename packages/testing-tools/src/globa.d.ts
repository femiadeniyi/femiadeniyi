import puppeteer from "puppeteer";
export {}
type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;
type Browser = Awaited<ReturnType<typeof puppeteer.launch>>
type Page = Awaited<ReturnType<Browser["pages"]>>[0]

declare global {
    export interface Window {
        page:Page,
        browser:Browser,
        random: {
            number: (min:number,max:number) => number
            bool: () => boolean
        }
    }
}

