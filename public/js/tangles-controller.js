var socket = io();

angular.module('TinCan')
    .controller('TanglesController', tangleCtrl)

// tangles.$inject = ['$scope', 'getLocation'];

function tangleCtrl($scope, getLocation) {

    var tCtrl = this;

    tCtrl.testcoords = [];

    // tCtrl.currentP = getLocation;

    getLocation.then( function(data){
        tCtrl.coords.lat = data.lat
        tCtrl.coords.lon = data.lon
        // tCtrl.coords.lat = getLocation.$$state.value.lat
        // tCtrl.coords.lon = getLocation.$$state.value.lon
        // tCtrl.time = getLocation.$$state.value.time
        // tCtrl.cpos = data;
        // $scope.$apply()
        // setTimeout($scope.$apply.bind($scope), 0)
        console.log(data)
        console.log(tCtrl.coords.lat)
        console.log(tCtrl.coords.lon)
        console.log(tCtrl.coords)

        return tCtrl.coords;
        //\\//\\//\\// center map in map view, detect if in pin range
    }).then( function(data){
        tCtrl.testcoords.push(data);
        $scope.$apply();
        // console.log(data, 'this is our socket running');
        //
        // socket.emit('coords', data);
    });
};
