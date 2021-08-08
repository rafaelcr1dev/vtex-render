# Vtex Render V3

Front-end tool for task automation.

- Reverse proxy **NEW!**
- Compilation 
- Minification 
- Optimization images
- Renames Files
- Simulates commonly used controls locally
- Standard store email editing
- Sprites generates
- SASS compile
- ES6 + Babel
- AutoPrefixer
- Stylelint
- Htmllint
- JSlint
- Prettier **NEW!**
- ES2020 **NEW!**
- Typescript **NEW!**
- Commitizen **NEW!**
- Jest Testing **NEW!**

## Frameworks

- ReactJS **NEW!**
- Mithril

### Prerequisites

- Git
- Git Flow
- Webpack
- ES6 Features
- Yarn

### VSCode

#### Extensions

- eslint
- styelint
- htmlint
- Prettier-Code formatter

#### Format On Save

Respects editor.formatOnSave setting.

You can turn on format-on-save on a per-language basis by scoping the setting:

```sh
// Set the default
"editor.formatOnSave": false,
// Enable per-language
"[javascript]": {
    "editor.formatOnSave": true
}
```

### Requirements

* **OS**: Ubuntu 16.04 LTS or higher / Windows 7 or Higher / MACOS.
* **Node**: 11.x LTS or higher.

## Development environment

- Host: ***https://namestore.vtexcommercestable.com.br***
- Orderplaced: **/checkout/orderPlaced/?og=v2442023chll**

## Tips
Use bash terminal (default terminal on OSX and Linux, [GitBash](http://git-scm.com/downloads) on Windows).

#### MAC OSX Setup

If you are using OSX, you need to run the following (only once):

1. `brew update`
2. `brew install libtool automake autoconf nasm`
3. `brew reinstall libpng`

#### Linux setup

If you are using linux environment, you need to run the following (only once):

1. `sudo apt-get install libtool automake autoconf nasm`

## Dependencies
1. Latest version of [NodeJS](http://nodejs.org/) (min v6.9.1)
2. Latest version of any of the following package managers

- [NPM](https://www.npmjs.com/) (min v5.3.0)
- [Yarn](https://yarnpkg.com/) (min v0.20.4)

## Libs

- [React](https://pt-br.reactjs.org/) (min v16.13.1)
- [Mithril](https://mithril.js.org) (min v2.0.4)
- [JQuery](https://www.tutorialrepublic.com/jquery-tutorial) (min v1.8.7)
- [Vanilla Masker](https://github.com/vanilla-masker/vanilla-masker) (Sugestion)
- [Notifyjs](https://notifyjs.jpillora.com/) (Sugestion)

## Patterns

- [PATTERNS.md](.github/PATTERN.md)

## SEO

- [Build the HTML structure with SEO in mind](https://wiki.corebiz.com.br/pt-br/desenvolvimento/seo)

## Deploy vtex

- Upload files to vtex using this tool "[vtexpublish](https://github.com/savanajs/vtexpublish)"

## General references

https://wiki.corebiz.com.br/pt-br/desenvolvimento/referencias

## Install

In the root directory of the project run:

```
npm install
```

or

```
yarn install
```

If for some reason, NPM/Yarn throws errors and does not want to install the dependencies, please see https://goo.gl/iSz4w8.

Run

```
npm cache clean
```

## Development Start

#### 1. Open the file "package.json" and replace the word "NAMESTORE" to name of your store and "color" to color default of store. 

- There are 2 framwork options, you can choose between `react` and `mithril`.

```
"name": "NAMESTORE",
"storeNameToRenamesFiles": "NAMESTORE",
"color": "#1976d2",
"framework": "NAMEFRAMEWORK",
```

Exemple

```
"name": "corebiz",
"storeNameToRenamesFiles": "corebiz",
"color": "#999999",
"framework": "react",
```

#### 2. Run comand

This command adds prefixes to html, js, css, images and so on.

```
yarn renames
```

#### 3. Run project

```
yarn dev
```

#### 4. Run build to prodution

```
yarn build
```

#### 5. Releasing your project

To release your project, run ``yarn release {patch/minor/major}``.\
\
This command will update the version in ``package.json`` and release branch ``develop`` merging with ``master`` running ``git flow release``.

##### Examples:
**MAJOR:** when you make incompatible changes with backwards versions.\
**MINOR:** when you add functionality in a backwards compatible manner.\
**PATCH:** when you make some changes or fixes in existence functionalities.

``yarn release patch`` update version from ``1.2.1`` to ``1.2.2``\
``yarn release minor`` update version from ``1.2.1`` to ``1.3.0``\
``yarn release major`` update version from ``1.2.1`` to ``2.0.0``

##### Opitionals:
You can also run the build command together. Just add in your `.release.json`:
```
"pre_commit_commands": [
    "npm run build"
]
```
> **Warning**: Before release, make sure your code is up to date, in ``develop`` branch.

## Commands

#### To generate sprites

```
yarn sprites
```

#### Rename suffix of pages, links and assets files

```
yarn renames
```

#### To start the project in development mode, run:

```
yarn dev
```

#### Build to production (Files to upload on Vtex)

```
yarn build
```

## Tests

#### Run

```sh
yarn test

// or

yarn test:tdd
```

#### Mithril testing

https://github.com/ArthurClemens/mithril-jest

## Proxy 

#### Vtex to localhost

```
yarn dev --proxy
```

Proxy test

$.get("/api/checkout/pub/orderForm", function(r){console.log(r)});

#### Reverse proxy

In your browser there will be an error with https, ignore this error and go ahead with the security mode disabled and log in to the store.

```
yarn dev --online
```

## Built With

* [Nodejs](https://nodejs.org)

## Update Render

* [Update of render](.github/UPDATE_RENDER.md)

## Contributing

Please read [CONTRIBUTING.md](.github/CONTRIBUTING.md) and [FEATURES_DEV.md](.github/FEATURES_DEV.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Issues

Please read [1_Bug_report.md](.github/1_Bug_report.md)

## Authors

* **Rafael Cruz** - *Initial work* - [Linkedin](https://www.linkedin.com/in/rafaelcr1/)

See also the list of [contributors](.github/contributors.md) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details
