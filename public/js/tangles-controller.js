angular.module('TinCan')
    .controller('TanglesController', tangles);

tangles.$inject = ['$scope', 'getLocation'];

function tangles($scope, getLocation) {

    var tangleCtrl = this;

    tangleCtrl.currentP = getLocation.currentPosition();

    getLocation.currentPosition()
        .then( function(data){
            tangleCtrl.cpos = data;
            // $scope.$apply()
            // setTimeout($scope.$apply.bind($scope), 0)
            console.log(tangleCtrl)
            console.log(tangleCtrl.currentP.$$state.value)

        //\\//\\//\\// center map in map view, detect if in pin range
    });
};
