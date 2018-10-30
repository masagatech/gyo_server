var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var tripentry = require("../z_apitrips/tripsinfo.js");
var ntfredis = require("../schoolapi/notificationredis.js");
var sms_email = require("../schoolapi/sendsms_email.js");
var trip = module.exports = {};

//get my todays trips details 

trip.mytrips = function(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_api_mytrips") + "($1,$2::json);", ['mytrips', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1);
}

//get trips passengers details

trip.getcrews = function(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_api_tripcrews") + "($1,$2::json);", ['tripcrews', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1);
}

//start trip api 

trip.starttrip = function(req, res, done) {
    req.body.mode = "start";

    db.callFunction("select " + globals.schema("funsave_api_startstoptrip") + "($1::json);", [req.body], function(data) {
        var _d = data.rows[0].funsave_api_startstoptrip;
        rs.resp(res, 200, _d);

        if (_d.resstatus) {
            trip.sendNotification({
                "tripid": _d.tripid,
                "flag": "starttrip",
                "type": "driver_tracking",
                "subtype": "start_trip"
            });

            try {
                req.body.loc = '[' + req.body.loc + ']'
                req.body.tripid = _d.tripid;
                req.body.flag = "start";

                var _dtr = {
                    body: req.body
                }

                tripentry.createtripdetails(_dtr);
            } catch (error) {

            }
        }
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    });
}

// api for stop trip from driver device

trip.stoptrip = function(req, res, done) {
    req.body.mode = "stop";

    db.callFunction("select " + globals.schema("funsave_api_startstoptrip") + "($1::json);", [req.body], function(data) {
        var _d = data.rows[0].funsave_api_startstoptrip;
        rs.resp(res, 200, _d);

        if (_d.resstatus) {
            var sendData = req.body;
            sendData["flag"] = "stoptrip";
            sendData["type"] = "driver_tracking";
            sendData["subtype"] = "start_trip";

            trip.sendNotification(sendData);

            try {
                tripentry.stop(sendData);
            } catch (error) {

            }
        }
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    });
}

// api for pickup / drop passenger

trip.picdrpcrew = function(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_api_pickupdropcrew") + "($1::json);", [req.body], function(data) {
        var _d = data.rows[0].funsave_api_pickupdropcrew;
        rs.resp(res, 200, _d);

        if (_d.resstatus) {
            var sendData = req.body;

            if (sendData.status === '1') {
                if (sendData["pd"] == "p") { //for pickup
                    trip.sendpickupalert(sendData);
                } else {
                    trip.senddropalert(sendData); //for dropped
                }

            } else if (sendData.status === '2') // for absent
            {
                trip.sendabsentalert(sendData);
            }
        }
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    });
}

trip.sendpickupalert = function(data) {
    trip.sendNotification({
        "tripid": data.tripid,
        "studid": data.studid,
        "status": data.status,
        "stdnm": data.stdnm,
        "flag": "pickupkid",
        "type": "driver_tracking",
        "subtype": "start_trip"
    });
}

trip.senddropalert = function(data) {
    trip.sendNotification({
        "tripid": data.tripid,
        "studid": data.studid,
        "status": data.status,
        "stdnm": data.stdnm,
        "flag": "dropkid",
        "type": "driver_tracking",
        "subtype": "start_trip"
    });
}

trip.sendabsentalert = function(data) {
    trip.sendNotification({
        "tripid": data.tripid,
        "studid": data.studid,
        "status": data.status,
        "stdnm": data.stdnm,
        "flag": "absent",
        "type": "driver_tracking",
        "subtype": "start_trip"
    });
}

trip.sendreachingalert = function(req, res, done) {
    var data = req.body;

    trip.sendNotification({
        "tripid": data.tripid,
        "studid": data.studid,
        "flag": "reaching",
        "type": "driver_tracking",
        "subtype": "start_trip"
    }, res);
}

// sending FCM notification
var fcm = require("gen").fcm();

trip.sendNotification = function(_data, res) {
    db.callProcedure("select " + globals.schema("funget_api_getnotifyids") + "($1,$2,$3::json);", ['tripnotify', 'tripnotify1', _data],
        function(data) {
            try {
                var _sound = "default";
                var devicetokens = data.rows[0];
                var tokens = [];
                var msg = data.rows[1][0];

                for (var i = 0; i <= devicetokens.length - 1; i++) {
                    tokens.push(devicetokens[i].devtok);

                    try {
                        if (_data.flag === "enter" || _data.flag === "exit") {
                            var uid = devicetokens[i].id;
                            var uphone = devicetokens[i].phone;
                            var uemail = devicetokens[i].email;

                            // Send Notification

                            ntfredis.createNotify({
                                "body": {
                                    "uid": uid,
                                    "title": msg.title,
                                    "body": msg.body
                                }
                            });

                            // Send Email

                            var params = {
                                "sms_to": uphone,
                                "sms_body": msg.title + " : " + msg.body,
                                "mail_to": uemail,
                                "mail_subject": msg.title,
                                "mail_body": msg.body
                            };

                            sms_email.sendEmailAndSMS(params, uphone, uemail, [], "email", _data.enttid);
                        }
                    } catch (ex) {

                    }
                }

                if (res) {
                    if (_data.flag == "reaching") {
                        if (msg.title == "al") {
                            var _d = {
                                "status": false
                            };

                            rs.resp(res, 200, _d);
                            return;
                        } else {
                            var _d = {
                                "status": true
                            };

                            rs.resp(res, 200, _d);
                        }
                    }
                }

                if (_data.type) {
                    if (_data.type == "driver_tracking") {
                        _sound = "notification_tone_2";
                    }
                }

                if (_data.flag == "stoptrip") {
                    if (msg.title == "no") {
                        return;
                    }
                }

                _data["body"] = msg.body;
                _data["title"] = msg.title;

                var message = {
                    "registration_ids": tokens,
                    "notification": {
                        body: msg.body,
                        title: msg.title,
                        sound: _sound,
                    },

                    "data": _data,
                    "priority": "HIGH",
                    "time_to_live": (60 * 15)
                };

                fcm.send(message, function(err, response) {
                    if (err) {
                        console.log("Somethings has gone wrong!", err);
                    } else {
                        console.log("Successfullys sent with response: ", response);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        },

        function(err) {

        }, 2);
}

// VTS

trip.sendVTSNotification = function(_data, res) {
    try {
        var _sound = "notification_tone_2";
        var devicetokens = _data;
        var tokens = {};

        for (var i = 0; i <= devicetokens.length - 1; i++) {
            var d = devicetokens[i];

            if (tokens[d.almtype + "_" + d.vehid] === undefined) {
                tokens[d.almtype + "_" + d.vehid] = {
                    ntfid: 0,
                    msg: d.msg,
                    title: d.title,
                    stdid: d.stdid,
                    flag: d.flag,
                    almtype: d.almtype,
                    batchid: d.batchid,
                    drvid: d.drvid,
                    vehid: d.vehid,
                    rtid: d.rtid,
                    stpid: d.stpid,
                    stptype: "normal",
                    pdid: d.pdid,
                    pdtype: d.pdtype,
                    tm: d.tm,
                    enttid: d.enttid,
                    data: []
                };
            }

            tokens[d.almtype + "_" + d.vehid].data.push({
                devtok: d.token,
                email: d.email,
                phone: d.phone
            });
        }

        try {
            // Send Notification

            var ntfdata = [];

            Object.keys(tokens).forEach(function(key) {
                var val = tokens[key];

                var toks = [];

                for (let index = 0; index < val.data.length; index++) {
                    const element = val.data[index];
                    toks.push(element.devtok);
                    ntfdata.push(element);
                }

                // ntfredis.createNotify({
                //     "body": {
                //         "uid": uid,
                //         "title": msg.title,
                //         "body": msg.body
                //     }
                // });

                if (toks.length > 0) {
                    var dta = {};
                    dta["body"] = val.msg;
                    dta["title"] = val.title;

                    var message = {
                        "registration_ids": toks,
                        "notification": {
                            body: val.msg,
                            title: val.title,
                            sound: _sound,
                        },
                        "data": dta,
                        "priority": "HIGH",
                        "time_to_live": (60 * 15)
                    };

                    // console.log(message);

                    fcm.send(message, function(err, response) {
                        if (err) {
                            console.log("Somethings has gone wrong!", err);
                        } else {
                            console.log("Successfullys sent with response: ", response);
                        }
                    });

                    // Send Email

                    // var params = {
                    //     "sms_to": uphone,
                    //     "sms_body": msg.title + " : " + msg.body,
                    //     "mail_to": uemail,
                    //     "mail_subject": msg.title,
                    //     "mail_body": msg.body
                    // };

                    // sms_email.sendEmailAndSMS(params, uphone, uemail, [], "email", _data.enttid);

                    // Save  Notification
                }
            });

            var params = { "vtsnotification": ntfdata }

            db.callFunction("select " + globals.erpschema("funsave_vtsnotification") + "($1::json);", [params], function(data) {
                console.log("Notification", data.rows);
            }, function(err) {
                console.log(err);
            });
        } catch (ex) {

        }
    } catch (error) {
        console.log(error);
    }
}