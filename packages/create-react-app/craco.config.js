require("ts-node").register({
    compilerOptions:{
        module:"commonjs",
    }
});

module.exports = require("./craco.config.ts").default