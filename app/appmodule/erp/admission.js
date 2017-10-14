var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var admsn = module.exports = {};

admsn.saveAdmissionInfo = function saveAdmissionInfo(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_admissioninfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

admsn.getAdmissionDetails = function getAdmissionDetails(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_admissiondetails") + "($1,$2::json);", ['admsn', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}