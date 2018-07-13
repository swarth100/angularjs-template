'use strict';

/* Declare app module */
let app = angular.module('pandaApp', [
  'ngRoute',
]);

/* Creates the routeprovider.
 * Route providers allow frontend routing between pages */
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

/* Creates factory for socket
 * Since we are inject the code into angular app, we can call the socket inside parameter
 * eg. connect is an event which is fired upon a successful connection
 *     socket.on('connect', (data) => {
 *         socket.emit('hello', 'Hello world');
 *     });
 */
 app.factory('socket', function ($rootScope) {
   var socket = io.connect();
   return {
     /* Event listener */
     on: function (eventName, callback) {
       socket.on(eventName, function () {
         var args = arguments;
         $rootScope.$apply(function () {
           callback.apply(socket, args);
         });
       });
     },
     
     /* Event emitter */
     emit: function (eventName, data, callback) {
       socket.emit(eventName, data, function () {
         var args = arguments;
         $rootScope.$apply(function () {
           if (callback) {
             callback.apply(socket, args);
           }
         });
       })
     }
   };
 });
