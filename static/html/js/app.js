$(document).foundation();

$(document).ready(function(){
	
	$("#divscrolls").idiotscroll();
	
	$(".header-search .button-search").click(function(){
		if ( $(".header-search").is('.active') ) {
			$(".header-search form").submit();
		} else {
			$(".header-search").addClass('active');
			$(".header-search input[type=text]").focus();
		}
		return false;
	});
	$(".header-search .button-search-hide").click(function(){
		$(".header-search").removeClass('active');
		$(".header-search input[type=text]").val('');
		return false;
	});
	
	if ( $(".orbit_cats").length > 0 ) {
		
		var slider = $('.orbit_cats'),
			slider_container = slider.parent(),
			nav_prev = slider_container.find('.orbit-prev'),
			nav_next = slider_container.find('.orbit-next');
		
		slider.on("ready.fndtn.orbit", function(event) {
			console.info("ready");
		});
		
		slider.on("after-slide-change.fndtn.orbit", function(event, orbit) {		
			if ( orbit.slide_number === 0 ) {
				nav_prev.hide();
			} else {
				nav_prev.show();
			}
			if ( orbit.slide_number === (orbit.total_slides - 1) ) {
				nav_next.hide();
			} else {
				nav_next.show();
			}
		});
		
	}
	
	console.log( $(document).height() );
	
});

$(window).scroll(function(){
	console.log( $(document).scrollTop() );
	if ( $(document).scrollTop() > 177 ) {
		$('.post-full .order-form').css('top', $(document).scrollTop() - 177);
	} else if ( $(document).scrollTop() > $(document).height() - 600 ) {
		$('.post-full .order-form').css('top', $(document).height() - 600 );
	} else {
		$('.post-full .order-form').css('top', 0);
	}
});