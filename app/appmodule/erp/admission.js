var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var admsn = module.exports = {};

admsn.saveAdmissionInfo = function saveAdmissionInfo(req, res, done) {
    db.callFunction("select " + globals.erpschema("funsave_admissioninfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

admsn.uploadStudentInfo = function uploadStudentInfo(req, res, done) {
    var tmp_path = req.files[0].path;
    var target_path = 'www/uploads/exceluploads/' + req.files[0].originalname;
    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);

    src.pipe(dest);

    fs.unlink(req.files[0].path, function(err) {
        if (err) return console.log(err);
    });

    src.on('end', function() {
        rs.resp(res, 200, req.body.id);

        xlsxtojson({
            input: target_path,
            output: null,
            lowerCaseHeaders: true
        }, function(err, result) {
            // if (err) {
            //     return res.json({ error_code: 1, err_desc: err, data: null });
            // }
            // res.json({ error_code: 0, err_desc: null, data: result });

            rs.resp(res, 200, result);

            // console.log(result);
        });
    });
    src.on('error', function(err) { res.send({ error: "upload failed" }); });
}

admsn.saveStudentInfo = function saveStudentInfo(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_studentinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

admsn.saveStudentRollover = function saveStudentRollover(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_studentrollover") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

admsn.getStudentDetails = function getStudentDetails(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_studentdetails") + "($1,$2::json);", ['sd', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

admsn.viewStudentDetails = function viewStudentDetails(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_studentview") + "($1,$2,$3::json);", ['sd1', 'sd2', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 2)
}

admsn.getPassengerDetails = function getPassengerDetails(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_passengerdetails") + "($1,$2::json);", ['psngr', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

admsn.saveStudentVehicleMap = function saveStudentVehicleMap(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_studsvehmap") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}