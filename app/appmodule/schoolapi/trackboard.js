var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var trackboard = module.exports = {};

trackboard.gettrackboard = function(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_api_trackboard") + "($1,$2::json);", ['vehtype', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1);
}
