$(function () {
  function initSetByCookie() {
    if (typeof cookie_not_handle_user_settings != "undefined" && cookie_not_handle_user_settings == true) {
      return;
    }

    //cook中已经设置，展开
    if ($.cookie("sidebar-collapsed") === "true") {
      $("#sidebar").addClass("sidebar-collapsed");
    }
    if ($.cookie("sidebar-fixed") == "true") {
      $("#sidebar").addClass("sidebar-fixed");
    }
    if ($.cookie("navbar-fixed") == "true") {
      $("#navbar").addClass("navbar-fixed");
    }


    var e = $.cookie("skin-color");
    var t = $.cookie("sidebar-color");
    var n = $.cookie("navbar-color");
    if (e !== undefined) {
      $("body").addClass("skin-" + e);
    }
    if (t !== undefined) {
      $("#main-container").addClass("sidebar-" + t);
    }
    if (n !== undefined) {
      $("#navbar").addClass("navbar-" + n);
    }
  }
  initSetByCookie();
});