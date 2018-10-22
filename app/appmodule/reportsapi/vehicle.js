var db = require("db");
const gen = require("gen");

var rs = gen.res;
var globals = gen.globals;
var download = gen.download;

var vehicle = module.exports = {};
var vehtrnspapi = require("../../reports/templates/transport/vehicle/vehicle.js");
var vehmstapi = require("../../reports/templates/master/vehicle/vehicle.js");

vehicle.getVehicleReports = function getVehicleReports(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_vehicledetails") + "($1,$2::json);", ['veh', req.query], function(data) {
        var formname = "";
        var apiname = null;

        if (req.query.flag == "trnsp_reports") {
            formname = "transport/vehicle/vehicle.html";
            apiname = vehtrnspapi.getVehicleTransportReports;
        } else {
            formname = "master/vehicle/vehicle.html";
            apiname = vehmstapi.getVehicleMasterReports;
        }

        download(req, res, {
            data: data.rows,
            params: req.query
        }, { 'all': formname }, apiname);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}