var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var brkdwn = module.exports = {};

brkdwn.saveBreakDown = function saveBreakDown(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_breakdown") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

brkdwn.getBreakDown = function getBreakDown(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_breakdown") + "($1,$2::json);", ['bd', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}