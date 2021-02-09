import React, {useEffect, useState} from 'react';
import importConfig from "./importConfig";
import fs from "fs"
import path from "path"
import {CreateTestProps} from "./createTest";
function App() {

    const [files,setFiles] = useState<CreateTestProps[]>([])

    useEffect(() => {
        async function run(){
            const conf = await importConfig()
            const files = fs.readdirSync(conf.tests.dir)
            // const a = "src\\__tests__\\test1"
            // const l = path.resolve("C:\\Software\\femiadeniyi\\packages\\puppeteer-test-runner\\src\\__tests__\\test1")
            // console.log(path.resolve(conf.tests.dir,files[0].replaceAll(".ts","")),"C:\\Software\\femiadeniyi\\packages\\puppeteer-test-runner\\src\\__tests__\\test1")
            // let p = require(path.(`C:\\Software\\femiadeniyi\\packages\\puppeteer-test-runner\\${a}.ts`))
            // import(p).then(console.log)
            // setFiles(tests)
            // console.log(tests)
        }
        run()
    },[])
    return (

        <>
            {files.map(f => {

                return <button></button>
            })}
        </>
    );
}

export default App;
