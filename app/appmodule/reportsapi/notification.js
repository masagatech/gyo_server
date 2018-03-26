var db = require("db");
const gen = require("gen");

var rs = gen.res;
var globals = gen.globals;
var download = gen.download;

var notification = module.exports = {};

var rptntfapi = require("../../reports/templates/notification/notification.js");

notification.getNotification = function getNotification(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_notification") + "($1,$2::json);", ['rptntf', req.query], function(data) {
        if (req.query.flag == "reports") {
            if (req.query.type == "manual") {
                download(req, res, {
                    data: data.rows,
                    params: req.query
                }, { 'all': 'notification/manual.html' }, rptntfapi.getNotificationReports);
            } else if (req.query.type == "system") {
                download(req, res, {
                    data: data.rows,
                    params: req.query
                }, { 'all': 'notification/system.html' }, rptntfapi.getNotificationReports);
            }
        } else {
            rs.resp(res, 200, data.rows);
        }
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}