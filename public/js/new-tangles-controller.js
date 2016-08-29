var socket = io();

angular.module('TinCan')
    .controller('NewTangleController', newTangleCtrl)

// tangles.$inject = ['$scope', 'getLocation'];

function newTangleCtrl($scope, NewTangleFactory) {

    var ntCtrl = this;

    socket.on('coords', function(data){
        // ntCtrl.lat = data.lat;
        // ntCtrl.lon = data.lon;
        console.log('create', data);
        // data.location = [data.lat, data.lon]
        // ntCtrl.newTangle = {
        //     location: [12, 12]
        //     // location: [ntCtrl.lon, ntCtrl.lat]
        // }; // eventually becomes req.body on the backend
        // ntCtrl.newTangleId;
    })

    ntCtrl.submitTangle = function() {
        NewTangleFactory.create(ntCtrl.newTangle)
        // socket.emit('newcoords', nCtrl.newTan)
        // .then(ntCtrl.submitSucess, ntCtrl.submitError);
    }

    ntCtrl.submitSucess = function(res) {
        console.info('!', res.data);
        ntCtrl.newTangleId = res.data._id;
    }

}
