app.factory("Client", ["$resource", function($resource) {
  return $resource('/client', {}, {
	get: {method : "GET", url : "/client/:id"},
	show: {method : "GET", params : {email: '@email'} },
	save: { method : "POST"},
	update: { method : "PUT", url : "/client/:id" }
  });
}]);