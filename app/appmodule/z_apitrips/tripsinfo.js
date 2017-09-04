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
    vhid: Number,
    flag: String,
    altd:Number,
    accr:Number,
    actvt:String,
    actper:Number
    
});


//schema for vrhicle last update
var LastUpdateVehSchema = new Schema({
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
    vhid: { type: Number, index: true },
    flag: String,
    altd:Number,
    accr:Number,
    actvt:String,
    actper:Number
});


mondb.mongoose.model('trps', LocationSchema);
mondb.mongoose.model('vhups', LastUpdateVehSchema);

tripsinfo.createtripdetails = function (req, res, done) {
    try {
        console.log(req.body);
        if (req.body) {
            if (req.body.loc) {
                req.body.loc = lattolon(req.body.loc);
                req.body.sertm = Date.now();
                //  console.log(req.body);
            }
        }
        var loc = req.body.loc;

        mondb.mongoose.model('trps').create(req.body, function (err, data) {
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

                if (req.body.flag === undefined) { req.body.flag = "inprog"; }
                // console.log(req.body);
                var _speeddata = {
                    "lat": loc[1],
                    "lon": loc[0],
                    "loc": loc,
                    "speed": req.body.speed,
                    "alwspeed": req.body.alwspeed,
                    "bearing": req.body.bearing,
                    "tripid": req.body.tripid,
                    "sertm": req.body.sertm,
                    "btr": req.body.btr,
                    "vhid": req.body.vhid,
                    "flag": req.body.flag,
                    "accr":req.body.accr,
                    "altd":req.body.altd,
                    "actvt":req.body.actvt,
                    "actper":req.body.actper

                };


                try {
                    if (parseInt(req.body.alwspeed) > 0 && parseInt(req.body.speed) > parseInt(req.body.alwspeed))//entry if speed is greater than allowd
                    {
                        //save if the speed voilate
                        speedCapture.saveSpeedVialation(
                            {
                                body: {
                                    "tripid": req.body.tripid,
                                    "pdid": req.body.pdid,
                                    "drvid": req.body.drvid,
                                    "speed": parseInt(req.body.speed),
                                    "maxspeed": req.body.alwspeed,
                                    "entt": req.body.entt,
                                    "vhid": req.body.vhid,
                                    "details": _speeddata
                                }
                            })
                    }



                } catch (error) {
                    console, log("tripsinfo : 81 :", error)
                }

                tripsinfo.updateData(req.body);

                //send data to socket listner    
                //socketserver.io.sockets.in(req.body.tripid).emit('msgd', { "evt": "data", "data": _speeddata });
                socketserver.io.sockets.in(req.body.vhid).emit('msgd', { "evt": "data", "data": _speeddata });


            } catch (e) {
                console, log("tripsinfo : 85 :", e)
            }
        });
    } catch (ex) {
        console, log("tripsinfo : 81 :", ex)
        if (res) {
            rs.resp(res, 400, ex.message);
        }
        //console.error(ex.message);
    }
}
//update single record for vehicle last update state
tripsinfo.updateData = function (data) {
    //console.log(data);

    mondb.mongoose.model('vhups').findOneAndUpdate({ 'vhid': data.vhid }, data, { upsert: true }, function (err, data) {
        if (err) {
            //console.log(err);

            console.log(err);
            return;
        }

    });
}


tripsinfo.stop = function (data1) {

    data1.loc = '[' + data1.loc + ']';
    //data1.loc = lattolon(data1.loc);
    data1.flag = "stop";
    //console.log(data1);
    tripsinfo.createtripdetails({ body: data1 });

    // if (data1) {
    //     data1.loc = JSON.parse(data1.loc);
    //     data1.sertm = Date.now();
    // }
    // var data = {
    //     "lat": data1.loc[0],
    //     "lon": data1.loc[1],
    //     "loc": data1.loc,
    //     "speed": data1.speed,
    //     "alwspeed": data1.alwspeed,
    //     "bearng": data1.bearing,
    //     "tripid": data1.tripid,
    //     "sertm": data1.sertm,
    //     "btr": data1.btr,
    //     "vhid": data1.vhid,
    //     "flag": "stop"
    // };


    //console.log(data);
    //tripsinfo.updateData(data);
    //socketserver.io.sockets.in(data.tripid).emit('msgd', { "evt": "stop", "data": data });
    //socketserver.io.sockets.in(data.vhid).emit('msgd', { "evt": "stop", "data": data });
}


tripsinfo.gettripdelta = function (req, res, done) {
    var limit = req.body.limit || 1;
    var d = mondb.mongoose.model('trps').find({ 'tripid': req.body.tripid }).select('tripid loc bearing sertm alwspeed speed btr flag ').sort({ 'sertm': -1 }).limit(limit);
    d.exec(function (err, data) {
        if (err) {
            rs.resp(res, 400, err);
            return;
        }
        rs.resp(res, 200, data);
    });
}



tripsinfo.getvhupdtes = function (req, res, done) {

    if (req.body.ismob) { req.body.vhids = [req.body.vhids.replace("'", "")] }
    

    var d = mondb.mongoose.model('vhups').find({ 'vhid': { $in: req.body.vhids } }).select('vhid tripid loc bearing sertm alwspeed speed btr flag');
    d.exec(function (err, data) {
        if (err) {
            rs.resp(res, 400, err);
            return;
        }
        rs.resp(res, 200, data);
    });
}


function lattolon(latlon) {
    let rawl = latlon;
    let rawloc = JSON.parse(rawl);
    let reverseData = JSON.parse(rawl);
    reverseData[0] = rawloc[1];
    reverseData[1] = rawloc[0];
    return reverseData;
}