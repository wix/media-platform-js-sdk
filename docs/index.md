---
title: "Media Platform JS SDK"
layout: simple
---

# Media Platform JS SDK

_PLEASE NOTE: this docs are for the current version 6 and later. 
You can find docs for versions 5- here: https://github.com/wix/media-platform-js-sdk/wiki ._

Welcome to the Wix Media Platform - JavaScript SDK wiki!
Here you can find the full documentation of the SDK's public methods.

First, if you haven't done so yet, register at [Wix Media Platform][wixmp-url], and create your [organization, project][org-and-project-start] and [application][application-start].

## Installation
```
npm i --save media-platform-js-sdk
```

Now you can instantiate the Media Platform in your project:

## Instantiating the Media Platform in the Server

```javascript
import {createMediaPlatform} from 'media-platform-js-sdk';

const mediaPlatform = createMediaPlatform({
    domain: '<As appears in the application page>',
    appId: '<As appears in the application page>',
    sharedSecret: '<As appears in the application page>'
});
```
## Instantiating the Media Platform in the Browser

```javascript
import {createMediaPlatform} from 'media-platform-js-sdk';

const mediaPlatform = createMediaPlatform({
    domain: '<As appears in the application page>',
    authenticationUrl: '<your authentication url - see example below>'
});
```

### From CDN:
```html
<script src="https://static.parastorage.com/unpkg/media-platform-js-sdk@6.0.0-alpha.36/dist/statics/media-platform.bundle.min.js"></script>
```

```javascript
const mediaPlatform = new MP.MediaPlatform({
    domain: '<As appears in the application page>',
    authenticationUrl: '<your authentication url - see example below>'
});
```

Authentication URL Node.js (with express) example:

```javascript
/**
 * Your own authentication mechanism comes here
 */
app.get('/media-platform/auth-header', function (req, res, next) {
    /**
     * @description by default, the header authenticates the application
     * @type {{Authorization}}
     */
    const header = mediaPlatform.getAuthorizationHeader();

    res.send(header);
});
```

[wix-url]: https://www.wix.com/
[wixmp-url]: https://console.wixmp.com/
[org-and-project-start]: https://support.wixmp.com/en/article/creating-your-organization-and-project
[application-start]: https://support.wixmp.com/en/article/creating-your-first-application


