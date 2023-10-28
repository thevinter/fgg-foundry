# Developer Instructions

First, you should first install node.js.  The NodeJS installation instructions are outside the scope of this document, but https://nodejs.org/en/ is a good starting point. 

After that, the [Gulp](https://gulpjs.com) build tool should also be installed for convenience. 

``` sh
$ npm install
$ npm install -g gulp 
```

There are several gulp tasks that can be executed once the dependencies are installed.

## Build

``` sh
$ gulp build
``` 

Gulp Build will create a new directory 'dist' which contains the files for distribution and installation in Foundry. The .scss and .less files will be compiled into CSS, and any TypeScript files will be compiled into Javascript.

## Watch

``` sh
$ gulp watch
```

Gulp Watch is a continually running version of Gulp Build. This is particularly useful during development, when you're often changing the files, and want the updated, re-compiled files to be present in the browser as quickly as possible. It should not be used for generating production code, but it's useful for debugging and rapidly cycling on code.

## Link

``` sh
$ gulp link
```

Speaking of commands that are useful during development, Gulp link will copy the dist directory into a foundry installation whose path is specified in the foundryconfig.json file so that you do not need to download an installation from a public manifest. Only developers should utilize this method, as it breaks the upgrade automation that is used in Foundry, but if you're trying to install the For Gold & Glory system to your local copy of Foundry for testing, this is a simple way to do so.

## Package
``` sh
$ gulp package
```

This command builds a complete .zip file of the FGG system for distribution.  The .zip file will be placed in the /package directory under the project root.

## Publish
``` sh
$ gulp publish --update 0.12.0
or
$ gulp publish --update [major|minor|patch]
```

This command will attempt to build the .zip file for distribution, update the system manifest in [system.json](src/system.json) using the information in the [foundryconfig.json](foundryconfig.json) and publish the package, and updated manifest to gitlab, with a tag indicating the version number. When updating with a specific version number, you must choose a new version number later than the one already in system.json. When using the "major|minor|patch" notation with the update flag, the new version number will be auto-calculated from the existing version number in the mainfest.