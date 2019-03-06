import * as nock from 'nock';
import * as path from 'path';
import { expect } from 'chai';
import { createHTTPClient } from '../../../http/http-client';
import {
  WidgetInstance,
  WidgetInstanceManager,
} from './widget-instance-manager';
import { Configuration } from '../../../configuration/configuration';
import * as widgetInstanceMock from './mock/widget-instance.mock.json';

describe('widget instances', () => {
  const domain = 'manager.com';
  const configuration = new Configuration(domain, 'secret', 'appId');
  const httpClient = createHTTPClient(configuration);
  const widgetInstanceId = 'AwidgetInstanceIdA';
  const widgetInstanceManager = new WidgetInstanceManager(
    configuration,
    httpClient,
  );
  const apiServer = nock(`https://${domain}/`).defaultReplyHeaders({
    'Content-Type': 'application/json',
  });

  afterEach(() => {
    nock.cleanAll();
  });

  const mockFolderPath = path.join(__dirname, 'mock');

  it('should return widget instance', () => {
    apiServer
      .get(`/_api/widgetInstances/${widgetInstanceId}/auth`)
      .replyWithFile(
        200,
        path.join(mockFolderPath, 'widget-instance-auth.mock.json'),
      );

    apiServer
      .get(`/_api/widgetInstances/${widgetInstanceId}`)
      .replyWithFile(
        200,
        path.join(mockFolderPath, 'widget-instance.mock.json'),
      );

    return widgetInstanceManager
      .fetchWidgetInstance(widgetInstanceId)
      .then((widgetInstance: WidgetInstance) => {
        expect(widgetInstance).to.deep.equal(widgetInstanceMock.payload);
      });
  });
});
