var mediaPlatform = require('../facades/media-platform-facade').mediaPlatform;
var Token = require('../../../src/index').auth.Token;
var NS = require('../../../src/index').auth.NS;
var userId = 'userId';

module.exports = function(app) {
    
    app.get('/media-platform/auth-header', function (req, res, next) {

        var token = new Token()
            .setIssuer(NS.APPLICATION, '48fa9aa3e9d342a3a33e66af08cd7fe3')
            .setSubject(NS.APPLICATION, '48fa9aa3e9d342a3a33e66af08cd7fe3')
            // .setObject()
            // .setVerbs(['*'])
            ;

        var header = mediaPlatform.getAuthenticationHeader(token);

        res.send(header);
    });
};