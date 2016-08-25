angular.module('TinCan')
    .controller('TanglesController', tangleCtrl);
    .controller('NewTangleController', newTangleCtrl);

// tangles.$inject = ['$scope', 'getLocation'];

function tangleCtrl($scope, getLocation) {

    var tCtrl = this;

    // tCtrl.currentP = getLocation;

    getLocation.then( function(data){
        tCtrl.lat = getLocation.$$state.value.lat
        tCtrl.lon = getLocation.$$state.value.lon
        // tCtrl.time = getLocation.$$state.value.time
        // tCtrl.cpos = data;
        // $scope.$apply()
        // setTimeout($scope.$apply.bind($scope), 0)
        console.log(tCtrl.lat)
        console.log(tCtrl.lon)

        //\\//\\//\\// center map in map view, detect if in pin range
    });
};

function newTangleCtrl($scope, getLocation, NewTangleFactory) {

    var ntCtrl = this;

    getLocation.then( function(data){
        ntCtrl.lat = getLocation.$$state.value.lat
        ntCtrl.lon = getLocation.$$state.value.lon

        ntCtrl.newTangle = {
            location: [lon, lat]
        }; // eventually becomes req.body on the backend
        ntCtrl.newTangleId;

        ntCtrl.submitTangle = function() {
            NewTangleFactory.create(ntCtrl.newTangle)
                // .then(ntCtrl.submitSucess, ntCtrl.submitError);
        }

        // ntCtrl.submitSucess = function(res) {
        //     console.info('New Car Created!', res.data);

            ntCtrl.newTangleId = res.data._id;
        }
    });
}
