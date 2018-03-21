var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var notification = module.exports = {};
var tripapi = require("../schoolapi/tripapi.js");

notification.saveNotification = function saveNotification(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_notification") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);

        // Parents Notification

        var _prntntf = {
            "flag": "parents_notification",
            "title": req.body.title,
            "body": req.body.msg,
            "prntids": data.rows[0].funsave_notification.prntids
        }

        tripapi.sendNotification(_prntntf);

        // Teacher Notification

        var _tchrntf = {
            "flag": "notification",
            "title": req.body.title,
            "body": req.body.msg,
            "tchrids": data.rows[0].funsave_notification.tchrids
        }

        tripapi.sendNotification(_tchrntf);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

notification.getNotification = function getNotification(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_notification") + "($1,$2::json);", ['ntf', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}