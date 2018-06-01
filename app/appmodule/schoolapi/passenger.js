var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var psngr = module.exports = {};

psngr.savePassengerInfo = function savePassengerInfo(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_passengerinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

psngr.getPassengerDetails = function getPassengerDetails(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_passengerdetails") + "($1,$2::json);", ['psngr', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}