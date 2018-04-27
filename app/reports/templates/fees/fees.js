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
        return "<td><b>Payment Method : </b>" + t[2] + "</td><td><b>Paid on : </b>" + t[1] + "</td><td><b>Receipt No : </b>" + t[0] + "</td>";
    });

    _hndlbar.registerHelper('totalPaidFees', function(head) {
        var t = head.split("~");
        return '<th colspan="2"><span>Total Amount : ' + t[3] + '</span></th><th></th>';
    });

    _hndlbar.registerHelper('totalCompleteFees', function(head) {
        var t = head.split("~");
        return '<th colspan="2"><span>Total Amount : ' + t[4] + '</span></th><th></th>';
    });

    _hndlbar.registerHelper('replace', function(find, replace, options) {
        var string = options.fn(this);
        return string.replace(find, replace);
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