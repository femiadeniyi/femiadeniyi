import cp from "child_process"
import dotenv from "dotenv"

interface StartProcessProps {
    command:string
    args:string[]
    env?:any
}
interface FirebaseConfigProps {
    key:string
    value:string
}
const npm = process.platform === "win32" ? "npm.cmd" : "npm"

const config = dotenv.config({path:__dirname+"/.env"}).parsed

if(!config) throw "no config"

function createEnvVars(props:{[key:string]:string}){
    const arr = Object.entries(props)
    const str = arr.map(([k,v]) => `service.${k.toLowerCase()}="${v}"`)
    return str
}

async function startProcess({command,args,env}:StartProcessProps){
    const child = cp.spawn(command, args, { shell:true,stdio: 'inherit',env });
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

const vars = createEnvVars(config)

console.log("setting vars\n\n",vars,"\n")

startProcess({
    command:"firebase",
    args:["functions:config:set",...vars]
})