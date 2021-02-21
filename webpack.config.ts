import path from 'path';
import webpack from 'webpack';

const prod = process.env.NODE_ENV === "production"

const projects = [
    {
        name:"fa.com",
        config: {
            output: {
                path:path.resolve(__dirname,"public","fa.com"),
                filename:"bundle.js"
            }
        }
    }
]

const configs:webpack.Configuration[] = projects.map(f => ({
    mode: prod ? "production" : "development",
    devtool: "eval",
    entry: './src/index.ts',
    output: f.config.output,
    module: {
        rules: [
            {
                test:/\.ts?$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    }
}))


export default configs;