var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var tripapi = require("../schoolapi/tripapi.js");
var vts = module.exports = {};

function saveNotification(req, res, _data) {
    var params = {
        "grpid": 0,
        "frmid": 1,
        "frmtype": "admin",
        "remark3": {
            "almtyp": req.query.almtyp,
            "btcid": req.query.batchid,
            "drvid": req.query.drvid,
            "vehid": req.query.vehid,
            "rtid": req.query.rtid,
            "stpid": req.query.stpid,
            "stptype": req.query.stptype,
            "pdtype": req.query.pdtype
        },
        "studid": _data.studid,
        "title": _data.title,
        "msg": _data.msg,
        "sendtype": "{parents}",
        "ntftype": "fence",
        "enttid": req.query.enttid,
        "issendsms": false,
        "issendemail": false,
        "cuid": "admin.goyo"
    };

    db.callFunction("select " + globals.erpschema("funsave_notification") + "($1::json);", [params], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

vts.getFence = function(req, res, done) {
    var ntfparams = {
        "flag": "notification",
        "almtyp": req.query.almtyp,
        "batchid": req.query.batchid,
        "drvid": req.query.drvid,
        "vehid": req.query.vehid,
        "rtid": req.query.rtid,
        "stpid": req.query.stpid,
        "stptype": req.query.stptype,
        "pdtype": req.query.pdtype,
        "enttid": req.query.enttid
    };

    db.callProcedure("select " + globals.schema("funget_pickdropdetails") + "($1,$2::json);", ['ntf', ntfparams], function(data) {
        var _data = data.rows[0];

        if (_data.status == 0) {
            rs.resp(res, 200, _data);
        } else {
            saveNotification(req, res, _data);

            var dparams = {
                "flag": req.query.almtyp,
                "enttid": req.query.enttid,
                "batchid": req.query.batchid,
                "drvid": req.query.drvid,
                "vehid": req.query.vehid,
                "rtid": req.query.rtid,
                "stpid": req.query.stpid,
                "stptype": req.query.stptype,
                "pdtype": req.query.pdtype
            };

            tripapi.sendNotification(dparams);
        }
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}