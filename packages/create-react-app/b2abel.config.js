require("ts-node").register({
    compilerOptions:{
        module:"commonjs",
    }
});

module.exports = require("./babel.config.ts").default