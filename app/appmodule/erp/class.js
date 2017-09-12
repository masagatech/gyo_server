var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var classm = module.exports = {};

classm.saveClassInfo = function saveClassInfo(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_classinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

classm.getClassDetails = function getClassDetails(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_classdetails") + "($1,$2::json);", ['cls', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}