/*
Copyright (c) 2017 
------------------------------------------------------------------


-------------------------------------------------------------------*/

(function ($) {
	"use strict";
	var Barber = {
		initialised: false,
		version: 1.0,
		mobile: false,
		init: function () {

			if(!this.initialised) {
				this.initialised = true;
			} else {
				return;
			}

			/*-------------- Barber Functions Calling ---------------------------------------------------
			------------------------------------------------------------------------------------------------*/
			this.RTL();
			this.Masonry();
			this.Search();
			this.Magnific_popup();
			this.TestimonialSlider();
			this.MainSlider();
			this.ContactFormSubmit();
			
		},
		
		/*-------------- Barber Functions definition ---------------------------------------------------
		---------------------------------------------------------------------------------------------------*/
		RTL: function () {
			// On Right-to-left(RTL) add class 
			var rtl_attr = $("html").attr('dir');
			if(rtl_attr){
				$('html').find('body').addClass("rtl");	
			}		
		},
		//mesonry content
		Masonry: function(){
			if($('#grid').length > 0){	
				new AnimOnScroll( document.getElementById( 'grid' ), {
					minDuration : 0.4,
					 maxDuration : 0.7,
					viewportFactor : 0.2
				} );
			}
		},
		//Search 
		Search:function(){
			$('.bb_search a i').on("click", function() {
				$('.bb_topsearch').slideToggle();
			});
		},
		TestimonialSlider: function(){
			if($('.bb_testimonial_slider .owl-carousel').length > 0){		
				$('.bb_testimonial_slider .owl-carousel').owlCarousel({
					margin:0,
					nav: false,
					dots: true,
					autoplay:true,
					smartSpeed:450,
					loop:true,
					items:1
				});
			}
		},
		MainSlider: function(){
			if($('.bb_slider_wrapper .owl-carousel').length > 0){	
			  var owl = $('.bb_slider_wrapper .owl-carousel');	
			  // Carousel initialization
			  owl.owlCarousel({
				  loop:true,
				  margin:0,
				  navSpeed:300,
				  nav:false,
				  autoplay: true,
				  items:1
			  });


			  // add animate.css class(es) to the elements to be animated
			  function setAnimation ( _elem, _InOut ) {
				// Store all animationend event name in a string.
				// cf animate.css documentation
				var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

				_elem.each ( function () {
				  var $elem = $(this);
				  var $animationType = 'animated ' + $elem.data( 'animation-' + _InOut );

				  $elem.addClass($animationType).one(animationEndEvent, function () {
					$elem.removeClass($animationType); // remove animate.css Class at the end of the animations
				  });
				});
			  }

			// Fired before current slide change
			  owl.on('change.owl.carousel', function(event) {
				  var $currentItem = $('.owl-item', owl).eq(event.item.index);
				  var $elemsToanim = $currentItem.find("[data-animation-out]");
				  setAnimation ($elemsToanim, 'out');
			  });

			// Fired after current slide has been changed
			  owl.on('changed.owl.carousel', function(event) {

				  var $currentItem = $('.owl-item', owl).eq(event.item.index);
				  var $elemsToanim = $currentItem.find("[data-animation-in]");
				  setAnimation ($elemsToanim, 'in');
			  })

			}
		},
		//Magnific Popuo
		Magnific_popup: function() {
            $('.bb_overlay_button .zoom_icon').magnificPopup({
				type: 'image',
				gallery: {
					enabled: true
				}
			}); 
			// //for video
            $('.popup-gmaps').magnificPopup({ 
			  disableOn: 700,
			  type: 'iframe',
			  mainClass: 'mfp-fade',
			  removalDelay: 160,
			  preloader: false,

			  fixedContentPos: false
			});
        }, 
		//contact form submition
		 ContactFormSubmit: function(){
			if($('#send_btn').length > 0){	
				$("#send_btn").on("click", function() {
					var e = $("#ur_name").val();
					var t = $("#ur_mail").val();
					var ph = $("#ur_phone").val();
					var s = $("#sub").val();
					var r = $("#msg").val();
					$.ajax({
						type: "POST",
						url: "ajaxmail.php",
						data: {
							username: e,
							useremail: t,
					userphone: ph,
							usersub: s,
							mesg: r
						},
						success: function(n) {
							var i = n.split("#");
							if (i[0] == "1") {
								$("#ur_name").val("");
								$("#ur_mail").val("");
								$("#ur_phone").val("");
								$("#sub").val("");
								$("#msg").val("");
								$("#err").html(i[1]);
							} else {
								$("#ur_name").val(e);
								$("#ur_mail").val(t);
								$("#ur_phone").val(ph);
								$("#sub").val(s);
								$("#msg").val(r);
								$("#err").html(i[1]);
							}
						}
					});
				});
			}
		 }
		
		
		   
	};

	Barber.init();

	// Load Event
	// Loader js
	$(window).on('load', function() {
		jQuery("#bb_preloader_box").fadeOut();
		jQuery("#bb_preloader_wrapper").delay(350).fadeOut("slow");
               //window height
		//var h = window.innerHeight;
		//$(".im_mainslider img").css("height", h);
		//$(".im_mainslider img").css("width", "100%");
		
		
		//portfolio
		var $container = $('.grid');			
        $('.grid').isotope({
		  percentPosition: true,
		  itemSelector: '.grid-item',
		  masonry: {
			columnWidth: '.grid-sizer'
		  },
		  percentPosition: true,
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false,
                isFitHeight: true,
            }
		});
        $('.bb_filter_option a').click(function() {
            $('.bb_filter_option .current').removeClass('current');
            $(this).addClass('current');

            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });
		
		//window height
		var hei= $(window).height() - 113;
		$(".bb_slider_wrapper").css("height", hei);
		$(".bb_slider_bgimg").css("height", hei);
	});

	// Scroll Event
	// fixed menu
	$(window).on('scroll', function () {
	     // if ($(this).scrollTop() > 300) {
                 // $(".ac_mainheader").addClass("ac_fixed");
            // } else {
                // $(".ac_mainheader").removeClass("ac_fixed");
	    // }
	});
	
	
// menu js

    var pluginName = 'ScrollIt',
        pluginVersion = '1.0.3';

    /*
     * OPTIONS
     */
    var defaults = {
        upKey: 38,
        downKey: 40,
        easing: 'linear',
        scrollTime: 600,
        activeClass: 'active',
        onPageChange: null,
        topOffset: 0
    };

    $.scrollIt = function(options) {

        /*
         * DECLARATIONS
         */
        var settings = $.extend(defaults, options),
            active = 0,
            lastIndex = $('[data-scroll-index]:last').attr('data-scroll-index');

        /*
         * METHODS
         */

        /**
         * navigate
         *
         * sets up navigation animation
         */
        var navigate = function(ndx) {
            if (ndx < 0 || ndx > lastIndex) return;

            var targetTop = $('[data-scroll-index=' + ndx + ']').offset().top + settings.topOffset + 1;
            $('html,body').animate({
                scrollTop: targetTop,
                easing: settings.easing
            }, settings.scrollTime);
        };

        /**
         * doScroll
         *
         * runs navigation() when criteria are met
         */
        var doScroll = function(e) {
            var target = $(e.target).closest("[href]").attr('href') ||
                $(e.target).closest("[data-scroll-goto]").attr('data-scroll-goto');
            navigate(parseInt(target));
        };

        /**
         * keyNavigation
         *
         * sets up keyboard navigation behavior
         */
        var keyNavigation = function(e) {
            var key = e.which;
            if ($('html,body').is(':animated') && (key == settings.upKey || key == settings.downKey)) {
                return false;
            }
            if (key == settings.upKey && active > 0) {
                navigate(parseInt(active) - 1);
                return false;
            } else if (key == settings.downKey && active < lastIndex) {
                navigate(parseInt(active) + 1);
                return false;
            }
            return true;
        };

        /**
         * updateActive
         *
         * sets the currently active item
         */
        var updateActive = function(ndx) {
            if (settings.onPageChange && ndx && (active != ndx)) settings.onPageChange(ndx);

            active = ndx;
            $('[href]').removeClass(settings.activeClass);
            $('[href=' + ndx + ']').addClass(settings.activeClass);
        };

        /**
         * watchActive
         *
         * watches currently active item and updates accordingly
         */
        var watchActive = function() {
            var winTop = $(window).scrollTop();

            var visible = $('[data-scroll-index]').filter(function(ndx, div) {
                return winTop >= $(div).offset().top + settings.topOffset &&
                    winTop < $(div).offset().top + (settings.topOffset) + $(div).outerHeight()
            });
            var newActive = visible.first().attr('data-scroll-index');
            updateActive(newActive);
        };

        /*
         * runs methods
         */
        $(window).on('scroll', watchActive).scroll();

        $(window).on('keydown', keyNavigation);

        $('.mv_menu').on('click', '[href], [data-scroll-goto]', function(e) {
            e.preventDefault();
            doScroll(e);
        });

    };
    $(window).ready(function(e) {
        $.each($('div.progress-bar'), function() {
            $(this).css('width', $(this).attr('aria-valuetransitiongoal') + '%');
        });
    });
}(jQuery));
// menu js