(function ($) {
  "use strict";
  $(function () {
    new WOW().init();
  });

  // dynamically add current menu class to menu
  function dynamicCurrentMenuClass(selector) {
    let FileName = window.location.href.split("/").reverse()[0];

    selector.find("li").each(function () {
      let anchor = $(this).find("a");
      if ($(anchor).attr("href") == FileName) {
        $(this).addClass("current");
      }
    });
    // if any li has .current elmnt add class
    selector.children("li").each(function () {
      if ($(this).find(".current").length) {
        $(this).addClass("current");
      }
    });
    // if no file name return
    if ("" == FileName) {
      selector.find("li").eq(0).addClass("current");
    }
  }

  if ($(".main-menu .navigation").length) {
    // dynamic current class
    let mainNavUL = $(".main-menu .navigation");
    dynamicCurrentMenuClass(mainNavUL);
  }

  if ($(".checkout__payment__title").length) {
    $(".checkout__payment__item").find(".checkout__payment__content").hide();
    $(".checkout__payment__item--active")
      .find(".checkout__payment__content")
      .show();

    $(".checkout__payment__title").on("click", function (e) {
      e.preventDefault();

      $(this)
        .parents(".checkout__payment")
        .find(".checkout__payment__item")
        .removeClass("checkout__payment__item--active");
      $(this)
        .parents(".checkout__payment")
        .find(".checkout__payment__content")
        .slideUp();

      $(this).parent().addClass("checkout__payment__item--active");
      $(this).parent().find(".checkout__payment__content").slideDown();
    });
  }

  if ($(".range-slider-price").length) {
    var priceRange = document.getElementById("range-slider-price");
    var priceRangeMin = $(".range-slider-price").data("range-min");
    var priceRangeMax = $(".range-slider-price").data("range-max");
    var priceRangeStartMin = $(".range-slider-price").data("start-min");
    var priceRangeStartMax = $(".range-slider-price").data("start-max");
    var priceRangeLimit = $(".range-slider-price").data("limit");

    noUiSlider.create(priceRange, {
      start: [priceRangeStartMin, priceRangeStartMax],
      limit: priceRangeLimit,
      behaviour: "drag",
      connect: true,
      format: wNumb({
        decimals: 0,
      }),
      range: {
        min: priceRangeMin,
        max: priceRangeMax,
      },
    });

    var limitFieldMin = document.getElementById("min-value-rangeslider");
    var limitFieldMax = document.getElementById("max-value-rangeslider");

    priceRange.noUiSlider.on("update", function (values, handle) {
      (handle ? $(limitFieldMax) : $(limitFieldMin)).text(values[handle]);
    });
  }

  if ($(".add").length) {
    $(".add").on("click", function () {
      if ($(this).prev().val() < 999) {
        $(this)
          .prev()
          .val(+$(this).prev().val() + 1);
      }
    });
  }

  if ($(".sub").length) {
    $(".sub").on("click", function () {
      if ($(this).next().val() > 1) {
        if ($(this).next().val() > 1)
          $(this)
            .next()
            .val(+$(this).next().val() - 1);
      }
    });
  }

  if ($(".countdown-one__list").length) {
    let mainDate = $(".countdown-one__list").data("deadline-date");
    let yearsCondition = $(".countdown-one__list").data("enable-years");
    let leadingZeros = $(".countdown-one__list").data("leading-zeros");

    let deadLine =
      "dynamicDate" == mainDate
        ? new Date(Date.parse(new Date()) + 31 * 24 * 60 * 60 * 1000)
        : mainDate;

    $(".countdown-one__list").countdown({
      date: deadLine,
      leadingZeros: true,
      render: function (date) {
        this.el.innerHTML =
          (true == yearsCondition
            ? "<li> <span class='years'> " +
              (true == leadingZeros
                ? this.leadingZeros(date.years)
                : date.years) +
              " <i> Years </i> </span> </li>"
            : " ") +
          "<li> <span class='days'> " +
          (true == leadingZeros ? this.leadingZeros(date.days) : date.days) +
          " <i> Days </i> </span> </li>" +
          "<li> <span class='hours'>" +
          (true == leadingZeros ? this.leadingZeros(date.hours) : date.hours) +
          " <i> Hours </i> </span> </li>" +
          "<li> <span class='minutes'> " +
          (true == leadingZeros ? this.leadingZeros(date.min) : date.min) +
          " <i> Minutes </i> </span> </li>" +
          "<li> <span class='seconds'>" +
          (true == leadingZeros ? this.leadingZeros(date.sec) : date.sec) +
          " <i> Seconds </i> </span> </li>";
      },
    });
  }

  // boxed layout switcher
  if ($(".boxed-switcher").length) {
    $(".boxed-switcher").on("click", function () {
      $("body").toggleClass("boxed-wrapper");
      $(".page-wrapper").toggleClass("boxed-wrapper");
    });
  }

  if ($(".dark-switcher").length) {
    $(".dark-switcher").on("click", function (e) {
      e.preventDefault();
      $("body").toggleClass("body-dark");
    });
  }

  //Hide Loading Box (Preloader)
  function handlePreloader() {
    if ($(".preloader").length) {
      $("body").addClass("page-loaded");
      $(".preloader").delay(100).fadeOut(0);
    }
  }

  //Update Header Style and Scroll to Top
  function headerStyle() {
    if ($(".main-header").length) {
      var windowpos = $(window).scrollTop();
      var siteHeader = $(".main-header");
      var sticky_header = $(".main-header .sticky-header");
      if (windowpos > 120) {
        siteHeader.addClass("fixed-header");
        sticky_header.addClass("animated slideInDown");
      } else {
        siteHeader.removeClass("fixed-header");
        sticky_header.removeClass("animated slideInDown");
      }
    }
  }

  headerStyle();

  //Submenu Dropdown Toggle
  if ($(".main-header li.dropdown ul").length) {
    $(".main-header .navigation li.dropdown > a").append(
      '<div class="dropdown-btn"><span class="fa fa-angle-right"></span></div>'
    );
  }

  // nomal click evenet dropdown show
  let isBarClicked = false;
  $(".mobile-nav-toggler").on("click", function () {
    if (!isBarClicked) {
      $(".little-dropdown").addClass("showDropdown");
      isBarClicked = true;
    } else {
      $(".little-dropdown").removeClass("showDropdown");
      isBarClicked = false;
    }
    console.log($(".little-dropdown"), "eeeeeee");
  });

  //Mobile Nav Hide Show
  // if ($(".side-menu__block").length) {
  //   var mobileMenuContent = $(".main-header .nav-outer .main-menu").html();
  //   var mobileNavContainer = $(".mobile-nav__container");
  //   mobileNavContainer.append(mobileMenuContent);

  //   //Dropdown Button
  //   mobileNavContainer
  //     .find("li.dropdown .dropdown-btn")
  //     .on("click", function (e) {
  //       e.preventDefault();
  //       $(this).toggleClass("open");
  //       $(this).parent("a").parent("li").children("ul").slideToggle(500);
  //     });
  //   //Menu Toggle Btn
  //   $(".mobile-nav-toggler").on("click", function () {
  //     $(".side-menu__block").addClass("active");
  //   });

  //   $(".side-menu__block-overlay,.side-menu__toggler, .scrollToLink").on(
  //     "click",
  //     function (e) {
  //       $(".side-menu__block").removeClass("active");
  //       e.preventDefault();
  //     }
  //   );
  // }

  // Main Slider / Banner Carousel
  if ($(".banner-carousel").length) {
    $(".banner-carousel").owlCarousel({
      loop: true,
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      margin: 0,
      nav: true,
      smartSpeed: 500,
      autoplay: 6000,
      autoplayTimeout: 6000,
      navText: [
        '<span class="icon fa fa-angle-left"></span>',
        '<span class="icon fa fa-angle-right"></span>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 1,
        },
        800: {
          items: 1,
        },
        992: {
          items: 1,
        },
      },
    });
  }

  //MixitUp Gallery Filters
  if ($(".filter-list").length) {
    $(".filter-list").mixItUp({});
  }

  //Contact Form Validation
  if ($("#contact-form").length) {
    $("#contact-form").validate({
      rules: {
        username: {
          required: true,
        },
        email: {
          required: true,
          email: true,
        },
        phone: {
          required: true,
        },
        subject: {
          required: true,
        },
        message: {
          required: true,
        },
      },
    });
  }

  // Scroll to a Specific Div
  if ($(".scroll-to-target").length) {
    $(".scroll-to-target").on("click", function () {
      var target = $(this).attr("data-target");
      // animate
      $("html, body").animate(
        {
          scrollTop: $(target).offset().top,
        },
        1000
      );

      return false;
    });
  }

  function SmoothMenuScroll() {
    var anchor = $(".scrollToLink");
    if (anchor.length) {
      anchor.children("a").bind("click", function (event) {
        if ($(window).scrollTop() > 10) {
          var headerH = "0";
        } else {
          var headerH = "0";
        }
        var target = $(this);
        $("html, body")
          .stop()
          .animate(
            {
              scrollTop: $(target.attr("href")).offset().top - headerH + "px",
            },
            1200,
            "easeInOutExpo"
          );
        anchor.removeClass("current");
        target.parent().addClass("current");
        event.preventDefault();
      });
    }
  }
  SmoothMenuScroll();

  function OnePageMenuScroll() {
    var windscroll = $(window).scrollTop();
    if (windscroll >= 117) {
      var menuAnchor = $(".one-page-scroll-menu .scrollToLink").children("a");
      menuAnchor.each(function () {
        // grabing section id dynamically
        var sections = $(this).attr("href");
        $(sections).each(function () {
          // checking is scroll bar are in section
          if ($(this).offset().top <= windscroll + 100) {
            // grabing the dynamic id of section
            var Sectionid = $(sections).attr("id");
            // removing current class from others
            $(".one-page-scroll-menu").find("li").removeClass("current");
            // adding current class to related navigation
            $(".one-page-scroll-menu")
              .find("a[href*=\\#" + Sectionid + "]")
              .parent()
              .addClass("current");
          }
        });
      });
    } else {
      $(".one-page-scroll-menu li.current").removeClass("current");
      $(".one-page-scroll-menu li:first").addClass("current");
    }
  }

  /* ==========================================================================
	   When document is Scrollig, do
	   ========================================================================== */

  $(window).on("scroll", function () {
    headerStyle();
    OnePageMenuScroll();
    if ($(".scroll-to-top").length) {
      var strickyScrollPos = 100;
      if ($(window).scrollTop() > strickyScrollPos) {
        $(".scroll-to-top").fadeIn(500);
      } else if ($(this).scrollTop() <= strickyScrollPos) {
        $(".scroll-to-top").fadeOut(500);
      }
    }
  });

  /* ==========================================================================
	   When document is Resized, do
	   ========================================================================== */

  $(window).on("resize", function () {});

  /* ==========================================================================
	   When document is loading, do
	   ========================================================================== */

  $(window).on("load", function () {
    // swiper slider

    const swiperElm = document.querySelectorAll(".thm-swiper__slider");

    swiperElm.forEach(function (swiperelm) {
      const swiperOptions = JSON.parse(swiperelm.dataset.swiperOptions);
      let thmSwiperSlider = new Swiper(swiperelm, swiperOptions);
    });

    handlePreloader();

    if ($(".masonary-layout").length) {
      $(".masonary-layout").isotope({
        layoutMode: "masonry",
        itemSelector: ".masonary-item",
      });
    }

    if ($(".post-filter").length) {
      var postFilterList = $(".post-filter li");
      // for first init
      $(".filter-layout").isotope({
        filter: ".filter-item",
        animationOptions: {
          duration: 500,
          easing: "linear",
          queue: false,
        },
      });
      // on click filter links
      postFilterList.on("click", function () {
        var Self = $(this);
        var selector = Self.attr("data-filter");
        postFilterList.removeClass("active");
        Self.addClass("active");

        $(".filter-layout").isotope({
          filter: selector,
          animationOptions: {
            duration: 500,
            easing: "linear",
            queue: false,
          },
        });
        return false;
      });
    }

    if ($(".has-dynamic-filter-counter").length) {
      // var allItem = $('.single-filter-item').length;

      var activeFilterItem = $(".has-dynamic-filter-counter").find("li");

      activeFilterItem.each(function () {
        var filterElement = $(this).data("filter");
        var count = $(".dynamic-filter-count-layout").find(
          filterElement
        ).length;
        $(this).append("<sup>[" + count + "]</sup>");
        console.log(count);
      });
    }

    if ($(".portfolio-masonary__filters").length) {
      $(".portfolio-masonary__filters").find("li").eq(0).addClass("active");
    }
  });
})(window.jQuery);

// clientels carousel
$("#clienteles-carousel").owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 5,
    },
  },
});
