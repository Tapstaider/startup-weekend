'use strict';

var app=angular.module('app');

app.controller("ConsoController",["$scope","ConsoService",function($scope,ConsoService){
	$scope.bieres={"Triple Karmeliett":166,"1664":122,"Maredsou":55};
}]);