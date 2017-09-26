var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var album = module.exports = {};

album.saveAlbumInfo = function saveAlbumInfo(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_albuminfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

album.getAlbumDetails = function getAlbumDetails(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_albumdetails") + "($1,$2::json);", ['album', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

album.savePhotoInfo = function savePhotoInfo(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_photoinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

album.getPhotoDetails = function getPhotoDetails(req, res, done) {
    db.callProcedure("select " + globals.erpschema("funget_photodetails") + "($1,$2::json);", ['photo', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}