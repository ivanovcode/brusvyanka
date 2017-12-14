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
		
		$(".orbit_cats li").hover(
		function(){
			$(this).addClass('hover');
		},
		function(){
			$(this).removeClass('hover');
		});
		
	}
	
	$('.post-item_body div[id*=flash]').each(function(){
		
		var _flash_src = $(this).data('swf'),
		_flash_id = $(this).attr('id');
		
		$("#" + _flash_id)
			.flashembed({
				src: _flash_src, 
				width: "650px",
				height: "475px", 
				wmode:"opaque"
			});
	});
																
	$(document).foundation();
	
	var slider = $(".orbit_cats");
	slider.carouFredSel({
		circular: false,
		infinite: false,
		width: 1182,
		align: 'center',
		items: {
			visible: 8,
			start: 0,
		},
		scroll: {
			items: 'page',
			fx: "directscroll",
			easing: "linear",
			duration: 0,
		},
		auto: false,
		prev: "#prev",
		next: "#next",
		onCreate: function(data) {
			
			slider.trigger( 'configuration', ['scroll.duration', 500] );
			
			if ( $(window).width() < 1217 ) {
				
				slider.trigger( 'configuration', ['items.visible', 6] );
				slider.trigger( 'configuration', ['width', 880] );
				slider.trigger( 'configuration', ['scroll.items', 6] );
				
				if (!slider.find('li.current').length) {
					var index = 0;
				} else {
					var index = slider.find('li.current').index(),
						onPage = Math.ceil( (index+1) / 6 ),
						scrollTo = (onPage * 6)-6;
					
					if ( scrollTo > slider.find('li').length ) {
						slider.trigger('slideTo', index);
					} else {
						slider.trigger('slideTo', scrollTo );
					}	
				}
				
			} else {
				
				slider.trigger( 'configuration', ['items.visible', 8] );
				slider.trigger( 'configuration', ['width', 1182] );
				slider.trigger( 'configuration', ['scroll.items', 8] );
				
				if (!slider.find('li.current').length) {
					var index = 0;
				} else {
					var index = slider.find('li.current').index(),
						onPage = Math.ceil( (index+1) / 8 ),
						scrollTo = (onPage * 8)-8;
					
					if ( scrollTo > slider.find('li').length ) {
						slider.trigger('slideTo', index);
					} else {
						slider.trigger('slideTo', scrollTo );
					}	
				}
				
			}
		}
	});
	
	$('.ya-site-form__submit').addClass('.button');

	//$('.soda-grid_row .col1').css( 'minHeight', $('.soda-grid_row').height() );
});

$(window).resize(function(){
	var slider = $(".orbit_cats");
	
	if ( $(window).width() < 1217 ) {
		slider.trigger( 'configuration', ['items.visible', 6] );
		slider.trigger( 'configuration', ['width', 880] );
		slider.trigger( 'configuration', ['scroll.items', 6] );
	} else {
		slider.trigger( 'configuration', ['items.visible', 8] );
		slider.trigger( 'configuration', ['width', 1182] );
		slider.trigger( 'configuration', ['scroll.items', 8] );
	}
});

$(window).scroll(function(){
	if ( $(window).width() < 1217 ) {
/*
		if ( $(document).scrollTop() > 177 ) {
			$('.post-full .order-form').css('top', $(document).scrollTop() - 177);
		} else if ( $(document).scrollTop() > $(document).height() - 600 ) {
			$('.post-full .order-form').css('top', $(document).height() - 600 );
		} else {
			$('.post-full .order-form').css('top', 0);
		}
*/
	} else {
		if ( $(document).scrollTop() > 177 ) {
			$('.post-full .order-form').css('top', $(document).scrollTop() - 177);
		} else if ( $(document).scrollTop() > $(document).height() - 600 ) {
			$('.post-full .order-form').css('top', $(document).height() - 600 );
		} else {
			$('.post-full .order-form').css('top', 0);
		}
	}
});

if ( $('.projects-cont').length > 0 ) {
	if ( $(window).width() < 1217 ) {
		$(window).scroll(function(){
			if ( $(document).scrollTop() > $('.projects').height() + $('.projects-cont .col3').height() + 350 ) {
				$('.projects-cont .order-form').css('top', $(document).scrollTop() - 350 - $('.projects').height() - $('.projects-cont .col3').height() );
			} else if ( $(document).scrollTop() > $(document).height() - 600 ) {
				$('.projects-cont .order-form').css('top', $(document).height() - 600 );
			} else {
				$('.projects-cont .order-form').css('top', 0);
			}
		});
	} else {
		$(window).scroll(function(){
			if ( $(document).scrollTop() > $('.projects').height() + 350 ) {
				$('.projects-cont .order-form').css('top', $(document).scrollTop() - 350 - $('.projects').height() );
			} else if ( $(document).scrollTop() > $(document).height() - 600 ) {
				$('.projects-cont .order-form').css('top', $(document).height() - 600 );
			} else {
				$('.projects-cont .order-form').css('top', 0);
			}
		});
	}
}

if ( $('.order-form.order-form-dubl').length > 0 ) {
	$(window).scroll(function(){
		console.log( 156 + 14 + 209 + 383 + $('#interesting-posts').height() );
		if ( $(document).scrollTop() > 156 + 14 + 209 + 383 + $('#interesting-posts').height() ) {
			$('.order-form.order-form-dubl').css('top', $(document).scrollTop() - ( 156 + 14 + 209 + 383 + $('#interesting-posts').height() ) );
		} else if ( $(document).scrollTop() > $(document).height() - 600 ) {
			$('.order-form.order-form-dubl').css('top', $(document).height() - 600 );
		} else {
			$('.order-form.order-form-dubl').css('top', 0);
		}
	});
}

$(window).load(function(){
	$('.content-inner .soda-grid_row .col1').height( $('.content-inner .soda-grid_row').height() );
});