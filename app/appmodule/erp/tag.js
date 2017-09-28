var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var tagm = module.exports = {};

// Tag Group

tagm.saveTagInfo = function saveTagInfo(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_taginfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

tagm.getTagDetails = function getTagDetails(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_tagdetails") + "($1,$2::json);", ['tag', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

// Tag Group Module Mapping

tagm.saveTagGroupModuleMap = function saveTagGroupModuleMap(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_taggrpmdlmap") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

tagm.getTagGroupModuleMap = function getTagGroupModuleMap(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_taggrpmdlmap") + "($1,$2::json);", ['tag', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}