var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var medicine = module.exports = {};

medicine.saveMedicineInfo = function saveMedicineInfo(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_medicineinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

medicine.getMedicineDetails = function getMedicineDetails(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_medicinedetails") + "($1,$2::json);", ['mdc', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}