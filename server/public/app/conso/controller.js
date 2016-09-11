'use strict';

var app=angular.module('app');

app.controller("ConsoController",["$scope","ConsoService",function($scope,ConsoService){
	$scope.bieres={};//{"Tripel Karmeliet":166,"1664":122,"Maredsous":55};
	ConsoService.getConsumptions().then(function(response){
		var conso=response.data.consumptions;
		console.log(conso);
		for(var i=0;i<conso.length;i++){
			ConsoService.getMyBeers(conso[i].id_drink_rfid).then(function(response){
				if(!$scope.bieres.hasOwnProperty(response.data.beer.name)){
					$scope.bieres[response.data.beer.name]=0;
				}
				$scope.bieres[response.data.beer.name]=$scope.bieres[response.data.beer.name]+1;
			},function(data){
			
			});
		}
		
	},function(data){
	
	});
}]);
