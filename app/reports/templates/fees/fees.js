var Handlebars = require('handlebars');
var moment = require('moment');
var reports = module.exports = {};
var globals = require("gen").globals;

var handlebars = require('handlebars'),
    groupBy = require('handlebars-group-by');

groupBy.register(handlebars);

reports.getFeesReports = function getFeesReports(data) {
    var _hndlbar = Handlebars;
    var feesdt = data.data1;

    _hndlbar.registerHelper('splitHead', function(head) {
        var t = head.split("~");
        return '<td>Receipt No : ' + t[0] + "</td><td><span>Amount</span></td><td><span>Date : " + t[1] + "</span></td>";
    });

    _hndlbar.registerHelper('totalFees', function(head) {
        var t = head.split("~");
        return '<th>Total Fees</th><th><span>' + t[2] + '</span></th><th></th>';
    });

    _hndlbar.registerHelper('emptydatamsg', function(params) {
        if (feesdt.length == 0) {
            return "No Data Found";
        } else {
            return "";
        }
    });

    _hndlbar.registerHelper('uploadurl', function(params) {
        return globals.uploadurl;
    });

    _hndlbar.registerHelper('logourl', function(params) {
        return globals.logourl;
    });

    return _hndlbar;
}