import chokidar from "chokidar"
import cp from "child_process"

interface StartProcessProps {
    command:string
    args:string[]
    env?:any
}

const npm = process.platform === "win32" ? "npm.cmd" : "npm"

async function startProcess({command,args,env}:StartProcessProps){
    const child = cp.spawn(command, args, { stdio: 'inherit',env });
    child.on('close', (code) => code && process.exit(code));

    const handleTerminationSignal = (signal:NodeJS.Signals) =>
        process.on(signal, () => {
            if (!child.killed) {
                child.kill(signal);
            }
        });

    handleTerminationSignal('SIGINT');
    handleTerminationSignal('SIGTERM');
}

chokidar.watch('./src').on('change', (event, path) => {
    startProcess({
        command:npm,
        args:["run","tsc"]
    })
});