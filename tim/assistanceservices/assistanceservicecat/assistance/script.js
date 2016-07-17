	var id = getValueFromUrl("id");
	var hasDevices = false;
	var app = angular.module('myApp', []);
		app.controller('ctrl', function($scope, $http, $sce) {
			
			$scope.checkDevices = function() {
				return hasDevices;
			}
			
			$scope.checkFaq = function(){
				if($scope.services.info_support)
					return true;
				return false;
			}
			
			$http.post(
				"http://antenuccibernardistim.altervista.org/tim/assistanceservices/assistanceservicecat/assistance/assistance.php",
				{"id": id }
			).then(function (response) {
				$scope.services = response.data;
				$scope.services.description = $sce.trustAsHtml(response.data.description);
				$scope.services.info_support = $sce.trustAsHtml(response.data.info_support);
				$('title').text('TIM - Assistance Service - '+$scope.services.name);
				$http.post(
					"http://antenuccibernardistim.altervista.org/tim/assistanceservices/assistanceservicecat/assistance/assistance.php",
					{"catid":  $scope.services.category}
				).then(function (response) {
					$scope.category = response.data;
				});
			});
			
			
			$http.post(
				"http://antenuccibernardistim.altervista.org/tim/devices/devicesrel/devicecat.php",
				{"id":id, "type":"assistance", "request":"devices"}
			).then(function (response) {
				if(response.data.length > 0)
					hasDevices = true;
			});
			
		});