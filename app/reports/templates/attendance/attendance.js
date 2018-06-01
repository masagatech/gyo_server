var Handlebars = require('handlebars');
var moment = require('moment');
var reports = module.exports = {};

reports.getAttendanceReports = function getAttendanceReports(data) {
    var _hndlbar = Handlebars;
    var attndhead = data.attndhead;
    var psngrcolumn = data.psngrcolumn;
    var attndcolumn = data.attndcolumn;
    var attnddata = data.attnddata;
    var params = data.params;

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

    // Hide When

    _hndlbar.registerHelper('isvis', function(param, options) {
        if (param !== "" || param == "NA") {
            return options.inverse(this);
        } else {
            return options.fn(this);
        }
    });

    _hndlbar.registerHelper('splitHead', function(head) {
        if (params.attndmonth == "") {
            var t = head.split("-");
            return t[1];
        } else {
            return head;
        }
    });

    _hndlbar.registerHelper('class_head', function(row) {
        var columns = "";

        if (params.psngrtype == "student") {
            if (params.format == "pdf") {
                columns = "<h3 " + font10 + ">Class : " + attndhead[0].classname + "</h3>";
            } else {
                columns = "<h3 " + font13 + ">Class : " + attndhead[0].classname + "</h3>";
            }
        } else {
            columns = "";
        }

        return columns;
    });

    _hndlbar.registerHelper('psngr_value', function(row) {
        var _columns = '';
        let _data = '';
        let _class = '';

        for (var i = 0; i < psngrcolumn.length; i++) {
            _data = row[psngrcolumn[i].key];

            if (params.format == "pdf") {
                _columns = _columns + '<td ' + font07 + ' class="' + _data + '" align="center">' + (_data == null ? '-' : _data) + '</td>';
            } else {
                _columns = _columns + '<td ' + font12 + ' class="' + _data + '" align="center">' + (_data == null ? '-' : _data) + '</td>';
            }
        }

        return _columns;
    });

    _hndlbar.registerHelper('attnd_value', function(row) {
        var _columns = '';
        let _data = '';
        let _class = '';

        for (var i = 0; i < attndcolumn.length; i++) {
            if (params.attndmonth == "") {
                _class = attndcolumn[i].day.split('-')[1];
            } else {
                _class = row[attndcolumn[i].day];
            }

            _data = row[attndcolumn[i].day];

            if (params.format == "pdf") {
                _columns = _columns + '<td ' + font07 + ' class="' + _class + '" align="center">' + (_data == null ? '-' : _data) + '</td>';
            } else {
                _columns = _columns + '<td ' + font12 + ' class="' + _class + '" align="center">' + (_data == null ? '-' : _data) + '</td>';
            }
        }

        return _columns;
    });

    return _hndlbar;
}