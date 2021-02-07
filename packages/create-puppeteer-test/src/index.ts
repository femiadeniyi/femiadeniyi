// import createPuppeteer2Helpers from "./Puppeteer2Helpers";
import puppeteer from "puppeteer";
type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;
type Browser = Awaited<ReturnType<typeof puppeteer.launch>>
type Page = Awaited<ReturnType<Browser["pages"]>>[0];

export interface Puppeteer2MethodProps {
    page: Page
    browser?: Browser
    // helpers: Awaited<ReturnType<typeof createPuppeteer2Helpers>>
    getCode?: () => Promise<string>
}