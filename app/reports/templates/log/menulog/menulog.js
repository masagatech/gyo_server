var Handlebars = require('handlebars');
var moment = require('moment');
var reports = module.exports = {};
var globals = require("gen").globals;

var handlebars = require('handlebars'),
    groupBy = require('handlebars-group-by');

groupBy.register(handlebars);

reports.getMenuLogReports = function getMenuLogReports(data) {
    var _hndlbar = Handlebars;
    var dataheader = data.data;
    var menulogdt = data.data1;

    _hndlbar.registerHelper('splitGroup', function(group) {
        var t = group.split("~");
        return 'Menu Name : ' + t[0] + '<br />Last Open Date : ' + t[1] + '<br />How Many : ' + t[2];
    });

    _hndlbar.registerHelper('emptydatamsg', function(params) {
        if (menulogdt.length == 0) {
            return "No Data Found";
        } else {
            return "";
        }
    });

    return _hndlbar;
}