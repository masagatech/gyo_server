var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var library = module.exports = {};

// Library

library.saveLibraryInfo = function saveLibraryInfo(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_libraryinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

library.getLibraryDetails = function getLibraryDetails(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_librarydetails") + "($1,$2::json);", ['libr', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

// Library Books

library.saveLibraryBooks = function saveLibraryBooks(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_librarybooks") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

library.saveLibraryBookIssued = function saveLibraryBookIssued(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_librarybookissued") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

library.getLibraryBooks = function getLibraryBooks(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_librarybooks") + "($1,$2::json);", ['librbk', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}