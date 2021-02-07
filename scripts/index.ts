import fs from "fs-extra"
import tsconfig from "./tsconfig.json"

function readPackageJson() {
    const packageJson = fs.readJSONSync("./package.json")
    return packageJson
}

function readTsConfig(){
    const packageJson = fs.readJSONSync("./tsconfig.json")
    console.log(packageJson)
}

function setTsConfig(){
    fs.writeJSONSync("tsconfig.json",tsconfig,{spaces:2})
}

function setPackageJson(){
    const packageJson = readPackageJson()
    fs.writeJSON("package.json",{...packageJson, main:"dist/index.js"},{spaces:4})
}


setTsConfig()