
interface StartProcessProps {
    command:string
    args:string[]
    env?:any
}


function startProcess({command,args,env}:StartProcessProps){
    return Deno.run({
        cmd: [command,...args]
    });

}

const p = startProcess({
    command:"deno",
    args:["bundle","src/index.ts","public/fa.com/bundle.js"]
})

console.log(await p.status())