var db = require("../../db/dbservice.js");
var rs = require("../util/resp.js");
var globals = require("../../globals.js");

var studentinfo = module.exports = {};

studentinfo.saveStudentInfo = function saveStudentInfo(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_studentinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

// studentinfo.getStudentGrid = function getStudentGrid(req, res, done) {
//     db.callProcedure("select " + globals.schema("funget_studentgrid") + "($1,$2,$3::json);", ['sg1', 'sg2', req.body], function(data) {
//         rs.resp(res, 200, data.rows);
//     }, function(err) {
//         rs.resp(res, 401, "error : " + err);
//     }, 2)
// }

studentinfo.getStudentDetail = function getStudentDetail(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_studentdetails") + "($1,$2::json);", ['sd', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}