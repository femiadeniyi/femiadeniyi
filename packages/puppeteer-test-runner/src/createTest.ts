import {createHelpers} from "./createHelpers";
import puppeteer from "puppeteer";
type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;
type Browser = Awaited<ReturnType<typeof puppeteer.launch>>
type Page = Awaited<ReturnType<Browser["pages"]>>[0];

export interface PuppeteerConfig {
    page: Page
    browser?: Browser
    helpers: Awaited<ReturnType<typeof createHelpers>>
    getCode?: () => Promise<string>
}

export interface CreateTestProps {
    name:string
    test:(props:PuppeteerConfig) => Promise<any>
}

export function createTest(f:CreateTestProps){
    return f
}

export default createTest

