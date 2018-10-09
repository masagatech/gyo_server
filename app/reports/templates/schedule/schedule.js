var Handlebars = require('handlebars');
var reports = module.exports = {};
var globals = require("gen").globals;

var groupBy = require('handlebars-group-by');
groupBy.register(Handlebars);

reports.getScheduleReports = function getScheduleReports(data) {
    var _hndlbar = Handlebars;
    var scheduledt = data.data;
    var params = data.params;

    // User ID Params

    _hndlbar.registerHelper('uid', function(row) {
        return params.uid;
    });

    // User Type Params

    _hndlbar.registerHelper('utype', function(row) {
        return params.utype;
    });

    // Working Days

    _hndlbar.registerHelper('worktime', function(row) {
        if (row.trptm == "notrip") {
            return "<strong>Today's No Trip</strong> <hr />" + row.wkdays;
        } else {
            return row.trptm + " (" + row.wkname + ")<hr />" + row.wkdays;
        }
    });

    _hndlbar.registerHelper('nodatafound', function(row) {
        if (scheduledt.length == 0) {
            return "Schedule Not Created !!!! <br />Please Contact GOYO";
        } else {
            return "";
        }
    });

    // Fees Summary

    _hndlbar.registerHelper('feessummary', function(row) {
        if (row.isfeestrctr == true) {
            var _strfees = "";

            _strfees += "<div><span>Collected : " + row.feescoll + "</span></div>";
            _strfees += "<div><span>Pending : " + row.feespend + "</span></div>";

            return _strfees;
        } else {
            return "Fees Structure Not Created !!!!";
        }
    });

    // Fees Details

    _hndlbar.registerHelper('feesdetails', function(row) {
        if (row.isfeestrctr == true) {
            var _strfees = "<b>Collected : </b>" + row.feescoll + ", <b>Pending : </b>" + row.feespend;
            return _strfees;
        } else {
            return "";
        }
    });

    // Upload URL

    _hndlbar.registerHelper('reporturl', function(row) {
        return globals.reporturl;
    });

    return _hndlbar;
}