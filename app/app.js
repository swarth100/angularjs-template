'use strict';

/* Declare app module */
let app = angular.module('pandaApp', [
  'ngRoute',
]);

app.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false,
    });

  /* Basic routing */
  $routeProvider
    .when('/home', {
        templateUrl: "components/home/home.html",
        controller: 'homeCtrl'
      })
    .otherwise({ redirectTo: '/home' });
});
