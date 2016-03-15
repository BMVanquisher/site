(function () {
    "use strict";

    angular.module('app')
        .constant('appSettings', {
            apiPath: 'http://localhost:50106/'
        })
        .config([
            '$urlRouterProvider', '$stateProvider',
            function($urlRouterProvider, $stateProvider) {
                $urlRouterProvider.otherwise("/main");
                $stateProvider
                    .state("main", {
                        url: "/main",
                        templateUrl: "app/components/main.html",
                        controller: "ModCtrl"

                });
            }
        ]);
}());
                   