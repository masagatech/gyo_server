var socketserver = module.exports = {};
socketserver.io = null;
socketserver.socketSub = [];
socketserver.socketPub = [];

socketserver.start = function() {
    socketserver.io.on('connection', function(client) {
        console.log("new client Connected");

        client.emit('msg', "connected");

        client.on('disconnect', function() {
            //client.emit('msg', "client disconnected!");

        });
        // client.on('chat message', function(msg) {
        //     io.emit('chat message', msg);
        //     console.log(msg);
        // });
        //on new client connected

        client.on('register', function(msg) {
            // client.

        });

    });
}