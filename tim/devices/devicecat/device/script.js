var device = getValueFromUrl("id");
var hasAssistances = false;
var hasSmartlifes = false;

	var app = angular.module('myApp', []);
		app.controller('ctrl', function($scope, $http, $sce) {
			
			$scope.checkSmartlifes = function() {
				return hasSmartlifes;
			}
			
			$scope.checkAssistances = function() {
				return hasAssistances;
			}
			
			$scope.checkDiscount = function(x){
				if(x.original_price != x.price)
					return true;
				return false;
			}
			
			$scope.checkInstallments = function(x){
				var inst = parseInt(x.installment);
				if(inst > 0)
					return true;
				return false;
			}
			
			$scope.calculateInstallment = function(x){
				if(x.installment == 0)
					return x.price;
				return x.price / x.installment;
			}
			
			$http.post(
				"http://antenuccibernardistim.altervista.org/tim/devices/devicecat/device/device.php",
				{"id":device}
			).then(function (response) {
				$scope.device = response.data;
				$scope.device.description = $sce.trustAsHtml(response.data.description);
				$scope.device.generalinfo = $sce.trustAsHtml(response.data.generalinfo);
				$scope.device.tech_spec = $sce.trustAsHtml(response.data.tech_spec);
				$('title').text('TIM - Device - '+$scope.device.name);
			});
			
			$http.post(
				"http://antenuccibernardistim.altervista.org/tim/assistanceservices/assistancesrel/assistance.php",
				{"id":device}
			).then(function (response) {
				if(response.data.length > 0)
					hasAssistances = true;
			});
			
			$http.post(
				"http://antenuccibernardistim.altervista.org/tim/smartlifes/smartlifesrel/smartlife.php",
				{"id":device}
			).then(function (response) {
				if(response.data.length > 0)
					hasSmartlifes = true;
			});
			
		});