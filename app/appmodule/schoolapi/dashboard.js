var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var dashboard = module.exports = {};

dashboard.getDashboard = function getDashboard(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_dashboard") + "($1,$2::json);", ['db', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

dashboard.getHelpDesk = function getHelpDesk(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_helpdesk") + "($1,$2,$3,$4::json);", ['hd1', 'hd2', 'hd3', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 3)
}