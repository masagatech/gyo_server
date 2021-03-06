var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var prspct = module.exports = {};

// Prospectus

prspct.saveProspectusInfo = function saveProspectusInfo(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_prospectusinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

prspct.getProspectusDetails = function getProspectusDetails(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_prospectusdetails") + "($1,$2::json);", ['prspct', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

// Prospectus Issued

prspct.saveProspectusIssued = function saveProspectusIssued(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_prospectusissued") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

prspct.getProspectusIssued = function getProspectusIssued(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_prospectusissued") + "($1,$2::json);", ['prspctiss', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}