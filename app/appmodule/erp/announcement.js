var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var announcement = module.exports = {};
var tripapi = require("../schoolapi/tripapi.js");
var sms_email = require("../schoolapi/sendsms_email.js");

announcement.saveAnnouncement = function saveAnnouncement(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_announcement") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);

        var _anncdata = data.rows[0].funsave_announcement;

        // Send Notification

        var _notification = {
            "flag": "parents_notification",
            "title": req.body.title,
            "body": req.body.desc,
            "parentsid": _anncdata.prntids
        }

        tripapi.sendNotification(_notification);

        // Send Email And SMS

        var _uphone = _anncdata.uphone;
        var _uemail = _anncdata.uemail;
        var _anncdate = _anncdata.anncdate;

        var _title = "Announement - " + req.body.title;
        var _msg = req.body.desc + " at, " + _anncdate;
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

announcement.getAnnouncement = function getAnnouncement(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_announcement") + "($1,$2::json);", ['annc', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}