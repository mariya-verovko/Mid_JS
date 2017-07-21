app.controller("OrdersController",["$scope", "$location", "Orders", "Order", "Client", function($scope, $location, Orders, Order, Client){
 
  $scope.orders = [];
  $scope.clients = [];
  $scope.parameter = {"_id":undefined, "orderId":"", "clientId":0, "positions": [], "orderType":"", "createDate":"", "provider":{"id":"","name":""},"closedDate":"", "status":"", "comment":""};
  $scope.sortOption = 'createDate';
  
  //Download orders list
  $scope.orders = Orders.query(function(){
	  $scope.orders.forEach(function(item){
	  	 Client.get({id: item.clientId}, function(response){
		   $scope.clients.push(response);		   
	     });
	  });
  checkAndUpdateOrders();
  });
  
  //Looking for orders which have been confirmed but now are expired
  var checkDateforExpiration = function(datestring) {
	 var timeLeft = (new Date(datestring) - new Date())/1000/3600/24;
	 return (timeLeft < 1);
  } 
  
  var checkAndUpdateOrders = function(){
	  var orders = $scope.orders; 
	  orders.forEach(function(item, i){
		 if ((item.status == "Confirm") && checkDateforExpiration(item.closedDate)){
			 item.status = "Expired";
			 Order.update({id: item.id}, item, function(){
				 $scope.orders[i] = item;
             });
		 }
	  });
  }
  
 //Checking if the order is still editable   
  $scope.isEditable = function(datestring){
	  var timeLeft = (new Date(datestring) - new Date())/1000/3600/24;
	  return (timeLeft > 3);
  }; 
 
  //Converts dates to format required by input[date]
  $scope.convertDate = function(datestring){
	  var date = new Date(datestring);
	  return transform(date.getDate()) + "." + transform(date.getMonth()+1) + "." + date.getFullYear();
  };
  
  function transform(number){
		return number>9?""+number:"0"+number;
  };
  
  //Getting client data by client Id
  $scope.getClient = function(clientId){
	  var clientName = "";
	  $scope.clients.forEach(function(item, i){
		  if (item._id == clientId) clientName = item.surname + " " + item.name;
	  });
	  return clientName;
  }
  
  //Transitions to other forms  
  $scope.detail = function(index){
	  $location.path("/order-details/" + $scope.orders[index]._id);
  }
  
  $scope.edit = function(index){
	  $location.path("/edit-order/" + $scope.orders[index]._id);
  }
  
  //Data sorting and filtering
  $scope.sort = function(direction, attr){
	  if (attr) {
		 if (direction == "up") {
		   $scope.sortOption = attr;
		 }
		 if (direction == "down"){ 
		   $scope.sortOption = "-"+attr;
	     }	
	  }
    }  
   
   $scope.clearFilter = function(attr, insideAttr){
	   if (!insideAttr) {
	     if (!$scope.parameter[attr]) {
		       $scope.search[attr] = "";
	     }
	   } else {
		   if (!$scope.parameter[attr][insideAttr]) {
	          $scope.search[attr][insideAttr] = ""; 
		   }
	   }
   }
  
}]);