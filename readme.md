About:
------

Modern frontend development toolchain. 

WebPack + ES2015 + PostCSS.

Install:
--------

`npm install`

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

`npm run validate`

Deploy:
-------

Automatic deployment to Heroku using integration with GitHub.

Debug in WebStorm
-----------------

1. Install google chrome [plugin](https://chrome.google.com/webstore/detail/jetbrains-ide-support/hmhgeddbohgjknpmjagkdomcpobmllji?utm_campaign=en&utm_source=en-et-na-us-oc-webstrapp&utm_medium=et)
2. Start developer mode
3. Start "Webpack-debug" in debug mode
