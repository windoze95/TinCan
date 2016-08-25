angular.module('TinCan')
    .controller('NewTangleController', newTangleCtrl)

// tangles.$inject = ['$scope', 'getLocation'];

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

        ntCtrl.submitSucess = function(res) {
            console.info('New Car Created!', res.data);
            ntCtrl.newTangleId = res.data._id;
        }
    });
}
