var socket = io();

angular.module('TinCan')
    .controller('TanglesController', tangleCtrl)

// tangles.$inject = ['$scope', 'getLocation'];

function tangleCtrl($scope) {
// , getLocation
    var tCtrl = this;

    tCtrl.testcoords = [];

    socket.on('coords', function(data){
            console.log('? ', data)
            // chat.messageHistory.push(data)
            $scope.$apply()
        })

    function geo_success(position) {
        tCtrl.lat = position.coords.latitude;
        tCtrl.lon = position.coords.longitude;
        tCtrl.testcoords.push(tCtrl.lat);
        tCtrl.testcoords.push(tCtrl.lon);
        socket.emit('coords', tCtrl.testcoords);
        //  $scope.$apply();
        // location_callback(userInfo);
        // resendLocation();
    }

    function geo_error() {
        console.log('error');
        // error_callback();
    }

    // var resendLocationTimeout = null;
    // function resendLocation(){
    //     socket.emit('location', userInfo);
    //     clearTimeout(sendLocationTimeout);
    //     sendLocationTimeout = setTimeout(sendLocation, 1000*5);
    // }

    var geo_options = { enableHighAccuracy: true };
    navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);
    navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options);








    // tCtrl.currentP = getLocation;

    // getLocation.then( function(data){
    //     tCtrl.coords = {}
    //     tCtrl.coords.lat = data.lat
    //     tCtrl.coords.lon = data.lon
    //     // tCtrl.coords.lat = getLocation.$$state.value.lat
    //     // tCtrl.coords.lon = getLocation.$$state.value.lon
    //     // tCtrl.time = getLocation.$$state.value.time
    //     // tCtrl.cpos = data;
    //     // $scope.$apply()
    //     // setTimeout($scope.$apply.bind($scope), 0)
    //     console.log(tCtrl.coords.lat)
    //     console.log(tCtrl.coords.lon)
    //     console.log(tCtrl.coords)
    //
    //     // return tCtrl.coords;
    //
    //     //\\//\\//\\// center map in map view, detect if in pin range
    // }).then( function(){
    //
    //     console.log(tCtrl.coords)
    //
    //     tCtrl.testcoords.push(tCtrl.coords);
        // $scope.$apply();
        // console.log(data, 'this is our socket running');
        //
        // socket.emit('coords', data);
    // });
};
