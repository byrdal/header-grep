const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
    {
        ignores: ['**/bundle.js'],
    },
    {
        ...js.configs.recommended,
        languageOptions: {
            ecmaVersion: 2021,
            globals: {
                ...globals.browser,
                ...globals.commonjs,
                chrome: 'readonly',
                __dirname: 'readonly',
            },
        },
    },
];