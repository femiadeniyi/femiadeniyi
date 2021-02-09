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

export interface CreateTestProps {
    name:string
    test:(props:Puppeteer2MethodProps) => Promise<any>
}

export function createTest(f:CreateTestProps){
    return f
}

export default createTest

