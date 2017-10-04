var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var dashboard = module.exports = {};

dashboard.getERPDashboard = function getERPDashboard(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_dashboard") + "($1,$2::json);", ['db', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}