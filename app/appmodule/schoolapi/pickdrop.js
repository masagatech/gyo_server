var db = require("db");
const gen = require("gen");

var rs = gen.res;
var globals = gen.globals;

var request = require('request');

var pidr = module.exports = {};

pidr.savePickDropInfo = function savePickDropInfo(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_pickdropinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

pidr.saveTrackingInfo = function saveTrackingInfo(req, res, done) {
    var params = {
        "flag": "tracking",
        "batchid": req.query.batchid,
        "pvehid": req.query.pvehid,
        "dvehid": req.query.dvehid,
        "prtid": req.query.prtid,
        "drtid": req.query.drtid,
        "enttid": req.query.enttid
    }

    db.callProcedure("select " + globals.schema("funget_pickdropdetails") + "($1,$2::json);", ['pd', params], function(data) {
        // rs.resp(res, 200, data.rows);
        console.log(data.rows);

        request.post(
            globals.geofenceapiurl, {
                json: {
                    "data": data.rows
                }
            },
            function(error, response, _data) {
                rs.resp(res, 200, response.body);
            },
            function(err) {
                rs.resp(res, 401, "error : " + err);
            }
        );
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

pidr.getPickDropDetails = function getPickDropDetails(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_pickdropdetails") + "($1,$2::json);", ['pd', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}