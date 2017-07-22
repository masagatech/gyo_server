var mondb = require("../../db/mongodbservice.js");
var rs = require("gen").res;
var globals = require("gen").globals;
var datetime = require('node-datetime');
var socketserver = require("../../bin/socketserver.js"); //socket server for instant message
var speedCapture = require("../schoolapi/speed.js"); //socket server for instant message

var tripsinfo = module.exports = {};


//tripinfo schema
var Schema = mondb.mongoose.Schema;
var LocationSchema = new Schema({
    tripid: Number,
    sertm: Date,
    loctm: Date,
    loc: {
        type: [Number], // [<longitude>, <latitude>]
        index: '2d' // create the geospatial index
    },
    drvid: Number,
    speed: Number,
    bearing: Number,
    appvr: String,
    uid: String,
    pdid: Number,
    btr: String,
    alwspeed: Number,
    flag: String
});

mondb.mongoose.model('tripdetails', LocationSchema);

tripsinfo.createtripdetails = function (req, res, done) {
    try {
        if (req.body) {
            if (req.body) {
                req.body.loc = JSON.parse(req.body.loc);
                req.body.sertm = Date.now();
            }
        }
        var loc = req.body.loc;


        mondb.mongoose.model('tripdetails').create(req.body, function (err, data) {
            if (err) {
                //console.log(err);
                if (res) {
                    rs.resp(res, 400, err);
                }
                return;
            }
            //console.log(data);
            if (res) {
                rs.resp(res, 200, data._id);
            }
            try {
                // console.log(req.body);
                var data = {
                    "lat": loc[0],
                    "lon": loc[1],
                    "speed": req.body.speed,
                    "alwspeed": req.body.alwspeed,
                    "bearng": req.body.bearing,
                    "tripid": req.body.tripid,
                    "sertm": req.body.sertm,
                    "btr": req.body.btr
                };
                //send data to socket listner    
                socketserver.io.sockets.in(req.body.tripid).emit('msgd', { "evt": "data", "data": data });

                try {
                    //if (parseInt(req.body.alwspeed) > 0 && parseInt(req.body.speed) > parseInt(req.body.alwspeed))//entry if speed is greater than allowd
                    {
                        speedCapture.saveSpeedVialation(
                            {
                                body: {
                                    "tripid": req.body.tripid,
                                    "pdid": req.body.pdid,
                                    "drvid": req.body.drvid,
                                    "speed": req.body.speed,
                                    "maxspeed": req.body.alwspeed,
                                    "entt": req.body.entt,
                                    "vhid": req.body.vhid,
                                    "details": data
                                }
                            })
                    }

                } catch (error) {
                    console, log("tripsinfo : 81 :", error)
                }

            } catch (e) {
                console, log("tripsinfo : 85 :", e)
            }
        });
    } catch (ex) {
        if (res) {
            rs.resp(res, 400, ex.message);
        }
        //console.error(ex.message);
    }
}

tripsinfo.stop = function (data1) {

    data1.loc = '[' + data1.loc + ']';

    tripsinfo.createtripdetails({ body: data1 });
    if (data1) {
        data1.loc = JSON.parse(data1.loc);
        data1.sertm = Date.now();
    }
    var data = {
        "lat": data1.loc[0],
        "lon": data1.loc[1],
        "speed": data1.speed,
        "alwspeed": data1.alwspeed,
        "bearng": data1.bearing,
        "tripid": data1.tripid,
        "sertm": data1.sertm,
        "btr": data1.btr,
        "flag": "stop"
    };

    socketserver.io.sockets.in(data.tripid).emit('msgd', { "evt": "stop", "data": data });
}


tripsinfo.gettripdelta = function (req, res, done) {
    var limit = req.body.limit || 1;
    var d = mondb.mongoose.model('tripdetails').find({ 'tripid': req.body.tripid }).select('tripid loc bearing sertm speed btr flag').sort({ 'sertm': -1 }).limit(limit);
    d.exec(function (err, data) {
        if (err) {
            rs.resp(res, 400, err);
            return;
        }
        rs.resp(res, 200, data);
    });
}