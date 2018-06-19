var Handlebars = require('handlebars');
var reports = module.exports = {};
var globals = require("gen").globals;

var groupBy = require('handlebars-group-by');
groupBy.register(Handlebars);

reports.getPassengerReports = function getPassengerReports(data) {
    var _hndlbar = Handlebars;

    var psngrhead = data.psngrhead;
    var psngrheadcolumn = data.psngrheadcolumn;
    var psngrdata = data.psngrdata;
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

    // Hide When

    _hndlbar.registerHelper('isvis', function(options) {
        if (params.psngrtype == "student") {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    // Count Data

    _hndlbar.registerHelper('count_data', function(row) {
        return psngrdata.length;
    });

    // No Data Found

    _hndlbar.registerHelper('nodatafound', function(row) {
        if (psngrdata.length == 0) {
            return '<tr><td colspan="7">No Data Found</th></td>';
        } else {
            return '';
        }
    });

    // Passenger Position

    _hndlbar.registerHelper('psngrpostion_head', function(row) {
        if (params.psngrtype == "student") {
            return "Standard -";
        } else if (params.psngrtype == "passenger") {
            return "";
        } else {
            return "Department -";
        }
    });

    // Passenger Type

    _hndlbar.registerHelper('psngrtype_head', function(row) {
        if (params.psngrtype == "student") {
            return "Student";
        } else if (params.psngrtype == "teacher") {
            return "Teacher";
        } else if (params.psngrtype == "employee") {
            return "Employee";
        } else {
            return "Passenger";
        }
    });

    // GR Type Head

    _hndlbar.registerHelper('grtype_head', function(row) {
        if (params.grtype == "original") {
            return "- Original";
        } else if (params.grtype == "original") {
            return "- Provisional";
        } else {
            return "";
        }
    });

    // Count Total Student

    _hndlbar.registerHelper('countstudent', function(row) {
        return psngrdata.length;
    });

    // Count Student Category Wise

    _hndlbar.registerHelper('countcatwise', function(row) {
        var array = psngrdata.filter(function(x) { return x.castcatname == row });
        return array.length;
    });

    // Count Student Gender Wise

    _hndlbar.registerHelper('gender_head', function(row) {
        var ccname = row.split("~")[0];
        var gender = row.split("~")[1];

        var array = psngrdata.filter(function(x) { return x.castcatname == ccname }).filter(function(x) { return x.gndrval == gender });
        return "<b>" + gender + " (" + array.length + ")</b>";
    });

    // Split

    _hndlbar.registerHelper('split_gender', function(row) {
        var t = row.split("~")[1];
        return t;
    });

    // Upload URL

    _hndlbar.registerHelper('uploadurl', function(row) {
        return globals.uploadurl;
    });

    // Passenger Photo

    _hndlbar.registerHelper('psngrphoto_col', function(row) {
        var psngrphoto_col = "";

        if (row.gndrkey == "M") {
            psngrphoto_col += '<img height="60" width="60" src="' + globals.uploadurl + "/" + row.psngrphoto + '" onerror="this.src=\'assets/img/default-male.png\';">';
        } else if (row.gndrkey == "F") {
            psngrphoto_col += '<img height="60" width="60" src="' + globals.uploadurl + "/" + row.psngrphoto + '" onerror="this.src=\'assets/img/default-female.png\';">';
        } else {
            psngrphoto_col += '<img height="60" width="60" src="' + globals.uploadurl + "/" + row.psngrphoto + '" onerror="this.src=\'assets/img/noimage.gif\';"">';
        }

        if (row.psngrdob != "" && row.psngrdob != null) {
            psngrphoto_col += "<br /><b>Age : </b>" + row.psngrage;
        }

        return psngrphoto_col;
    });

    // Student Photo

    _hndlbar.registerHelper('studentphoto_col', function(row) {
        var studphoto_col = "";

        if (row.gndrkey == "M") {
            studphoto_col += '<img height="60" width="60" src="' + globals.uploadurl + "/" + row.FilePath + '" onerror="this.src=\'assets/img/default-male.png\';">';
        } else if (row.gndrkey == "F") {
            studphoto_col += '<img height="60" width="60" src="' + globals.uploadurl + "/" + row.FilePath + '" onerror="this.src=\'assets/img/default-female.png\';">';
        } else {
            studphoto_col += '<img height="60" width="60" src="' + globals.uploadurl + "/" + row.FilePath + '" onerror="this.src=\'assets/img/noimage.gif\';"">';
        }

        if (row.dob != "" && row.dob != null) {
            if (params.format == "pdf") {
                studphoto_col += "<div " + font07 + "><b>Age : </b>" + row.age + "</div>";
            } else {
                studphoto_col += "<div " + font12 + "><b>Age : </b>" + row.age + "</div>";
            }
        }

        return studphoto_col;
    });

    // Admission Info

    _hndlbar.registerHelper('admissioninfo_col', function(row) {
        var adminfo_col = "";

        if (row.admdate != "" && row.admdate != null) {
            adminfo_col += "<div><b>Admission Date : </b>" + row.admdate + "</div>";
        }

        if (row.admcatname != "" && row.admcatname != null) {
            adminfo_col += "<div><b>Admission Category : </b>" + row.admcatname + "</div>";
        }

        if (row.prspctname != "" && row.prspctname != null) {
            adminfo_col += "<div><b>Prospectus : </b>" + row.prspctname + "</div>";
        }

        if (row.prspctno != "0" && row.prspctno != null) {
            adminfo_col += "<div><b>Form No : </b>" + row.prspctno + "</div>";
        }

        if (row.boardname != "" && row.boardname != null) {
            adminfo_col += "<div><b>Board Name : </b>" + row.boardname + "</div>";
        }

        if (row.cuid != "0" && row.cuid != null) {
            adminfo_col += "<div><b>Child User ID : </b>" + row.cuid + "</div>";
        }

        if (row.grno != "" && row.grno != null) {
            adminfo_col += "<div><b>GR No : </b>" + row.grno + "</div>";
        }

        if (row.classname != "" && row.classname != null) {
            adminfo_col += "<div><b>Class Name : </b>" + row.classname + "</div>";
        }

        if (row.rollno != "" && row.rollno != null) {
            adminfo_col += "<div><b>Roll No : </b>" + row.rollno + "</div>";
        }

        if (row.clstchrname != "" && row.clstchrname != null) {
            adminfo_col += "<div><b>Class Teacher : </b>" + row.clstchrname + "</div>";
        }

        return adminfo_col;
    });

    // Personal Info

    _hndlbar.registerHelper('personalinfo_col', function(row) {
        var prsnlinfo_col = "";

        if (row.dob != "" && row.dob != null) {
            prsnlinfo_col += "<div><b>Date of Birth : </b>" + row.dob + "</div>";
        }

        if (row.birthplace != "" && row.birthplace != null) {
            prsnlinfo_col += "<div><b>Birth Place : </b>" + row.birthplace + "</div>";
        }

        if (row.aadharno != "0" && row.aadharno != null) {
            prsnlinfo_col += "<div><b>Aadhar No : </b>" + row.aadharno + "</div>";
        }

        if (row.familycast != "" && row.familycast != null) {
            prsnlinfo_col += "<div><b>Family Cast : </b>" + row.familycast + "</div>";
        }

        if (row.castcatname != "" && row.castcatname != null) {
            prsnlinfo_col += "<div><b>Cast Category : </b>" + row.castcatname + "</div>";
        }

        if (row.bldgrpname != "" && row.bldgrpname != null) {
            prsnlinfo_col += "<div><b>Blood Group : </b>" + row.bldgrpname + "</div>";
        }

        if (row.nationality != "" && row.nationality != null) {
            prsnlinfo_col += "<div><b>Nationality : </b>" + row.nationality + "</div>";
        }

        if (row.relgnname != "" && row.relgnname != null) {
            prsnlinfo_col += "<div><b>Religion : </b>" + row.relgnname + "</div>";
        }

        if (row.mthrtng != "" && row.mthrtng != null) {
            prsnlinfo_col += "<div><b>Mother Tongue : </b>" + row.mthrtng + "</div>";
        }

        return prsnlinfo_col;
    });

    // Parents Info

    _hndlbar.registerHelper('parentinfo_col', function(row) {
        var prntinfo_col = "";

        if (row.fthrname != "" && row.fthrname != null) {
            prntinfo_col += "<div><b>Father Name : </b>" + row.fthrname + "</div>";
        }

        if (row.fthrmobile != "" && row.fthrmobile != null) {
            prntinfo_col += "<div><b>Father Mobile : </b>" + row.fthrmobile + "</div>";
        }

        if (row.fthremail != "" && row.fthremail != null) {
            prntinfo_col += "<div><b>Father Email : </b>" + row.fthremail + "</div>";
        }

        if (row.mthrname != "" && row.mthrname != null) {
            prntinfo_col += "<div><b>Mother Name : </b>" + row.mthrname + "</div>";
        }

        if (row.fthrmobile != "" && row.fthrmobile != null) {
            prntinfo_col += "<div><b>Mother Mobile : </b>" + row.mthrmobile + "</div>";
        }

        if (row.fthremail != "" && row.fthremail != null) {
            prntinfo_col += "<div><b>Mother Email : </b>" + row.mthremail + "</div>";
        }

        return prntinfo_col;
    });

    // Contact Info

    _hndlbar.registerHelper('contactinfo_col', function(row) {
        var contactinfo_col = "";

        if (row.address != "" && row.address != null) {
            contactinfo_col += "<div><b>Address : </b>" + row.address + "</div>";
        }

        if (row.country != "" && row.country != null) {
            contactinfo_col += "<div>" + row.country;
        }

        if (row.state != "" && row.state != null) {
            if (row.country != "" && row.country != null) {
                contactinfo_col += ", " + row.state;
            } else {
                contactinfo_col += row.state;
            }
        }

        if (row.city != "" && row.city != null) {
            if (row.state != "" && row.state != null) {
                contactinfo_col += ", " + row.city;
            } else {
                contactinfo_col += row.city;
            }
        }

        if (row.area != "" && row.area != null) {
            if (row.city != "" && row.city != null) {
                contactinfo_col += ", " + row.area + "</div>";
            } else {
                contactinfo_col += row.area + "</div>";
            }
        }

        return contactinfo_col;
    });

    // Student Head Column

    _hndlbar.registerHelper('psngrhead_column', function(row) {
        var _columns = '';
        var _data = '';
        var _class = '';

        for (var i = 0; i < psngrheadcolumn.length; i++) {
            _data = row[psngrheadcolumn[i].key];
            _class = psngrheadcolumn[i].class;

            if (params.format == "pdf") {
                _columns = _columns + '<td width="70px" align="center" class="' + _class + '" style="' + font07 + '">' + (_data == null ? '0' : _data) + '</td>';
            } else {
                _columns = _columns + '<td width="70px" align="center" class="' + _class + '">' + (_data == null ? '0' : _data) + '</td>';
            }
        }

        return _columns;
    });

    return _hndlbar;
}