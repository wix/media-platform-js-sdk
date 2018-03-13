import {IHTTPClient} from '../../../http/http-client';
import {Configuration as BrowserConfiguration} from '../../../../public/platform/configuration/configuration';
import {Configuration} from '../../../configuration/configuration';
import {Token} from '../../../authentication/token';

export interface WidgetInstance {
  name: string;
  applicationId: string;
  authentication: {
    custom: {
      url: string;
    }
  };
  settings: any;
}

interface WidgetInstanceAuthResponse {
  payload: {
    token: string;
  }
}

interface WidgetInstanceResponse {
  payload: WidgetInstance;
}

export class WidgetInstanceManager {

  constructor(private configuration: Configuration | BrowserConfiguration, private httpClient: IHTTPClient) {
  }

  private getInstanceURL(widgetInstanceId: string) {
    const {configuration} = this;
    return `https://${configuration.domain}/_api/widgetInstances/${widgetInstanceId}`;
  }

  private getAuthURL(widgetInstanceId: string) {
    return `${this.getInstanceURL(widgetInstanceId)}/auth`;
  }

  private auth(widgetInstanceId: string): Promise<string> {
    console.log('auth');
    return this.httpClient.get<WidgetInstanceAuthResponse>(this.getAuthURL(widgetInstanceId))
      .then(response => response.payload.token, error => {
        console.error('Error while auth', error);
        return '';
      });
  }

  public fetchWidgetInstance(widgetInstanceId: string): Promise<WidgetInstance> {
    const {httpClient} = this;
    const instanceURL = this.getInstanceURL(widgetInstanceId);
    return httpClient.get<WidgetInstanceResponse>(instanceURL)
      .then(response => response.payload)
      .catch(error => {
        console.error('error while fetching widget instance id', error);
        throw error;
      });
  }
}
