import Signals = NodeJS.Signals;
import cp from "child_process"
import electronPath from "electron"
import fs from "fs"
import path from "path"

const configFile = process.cwd()+"/webdev.config.ts"


export interface Config {
    tests: {
        dir:string
    }
}

async function importConfig():Promise<Config>{
    return import(configFile).then(f => f as Config).catch(() => ({
        tests: {
            dir:"__tests__"
        }
    }))
}

async function main(){

    const config = await importConfig()

    const child = cp.spawn(electronPath as unknown as string, ["-r","ts-node/register","src/electron.ts"], { stdio: 'inherit' });
    child.on('close', (code) => process.exit(code));

    const handleTerminationSignal = (signal:Signals) =>
        process.on(signal, () => {
            if (!child.killed) {
                child.kill(signal);
            }
        });

    handleTerminationSignal('SIGINT');
    handleTerminationSignal('SIGTERM');
}

