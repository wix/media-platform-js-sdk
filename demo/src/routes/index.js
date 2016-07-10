module.exports = function(app) {

    app.get('/', function(req, res, next) {
        res.render('index', { title: 'Wix Media Platform - Demo' });
    });

    app.get('/sdk', function(req, res, next) {
        res.render('sdk', { title: 'Wix Media Platform - Demo' });
    });
    
};