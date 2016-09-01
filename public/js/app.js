angular.module('TinCan', ['ui.router', 'ngAnimate'])

angular.module('TinCan')
    .config(function ($stateProvider, $urlRouterProvider) {
    // .config(tinCanRouter)

// tinCanRouter.$inject = ['$stateProvider, $urlRouterProvider'];
//
// function tinCanRouter($stateProvider, $urlRouterProvider) {
    $stateProvider
        // .state('tangles', {
        //     url         : '/',
        //     templateUrl : '/views/list.html'
        // })
        .state('list', {
            url         : '/list',
            templateUrl : '/views/list.html'
        })
//         .state('mapView', {
//             url         : '/map',
//             templateUrl : 'list.html',
//             controller  : 'MapCtrl as mCtrl'
//         })
        .state('create', {
            url         : '/create',
            templateUrl : '/views/create.html'
        })
        .state('chat', {
            url         : '/chat',
            templateUrl : '/views/chat.html'
            // controller  : 'Shell as Shell'
        })
//
        $urlRouterProvider.otherwise('/list')
});
