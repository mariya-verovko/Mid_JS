app.controller("OrderDetailsController",["$scope", "$location",  "$routeParams", "Order", "Client", function($scope, $location, $routeParams, Order, Client){
	$scope.selectedOrder = {};
	$scope.selectedOrder = Order.get({id: $routeParams.id});
	
	//Converts dates to required format
	$scope.convertDate = function(datestring){
	  var date = new Date(datestring);
	  return transform(date.getDate()) + "." + transform(date.getMonth()+1) + "." + date.getFullYear();
    }
	
	function transform(number){
		return number>9?""+number:"0"+number;
	}
	
	$scope.close = function(){
		$location.path("/orders-list");
	}
	

}]);