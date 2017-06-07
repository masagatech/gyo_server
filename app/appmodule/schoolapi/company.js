var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var company = module.exports = {};

// Company Master

company.saveCompanyInfo = function saveCompanyInfo(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_companyinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

company.getCompanyDetails = function getCompanyDetails(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_companydetails") + "($1,$2::json);", ['cmp', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}