import React, {useEffect, useState} from 'react';
import fs from "fs"
import path from "path"
import {CreateTestProps, PuppeteerConfig} from "./createTest";
import puppeteer from "puppeteer";
import createHelpers from "./createHelpers";


function App() {

    const [files,setFiles] = useState<CreateTestProps[]>([])
    const [puppeteerConfig,setPuppeteerConfig] = useState<PuppeteerConfig|null>(null)

    useEffect(() => {
        async function run(){
            console.log(window.puppeteer,"blo")
            const browser = window.puppeteer.browser || await puppeteer.launch({
                executablePath:"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
                headless:false,
                defaultViewport: null as unknown as undefined,
                args:[
                    '--inprivate',
                    "--disable-web-security",
                    "--allow-file-access-from-files",
                    "--allow-file-access",
                ]
            })
            const page = window.puppeteer.page || (await browser.pages())[0];
            window.puppeteer.page = page
            window.puppeteer.browser = browser
            const helpers = await createHelpers({page})
            setPuppeteerConfig({helpers,page,browser})
            import("./__tests__/index.js").then(f => setFiles(f.default))
        }
        run()
    },[])
    return (

        <>
            {puppeteerConfig && files.map(f => {

                return (
                    <button
                        onClick={() => {
                            f.test(puppeteerConfig)
                        }}
                    >
                        {f.name}
                    </button>
                )
            })}
        </>
    );
}

export default App;
