var rs = require("../appmodule/util/resp.js");
var globals = require("../globals.js");
var fs = require('fs');

var login = require("../appmodule/schoolapi/login.js");
var fileupload = require('../appmodule/schoolapi/fileupload.js');
var workspace = require("../appmodule/schoolapi/workspace.js");
var menu = require("../appmodule/schoolapi/menu.js");
var common = require("../appmodule/schoolapi/common.js");

var qualification = require("../appmodule/schoolapi/qualification.js");
var location = require("../appmodule/schoolapi/location.js");

var stops = require("../appmodule/schoolapi/stops.js");
var school = require("../appmodule/schoolapi/school.js");
var psngr = require("../appmodule/schoolapi/passenger.js");
var holiday = require("../appmodule/schoolapi/holiday.js");
var lvpsngr = require("../appmodule/schoolapi/leave.js");

var inventory = require("../appmodule/schoolapi/inventory.js");
var batch = require("../appmodule/schoolapi/batch.js");
var driver = require("../appmodule/schoolapi/driver.js");
var vehicle = require("../appmodule/schoolapi/vehicle.js");


var user = require("../appmodule/schoolapi/user.js");
var userdt = require("../appmodule/schoolapi/userdetails.js");
var pickdrop = require("../appmodule/schoolapi/pickdrop.js");
var breakdown = require("../appmodule/schoolapi/breakdown.js");
var speed = require("../appmodule/schoolapi/speed.js");
var genset = require("../appmodule/schoolapi/general.js");
var reports = require("../appmodule/schoolapi/reports.js");

var dashboard = require("../appmodule/schoolapi/dashboard.js");
var driverinfo = require("../appmodule/schoolapi/driverinfo.js");

var mrktnorder = require("../appmodule/marketing/order.js");
var mrktndb = require("../appmodule/marketing/dashboard.js");

var medicine = require("../appmodule/schoolapi/medicine.js");
var fuel = require("../appmodule/schoolapi/fuelentry.js");

var multer = require('multer');

var upload = multer({
    limits: {
        fieldNameSize: 999999999,
        fieldSize: 999999999
    },
    dest: 'www/uploads/'
});

var appRouter = function(app) {
    //##################################### API Details / ###################################################

    var APIInfo = {
        ver: "1.0",
        type: "REST API",
        requestdata: "JSON",
        responsedata: "JSON",
    }

    app.post(globals.globvar.rootAPI + "/", function(req, res, done) {
        rs.resp(res, 200, APIInfo);
    });

    //##################################### API Details / ###################################################


    //##################################### VIVEK ###########################################################

    //##################################### Login ###########################################################

    app.post(globals.globvar.rootAPI + "/getLogin", login.getLogin);
    app.post(globals.globvar.rootAPI + "/getLogout", login.getLogout);
    app.post(globals.globvar.rootAPI + "/savePassword", login.savePassword);

    //##################################### Login ###########################################################

    //##################################### File Upload #####################################################

    app.post(globals.globvar.rootAPI + "/uploads", fileupload.uploadFile);
    // app.get(globals.globvar.rootAPI + "/getFilePath", fileupload.getFilePath);

    //##################################### File Upload #####################################################

    //##################################### Workspace #######################################################

    app.post(globals.globvar.rootAPI + "/getWorkspaceDetails", workspace.getWorkspaceDetails);
    app.post(globals.globvar.rootAPI + "/saveWorkspaceInfo", workspace.saveWorkspaceInfo);

    //##################################### Workspace #######################################################

    //##################################### Menu ############################################################

    app.post(globals.globvar.rootAPI + "/getMenuDetails", menu.getMenuDetails);
    app.post(globals.globvar.rootAPI + "/getMenuAccess", menu.getMenuAccess);
    app.post(globals.globvar.rootAPI + "/getMenuLog", menu.getMenuLog);

    //##################################### Menu ############################################################

    //##################################### Common ##########################################################

    app.get(globals.globvar.rootAPI + "/getAppVersion", common.getAppVersion);
    app.get(globals.globvar.rootAPI + "/getAutoData", common.getAutoData);
    app.post(globals.globvar.rootAPI + "/getDropDownData", common.getDropDownData);

    app.post(globals.globvar.rootAPI + "/getDashboard", common.getDashboard);
    app.post(globals.globvar.rootAPI + "/getMOM", common.getMOM);
    app.post(globals.globvar.rootAPI + "/saveMOM", common.saveMOM);

    app.get(globals.globvar.rootAPI + "/getEmailSMS_Setting", common.getEmailSMS_Setting);

    //##################################### Common ##########################################################

    //##################################### Qualification ###################################################

    app.post(globals.globvar.rootAPI + "/saveQualificationInfo", qualification.saveQualificationInfo);
    app.post(globals.globvar.rootAPI + "/getQualificationDetails", qualification.getQualificationDetails);

    //##################################### Qualification ###################################################

    //##################################### Location ########################################################

    app.post(globals.globvar.rootAPI + "/saveLocationInfo", location.saveLocationInfo);
    app.post(globals.globvar.rootAPI + "/getLocationDetails", location.getLocationDetails);

    //##################################### Location ########################################################

    //##################################### Stops ###########################################################

    app.post(globals.globvar.rootAPI + "/saveRoutesInfo", stops.saveRoutesInfo);
    app.post(globals.globvar.rootAPI + "/saveStopsInfo", stops.saveStopsInfo);
    app.post(globals.globvar.rootAPI + "/getStopsDetails", stops.getStopsDetails);

    //##################################### Stops ###########################################################

    //##################################### Entity ##########################################################

    app.post(globals.globvar.rootAPI + "/saveSchoolInfo", school.saveSchoolInfo);
    app.post(globals.globvar.rootAPI + "/getSchoolDetails", school.getSchoolDetails);

    //##################################### Entity ##########################################################

    //##################################### Passenger #######################################################

    app.post(globals.globvar.rootAPI + "/savePassengerInfo", psngr.savePassengerInfo);
    app.post(globals.globvar.rootAPI + "/getPassengerDetails", psngr.getPassengerDetails);

    //##################################### Passenger #######################################################

    //##################################### Holiday #########################################################

    app.post(globals.globvar.rootAPI + "/saveHoliday", holiday.saveHoliday);
    app.post(globals.globvar.rootAPI + "/getHoliday", holiday.getHoliday);

    //##################################### Holiday #########################################################

    //##################################### Leave Passgenger ################################################

    app.post(globals.globvar.rootAPI + "/savePassengerLeave", lvpsngr.savePassengerLeave);
    app.post(globals.globvar.rootAPI + "/savePassengerLeaveApproval", lvpsngr.savePassengerLeaveApproval);
    app.post(globals.globvar.rootAPI + "/getPassengerLeave", lvpsngr.getPassengerLeave);
    app.post(globals.globvar.rootAPI + "/exportPassengerLeave", lvpsngr.exportPassengerLeave);

    app.post(globals.globvar.rootAPI + "/getLeaveReports", lvpsngr.getLeaveReports);

    //##################################### Leave Passgenger ################################################

    //##################################### Device ##########################################################

    app.post(globals.globvar.rootAPI + "/saveDeviceInfo", inventory.saveDeviceInfo);
    app.post(globals.globvar.rootAPI + "/getDeviceDetails", inventory.getDeviceDetails);

    //##################################### Device ##########################################################

    //##################################### Sim #############################################################

    app.post(globals.globvar.rootAPI + "/saveSimInfo", inventory.saveSimInfo);
    app.post(globals.globvar.rootAPI + "/getSimDetails", inventory.getSimDetails);

    //##################################### Sim ############################################################

    //##################################### Device Sim Map #################################################

    app.post(globals.globvar.rootAPI + "/saveDeiviceSimMapping", inventory.saveDeiviceSimMapping);
    app.post(globals.globvar.rootAPI + "/getDeiviceSimMapping", inventory.getDeiviceSimMapping);

    //##################################### Device Sim Map #################################################

    //##################################### Batch ############################################################

    app.post(globals.globvar.rootAPI + "/saveBatchInfo", batch.saveBatchInfo);
    app.post(globals.globvar.rootAPI + "/getBatchDetails", batch.getBatchDetails);

    //##################################### Batch ############################################################

    //##################################### Driver ###########################################################

    app.post(globals.globvar.rootAPI + "/saveDriverInfo", driver.saveDriverInfo);
    app.post(globals.globvar.rootAPI + "/getDriverDetails", driver.getDriverDetails);

    //##################################### Driver ###########################################################

    //##################################### Vehicle ##########################################################

    app.post(globals.globvar.rootAPI + "/saveVehicleInfo", vehicle.saveVehicleInfo);
    app.post(globals.globvar.rootAPI + "/getVehicleDetails", vehicle.getVehicleDetails);

    //##################################### Vehicle ##########################################################

    //##################################### User #############################################################

    app.post(globals.globvar.rootAPI + "/saveUserInfo", user.saveUserInfo);
    app.post(globals.globvar.rootAPI + "/updateUserInfo", user.updateUserInfo);
    app.post(globals.globvar.rootAPI + "/getUserDetails", user.getUserDetails);

    //##################################### User #############################################################

    //##################################### User Details #####################################################

    app.post(globals.globvar.rootAPI + "/saveUserRights", user.saveUserRights);
    app.post(globals.globvar.rootAPI + "/getUserRights", user.getUserRights);

    app.post(globals.globvar.rootAPI + "/saveUserVehicleMap", user.saveUserVehicleMap);
    app.post(globals.globvar.rootAPI + "/getUserVehicleMap", user.getUserVehicleMap);

    app.post(globals.globvar.rootAPI + "/saveUserCardDetails", userdt.saveUserCardDetails);
    app.post(globals.globvar.rootAPI + "/getUserCardDetails", userdt.getUserCardDetails);

    //##################################### User Details #####################################################

    //##################################### Pick and Drop ####################################################

    app.get(globals.globvar.rootAPI + "/saveTrackingInfo", pickdrop.saveTrackingInfo);
    app.post(globals.globvar.rootAPI + "/savePickDropInfo", pickdrop.savePickDropInfo);
    app.post(globals.globvar.rootAPI + "/getPickDropDetails", pickdrop.getPickDropDetails);

    //##################################### Pick and Drop ####################################################

    //##################################### Break Down #######################################################

    app.post(globals.globvar.rootAPI + "/saveBreakDown", breakdown.saveBreakDown);
    app.post(globals.globvar.rootAPI + "/getBreakDown", breakdown.getBreakDown);

    app.post(globals.globvar.rootAPI + "/saveBreakDownSet", breakdown.saveBreakDownSet);
    app.post(globals.globvar.rootAPI + "/getBreakDownSet", breakdown.getBreakDownSet);

    //##################################### Driver Info ######################################################

    //##################################### Speed ############################################################

    app.post(globals.globvar.rootAPI + "/saveSpeedVialation", speed.saveSpeedVialation);

    //##################################### Speed ############################################################

    //##################################### General ##########################################################

    app.post(globals.globvar.rootAPI + "/saveGeneralSetting", genset.saveGeneralSetting);
    app.post(globals.globvar.rootAPI + "/getGeneralSetting", genset.getGeneralSetting);

    //##################################### General ##########################################################

    //##################################### Reports ##########################################################

    app.post(globals.globvar.rootAPI + "/getAttendanceReports", reports.getAttendanceReports);
    app.post(globals.globvar.rootAPI + "/getRouteWisePassengerReports", reports.getRouteWisePassengerReports);
    app.post(globals.globvar.rootAPI + "/getPassengerTripReports", reports.getPassengerTripReports);

    //##################################### Reports ##########################################################

    //##################################### Marketing Order ##################################################

    app.post(globals.globvar.marketapi + "/saveOrderInfo", mrktnorder.saveOrderInfo);
    app.post(globals.globvar.marketapi + "/updateOrderInfo", mrktnorder.updateOrderInfo);
    app.post(globals.globvar.marketapi + "/getOrderDetail", mrktnorder.getOrderDetail);
    app.post(globals.globvar.marketapi + "/getOrder", mrktnorder.getOrder);

    //##################################### Marketing Order ##################################################

    //##################################### Marketing Dashboard ##############################################

    app.post(globals.globvar.rootAPI + "/getMarketingDB", mrktndb.getMarketingDB);

    //##################################### Marketing Dashboard ##############################################

    //##################################### Medicine #########################################################

    app.post(globals.globvar.rootAPI + "/saveMedicineInfo", upload.any(), medicine.saveMedicineInfo);
    app.post(globals.globvar.rootAPI + "/getMedicineDetails", medicine.getMedicineDetails);

    //##################################### Marketing Order ##################################################

    //##################################### Fuel Entry #######################################################

    app.post(globals.globvar.rootAPI + "/saveFuelEntry", fuel.saveFuelEntry);
    app.post(globals.globvar.rootAPI + "/getFuelEntry", fuel.getFuelEntry);

    //##################################### Fuel Entry #######################################################


    //##################################### VIVEK ############################################################



    //##################################### PRATIK ###########################################################

    //##################################### Dashboard ########################################################

    app.post(globals.globvar.rootAPI + "/getDashboard", dashboard.getDashboard);

    //##################################### Dashboard ########################################################

    //##################################### Driver Info ######################################################

    app.post(globals.globvar.rootAPI + "/saveDriverInfo", driverinfo.saveDriverInfo);
    app.post(globals.globvar.rootAPI + "/getDriverInfoGrid", driverinfo.getDriverInfoGrid);
    app.post(globals.globvar.rootAPI + "/getDriverInfoDetails", driverinfo.getDriverInfoDetails);

    //##################################### Driver Info ######################################################

    //##################################### File Uploads #####################################################

    app.post(globals.globvar.rootAPI + "/uploads", upload.any(), function(req, res) {
        var tmp_path = req.files[0].path;
        var target_path = 'www/uploads/' + req.files[0].originalname;
        var src = fs.createReadStream(tmp_path);
        var dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        fs.unlink(req.files[0].path, function(err) {
            if (err) return console.log(err);
        });

        src.on('end', function() {
            rs.resp(res, 200, req.body.id);
        });

        src.on('error', function(err) {
            res.send({ error: "upload failed" });
        });
    });

    //##################################### File Uploads #####################################################

    //##################################### PRATIK ###########################################################
}

module.exports = appRouter;