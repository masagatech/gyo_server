var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var fees = module.exports = {};
var common = require("../schoolapi/common.js");

var tripapi = require("../schoolapi/tripapi.js");

fees.saveClassFees = function saveClassInfo(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_classfees") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

fees.getClassFees = function getClassFees(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_classfees") + "($1,$2,$3::json);", ['cf1', 'cf2', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 2)
}

fees.saveFeesCollection = function saveFeesCollection(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_feescollection") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);

        var _ntfdata = data.rows[0].funsave_feescollection;

        var _prntntf = {
            "flag": "parents_notification",
            "title": "Fees : " + _ntfdata.ntftitle,
            "body": _ntfdata.ntfmsg,
            "prntids": _ntfdata.prntids
        }

        tripapi.sendNotification(_prntntf);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

fees.getFeesCollection = function getFeesCollection(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_feescollection") + "($1,$2::json);", ['fcl', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

// Bulk Student Fees

fees.bulkUploadStudentFees = function bulkUploadStudentFees(req, res, result, callback) {
    var _status = 1;
    var _message = "";

    if (common.checkDuplicates(result, true)) {
        _status = 0;
        _message = "Duplicate Records Not Allowed";
    } else {
        for (var i = 0; i < result.length; i++) {
            if (result[i].student_name == "") {
                _status = 0;
                _message = "Empty Student Name";

                break;
            }
            if (result[i].roll_no == "") {
                _status = 0;
                _message = "Empty Roll No In " + result[i].student_name;

                break;
            }
            if (result[i].category == "") {
                _status = 0;
                _message = "Empty Category";

                break;
            }
            if (result[i].fees == "") {
                _status = 0;
                _message = "Empty Fess";

                break;
            }
            if (result[i].receive_date == "") {
                _status = 0;
                _message = "Empty Received Date";

                break;
            }
            if (result[i].payment_mode == "") {
                _status = 0;
                _message = "Empty Payment Mode";

                break;
            }
            if (result[i].payment_mode == "cheque") {
                if (result[i].cheque_no == "") {
                    _status = 0;
                    _message = "Empty Cheque No";

                    break;
                }
                if (result[i].cheque_date == "") {
                    _status = 0;
                    _message = "Empty Cheque Date";

                    break;
                }
            }

            _status = 1;
            _message = "";
        }
    }

    if (_status == 1) {
        db.callFunction("select " + globals.erpschema("funsave_multistudentfees") + "($1::json);", [req], function(data) {
            callback(data.rows[0]);
        }, function(err) {
            var errdt = { funsave_multistudentfees: { msg: "Invalid Data Format - " + err, msgid: 401 } }
            callback(errdt);
        })
    } else {
        var errdt = { data: { funsave_multistudentfees: { msg: _message, msgid: _status } } }
        res.json(errdt);
    }
}