const path = require('path');

module.exports = {
    entry: './src/panel.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/js')
    },
    module: {
        loaders: [
            {test: /\.monk$/, loader: 'monkberry-loader'}
        ]
    }
};