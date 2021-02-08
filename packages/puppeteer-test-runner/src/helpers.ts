const configFile = process.cwd()+"/webdev.config.ts"

export interface Config {
    tests: {
        dir:string
        url:string
    }
}

export async function importConfig():Promise<Config>{
    return import(configFile).then(f => f as Config).catch(() => ({
        tests: {
            dir:"__tests__",
            url:"http://localhost:3000"
        }
    }))
}

