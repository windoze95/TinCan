angular.module('TinCan')
    .controller('ListCtrl', captureUserLocation);

captureUserLocation.$inject = ['getLocation'];

function captureUserLocation(getLocation) {

    getLocation.currentPosition().then(console.log(getLocation.currentPosition(), 'onUserLocationFound'));
};
