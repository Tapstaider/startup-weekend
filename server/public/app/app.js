'use strict';

var app=angular.module('app',["ngRoute"]);

app.config(['$routeProvider',
	function($routeProvider) { 
		$routeProvider
		.when('/conso', {
			templateUrl: 'app/conso/template.html',
			controller: 'ConsoController'
		})
		.when('/prix', {
			templateUrl: 'app/prix/template.html',
			controller: 'PrixController'
		})
		.otherwise({
			redirectTo:"/conso"
		});
	}
]);