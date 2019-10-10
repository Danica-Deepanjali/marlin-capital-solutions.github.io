jQuery(function ($) {
  $(document).ready(function () {
    $("#getStarted,#revealContent,#subNav").click(function () {
      $("body").toggleClass("animate");
      $(".cta-section").removeClass('hover');
    });
  });

  $('#revealContent').hover(
    function () {$("body:not(.animate) .cta-section").addClass('hover') },
    function () {$("body:not(.animate) .cta-section").removeClass('hover') }
  )
  // scroll on laptops
  $(window)
    .on("resize", function () {
      if ($(window).width() > 991 || $(window).height() > 629) {
        // checks if the specified event is supported by the browser.
        function isEventSupported(eventName) {
          var el = document.createElement("div");
          eventName = "on" + eventName;
          var isSupported = eventName in el;
          if (!isSupported) {
            el.setAttribute(eventName, "return;");
            isSupported = typeof el[eventName] == "function";
          }
          el = null;
          return isSupported;
        }

        // in browsers where both events are supported.
        var wheelEvent = isEventSupported("mousewheel")
          ? "mousewheel"
          : "wheel";
        // Now bind the event to the desired element
        $("body").on(wheelEvent, function (e) {
          var oEvent = e.originalEvent,
            delta = oEvent.deltaY || oEvent.wheelDelta;
          // deltaY for wheel event
          // wheelData for mousewheel event
          if (delta > 0) {
            $("body").addClass("animate");
          } else {
            $("body").removeClass("animate");
          }
        });
      }
    })
    .resize();

  // tabs to accordion
  $(window)
    .on("resize", function () {
      if ($(window).width() < 992 || $(window).height() < 630) {
        $(".tab-content .tab-pane").removeClass("fade");
        $(".tab-content .tab-pane").on("click", function () {
          var container = $(this).parents(".tabbed-content"),
            currId = $(this).attr("id"),
            items = container.find(".tab-pane");
          container.find(".nav-tabs a").removeClass("active");
          items.removeClass("active");
          $(this).addClass("active");
          container
            .find('.nav-tabs a[href$="#' + currId + '"]')
            .addClass("active");
        });

        // fix navbar on scroll in mobile devices
        $(window).scroll(function () {
          var topbar = $(".topbar");
          topbarHeight = $(".topbar").height();
          if ($(this).scrollTop() > topbarHeight) {
            topbar.addClass("sticky");
          } else {
            topbar.removeClass("sticky");
          }
        });

        // // smooth scrolling on mobile
        $('a[href="#letsTalk"]').on('click', function (event) {

          // Make sure this.hash has a value before overriding default behavior
          if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();
            // Store hash
            var hash = this.hash;
            // Using jQuery's animate() method to add smooth page scroll
            $('html, body').animate({
              scrollTop: $(hash).offset().top -110
            }, 500, function () {
              // Add hash (#) to URL when done scrolling (default click behavior)
              window.location.hash = hash;
            });
          } // End if
        });
      }
    })
    .resize();
});
