var id = getValueFromUrl("id");
		var app = angular.module('myApp', []);
		app.controller('ctrl', function($scope, $http) {
			$http.post(
				"http://antenuccibernardistim.altervista.org/tim/devices/devicecat/device/device.php",
				{"id":id}
			).then(function (response) {
				$scope.device = response.data;
			});
			$http.post(
				"http://antenuccibernardistim.altervista.org/tim/smartlifes/smartlifesrel/smartlife.php",
				{"id":id}
			).then(function (response) {
				$scope.record = response.data;
			});
			
			$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
				var minHeight = 0;
				$(".thumbnail").each(function(val){
					minHeight = Math.max($(this).height()+60, minHeight);
				});
				$(".thumbnail").css("min-height",minHeight);
			});
			
		}).directive('onFinishRender', function ($timeout) {
			return {
				restrict: 'A',
				link: function (scope, element, attr) {
					if (scope.$last === true) {
						$timeout(function () {
							scope.$emit(attr.onFinishRender);
						}, 50);
					}
				}
			}
		});
		