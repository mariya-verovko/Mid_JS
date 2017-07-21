app.controller("ClientUpdateController",["$scope", "$location", "$routeParams", "Client", function($scope, $location, $routeParams, Client){
	$scope.client = {};	
	$scope.client = Client.get({id: $routeParams.id});
		
	$scope.regex = {
	  email : "^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$",
	  name : "[A-Za-zА-Яа-яЁ]+", 
	  surname : "[A-Za-zА-Яа-яЁ]+",
	  phone : "38\\d{10}"
   }
   
   //Updating of the cliet data
	$scope.updateClient = function(){
		if ($scope.editClientForm.$valid){
			Client.update({id: $scope.client._id}, $scope.client);    		  
	        $location.path("/edit-order/" + $routeParams.orderid);
		}
	}
	
	$scope.close = function(){
		$location.path("/edit-order/" + $routeParams.orderid);
	}
}]);