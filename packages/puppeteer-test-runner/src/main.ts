import cp from "child_process"
import electronPath from "electron"
import * as yargs from "yargs";

const {url,dir} = yargs.default(process.argv.slice(2))
    .option('url', {
        string: true,
        demandOption: true
    })
    .option("dir",{
        string: true,
        demandOption: true
    }).argv;


interface StartProcessProps {
    command:string
    args:string[]
    env?:any
}

const npm = process.platform === "win32" ? "npm.cmd" : "npm"

async function startProcess({command,args,env}:StartProcessProps){
    const child = cp.spawn(command, args, { stdio: 'inherit',env });
    child.on('close', (code) => process.exit(code));

    const handleTerminationSignal = (signal:NodeJS.Signals) =>
        process.on(signal, () => {
            if (!child.killed) {
                child.kill(signal);
            }
        });

    handleTerminationSignal('SIGINT');
    handleTerminationSignal('SIGTERM');
}

export function main(){
    startProcess({
        command:electronPath as unknown as string,
        args:["-r","ts-node/register","src/electron.ts"],
        env:{...process.env,url}
    })
    startProcess({
        command:npm,
        args:["start"],
        env:{...process.env,dir}
    })
}

main()

