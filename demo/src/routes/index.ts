export default function(app) {

    app.get('/', function(req, res, next) {
        res.redirect('/browser');
    });

    app.get('/browser', function(req, res, next) {
        res.render('browser', { title: 'Wix Media Platform - Browser Demo' });
    });

    app.get('/server', function(req, res, next) {
        res.render('server', { title: 'Wix Media Platform - Server Demo' });
    });
};
