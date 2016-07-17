$(document).ready(function(){
		
		$(".row div:last-child").each(function(){
			if(! /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				$(this).css('padding-top', ($('.row').height() - $(this).height())/2);
			}
		});
		
		var slideIndex = 0;
		for (i = 0, slides = document.getElementsByClassName("mySlides"); i < slides.length; i++){
			if(i != slideIndex)
				slides[i].style.display = "none";
		}
		
		function plusSlides(n) {
		  showSlides(slideIndex += n);
		}

		function currentSlide(n) {
		  showSlides(slideIndex = n);
		}
		
		function showSlides(n) {
		  var slides = document.getElementsByClassName("mySlides");
		  slideIndex = (slideIndex + slides.length) % slides.length;
		  $('.mySlides').each(function(index){
			if(index == slideIndex)
				$(this).fadeIn(500);
			else
				$(this).fadeOut(500);
		  });
		}
		
		$(".prev").click(function(){
			plusSlides(-1);
		});
		
		$(".next").click(function(){
			plusSlides(1);
		});
		
		
		
		var slideAutomation = setInterval(function(){plusSlides(1);}, 5000);
	});