var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var content = module.exports = {};

content.getContentDetails = function getContentDetails(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_contentdetails") + "($1,$2::json);", ['cnt', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

content.saveContentInfo = function saveContentInfo(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_contentinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

content.saveContentDetails = function saveContentDetails(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_contentdetails") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

content.saveContentEntityMap = function saveContentEntityMap(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_contententitymap") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}