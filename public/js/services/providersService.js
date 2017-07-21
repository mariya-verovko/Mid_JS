app.factory("Providers", ["$resource", function($resource) {
  return $resource('/providers', {}, {});
}]);