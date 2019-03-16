<template>
    <div id="bank_recharge" class="bg_f" style="height:800px;">
        <p class="recharge_tit Ft-S18 Color_black Pd-L22 Pd-T24 Pd-B24 Mg-B10">
            充值
        </p>
        <table class="Mg-T24">
            <tr height="50px">
                <td width="104px" class="Ft-S16 Color_black" align="right">
                    账户余额
                </td>
                <td class="Pd-L44 Ft-S16 Color_gray6">9000.00元</td>
            </tr>
            <tr height="50px">
                <td width="104px" class="Ft-S16 Color_black" align="right">银行卡</td>
                <td class="Pd-L44 Ft-S16 Color_gray6">
                    <i class="bank_CMBC"></i>招商银行 232112********7777
                </td>
            </tr>
            <tr height="50px" class="hide">
                <td width="104px" class="Ft-S16 Color_black" align="right">
                    充值金额
                </td>
                <td class="Pd-L44 Ft-S16 Color_gray6">
                    <input type="text" id="price" placeholder="输入金额" />
                    <span>元</span>
                </td>
            </tr>
            <tr>
                <td width="104px" class="Ft-S16 Color_black Pd-T32" align="right">
                    验证码
                </td>
                <td class="Pd-L44 Ft-S16 Color_gray6">
                    <p class="Ft-S12 Color_gray6 Pd-T16" style="margin-bottom:5px;">
                        验证码已发送手机号<span>176****6655</span>
                    </p>
                    <input type="text" id="price" placeholder="输入验证码" />
                    <span class="getcode">获取验证码</span>
                </td>
            </tr>
            <tr>
                <td></td>
                <td class="Pd-L44 Pd-T40">
                    <button class="bankrecharge Ft-S16" id="checkcharge">确认充值</button>
                </td>
            </tr>
        </table>
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
            layui.use(["layer"], function () {
                var $ = layui.jquery;
                var timeclock = false;
                $("#money").val(); //充值金额 各种验证
                $(".getcode").on("click", function () {
                    var num = 60;
                    if (timeclock) {
                        return;
                    }
                    var time = setInterval(function () {
                        if (!num) {
                            $(".getcode").text("重新获取");
                            clearInterval(time);
                            timeclock = false;
                            return;
                        }
                        num--;
                        timeclock = true;
                        $(".getcode").text(num + "s重新获取");
                    }, 1000);
                });
                $('#checkcharge').on('click', function () { //充值
                    window.location.href = "/shanghu/account/recharge_bank_success"
                })
            });
        }
    }
}
</script>

<style scoped lang="less">
//银行卡充值
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
</style>
