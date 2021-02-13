module.exports = {
    ignore: [
        "./src/pages",
        "./src/stories",
        "./src/websites",
        "./src/App.tsx",
        "src/electron.ts",
        "src/**/*.d.ts"
    ],
    presets: [
        "@babel/preset-typescript",
        ["@babel/preset-env", {
            "modules": "cjs"
        }],
        [
            "@babel/preset-react",
            { "runtime": "automatic", "importSource": "@emotion/react" }
        ],
    ],
    plugins: ["@emotion/babel-plugin","@babel/plugin-transform-typescript"]
}

