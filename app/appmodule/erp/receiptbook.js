var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var rb = module.exports = {};

rb.saveReceiptBook = function saveReceiptBook(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_receiptbook") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

rb.getReceiptBook = function getReceiptBook(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_receiptbook") + "($1,$2::json);", ['rb', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}