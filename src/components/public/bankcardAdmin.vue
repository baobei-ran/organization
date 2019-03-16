<template>
    <div id="lyt_setting">
        <div class="bg_f Mg-B26">
            <p class="recharge_tit Ft-S16 Color_black Pd-L22 Pd-T24 Pd-B24 Mg-B10 clear">
                <span class="fl">鲁医通账户设置</span><span class="fr"><span class="Color_blue Ft-S14 Mg-R24 pointer" @click="outbank"><i class="outbank_icon"></i>申请解绑银行卡</span><span class="Color_blue Ft-S14 Mg-R24 pointer" @click="exitpass"><i class="exitpass_cion"></i>修改交易密码</span></span>
            </p>
            <div class="Pd-B24 Pd-L24 Pd-R24">
                <div class="Pd-B24 Pd-L24 Pd-T24 Mg-T22 Ft-S14 Color_black backborder">
                    <p class="Mg-B20"><img class="Mg-R5" src="@/common/image/pages/account/icon_zs.png" width="15px" height="15ox" alt="" style="position:relative;top:-2px">招商银行</p>
                    <p>8772 22** **** **8877</p>
                </div>
            </div>
        </div>
        <div class="bg_f">
            <p class="recharge_tit Ft-S16 Color_black Pd-L22 Pd-T24 Pd-B24 Mg-B10 clear">
                绑卡类型信息
            </p>
            <div class="Pd-B24 Pd-L24 Pd-R24 Mg-T10">
                <table>
                    <tr height="44px">
                        <td class="Ft-S14 Color_black" align="right">提现账户类型：</td>
                        <td class="Ft-S14 Color_gray6 Pd-L40">个人账户</td>
                    </tr>
                    <tr height="44px">
                        <td class="Ft-S14 Color_black" align="right">姓名：</td>
                        <td class="Ft-S14 Color_gray6 Pd-L40">李粒粒</td>
                    </tr>
                    <tr height="44px">
                        <td class="Ft-S14 Color_black" align="right">身份证号：</td>
                        <td class="Ft-S14 Color_gray6 Pd-L40">222222*********988</td>
                    </tr>
                    <tr height="44px">
                        <td class="Ft-S14 Color_black" align="right">个人身份证照片：</td>
                        <td class="Ft-S14 Color_gray6 Pd-L40"><i class="photo_icon"></i>身份证照片已成功上传</td>
                    </tr>
                </table>
            </div>
        </div>

        <div id="exitpass" class="form_content_action hide">
            <form class="layui-form Mg-T40" action="">
                <div class="layui-form-item Mg-B24">
                    <label class="layui-form-label Color_black">原交易密码：</label>
                    <div class="layui-input-inline Mg-L16">
                        <ul id="ul0">
                            <input type="password" />
                            <input type="password" />
                            <input type="password" />
                            <input type="password" />
                            <input type="password" />
                            <input type="password" />
                        </ul>
                        <p class="clear Mg-T10 Ft-S14" style="width:300px"><span class="fl Color_gray6">请输入原交易密码</span><span class="fr Color_blue pointer" @click="forgetpass">忘记密码?</span></p>
                    </div>
                </div>
                <div class="layui-form-item  Mg-B24">
                    <label class="layui-form-label Color_black">新交易密码：</label>
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
        <div id="forgetpass" class="form_content_action hide">
            <form class="layui-form Mg-T40" action="">
                <div class="layui-form-item Mg-B24">
                    <label class="layui-form-label">手机号：</label>
                    <div class="layui-input-inline">
                        <input type="tel" name="phone" required lay-verify="required" style="width:300px" placeholder="" autocomplete="off" class="layui-input Mg-L16" id="phone" maxlength="11" value="" />
                    </div>
                </div>
                <div class="layui-form-item Mg-B24">
                    <label class="layui-form-label">验证码：</label>
                    <div class="layui-input-inline  Mg-L16">
                        <input type="tel" name="code" required lay-verify="required" style="width:210px" placeholder="请输入密码" autocomplete="off" maxlength="4" class="layui-input" id="code" />
                    </div>
                    <div class="layui-form-mid layui-word-aux Mg-L20 ac pointer getcode" @click="getcode">
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
        <div id="outbank" class="form_content_action hide">
            <form class="layui-form Mg-T40" action="">
                <div class="layui-form-item Mg-B24">
                    <label class="layui-form-label">银行卡：</label>
                    <div class="layui-input-inline">
                        <input type="tel" name="bankcard" required lay-verify="required" style="width:300px" placeholder="输入已绑定银行卡号" autocomplete="off" class="layui-input Mg-L16" id="bankcard" maxlength="11" value="" />
                    </div>
                </div>
                <div class="layui-form-item  Mg-B40">
                    <label class="layui-form-label">交易密码：</label>
                    <div class="layui-input-inline Mg-L16">
                        <ul id="ul3">
                            <input type="password" />
                            <input type="password" />
                            <input type="password" />
                            <input type="password" />
                            <input type="password" />
                            <input type="password" />
                        </ul>
                        <p class="clear Mg-T10 Ft-S14" style="width:300px"><span class="fl Color_gray6">请输入6位数字交易密码</span><span class="fr Color_blue pointer" @click="forgetpass">忘记密码?</span></p>
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
</template>
<script>
export default {
    name: '',
    data() {
        return {
            noneclick:false
        }
    },
    created() {
        var _this = this;
        this.$http.post('/shv2/account/if_bank', {}, function (res) {   // 查询机构是否绑卡
            if (res.code == 1) {    // 1 代表绑卡
                _this.go('/finance/bankcardadmin')  // 已绑定银行卡页面
            } else if (res.code == 0) {
                // 未绑卡的情况查询是否提交过其他账户审核状态
                _this.$http.post('/shv2/account/add_bank_person_audit',{}, function (res) {
                    console.log(res)
                    if (res.code == 1) {
                        var status = res.data.status;
                        if (status == 1) {
                            _this.go('/finance/bankcardadmin/otherform')  // 审核通过，进入绑卡模块
                        } else if (status == 3) {
                            _this.go('/finance/bankcardadmin/bindbankLegal') // 未绑卡进入法人页面
                        } else {
                            _this.go('/finance/bankcardadmin/checkbank')   // 其他账户审核情况
                        }
                    }
                }, (err) => console.log(err))
                

                
            }
        }, function (err) { console.log(err)})
        
    },
    mounted() {
        this.initdata();
        // if(true){//判断条件是否绑卡 如果绑卡则不跳转绑卡页面
        //     // this.go('/finance/bankcardadmin/safePayment')    // 跳转对公账户页面
        // }
    },
    methods: {
        initdata() {
            layui.use(["layer"], function () {
                var $ = layui.jquery;
                function inkeypress() {
                    $(this).val("");
                    var $input = $(this).next("input");
                    if ($input.length > 0) {
                        $input.focus();
                    }
                }
                $("#ul0>input").on("keypress", inkeypress);
                $("#ul1>input").on("keypress", inkeypress);
                $("#ul2>input").on("keypress", inkeypress);
                $("#ul3>input").on("keypress", inkeypress);
            });
        },
        getcode(){
            var _salf = this;
            layui.use(["layer"], function () {
                var isphone = /^1[34578]\d{9}$/;
                if (!isphone.test($("#phone").val())) {
                    layer.msg("请输入正确的手机号");
                    return;
                }
                if (_salf.noneclick) {
                    return;
                }
                var time = 60;
                $('.getcode').text("(60s)重获");
               
                var settime = setInterval(function () {
                    if (!time) {
                        _salf.noneclick = false;
                        $('.getcode').text("重新获取");
                        clearInterval(settime);
                        return;
                    }
                    _salf.noneclick = true;
                    time--;
                    $('.getcode').text("(" + time + "s)重获");
                }, 1000);
            })
        },
        outbank() {//
            layui.use(["layer"], function () {
                var $ = layui.jquery;
                layer.open({
                    type: 1,
                    title: "申请解绑银行卡",
                    shadeClose: true,
                    shade: 0.2,
                    area: ["560px", "360px"],
                    content: $("#outbank")
                });
            });

            $(".layui-layer-title").css({
                height: "50px",
                background: "#ECF2FB",
                "line-height": "50px"
            });
            $(".layui-layer-setwin").css("top", "19px");
        },
        exitpass() {//修改交易密码
            layui.use(["layer"], function () {
                var $ = layui.jquery;
                layer.open({
                    type: 1,
                    title: "修改交易密码",
                    shadeClose: true,
                    shade: 0.2,
                    area: ["560px", "460px"],
                    content: $("#exitpass")
                });
            });

            $(".layui-layer-title").css({
                height: "50px",
                background: "#ECF2FB",
                "line-height": "50px"
            });
            $(".layui-layer-setwin").css("top", "19px");
        },
        forgetpass() {//忘记交易密码
            layui.use(["layer"], function () {
                var $ = layui.jquery;
                layer.closeAll()
                layer.open({
                    type: 1,
                    title: "修改交易密码",
                    shadeClose: true,
                    shade: 0.2,
                    area: ["560px", "500px"],
                    content: $("#forgetpass")
                });
            });

            $(".layui-layer-title").css({
                height: "50px",
                background: "#ECF2FB",
                "line-height": "50px"
            });
            $(".layui-layer-setwin").css("top", "19px");
        }
    }
}
</script>

<style scoped lang="less">
//鲁医通设置
#lyt_setting {
    input:focus,
    input:hover {
        border: 1px solid #e2e2e2;
    }
    .recharge_tit {
        border-bottom: 1px solid #f1f2f9;
        i {
            display: inline-block;
            width: 18px;
            height: 18px;
            position: relative;
            top: 4px;
            margin-right: 3px;
        }
        .outbank_icon {
            background: url(../../common/image/pages/account/icon_jbyhk.png)
                no-repeat;
        }
        .exitpass_cion {
            background: url(../../common/image/pages/account/icon_xgmm.png)
                no-repeat;
        }
    }
    .backborder {
        width: 308px;
        height: 106px;
        border: 4px solid #e6e6e6;
        border-radius: 4px;
        p {
            line-height: 14px;
        }
    }
    .photo_icon{
         display: inline-block;
         width: 14px;
         height: 14px;
         position: relative;
         top: 2px;
         margin-right: 3px;
         background: url(../../common/image/pages/account/icon_sfz.png)
                no-repeat;
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
}
</style>
