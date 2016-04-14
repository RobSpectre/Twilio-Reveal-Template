$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

function processIntroSlide(slide) {
  slide.interval = window.setInterval(function() {cycleTitleHeadings(slide);}, 4000);
}

function cycleTitleHeadings(slide) {
  var titleHeadings = $(slide).find(".title h3");

  if (typeof slide.titleIndex === 'undefined' || slide.titleIndex > titleHeadings.length) {
    slide.titleIndex = 0;
  }

  $(slide).find(".visible").removeClass("visible").animateCss("bounceOutRight");
  
  $(titleHeadings[slide.titleIndex]).addClass("visible").animateCss("bounceInLeft");

  slide.titleIndex++;
}
