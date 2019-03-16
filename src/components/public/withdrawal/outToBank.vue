<template>
    <div>
        <div id="bank_recharge" class="bg_f bankrecharge" style="height:800px;">
            <p class="recharge_tit Ft-S18 Color_black Pd-L22 Pd-T24 Pd-B24 Mg-B10">
                提现到银行卡
            </p>
            <table class="Mg-T34">
                <tr height="40px">
                    <td width="104px" class="Ft-S16 Color_black" align="right">
                        账户余额
                    </td>
                    <td class="Pd-L44 Ft-S16 Color_gray6">13412元</td>
                </tr>
                <tr height="60px">
                    <td width="104px" class="Ft-S16 Color_black" align="right">银行卡</td>
                    <td class="Pd-L44 Ft-S16 Color_gray6">
                        <!-- {{}} -->
                        <i class="bank_CMBC"></i>
                        招商银行 6222545645646464456
                    </td>
                </tr>
                <tr class="">
                    <td width="104px" class="Ft-S16 Color_black" align="right" style="position:relative;top:-10px;">
                        提现金额
                    </td>
                    <td class="Pd-L44 Ft-S16 Color_gray6 Pd-T10">
                        <input type="text" id="price" placeholder="输入金额" />
                        <span>元</span>
                        <p class="Color_grayA Ft-S14 Mg-T10">（每月前5次提现免费）</p>
                    </td>
                </tr>
                <tr class="">
                    <td width="104px" class="Ft-S16 Color_black" align="right" style="position:relative;top:-10px;">
                        支付密码
                    </td>
                    <td class="Pd-L44 Ft-S16 Color_gray6">
                        <ul id="ul" class="Mg-T30">
                            <input type="password" />
                            <input type="password" />
                            <input type="password" />
                            <input type="password" />
                            <input type="password" />
                            <input type="password" />
                        </ul>
                        <p class="Mg-T10 Mg-B16 Color_gray6">
                            <span class="">请输入6位数字支付密码</span><span class="Mg-L54" style="color: #4281D7;cursor: pointer;" id="wjdialog">忘记密码？</span>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td class="Pd-L44 Pd-T40">
                        <button class="bankrecharge Ft-S16" id="checkwithdraw">确认</button>
                    </td>
                </tr>
            </table>
        </div>
        <div id="SectionBox">
            <div class="layer_notice hide">
                <div class="form_content_action" id="layer">
                    <form class="layui-form Mg-T40" action="">
                        <div class="layui-form-item Mg-B24">
                            <label class="layui-form-label">手机号：</label>
                            <div class="layui-input-inline">
                                <input type="tel" name="phone" required lay-verify="required" style="width:300px" placeholder="" disabled autocomplete="off" class="layui-input Mg-L16" id="phone" maxlength="11" value="}" />
                            </div>
                        </div>
                        <div class="layui-form-item Mg-B24">
                            <label class="layui-form-label">验证码：</label>
                            <div class="layui-input-inline  Mg-L16">
                                <input type="tel" name="code" required lay-verify="required" style="width:210px" placeholder="请输入密码" autocomplete="off" maxlength="4" class="layui-input" id="code" />
                            </div>
                            <div class="layui-form-mid layui-word-aux Mg-L20 ac pointer" id="getcode">
                                获取验证码
                            </div>
                        </div>
                        <div class="layui-form-item  Mg-B24">
                            <label class="layui-form-label">支付密码：</label>
                            <div class="layui-input-inline Mg-L16">
                                <ul id="ul1">
                                    <input type="password" />
                                    <input type="password" />
                                    <input type="password" />
                                    <input type="password" />
                                    <input type="password" />
                                    <input type="password" />
                                </ul>
                                <p class="Mg-T10 Mg-B20 Color_gray6">请输入6位数字支付密码</p>
                                <ul id="ul2">
                                    <input type="password" />
                                    <input type="password" />
                                    <input type="password" />
                                    <input type="password" />
                                    <input type="password" />
                                    <input type="password" />
                                </ul>
                                <p class="Mg-T10 Mg-B16 Color_gray6">请再次确定支付密码</p>
                            </div>
                        </div>
                        <div class="Mg-B24">
                            <div class="layui-input-block">
                                <a class="layui-btn" id="onsubmit">确认</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: '',
    data() {
        return {

        }
    },
    mounted() {
        this.initdata()
    },
    methods: {
        initdata() {
 layui.use(["layer"], function() {
    var $ = layui.jquery;
    $("#money").val(); //提现金额 各种验证
    $("#checkwithdraw").on("click", function() {
      //充值
      window.location.href = "/shanghu/account/withdraw_deposit_submit";
    });

    $("#wjdialog").on("click", function() {
      $("#SectionBox input").each(function(i) {
        $(this).val("");
      });
      layer.open({
        type: 1,
        shade: false,
        closeBtn: 1,
        title: "忘记交易密码",
        content: $(".layer_notice"),
        area: ["560px", "500px"],
        cancel: function() {}
      });
    });
    $("#ul1>input").on("keypress", function() {
      $(this).val("");
      var $input = $(this).next("input");
      if ($input.length > 0) {
        $input.focus();
      }
    });
    $("#ul2>input").on("keypress", function() {
      $(this).val("");
      var $input = $(this).next("input");
      if ($input.length > 0) {
        $input.focus();
      }
    });
    var noneclick = false;
    $("#getcode").on("click", function() {
      //获取验证码
      var isphone = /^1[34578]\d{9}$/;
      if (!isphone.test($("#phone").val())) {
        layer.msg("请输入正确的手机号");
        return;
      }
      if (noneclick) {
        return;
      }
      var time = 60;
      $(this).text("(60s)重获");
      var _this = $(this);
      var settime = setInterval(function() {
        if (!time) {
          noneclick = false;
          _this.text("重新获取");
          clearInterval(settime);
          return;
        }
        noneclick = true;
        time--;
        _this.text("(" + time + "s)重获");
      }, 1000);
    });
    $("#ul>input").on("keypress", function() {
      $(this).val("");
      var $input = $(this).next("input");
      if ($input.length > 0) {
        $input.focus();
      }
    });

      $('#onsubmit').on('click', function () {//提交
          var isphone = /^1[34578]\d{9}$/;
          var codeNum = /^\d{4}$/;
          var passNum = /^\d{6}$/;
          var num = '';//密码
          var num1 = '';//再次输入的密码
          var code = $('#code').val();
          // $('#phone').val() 手机号
          //$('#code').val() 验证码
          $('#ul1>input').each(function (i) {
              if ($(this).val()) {
                  num += $(this).val();
              }
          })
          $('#ul2>input').each(function (i) {
              if ($(this).val()) {
                  num1 += $(this).val();
              }
          })
          /*if(!isphone.test($('#phone').val())) {
           layer.msg('请输入正确的手机号');
           return
           }*/

          if (!codeNum.test(code)) {
              layer.msg('请输入正确的验证码');
              return
          }
          if (!(num.length == 6) || !passNum.test(num)) {
              layer.msg('请输入正确密码');
              return
          }
          if (!(num1.length == 6) || !passNum.test(num1)) {
              layer.msg('请再次确认密码');
              return
          }
          if (num != num1) {
              layer.msg('两次输入的密码不一致');
              return
          }

        })
    });
        }
    }
}
</script>

<style scoped lang="less">
//银行卡充值
.bankrecharge {
  ul {
    overflow: hidden;
    width: 300px;
    input {
      float: left;
      width: 50px;
      height: 40px;
      text-align: center;
      border: 1px solid #ddd;
      border-right: none !important;
    }
    input:hover {
      border-right: none !important;
    }
    input:last-child {
      border-right: 1px solid #ddd !important;
    }
    input:focus {
      border: 1px solid rgba(66, 129, 215, 1) !important;
      border-right: 1px solid rgba(66, 129, 215, 1) !important;
    }
  }
}
#bank_recharge {
  .recharge_tit {
    border-bottom: 1px solid #f1f2f9;
  }
  #price {
    border: 1px solid #c2c2c3;
    width: 160px;
    height: 36px;
    padding-left: 10px;
  }
  input:focus,
  input:hover {
    border: 1px solid #c2c2c3;
  }
  .getcode {
    border: 1px solid #3196ff;
    color: #3196ff;
    display: inline-block;
    width: 80px;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    border-radius: 3px;
    text-align: center;
    cursor: pointer;
  }
  .bankrecharge {
    width: 110px;
    height: 40px;
    background: #3196ff;
    border: none;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
  }
}
  .form_content_action {
    input {
      height: 40px !important;
      border: 1px solid #ddd !important;
    }
    input:focus {
      border: 1px solid #ddd !important;
    }
    input:hover {
      border: 1px solid #ddd !important;
    }
    .layui-form-label {
      width: 130px;
    }
    .layui-form-mid {
      margin-top: 5px;
      border: 1px solid #4281d7;
      color: #4281d7 !important;
      width: 80px;
      height: 30px;
      padding: 0 !important;
      line-height: 30px;
      margin-right: 0px;
      border-radius: 3px;
    }
    .layui-btn {
      width: 140px;
      height: 40px;
      background: rgba(66, 129, 215, 1);
      border-radius: 4px;
      margin-left: 80px;
    }
    .layui-layer-setwin {
      top: 20px;
    }
    ul {
      overflow: hidden;
      width: 300px;
      input {
        float: left;
        width: 50px;
        height: 40px;
        text-align: center;
        border-right: none !important;
      }
      input:hover {
        border-right: none !important;
      }
      input:last-child {
        border-right: 1px solid #ddd !important;
      }
      input:focus {
        border: 1px solid rgba(66, 129, 215, 1) !important;
        border-right: 1px solid rgba(66, 129, 215, 1) !important;
      }
    }
  }
</style>
