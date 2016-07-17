var category = getValueFromUrl("category");
	var app = angular.module('myApp', []);
		app.controller('ctrl', function($scope, $http, $sce) {
			$http.post(
				"http://antenuccibernardistim.altervista.org/tim/assistanceservices/assistanceservicecat/assistance.php",
				{"category":category, "sub":"1"}
			).then(function (response) {
				$scope.sub1 = response.data;
			});
			$http.post(
				"http://antenuccibernardistim.altervista.org/tim/assistanceservices/assistanceservicecat/assistance.php",
				{"category":category, "sub":"2"}
			).then(function (response) {
				$scope.sub2 = response.data;
			});
			$http.post(
				"http://antenuccibernardistim.altervista.org/tim/assistanceservices/assistanceservicecat/assistance.php",
				{"category":category, "sub":"3"}
			).then(function (response) {
				$scope.sub3 = response.data;
			});
			$http.post(
				"http://antenuccibernardistim.altervista.org/tim/assistanceservices/assistanceservicecat/assistance.php",
				{"category":category, "sub":"4"}
			).then(function (response) {
				$scope.sub4 = response.data;
			});
			
		});
	
	$(document).ready(function(){
		$('title').text('TIM - Assistance Services - '+category);
		$('#main-title').text(category);
		$('#breadcactive').text(category);
		$('.panel').on('shown.bs.collapse', function () {
		   $(this).find(".panel-heading .fa").removeClass("fa-angle-down").addClass("fa-angle-up");
		});

		$('.panel').on('hidden.bs.collapse', function () {
		   $(this).find(".panel-heading .fa").removeClass("fa-angle-up").addClass("fa-angle-down");
		});
	});