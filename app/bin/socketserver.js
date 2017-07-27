var socketserver = module.exports = {};
socketserver.io = null;
socketserver.socketSub = [];
socketserver.socketPub = [];

socketserver.start = function () {
    socketserver.io.on('connection', function (client) {
        //console.log("new client Connected");

        //client.emit('msg', "connected");

        client.on('disconnect', function () {
            //client.emit('msg', "client disconnected!");

        });
        // client.on('chat message', function(msg) {
        //     io.emit('chat message', msg);
        //     console.log(msg);
        // });
        //on new client connected

        client.on('register', function (msg) {
            // client.
            console.log("register");
            client.join(msg);
            client.emit("msgd", { "evt": "registered", "tripid": msg });

        });



        client.on('unregister', function (msg) {
            // client.
            client.leave(msg);
            client.emit("msgd", { "evt": "unregistered", "tripid": msg });

        });

        client.on('reg_v', function (msg) {
            // client.
            let vhids = msg.split(',');
            for (var i = 0; i < vhids.length; i++) {
                let el = vhids[i];
                client.join(el);
            }
            client.emit("msgd", { "evt": "registered", "vhids": msg });

        });

        

        client.emit("msgd", { "evt": "regreq" });

    });
    console.log("Socket Server Started!!!");
}