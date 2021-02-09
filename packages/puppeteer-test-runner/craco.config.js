const path = require("path")
module.exports = {
    reactScriptsVersion: "react-scripts" /* (default value) */,
    babel: {
        plugins:[
            [
                "istanbul"
            ]
        ]
    },
    webpack: {
        configure: {
            target:"electron-renderer",
            externals: {
                puppeteer: "require('puppeteer')",
                jsdom: "require('jsdom')",
            },
        },
    },
};