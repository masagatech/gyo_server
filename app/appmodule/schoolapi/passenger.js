var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var psngr = module.exports = {};
var common = require("../schoolapi/common.js");

// Save Student Location

psngr.saveStudentLocation = function saveStudentLocation(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_studentlocation") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

psngr.getStudentLocation = function getStudentLocation(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_studentlocation") + "($1,$2::json);", ['stdloc', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

// Save Passenger By Bulk Upload

psngr.bulkUploadPassenger = function bulkUploadPassenger(req, res, result, callback) {
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
            } else if (result[i].last_name == "") {
                _status = 0;
                _message = "Empty Last Name";

                break;
            } else if (result[i].gender == "") {
                _status = 0;
                _message = "Empty Gender In " + result[i].first_name;

                break;
            } else if (result[i].father_name == "") {
                _status = 0;
                _message = "Empty Father Name In " + result[i].first_name;

                break;
            } else if (result[i].father_mobile == "") {
                _status = 0;
                _message = "Empty Father Mobile In " + result[i].first_name;

                break;
            } else if (result[i].country == "") {
                _status = 0;
                _message = "Empty Country In " + result[i].first_name;

                break;
            } else if (result[i].state == "") {
                _status = 0;
                _message = "Empty State In " + result[i].first_name;

                break;
            } else {
                _status = 1;
                _message = "";
            }
        }
    }

    if (_status == 1) {
        db.callFunction("select " + globals.schema("funsave_multipassengerinfo") + "($1::json);", [req], function(data) {
            callback(data.rows[0]);
        }, function(err) {
            var errdt = { funsave_multipassengerinfo: { msg: "Invalid Data Format - " + err, msgid: 401 } }
            callback(errdt);
        })
    } else {
        var errdt = { data: { funsave_multipassengerinfo: { msg: _message, msgid: _status } } }
        res.json(errdt);
    }
}

// Save Company Passenger

psngr.savePassengerInfo = function savePassengerInfo(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_passengerinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

psngr.getPassengerDetails = function getPassengerDetails(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_passengerdetails") + "($1,$2::json);", ['psngr', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}