angular.module('TinCan')
    .factory('NewTangleFactory', ['$http', createTangle]);

function createTangle($http) {
    return {
        create: function(tData) {
            return $http.post('/tangles/create', tData)
        }
    }
}
