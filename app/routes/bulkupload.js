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

var root = globals.globvar.rootAPI + "/menu";
var multer = require('multer');

var upload = multer({
    limits: {
        fieldNameSize: 999999999,
        fieldSize: 999999999
    },
    dest: 'www/exceluploads/'
});

var appRouter = function(app) {
    app.use(bodyParser.json());

    /** API path that will upload the files */

    function checkDuplicates(arr, justCheck) {
        var len = arr.length,
            tmp = {},
            arrtmp = arr.slice(),
            dupes = [];

        arrtmp.sort();

        while (len--) {
            var val = arrtmp[len];

            if (/nul|nan|infini/i.test(String(val))) {
                val = String(val);
            }

            if (tmp[JSON.stringify(val)]) {
                if (justCheck) { return true; }
                dupes.push(val);
            }

            tmp[JSON.stringify(val)] = true;
        }

        return justCheck ? false : dupes.length ? dupes : null;
    }

    app.post(globals.globvar.rootAPI + '/bulkUpload', upload.any(), function(req, res) {
        var exceltojson; // Initialization

        var tmp_path = req.files[0].path;
        var target_path = 'www/exceluploads/' + req.files[0].originalname;
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
                        res.json({ error_code: 1, err_desc: err, data: null });
                    } else {

                    }

                    var _status = 1;
                    var _message = '';

                    if (req.body.bulktype === "student") {
                        if (checkDuplicates(result, true)) {
                            _status = 0;
                            _message = "Duplicate Records Not Allowed";
                        } else {
                            for (var i = 0; i < result.length; i++) {
                                if (result[i].first_name == "") {
                                    _status = 0;
                                    _message = "Empty First Name";

                                    break;
                                } else if (result[i].middle_name == "") {
                                    _status = 0;
                                    _message = "Empty Middle Name";

                                    break;
                                } else if (result[i].last_name == "") {
                                    _status = 0;
                                    _message = "Empty Last Name";

                                    break;
                                } else if (result[i].roll_no == "") {
                                    _status = 0;
                                    _message = "Empty Roll No In " + result[i].first_name;

                                    break;
                                } else if (result[i].class_name == "") {
                                    _status = 0;
                                    _message = "Empty Class Name In " + result[i].first_name;

                                    break;
                                } else if (result[i].dob == "") {
                                    _status = 0;
                                    _message = "Empty DOB In " + result[i].first_name;

                                    break;
                                } else if (result[i].address == "") {
                                    _status = 0;
                                    _message = "Empty Address In " + result[i].first_name;

                                    break;
                                } else if (result[i].father_name == "") {
                                    _status = 0;
                                    _message = "Empty Father Name In " + result[i].first_name;

                                    break;
                                } else if (result[i].father_mobile == "") {
                                    _status = 0;
                                    _message = "Empty Father Mobile In " + result[i].first_name;

                                    break;
                                } else if (result[i].father_email == "") {
                                    _status = 0;
                                    _message = "Empty Father Email In " + result[i].first_name;

                                    break;
                                } else {
                                    _status = 1;
                                    _message = "";
                                }
                            }
                        }

                        if (_status == 1) {
                            var params = {
                                "ayid": req.body.ayid,
                                "enttid": req.body.enttid,
                                "wsautoid": req.body.wsautoid,
                                "cuid": req.body.cuid,
                                "multistudent": result
                            };

                            admsn.saveMultiStudentInfo(params, function(data) {
                                res.json({ status: _status, message: _message, data: data });
                            });
                        } else {
                            res.json({ status: _status, message: _message, data: null });
                            // res.send(500, _message);
                        }
                    }
                });
            } catch (e) {
                res.json({ error_code: 1, err_desc: "Corupted excel file" });
            }
        });

        src.on('error', function(err) { res.send({ error: "upload failed" }); });
    });
}

module.exports = appRouter;