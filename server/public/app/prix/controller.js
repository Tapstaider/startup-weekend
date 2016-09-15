'use strict';

var app=angular.module('app');

app.controller("PrixController",["$scope","PrixService",function($scope,PrixService){
	$scope.getImageBiere = function (nomBiere) {
		if (nomBiere && nomBiere !== '') {
			return 'image/beer/'+nomBiere+'.png';
		}
		return '';
	}
	$scope.bieres={};//{"Triple Karmeliett":166,"1664":122,"Maredsou":55};
	$scope.incrementeBiere=function(nomBiere){
		console.log(nomBiere+"+1");
		$scope.bieres[nomBiere]=$scope.bieres[nomBiere]+1;
	};
	$scope.decrementeBiere=function(nomBiere){
		console.log(nomBiere+"-1",$scope.bieres[nomBiere]);
		$scope.bieres[nomBiere]=$scope.bieres[nomBiere]-1;
	};

	PrixService.getBeers().then(function(response){
		var beers=response.data.beers;
		console.log(beers);
		for(var i=0;i<beers.length;i++){
			$scope.bieres[beers[i].name]=6;
		}

	},function(data){

	});
}]);
