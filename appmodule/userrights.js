var db = require("../db/dbservice.js");
var rs = require("./util/resp.js");
var globals = require("../globals.js");

var ur = module.exports = {};

// ur.getUserRights = function getUserRights(req, res, done) {
//     db.callProcedure("select " + globals.schema("funget_userrights") + "($1,$2::json);", ['ur', req.body], function(data) {
//         rs.resp(res, 200, data.rows);
//     }, function(err) {
//         rs.resp(res, 401, "error : " + err);
//     }, 1)
// }

ur.getUserRights = function getUserRights(req, res, done) {
    var params = [];
    var paramstr = "";
    var countr  = 1;
    
    switch (req.body.flag) {
        case "view":
            params = ['ur','ur1', req.body];
            paramstr = "($1,$2,$3::json);";
            countr = 2;
            break;
        default:
            params = ['ur', req.body];
            paramstr = "($1,'a',$2::json);";
            countr = 1;
            break;
    }

    db.callProcedure("select " + globals.schema("funget_userrights") + paramstr,params, function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, countr)
}


ur.saveUserRights = function saveUserRights(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_userrights") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}