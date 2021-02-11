module.exports = {
    reactScriptsVersion: "react-scripts" /* (default value) */,
    babel: {
        presets:[
            [
                "@babel/preset-react",
                { "runtime": "automatic", "importSource": "@emotion/react" }
            ]
        ],
        plugins:[
            "@emotion/babel-plugin"
        ]
    },
};