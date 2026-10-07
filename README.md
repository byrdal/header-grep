# header-grep

[![build](https://img.shields.io/github/actions/workflow/status/byrdal/header-grep/test.yml)](https://github.com/byrdal/header-grep/actions)

Chrome extension to easily filter header names and values on both requests and responses.

This extension adds a new tab in the chrome developer tools. From there you can monitor and search headers using regular expressions.

## Features
* Filter header names and values with regular expressions as you type, with match highlighting and an optional case-sensitive mode
* Group results by header or by request
* Shows method, status, resource type and timing for every request
* Copy headers and URLs with one click
* Includes requests captured before the panel was opened, and can preserve the log across navigations
* Saved filters, persisted with the rest of the settings
* Follows the DevTools light/dark theme

![Screenshot](https://github.com/byrdal/header-grep/blob/master/store/screenshot.png?raw=true)

## Technologies
* TypeScript
* [Preact](https://preactjs.com/) with [signals](https://preactjs.com/guide/v10/signals/)
* [Vite](https://vite.dev/) for bundling and [Vitest](https://vitest.dev/) for tests

## Installation
The easiest way to install the extension is through the [Chrome web store](https://chrome.google.com/webstore/detail/header-grep/fcejhnhcjocabgajfejhhniamopjfagi?hl=en-GB)

## Alternative installation
* Clone repository
* Build from source
* Go to `chrome://extensions/`
* Enable `developer mode`
* Click `load unpacked extension`
* Select the `dist` directory
* Extension is now available as a new tab in chrome devtools

## Building
#### Install dependencies
```
npm ci
```

#### Build dist
```
npm run build
```

#### Rebuild on changes
```
npm run watch
```

#### Run tests
```
npm test
```

## License
[MIT](https://github.com/byrdal/header-grep/blob/master/LICENSE)
