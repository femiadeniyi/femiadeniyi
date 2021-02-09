import cp from "child_process"
import electronPath from "electron"
import yargs from "yargs";
const argv = yargs(process.argv.slice(2)).option('port', {
    string: true,
    demandOption: true
}).argv;

const npm = process.platform === "win32" ? "npm.cmd" : "npm"

async function startProcess({command,args}:{command:string,args:string[]}){
    // const config = await importConfig()
    const child = cp.spawn(command, args, { stdio: 'inherit' });
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

export function main({url}:{url:string}){
    startProcess({command:electronPath as unknown as string,args:["-r","ts-node/register","src/electron.ts --url "+url]})
    startProcess({command:npm,args:["start"]})
}

