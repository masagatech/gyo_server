var Handlebars = require('handlebars');
var reports = module.exports = {};
var globals = require("gen").globals;

var groupBy = require('handlebars-group-by');
groupBy.register(Handlebars);

reports.getUserMasterReports = function getUserMasterReports(data) {
    var _hndlbar = Handlebars;

    var userdata = data.data;
    var params = data.params;

    // Set Font Size

    var font07 = 'style = "font-size: 7px;"';
    var font10 = 'style = "font-size: 10px;"';
    var font12 = 'style = "font-size: 12px;"';
    var font13 = 'style = "font-size: 13px;"';
    var font18 = 'style = "font-size: 18px;"';

    _hndlbar.registerHelper('font-07', function(row) {
        if (params.format == "pdf") {
            return font07;
        } else {
            return font12;
        }
    });

    _hndlbar.registerHelper('font-10', function(row) {
        if (params.format == "pdf") {
            return font10;
        } else {
            return font13;
        }
    });

    _hndlbar.registerHelper('font-13', function(row) {
        if (params.format == "pdf") {
            return font13;
        } else {
            return font18;
        }
    });

    // No Data Found

    _hndlbar.registerHelper('nodatafound', function(row) {
        if (userdata.length == 0) {
            return '<tr><td colspan="7">No Data Found</th></td>';
        } else {
            return '';
        }
    });

    _hndlbar.registerHelper('addressinfo_col', function(row) {
        var addrinfo_col = "";

        if (row.address != "" && row.address != null) {
            addrinfo_col += "<div>" + row.address + "</div>";
        }

        if (row.country != "" && row.country != null) {
            addrinfo_col += "<div>" + row.country;
        }

        if (row.state != "" && row.state != null) {
            if (row.country != "" && row.country != null) {
                addrinfo_col += ", " + row.state;
            } else {
                addrinfo_col += row.state;
            }
        }

        if (row.city != "" && row.city != null) {
            if (row.state != "" && row.state != null) {
                addrinfo_col += ", " + row.city;
            } else {
                addrinfo_col += row.city;
            }
        }

        if (row.area != "" && row.area != null) {
            if (row.city != "" && row.city != null) {
                addrinfo_col += ", " + row.area + "</div>";
            } else {
                addrinfo_col += row.area + "</div>";
            }
        }

        return addrinfo_col;
    });

    return _hndlbar;
}