# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="8.0.0-alpha.7"></a>
# [8.0.0-alpha.7](https://github.com/wix/media-platform-js-sdk/compare/v8.0.0-alpha.6...v8.0.0-alpha.7) (2019-04-23)



<a name="8.0.0-alpha.6"></a>
# [8.0.0-alpha.6](https://github.com/wix/media-platform-js-sdk/compare/v8.0.0-alpha.5...v8.0.0-alpha.6) (2019-04-23)



<a name="8.0.0-alpha.5"></a>
# [8.0.0-alpha.5](https://github.com/wix/media-platform-js-sdk/compare/v8.0.0-alpha.4...v8.0.0-alpha.5) (2019-04-15)



<a name="8.0.0-alpha.4"></a>
# [8.0.0-alpha.4](https://github.com/wix/media-platform-js-sdk/compare/v7.0.0...v8.0.0-alpha.4) (2019-04-15)


### Bug Fixes

* async/queue import ([bbcf4e5](https://github.com/wix/media-platform-js-sdk/commit/bbcf4e5))
* demo app imports ([d48da22](https://github.com/wix/media-platform-js-sdk/commit/d48da22))
* make TS typings working correctly ([bfd7825](https://github.com/wix/media-platform-js-sdk/commit/bfd7825))

### Features
* reduce bundle sizes ([bfd7825](https://github.com/wix/media-platform-js-sdk/commit/bfd7825))

### BREAKING CHANGES
* split browser and server code

**old import, for browser and server imports are the same:**
```
import {  MediaPlatform } from 'media-platform-js-sdk/dist/src/index';
```

**new imports are different for browser and server**

for browser only:
```
import { MediaPlatform } from 'media-platform-js-sdk/browser';
```

for server only:
```
import { MediaPlatform } from 'media-platform-js-sdk/server';
```


<a name="7.0.0"></a>
# [7.0.0](https://github.com/wix/media-platform-js-sdk/compare/v6.0.4...v7.0.0) (2019-04-12)


### Bug Fixes

* downloadUrlRequest ([1d4c0b5](https://github.com/wix/media-platform-js-sdk/commit/1d4c0b5))
* fileDescriptor types ([468968b](https://github.com/wix/media-platform-js-sdk/commit/468968b))
* new Image().toUrl() without geometry parameter ([94277b4](https://github.com/wix/media-platform-js-sdk/commit/94277b4))
* remove callbacks in HTTPClient ([f83fba1](https://github.com/wix/media-platform-js-sdk/commit/f83fba1))
* Use Blob type instead of File type in UploadJob ([da2cd4f](https://github.com/wix/media-platform-js-sdk/commit/da2cd4f))


### Features

* add `dateExpired` to `fileDescriptor` ([a6b62b5](https://github.com/wix/media-platform-js-sdk/commit/a6b62b5))
* add `explicitContent` to `ImageFeatures` ([8cae0ee](https://github.com/wix/media-platform-js-sdk/commit/8cae0ee))
* add bucket to FileDescriptor ([2a732f6](https://github.com/wix/media-platform-js-sdk/commit/2a732f6))
* Add createFolder method to fileManagement service ([2c9402a](https://github.com/wix/media-platform-js-sdk/commit/2c9402a))
* add delete lifecycle ([dcfcab0](https://github.com/wix/media-platform-js-sdk/commit/dcfcab0))
* update Typescript to 3 major version ([8101e0a](https://github.com/wix/media-platform-js-sdk/commit/8101e0a))

### BREAKING CHANGES

* remove callbacks
* pass data to constructor
* use AVManager instead of TranscodeManager

<a name="6.0.4"></a>
## [6.0.4](https://github.com/wix/media-platform-js-sdk/compare/v6.0.1...v6.0.4) (2019-04-12)


### Bug Fixes

* **demo app:** fix imports ([b4b235f](https://github.com/wix/media-platform-js-sdk/commit/b4b235f))

* add error handler to postForm ([fb87d6d](https://github.com/wix/media-platform-js-sdk/commit/fb87d6d))


<a name="6.0.1"></a>
## 6.0.1 (2018-07-05)


### Bug Fixes

* package.json to reduce vulnerabilities ([7ea846f](https://github.com/wix/media-platform-js-sdk/commit/7ea846f))



<a name="6.0.0"></a>
# 6.0.0 (2018-07-05)

### Features

* Migrated to Typescript
* Job Observable
* Live streams
* File Manager ACL switchers
* Add support for 'type' query for getListFiles ([d500a543a59e0a3c58f83693ee801628a52ed053](https://github.com/wix/media-platform-js-sdk/commit/d500a543a59e0a3c58f83693ee801628a52ed053))
* New docs
* Able to import from 'media-platform-js-sdk' directly
* AV packaging
* Feature extract
* Extract video posters
* Upload abort

### Deprecations

These things are deprecated and will be removed from the v7

* Callbacks. Use promises responses instead.
* getters and setters. Pass data into constructors

### Bug Fixes

* package.json to reduce vulnerabilities ([7ea846f](https://github.com/wix/media-platform-js-sdk/commit/7ea846f))
