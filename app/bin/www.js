var conf = require("gen").conf;
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var path = require('path');

var mondb = require("../db/mongodbservice.js"); //mongo db import
mondb.start();

var socketserver = require("./socketserver.js"); //socket server for instant message
socketserver.io = io;
socketserver.start();

var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

console.log(path.join(__dirname.replace(/\\app\\bin/gi, ""), '\\www\\uploads'));

//###############################################################################################

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,App-Id,Password');

    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

app.use('/images', express.static(__dirname.replace('app', "www").replace('bin', 'uploads')));

// ##############################################################################################	

var bulkupload = require("../routes/bulkupload.js")(app);
var routes = require("../routes/routes.js")(app);
var erp = require("../routes/erp.js")(app);
var schroute = require("../routes/schapi.js")(app);
var mrchtroute = require("../routes/merchant.js")(app);

// ##############################################################################################

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// ##############################################################################################

// start API server

var expserver = server.listen(conf.server.port, conf.server.ip, function() {
    console.log("API Server is listening on port %s...", expserver.address().port);
});

// ##############################################################################################