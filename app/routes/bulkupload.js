var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
var globals = require("../globals.js");
var rs = require("../appmodule/util/resp.js");
var fs = require('fs');

var admsn = require("../appmodule/erp/admission.js");

var multer = require('multer');

var upload = multer({
    limits: {
        fieldNameSize: 999999999,
        fieldSize: 999999999
    },
    dest: 'www/uploads/'
});

var appRouter = function(app) {
    app.use(bodyParser.json());

    var storage = multer.diskStorage({ //multers disk storage settings
        destination: function(req, file, cb) {
            cb(null, './excelupload/')
        },
        filename: function(req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
        }
    });

    var excelupload = multer({ //multer settings
        storage: storage,
        fileFilter: function(req, file, callback) { //file filter
            if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
                return callback(new Error('Wrong extension type'));
            }
            callback(null, true);
        }
    }).single('file');

    // app.post(globals.globvar.rootAPI + '/exceluploads', admsn.uploadStudentInfo);



    /** API path that will upload the files */

    app.post(globals.globvar.rootAPI + '/exceluploads', upload.any(), function(req, res) {
        var exceltojson; //Initialization

        var tmp_path = req.files[0].path;
        var target_path = 'www/uploads/exceluploads/' + req.files[0].originalname;
        var src = fs.createReadStream(tmp_path);
        var dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        fs.unlink(req.files[0].path, function(err) {
            if (err) return console.log(err);
        });

        if (target_path.split('.')[target_path.split('.').length - 1] === 'xlsx') {
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }

        src.on('end', function() {
            try {
                xlsxtojson({
                    input: target_path, //the same path where we uploaded our file
                    output: null, //since we don't need output.json
                    lowerCaseHeaders: true
                }, function(err, result) {
                    if (err) {
                        return res.json({ error_code: 1, err_desc: err, data: null });
                    }

                    res.json({ error_code: 0, err_desc: null, data: result });

                    // rs.resp(res, 200, res.data);
                    // rs.resp(res, 200, req.body);

                    console.log(result);
                });
            } catch (e) {
                res.json({ error_code: 1, err_desc: "Corupted excel file" });
            }
        });
        src.on('error', function(err) { res.send({ error: "upload failed" }); });
    });
}

module.exports = appRouter;