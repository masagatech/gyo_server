var mondb = require("../../db/mongodbservice.js");
var schedule = require('node-schedule');

var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var tripapi = require("../schoolapi/tripapi.js");
var vts = module.exports = {};

function saveNotification(req, res, _remark3, _data) {
    var params = {
        "grpid": 0,
        "frmid": 1,
        "frmtype": "admin",
        "remark3": _remark3,
        "studid": _data.studid,
        "title": _data.title,
        "msg": _data.msg,
        "sendtype": "{parents}",
        "ntftype": "fence",
        "enttid": req.query.enttid,
        "issendsms": false,
        "issendemail": false,
        "cuid": "admin.goyo"
    };

    db.callFunction("select " + globals.erpschema("funsave_notification") + "($1::json);", [params], function (data) {
        rs.resp(res, 200, data.rows);
    }, function (err) {
        rs.resp(res, 401, "error : " + err);
    })
}

vts.getFence = function (req, res, done) {
    var ntfparams = {
        "flag": req.query.almtyp,
        "almtyp": req.query.almtyp,
        "batchid": req.query.batchid,
        "drvid": req.query.drvid,
        "vehid": req.query.vehid,
        "rtid": req.query.rtid,
        "stpid": req.query.stpid,
        "stptype": req.query.stptype,
        "pdtype": req.query.pdtype,
        "tm": req.query.tm,
        "enttid": req.query.enttid
    };

    db.callProcedure("select " + globals.schema("funapisend_notification_or_not") + "($1,$2::json);", ['ntf', ntfparams], function (data) {
        var _data = data.rows[0];

        if (_data !== undefined) {
            if (_data.status == 0) {
                rs.resp(res, 200, _data);
            } else if (_data.status == -1) {
                rs.resp(res, 200, _data);
            } else {
                saveNotification(req, res, ntfparams, _data);
                tripapi.sendNotification(ntfparams);
            }
        } else {
            rs.resp(res, 200, "No Data Found");
        }
    }, function (err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

vts.getSpeed = function (req, res, done) {
    console.log(req);
}

// To MongoDB

var Schema = mondb.mongoose.Schema;

var NotificationSchema = new Schema({
    flag: String,
    almtyp: String,
    batchid: Number,
    drvid: Number,
    vehid: Number,
    rtid: Number,
    stpid: Number,
    stptype: String,
    pdtype: String,
    pdid: Number,
    tm: String,
    enttid: Number,
    isread: Boolean,
    servertime: Date
});

mondb.mongoose.model('notification', NotificationSchema);

vts.addToMongodb = function (req, res, done) {
    var nowDate = new Date();
    var date = nowDate.getFullYear() + '/' + (nowDate.getMonth() + 1) + '/' + nowDate.getDate();

    var ntfparams = {
        "flag": req.query.almtyp,
        "almtyp": req.query.almtyp,
        "batchid": req.query.batchid,
        "drvid": req.query.drvid,
        "vehid": req.query.vehid,
        "rtid": req.query.rtid,
        "stpid": req.query.stpid,
        "stptype": req.query.stptype,
        "pdtype": req.query.pdtype,
        "tm": req.query.tm,
        "enttid": req.query.enttid,
        "isread": false,
        "servertime": Date.now(),
        "date": date
    };

    mondb.mongoose.model('notification').create(ntfparams, function (err, data) {
        if (err) {
            if (res) {
                rs.resp(res, 200, "err");
            }
            return;
        }
        if (res) {
            rs.resp(res, 200, "ok");
        }
    });
}

// From MongoDB

var j = schedule.scheduleJob('*/5 * * * * *', function () {
    console.log('calling data');

    var d = mondb.mongoose.model('notification').find({
        'isread': false
    }).sort({
        'servertime': 1
    }).limit(80);

    d.exec(function (err, mdata) {
        if (err) {
            return;
        }

        if (mdata === null || mdata.length == 0) {
            return;
        }

        // console.log("mdata", mdata);
        // return;
        var lastrec = mdata[mdata.length - 1]

        // console.log(lastrec);

        mondb.mongoose.model('notification').updateMany({
            'servertime': {
                $lte: lastrec.servertime
            }
        }, {
            'isread': true
        }, function (err, data) {
            console.log(err, data);
        });
        // console.log(mdata);

        db.callProcedure("select " + globals.schema("funapisend_notification_or_not") + "($1,$2::json);", ['ntf', {
            data: mdata
        }], function (data) {
            var _data = data.rows;
            console.log(_data);
            if (_data !== undefined && _data.length > 0) {
                // var params = {
                //     "grpid": 0,
                //     "frmid": 1,
                //     "frmtype": "admin",
                //     "remark3": mdata,
                //     "studid": _data.studid,
                //     "title": _data.title,
                //     "msg": _data.msg,
                //     "sendtype": "{parents}",
                //     "ntftype": "fence",
                //     "enttid": _data.enttid,
                //     "issendsms": false,
                //     "issendemail": false,
                //     "cuid": "admin.goyo"
                // };

                // db.callFunction("select " + globals.erpschema("funsave_vtsnotification") + "($1::json);", [mdata], function(data) {
                //     // console.log(data.rows);
                // }, function(err) {
                //     console.log(err);
                // });

                tripapi.sendVTSNotification(_data);
            } else {
                console.log("No Data Found");
            }
        }, function (err) {
            console.log(err);
        }, 1)
    });
});


var k = schedule.scheduleJob('*/30 * * * *', function () {
    mondb.mongoose.model('notification').deleteMany({
        'isread': true
    }, function (err, data) {
        console.log(err, data);
    });
});