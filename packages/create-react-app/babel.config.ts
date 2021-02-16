export default {
    ignore: [
        "./src/logo.svg",
        "./src/service-worker.ts",
        "./src/serviceWorkerRegistration.ts",
        "./src/setupTests.ts",
        "src/global.d.ts",
        "./src/App.tsx",
        "./src/react-app-env.d.ts",
        "./src/reportWebVitals.ts",
        "./src/index.tsx"
    ],
    presets: [
        "@babel/preset-typescript",

        [
            "@babel/preset-env",{modules:"commonjs"}
        ],

        [
            "@babel/preset-react",
            { "runtime": "automatic", "importSource": "@emotion/react" }
        ],
    ],
    plugins: ["@emotion/babel-plugin"]
}

