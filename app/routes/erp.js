var rs = require("../appmodule/util/resp.js");
var globals = require("../globals.js");
var fs = require('fs');

var notification = require("../appmodule/erp/notification.js");
var announcement = require("../appmodule/erp/announcement.js");

const root = globals.globvar.rootAPI + "/erp";

var appRouter = function(app) {
    //##################################### VIVEK #####################################################


    //##################################### Notification ###############################################

    app.post(root + "/saveNotification", notification.saveNotification);
    app.post(root + "/getNotification", notification.getNotification);

    //##################################### Notification ###############################################

    //##################################### Announcement ###############################################

    app.post(root + "/saveAnnouncement", announcement.saveAnnouncement);
    app.post(root + "/getAnnouncement", announcement.getAnnouncement);

    //##################################### Announcement ###############################################


    //##################################### VIVEK ######################################################
}

module.exports = appRouter;