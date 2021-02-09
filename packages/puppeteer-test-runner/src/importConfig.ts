export interface Config {
    tests: {
        dir:string
        url:string
    }
}

const configFile = process.cwd()+"/webdev.config.ts"


export async function importConfig():Promise<Config>{
    return import(configFile).then(f => f as Config).catch(() => ({
        tests: {
            dir:process.cwd()+"/src/__tests__",
            url:"http://localhost:3000"
        }
    }))
}

export default importConfig