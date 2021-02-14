
export default {
    reactScriptsVersion: "react-scripts" /* (default value) */,
    webpack: {
        configure: {
            entry: `./src/${process.env.REACT_APP_SITE}/App.tsx`,
        },
    },
    babel: {
        presets: [
            [
                "@babel/preset-react",
                {"runtime": "automatic", "importSource": "@emotion/react"}
            ]
        ],
        plugins: [
            "@emotion/babel-plugin",
        ]
    },
};