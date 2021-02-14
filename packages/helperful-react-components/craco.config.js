const dev = process.env.NODE_ENV === "development"
const test = process.env.NODE_ENV === "test"

console.log(test)

module.exports = {
    reactScriptsVersion: "react-scripts" /* (default value) */,
    ...(test && {
        webpack: {
            configure: {
                entry:"./src/websites/index.tsx",
                target:"electron-renderer",
                externals: {
                    puppeteer: "require('puppeteer')",
                    jsdom: "require('jsdom')",
                },
            },
        }
    }),
    webpack: {
        configure: {
            ...(test ? {
                entry:"./src/websites/index.tsx",
                target:"electron-renderer",
                externals: {
                    puppeteer: "require('puppeteer')",
                    jsdom: "require('jsdom')",
                },
            }: {
                entry:"./src/App.tsx",
            })
        },
    },
    babel: {
        presets:[
            [
                "@babel/preset-react",
                { "runtime": "automatic", "importSource": "@emotion/react" }
            ]
        ],
        plugins:[
            "@emotion/babel-plugin",
        ]
    },
};