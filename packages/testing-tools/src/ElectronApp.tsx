import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import puppeteer from "puppeteer"
import TestPage from "./TestPage";



function ElectronApp() {

    useEffect(() => {
        async function run(){
            // @ts-ignore
            window.browser = window.browser || await puppeteer.launch({
                executablePath:"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
                defaultViewport: null as unknown as undefined,
                headless:false,
                args:[
                    '--inprivate',
                    // _browserApp as string,
                    "--disable-web-security",
                    // `--proxy-server=${proxy?.ipAddress}:${proxy?.port}`,
                    "--allow-file-access-from-files",
                    "--allow-file-access",
                ]
            })
            window.page = window.page || (await window.browser.pages())[0]
        }
        run()
    },[])

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <button onClick={() => {
                    console.log("hello")
                }}>click me</button>
                <TestPage />
            </header>
        </div>
    );
}

export default ElectronApp;
