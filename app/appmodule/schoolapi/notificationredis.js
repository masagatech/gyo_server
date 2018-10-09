var rs = require("gen").res;
var red = require("redis"),
    redis = red.createClient();


redis.on("error", function (err) {
    console.log("Error " + err);
});


var notification = module.exports = {};

notification.getNotify = function getNotify(req, res1, done) {
    var keys = redis.hkeys('USER' + req.query.uid, function (err, res) {
        if (err) {
            rs.resp(res1, 200, {
                "state": false,
                "error": err
            });
        } else {
            var kys = res;
            if (kys.length > 0) {
                redis.hget('USER' + req.query.uid, kys[0].toString(), function (err, res) {
                    try {
                        rs.resp(res1, 200, {
                            "state": true,
                            data: JSON.parse(res)
                        });
                        redis.hdel('USER' + req.query.uid, kys[0].toString());
                    } catch (error) {
                        rs.resp(res1, 200, {
                            "state": false,
                            "error": error
                        });
                    }
                });
            } else {
                rs.resp(res1, 200, {
                    "state": false,
                    "error": "no data found"
                });
            }
        }
    });
}

var expiryTime = 180;

notification.createNotify = function createNotify(req, res1, done) {
    var uid = req.body.uid;

    var keys = redis.hkeys('USER' + uid, function (err, res) {
        if (res.length > 20) {
            // Delete if order greater than 20

            var retunval = redis.hdel('USER' + uid, res[0].toString(), function (err, res) {
                if (err) {
                    if (res1)
                        rs.resp(res1, 200, {
                            "state": false,
                            "error 1": err
                        });
                    return;
                }

                var uniq = new Date().getTime();

                // Add to new order
                redis.hmset(['USER' + uid, uniq, JSON.stringify(req.body)], function (err, res) {
                    if (err) {
                        if (res1)
                            rs.resp(res1, 200, {
                                "state": false,
                                "error 2": err
                            });
                        return;
                    }

                    redis.expire('USER' + uid, expiryTime);
                    if (res1)
                        rs.resp(res1, 200, {
                            "state": true,
                            "data": res
                        });
                });
            })
        } else {
            var uniq = new Date().getTime();
            // Add to new order
            redis.hmset(['USER' + uid, uniq, JSON.stringify(req.body)], function (err, res) {
                if (err) {
                    if (res1)
                        rs.resp(res1, 200, {
                            "state": false,
                            "error 3": err
                        });
                    return;
                }
                redis.expire('USER' + uid, expiryTime);
                if (res1)
                    rs.resp(res1, 200, {
                        "state": true,
                        "data": res
                    });
            });
        }
    });
}