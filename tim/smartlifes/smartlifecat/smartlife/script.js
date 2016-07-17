
	$(document).ready(function(){
		$(".max-sized div:first-child .sl-icon").each(function(){
			if(! /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				$(this).css('padding-top', ($('.max-sized div:first-child').height() - $(this).height())/2);
			}
		});
	});
	var catid;
	var smartlife = getValueFromUrl("id");
	var hasDevices = false;
	var app = angular.module('myApp', []);
		app.controller('ctrl', function($scope, $http, $sce) {
			
			$scope.checkDevices = function() {
				return hasDevices;
			}
			
			$scope.checkDiscount = function(x){
				if(x == null)
					return false;
				if(x.original_price != x.price)
					return true;
				return false;
			}
			
			$scope.checkInstallments = function(x){
				if(x == null)
					return false;
				if(parseInt(x.monthly) > 0)
					return true;
				return false;
			}
			
			$scope.calculateInstallment = function(x){
				if(x == null)
					return 0;
				if(x.installment == 0)
					return x.price;
				return x.price / x.installment;
			}
			
			$scope.checkPrice = function(x){
				if(x == null)
					return false;
				if(x.price != null)
					return true;
				return false;
			}
			
			$http.post(
				"http://antenuccibernardistim.altervista.org/tim/smartlifes/smartlifecat/smartlife/sl.php",
				{"id":smartlife}
			).then(function (response) {
				$scope.smartlife = response.data;
				$scope.smartlife.description = $sce.trustAsHtml(response.data.description);
				$scope.smartlife.benefits = $sce.trustAsHtml(response.data.benefits);
				$scope.smartlife.info_support = $sce.trustAsHtml(response.data.info_support);
				$('title').text('TIM - Smartlifes - '+$scope.smartlife.name);
				
				$http.post(
					"http://antenuccibernardistim.altervista.org/tim/smartlifes/smartlifecat/slcat.php",
					{"categoryid":$scope.smartlife.category, "request":"smartlife_category_byid"}
				).then(function (response) {
					$scope.category = response.data;
				});
			});
			
			
			
			$http.post(
				"http://antenuccibernardistim.altervista.org/tim/devices/devicesrel/devicecat.php",
				{"id":smartlife, "type":"smartlife", "request":"devices"}
			).then(function (response) {
				if(response.data.length > 0)
					hasDevices = true;
			});
			
		});