(function () {
		var fromType = getValueFromUrl("type");
		var objId = getValueFromUrl("id");
		var obj;
		var devicesObj;
		var minPrice, maxPrice;
		minPrice = maxPrice = null;
		
		function cpl(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}
		
		var app = angular.module('myApp', []);
		app.controller('ProductList', function($scope, $http) {
			
			$scope.capitalizeFirstLetter = cpl;
			
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
			
			$scope.updateDevices = function(){
				var obj = {type:fromType, id:objId, request:"devices", ftype:"", fprice:"", fbrand:""};
				
				var str = "";
				$("#filters input:checked[name=type]").each(function(){
					str += $(this).val() + ' OR ';
				});
				if(str){
					obj.ftype = ' AND ('+str.substring(0, str.length-4)+')';
				}
				
				str = "";
				$("#filters input:checked[name=price]").each(function(){
					str += $(this).val() + ' OR ';
				});
				if(str){
					obj.fprice = ' AND ('+str.substring(0, str.length-4)+')';
				}
				
				str = "";
				$("#filters input:checked[name=brand]").each(function(){
					str += $(this).val() + ' OR ';
				});
				if(str){
					obj.fbrand = ' AND ('+str.substring(0, str.length-4)+')';
				}
				
				$http.post(
					"http://antenuccibernardistim.altervista.org/tim/devices/devicesrel/devicecat.php",
					obj
				).then(function (response) {
					$scope.devices = response.data;
				});
			};
			
			$('#filters input').change($scope.updateDevices);
			
			$http.post(
				"http://antenuccibernardistim.altervista.org/tim/devices/devicesrel/devicecat.php",
				{type:fromType, id:objId, "request":"devices"}
			).then(function (response) {
				$scope.devices = response.data;
				angular.forEach($scope.devices,function(val){
						val.maintype = fromType;
						val.price = parseFloat(val.price);
						if(!minPrice) minPrice = val.price;
						if(!maxPrice) maxPrice = val.price;
						first = false;
						if(minPrice > val.price) minPrice = val.price;
						if(maxPrice < val.price) maxPrice = val.price;
					});
				maxPrice = maxPrice + 40 - (maxPrice%40);
				var step = Math.floor(maxPrice / 4);
				$scope.priceSteps = [
					{text: '< '+step, value: 'price<'+step},
					{text: step+' - '+step*2, value: 'price>='+step+' AND price <'+step*2},
					{text: step*2+' - '+step*3, value: 'price>='+step*2+' AND price <'+step*3},
					{text: '> '+step*3, value: 'price>'+step*3},
				];
			});
			
			$http.post(
				"http://antenuccibernardistim.altervista.org/tim/devices/devicesrel/devicecat.php",
				{type:fromType, id:objId,"request":"types"}
			).then(function (response) {
				$scope.types = response.data;
			});
			
			$http.post(
				"http://antenuccibernardistim.altervista.org/tim/devices/devicesrel/devicecat.php",
				{type:fromType, id:objId,"request":"brands"}
			).then(function (response) {
				$scope.brands = response.data;
			});
			
		});
		
		$(document).ready(function(){
			
			$('title').text('TIM - Devices for '+cpl(fromType)+' Service');
			
			$.post(
				'http://antenuccibernardistim.altervista.org/tim/devices/devicesrel/devicecat.php',
				{type:fromType, id:objId, request:fromType}
			).success(function(data){
				obj = JSON.parse(data);
				$('#main-title>h1').html('Devices for '+cpl(fromType));
				var adapter = fromType;
				if(fromType == 'assistance'){
					adapter += "service";
				}
				$('#main-title>a').attr("href", '../../'+adapter+'s/'+adapter+'cat/'+fromType+'/index.html?id='+obj.id);
				$('#main-title>a>h3').html(obj.name);
			});
			
			$('#filtercollapse').on('shown.bs.collapse', function () {
			   $("#filters .fa").removeClass("fa-angle-down").addClass("fa-angle-up");
			});

			$('#filtercollapse').on('hidden.bs.collapse', function () {
			   $("#filters .fa").removeClass("fa-angle-up").addClass("fa-angle-down");
			});
			
		});
		
	})();