# header-grep
Chrome extension to easily filter header names and values on both requests and responses.

This extension adds a new tab in the chrome developer tools. From there you can monitor and search headers using regular expressions.

![Screenshot](https://github.com/byrdal/header-grep/blob/master/store/screenshot.png?raw=true)

## Technologies
* Vanilla JS
* Tiny and fast [Monkberry](https://monkberry.js.org/) lib used for templating
* [Pure.css](https://purecss.io/) CSS with a minimal footprint

## Installation
The easiest way to install the extension is through the [Chrome web store](https://chrome.google.com/webstore/detail/header-grep/fcejhnhcjocabgajfejhhniamopjfagi?hl=en-GB)

## Alternative installation
* Clone repository
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

#### Docker
You can also use docker + docker-compose to build the distributable files
```
docker-compose run --rm toolkit npm ci && docker-compose run --rm toolkit npm run build
```

## License
[MIT](https://github.com/byrdal/header-grep/blob/master/LICENSE)
