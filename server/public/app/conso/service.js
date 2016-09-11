'use strict';

var app=angular.module('app');

app.service("ConsoService",["$http",function($http){
	this.getConsumptions=function(){
		return $http.get("http://localhost:8000/count_consumptions");
	};
	this.getMyBeers=function(id){
		return $http.get("http://localhost:8000/mybeer/"+id);
	};
}]);

