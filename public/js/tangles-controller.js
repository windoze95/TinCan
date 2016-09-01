var socket = io();

angular.module('TinCan')
    .controller('TanglesController', tangleCtrl)

function tangleCtrl($scope) {
    var tangleCtrl = this;

    tangleCtrl.tangleList = [];

    function geo_success(position) {
        tangleCtrl.position = position;
        console.log('this', position)
        socket.emit('newLoc', {
            coords: {
                longitude: position.coords.longitude,
                latitude: position.coords.latitude
            }
        });
        // $scope.$apply();
    }

    function geo_error() {
        console.log('error');
    }

    var geo_options = { enableHighAccuracy: false };

    window.navigator.geolocation.watchPosition( geo_success, geo_error, geo_options );

    socket.on('saveCoordinatesSuccess', function(data) {
        console.debug(data)
        // tangleCtrl.tangleList.push(data);
        $scope.$apply();
    });

    tangleCtrl.submitTangle = function() {
        console.log(tangleCtrl);

        socket.emit('saveCoordinates', {
            title : tangleCtrl.title,
            loc   : {
                type        : 'Point',
                coordinates : [
                    tangleCtrl.position.coords.longitude,
                    tangleCtrl.position.coords.latitude
                ]
            }
        });
    }

    // in case mobile bounces around too much, see below too
    // tangleCtrl.compare = function(a,b) {
    //     if (a._id < b._id)
    //         return -1;
    //     if (a._id > b._id)
    //         return 1;
    //     return 0;
    // }


    socket.on('listLoc', function(list) {
        // tangleCtrl.tangleList.push(position);

        // in case mobile bounces around too much, see above too
        // if ( list.sort(tangleCtrl.compare) == tangleCtrl.tangleList.sort(tangleCtrl.compare) ) {
        //     console.log('we good cuz!')
        // } else {
            tangleCtrl.tangleList = list;
            console.log('list', list);
            $scope.$apply();
        // }
    });

    tangleCtrl.spawnChat = function(id) {
        console.log('my id', id);
        socket.emit('spawnChat', id);
    }
};
