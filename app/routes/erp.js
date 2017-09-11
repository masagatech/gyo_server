var rs = require("../appmodule/util/resp.js");
var globals = require("../globals.js");
var fs = require('fs');

var emp = require("../appmodule/erp/employee.js");
var book = require("../appmodule/erp/books.js");
var ntf = require("../appmodule/erp/notification.js");
var annc = require("../appmodule/erp/announcement.js");

const root = globals.globvar.rootAPI + "/erp";

var appRouter = function(app) {
    //##################################### VIVEK #####################################################


    //##################################### Employee ###############################################

    app.post(root + "/saveEmployeeInfo", emp.saveEmployeeInfo);
    app.post(root + "/getEmployeeDetails", emp.getEmployeeDetails);

    //##################################### Notification ###############################################

    //##################################### Books ###############################################

    app.post(root + "/saveBooksInfo", book.saveBooksInfo);
    app.post(root + "/getBooksDetails", book.getBooksDetails);

    //##################################### Notification ###############################################

    //##################################### Notification ###############################################

    app.post(root + "/saveNotification", ntf.saveNotification);
    app.post(root + "/getNotification", ntf.getNotification);

    //##################################### Notification ###############################################

    //##################################### Announcement ###############################################

    app.post(root + "/saveAnnouncement", annc.saveAnnouncement);
    app.post(root + "/getAnnouncement", annc.getAnnouncement);

    //##################################### Announcement ###############################################


    //##################################### VIVEK ######################################################
}

module.exports = appRouter;