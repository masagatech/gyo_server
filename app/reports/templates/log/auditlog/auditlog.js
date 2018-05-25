var Handlebars = require('handlebars');
var reports = module.exports = {};
var globals = require("gen").globals;

reports.getAuditLogReports = function getAuditLogReports(data) {
    var _hndlbar = Handlebars;
    var auditlogdt = data.data;

    _hndlbar.registerHelper('emptydatamsg', function(params) {
        if (auditlogdt.length == 0) {
            return "No Data Found";
        } else {
            return "";
        }
    });

    _hndlbar.registerHelper('istableval', function(param, options) {
        if (param == "table") {
            return options.inverse(this);
        } else {
            return options.fn(this);
        }
    });

    _hndlbar.registerHelper('uploadurl', function(params) {
        return globals.uploadurl;
    });

    _hndlbar.registerHelper('fieldvalue', function(row) {
        var columns = '';
        var tbldata = [];
        var tblrow = null;

        if (row.fldtype == "table") {
            tbldata = JSON.parse(row.val);

            columns = columns + '<h4>' + row.key + ' : </h4>';
            columns = columns + '<table cellspacing="0" cellpadding="5">';

            if (tbldata.length > 0) {
                if (row.fldname == "othdocfile") {
                    columns = columns + '<tr><th>Document Type</th><th>Document File</th></tr>';

                    for (var i = 0; i < tbldata.length; i++) {
                        tblrow = tbldata[i];
                        columns = columns + '<tr><td><b>' + tblrow.doctypenme + '</b></td><td>' + tblrow.docfilenme + '</td></tr>';
                    }
                } else if (row.fldname == "studentsibling") {
                    columns = columns + '<tr><th>Relation</th><th>Full Name</th><th>Age</th>' +
                        '<th>Class Name</th><th>School</th><th>Enrollment No</th><th>School Name</th></tr>';

                    for (var i = 0; i < tbldata.length; i++) {
                        tblrow = tbldata[i];
                        columns = columns + '<tr><td>' + tblrow.relname + '</td><td>' + tblrow.fullname + '</td><td>' + tblrow.age + '</td>' +
                            '<td>' + tblrow.classname + '</td><td>' + tblrow.schname + '</td><td>' + tblrow.enrlmntid + '</td><td>' + tblrow.othschname + '</td></tr>';
                    }
                }
            } else {
                columns = columns + '<tr><td colspan="2">No Data Found !!!!</td></tr>';
            }

            columns = columns + '</table>';

            console.log(columns);
        } else {
            if (row.val == "") {
                columns = columns + '<b>' + row.key + ' : </b> No Entry';
            } else {
                columns = columns + '<b>' + row.key + ' : </b>' + row.val;
            }
        }

        return columns;
    });

    _hndlbar.registerHelper('showdata', function(params) {
        if (auditlogdt.length == 0) {
            return "hide";
        } else {
            return "show";
        }
    });

    return _hndlbar;
}