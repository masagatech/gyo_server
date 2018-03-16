var reprs = module.exports = {};

var util = require('util');
var pdf = require('phantom-html2pdf');
var tempFile = require('tmp');
var fs = require('fs');
var globals = require("../../globals.js");
var Handlebars = require('handlebars');
var helpers = require('./globalfun.js');

var rootPath = globals.reportTemplatePath();
var reportRootPath = globals.reportRootPath();

reprs.resp = function resp(template, data, req, res, done, options, _handlebars) {
    try {
        var onlyHtml = false,
            headerfooter = 'yes';
        var _pdfOptions = {
            format: "A4",
            orientation: "portrait"
        };

        var _hndlbar = _handlebars || Handlebars;

        if (options !== undefined) {
            if (options.pdfoptions !== undefined)
                _pdfOptions.format = options.pdfoptions.format || _pdfOptions.format;
            if (options.pdfoptions !== undefined)
                _pdfOptions.orientation = options.pdfoptions.orientation || _pdfOptions.orientation;
            if (options.onlyHtml !== undefined) {
                onlyHtml = options.onlyHtml;
            }
            if (options.headerfooter !== undefined) {
                headerfooter = options.headerfooter;
            }
        }

        var options = { encoding: 'utf8' };
        var htmlBody = fs.readFileSync(rootPath + '/' + template, 'utf8');

        if (headerfooter == 'yes') {
            var htmlHeader = fs.readFileSync(rootPath + '/partials/' + 'header.html', 'utf8');
            var htmlFooter = fs.readFileSync(rootPath + '/partials/' + 'footer.html', 'utf8');
            _hndlbar.registerPartial('rptheader', htmlHeader);
            _hndlbar.registerPartial('rptfooter', htmlFooter);
        } else {
            _hndlbar.registerPartial('rptheader', '');
            _hndlbar.registerPartial('rptfooter', '');
        }

        _hndlbar.registerHelper('formatnumber', helpers.formatnumber);
        _hndlbar.registerHelper('eq', helpers.eq);

        var template = _hndlbar.compile(htmlBody);
        var result = template(data);

        if (onlyHtml) {
            return result;
        }

        pdf.convert({
            "html": result,
            "paperSize": {
                format: _pdfOptions.format,
                orientation: _pdfOptions.orientation,
                border: { left: '1px', top: '1px', right: '1px', bottom: '1px' },
            },

            "runnings": reportRootPath + "/runningfile.js",
            "deleteOnAction": true
        }, function(err, result) {
            var stream = result.toStream();
            stream.pipe(res);
        });
    } catch (error) {
        res.status(401);
        res.end("Error : " + error);
    }
}