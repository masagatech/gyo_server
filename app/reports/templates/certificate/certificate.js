var Handlebars = require('handlebars');
var reports = module.exports = {};
var globals = require("gen").globals;

var NumeralHelper = require("handlebars.numeral");
NumeralHelper.registerHelpers(Handlebars);

reports.getStudentCertificate = function getStudentCertificate(data) {
    var _hndlbar = Handlebars;

    var data = data.data;
    var params = data.params;

    // Upload URL

    _hndlbar.registerHelper('uploadurl', function(row) {
        return globals.uploadurl;
    });

    // Upload URL

    _hndlbar.registerHelper('getPhotoGenderWise', function(row) {
        var photo = "";

        var gndrimg = "";

        if (row.gndrkey == "M") {
            gndrimg = "'assets/img/default-male.png'";
        } else {
            gndrimg = "'assets/img/default-female.png'";
        }

        photo = '<img src="' + globals.uploadurl + "/" + row.studphoto + '" height="40" onerror="this.src="' + gndrimg + '";">';

        return photo;
    });

    return _hndlbar;
}