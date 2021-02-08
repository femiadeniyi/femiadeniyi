import fs from "fs-extra"
import tsconfig from "./tsconfig.json"



function setTsConfig(){
    console.log("setting tsconfig.json")
    fs.writeJSONSync("tsconfig.json",tsconfig,{spaces:2})
    console.log("set tsconfig.json")
}

function setPackageJson(){
    console.log("setting package.json")
    const packageJson = fs.readJSONSync("./package.json")
    const newPackageJson = {
        ...packageJson,
        main:"dist/index.js",
        private:false,
    }
    if(packageJson.private || packageJson.main !== "dist/main.js"){
        fs.writeJSON("package.json",{...packageJson, main:"dist/index.js"},{spaces:2})
    }
    console.log("set package.json")
    return packageJson
}

function main(){
    setPackageJson()
    setTsConfig()
}

main()