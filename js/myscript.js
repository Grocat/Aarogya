$(document).ready(function () {
  // Configuration - set this to control when the script should run
  const ENABLE_HEIGHT_SYNC = true; // Set to false to disable the script
  const MIN_SCREEN_WIDTH = 996; // Minimum screen width to run the script

  // Early exit if script is disabled
  if (!ENABLE_HEIGHT_SYNC) {
    console.log('Height sync script is disabled');
    return;
  }

  // Function to check if script should run based on conditions
  function shouldRunScript() {
    const screenWidth = $(window).innerWidth();
    const isLargeScreen = screenWidth > MIN_SCREEN_WIDTH;

    // Check if ANY service/overview sections exist
    const hasRequiredElements = $('.why_patients_conent, .service-text-2, .service-text-3, .overview_conent_div').length > 0 ||
      $('.why_patients_img , .service-image-2, .service-image-3, .overview_imag_div').length > 0;

    return isLargeScreen && hasRequiredElements;
  }

  // Function to sync heights for a specific section
  function syncHeights(contentSelector, imgSelector) {
    var $contentDiv = $(contentSelector);
    var $imgContainer = $(imgSelector);

    if ($contentDiv.length && $imgContainer.length) {
      var $img = $imgContainer.find('img');
      if ($img.length) {
        var contentHeight = $contentDiv.outerHeight();
        $imgContainer.height(contentHeight);

        // ✅ Ensure image fully fills container
        $img.css({
          'width': '100%',
          'height': '100%',
          'object-fit': 'cover'
        });

        console.log('Synced heights for ' + contentSelector + ' and ' + imgSelector);
      }
    }
  }

  // Function to reset heights
  function resetHeights() {
    $('.why_patients_img , .service-image-2, .service-image-3, .overview_imag_div').css('height', '');
    $('.why_patients_img  img, .service-image-2 img, .service-image-3 img, .overview_imag_div img').css({
      'width': '',
      'height': '',
      'object-fit': ''
    });
    console.log('Heights reset to default');
  }

  // Function to sync heights for all sections
  function syncAllHeights() {
    if (!shouldRunScript()) {
      console.log('Height sync conditions not met - skipping');
      resetHeights();
      return;
    }

    const sections = [{
        content: '.why_patients_conent',
        image: '.why_patients_img ',
        name: 'Section 1'
      },
      {
        content: '.service-text-2',
        image: '.service-image-2',
        name: 'Section 2'
      },
      {
        content: '.service-text-3',
        image: '.service-image-3',
        name: 'Section 3'
      },
      {
        content: '.overview_conent_div',
        image: '.overview_imag_div',
        name: 'Overview Section'
      } // ✅ Added
    ];

    let foundSections = 0;

    sections.forEach(section => {
      const hasContent = $(section.content).length > 0;
      const hasImage = $(section.image).length > 0;

      if (hasContent && hasImage) {
        foundSections++;
        try {
          syncHeights(section.content, section.image);
        } catch (e) {
          console.error(`Error syncing ${section.name}:`, e);
        }
      }
    });

    if (foundSections === 0) {
      console.log('No matching sections found - height sync not needed');
    } else {
      console.log(`Height sync applied to ${foundSections} section(s)`);
    }
  }

  function toggleHeightSync(enable) {
    if (enable && shouldRunScript()) {
      syncAllHeights();
    } else {
      resetHeights();
    }
  }

  // Initial run
  syncAllHeights();
  $(window).on('load', syncAllHeights);
  setTimeout(syncAllHeights, 500);

  $(window).on('resize', function () {
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(syncAllHeights, 100);
  });

  window.heightSyncControls = {
    enable: function () {
      toggleHeightSync(true);
    },
    disable: function () {
      toggleHeightSync(false);
    },
    toggle: function () {
      ENABLE_HEIGHT_SYNC = !ENABLE_HEIGHT_SYNC;
      toggleHeightSync(ENABLE_HEIGHT_SYNC);
    },
    reset: resetHeights,
    sync: syncAllHeights
  };

  $('body').addClass(shouldRunScript() ? 'height-sync-active' : 'height-sync-inactive');
});

$(document).ready(function () {
  // Auto-expand the first FAQ
  $(".faqs-container .faq-singular:first")
    .addClass("active")
    .children(".faq-answer")
    .slideDown();

  // Toggle FAQs
  $(".faq-question").on("click", function () {
    const parent = $(this).parent();

    if (parent.hasClass("active")) {
      parent.removeClass("active").children(".faq-answer").slideUp();
    } else {
      $(".faq-singular.active .faq-answer").slideUp();
      $(".faq-singular").removeClass("active");
      parent.addClass("active").children(".faq-answer").slideDown();
    }
  });
});

$(document).ready(function () {
  $(".blog-carousel").owlCarousel({
    loop: true,
    margin: 30,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      1024: {
        items: 3
      }
    }
  });
});
$(document).ready(function () {
  $(".Realated-carousel").owlCarousel({
    loop: true,
    margin: 30,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    navText: [
      '<i class="fa-solid fa-arrow-left"></i>',
      '<i class="fa-solid fa-arrow-right"></i>'
    ],
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      1024: {
        items: 3
      }
    }
  });
});
$(document).ready(function () {
  $(".seo_case_study").owlCarousel({
    loop: true,
    margin: 20,
    nav: true,
    dots: true,
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 1
      },
      768: {
        items: 2
      },
      1200: {
        items: 4
      }
    }
  });
});

var owl = $(".seo-testiminoal");
owl.owlCarousel({
  items: 3,
  margin: 30,
  loop: true,
  center: true,
  dots: false,
  nav: false,
  responsive: {
    0: {
      items: 1
    },
    768: {
      items: 2
    },
    1200: {
      items: 3
    }
  }
});

$(".next").click(function () {
  owl.trigger("next.owl.carousel");
});
$(".prev").click(function () {
  owl.trigger("prev.owl.carousel");
});
$(".meet_our_div").owlCarousel({
  loop: true,
  margin: 20,
  nav: true,
  dots: true,
  navText: [
    '<i class="fa-solid fa-arrow-left"></i>',
    '<i class="fa-solid fa-arrow-right"></i>'
  ],
  responsive: {
    0: {
      items: 1
    },
    576: {
      items: 2
    },
    768: {
      items: 3
    },
    1200: {
      items: 4
    }
  }
});
$(document).ready(function(){
  $(".over_lay_div").owlCarousel({
    loop:true,
    margin:20,
    nav:true,
    dots:true,
    autoplay:true,
    autoplayTimeout:4000,
    smartSpeed:800,
    responsive:{
      0:{ items:1 },
      600:{ items:2 },
      1000:{ items:4 }
    }
  });
});
$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
      loop: true,
      margin: 20,
      nav: true,
      dots: true,
      autoplay: true,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      responsive: {
        0: { items: 1 },      // Mobile: 1 item
        600: { items: 2 },    // Tablet: 2 items
        1000: { items: 4 }    // Desktop: 4 items
      }
    });
  });
