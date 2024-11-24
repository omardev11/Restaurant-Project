import { getCurrentCustomer, setCurrentCustomer } from "./Config.js";
(function ($) {
  "use strict";

  // Initiate superfish on nav menu
  $(".nav-menu").superfish({
    animation: { opacity: "show" },
    speed: 400,
  });

  // Mobile Navigation
  if ($("#nav-menu-container").length) {
    var $mobile_nav = $("#nav-menu-container")
      .clone()
      .prop({ id: "mobile-nav" });
    $mobile_nav.find("> ul").attr({ class: "", id: "" });
    $("body").append($mobile_nav);
    $("body").prepend(
      '<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>'
    );
    $("body").append('<div id="mobile-body-overly"></div>');
    $("#mobile-nav")
      .find(".menu-has-children")
      .prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on("click", ".menu-has-children i", function (e) {
      $(this).next().toggleClass("menu-item-active");
      $(this).nextAll("ul").eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on("click", "#mobile-nav-toggle", function (e) {
      $("body").toggleClass("mobile-nav-active");
      $("#mobile-nav-toggle i").toggleClass("fa-times fa-bars");
      $("#mobile-body-overly").toggle();
    });

    $(document).click(function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $("#mobile-nav-toggle i").toggleClass("fa-times fa-bars");
          $("#mobile-body-overly").fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Stick the header at top on scroll
  $("#header").sticky({ topSpacing: 0, zIndex: "50" });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Header scroll class
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $("#header").addClass("header-scrolled");
    } else {
      $("#header").removeClass("header-scrolled");
    }
  });

  if ($(window).scrollTop() > 100) {
    $("#header").addClass("header-scrolled");
  }

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1,
  });

  // Date and time picker
  $("#date").datetimepicker({
    format: "L",
  });
  $("#time").datetimepicker({
    format: "LT",
  });

  // Cart Quantity
  $(".quantity").prepend('<span class="dec q-btn">-</span>');
  $(".quantity").append('<span class="inc q-btn">+</span>');
  $(".q-btn").on("click", function () {
    var $button = $(this);
    var oldValue = $button.parent().find("input").val();
    if ($button.hasClass("inc")) {
      var newVal = parseFloat(oldValue) + 1;
    } else {
      if (oldValue > 0) {
        var newVal = parseFloat(oldValue) - 1;
      } else {
        newVal = 0;
      }
    }
    $button.parent().find("input").val(newVal);
  });
})(jQuery);

// Checking If Customer Login or Logut
function StatusOfAccount() {
  const element = document.getElementById("LoginOrLogout");
  if (element) {
    const currentCustomer = getCurrentCustomer();
    if (currentCustomer === null) {
      element.textContent = "Login";
      element.href = "login.html";
    } else {
      element.textContent = "Logout";
      // element.href = "logout.html";
    }
  } else {
    console.error("Element with id 'LoginOrLogout' not found.");
  }
}
document.addEventListener("DOMContentLoaded", function () {
  StatusOfAccount(); // Call StatusOfAccount only after the DOM is fully loaded
});

const element = document.getElementById("LoginOrLogout");

element.addEventListener("click", function () {
  const currentCustomer = getCurrentCustomer();
  if (currentCustomer === null) {
    element.href = "login.html";
  } else {
    CheckLogout();
  }
  console.log("Login or Logout clicked");
});

function CheckLogout() {
  let message = "Are you sure you want to log out of your account?";
  const modal = document.getElementById("questionModal");
  const okButton = document.getElementById("yesButton");
  const noButton = document.getElementById("noButton");
  const messageElement = modal.querySelector("p"); // Updated the selector

  // Set the message inside the <p> tag
  messageElement.textContent = message;

  // Show the modal
  modal.style.display = "block";

  // Handle the OK button click
  okButton.onclick = function () {
    modal.style.display = "none";
    setCurrentCustomer(null); // Make sure this function exists
    window.location.href = "index.html"; // Redirect to the homepage or login page
  };

  // Handle the No button click
  noButton.onclick = function () {
    modal.style.display = "none";
  };
}

function ShowMessege() {
  let message =
    "We have received your message and will get back to you as soon as possible.";
  const modal = document.getElementById("successModal");
  const okButton = document.getElementById("modalOkButton");
  const messageElement = modal.querySelector("p"); // Assuming the <p> tag is inside the modal

  // Set the message inside the <p> tag
  messageElement.textContent = message;

  // Show the modal
  modal.style.display = "block";

  // Handle the OK button click
  okButton.onclick = function () {
    modal.style.display = "none";
    // window.location.href = "index.html"; // Redirect to the login page
  };
}

const checkoutButton = document.querySelector("#SendMessege-Button");

// Add a click event listener to navigate to the next section
checkoutButton.addEventListener("click", function (event) {
  event.preventDefault();
  const form = document.querySelector("form");
  if (form.checkValidity()) {
    // All fields are valid
    ShowMessege();
  } else {
    // Highlight invalid fields
    form.reportValidity();
  }
});
