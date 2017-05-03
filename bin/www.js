//service stuff
//udp listner

var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//##############################################################################################
app.all('/*', function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain

    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,App-Id,Password');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});
//##############################################################################################	

var routes = require("../routes/routes.js")(app);
var schroute = require("../routes/schapi.js")(app);

//##############################################################################################

// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
//#############################################################################################
///start API server

var expserver = server.listen(8082, "0.0.0.0", function() {
    console.log("API Server is listening on port %s...", expserver.address().port);
});

//var reportServer = require("./report-server.js");