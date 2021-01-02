var path = require('path');
var express = require('express');
var port = process.env.PORT || 8080;
var host = process.env.HOST || '0.0.0.0';
var app = express();
var http = require('http');
var compression = require('compression')
var cpFile = require('cp-file');
var errorHandler = require('express-error-handler');

cpFile('assets/index.prod.html', 'public/assets/index.html').then(function() {
  console.log('Copied index.html');
});

cpFile('assets/app.css', 'public/assets/app.css').then(function(){
  console.log('Copied app.css');
});

app.use(compression());

var serveStatic = require('serve-static')
app.use(serveStatic(path.join(__dirname, 'public', 'assets')));

var envs = require('envs');
app.set('environment', envs('NODE_ENV', 'production')); 

var routes = function (app) {
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'assets','index.html'));
  });
}
var router = express.Router();
routes(router);
app.use(router);

server = http.createServer(app);
app.use(function (err, req, res, next) {
  console.log(err);
  next(err);
});
app.use( errorHandler({server: server}) );

app.listen(port, host, function() {
  console.log('Server started at http://'+host+':'+port);
});



