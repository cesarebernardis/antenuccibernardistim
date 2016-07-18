$(document).ready(function(){
	
	function setContentHeight(){
		$('#main-content').css('min-height', window.innerHeight - ($('.main-nav').height() + $('.footer').height()));
	}
	
	setContentHeight();
	$(window).resize(function(){
		setContentHeight();
	})
	
	$(".navbar-nav li a").click(function(event) {
		$(".navbar-collapse").collapse('hide');
	});
	
});

function getValueFromUrl(name){
	var args = window.location.search.replace("?", "").split("&");
	var val = "";
	for(var i=0; i<args.length; i++){
		var arg = args[i].split("=",2);
		if(arg.length < 2)
			continue;
		var vname = arg[0];
		if(vname == name){
			val = arg[1];
			break;
		}
	}
	return decodeURIComponent(val);
}
