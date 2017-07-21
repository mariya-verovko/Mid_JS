app.config(["$routeProvider", function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: '/views/partials/start.html',
      controller: 'StartController'
    })
		
	.when('/orders-list', {
      templateUrl: '/views/partials/orderslist.html',
      controller: 'OrdersController'
    })
		
	.when('/new-order', {
      templateUrl: '/views/partials/order.html',
      controller: 'OrderController'
    })
	
	.when('/order-details/:id', {
      templateUrl: '/views/partials/orderdetails.html',
      controller: 'OrderDetailsController'
    })
	
	.when('/edit-order/:id', {
      templateUrl: '/views/partials/orderupdate.html',
      controller: 'OrderUpdateController'
    })
	
	.when('/edit-client/:id/:orderid', {
      templateUrl: '/views/partials/clientedit.html',
      controller: 'ClientUpdateController'
    })
		
    .otherwise({
       redirectTo: '/'
    });
}])


