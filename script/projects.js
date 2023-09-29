var mySlider = {
  config: {
    slider: ".slider-content",
    activeSlide: ".slide.active",
    button: ".next-button",
    transition: 500,
    delay: function () {
      return this.transition;
    },
    navigation: ".control-nav",
  },

  init: function (config) {
    //$.extend(mySlider.config, config);
    this.createNav();
    $(mySlider.config.button).click(function () {
      mySlider.animateSlide($(this));
    });
  },

  getActiveSlide: function () {
    return $(mySlider.config.activeSlide);
  },

  getNextSlide: function () {
    var nextSlide = mySlider.getActiveSlide().next();

    if (nextSlide.length === 0) {
      nextSlide = $(mySlider.config.slider).find(".slide").eq(0);
    }

    return nextSlide;
  },

  getNextSlideColorAndName: function () {
    var colorAndName = {};
    var nextSlidenext = mySlider.getNextSlide().next();
    var nextSlideColor = nextSlidenext.data("color");
    var nextSlideName = nextSlidenext.data("name");

    colorAndName.color = nextSlideColor;
    colorAndName.name = nextSlideName;

    if (nextSlidenext.length === 0) {
      nextSlidenext = $(mySlider.config.slider).find(".slide").eq(0);
      nextSlideColor = nextSlidenext.data("color");
      nextSlideName = nextSlidenext.data("name");

      colorAndName.color = nextSlideColor;
      colorAndName.name = nextSlideName;
    }

    return colorAndName;
  },

  createNav: function () {
    var totalSlides = $(mySlider.config.slider).find(".slide").length;
    var controlNav = $(mySlider.config.navigation).find("ul");
    var nav;

    for (var i = 0; i < totalSlides; i++) {
      var active = "";
      if (i === 0) {
        active = "active";
      }

      controlNav.append('<li class="slider-nav nav-' + i + " " + active + ' "></li>');
    }
  },

  animateNav: function () {
    var activeNav = $("li.active");
    var nextNav = activeNav.next();

    if (nextNav.length === 0) {
      nextNav = $(".control-nav li").eq(0);
    }

    activeNav.removeClass("active");
    nextNav.addClass("active");
  },

  animateSlide: function (button) {
    var activeSlide = mySlider.getActiveSlide();
    var nextSlide = mySlider.getNextSlide();
    var delay = mySlider.config.delay();
    var clipPath = $(".clip-svg");

    clipPath.css("transition-duration", mySlider.config.transition + "ms");
    button.css("pointer-events", "none");
    nextSlide.css("z-index", 10);
    button.css("background", mySlider.getNextSlideColorAndName().color);
    button.prev().find(".color").html(mySlider.getNextSlideColorAndName().name);
    nextSlide.addClass("active").css("opacity", 1);

    // Find the h1 element within the .title-wrapper
    var text = nextSlide.find(".title-wrapper")[0];
    var footer = nextSlide.find(".footer-wrapper")[0];

    // Set the initial opacity to 0
    text.style.opacity = 0;
    footer.style.opacity = 0;

    // Animate the opacity from 0 to 1
    var start = null;
    function fadeIn(timestamp) {
      if (!start) start = timestamp;
      var progress = timestamp - start;
      var opacity = Math.min(progress / 1000, 1); // Adjust the duration as needed
      text.style.opacity = opacity;
      footer.style.opacity = opacity;
      if (opacity < 1) {
        requestAnimationFrame(fadeIn);
      }
    }

    // Call the fadeIn function to start the animation
    requestAnimationFrame(fadeIn);

    setTimeout(function () {
      activeSlide.removeClass("active").css("opacity", 0);

      // Set the final opacity to 1 once the animation is complete
      text.style.opacity = 1;
      footer.style.opacity = 1;
    }, delay);

    setTimeout(function () {
      nextSlide.css("z-index", "");
      button.css("pointer-events", "auto");
    }, delay + 300);

    mySlider.animateNav();
  },
};

$(document).ready(function () {
  mySlider.init();
});

/* NAVBAR */
gsap.from(".navbar div", {
  duration: 1.5,
  delay: 1.5,
  opacity: 0,
  y: "20",
  ease: "expo.inOut",
  stagger: 1,
});

/* MEDIA */
gsap.from(".media ul li", {
  duration: 1.5,
  delay: 1.5,
  stagger: 0.08,
  opacity: 0,
  x: "-20",
  ease: "expo.inOut",
});

/* TEXT */
gsap.from(".text h1 .hide--text", {
  duration: 1.5,
  delay: 1,
  y: "100%",
  ease: "expo.inOut",
});

gsap.from(".text h3 .hide--text", {
  duration: 1.5,
  delay: 1.2,
  y: "100%",
  ease: "expo.inOut",
});

gsap.from(".text p .hide--text", {
  duration: 1.5,
  delay: 1.3,
  y: "200%",
  ease: "expo.inOut",
});

gsap.from(".text h2", {
  duration: 1.5,
  delay: 1.5,
  opacity: 0,
  x: "-10000",
  ease: "expo.inOut",
});

/* SPONSOR */
gsap.from(".sponsor img", {
  duration: 1.5,
  delay: 1.5,
  opacity: 0,
  y: "20",
  ease: "expo.inOut",
});

gsap.from(".sponsor p", {
  duration: 1.5,
  delay: 1.6,
  opacity: 0,
  y: "20",
  ease: "expo.inOut",
});

/* DISTORTION */
gsap.from(".distortion", {
  duration: 1.5,
  delay: 2,
  opacity: 0,
  y: "20",
  ease: "expo.inOut",
});

/* OVERLAY */
gsap.to(".first", {
  duration: 1.5,
  delay: 0.5,
  top: "-100%",
  ease: "expo.inOut",
});

gsap.to(".second", {
  duration: 1.5,
  delay: 0.6,
  top: "-100%",
  ease: "expo.inOut",
});

gsap.to(".third", {
  duration: 1.5,
  delay: 0.7,
  top: "-100%",
  ease: "expo.inOut",
});

gsap.from(".slider-content", {
  duration: 0.5,
  stagger: 0.2,
  delay: 3.5,
  left: "-100%",
  ease: "expo.inOut",
});
gsap.from(".card", {
  duration: 1.5,
  stagger: 0.2,
  delay: 4,
  bottom: "-100%",
  ease: "expo.inOut",
});
gsap.from("#banner", {
  duration: 1.5,
  stagger: 0.2,
  delay: 5,
  bottom: "-100%",
  ease: "expo.inOut",
});
