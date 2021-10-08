const path = require('path'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== "production";

module.exports = [
    {
        mode: 'production',
        entry: [
            './src/panel.js',
            './scss/styles.scss'
        ],
        output: {
            filename: 'js/bundle.js',
            path: path.resolve(__dirname, 'dist/')
        },
        module: {
            rules: [
                {
                    test: /\.monk$/,
                    loader: 'monkberry-loader'
                },
                {
                    test: /\.scss$/,
                    use: [
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                        },
                        {
                            loader: "sass-loader"
                        }
                    ]
                }
            ]
        },
        plugins: [].concat(devMode ? [] : [new MiniCssExtractPlugin({filename: "css/styles.css"})]),
    },
];
