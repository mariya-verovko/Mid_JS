app.controller("StartController",["$scope", "$location", function($scope, $location){
	$scope.start = function(){
	  $location.path("/orders-list");	
	};
}]);