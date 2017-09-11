var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var books = module.exports = {};

books.saveBooksInfo = function saveBooksInfo(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_booksinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

books.getBooksDetails = function getBooksDetails(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_booksdetails") + "($1,$2::json);", ['bk', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}