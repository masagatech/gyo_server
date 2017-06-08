var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var workspace = module.exports = {};

// workspace Master

workspace.saveWorkspaceInfo = function saveWorkspaceInfo(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_workspaceinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

workspace.getWorkspaceDetails = function getWorkspaceDetails(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_workspacedetails") + "($1,$2::json);", ['ws', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}