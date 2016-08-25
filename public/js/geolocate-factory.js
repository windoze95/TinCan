angular.module('TinCan')
    .factory('getLocation', ['$q', '$window', currentPosition]);
        // function($q, $window) {

        // function currentPosition() {
        //     var id, options;
        //
        //     function success(pos) {
        //         var crd = pos.coords;
        //     }
        //
        //     function error(err) {
        //         console.warn('ERROR(' + err.code + '): ' + err.message);
        //     }
        //
        //     options = {
        //         enableHighAccuracy: true,
        //         timeout: 12000,
        //         maximumAge: 0
        //     };
        //
        //     id = $window.navigator.geolocation.watchPosition(success, error, options);
        //
        //     return id;
        // }

        function currentPosition($q, $window) {

            var defer = $q.defer();

            if (!$window.navigator.geolocation) {
                defer.reject('Geolocation not supported in this browser.');
            } else {
                $window.navigator.geolocation.watchPosition(

                    function(position) {
                        defer.resolve(position.currentCoords = {
                            lat:    position.coords.latitude,
                            lon:    position.coords.longitude,
                            // time:   position.timestamp
                        });
                    },
                    function(err) {
                        defer.reject(err);
                        console.log('impliment fallback');
                    }, {
                        enableHighAccuracy: true,
                        timeout: 120000
                    }
                );
            }
            return defer.promise;
        }

        //
        // return {
        //     currentPosition: currentPosition
        // };
    // }]);
