var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var inventory = module.exports = {};

var common = require("../schoolapi/common.js");

// Device

inventory.saveDeviceInfo = function saveDeviceInfo(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_deviceinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

inventory.getDeviceDetails = function getDeviceDetails(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_devicedetails") + "($1,$2::json);", ['veh', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

// Sim Master

inventory.saveSimInfo = function saveSimInfo(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_siminfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

inventory.getSimDetails = function getSimDetails(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_simdetails") + "($1,$2::json);", ['veh', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

// Device Sim Mapping

inventory.saveDeiviceSimMapping = function saveDeiviceSimMapping(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_devsimmap") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

inventory.getDeiviceSimMapping = function getDeiviceSimMapping(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_devsimmap") + "($1,$2::json);", ['veh', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

// Save Bulk Upload For (Device, SIM and Device SIM Mapping)

inventory.bulkUploadInventory = function bulkUploadInventory(req, res, result, savetype, callback) {
    var _status = 1;
    var _message = "";

    if (common.checkDuplicates(result, true)) {
        _status = 0;
        _message = "Duplicate Records Not Allowed";
    } else {
        if (savetype == "device") {
            for (var i = 0; i < result.length; i++) {
                if (result[i].device_type == "") {
                    _status = 0;
                    _message = "Empty Device Type";

                    break;
                } else if (result[i].imei_no == "") {
                    _status = 0;
                    _message = "Empty IMEI No";

                    break;
                } else if (result[i].company_name == "") {
                    _status = 0;
                    _message = "Empty Company Name";

                    break;
                } else if (result[i].purchase_date == "") {
                    _status = 0;
                    _message = "Empty Purchase Date";

                    break;
                }
            }
        } else if (savetype == "sim") {
            for (var i = 0; i < result.length; i++) {
                if (result[i].sim_no == "") {
                    _status = 0;
                    _message = "Empty SIM No";

                    break;
                } else if (result[i].mobile_no == "") {
                    _status = 0;
                    _message = "Empty Mobile No";

                    break;
                } else if (result[i].company_name == "") {
                    _status = 0;
                    _message = "Empty Company Name";

                    break;
                } else if (result[i].purchase_date == "") {
                    _status = 0;
                    _message = "Empty Purchase Date";

                    break;
                }
            }
        } else {
            _status = 1;
            _message = "";
        }
    }

    if (_status == 1) {
        db.callFunction("select " + globals.schema("funsave_inventoryinfo") + "($1::json);", [req], function(data) {
            callback(data.rows[0]);
        }, function(err) {
            var errdt = { funsave_inventoryinfo: { msg: "Invalid Data Format - " + err, msgid: 401 } }
            callback(errdt);
        })
    } else {
        var errdt = { data: { funsave_inventoryinfo: { msg: _message, msgid: _status } } }
        res.json(errdt);
    }
}