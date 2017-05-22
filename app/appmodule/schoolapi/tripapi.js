var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;


var trip = module.exports = {};
trip.mytrips = function(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_api_mytrips") + "($1,$2::json);", ['mytrips', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1);
}

trip.getcrews = function(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_api_tripcrews") + "($1,$2::json);", ['tripcrews', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1);
}


trip.starttrip = function(req, res, done) {
    req.body.mode = "start";
    db.callFunction("select " + globals.schema("funsave_api_startstoptrip") + "($1::json);", [req.body], function(data) {
        var _d =data.rows[0].funsave_api_startstoptrip;
        if(_d.resstatus){
            trip.sendNotification({"tripid": _d.tripid});
        }
        rs.resp(res, 200, _d);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    });

    // db.callFunction("select " + globals.schema("funsave_api_startstoptrip") + "($1::json);", [req.body], function(data) {
    //     rs.resp(res, 200, data.rows);
    // }, function(err) {
    //     rs.resp(res, 401, "error : " + err);
    // });
}

trip.stoptrip = function(req, res, done) {
    req.body.mode = "stop";
    db.callFunction("select " + globals.schema("funsave_api_startstoptrip") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows[0].funsave_api_startstoptrip);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    });
}


trip.picdrpcrew = function(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_api_pickupdropcrew") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows[0].funsave_api_pickupdropcrew);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    });
}


var fcm = require("gen").fcm();
    trip.sendNotification = function(data) {
      var tripid = data.tripid;
      var studs = data.studs;
       db.callProcedure("select " + globals.schema("funget_api_getnotifyids") + "($1,$2,$3::json);", ['tripnotify','tripnotify1', {"tripid":tripid,"flag" : "starttrip"}], 
       function(data) {
           var devicetokens = data.rows[0];
           var tokens = [];
           var msg = data.rows[1][0];
           for(var i=0;i<=devicetokens.length -1;i++){
                tokens.push(devicetokens[i].devtok);
           }

        var message = {
                        "registration_ids": tokens,
                        "notification": {
                            "sound": "default",
                             "body": msg.body,
                            "title": msg.title,
                        },
                        "data":{
                            "type": "driver_tracking",
                            "subtype": "start_trip",
                            "tripid" : tripid,
                            "body": msg.body,
                            "title": msg.title,
                        },
                        "priority": "HIGH",
                        "time_to_live": (60 * 15)
                    };
                fcm.send(message, function(err, response) {

                    if (err) {

                        //console.log("Something has gone wrong!");

                    } else {
                        //console.log("Successfully sent with response: ", response);

                    }
                });

    }, function(err) {
      
    },2);

}
