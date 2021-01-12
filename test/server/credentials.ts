'use strict';

import { Configuration } from '../../src/platform/configuration/configuration';

const DEMO_APP_DOMAIN = 'wixmp-6d17b5efd6f94144cded4052.appspot.com';
const DEMO_APP_APP_ID = '624d51e89a7a4c4b95f8b04cd5780c24';
const DEMO_APP_SHARED_SECRET = '661633b875414aee0fc50513b87c45f6';

export const credentials: Configuration = {
  domain: process.env.WIX_TEST_DOMAIN || DEMO_APP_DOMAIN,
  appId: process.env.WIX_TEST_APP_ID || DEMO_APP_APP_ID,
  sharedSecret: process.env.WIX_TEST_SHARED_SECRET || DEMO_APP_SHARED_SECRET,
};
