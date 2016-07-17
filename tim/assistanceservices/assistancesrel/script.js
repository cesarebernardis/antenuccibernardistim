
		var id = getValueFromUrl("id");
		var app = angular.module('myApp', []);
		app.controller('ctrl', function($scope, $http) {
			
			$http.post("http://antenuccibernardistim.altervista.org/tim/assistanceservices/assistancesrel/assistance.php", {"id":id})
			.then(function (response) {
				$scope.record = response.data;
			});
		});