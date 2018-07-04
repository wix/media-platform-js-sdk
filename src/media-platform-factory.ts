import {IConfiguration} from './platform/configuration/configuration';
import {MediaPlatform as MediaPlatformBrowser} from './public/platform/media-platform';
import {MediaPlatform} from './platform/media-platform';
import {IConfigurationBrowser} from './public/platform/configuration/configuration';

const isConfigurationBrowser = (configuration: IConfigurationBrowser | IConfiguration): configuration is IConfigurationBrowser => {
  return typeof configuration['authenticationUrl'] === 'string';
};

export function createMediaPlatform(configuration: IConfigurationBrowser): MediaPlatformBrowser;
export function createMediaPlatform(configuration: IConfiguration): MediaPlatform;

export function createMediaPlatform(configuration: IConfigurationBrowser | IConfiguration): MediaPlatform | MediaPlatformBrowser {
  if (isConfigurationBrowser(configuration)) {
    return new MediaPlatformBrowser(configuration);
  }
  return new MediaPlatform(configuration);
}
