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
            resolve: {
                mainFields: [ 'main' ]
            },
            target:"electron-renderer",
            externals: [
                {
                    puppeteer: "require('puppeteer')",
                },
                function ( context, request ,callback) {
                    console.log(request)
                    if (request.includes("__tests__/index")) {
                        const newPath = path.resolve(process.env.dir,request.replace("./__tests__/",""))
                        // Externalize to a commonjs module using the request path
                        return callback(null, 'commonjs2 ' + require.resolve(newPath));
                    } else {
                        // Continue without externalizing the import
                        callback();
                    }
                },
            ]
        },
    },
};