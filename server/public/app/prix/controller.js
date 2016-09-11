'use strict';

var app=angular.module('app');

app.controller("PrixController",["$scope","PrixService",function($scope,PrixService){
	$scope.bieres={"Triple Karmeliett":166,"1664":122,"Maredsou":55};
	$scope.incrementeBiere=function(nomBiere){
		console.log(nomBiere+"+1");
	};
	$scope.decrementeBiere=function(nomBiere){
		console.log(nomBiere+"-1");
	};
}]);

