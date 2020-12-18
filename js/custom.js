'use strict';

$(function() {
  $('select').styler();

  //маска для номера телефона
  $(".phone").mask("+7 (999) 999-99-99");

  //мини-слайдер

  var miniSwiper = new Swiper('.mini-slider', {
    loop: true,
    slidesPerView: 1,

    pagination: {
      el: '.mini-slider-pagination-number',
      type: 'fraction',
      clickable: true,
      renderFraction: function(currentClass, totalClass) {
        return "0" + '<span class="' + currentClass + '"></span>' + "0" +
          '<span class="' + totalClass + '"></span>';
      }
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  var miniSwiper2 = new Swiper('.mini-slider', {
    loop: true,

    pagination: {
      el: '.mini-slider-pagination-progressbar',
      type: 'progressbar',
      clickable: true,
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  //слайдер отзывы
  var reviewSwiper = new Swiper('.reviews__slider', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    centeredSlides: true,
    grabCursor: true,
    autoHeight: true,

    breakpoints: {
      800: {
        slidesPerView: 2,
        centeredSlides: false,
      },
      1000: {
        slidesPerView: 3,
        centeredSlides: false,
      },
    },

    pagination: {
      el: '.reviews__slider-pagination',
      type: 'fraction',
      clickable: true,
      renderFraction: function(currentClass, totalClass) {
        return '<span class="' + currentClass + '"></span>' +
          ' / ' +
          '<span class="' + totalClass + '"></span>';
      }
    },
    navigation: {
      nextEl: '.reviews__button-next',
      prevEl: '.reviews__button-prev',
    },
  });

  // меню

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  function onMenuEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      removeMenu();
    }
  };

  function removeMenu() {
    $("body").removeClass("overflow");
    $('.toggle').removeClass('toggle--active');
    $('.menu').fadeOut();
    document.removeEventListener('keydown', onMenuEscPress);
  }

  function openMenu() {
    $('body').addClass('overflow');
    $('.menu').fadeIn();
    document.addEventListener('keydown', onMenuEscPress);
  }

  $(".menu__nav a").click(function() {
    var elementClick = $(this).attr("href")
    var destination = $(elementClick).offset().top;
    jQuery("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination }, 500);
    return false;
  });

  $(".menu__nav a").on("click", function() {
    removeMenu();
  });

  $(".toggle--active").on("click", function() {
    removeMenu();
  });

  $('.toggle').on('click', function() {
    $('.toggle').toggleClass('toggle--active');

    if (!$('.toggle').hasClass('toggle--active')) {
      removeMenu()
    } else {
      openMenu()
    }
  })

  $('.toggle').on('keydown', function(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openMenu();
    }
  });

  //слайдер отключается на 1300

  (function() {
    var breakpoint = window.matchMedia('(min-width:1300px)');
    var mySwiper;

    var breakpointChecker = function() {
      if (breakpoint.matches === true) {
        if (mySwiper !== undefined) mySwiper.destroy(true, true);
        return;
      } else if (breakpoint.matches === false) {
        return enableSwiper();
      }
    };

    var enableSwiper = function() {
      mySwiper = new Swiper('.slider', {
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 20,
        centeredSlides: true,
        autoHeight: true,

        a11y: true,
        keyboardControl: true,
        grabCursor: true,

        // pagination
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },

        breakpoints: {
          500: {
            slidesPerView: 2,
          },
          900: {
            slidesPerView: 3,
          }
        }
      });

    };
    // keep an eye on viewport size changes
    breakpoint.addListener(breakpointChecker);

    // kickstart
    breakpointChecker();
  })();

  //слайдер клиенты

  var reviewSwiper = new Swiper('.clients', {
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: 30,
    centeredSlides: true,
    grabCursor: true,
    autoHeight: true,

    breakpoints: {
      600: {
        slidesPerView: 2,
      },
      900: {
        slidesPerView: 3,
      },
      1100: {
        slidesPerView: 4,
      },
      1300: {
        slidesPerView: 5,
        spaceBetween: 20,
        centeredSlides: false,
      }
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  //переключение вкладок отзывы

  $(".block-nav__link").on("click", function(e) {
    e.preventDefault();
    $(".block-nav__link").removeClass("block-nav__link--active");
    $(this).addClass("block-nav__link--active");

    $('[data-filter]').addClass("review-card--hidden")
    $(".block-nav__link.block-nav__link--active").each(function(e) {
      console.log(e)
      if ($(this).data("btn-filter") === 1) {
        $(".review-card").removeClass("review-card--hidden")
      } else {
        $('[data-filter="' + $(this).data("btn-filter") + '"]').removeClass("review-card--hidden");
      }
    });

    reviewSwiper.update();
  })

});
