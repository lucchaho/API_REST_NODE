var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var domains = require('./routes/domains');

var app = express();

app.set('views', __dirname + '/views'); // general config
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/domains.json', domains);

function startsWith(str, word) {
    return str.lastIndexOf(word, 0) === 0;
}

app.use(function(req, res, next) {
	var url = req.url;
	console.log(url);
	if (startsWith(url, "/api/domains.") && url != "/api/domains.json") {
		res.status(400);
		res.json({"code": 400, "message": "Wrong route extension! Use .json instead.", "datas": []});
		return;
	}
	next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	res.status(404);
	res.json({"code": 404, "message": "Resource not found."});
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
