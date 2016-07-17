var app = angular.module('myApp', []);
		app.controller('ctrl', function($scope, $http) {
			$http.post("http://antenuccibernardistim.altervista.org/tim/smartlifes/catdescription.php")
			.then(function (response) {$scope.record = response.data;});
		});