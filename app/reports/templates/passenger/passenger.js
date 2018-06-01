var Handlebars = require('handlebars');
var reports = module.exports = {};
var globals = require("gen").globals;

reports.getPassengerReports = function getPassengerReports(data) {
    var _hndlbar = Handlebars;

    var psngrhead = data.psngrhead;
    var psngrdata = data.psngrdata;
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

    // Passenger Photo

    _hndlbar.registerHelper('psngrphoto_col', function(row) {
        var psngrphoto_col = "";

        if (row.gndrkey == "M") {
            psngrphoto_col += '<img alt="' + row.psngrname + '" height="60" src="' + globals.uploadurl + row.psngrphoto + '" onerror="this.src=\'assets/img/default-male.png\';">';
        } else if (row.gndrkey == "F") {
            psngrphoto_col += '<img alt="' + row.psngrname + '" height="60" src="' + globals.uploadurl + row.psngrphoto + '" onerror="this.src=\'assets/img/default-female.png\';">';
        } else {
            psngrphoto_col += '<img alt="' + row.psngrname + '" height="60" src="' + globals.uploadurl + row.psngrphoto + '" onerror="this.src=\'assets/img/noimage.gif\';"">';
        }

        if (row.gndrval != "" && row.gndrval != null) {
            psngrphoto_col += "<div>" + row.gndrval + "</div>";
        }

        return psngrphoto_col;
    });

    // Student Photo

    _hndlbar.registerHelper('studentphoto_col', function(row) {
        var studphoto_col = "";

        if (row.gndrkey == "M") {
            studphoto_col += '<img alt="' + row.studname + '" height="60" src="' + globals.uploadurl + row.FilePath + '" onerror="this.src=\'assets/img/default-male.png\';">';
        } else if (row.gndrkey == "F") {
            studphoto_col += '<img alt="' + row.studname + '" height="60" src="' + globals.uploadurl + row.FilePath + '" onerror="this.src=\'assets/img/default-female.png\';">';
        } else {
            studphoto_col += '<img alt="' + row.studname + '" height="60" src="' + globals.uploadurl + row.FilePath + '" onerror="this.src=\'assets/img/noimage.gif\';"">';
        }

        if (row.gndrval != "" && row.gndrval != null) {
            studphoto_col += "<div>" + row.gndrval + "</div>";
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

    return _hndlbar;
}