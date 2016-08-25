angular.module('TinCan')
    .controller('TanglesController', tangleCtrl);

// tangles.$inject = ['$scope', 'getLocation'];

function tangleCtrl($scope, getLocation) {

    var tCtrl = this;

    // tCtrl.currentP = getLocation;

    getLocation.then( function(data){
        tCtrl.lat = getLocation.$$state.value.lat
        tCtrl.lon = getLocation.$$state.value.lon
        tCtrl.time = getLocation.$$state.value.time
        // tCtrl.cpos = data;
        // $scope.$apply()
        // setTimeout($scope.$apply.bind($scope), 0)
        console.log(tCtrl.lat)
        console.log(tCtrl.lon)

        //\\//\\//\\// center map in map view, detect if in pin range
    });
};
