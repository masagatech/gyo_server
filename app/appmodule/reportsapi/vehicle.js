var db = require("db");
const gen = require("gen");

var rs = gen.res;
var globals = gen.globals;
var download = gen.download;

var vehicle = module.exports = {};
var vehiclepapi = require("../../reports/templates/transport/vehicle/vehicle.js");

vehicle.getVehicleReports = function getVehicleReports(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_vehicledetails") + "($1,$2::json);", ['veh', req.query], function(data) {
        download(req, res, {
            data: data.rows,
            params: req.query
        }, { 'all': "transport/vehicle/vehicle.html" }, vehiclepapi.getVehicleTransportReports);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}