import {helpers} from "./helpers";
import puppeteer from "puppeteer";
type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;
type Browser = Awaited<ReturnType<typeof puppeteer.launch>>
type Page = Awaited<ReturnType<Browser["pages"]>>[0];

export interface Puppeteer2MethodProps {
    page: Page
    browser?: Browser
    helpers: Awaited<ReturnType<typeof helpers>>
    getCode?: () => Promise<string>
}

export function createTest(f:(props:Puppeteer2MethodProps) => Promise<any>){
    return f
}

