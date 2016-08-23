angular.module('TinCan')
    .factory('getLocation', ['$q', '$window', function ($q, $window) {

        function currentPosition() {
            var defer = $q.defer();

            if (!$window.navigator.geolocation) {
                defer.reject('Geolocation not supported in this browser.');
            } else {
                $window.navigator.geolocation.watchPosition(

                    function (position) {
                        defer.resolve(position);
                    },
                    function (err) {
                        defer.reject(err);
                        console.log('impliment fallback');
                    },
                    {
                        enableHighAccuracy:true,
                        timeout:120000
                    }
                );
            }

            return defer.promise;
        }

        return {
                currentPosition: currentPosition
        };
    }]);


// getLocation.$inject = ['$window'];
        // 'use strict';
