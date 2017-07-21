app.factory("Order", ["$resource", function($resource) {
  return $resource('/order', {}, {
	get: {method : "GET", url : "/order/:id"},
	save: { method : "POST"},
	update: { method : "PUT", url : "/order/:id" }
  });
}]);