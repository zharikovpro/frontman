About:
------

Modern frontend development toolchain. 

WebPack + ES2015 + PostCSS.

Install:
--------

`npm install`

Optionally [install html5validator](https://github.com/svenkreiss/html5validator#install) to use `npm run validate`

Setup:
------

Optionally make .env based on .env.example.

BASE_URL is used by prefixoid to prefix root-based links (starting with /) inside a, img, link, script tags.

Develop:
--------

`npm start`

Visit [http://localhost:3000/](http://localhost:3000/) to view results with live reloading.

Lint:
-----

`npm run lint`

Test:
-----

`npm test`

`npm run coverage`

Build:
------

`npm run build`

Validate:
---------

Will only work with [installed html5validator](https://github.com/svenkreiss/html5validator#install)

`npm run validate`

Verify:
-------

Run all lint, test, build and validation tasks in order to check there's no errors.

`npm run verify`

Deploy:
-------

Automatic deployment to Heroku using integration with GitHub.

Debug in WebStorm
-----------------

1. Install google chrome [plugin](https://chrome.google.com/webstore/detail/jetbrains-ide-support/hmhgeddbohgjknpmjagkdomcpobmllji)
2. `npm start`
3. Run "WebpackDebug" configuration in debug mode
