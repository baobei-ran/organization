<template>
    <div id="lyt_recharge" class="bg_f">
        <p class="recharge_tit Ft-S16 Color_black Pd-L22 Pd-T24 Pd-B24 Mg-B10">
            充值
        </p>
        <div class="layui-form-item Mg-T24 Mg-B40">
            <label class="layui-form-label" style="width:150px">请输入充值金额：</label>
            <div class="layui-input-inline">
                <input type="number" v-model='price' name="password" required lay-verify="required" placeholder="请输入金额" autocomplete="off" class="layui-input" id="money" />
            </div>
            <div class="layui-form-mid layui-word-aux">元</div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label" style="width:150px; padding-top:0px;">请选择充值方式：</label>
            <span class="paytype icon_wx Mg-R24">微信支付</span>
            <span class="paytype icon_zfb Mg-R24">支付宝支付</span>
            <span class="paytype icon_yl">银行卡</span>
        </div>
        <div class="layui-form-item Mg-T40">
            <button class="layui-btn layui-btn-normal" style="margin-left:150px" id="onsubmit">
                立即充值
            </button>
        </div>
        <div class="wx_dialig ac hide">
            <div class="Mg-T56" style="width:200px;height:200px;background: #eee; margin: 0 auto">
                <img id="wxurl" :src="wxUrl" width="180px" height="180px;" class="Mg-T10" alt="" />
            </div>
            <p class="Ft-S30 Fw700 Color_black Mg-T18 Mg-B26">
                ¥<span id="wxmoney">{{ price }}</span>
            </p>
            <p class="Ft-S16 Color_black">请使用微信扫码支付</p>
        </div>

        <div class="alipay_dialog ac hide">
            <div class="Mg-T56" style="width:200px;height:200px;background: #eee; margin: 0 auto">
                <iframe id="aliurl" :src="zfbUrl" frameborder="0"
                    width="180px"
                    height="180px;"
                    marginwidth="0"
                    marginheight="0"
                    scrolling="no"
                    allowtransparency="yes"
                ></iframe>
            </div>
            <p class="Ft-S30 Fw700 Color_black Mg-T18 Mg-B26">
                ¥<span>{{ price }}</span>
            </p>
            <p class="Ft-S16 Color_black">请使用支付宝扫码支付</p>
        </div>

        <div class="alipay_success ac hide">
            <img src="../../common/image/pages/account/icon_czcg.png" style="margin-top:110px" alt="" />
            <!--
          <img
            src="../../common/image/pages/account/icon_czsb.png"
            style="margin-top:110px"
            alt=""
          />
        -->
            <p class="Mg-T20 Pd-B50">充值成功！</p>
            <!-- <p class="Mg-T20 Pd-B50">充值失败，余额不足</p> -->
            <button class="Mg-T30 gobacklyt Color_white Ft-S16" style="width: 140px;
            height: 40px;
            background: #3196FF;
            border:none;
            border-radius: 5px;
            pointer">
                返回鲁医通账户
            </button>
        </div>
    </div>
</template>
<script>
export default {
    name: '',
    data() {
        return {
            price: '',   // 监听金额
            wxUrl: '',   //  微信返回的二维码
            zfbUrl: ''   // 支付宝的路径
        }
    },
    computed: {
       
    },
    mounted() {
        this.initdata()
    },
    methods: {
        initdata() {
            var _this = this;
            layui.use(["layer"], function () {
                var $ = layui.jquery;
                var paytext = "";
                var selectstatus = function () {
                    //成功失败
                    layer.open({
                        type: 1,
                        title: "<span class='Color_black Ft-S18'>支付宝充值</span>",
                        area: ["400px", "460px"], //宽高
                        content: $(".alipay_success")
                    });
                };
                $(".paytype").each(function () {
                    $(this).on("click", function () {
                        $(".paytype").each(function (i) {
                            $(this).attr("style", "border:1px solid #DDDDDD");
                        });
                        $(this).attr(
                            "style",
                            "border:1px solid #4281D7;outline:1px solid #4281D7"
                        );
                        paytext = $(this).text();
                    });
                });
                $('#money').blur(function(){
                    if (_this.price == '') {
                        _this.price = '0.00'
                    }
                    var money2 = _this.price.match(/^\d*(\.?\d{0,2})/g)[0]; // 保留小数点后面两位小数
                    _this.price = money2
                
                });
                $("#money").on('input  propertychange',function(){  // 金钱输入验证
                    //如果输入非数字，则替换为''
                    this.value = this.value.replace(/[^\d\.]/g, '');
                    //必须保证第一个为数字而不是.     
                    this.value = this.value.replace(/^\./g,'');
                    //保证只有出现一个.而没有多个.     
                    this.value = this.value.replace(/\.{2,}/g,'.');
                    //保证.只出现一次，而不能出现两次以上     
                    this.value = this.value.replace('.','$#$').replace(/\./g,'').replace('$#$','.');
                    //只能输入两位小数
                    this.value = this.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');

                    if(this.value.length > 1) {
                        this.value=this.value.replace(/[^\d]/g, '').replace(/^0{1,}/g,'')
                    }
                })



                $("#onsubmit").on("click", function () {
                    var money = $('#money').val(); //金额 各种验证规则不太清楚
                    if (money <= 0) {
                        // layer.msg('充值金额不能小于100');
                        layer.msg('请输入充值金额');
                        return false;
                    }
                    if (money < 0.01) {
                        layer.msg('充值金额不能小于0.01');
                        return false;
                    }
                    if (paytext == '') {
                        layer.msg('请选择充值方式');
                        return false;
                    }
                    if (paytext == "微信支付") {
                        _this.$http.post('/shv2/account/charge', {money: _this.price, type: 2}, function (res) {
                            console.log(res)
                            if (res.code == 1) {
                                _this.wxUrl = res.code_url
                                 layer.open({   // 调取弹框
                                    type: 1,
                                    shadeClose: true,
                                    shade: 0.8,
                                    title: "<span class='Color_black Ft-S18'>微信充值</span>",
                                    area: ["400px", "460px"], //宽高
                                    content: $(".wx_dialig")
                                });
                            } else {
                                layer.msg(res.msg);
                            }
                        }, function (err) { console.log(err)})
                       
                    } else if (paytext == "支付宝支付") {
                        console.log( _this.price)
                        _this.$http.post('/shv2/account/charge', {money: _this.price, type: 1}, function (res) {
                            console.log(res)
                            if (res.code == 1) {
                                _this.zfbUrl = res
                                layer.open({
                                    type: 1,
                                    title: "支付宝充值",
                                    shadeClose: true,
                                    shade: 0.8,
                                    area: ["400px", "460px"],
                                    content: $(".alipay_dialog") //iframe的url
                                });
                            } else {
                                layer.msg(res.msg);
                            }
                            
                        }, function (err) { console.log(err)})
                        
                    } else {
                        // 在此判断有无绑定银行卡
                        // window.location.href = "/shanghu/account/recharge_bank";
                        // _this.$router.push('/finance/bankcardadmin/bindbankLegal')   //  跳转到绑定银行卡页面
                        _this.$http.post('/shv2/account/recharge_bank', { money: _this.price }, function (res) {
                                console.log(res)
                        }, function (err) { console.log(err)})
                        
                    }

                    $(".layui-layer-title").css({
                        height: "50px",
                        background: "#ECF2FB",
                        "line-height": "50px"
                    });
                    $(".layui-layer-setwin").css("top", "19px");
                });

                // function getPay(money, paytype) {
                //     var data = false;
                //     $.ajax({
                //         url: '/shanghu/account/recharge',
                //         async: false,
                //         type: 'post',
                //         dataType: 'json',
                //         data: { 'money': money, 'type': paytype },
                //         success: function (res) {
                //             console.log(res);
                //             if (res.code == 1) {
                //                 data = res;
                //             } else {
                //                 layer.msg(res.msg);
                //             }
                //         },
                //         error: function () {
                //             layer.msg('系统错误');
                //         }
                //     });
                //     return data;
                // }
            });
        }
    }
}
</script>

<style scoped lang="less">
//鲁医通充值
#lyt_recharge {
  height: 800px;
  input:focus,
  input:hover {
    border: 1px solid #e2e2e2;
  }
  .recharge_tit {
    border-bottom: 1px solid #f1f2f9;
  }
  .paytype {
    display: inline-block;
    width: 160px;
    height: 50px;
    line-height: 50px;
    border: 1px solid #dddddd;
    cursor: pointer;
  }
  .icon_wx {
    background: url(../../common/image/pages/account/icon_wepay.png) no-repeat 28px;
    padding-left: 67px;
  }
  .icon_zfb {
    background: url(../../common/image/pages/account/icon_alipay.png) no-repeat 25px;
    padding-left: 59px;
  }
  .icon_yl {
    background: url(../../common/image/pages/account/icon_card.png) no-repeat 21px;
    padding-left: 59px;
  }
}
</style>
