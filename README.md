# Wix Media Platform

[![Build Status][travis-image]][travis-url] 
[![NPM version][npm-image]][npm-url] 
[![Downloads][downloads-image]][npm-url]

[Wix Media Platform][wixmp-url] is an end-to-end solution for all modern web media management, handling images, video and audio in the most efficient way on the market. From upload, storage, metadata management and all the way to delivery, Wix Media Platform takes care of all possible media workflows.

# JavaScript SDK

This package is an isomorphic JavaScript library (works both in Node JS and in the browser) that provides a convenient API to access Wix Media Platform services.  
Its documentation can be found [here](https://wix.github.io/media-platform-js-sdk).
 
The docs for older versions (v5) can be found in [Wiki tab](https://github.com/wix/media-platform-js-sdk/wiki).


## Installation

```bash
npm install media-platform-js-sdk --save
```
To get the most up-to-date version of the JS SDK, move to your project directory and type in ```npm update```:
```bash
cd media-platform-js-sdk
npm update
```
[Click here](https://docs.npmjs.com/getting-started/updating-local-packages) for more info.

## Running the Demo

```bash
git clone git@github.com:wix/media-platform-js-sdk.git

cd media-platform-js-sdk

npm install

npm run start:demo
```
and open http://localhost:3333/ in the browser


## Reporting Issues

Please use [the issue tracker](https://github.com/wix/media-platform-js-sdk/issues) to report issues related to this library, or to the Wix Media Platform API in general.

## Develop
If you want to help make Media Platform JS SDK better - **you are awesome** and you are welcome!
Please read the information below, it is very important to generate proper CHANGELOG and proper versioning.

#### We are using [standard-version](https://github.com/conventional-changelog/standard-version) - the tool with automate versioning and CHANGELOG generation, with semver and conventional commit messages.

So, you should name your commits via [conventional commits](https://www.conventionalcommits.org/en/).

#### Examples:
##### Why is `chore`, `style`, `refactor`, `docs`, `ci` or `build` entries not in my CHANGELOG?

These entries shouldn't make any difference to your end-users, unless there's a BREAKING CHANGE, in which case the entry **will** be included in the CHANGELOG. [Reference](https://github.com/conventional-changelog/standard-version/pull/195)
So in the [CHANGELOG.md](CHANGELOG.md) file you can see only commits with types `fix`, `feat` and text `BREAKING CHANGE`.

##### How to use type `fix`:
Commit with `fix` type will change the *patch* version: 1.0.**0** -> 1.0.**1**
```
fix: minor typos in code
```

##### How to use type `feat`:
Commit with `feat` type will change the *minor* version: 1.**0**.0 -> 1.**1**.0
```git
feat: allow provided config object to extend other configs
```

##### How to use `BREAKING CHANGE`:
A *BREAKING CHANGE* text can be part of commits of any(fix, feat, etc.) type and will change the *major* version: **1**.0.0 -> **2**.0.0
You should use `BREAKING CHANGE` with another type. [Specification](https://www.conventionalcommits.org/en/v1.0.0-beta.3/#specification)
```
fix: change photo service color results
BREAKING CHANGE: getPhotoColor returns array instead of object
```

#### Create an issue or make a Pull Request with proper commit names.

#### More info and examples
- [Git Commit Message Conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit?usp=sharing)
- [Semantic Commit Messages](https://seesparkbox.com/foundry/semantic_commit_messages)
- [Semantic Commit Messages #2](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716#semantic-commit-messages)

## License

We use a custom license, see [LICENSE.md](LICENSE.md).

## About Wix

[Wix.com][wix-url] is a leading cloud-based web development platform with more than 100 million registered users worldwide. 
Our powerful technology makes it simple for everyone to create a beautiful website and grow their business online.

## About Google Cloud Platform

[Google Cloud Platform](https://cloud.google.com/) enables developers to build, test and deploy applications on Google’s reliable infrastructure.
It offers computing, storage and application services for web, mobile and backend solutions.


[wix-url]: https://www.wix.com/
[wixmp-url]: https://console.wixmp.com/
[npm-image]: https://img.shields.io/npm/v/media-platform-js-sdk.svg
[npm-url]: https://npmjs.org/package/media-platform-js-sdk
[downloads-image]: https://img.shields.io/npm/dm/media-platform-js-sdk.svg
[travis-image]: https://travis-ci.org/wix/media-platform-js-sdk.svg?branch=master
[travis-url]: https://travis-ci.org/wix/media-platform-js-sdk
[org-and-project-start]: https://support.wixmp.com/en/article/creating-your-organization-and-project
[application-start]: https://support.wixmp.com/en/article/creating-your-first-application
[jobs-api]: https://support.wixmp.com/en/article/jobs
