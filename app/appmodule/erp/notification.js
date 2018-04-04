var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var notification = module.exports = {};
var tripapi = require("../schoolapi/tripapi.js");
var sms_email = require("../schoolapi/sendsms_email.js");

notification.saveNotification = function saveNotification(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_notification") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);

        var _ntfdata = data.rows[0].funsave_notification;

        // Send Parents Notification

        // if (req.body.issendparents == true) {
        //     var _prntntf = {
        //         "flag": "parents_notification",
        //         "title": req.body.title,
        //         "body": req.body.msg,
        //         "prntids": _ntfdata.prntids
        //     }

        //     tripapi.sendNotification(_prntntf);
        // }

        // Send Teacher Notification

        if (req.body.issendteacher == true) {
            var _tchrntf = {
                "flag": "other_notification",
                "title": req.body.title,
                "body": req.body.msg,
                "uid": _ntfdata.tchrids,
                "utype": "{emp}"
            }

            tripapi.sendNotification(_tchrntf);
        }

        // Send Email And SMS

        var _uphone = _ntfdata.uphone;
        var _uemail = _ntfdata.uemail;

        var _title = req.body.title;
        var _msg = req.body.msg;
        var _attachments = [];

        var params = {
            "sms_to": _uphone,
            "sms_body": _title + " : " + _msg,
            "mail_to": _uemail,
            "mail_subject": _title,
            "mail_body": _msg
        };

        if (req.body.issendsms == true) {
            sms_email.sendEmailAndSMS(params, _uphone, _uemail, _attachments, "sms", req.body.enttid);
        }

        if (req.body.issendemail == true) {
            sms_email.sendEmailAndSMS(params, _uphone, _uemail, _attachments, "email", req.body.enttid);
        }
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