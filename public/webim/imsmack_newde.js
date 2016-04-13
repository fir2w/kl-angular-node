var servletHttp = '127.0.0.1';
var timeS = "";
var timeP = "";
function smackAdd(userName, keyUrl, time) {
  //alert(keyUrl+"   "+im_address+"   "+time);
  timeS = $.cookie(userName + "Times");
  timeP = $.cookie(userName + "Timep");
  // 将通讯界面渲染进去
  var wbim_box = $("body").find("div#wbim_box");
  if (wbim_box.length == 0) {
    var _div = "<div id='wbim_box' class='wbim_box' style='position: fixed; bottom: 0px; right: 20px;'></div>";
    $("body").append(_div);
  }
  wbim_box = $("body").find("div#wbim_box");
  //wbim_box.hide();

  // 渲染页面
  renderTplim(wbim_box, "imWeb.html");
  //加载快捷方式页面
  //showShortcut($("#shortcut_div"));

  var _wbinBox = wbim_box;
  // ------------------------------------好友列表----------------------------------------

  // 状态设置鼠标移入移出效果
  _wbinBox.find("div#wbim_tit_lf").hover(
    // 移入
    function () {
      $(this).find("ul").show();
      $(this).addClass("wbim_tit_lf_hover");
    },
    // 移出
    function () {
      $(this).find("ul").hide();
      $(this).removeClass("wbim_tit_lf_hover");
    });
  // 状态设置
  _wbinBox.find("div#wbim_tit_lf").find("li").each(function () {
    var o = $(this);
    o.unbind("click").bind("click", function () {
      var s_val = $.trim(o.text());
      var className = o.find("span").attr("class");

      function callback() {
        _wbinBox.find("div#tit").html("<span class='" + className
          + "'></span><span class='txt'>" + s_val
          + "</span><span class='icon'></span>")
        _wbinBox.find("div#wbim_min_friend").find("p").find("span").attr(
          "class", className);
        // 关闭选择页面
        _wbinBox.find("div#wbim_tit_lf").find("ul").hide();
        _wbinBox.find("div#wbim_tit_lf").removeClass("wbim_tit_lf_hover");
      }

      // 往后台发状态
      changePresence(userName, s_val, callback);
    });
  });

  // -------------------------------------对话框---------------------------------------------------
  // 对话框最小化
  _wbinBox.find("a#rt_wbim_icon_mini").unbind("click").bind("click", function () {
    if (_wbinBox.find("ul#wbim_chat_friend_list").find("li.wbim_highlight")
      .size() != 0) {
      _wbinBox.find("div#wbim_min_box_col_change").attr("class",
        "wbim_min_box_col3");
      _wbinBox.find("div#wbim_min_chat").addClass("wbim_min_chat_msg");
      _wbinBox.find("span#wbim_min_text_pre").text("");
      _wbinBox.find("span#wbim_min_text").text("");
      _wbinBox.find("span#span_wbim_min_nick").text("您有新信息");
      _wbinBox.find("div#wbim_min_chat").show();
    } else {
      _wbinBox.find("div#wbim_min_box_col_change").attr("class",
        "wbim_min_box_col3");
      _wbinBox.find("div#wbim_min_chat").removeClass("wbim_min_chat_msg");
      _wbinBox.find("span#wbim_min_text_pre").text("正与");
      _wbinBox.find("span#wbim_min_text").text("聊天中");
      _wbinBox.find("span#span_wbim_min_nick").text(_wbinBox
        .find("ul#wbim_chat_friend_list").find("li.wbim_active")
        .attr("title"));
      _wbinBox.find("div#wbim_min_chat").show();

    }
    _wbinBox.find("div#wbim_chat_box").hide();

    //定位快捷图标
    $("div#shortcut_div").css({"position": "absolute", "right": "166px", "bottom": "0px", "z-index": "1001"});
    return false;
  });
  // 对话框关闭
  _wbinBox.find("a#rt_wbim_icon_close").unbind("click").bind("click",
    function () {
      _wbinBox.find("div#wbim_chat_box").hide();
      _wbinBox.find("div#wbim_min_chat").hide();
      _wbinBox.find("div#wbim_min_box_col_change").attr("class",
        "wbim_min_box_col2");

      //定位快捷图标
      $("div#shortcut_div").css({"position": "absolute", "right": "0px", "bottom": "0px", "z-index": "1001"});
      return false;
    });
  // 对话框最大化
  _wbinBox.find("div#wbim_min_chat").unbind("click").bind("click", function () {
    _wbinBox.find("span#span_wbim_min_nick").text("");
    _wbinBox.find("div#wbim_chat_box").show();

    //定位快捷图标
    $("div#shortcut_div").css({"position": "absolute", "right": "421px", "bottom": "0px", "z-index": "1001"});

    var id = _wbinBox.find("ul#wbim_chat_friend_list").find("li.wbim_active").attr("uid");
    _wbinBox.find("dl[uid='" + id + "']").parent().scrollTop(99999999);
    return false;
  });

  // 左侧列表用户点击效果
  _wbinBox.find("ul#wbim_chat_friend_list").delegate("li", "click", function () {
    var liObject = $(this);
    // 先改变样式
    _wbinBox.find("#wbim_chat_friend_list").find("li").each(function () {//其余的聊天记录消去
      $(this).removeClass("wbim_active");
      // $(this).attr("class","wbim_offline");
    });
    liObject.removeClass("wbim_highlight");
    liObject.attr("class", "wbim_active");
    // 对话框上面名字显示
    _wbinBox.find("a#wbim_tit_lf_name").attr("title", liObject.attr("title"));
    _wbinBox.find("a#wbim_tit_lf_name").text(liObject.attr("title"));
    _wbinBox.find("span#wbim_tit_lf_state_class").attr("class",
      liObject.find("span").attr("class"));
    // 最小化的名字显示  正与
    _wbinBox.find("div#wbim_min_chat").find("span#span_wbim_min_nick").text(liObject
      .attr("title"));
    // 中间的聊天内容切换
    _wbinBox.find("div#wbim_chat_list").find("dl").each(function () {
      $(this).hide();
    });
    _wbinBox.find("div#wbim_chat_list")
      .find("dl[uid='" + liObject.attr("uid") + "']").show();
    _wbinBox.find("div#wbim_chat_list")
      .find("dl[uid='" + liObject.attr("uid") + "']").parent().scrollTop(99999999);
    return false;
  });

  // 删除对话框
  _wbinBox.find("ul#wbim_chat_friend_list").delegate(
    "a[name='wbim_icon_close']", "click", function () {
      var o = $(this);
      var uid = o.parent().attr("uid");
      var cid = _wbinBox.find("ul#wbim_chat_friend_list")
        .find("li.wbim_active").attr("uid");
      var size = _wbinBox.find("ul#wbim_chat_friend_list").find("li")
        .size();
      // 如果只有一个对话人
      if (size == 1) {
        o.parent().remove();
        _wbinBox.find("div#wbim_chat_list").find("dl[uid='" + uid
          + "']").remove();
        _wbinBox.find("a#rt_wbim_icon_close").click();
      } else {
        o.parent().remove();
        _wbinBox.find("div#wbim_chat_list").find("dl[uid='" + uid
          + "']").remove();
        if (uid == cid) {
          _wbinBox.find("ul#wbim_chat_friend_list").find("li:first")
            .click();
        }
      }
      return false;
    });

  // 输入框字数
  fixLength();

  //表情的打开
  _wbinBox.find("#wbim_icon_face").click(function () {
    var ids = "wbim_chat_input_ta";
    if ($("#faceContent_" + ids).size() == 1
      && $("#faceContent_" + ids).css("display") != "none") {
      removeFace(ids);
      $("#wbim_chat_input_ta").focus();
      return false;
    } else {
      reImshow(ids);
      $("#wbim_chat_input_ta").focus();
      return false;
    }
  });

  //聊天记录
  _wbinBox.find("#wbim_icon_chatdoc").click(function () {
    window.open(getJspUrl('/portal/portal', {'p': 'messageHomePage#m=message&pt=l&ptc=' + _wbinBox.find("ul#wbim_chat_friend_list")
      .find("li.wbim_active").attr("uid") + '&ptd=' + _wbinBox.find("ul#wbim_chat_friend_list")
      .find("li.wbim_active").attr("title")}));

  });

  _wbinBox.find("#wbim_chat_input_ta").blur(function () {
    setTimeout(function () {
      if (document.activeElement.id != "wbim_chat_input_ta") {
        removeFace("wbim_chat_input_ta");
      }
    }, 200);
    return false;
  });

  // 发送信息
  _wbinBox.find("#input_btn_send").click(function () {
    removeFace("wbim_chat_input_ta");
    var toName = _wbinBox.find("ul#wbim_chat_friend_list")
      .find("li.wbim_active").attr("uid");
    var sendMessages = $("#wbim_chat_input_ta").val();
    if ($.trim($("#wbim_chat_input_ta").val()) == "") {
      $("#wbim_chat_input_ta").val("");
      $("#atra_num").text("0");
      $("#wbim_chat_input_ta").focus();
      return false;
    }
    if (sendMessages.length > 1000) {
      return false;
    }

    $("#wbim_chat_input_ta").val("");
    $("#wbim_chat_input_ta").focus();
    $("#atra_num").text("0");
    var desDl = $("div#wbim_chat_list").find("dl[uid='" + toName + "']");

    var sends = sendMessages.split("\n");
    var strx = "";
    for (var x = 0; x < sends.length; x++) {
//			strx = strx + "<p class='txt'>" + displayHtmlCode(sends[x]) + "</p>";
      if (sends[x] == "" && x < sends.length - 1) {
        strx = strx + "<p class='txt'><br/></p>";
      } else {
        strx = strx + "<p class='txt'>" + sends[x].replace(/\s/g, '&nbsp;') + "</p>";
      }
    }
    desDl.append("<dd class='wbim_msgr'>" + "<div class='wbim_msgpos'>"
      + "<div class='msg_time' fv='1'>"
      + formatDtoStrim(new Date()) + "</div>"
      + "<div class='msg_box'>" + convertImg(strx) + "</div>"
      + "<div class='msg_arr'></div>" + "</div>" + "</dd>");
    desDl.parent().scrollTop(99999999);
    sendMessage(userName, toName, sendMessages);

    return false;
  });

  // 按enter默认发送
  $("#wbim_chat_input_ta").keyup(function (e) {
    if (e.shiftKey && e.which == 13 || e.which == 10) {
      // var strv=$("#wbim_chat_input_ta").val();
      // alert(strv.indexOf("\r\n"));
      // $("#wbim_chat_input_ta").val(strv.replace("\r","\r\n"));
      // return false;
    } else if (e.keyCode == 13) {
      _wbinBox.find("#input_btn_send").click();
    }

  });


  //左侧栏的点击效果
  $("#photo_thumb_top").click(function () {
    var liArray = $("#wbim_chat_friend_list").find("li:visible");
    if (liArray.length > 10) {
      liArray.eq(0).hide();
    }
  });

  //左侧栏的点击效果
  $("#photo_thumb_down").click(function () {
    var liArray = $("#wbim_chat_friend_list").find("li:hidden");
    if (liArray.length > 0) {
      liArray.eq(liArray.length - 1).show();
    }
  });

  loginSMack(userName,keyUrl,time);//加载...用户
  searchButton();
  refreshTitile();

}

// 登录
function loginSMack(userName, keyUrl, time) {
  setTimeout(function () {
    getGroups(userName);
  }, 2000);
}
// 发起会话
function openDialog(userName, toName) {
  $.ajax({
    url: servletHttp + "/imAction?userName=" + userName
      + "&toName=" + toName + "&smcType=2",
    dataType: "jsonp",
    jsonp: "callback",
    timeout: 60000,
    success: function (json) {
    },
    error: function () {
      //alert("4");
    }
  });
}
// 获取自己状态
function getStateMine(userName) {
  $.ajax({
    url: servletHttp + "/imAction?userName=" + userName
      + "&smcType=7",
    dataType: "jsonp",
    jsonp: "callback",
    timeout: 60000,
    success: function (json) {
      $("body").find("div#wbim_box").find("div#wbim_tit_lf")
        .find("li[fid='" + json.state + "']").click();
    },
    error: function () {
      //alert("4");
    }
  });
}
// 发送信息
function sendMessage(userName, toName, message) {
//	alert("sendMessage");
  var flag = false;
  $.ajax({
    url: servletHttp + "/imAction?userName=" + userName
      + "&toName=" + toName + "&sendMessage="
      + encodeURI(encodeURI(message)) + "&smcType=3",
    dataType: "jsonp",
    jsonp: "callback",
    timeout: 10000,
    success: function (json) {
      flag = true;
    },
    error: function () {
      //alert("6");
    }
  });
  setTimeout(function () {
    if (!flag) {
      fancyAlert("【" + message + "】发送失败，请重新发送。", 0);
    }
  }, 10000);
}
// 收取由我发起的对话的线程消息
function getToMessage(userName, timeStr) {
  $.ajax({
    url: servletHttp + "/imAction?userName=" + userName + "&timeStr=" + timeStr + "&smcType=5",
    dataType: "jsonp",
    jsonp: "callback",
    timeout: 60000,
    success: function (json) {
      var _this = $("body").find("div#wbim_box");
      if (json != null) {
        var data = json.list;
        if (data.length != 0) {
          for (var i = 0; i < data.length; i++) {
            var uid = data[i].sendUser;
            var sendname = data[i].sendUname;
            var o = _this.find("dl[uid='" + uid + "']");
            var p = _this.find("ul#wbim_chat_friend_list");
            var m = _this.find("div#wbim_chat_list");
            var q = _this.find("#wbim_list_box").find("li[uid='" + uid + "']");
            var clas = "";
            if (q.size() == 0) {
              clas = "wbim_status_offline";
            } else {
              clas = q.find("span#wbim_state_fr").attr("class");
            }
            if (o.size() == 0) {
              // 和该好友的对话框不存在
              // 新建对话框
              // 对话框左侧加入说话者

              var oclass = "";
              if (p.find("li").size() != 0) {
                oclass = "wbim_highlight";
              } else {
                oclass = "wbim_active";
              }
              p.append("<li node-type='user_root' uid='"
                + uid
                + "' title='"
                + sendname
                + "'class='"
                + oclass
                + "'>"
                + "<div class='wbim_userhead'>"
                + "<img node-type='wbim_userhead' src='upload_files/avatar/im/" + uid + ".jpg' onerror=\"this.src='dcp/comm/image/on_error_s.gif'\" alt='"
                + sendname
                + "'>"
                + "<span node-type='wbim_status' class='"
                + clas
                + "'></span>"
                + "</div>"
                + "<div node-type='wbim_username' class='wbim_username'>"
                + sendname
                + "</div>"
                + "<a node-type='wbim_icon_close_s' class='wbim_icon_close_s' name='wbim_icon_close' href='javascript:void(0)' hidefocus='true'></a>"
                + "</li>");
              // 在新建中间对话记录的div
              m.append("<dl uid='" + uid + "'></dl>");
              initTalk(userName, uid);
              o = _this.find("dl[uid='" + uid + "']");
              if (_this.find("dl").size() == 1) {
                p.find("li[uid='" + uid + "']").click();
                openDialog(userName, uid);
              } else {
                o.hide();
              }
              o.parent().scrollTop(99999999);
            } else {
              if (p.find("li[uid='" + uid + "']").attr("class") != "wbim_active") {
                p.find("li[uid='" + uid + "']").attr("class", "wbim_highlight");
              }
              initTalk(userName, uid);
              p.find("li[uid='" + uid + "']").show();
              o = _this.find("dl[uid='" + uid + "']");
              o.parent().scrollTop(99999999);
            }
          }

          // 如果对话框隐藏了
          if (_this.find("div#wbim_chat_box").css("display") == "none") {
            _this.find("div#wbim_min_box_col_change").attr("class",
              "wbim_min_box_col3");
            _this.find("div#wbim_min_chat")
              .addClass("wbim_min_chat_msg");
            _this.find("span#wbim_min_text_pre").text("");
            _this.find("span#wbim_min_text").text("");
            _this.find("span#span_wbim_min_nick").text("您有新信息");
            _this.find("div#wbim_min_chat").show();

          }
          timeS = data[data.length - 1].sendTime.time;
          if (timeS != null) {
            $.cookie(userName + "Times", timeS);
          }
        }
      }
      getToMessage(userName, timeS);
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      if (textStatus == "timeout") {
        getToMessage(userName, timeS);
      }
    }
  });
}


function compareInt(int1, int2) {
  var iNum1 = parseInt(int1);//强制转换成int 型;
  var iNum2 = parseInt(int2);
  if (iNum1 < iNum2) {
    return -1;
  } else if (iNum1 > iNum2) {
    return 1;
  } else {
    return 0;
  }
}
function getTimes() {
  var _this = $("body").find("div#wbim_box");
  var rows = [];
  var i = 0;
  var entys = _this.find("div.msg_time");
  if (entys.size() == 0) {
    return "";
  } else {
    entys.each(function () {
      var o = $(this);
      rows[i] = parseInt(o.attr("fv"));
      i++
    });
    rows.sort(compareInt);
    return rows[rows.length - 1] + "";
  }
}

var retData = {
    list: [
      {
        groupName: 'admin',
        avNum: '2',
        res: [
          {
            id_number: '1234',
            name: 'ww',
            ava: 'false',
            state: '在线'
            },{
            id_number: '3123',
            name: 'ww2',
            ava: 'false',
            state: '在线'
          }
          ]
        }
      ]
    };

// 获取好友分组以及分组下在线好友
function getGroups(userName) {
   //alert("getGroups");
  var json = retData;
  if (json != null) {
    // 取得在线好友数量
    var inum = 0;
    for (var i = 0; i < json.list.length; i++) {
      inum = inum + json.list[i].avNum;
    }
    $("span#wbim_online_count").text(inum);
    // 好友列表页面渲染
    renderTplim($("#wbim_list_box"),
      "im/imWeb_groups.html", json);
    getStateMine(userName);
    $("body").find("div#wbim_box").show();
    //显示快捷图标
    $("body").find("div#shortcut_div").show();
    /*edp.portal.loadJS("im/imemotion.js", true);
    edp.portal.loadJS("im/imfresh.js", true);
    edp.portal.loadJS("im/imtwitter.js", true);*/

    var _this = $("#wbim_list_box");
    var _that = $("body").find("div#wbim_box");
    // 分组名点击效果
    /*_this.delegate("div[name='wbim_list_group']", "click",
      function () {
        var o = $(this);
        var otype = o.attr("ftype");
        if (otype == 0) {
          // 关闭状态点击
          o.removeClass("wbim_close");
          o.addClass("wbim_open");
          o.attr("ftype", "1");
          o.parent().find("ul").show();
        } else if (otype == 1) {
          // 打开状态点击
          o.removeClass("wbim_open");
          o.addClass("wbim_close");
          o.attr("ftype", "0");
          o.parent().find("ul").hide();
        }
        return false;
      });*/
    // 打开对话框
    _this.delegate("li", "click", function () {
      var rightLi = $(this);
      var chattingLeftList = _that.find("ul#wbim_chat_friend_list");//真正聊天的用户
      var currentUserLi = chattingLeftList.find("li[uid='" + rightLi.attr("uid") + "']");
      var messageList = _that.find("div#wbim_chat_list");
      // 先判断对话框是否存在
      if (currentUserLi.size() == 0) {
        // 对话框左侧加入说话者
        chattingLeftList
          .append("<li node-type='user_root' uid='"
            + rightLi.attr("uid")
            + "' title='"
            + rightLi.attr("title")
            + "'class='wbim_offline'>"
            + "<div class='wbim_userhead'>"
            + "<img node-type='wbim_userhead' src='upload_files/avatar/im/" + rightLi.attr("uid") + ".jpg' onerror=\"this.src='dcp/comm/image/on_error_s.gif'\"  alt='"
            + rightLi.attr("title")
            + "'>"
            + "<span node-type='wbim_status' class='"
            + rightLi.find("#wbim_state_fr")
            .attr("class")
            + "'></span>"
            + "</div>"
            + "<div node-type='wbim_username' class='wbim_username'>"
            + rightLi.attr("title")
            + "</div>"
            + "<a node-type='wbim_icon_close_s' name='wbim_icon_close' class='wbim_icon_close_s'  href='javascript:void(0)' hidefocus='true'></a>"
            + "</li>");
        // 在新建中间对话记录的div
        messageList.append("<dl uid='" + rightLi.attr("uid") + "'></dl>");
        initTalk(userName, rightLi.attr("uid"));
        chattingLeftList.find("li[uid='" + rightLi.attr("uid") + "']").click();
      } else {
        chattingLeftList.find("li[uid='" + rightLi.attr("uid") + "']").show();
        chattingLeftList.find("li[uid='" + rightLi.attr("uid") + "']").click();
      }
      _that.find("div#wbim_min_box_col_change").attr("class",
        "wbim_min_box_col3");
      _that.find("div#wbim_min_chat").show();
      _that.find("div#wbim_chat_box").show();

      //定位快捷图标
      $("div#shortcut_div").css({"position": "absolute", "right": "421px", "bottom": "0px", "z-index": "1001"});

      _that.find("dl[uid='" + rightLi.attr("uid") + "']").parent().scrollTop(99999999);
      openDialog(userName, rightLi.attr("uid"));
      return false;
    });

    //获取聊天消息
   /* setTimeout(function () {
      getToMessage(userName, timeS);
    }, 2000);*/
    //获取好友状态变更
    setTimeout(function () {
      getPresen(userName, timeP);
    }, 4000);

    //将获取聊天消息，好友状态变更两个长连接合并为一个长连接
    //setTimeout(function() {
    //	getMessageAndFriendState(userName,timeS);
    //}, 2000);

  }

}

function changePresence(userName, status, callback) {
//	alert("changePresence");
  $.ajax({
    url: servletHttp + "/imAction?userName=" + userName
      + "&status=" + encodeURI(encodeURI(status))
      + "&smcType=4",
    dataType: "jsonp",
    jsonp: "callback",
    timeout: 60000,
    success: function (json) {
      callback();
    },
    error: function () {
      ////alert("6");
    }
  });
}

var retPresenData = {
  list: [

        {
          id_number: '1234',
          name: 'ww',
          ava: 'false',
          state: '在线',
          groupName:'admin'
        },{
          id_number: '3123',
          name: 'ww2',
          ava: 'false',
          state: '在线',
      groupName:'admin'
        }
      ]
};

// 收取我监听到的好友状态变化
function getPresen(userName, timePs) {
  var json = retPresenData;


      if (json != null) {
        var data = json.list;
        if (data != null && data.length != 0) {
          for (var i = 0; i < data.length; i++) {
            var state = data[i].state;
            var uid = data[i].id_number;
            var groupName = data[i].groupName;
            var _that = $("body").find("div#wbim_box");
            var _this = $("#wbim_list_box");
            var toName = _that.find("ul#wbim_chat_friend_list")
              .find("li.wbim_active").attr("uid");
            var toLeft = _that.find("ul#wbim_chat_friend_list")
              .find("li[uid='" + uid + "']").find("span");
            var toTop = _that.find("span#wbim_tit_lf_state_class");
            if (state == "离线") {
              _this.find("li[uid='" + uid + "']").attr("fx", "1");
              //_this.find("li[uid='" + uid + "']").hide();
              _this.find("li[uid='" + uid + "']").find("span#wbim_state_fr").attr("class", "wbim_status_offline");
              $("span#wbim_online_count").text(_this.find("li[fx='0']").size());
              _this.find("div[name='wbim_list_group']").each(
                function () {
                  var o = $(this);
                  var z = 0;
                  o.parent().find("li[fx='0']").each(
                    function () {
                      if ($(this).css("display") != "none") {
                        z++;
                      }
                    });
                  o.find("span#span_num_insert").text(z);
                });
              toLeft.attr("class", "wbim_status_offline");
              if (toName == uid) {
                toTop.attr("class", "wbim_status_offline");
              }
              //如果好友离线，那么将这个好友头像放到该组的最下面
              var g_obj = _this.find("div[title='" + groupName + "']").parent();
              _this.find("li[uid='" + uid + "']").appendTo(g_obj.find("ul")).end();

            } else if (state == "在线") {
              if (_this.find("li[uid='" + uid + "']").size() == 1) {
                _this.find("li[uid='" + uid + "']").attr("fx", "0");
                _this.find("li[uid='" + uid + "']")
                  .find("span#wbim_state_fr").attr("class",
                    "wbim_status_online");
//							_this.find("li[uid='" + uid + "']").show();
                //如果好友刚刚上线，那么将这个好友置顶
                var g_obj = _this.find("div[title='" + groupName + "']").parent();
                _this.find("li[uid='" + uid + "']").prependTo(g_obj.find("ul")).end();
              } else {
                var g_obj = _this.find("div[title='" + groupName + "']").parent();
                g_obj.find("ul").append("<li uid='" + uid + "' jid='" + data[i].jid + "' title='" + data[i].name + "' fx='0'>"
                  + "<div class='wbim_userhead'>"
                  + "<img src='upload_files/avatar/im/" + uid + ".jpg' onerror=\"this.src='dcp/comm/image/on_error_s.gif'\" >"
                  + "<span style='display: none;' class='wbim_icon_msg_s'></span>"
                  + "<span id='wbim_state_fr' class='wbim_status_online'></span>"
                  + "</div>"
                  + "<div class='wbim_username'>"
                  + data[i].name
                  + "</div>"
                  + "</li>");
              }
              $("span#wbim_online_count").text(_this
                .find("li[fx='0']").size());
              _this.find("div[name='wbim_list_group']").each(
                function () {
                  var o = $(this);
                  var z = 0;
                  o.parent().find("li[fx='0']").each(
                    function () {
                      if ($(this).css("display") != "none") {
                        z++;
                      }
                    });
                  o.find("span#span_num_insert").text(z);
                });
              toLeft.attr("class", "wbim_status_online");
              if (toName == uid) {
                toTop.attr("class", "wbim_status_online");
              }
            } else if (state == "忙碌") {
              _this.find("li[uid='" + uid + "']")
                .find("span#wbim_state_fr").attr("class",
                  "wbim_status_busy");
              toLeft.attr("class", "wbim_status_busy");
              if (toName == uid) {
                toTop.attr("class", "wbim_status_busy");
              }
            } else if (state == "离开") {
              _this.find("li[uid='" + uid + "']")
                .find("span#wbim_state_fr").attr("class",
                  "wbim_status_away");
              toLeft.attr("class", "wbim_status_away");
              if (toName == uid) {
                toTop.attr("class", "wbim_status_away");
              }
            }
          }
          if (data[data.length - 1].preTime.time != null) {
            timeP = data[data.length - 1].preTime.time;
            $.cookie(userName + "Timep", timeP);
          }
        }
      }
      //getPresen(userName, timeP);
}
// 绑定搜索按钮
function searchButton() {
  var _this = $("#wbim_list_box");
  var search_input = $("#search_name_button");

  // 获得焦点
  search_input.focus(function () {
    if ("搜索在线好友" == search_input.val()) {
      search_input.val("");
    }
    return false;
  });

  // 失去焦点
  search_input.blur(function () {
    if ("" == $.trim(search_input.val())) {
      search_input.val("搜索在线好友");
    }
    return false;
  });


}
//重置好友map
function resetFriends(userName) {
  $.ajax({
    url: servletHttp + "/imAction?userName=" + userName
      + "&smcType=9",
    dataType: "jsonp",
    jsonp: "callback",
    timeout: 60000,
    success: function (json) {
    },
    error: function () {
      ////alert("6");
    }
  });
}
//取得服务器端时间
function getServerTimes() {

}

// 初始化聊天记录
function initTalk(userName, toName) {
  $.ajax({
    url: servletHttp + "/imAction?userName=" + userName
      + "&toName=" + toName + "&smcType=8",
    dataType: "jsonp",
    jsonp: "callback",
    timeout: 60000,
    success: function (json) {
      var _this = $("body").find("div#wbim_box");
      var data = json.list;
      var o = _this.find("dl[uid='" + toName + "']");
      o.html("");
      if (data.length != 0) {
        for (var i = 0; i < data.length; i++) {
          var sends = data[i].content.split("\n");
          var strx = "";
          for (var x = 0; x < sends.length; x++) {
//								strx = strx + "<p class='txt'>"+ displayHtmlCode(sends[x]) + "</p>";
            if (sends[x] == "" && x < sends.length - 1) {
              strx = strx + "<p class='txt'><br/></p>";
            } else {
              strx = strx + "<p class='txt'>" + sends[x].replace(/\s/g, '&nbsp;') + "</p>";
            }
          }
          var classname = "";
          if (userName == data[i].sendUser) {
            classname = "wbim_msgr";
          } else {
            classname = "wbim_msgl";
          }
          o.append("<dd class='" + classname + "'>"
            + "<div class='wbim_msgpos'>"
            + "<div class='msg_time' fv='" + data[i].sendTime.time + "'>"
            + formatDtoStrim(data[i].sendTime.time)
            + "</div>" + "<div class='msg_box'>"
            + "<p class='txt'>" + convertImg(strx) + "</p>"
            + "</div>" + "<div class='msg_arr'></div>"
            + "</div>" + "</dd>");
          o.parent().scrollTop(99999999);

        }
      }

    },
    error: function () {
      //////alert("6");
    }
  });
}

var timerArr = null;
//刷新title
function refreshTitile() {
  var size = $("#wbim_chat_friend_list").find("li.wbim_highlight").size();
  var text = $("#wbim_box").find("span#span_wbim_min_nick").text();
  if ((size != 0)
    || ( text == "您有新信息")) {
    if (timerArr == null) {
      timerArr = $.blinkTitle.show();
    }
  } else {
    $.blinkTitle.clear(timerArr);
    timerArr = null;
  }
  setTimeout("refreshTitile()", 1000); //刷新时间
}
$.extend({
  /**
   * 调用方法： var timerArr = $.blinkTitle.show();
   *      $.blinkTitle.clear(timerArr);
   */
  blinkTitle: {
    show: function () {	//有新消息时在title处闪烁提示
      var step = 0, _title = portal_title + portal_version + " | Digitalized " + portal_dcp.toUpperCase();
      var timer = setInterval(function () {
        step++;
        if (step == 3) {
          step = 1
        }
        ;
        if (step == 1) {
          document.title = '【　　　】' + _title
        }
        ;
        if (step == 2) {
          document.title = '【新消息】' + _title
        }
        ;
      }, 500);
      return [timer, _title];
    },
    /**
     * @param timerArr[0], timer标记
     * @param timerArr[1], 初始的title文本内容
     */
    clear: function (timerArr) {	//去除闪烁提示，恢复初始title文本
      if (timerArr) {
        clearInterval(timerArr[0]);
        document.title = timerArr[1];
      }
    }
  }
});

function formatDtoStrim(currentDate) {
  currentDate = new Date(currentDate);
  var currentYear = (currentDate.getYear() < 1900) ? (1900 + currentDate
    .getYear()) : currentDate.getYear();
  var currentDateStr = currentYear + '-'
    + pasTwo((currentDate.getMonth() + 1)) + '-'
    + pasTwo(currentDate.getDate()) + " "
    + pasTwo(currentDate.getHours()) + ":"
    + pasTwo(currentDate.getMinutes());
  return currentDateStr;
}
function pasTwo(str) {
  if (parseFloat(str) < 10) {
    return "0" + str;
  } else {
    return str;
  }
}
function renderTplim(targetObj, templateURL, data) {
  var splitor = templateURL.indexOf("?") == -1 ? "?" : "&";
  $(targetObj).setTemplateURL(
    templateURL + splitor + "date=" + (+new Date()), null, {
      filter_data: false
    }).processTemplate(data);
}

function displayHtmlCode(str) {
  if (str != null) {
    // 将字符串转换成数组
    var strArr = str.split('');
    // HTML页面特殊字符显示，空格本质不是，但多个空格时浏览器默认只显示一个，所以替换
    var htmlChar = "&<>";
    for (var i = 0; i < str.length; i++) {
      // 查找是否含有特殊的HTML字符
      if (htmlChar.indexOf(str.charAt(i)) != -1) {
        // 如果存在，则将它们转换成对应的HTML实体
        switch (str.charAt(i)) {
          case '<' :
            strArr.splice(i, 1, '&#60;');
            break;
          case '>' :
            strArr.splice(i, 1, '&#62;');
            break;
          case '&' :
            strArr.splice(i, 1, '&#38;');
        }
      }
    }
    return strArr.join('');
  }
}

// 区分浏览器来判断输入框的字符长度
function fixLength() {
  var obj = document.getElementById("wbim_chat_input_ta");
  var objtext_length = $("#atra_num");
  if ("\v" == "v") {
    obj.attachEvent("onpropertychange", webChange);
  } else {
    obj.addEventListener("input", webChange, false);
  }
  function webChange() {
    if (obj.value != null) {
      var textarea_val = obj.value.replace(/[\r\n]/g, "");
      var curLength = textarea_val.length;
      if (curLength > 1000) {
        objtext_length.css("color", "red");
      } else {
        objtext_length.css("color", "#99999999");
      }
      objtext_length.text(curLength);
      return false;
    }
  }
}
// trim方法
String.prototype.trim = function () {
  return this.replace(/(^\s*)|(\s*$)/g, "");
}


//李彪-----收取自己的消息和好友的状态----2013-1-8
function getMessageAndFriendState(userName, timeStr) {
  var timeP = $.cookie(userName + "Timep");
  $.ajax({
    url: servletHttp + "/imAction?userName=" + userName + "&timeStr=" + timeStr + "&timep=" + timeP + "&smcType=9",
    dataType: "jsonp",
    jsonp: "callback",
    timeout: 60000,
    success: function (result) {
      if (result != null && result) {
        var message = result.map.message;
        receiveMessage(message, userName);
        var userState = result.map.userState;
        changeFriendsState(userState, userName);
      }
      getMessageAndFriendState(userName, timeS);
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      if (textStatus == "timeout") {
        getMessageAndFriendState(userName, timeS);
      }
    }
  });
}

//李彪-----收取自己的消息----2013-1-8
function receiveMessage(json, userName) {
  var _this = $("body").find("div#wbim_box");
  if (json != null) {
    var data = json.list;
    if (data.length != 0) {
      for (var i = 0; i < data.length; i++) {
        var uid = data[i].sendUser;
        var sendname = data[i].sendUname;
        var o = _this.find("dl[uid='" + uid + "']");
        var p = _this.find("ul#wbim_chat_friend_list");
        var m = _this.find("div#wbim_chat_list");
        var q = _this.find("#wbim_list_box").find("li[uid='" + uid + "']");
        var _s = _this.find("li[uid='" + uid + "']");
        //好友状态
        var clas = _s.find("#wbim_state_fr").attr("class");
        if (!clas) {
          clas = "wbim_status_offline";
        }
        if (o.size() == 0) {
          // 和该好友的对话框不存在
          // 新建对话框
          // 对话框左侧加入说话者
          var oclass = "";
          if (p.find("li").size() != 0) {
            oclass = "wbim_highlight";
          } else {
            oclass = "wbim_active";
          }
          p
            .append("<li node-type='user_root' uid='"
              + uid
              + "' title='"
              + sendname
              + "'class='"
              + oclass
              + "'>"
              + "<div class='wbim_userhead'>"
              + "<img node-type='wbim_userhead' src='upload_files/avatar/im/" + uid + ".jpg' onerror=\"this.src='dcp/comm/image/on_error_s.gif'\" alt='"
              + sendname
              + "'>"
              + "<span node-type='wbim_status' class='"
              + clas
              + "'></span>"
              + "</div>"
              + "<div node-type='wbim_username' class='wbim_username'>"
              + sendname
              + "</div>"
              + "<a node-type='wbim_icon_close_s' class='wbim_icon_close_s' name='wbim_icon_close' href='javascript:void(0)' hidefocus='true'></a>"
              + "</li>");
          // 在新建中间对话记录的div
          m.append("<dl uid='" + uid + "'></dl>");
          initTalk(userName, uid);
          o = _this.find("dl[uid='" + uid + "']");
          if (_this.find("dl").size() == 1) {
            p.find("li[uid='" + uid + "']").click();
            openDialog(userName, uid);
          } else {
            o.hide();
          }
          o.parent().scrollTop(99999999);
        } else {
          if (p.find("li[uid='" + uid + "']").attr("class") != "wbim_active") {
            p.find("li[uid='" + uid + "']").attr("class", "wbim_highlight");
          }
          initTalk(userName, uid);
          p.find("li[uid='" + uid + "']").show();
          o = _this.find("dl[uid='" + uid + "']");
          o.parent().scrollTop(99999999);
        }
      }

      // 如果对话框隐藏了
      if (_this.find("div#wbim_chat_box").css("display") == "none") {
        _this.find("div#wbim_min_box_col_change").attr("class",
          "wbim_min_box_col3");
        _this.find("div#wbim_min_chat")
          .addClass("wbim_min_chat_msg");
        _this.find("span#wbim_min_text_pre").text("");
        _this.find("span#wbim_min_text").text("");
        _this.find("span#span_wbim_min_nick").text("您有新信息");
        _this.find("div#wbim_min_chat").show();

      }
      timeS = data[data.length - 1].sendTime.time;
      if (timeS != null) {
        $.cookie(userName + "Times", timeS);
      }
    }
  }
}

//李彪----好友的状态变更----2013-1-8
function changeFriendsState(json, userName) {
  if (json != null) {
    var data = json.list;
    if (data.length != 0) {
      for (var i = 0; i < data.length; i++) {
        var state = data[i].state;
        var uid = data[i].id_number;
        var groupName = data[i].groupName;
        var _that = $("body").find("div#wbim_box");
        var _this = $("#wbim_list_box");
        var toName = _that.find("ul#wbim_chat_friend_list")
          .find("li.wbim_active").attr("uid");
        var toLeft = _that.find("ul#wbim_chat_friend_list")
          .find("li[uid='" + uid + "']").find("span");
        var toTop = _that.find("span#wbim_tit_lf_state_class");
        if (state == "离线") {
          _this.find("li[uid='" + uid + "']").attr("fx", "1");
//					_this.find("li[uid='" + uid + "']").hide();
          _this.find("li[uid='" + uid + "']").find("span#wbim_state_fr").attr("class", "wbim_status_offline");

          $("span#wbim_online_count").text(_this.find("li[fx='0']").size());
          _this.find("div[name='wbim_list_group']").each(
            function () {
              var o = $(this);
              var z = 0;
              o.parent().find("li[fx='0']").each(
                function () {
                  if ($(this).css("display") != "none") {
                    z++;
                  }
                });
              o.find("span#span_num_insert").text(z);
            });
          toLeft.attr("class", "wbim_status_offline");
          if (toName == uid) {
            toTop.attr("class", "wbim_status_offline");
          }

          var g_obj = _this.find("div[title='" + groupName + "']").parent();
          _this.find("li[uid='" + uid + "']").appendTo(g_obj.find("ul")).end();

        } else if (state == "在线") {
          if (_this.find("li[uid='" + uid + "']").size() == 1) {
            _this.find("li[uid='" + uid + "']").attr("fx", "0");
            _this.find("li[uid='" + uid + "']")
              .find("span#wbim_state_fr").attr("class", "wbim_status_online");
//						_this.find("li[uid='" + uid + "']").show();
            var g_obj = _this.find("div[title='" + groupName + "']").parent();
            _this.find("li[uid='" + uid + "']").prependTo(g_obj.find("ul")).end();
          } else {
            var g_obj = _this.find("div[title='" + groupName + "']").parent();
            g_obj.find("ul").append("<li uid='" + uid + "' jid='" + data[i].jid + "' title='" + data[i].name + "' fx='0'>"
              + "<div class='wbim_userhead'>"
              + "<img src='upload_files/avatar/im/" + uid + ".jpg' onerror=\"this.src='dcp/comm/image/on_error_s.gif'\" >"
              + "<span style='display: none;' class='wbim_icon_msg_s'></span>"
              + "<span id='wbim_state_fr' class='wbim_status_online'></span>"
              + "</div>"
              + "<div class='wbim_username'>"
              + data[i].name
              + "</div>"
              + "</li>");
          }
          $("span#wbim_online_count").text(_this.find("li[fx='0']").size());
          _this.find("div[name='wbim_list_group']").each(
            function () {
              var o = $(this);
              var z = 0;
              o.parent().find("li[fx='0']").each(
                function () {
                  if ($(this).css("display") != "none") {
                    z++;
                  }
                });
              o.find("span#span_num_insert").text(z);
            });
          toLeft.attr("class", "wbim_status_online");
          if (toName == uid) {
            toTop.attr("class", "wbim_status_online");
          }
        } else if (state == "忙碌") {
          _this.find("li[uid='" + uid + "']")
            .find("span#wbim_state_fr").attr("class",
              "wbim_status_busy");
          toLeft.attr("class", "wbim_status_busy");
          if (toName == uid) {
            toTop.attr("class", "wbim_status_busy");
          }
        } else if (state == "离开") {
          _this.find("li[uid='" + uid + "']")
            .find("span#wbim_state_fr").attr("class", "wbim_status_away");
          toLeft.attr("class", "wbim_status_away");
          if (toName == uid) {
            toTop.attr("class", "wbim_status_away");
          }
        }
      }
      if (data[data.length - 1].preTime.time != null) {
        timeP = data[data.length - 1].preTime.time;
        $.cookie(userName + "Timep", timeP);
      }
    }
  }
}
