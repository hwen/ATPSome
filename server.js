var wechat          = require("wechat");
var express         = require("express");
var logger          = require("morgan");
var errorhandler    = require("errorhandler");
var bodyParser      = require("body-parser");
var fs              = require("fs");
var path            = require("path");
var routes          = require("./routes");
var config          = require("./config");
var session 		= require("express-session");
var cookieParser 	= require('cookie-parser');


var app = express();

//config
app.set('port', process.env.PORT || config.host.port);
app.use(logger('combined', {stream: fs.createWriteStream('./access.log', {flags: 'a'})}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({secret: config.secret,cookie: {maxAge: 60000}}));
app.use(express.static('dist'));
app.use(express.static('./src/asserts'))

// route
require('./routes')(app);


// error handler
app.use(errorhandler());

// start up server
app.listen(app.get('port'), function () {
    console.log('Server listening on:', app.get('port'));
});


