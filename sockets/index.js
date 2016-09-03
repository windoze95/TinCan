// var Coordinates = require('./coordinates');
var Tangle = require('../models/tangles');

module.exports = function (socketServer) {
    return (socket) => {
        socket.on('saveCoordinates', (data) => {
            console.log('Data:', data);

            var newTangle = new Tangle(data);

            newTangle.save( (err, data) => {
                if(err) {
                    console.error('Error!'.red.bold, ' Could not save coordinates', err);
                    socket.emit('saveCoordinatesError', err);
                } else {
                    console.info('Saving coordinates was successful');
                    socket.emit('saveCoordinatesSuccess', data);

                }
            });
        });

        socket.on('newLoc', (position) => {
            console.log("theobject i want", position)
            // tangleCtrl.listTangles = function() {
            Tangle.find(
                {
                    loc: {
                        $nearSphere: {
                            $geometry: {
                                type : "Point",
                                coordinates : [
                                    position.coords.longitude,
                                    position.coords.latitude
                                ]
                            },
                            // $minDistance: 0,
                            $maxDistance: 100
                        }
                    }
                },
                function(err, tangles) {
                    socket.emit('listLoc', tangles);
                }
            )
            // }
        });

        socket.on('spawnChat', function(id){
            console.log('chat spawning...')
            socket.join(id)
            socket.emit('spawnChat2', id)
        });

        socket.on('chatMessage', function(data){
            console.log('message to server!', data)
            socketServer.to(data.chatId).emit('chatMessage', {content:data.message})
            // socketServer.emit('chatMessage', {sender:socketUser.username,content:data})

            // If you wanted to save messages - maybe use a mongo collection!
            // ex :
                // var message = new ChatMessage({'user.username': data})
                // message.save(function(){})

        });

    }
}
