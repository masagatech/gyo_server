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
    var params = data.params;

    _hndlbar.registerHelper('splitTitle', function(head) {
        var t = head.split("~");
        var head = "";

        head = "<th>Class : " + t[0] + " - " + t[1] + "</th>";
        head += "<th colspan='2'>Paid Fees : " + t[2] + ", ";
        head += "Complete Fees : " + t[3] + ", ";
        head += "Process Fees : " + t[4] + ", ";
        head += "Pending Fees : " + t[5] + "</th>";

        return head;
    });

    _hndlbar.registerHelper('splitHead', function(head) {
        var t = head.split("~");

        if (params.typ == "receipt") {
            return "<td><b>Payment Method : </b>" + t[2] + "</td><td><b>Paid on : </b>" + t[1] + "</td><td><b>Receipt No : </b>" + t[0] + "</td>";
        } else {
            return "<th><b>Paid on : </b>" + t[0] + "</th><th><b>Receipt No : </b>" + t[1] + "</th><th><b>Payment Method : </b>" + t[2] + "</th>";
        }
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