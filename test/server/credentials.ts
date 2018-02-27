'use strict';

import {Configuration} from '../../src/platform/configuration/configuration';

const DEMO_APP_DOMAIN = 'wixmp-4b1aa7b28bada0ca23c4d299.appspot.com';
const DEMO_APP_APP_ID = '959010acd669459c807ad9e1986a25e8';
const DEMO_APP_SHARED_SECRET = 'dcc04e5f2ca89d95ef488fa5b3adf736';

export const credentials: Configuration = {
  domain: process.env.WIX_TEST_DOMAIN || DEMO_APP_DOMAIN,
  appId: process.env.WIX_TEST_APP_ID || DEMO_APP_APP_ID,
  sharedSecret: process.env.WIX_TEST_SHARED_SECRET || DEMO_APP_SHARED_SECRET
};
