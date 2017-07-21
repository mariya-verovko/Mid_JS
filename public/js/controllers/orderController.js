app.controller("OrderController",["$scope", "$compile", "$location", "Order", "Client", "Providers", function($scope, $compile, $location, Order, Client, Providers){
  $scope.order = {"_id":undefined, "orderId":"", "clientId":0, "positions": [], "orderType":"", "createDate":"", "provider":"","closedDate":"", "status":"New", "comment":""};
  var newClient = {"name":"", "surname":"", "email":"", "phone":""};
  $scope.client = {"name":"", "surname":"", "email":"", "phone":""};
  $scope.clientExists = false;
  $scope.clientNotObtained = false; 
  
  $scope.providers = [];
  
  $scope.providers = Providers.query(function(){
	  console.log($scope.providers);
  });
  
  $scope.orderTypes = [
    {type: "Опт"},
	{type: "Розница"}
  ];
  
  $scope.regex = {
	  email : "^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$",
	  name : "[A-Za-zА-Яа-яЁ]+", 
	  surname : "[A-Za-zА-Яа-яЁ]+",
	  phone : "38\\d{10}",
	  position : "[A-Za-zА-Яа-яЁ\\s]+",
	  comment : "[\\wА-Яа-яЁ\\s]+"
  }
  
//Generate dates for order and formats them
  var now = new Date();
  $scope.currentDate = generateFormatedDate(now); 
  
  var lastDate = new Date();
  lastDate.setDate(now.getDate()+30);
  $scope.canceledDate = generateFormatedDate(lastDate);
    
  
  function generateFormatedDate(date){
	  var month = (date.getMonth()+1)>9?""+(date.getMonth()+1):"0"+(date.getMonth()+1);
	  var days = date.getDate()>9 ? ""+date.getDate() : "0"+date.getDate();
	  return (date.getFullYear() + "-" + month + "-" + days);
  };
  
 //Generate id using order type, date and orders number 
 $scope.partId = 0;
  Order.get({id: 0}, function(response){
	  $scope.partId  = generateFormatedDate(now).slice(2).split("-").join("") + response.id;
  });
  
    
  $scope.generateId = function(orderType){
	  if (orderType) {
	    $scope.order.orderId = (orderType=="Опт")?"o-"+$scope.partId:"r-"+$scope.partId ;
	  }
  }
  
 //Getting existing client by email
  $scope.getExistingClient = function(){
	  $scope.clientNotObtained = false;
      if ($scope.client.email != "") {	  
	      if ($scope.clientExists) { 
	         Client.show({email:$scope.client.email}, function(response){
		     if (response._id != null) {			
		        for (key in $scope.client) {
			       $scope.client[key] = response[key]; 
		         }
			    $scope.client._id = response._id;
		     } else {
			    $scope.clientNotObtained = true; 
		     } 
	       });
	      } else {
		     var email = $scope.client.email;
		     $scope.client = angular.copy(newClient);
		     $scope.client.email = email;
	      }
	  }
  }
  
  //Check data of created client according to database
  var checkAccordance = function(obtainedClient){
	  if ((obtainedClient.email == $scope.client.email) && (obtainedClient.name == $scope.client.name) && (obtainedClient.surname == $scope.client.surname) && (obtainedClient.phone == $scope.client.phone))
		  return true;
	  return false;
  }
 
//Creating new order with different client options 
  $scope.saveOrder = function(){
	 if ($scope.newOrderForm.$valid){
		 $scope.order.createDate = new Date();
	     if ($scope.client._id) {
			Client.get({id: $scope.client._id}, function(response){
			 if (checkAccordance(response)) {
			         $scope.client._id = response._id; 
		             $scope.order.clientId = $scope.client._id;
	   	             Order.save($scope.order, function(){
			            $location.path("/orders-list");	
                     });
				 }	else {
					 alert("Создайте новую запись! Редактирование текущей запрещено!");
					 $scope.client = angular.copy(newClient);
					 return;
				 }			
			});	   
	     } else {			 
		    Client.show({email:$scope.client.email}, function(response){
		     if(response._id != null) {
				 if (checkAccordance(response)) {
			         $scope.client._id = response._id; 
		             $scope.order.clientId = $scope.client._id;
	   	             Order.save($scope.order, function(){
			            $location.path("/orders-list");	
                     });
				 }	else {
					 alert("Данный email уже используеться для другого клиента!");
					 $scope.client = angular.copy(newClient);
					 return;
				 }			
			  } else {
	           Client.save($scope.client, function(response){
		         $scope.client._id = response._id; 
		         $scope.order.clientId = $scope.client._id;
	   	         Order.save($scope.order, function(){
			       $location.path("/orders-list");	
                 }); 	
	          }); 
		     }
		   });	   
		   
		}	   
	 }	 
  };
  
  //Generatin of new input for position
  var counter = 1;
  $scope.addPosition = function(){
	var index = counter>$scope.order.positions.length?counter:$scope.order.positions.length;
    var input = angular.element('</br><label></label>  <input name="position" type="text" class="additionInput" ng-model="order.positions[' + index + ']" ng-pattern="regex.position" ng-minlength="4" ng-maxlength="15">');
 	var parentElement = angular.element(document.querySelector('#positionDiv'));
    parentElement.append($compile(input)($scope));
	counter++;
  } 

  
  $scope.close = function(){
		$location.path("/orders-list");
  }

}]);