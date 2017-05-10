var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var order = module.exports = {};

order.saveOrderInfo = function saveOrderInfo(req, res, done) {
    db.callFunction("select " + globals.schema2("funsave_orderinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

order.updateOrderInfo = function updateOrderInfo(req, res, done) {
    db.callFunction("select " + globals.schema2("funupdate_orderinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}