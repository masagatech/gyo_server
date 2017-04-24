var rs = require("../appmodule/util/resp.js");
var globals = require("../globals.js");
var fs = require('fs');

var common = require("../appmodule/schoolapi/common.js");
var dashboard = require("../appmodule/schoolapi/dashboard.js");
var batch = require("../appmodule/schoolapi/batch.js");
var driver = require("../appmodule/schoolapi/driver.js");
var driverinfo = require("../appmodule/schoolapi/driverinfo.js");
var owner = require("../appmodule/schoolapi/owner.js");
var student = require("../appmodule/schoolapi/student.js");
var pickdrop = require("../appmodule/schoolapi/pickdrop.js");

var multer = require('multer');

var upload = multer({
    limits: {
        fieldNameSize: 999999999,
        fieldSize: 999999999
    },
    dest: 'www/uploads/'
});

var appRouter = function(app) {
    //##################################### API Details / #########################################

    var APIInfo = {
        ver: "1.0",
        type: "REST API",
        requestdata: "JSON",
        responsedata: "JSON",
    }

    app.post(globals.globvar.rootAPI + "/", function(req, res, done) {
        console.log(req.body)
        rs.resp(res, 200, APIInfo);
    });

    //##################################### Common #############################################

    app.get(globals.globvar.rootAPI + "/getAutoData", common.getAutoData);
    
    //##################################### Common #############################################

    //##################################### Dashboard #############################################

    app.post(globals.globvar.rootAPI + "/getDashboard", dashboard.getDashboard);
    
    //##################################### Dashboard #############################################

    //##################################### Batch ###############################################

    app.post(globals.globvar.rootAPI + "/saveBatchInfo", batch.saveBatchInfo);
    app.post(globals.globvar.rootAPI + "/getBatchDetails", batch.getBatchDetails);

    //##################################### Batch ###############################################

    //##################################### Driver ################################################

    app.post(globals.globvar.rootAPI + "/saveDriverInfo", driver.saveDriverInfo);
    app.post(globals.globvar.rootAPI + "/getDriverGrid", driver.getDriverGrid);
    app.post(globals.globvar.rootAPI + "/getDriverDetails", driver.getDriverDetails);

    //##################################### Driver ################################################

    //##################################### Driver Info ################################################

    app.post(globals.globvar.rootAPI + "/saveDriverInfo", driverinfo.saveDriverInfo);
    app.post(globals.globvar.rootAPI + "/getDriverInfoGrid", driverinfo.getDriverInfoGrid);
    app.post(globals.globvar.rootAPI + "/getDriverInfoDetails", driverinfo.getDriverInfoDetails);

    //##################################### Driver Info ################################################

    //##################################### Owner ################################################

    app.post(globals.globvar.rootAPI + "/saveOwnerInfo", owner.saveOwnerInfo);
    app.post(globals.globvar.rootAPI + "/getOwnerDetails", owner.getOwnerDetails);

    //##################################### Owner ################################################

    //##################################### Student ###############################################

    app.post(globals.globvar.rootAPI + "/saveStudentInfo", student.saveStudentInfo);
    app.post(globals.globvar.rootAPI + "/getStudentDetails", student.getStudentDetails);

    //##################################### Student ###############################################

    //##################################### Pick and Drop ###############################################

    app.post(globals.globvar.rootAPI + "/savePickDropInfo", pickdrop.savePickDropInfo);
    app.post(globals.globvar.rootAPI + "/getPickDropDetails", pickdrop.getPickDropDetails);

    //##################################### Student ###############################################

    //##################################### File Uploads ##########################################
    
    app.post(globals.globvar.rootAPI + "/uploads", upload.any(), function(req, res) {
        var tmp_path = req.files[0].path;
        var target_path = 'www/uploads/' + req.files[0].originalname;
        var src = fs.createReadStream(tmp_path);
        var dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        fs.unlink(req.files[0].path, function(err) {
            if (err) return console.log(err);
        });

        src.on('end', function() { rs.resp(res, 200, req.body.id); });
        src.on('error', function(err) { res.send({ error: "upload failed" }); });
    });
}

module.exports = appRouter;