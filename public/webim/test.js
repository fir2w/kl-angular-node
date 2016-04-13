/**
 * Created by ww on 14-3-18.
 */
$(function () {

  var wbim_box = $("body").find("div#wbim_chat_box");
  var _this = wbim_box;

  // 对话框最小化WBIM_icon_minY
  _this.find("a#rt_wbim_icon_mini").unbind("click").bind("click", function () {
    if (_this.find("ul#wbim_chat_friend_list").find("li.wbim_highlight")
      .size() != 0) {
      _this.find("div#wbim_min_box_col_change").attr("class",
        "wbim_min_box_col3");
      _this.find("div#wbim_min_chat").addClass("wbim_min_chat_msg");
      _this.find("span#wbim_min_text_pre").text("");
      _this.find("span#wbim_min_text").text("");
      _this.find("span#span_wbim_min_nick").text("您有新信息");
      _this.find("div#wbim_min_chat").show();
    } else {
      _this.find("div#wbim_min_box_col_change").attr("class",
        "wbim_min_box_col3");
      _this.find("div#wbim_min_chat").removeClass("wbim_min_chat_msg");
      _this.find("span#wbim_min_text_pre").text("正与");
      _this.find("span#wbim_min_text").text("聊天中");
      _this.find("span#span_wbim_min_nick").text(_this
        .find("ul#wbim_chat_friend_list").find("li.wbim_active")
        .attr("title"));
      _this.find("div#wbim_min_chat").show();

    }
    _this.find("div#wbim_chat_box").hide();

    //定位快捷图标
    $("div#shortcut_div").css({"position": "absolute", "right": "166px", "bottom": "0px", "z-index": "1001"});
    return false;
  });

});