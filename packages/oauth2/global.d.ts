declare namespace NodeJS {

    // Merge the existing `ProcessEnv` definition with ours
    // https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-interfaces
    export interface ProcessEnv {
        CLIENT_ID: string
        CLIENT_SECRET: string
        DISCOVERY:string
    }
}
