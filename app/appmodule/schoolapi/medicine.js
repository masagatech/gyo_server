var db = require("db");
var rs = require("gen").res;
var fs = require('fs');
var globals = require("gen").globals;

var medicine = module.exports = {};

medicine.saveMedicineInfo = function saveMedicineInfo(req, res) {
    console.log(req.body);
    console.log("1");

    var tmp_path = req.files[0].path;
    console.log("2");
    req.body.uploadimg = req.files[0].originalname;
    console.log("3");

    var target_path = 'www/mobile/' + req.files[0].originalname;
    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);

    src.pipe(dest);

    fs.unlink(req.files[0].path, function(err) {
        if (err) return console.log(err);
    });

    // src.on('end', function() { status: "true" });

    src.on('end', function() {
        db.callFunction("select " + globals.schema("funsave_medicineinfo") + "($1::json);", [req.body], function(data) {
            rs.resp(res, 200, data.rows);
            console.log("a");
        }, function(err) {
            rs.resp(res, 401, "error : " + err);
            console.log("b");
        })

        console.log("c");
    });

    src.on('error', function(err) {
        res.send({ error: "upload failed" });

        console.log("Failed");
    });
}

medicine.getMedicineDetails = function getMedicineDetails(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_medicinedetails") + "($1,$2::json);", ['mdc', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}