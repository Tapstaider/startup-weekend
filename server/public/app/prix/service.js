'use strict';

var app=angular.module('app');

app.service("PrixService",["$http",function($http){
	this.getBeers=function(){
		return $http.get("http://localhost:8000/beers");
	}
}]);

