app.controller("OrderUpdateController",["$scope", "$location", "$compile", "$routeParams", "Order", "Client", "Providers", function($scope, $location, $compile, $routeParams, Order, Client, Providers){
	
	$scope.order = {};
	$scope.client = {};	
	$scope.previousCanceledDate = new Date();
    $scope.statuses = [];
	$scope.providers = [];
		
	$scope.additionalPositions = [];
	
	$scope.regex = {
	  position : "[A-Za-zА-Яа-яЁ\\s]+",
	  comment : "[\\wА-Яа-яЁ\\s]+"  
    }
  
	//Getting of order for updating with all necessary fields
	$scope.order = Order.get({id: $routeParams.id},function(){
		Client.get({id: $scope.order.clientId}, function(response){
		    $scope.client = response.surname + " " + response.name; 
	    });
		$scope.previousCanceledDate = new Date($scope.order.closedDate);
		var allStatuses = ["Done", "Confirm", "Expired", "Failed"];
		if ($scope.order.status != "New") {
			var doubleStatus = $scope.order.status;
		    allStatuses.splice(allStatuses.indexOf(doubleStatus), 1);
			$scope.statuses = allStatuses;
		} else {
			$scope.statuses = allStatuses;
		}
		

	   $scope.providers = Providers.query(function(){
	     var position = 0;
	     $scope.providers.forEach(function(item, i){
	     if (item.id == $scope.order.provider.id) position = i;
	     });
	     $scope.providers.splice(position, 1);
       });
	});
	
	//Generates and converts dates to required format    
	$scope.convertDate = function(datestring){
	  var date = new Date(datestring);
	  return date.getFullYear() + "-" + transform(date.getMonth()+1) + "-" + transform(date.getDate());
    }
	
	var now = new Date();
    $scope.currentDate = $scope.convertDate(now); 
  
    var lastDate = new Date();
    lastDate.setDate(now.getDate()+30);
	
    $scope.canceledDate = $scope.convertDate(lastDate);
	
	function transform(number){
		return number>9?""+number:"0"+number;
	}
	
	//Updating of the order data
    $scope.updateOrder = function(){
	 if ($scope.editOrderForm.$valid){
		$scope.additionalPositions.forEach(function(item){
		  $scope.order.positions.push(item);
		});
		$scope.order.closedDate = $scope.previousCanceledDate;
		Order.update({id: $scope.order._id}, $scope.order, function(){});  
	    $location.path("/orders-list");
	 }
    };
	
  //Transitions to other forms	
	$scope.editClient = function(clientId){
		$location.path("/edit-client/" + clientId + "/" + $scope.order._id);
	}
	
	$scope.close = function(){
		$location.path("/orders-list");
	}
	
//Generatin of new input for position
    var counter = 0;
    $scope.addPosition = function(){
	  var index = counter>$scope.additionalPositions.length?counter:$scope.additionalPositions.length;
      var input = angular.element('<label></label>  <input name="position" type="text" class="additionInput" ng-model="additionalPositions[' + index + ']" ng-pattern="regex.position" ng-minlength="4" ng-maxlength="15"></br>');
 	  var parentElement = angular.element(document.querySelector('#additionalDiv'));
      parentElement.append($compile(input)($scope));
	  counter++;
    }

}]);