var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var assignment = module.exports = {};
var tripapi = require("../schoolapi/tripapi.js");
var sms_email = require("../schoolapi/sendsms_email.js");

// Homework

assignment.saveAssignmentInfo = function saveAssignmentInfo(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_assignmentinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);

        var _ntfdata = data.rows[0].funsave_assignmentinfo;

        // Send Parents Notification

        var _prntntf = {
            "flag": "parents_notification",
            "title": req.body.title,
            "body": req.body.msg,
            "prntids": _ntfdata.prntids
        }

        tripapi.sendNotification(_prntntf);

        // Send Parents Email

        if (req.body.issendemail == true) {
            var _uphone = _ntfdata.uphone;
            var _uemail = _ntfdata.uemail;
            var _fileext = _ntfdata.fileext;

            var _title = req.body.title;
            var _msg = req.body.msg;
            var _attachments;

            if (req.body.uploadassnm == undefined || req.body.uploadassnm == "") {
                _attachments = [];
            } else {
                _attachments = [{ "filename": _title + "." + _fileext, "path": globals.uploadurl + "/" + req.body.uploadassnm }];
            }

            var params = {
                "sms_to": _uphone,
                "sms_body": _title + " : " + _msg,
                "mail_to": _uemail,
                "mail_subject": _title,
                "mail_body": _msg
            };

            console.log(params);

            sms_email.sendEmailAndSMS(params, _uphone, _uemail, _attachments, "email");
        }
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

assignment.getAssignmentDetails = function getAssignmentDetails(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_assignmentdetails") + "($1,$2::json);", ['assnm', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

// Teacher Remark

assignment.saveTeacherRemark = function saveTeacherRemark(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_teacherremark") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);

        var _ntfdata = data.rows[0].funsave_teacherremark;

        // Send Parents Notification

        var _prntntf = {
            "flag": "parents_notification",
            "title": "Teacher Remark",
            "body": req.body.remark,
            "prntids": _ntfdata.prntids
        }

        tripapi.sendNotification(_prntntf);

        // Send Parents Email

        if (req.body.issendemail == true) {
            var _uphone = _ntfdata.uphone;
            var _uemail = _ntfdata.uemail;

            var _title = "Teacher Remark";
            var _msg = req.body.remark;
            var _attachments = [];

            var params = {
                "sms_to": _uphone,
                "sms_body": _title + " : " + _msg,
                "mail_to": _uemail,
                "mail_subject": _title,
                "mail_body": _msg
            };

            sms_email.sendEmailAndSMS(params, _uphone, _uemail, _attachments, "email");
        }
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

assignment.getTeacherRemark = function getTeacherRemark(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_teacherremark") + "($1,$2::json);", ['assnm', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}