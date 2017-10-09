const path = require('path'),
      ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "[name].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports =[
    {
        entry: [
            './src/panel.js'
        ],
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist/js')
        },
        module: {
            loaders: [
                { test: /\.monk$/, loader: 'monkberry-loader' }
            ]
        }
    },
    {
        entry: {
            styles: './scss/styles.scss'
        },
        output: {
            filename: 'styles.css',
            path: path.resolve(__dirname, 'dist/css')
        },
        module: {
            rules: [{
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            }]
        },
        plugins: [
            extractSass
        ]
    }
];