var db = require("../../db/dbservice.js");
var rs = require("../util/resp.js");
var globals = require("../../globals.js");

var batch = module.exports = {};

batch.saveBatchInfo = function saveBatchInfo(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_batchinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

batch.getBatchDetails = function getBatchDetails(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_batchdetails") + "($1,$2::json);", ['bi', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}