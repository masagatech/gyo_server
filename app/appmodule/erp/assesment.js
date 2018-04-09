var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var ass = module.exports = {};

var tripapi = require("../schoolapi/tripapi.js");
var sms_email = require("../schoolapi/sendsms_email.js");

// Assesment Bench

ass.saveAssesmentInfo = function saveAssesmentInfo(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_assesmentinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

ass.getAssesmentDetails = function getAssesmentDetails(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_assesmentdetails") + "($1,$2::json);", ['ass', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

// Assesment Result

ass.saveAssesmentResult = function saveAssesmentResult(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_assesmentresult") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);

        if (req.body.issendemail == true) {
            var _assdata = data.rows[0].funsave_assesmentresult;

            // Send Parents Notification

            var _prntntf = {
                "flag": "parents_notification",
                "title": "Assesment Result : " + _assdata.studname,
                "body": "Sended Email, on your registered email, to " + _assdata.ntfmsg,
                "prntids": _assdata.prntids
            }

            tripapi.sendNotification(_prntntf);

            // Send Parents Email

            var _title = "";
            var _msg = "";
            var _path = "";
            var _attachments = [];

            var _uphone = _assdata.uphone;
            var _uemail = _assdata.uemail;
            var _studname = _assdata.studname;
            var _rollno = _assdata.rollno;
            var _classname = _assdata.classname;

            _title = "Assesment Result : " + _studname;

            _msg += "<p>Name : " + _studname + "</p>";
            _msg += "<p>Roll No : " + _rollno + "</p>";
            _msg += "<p>Standard : " + _classname + "</p>";
            _msg += "<p>See, Attachment File, " + _assdata.ntfmsg + ".</p>";

            _path = globals.reporturl + "/getAssesmentResultReports?flag=studentwise&ayid=" + req.body.ayid +
                "&asstypid=" + req.body.asstypid + "&asstyp=" + req.body.asstyp + "&classid=" + req.body.clsid +
                "&studid=" + req.body.studid + "&frmdt=" + req.body.frmdt + "&todt=" + req.body.todt +
                "&enttid=" + req.body.enttid + "&wsautoid=" + req.body.wsautoid + "&format=pdf";

            var _attachments = [{ "filename": "Assesment Result.pdf", "path": _path, contentType: 'application/pdf' }];

            var params = {
                "sms_to": _uphone,
                "sms_body": _msg,
                "mail_to": _uemail,
                "mail_subject": _title,
                "mail_body": _msg
            };

            sms_email.sendEmailAndSMS(params, _uphone, _uemail, _attachments, "email", req.body.enttid);
        }
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

ass.getAssesmentResult = function getAssesmentResult(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_assesmentresult") + "($1,$2::json);", ['assres', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}