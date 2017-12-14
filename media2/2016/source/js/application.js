(function($, root, undefined) {
    $(function() {
        'use strict';
        
        if(typeof $.fancybox == 'function') {
          jQuery.extend(jQuery.fancybox.defaults, {
            margin: [80, 20, 20, 20]
          });
        } else {
           
        }
        
/*
        $(".fancybox").fancybox({
          margin: 50
        });
*/
        
        $(document).foundation();
        
        jQuery('input[type="tel"]').mask('+7 (999) 999 99 99');
        
        $("#divscrolls").idiotscroll({
            width_element: 706
        });
        $('.post-item_body div[id*=flash]').each(function() {
            var _flash_src = $(this).data('swf'),
                _flash_id = $(this).attr('id');
            $("#" + _flash_id).flashembed({
                src: _flash_src,
                width: "650px",
                height: "475px",
                wmode: "opaque"
            });
        });
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
                slider.trigger('configuration', ['scroll.duration', 500]);
                if ($(window).width() < 1217) {
                    slider.trigger('configuration', ['items.visible', 6]);
                    slider.trigger('configuration', ['width', 880]);
                    slider.trigger('configuration', ['scroll.items', 6]);
                    if (!slider.find('li.current').length) {
                        var index = 0;
                    } else {
                        var index = slider.find('li.current').index(),
                            onPage = Math.ceil((index + 1) / 6),
                            scrollTo = (onPage * 6) - 6;
                        if (scrollTo > slider.find('li').length) {
                            slider.trigger('slideTo', index);
                        } else {
                            slider.trigger('slideTo', scrollTo);
                        }
                    }
                } else {
                    slider.trigger('configuration', ['items.visible', 8]);
                    slider.trigger('configuration', ['width', 1182]);
                    slider.trigger('configuration', ['scroll.items', 8]);
                    if (!slider.find('li.current').length) {
                        var index = 0;
                    } else {
                        var index = slider.find('li.current').index(),
                            onPage = Math.ceil((index + 1) / 8),
                            scrollTo = (onPage * 8) - 8;
                        if (scrollTo > slider.find('li').length) {
                            slider.trigger('slideTo', index);
                        } else {
                            slider.trigger('slideTo', scrollTo);
                        }
                    }
                }
            }
        });
        $(window).resize(function() {
            var slider = $(".orbit_cats");
            if ($(window).width() < 1217) {
                slider.trigger('configuration', ['items.visible', 6]);
                slider.trigger('configuration', ['width', 880]);
                slider.trigger('configuration', ['scroll.items', 6]);
            } else {
                slider.trigger('configuration', ['items.visible', 8]);
                slider.trigger('configuration', ['width', 1182]);
                slider.trigger('configuration', ['scroll.items', 8]);
            }
        });
        
/*
        $(window).scroll(function() {
            var ds = $(document).scrollTop();
            var dh = $(document).height(),
                ph = $('.projects').height(),
                oh = $('.order-form').height();
            var orbh = $('.orbit_cats_wrap').height();
            var fh = $('.block--feedback').height();
            var foh = $('.footer').height();
            var OF = $('.post-full .order-form');
            var OFH = OF.height();
            var headerHeight = 1420;
            if ($(window).width() < 1024) {} else {
                if ((ds > 184 + 70 + 70) && (ds < dh - headerHeight)) {
                    OF.css('top', $(document).scrollTop() - 184 + 70 + 70 - 281);
                    $('.post-item_posts-navigation').show();
                } else if (ds > dh - headerHeight) {
                    OF.css('top', last);
                    $('.post-item_posts-navigation').hide();
                } else {
                    OF.css('top', 0);
                    $('.post-item_posts-navigation').show();
                }
                var last = OF.css('top');
            }
        });
*/

        if ($('.post-full').length > 0) {
            var projects_cont = $('.post-full')
            var projects_cont_offset = projects_cont.offset();
            var projects_cont_top = projects_cont_offset.top;
            var order_form = projects_cont.find('.order-form');
            var document_height = $(document).height();
            if ($(window).width() > 1217) {

                $(window).scroll(function() {
                    var document_scroll_top = $(document).scrollTop();
                    if (document_scroll_top > projects_cont_top - 50 && (document_scroll_top < projects_cont_top + projects_cont.height() - order_form.height() - 100)) {
                        order_form.css('top', document_scroll_top - projects_cont_top + 50);
                    } else if (document_scroll_top >= projects_cont_top + projects_cont.height() - order_form.height() - 100 ) {
                        order_form.css('top', last);
                    } else {
                        order_form.css('top', 0);
                    }
                    var last = order_form.css('top');
                });
            }
        }
        
        if ($('.projects-cont').length > 0) {
            var projects_cont = $('.projects-cont')
            var projects_cont_offset = projects_cont.offset();
            var projects_cont_top = projects_cont_offset.top;
            var order_form = projects_cont.find('.order-form');
            var document_height = $(document).height();
            if ($(window).width() > 1217) {

                $(window).scroll(function() {
                    var document_scroll_top = $(document).scrollTop();
                    if (document_scroll_top > projects_cont_top - 100 && (document_scroll_top < projects_cont_top + projects_cont.height() - order_form.height() - 100)) {
                        order_form.css('top', document_scroll_top - projects_cont_top + 100);
                    } else if (document_scroll_top >= projects_cont_top + projects_cont.height() - order_form.height() - 100 ) {
                        order_form.css('top', last);
                    } else {
                        order_form.css('top', 0);
                    }
                    var last = order_form.css('top');
                });
            }
        }
        
/*
        if ($('.order-form.order-form-dubl').length > 0) {
            $(window).scroll(function() {
                //console.log( 156 + 14 + 209 + 383 + $('#interesting-posts').height() );
                if ($(document).scrollTop() > 156 + 14 + 209 + 383 + $('#interesting-posts').height()) {
                    $('.order-form.order-form-dubl').css('top', $(document).scrollTop() - (156 + 14 + 209 + 383 + $('#interesting-posts').height()));
                } else if ($(document).scrollTop() > $(document).height() - 600) {
                    $('.order-form.order-form-dubl').css('top', $(document).height() - 600);
                } else {
                    $('.order-form.order-form-dubl').css('top', 0);
                }
            });
        }
*/
        
        var w = $(window).width();
        $('.search .close').click(function() {
            $('.search form').removeClass('active');
        });
        
        $(document).on('click', '.search form', function(event) {
          $(this).addClass('active');
          $('.search input[type="text"]').focus();
        });
        
        $('.search form input[type=submit]').click(function() {
          if ( $('.search form').is(':not(.active)') || $('.search input[type="text"]').val() == '' ) {
            return false;
          }
        });
        
        $(window).scroll(function() {
            if ($(document).scrollTop() > 120) {
                $('body').addClass('fixed-menu');
            } else {
                $('body').removeClass('fixed-menu');
            }
        });
        $('.js__call-order').click(function() {
            $('body').addClass('opened-modal');
            $('#call-order').fadeIn();
            return false;
        });
        
        $('.js__project-order').click(function() {
          $('body').addClass('opened-modal');
          $('#project-order').fadeIn();
          return false;
        });
        
        $('.modal_close').click(function() {
            $('body').removeClass('opened-modal');
            $(this).parents('.modal').fadeOut();
            return false;
        });
        $('.block--port .item a').hover(

        function() {
            $(this).parent().addClass('hovered');
        }, function() {
            $(this).parent().removeClass('hovered');
        });
        $(window).load(function() {
            var s = skrollr.init({
                forceHeight: false,
                smoothScrolling: false,
                mobileCheck: function() {
                    //hack - forces mobile version to be off
                    return false;
                }
            });
            $('.block--parralax').each(function() {
                s.refresh($(this));
            });
/*
     $('div').each(function(){
       var _this = $(this);
       if ( _this.width() > 320 ) {
         //console.log( _this );
       }
     });
*/
        });
        var md = new MobileDetect(window.navigator.userAgent);
        $(window).load(function() {
          //console.log( md.mobile() );
          //console.log( md.phone() );
          //console.log( md.tablet() );
            if ( md.phone() == null ) {
              var _col = $('.soda-grid_row .col1');
              _col.height( $('.soda-grid_row').height() );
            } 
        });
    });
})(jQuery, this);