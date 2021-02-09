import puppeteer from "puppeteer";

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;
type Browser = Awaited<ReturnType<typeof puppeteer.launch>>
type Page = Awaited<ReturnType<Browser["pages"]>>[0];

declare global {
    export interface Window {
        puppeteer:{
            page:Page|null,
            browser:Browser|null,
        },
    }
}