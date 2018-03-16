var db = require("db");
const gen = require("gen");

var rs = gen.res;
var globals = gen.globals;
var download = gen.download;

var exam = module.exports = {};
var common = require("../schoolapi/common.js");

var reportsapi = require("../../reports/apis/reports.js");

// Exam

exam.saveExamInfo = function saveExamInfo(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_examinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

exam.getExamDetails = function getExamDetails(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_examdetails") + "($1,$2::json);", ['exam', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

// Save Exam Result By Bulk Upload

exam.bulkUploadExamResult = function bulkUploadExamResult(req, res, result, callback) {
    var _status = 1;
    var _message = "";

    if (common.checkDuplicates(result, true)) {
        _status = 0;
        _message = "Duplicate Records Not Allowed";
    } else {
        for (var i = 0; i < result.length; i++) {
            if (result[i].exam_date == "") {
                _status = 0;
                _message = "Empty Exam Date";

                break;
            } else if (result[i].from_time == "") {
                _status = 0;
                _message = "Empty From Time";

                break;
            } else if (result[i].to_time == "") {
                _status = 0;
                _message = "Empty To Time";

                break;
            } else if (result[i].roll_no == "") {
                _status = 0;
                _message = "Empty Roll No In " + result[i].student_name;

                break;
            } else if (result[i].student_name == "") {
                _status = 0;
                _message = "Empty Student Name";

                break;
            } else if (result[i].subject_name == "") {
                _status = 0;
                _message = "Empty Subject In " + result[i].student_name;

                break;
            } else if (result[i].marks == "") {
                _status = 0;
                _message = "Empty Marks In " + result[i].student_name;

                break;
            } else if (result[i].marks < result[i].out_of_marks) {
                _status = 0;
                _message = "Marks is " + result[i].marks + " and Out of Marks is " + result[i].out_of_marks + ", Enter Marks should be less than Out of Marks in " + result[i].subject_name + " For " + result[i].student_name;

                break;
            } else {
                _status = 1;
                _message = "";
            }
        }
    }

    if (_status == 1) {
        db.callFunction("select " + globals.erpschema("funsave_examresult") + "($1::json);", [req], function(data) {
            callback(data.rows);
        }, function(err) {
            callback("error : " + err);
        })

    } else {
        res.json({ status: _status, message: _message, data: null });
        // res.send(500, _message);
    }
}

// Save Exam Result By Web

exam.saveExamResult = function saveExamResult(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_examresult") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

exam.getExamResult = function getExamResult(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_examresult") + "($1,$2::json);", ['examres', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

exam.downloadExamResult = function downloadExamResult(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_examresult") + "($1,$2::json);", ['examresrpt', req.query], function(data) {
        if (req.query.type == "all") {
            download(req, res, {
                data: data.rows,
                params: req.query
            }, { 'all': 'examresult/examresultformat.html' }, reportsapi.getReports);
        } else {
            download(req, res, {
                data: data.rows[0],
                params: req.query
            }, { 'all': 'examresult/examresultformat.html' }, reportsapi.getReports);
        }
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}