var Handlebars = require('handlebars');
var moment = require('moment');
var reports = module.exports = {};
var globals = require("gen").globals;

reports.getAuditLogReports = function getAuditLogReports(data) {
    var _hndlbar = Handlebars;
    var auditlogdt = data.data;

    // Date Format

    var DateFormats = {
        short: "DD-MMM-YYYY",
        medium: "DD MMMM - YYYY",
        long: "dddd DD.MM.YYYY HH:mm"
    };

    function getFormattedDate(datetime, format) {
        if (moment) {
            format = DateFormats[format] || format;
            return moment(datetime).format(format);
        } else {
            return datetime;
        }
    };

    // File Extension

    function getFileExtension(filename) {
        var fileext = filename.substr(filename.lastIndexOf('.') + 1);

        if (fileext == 'jpg' || fileext == 'jpeg' || fileext == 'png' || fileext == 'gif' || fileext == 'bmp') {
            return "img";
        } else {
            return fileext;
        }
    }

    // Display Header Field And Value

    _hndlbar.registerHelper('dispfldval', function(row) {
        var columns = "";
        var dispfldval = JSON.parse(row);

        for (var i = 0; i < dispfldval.length; i++) {
            columns = columns + "<div>" + dispfldval[i].key + " : " + dispfldval[i].val + "</div>";
        }

        return columns;
    });

    // Display Data Field And Value

    _hndlbar.registerHelper('fieldvalue', function(row) {
        var columns = "";
        var tbldata = [];
        var tblrow = null;

        var fldval = "";
        var filetype = "";

        if (row.fldtype == "table") {
            tbldata = JSON.parse(row.val);

            columns = columns + '<h4>' + row.key + '</h4>';
            columns = columns + '<table cellspacing="0" cellpadding="5">';

            if (tbldata.length > 0) {
                if (row.fldname == "othdocfile") {
                    columns = columns + '<thead><tr><th>Document Type</th><th>Document File</th></tr></thead>';

                    for (var i = 0; i < tbldata.length; i++) {
                        tblrow = tbldata[i];

                        filetype = getFileExtension(tblrow.docfilename);

                        if (filetype == "img") {
                            fldval = '<img src="' + globals.uploadurl + "/" + tblrow.docfilename + '" height="60">';
                        } else {
                            fldval = tblrow.docfilename;
                        }

                        columns = columns + '<tbody><tr><td><b>' + tblrow.doctypename + '</b></td><td>' + fldval + '</td></tr></tbody>';
                    }
                } else if (row.fldname == "studentsibling") {
                    columns = columns + '<thead><tr><th>Relation</th><th>Full Name</th><th>Age</th>' +
                        '<th>Class Name</th><th>School</th><th>Enrollment No</th><th>School Name</th></tr></thead>';

                    for (var i = 0; i < tbldata.length; i++) {
                        tblrow = tbldata[i];
                        columns = columns + '<tbody><tr><td>' + tblrow.relname + '</td><td>' + tblrow.fullname + '</td><td>' + tblrow.age + '</td>' +
                            '<td>' + tblrow.classname + '</td><td>' + tblrow.schname + '</td><td>' + tblrow.enrlmntid + '</td><td>' + tblrow.othschname + '</td></tr></tbody>';
                    }
                } else if (row.fldname == "studentfees") {
                    var totalfees = 0;
                    columns = columns + '<thead><tr><th>Category</th><th>Sub Category</th><th>Fees</th></tr></thead>';

                    for (var i = 0; i < tbldata.length; i++) {
                        tblrow = tbldata[i];
                        totalfees += parseFloat(tblrow.fees);
                        columns = columns + '<tbody><tr><td>' + tblrow.catname + '</td><td>' + tblrow.scatname + '</td><td align="right">' + tblrow.fees + '</td></tr></tbody>';
                    }

                    columns = columns + '<tfoot><tr><td colspan="3" align="right"><b>Total Fees : </b>' + totalfees + '</td></tr></tfoot>';
                }
            } else {
                columns = columns + '<tr><td colspan="3">No Data Found !!!!</td></tr>';
            }

            columns = columns + '</table>';
        } else if (row.fldtype == "date") {
            fldval = getFormattedDate(row.val, "short")
            columns = columns + '<b>' + row.key + ' : </b>' + fldval;
        } else if (row.fldtype == "img") {
            fldval = '<img src="' + globals.uploadurl + "/" + row.val + '" height="60" onerror="this.src=\'assets/img/noimage.gif\';">';
            columns = columns + '<b>' + row.key + '</b><br />' + fldval;
        } else {
            if (row.val == "") {
                columns = columns + '<b>' + row.key + ' : </b> No Entry';
            } else {
                columns = columns + '<b>' + row.key + ' : </b>' + row.val;
            }
        }

        return columns;
    });

    // Check Data Or Not

    _hndlbar.registerHelper('emptydatamsg', function(params) {
        if (auditlogdt.length == 0) {
            return "No Data Found";
        } else {
            return "";
        }
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