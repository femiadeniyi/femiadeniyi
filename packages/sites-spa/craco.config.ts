console.log(33)

export default {
    reactScriptsVersion: "react-scripts" /* (default value) */,
    webpack: {
        configure: (webpackConfig:any) => {
            console.log(9000)
            const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
                ({ constructor }:any) => constructor && constructor.name === 'ModuleScopePlugin'
            );
            webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);
            console.log(webpackConfig)
            return webpackConfig;
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