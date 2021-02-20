declare namespace NodeJS {

    // Merge the existing `ProcessEnv` definition with ours
    // https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-interfaces
    export interface ProcessEnv {
        REACT_APP_SITE: "femiadeniyi.com"|"femi-timesheets"
    }
}