var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;


var trip = module.exports = {};
trip.mytrips = function(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_api_mytrips") + "($1,$2::json);", ['mytrips', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1);
}

trip.getcrews = function(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_api_tripcrews") + "($1,$2::json);", ['tripcrews', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1);
}


trip.starttrip = function(req, res, done) {
    req.body.mode = "start";
    db.callFunction("select " + globals.schema("funsave_api_startstoptrip") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows[0].funsave_api_startstoptrip);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    });

    // db.callFunction("select " + globals.schema("funsave_api_startstoptrip") + "($1::json);", [req.body], function(data) {
    //     rs.resp(res, 200, data.rows);
    // }, function(err) {
    //     rs.resp(res, 401, "error : " + err);
    // });
}

trip.stoptrip = function(req, res, done) {
    req.body.mode = "stop";
    db.callFunction("select " + globals.schema("funsave_api_startstoptrip") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows[0].funsave_api_startstoptrip);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    });
}


trip.picdrpcrew = function(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_api_pickupdropcrew") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows[0].funsave_api_pickupdropcrew);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    });
}