var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var admsn = module.exports = {};
var common = require("../schoolapi/common.js");

// Save Student By Bulk Upload

admsn.bulkUploadStudents = function bulkUploadStudents(req, res, result, callback) {
    var _status = 1;
    var _message = "";

    if (common.checkDuplicates(result, true)) {
        _status = 0;
        _message = "Duplicate Records Not Allowed";
    } else {
        for (var i = 0; i < result.length; i++) {
            if (result[i].first_name == "") {
                _status = 0;
                _message = "Empty First Name";

                break;
            } else if (result[i].middle_name == "") {
                _status = 0;
                _message = "Empty Middle Name";

                break;
            } else if (result[i].last_name == "") {
                _status = 0;
                _message = "Empty Last Name";

                break;
            } else if (result[i].roll_no == "") {
                _status = 0;
                _message = "Empty Roll No In " + result[i].first_name;

                break;
            } else if (result[i].class_name == "") {
                _status = 0;
                _message = "Empty Class Name In " + result[i].first_name;

                break;
            } else if (result[i].dob == "") {
                _status = 0;
                _message = "Empty DOB In " + result[i].first_name;

                break;
            } else if (result[i].address == "") {
                _status = 0;
                _message = "Empty Address In " + result[i].first_name;

                break;
            } else if (result[i].father_name == "") {
                _status = 0;
                _message = "Empty Father Name In " + result[i].first_name;

                break;
            } else if (result[i].father_mobile == "") {
                _status = 0;
                _message = "Empty Father Mobile In " + result[i].first_name;

                break;
            } else if (result[i].father_email == "") {
                _status = 0;
                _message = "Empty Father Email In " + result[i].first_name;

                break;
            } else {
                _status = 1;
                _message = "";
            }
        }
    }

    if (_status == 1) {
        db.callFunction("select " + globals.erpschema("funsave_multistudentinfo") + "($1::json);", [req], function(data) {
            callback(data.rows[0]);
        }, function(err) {
            var errdt = { funsave_multistudentinfo: { msg: "Invalid Data Format - " + err, msgid: 401 } }
            callback(errdt);
        })
    } else {
        var errdt = { funsave_multistudentinfo: { msg: _message, msgid: _status } }
        res.json(errdt);
    }
}

// Save Student By Web

admsn.saveAdmissionInfo = function saveAdmissionInfo(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_admissioninfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

admsn.saveStudentInfo = function saveStudentInfo(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_studentinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

admsn.saveStudentRollover = function saveStudentRollover(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_studentrollover") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

admsn.getStudentDetails = function getStudentDetails(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_studentdetails") + "($1,$2::json);", ['sd', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

admsn.viewStudentDetails = function viewStudentDetails(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_studentview") + "($1,$2,$3::json);", ['sd1', 'sd2', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 2)
}

admsn.saveStudentVehicleMap = function saveStudentVehicleMap(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_studsvehmap") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}