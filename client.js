document.addEventListener('DOMContentLoaded', function() {

    var dataDirectory = "./data"

    /**
     * ==================================================
     *                   #INFORMATIONS
     * ==================================================
     */
    var description_file = "description.json";
    fetch(dataDirectory+"/"+description_file)
    .then(res => res.json())
    .then(data => {
        description_id = document.getElementById("description");
        description_id.innerHTML = data.description;
    })
    .catch(err => console.log(err));

    /**
     * ------------------- FACEBOOK ----------------------
     */
    
    // Facebook Customer Chat (Bulle de discussion en bas de page)
    window.fbAsyncInit = function() {
        FB.init({
          appId            : '1658021547630800',
          autoLogAppEvents : true,
          xfbml            : true,
          version          : 'v2.6'
        });

        var temp = "357781158359111";
        const FB_token = "EAAXj9jlgYNABAK1kkx9CaQVGrxKcj1YrQxYmz9qYQGN4pBztk3TvZCc8w51m2Y41XSZBb4laJB8nDdOxmNdmSgVH00nF2F0zdeFnj4mUjphFOPAa5qz41PwvkiggBoowBZBr6FpPWhLNvZBCxp2fwboIWpW5RraZCRlydeunfWafn1iCzGePS";
        var slider_formatedContent = "";
        var rating_formatedContent = "";
        var reviewText_counter = 0;
        FB.api('/me/ratings', 'GET', {"access_token":""+FB_token+"","fields":"review_text,reviewer{name,picture.type(large)}"}, function(response) {
                if (response && !response.error) {
                        for (const key in response) {
                            if (response.hasOwnProperty(key)) {
                                const row = response[key];
                                console.log(row);
                                for (const key in row) {
                                    if (row.hasOwnProperty(key)) {
                                        currentItem = row[key];
                                        if (currentItem.hasOwnProperty("review_text")){
                                            reviewText_counter++;
                                            rating_formatedContent += `
                                                <div class="carousel-item ${(key+1 == 1)? "active" : ""}">
                                                    <div class="row">
                                                        <div class="col">
                                                            <div class="card">
                                                                <div class="row ">
                                                                    <div class="col-md-4">
                                                                        <img src="${currentItem.reviewer.picture.data.url}" class="w-100">
                                                                    </div>
                                                                    <div class="col-md-8 align-self-center">
                                                                        <div class="card-body">
                                                                            <h4 class="card-title">${currentItem.reviewer.name}</h4>
                                                                            <hr>
                                                                            <p>${currentItem.review_text}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            `;
                                        }
                                    }
                                }
                            }
                        }

                    slider_formatedContent += `<div id="slider_17" class="carousel slide columns_move_1 swipe_x ps_slowSpeedy" data-ride="carousel" data-pause="hover" data-interval="5000" data-duration="1000" data-column="${reviewText_counter}" data-m1200="${reviewText_counter}" data-m992="3" data-m768="2" data-m576="1">`;
                    slider_formatedContent += `<div class="carousel-inner" role="listbox">`;
                    slider_formatedContent += rating_formatedContent;
                    slider_formatedContent += `</div>`;
                    slider_formatedContent += `<a class="carousel-control-prev ps_control_left ps_top_left_x" href="#slider_17" data-slide="prev">
                    <i class="fas fa-angle-left"></i></a>`;
                    slider_formatedContent += `<a class="carousel-control-next ps_control_right ps_top_left_x" href="#slider_17" data-slide="next">
                    <i class="fas fa-angle-right"></i></a>`;
                    slider_formatedContent += `</div>`;

                    var rating_id = document.getElementById("ratings");
                    rating_id.innerHTML = slider_formatedContent;
                }else{
                    console.log(response.error);
                }
            }
        );
    };

    (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/fr_FR/sdk/xfbml.customerchat.js";
    fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));



    /**
     * ==================================================
     *                   #MENU
     * ==================================================
     */

    // Affichage des produits
    var products_file = "products.json";
    var menu_formatedContent = "";
    fetch(dataDirectory+"/"+products_file)
    .then(res => res.json())
    .then(data => {
        for (const key in data) {
            menu_formatedContent += `<h2>${data[key].name}</h2>`;
            menu_formatedContent += `<div class="row">`;
                products = data[key].products;
                for(const key in products){
                    menu_formatedContent += `
                        <div class="col-md-3 col-sm-4 col-6">
                            <div class="card shadow-sm">
                                <img src="${products[key].imgUrl}" class="image-menu img-fluid" alt="Fanta en canette">
                                <div class="card-body">
                                    <h4 class="card-title">${products[key].name}</h4>
                                <hr>
                                <span class="badge badge-dark">${products[key].price} €</span>
                                </div>
                            </div>
                        </div>
                        `;
                }
            menu_formatedContent += `</div>`;
        }
        var menu_id = document.getElementById("products");
        menu_id.innerHTML = menu_formatedContent;
    })
    .catch(err => console.log(err));



    /**
     * ==================================================
     *               #LOCATION (Emplacements)
     * ==================================================
     */

    var mymap = "map";
    var token = "pk.eyJ1IjoicmRzYXZldXJzIiwiYSI6ImNqcXRvZXMzejAzYTQ0NG1xNmJzazB0Y3EifQ.XPvunr4OtPogVK9L2Ln2jA";
    var zoomLevel = 13;
    var latitude = -20.895279;
    var longitude = 55.4961283;

    var mymap = L.map('map').setView([latitude, longitude], zoomLevel);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token='+token+'', {
        maxZoom: 18,
        id: 'mapbox.streets'
    }).addTo(mymap);

    var mapMarkerDirectory = "./assets/js/leaflet/images/"
    var regularIcon = L.icon({
        iconUrl: mapMarkerDirectory+'rds-marker-icon.png',
        shadowUrl: mapMarkerDirectory+'rds-marker-shadow.png',
    
        iconSize:     [25, 41], // size of the icon
        shadowSize:   [45, 41], // size of the shadow
        iconAnchor:   [12.5, 41], // point of the icon which will correspond to marker's location
        shadowAnchor: [12, 41],  // the same for the shadow
        popupAnchor:  [0, -41] // point from which the popup should open relative to the iconAnchor
    });
    var activeIcon = L.icon({
        iconUrl: mapMarkerDirectory+'rds-active-marker-icon.png',
        shadowUrl: mapMarkerDirectory+'rds-marker-shadow.png',
    
        iconSize:     [25, 41], // size of the icon
        shadowSize:   [45, 41], // size of the shadow
        iconAnchor:   [12.5, 41], // point of the icon which will correspond to marker's location
        shadowAnchor: [12, 41],  // the same for the shadow
        popupAnchor:  [0, -41] // point from which the popup should open relative to the iconAnchor
    });

        // Affichage des emplacements
        var locations_file = "locations.json";
        var weekDays = new Array( "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche" );
        var date = new Date();
        var today = weekDays[date.getDay() - 1];
        today = "Mardi";
        fetch(dataDirectory+"/"+locations_file)
        .then(res => res.json())
        .then(data => {
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const element = data[key];
                    console.log(today+" "+element.day);
                    if(today == element.day){
                        L.marker([element.latitude, element.longitude], {icon: activeIcon}).addTo(mymap)
                        .bindPopup(`<b>${element.day}</b><br/>${element.description}`).openPopup();
                    }else{
                        L.marker([element.latitude, element.longitude], {icon: regularIcon}).addTo(mymap)
                        .bindPopup(`<b>${element.day}</b><br/>${element.description}`);
                    }
                }
            }
        })
        .catch(err => console.log(err));

    var popup = L.popup();
    
})

function bs4carousels(){

	/*-----------------------------------------------------------------*/
    /* On Class Change Triggering Sliding Effects For Columns Layouts
    /*-----------------------------------------------------------------*/
    $('.carousel').each(function(){
      var thisSlider = $(this);
      var colAttrCheck = thisSlider[0].hasAttribute('data-column');
      if(colAttrCheck === true){
        //A closure function that run when classes change dynamically
        (function(){
          var originalAddClassMethod = jQuery.fn.addClass;
          jQuery.fn.addClass = function(){
            var result = originalAddClassMethod.apply( this, arguments );
            //Trigger a custom event that is using below
            jQuery(this).trigger('slideIsChanging');
            return result;
          };
        })();
        //A function that run on document ready and when we resize the browser
		'use strict';
        function colMediaQuery(){
          //Slider's Ids
          var sliderId = thisSlider.attr('id');
          //Find carousel-item elements
          var findCarouselItems = thisSlider.find('.carousel-item');
          //Length of carousel-item
          var carouselItemLength = $(findCarouselItems).length;
          //@media (min-width: 1201px)
          var colAttrVal = thisSlider.attr('data-column');
          //@media (min-width: 993px) and (max-width: 1200px)
          var m1200AttrVal = thisSlider.attr('data-m1200');
          var m1200AttrCheck = thisSlider[0].hasAttribute('data-m1200');
          //@media (min-width: 769px) and (max-width: 992px)
          var m992AttrVal = thisSlider.attr('data-m992');
          var m992AttrCheck = thisSlider[0].hasAttribute('data-m992');
          //@media (min-width: 577px) and (max-width: 768px)
          var m768AttrVal = thisSlider.attr('data-m768');
          var m768AttrCheck = thisSlider[0].hasAttribute('data-m768');
          //@media (max-width: 576px)
          var m576AttrVal = thisSlider.attr('data-m576');
          var m576AttrCheck = thisSlider[0].hasAttribute('data-m576');
		  function detectViewSize(atrChk,size,width,attr){
            $('#' + sliderId).css({'display': 'block'});
            if(atrChk === true){
              var colAtrVal = size;
            }else{
              colAtrVal = colAttrVal;
            }
            if(colAtrVal !== '' && colAtrVal > 0 && colAtrVal <= carouselItemLength){
              if(window.matchMedia(width).matches){
                $(findCarouselItems).each(function(){
                  var thisItem = $(this);
                  thisItem.find('.cloneditems').remove();
                  for(var i=1; i < colAtrVal; i++){
                    thisItem = thisItem.next();
                    // wrap around if at end of item collection
                    if(!thisItem.length){
                      thisItem = $(this).siblings(':first');
                    }
                    thisItem.children(':first-child').children(':first-child').clone().addClass('cloneditem-'+(i) + ' cloneditems').appendTo($(this).children(':first-child'));
                  }
                });
                var colAtrValDivide = 100/colAtrVal;
                var colAtrValTranslate = colAtrValDivide + '%';
                //Code of trigger that is using above
                $(findCarouselItems).on('slideIsChanging', function(){
                  thisSlider.find('.active.carousel-item-left, .carousel-item-prev').css({
                    '-webkit-transform': 'translateX(-' + colAtrValTranslate + ')',
                    'transform': 'translateX(-' + colAtrValTranslate + ')',
                    '-webkit-transform': '-webkit-translate3d(-' + colAtrValTranslate + ',0,0)',
                    'transform': 'translate3d(-' + colAtrValTranslate + ',0,0)'
                  });
                  thisSlider.find('.carousel-item-next, .active.carousel-item-right').css({
                    '-webkit-transform': 'translateX(' + colAtrValTranslate + ')',
                    'transform': 'translateX(' + colAtrValTranslate + ')',
                    '-webkit-transform': '-webkit-translate3d(' + colAtrValTranslate + ',0,0)',
                    'transform': 'translate3d(' + colAtrValTranslate + ',0,0)'
                  });
                  thisSlider.find('.carousel-item-next.carousel-item-left, .carousel-item-prev.carousel-item-right').css({
                    '-webkit-transform': 'translateX(0)',
                    'transform': 'translateX(0)',
                    '-webkit-transform': '-webkit-translate3d(0,0,0)',
                    'transform': 'translate3d(0,0,0)'
                  });
                });
              }
            }else{
              var alertTxtCol = 'In Slider Id : #' + sliderId;
              alertTxtCol += '\n';
              alertTxtCol += 'You are assigning the value (' + colAtrVal + ') to the (data-' + attr + ') attribute. Which is greater than numbers of carousel-item those you are creating (' + carouselItemLength + ')';
              alertTxtCol += '\n\n';
              alertTxtCol += 'Please make sure the value of (data-' + attr + ') should be <= to numbers of carousel-item (' + carouselItemLength + ').';
              alertTxtCol += '\n\n';
              alertTxtCol += 'Note : The values should not be 0 or empty And also (Positive Integers only)';
              alert(alertTxtCol);
              $('#' + sliderId).css({'display': 'none'});
            }
          }
          detectViewSize(colAttrCheck,colAttrVal,'(min-width: 1201px)','column');
          detectViewSize(m1200AttrCheck,m1200AttrVal,'(min-width: 993px) and (max-width: 1200px)','m1200');
          detectViewSize(m992AttrCheck,m992AttrVal,'(min-width: 769px) and (max-width: 992px)','m992');
          detectViewSize(m768AttrCheck,m768AttrVal,'(min-width: 577px) and (max-width: 768px)','m768');
          detectViewSize(m576AttrCheck,m576AttrVal,'(max-width: 576px)','m576');
        } //Ending colMediaQuery();

        //Initializing media queries function on page load
        colMediaQuery();

        //Run media queries function on page resizing
        $(window).resize(function(){
          clearTimeout(thisSlider.id);
          thisSlider.id = setTimeout(colMediaQuery, 100);
        });
      }
    });

	var nameSlider = $('.carousel');
    var lengthSlider = nameSlider.length;
	
    for(var i=0; i < lengthSlider; i++){
      $.fn.carousel.Constructor.TRANSITION_DURATION = 9999999;
      var sliderDurationIndex = nameSlider.eq(i);
      var sliderDurationVal = sliderDurationIndex.data('duration');
      var sliderDurationAttr = $('[data-duration=' + sliderDurationVal + '] > .carousel-inner > .carousel-item');
        $(sliderDurationAttr).each(function(){
          $(this).css({
            '-webkit-transition-duration': sliderDurationVal + 'ms',
            '-moz-transition-duration': sliderDurationVal + 'ms',
            'transition-duration': sliderDurationVal + 'ms'
          });
        });
    }

    /*-----------------------------------------------------------------*/
    /* CAROUSEL MOUSE WHEEL
    /*-----------------------------------------------------------------*/
    var mouseWheelY = $(".carousel").find('[class=mouse_wheel_y]');
    var mouseWheelXY = $(".carousel").find('[class=mouse_wheel_xy]');

    if(mouseWheelXY){
        $('.mouse_wheel_xy').bind('mousewheel', function(e){
            if(e.originalEvent.wheelDelta /120 > 0) {
                $(this).carousel('prev');
            }else {
                $(this).carousel('next');
            }
        });
    }if(mouseWheelY){
        $('.mouse_wheel_y').bind('mousewheel', function(e){
            if(e.originalEvent.wheelDelta /120 > 0) {
                $(this).carousel('next');
            }
        });
    }

    /*-----------------------------------------------------------------*/
    /* MOBILE SWIPE
    /*-----------------------------------------------------------------*/
    //Enable swiping...
    var verticalSwipe = $(".carousel").find('[class=swipe_y]');
    var horizontalSwipe = $(".carousel").find('[class=swipe_x]');

    if(verticalSwipe){
      $(".swipe_y .carousel-inner").swipe({
        //Generic swipe handler for vertical directions
        swipeUp: function (event, direction, distance, duration, fingerCount) {
          $(this).parent().carousel('next');
        },
        swipeDown: function () {
          $(this).parent().carousel('prev');
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
        threshold: 0
      });
    }if(horizontalSwipe){
      $(".swipe_x .carousel-inner").swipe({
        //Generic swipe handler for horizontal directions
        swipeLeft: function (event, direction, distance, duration, fingerCount) {
          $(this).parent().carousel('next');
        },
        swipeRight: function () {
          $(this).parent().carousel('prev');
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
        threshold: 0
      });
    }
    /*-----------------------------------------------------------------*/
    /* Thumbnails Indicators Scroll
    /*-----------------------------------------------------------------*/
		var thumbnailScrollX = $(".carousel").hasClass('thumb_scroll_x');
		var thumbnailScrollY = $(".carousel").hasClass('thumb_scroll_y');
		if(thumbnailScrollX === true){
			$('.thumb_scroll_x').each(function(){
			  var indicatorPositionX = 0;
			  $(this).on('slide.bs.carousel', function(){
				var widthEstimate = -1 * $(this).find('.carousel-indicators li:first-child').position().left + $(this).find('.carousel-indicators li:last-child').position().left + $(this).find('.carousel-indicators li:last-child').width();
				var newIndicatorPositionX = $(this).find('.carousel-indicators li.active').position().left + $(this).find('.carousel-indicators li.active').width() / 1.2;
				var toScrollX = newIndicatorPositionX + indicatorPositionX;
				var adjustedScrollX = toScrollX - ($(this).find('.carousel-indicators').width() / 1.2);
				if (adjustedScrollX < 0)
				  adjustedScrollX = 0;
				if (adjustedScrollX > widthEstimate - $(this).find('.carousel-indicators').width())
				  adjustedScrollX = widthEstimate - $(this).find('.carousel-indicators').width();
				$(this).find('.carousel-indicators').animate({ scrollLeft: adjustedScrollX }, 800);
				  indicatorPositionX = adjustedScrollX;
			  });
			  $(this).on('slid.bs.carousel', function(){
				var widthEstimate = -1 * $(this).find('.carousel-indicators li:first-child').position().left + $(this).find('.carousel-indicators li:last-child').position().left + $(this).find('.carousel-indicators li:last-child').width();
				var newIndicatorPositionX = $(this).find('.carousel-indicators li.active').position().left + $(this).find('.carousel-indicators li.active').width() / 1.2;
				var toScrollX = newIndicatorPositionX + indicatorPositionX;
				var adjustedScrollX = toScrollX - ($(this).find('.carousel-indicators').width() / 1.2);
				if (adjustedScrollX < 0)
				  adjustedScrollX = 0;
				if (adjustedScrollX > widthEstimate - $(this).find('.carousel-indicators').width())
				  adjustedScrollX = widthEstimate - $(this).find('.carousel-indicators').width();
				$(this).find('.carousel-indicators').animate({ scrollLeft: adjustedScrollX }, 800);
				  indicatorPositionX = adjustedScrollX;
			  });
			});
		}

	if(thumbnailScrollY === true){
		var indicatorPositionY = 0;
		$('.thumb_scroll_y').each(function(){
		  $(this).on('slide.bs.carousel', function(){
			var heightEstimate = -1 * $(this).find('.carousel-indicators li:first').position().top + $(this).find('.carousel-indicators li:last').position().top + $(this).find('.carousel-indicators li:last').height();
			var newIndicatorPositionY = $(this).find('.carousel-indicators li.active').position().top + $(this).find('.carousel-indicators li.active').height() / 1.2;
			var toScrollY = newIndicatorPositionY + indicatorPositionY;
			var adjustedScrollY = toScrollY - ($(this).find('.carousel-indicators').height() / 1.2);
			if (adjustedScrollY < 0)
			  adjustedScrollY = 0;
			if (adjustedScrollY > heightEstimate - $(this).find('.carousel-indicators').height())
			  adjustedScrollY = heightEstimate - $(this).find('.carousel-indicators').height();
			$(this).find('.carousel-indicators').animate({ scrollTop: adjustedScrollY }, 800);
			  indicatorPositionY = adjustedScrollY;
		  });
		  $(this).on('slid.bs.carousel', function(){
			var heightEstimate = -1 * $(this).find('.carousel-indicators li:first').position().top + $(this).find('.carousel-indicators li:last').position().top + $(this).find('.carousel-indicators li:last').height();
			var newIndicatorPositionY = $(this).find('.carousel-indicators li.active').position().top + $(this).find('.carousel-indicators li.active').height() / 1.2;
			var toScrollY = newIndicatorPositionY + indicatorPositionY;
			var adjustedScrollY = toScrollY - ($(this).find('.carousel-indicators').height() / 1.2);
			if (adjustedScrollY < 0)
			  adjustedScrollY = 0;
			if (adjustedScrollY > heightEstimate - $(this).find('.carousel-indicators').height())
			  adjustedScrollY = heightEstimate - $(this).find('.carousel-indicators').height();
			$(this).find('.carousel-indicators').animate({ scrollTop: adjustedScrollY }, 800);
			  indicatorPositionY = adjustedScrollY;
		  });
		});
	}
}
bs4carousels();
