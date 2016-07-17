var app = angular.module('myApp', []);
		app.controller('ctrl', function($scope, $http) {
			
			function searchCat(categories, name){
				for(i=0; i<categories.length; i++)
					if(categories[i].name == name)
						return i;
				return -1;
			}
			
			$http.post("http://antenuccibernardistim.altervista.org/tim/devices/catdescription.php")
			.then(function (response) {
				$scope.record = response.data;
				var outletIndex = searchCat($scope.record,"Outlet");
				$scope.outlet = $scope.record[outletIndex];
				$scope.record.splice(outletIndex, 1);
			});
		});