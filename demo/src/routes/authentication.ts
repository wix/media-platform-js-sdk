import {auth} from '../../../src/server';
import {mediaPlatform} from '../facades/media-platform-facade';

const {Token, NS} = auth;

export default function (app) {

  /**
   * Your own authentication mechanism comes here
   */
  app.get('/media-platform/auth-header', function (req, res, next) {
    /**
     * @description by default, the header authorizes all the application verbs
     * @type {{Authorization}}
     */
    const header = mediaPlatform.getAuthorizationHeader();

    res.send(header);
  });

  /**
   * Your own authentication mechanism comes here
   */
  app.get('/media-platform/limited-auth-header', function (req, res, next) {

    const token = new Token()
      .setIssuer(NS.APPLICATION, '48fa9aa3e9d342a3a33e66af08cd7fe3')
      .setSubject(NS.APPLICATION, '48fa9aa3e9d342a3a33e66af08cd7fe3')
      .addVerbs('urn:service:file.get', 'urn:service:file.list');

    /**
     * @description you can limit the token to certain verbs
     * @type {{Authorization}}
     */
    const header = mediaPlatform.getAuthorizationHeader(token);

    res.send(header);
  });
};
