var db = require("../db/dbservice.js");
var rs = require("./util/resp.js");
var globals = require("../globals.js");

var pidr = module.exports = {};

pidr.savePickDropInfo = function savePickDropInfo(req, res, done) {
    db.callFunction("select " + globals.schema2("funsave_pickdropinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

// pidr.getPickDropGrid = function getPickDropGrid(req, res, done) {
//     db.callProcedure("select " + globals.schema2("funget_pickdropgrid") + "($1,$2,$3::json);", ['pd1', 'pd2', req.body], function(data) {
//         rs.resp(res, 200, data.rows);
//     }, function(err) {
//         rs.resp(res, 401, "error : " + err);
//     }, 2)
// }

pidr.getPickDropDetail = function getPickDropDetail(req, res, done) {
    db.callProcedure("select " + globals.schema2("funget_pickdropdetails") + "($1,$2::json);", ['pd', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}