<template>
    <!-- 上传药师资格证和签名 -->
    <div class="perscriptionPicShen">
       
     <div class="head_title">
         <p class="perscription_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24">处方设置修改</p>
     </div>
    <div class="set_price bg_f Mg-T24">
        <h2>费用设定</h2>
        <!-- <div class="my_price">鲁医通账户余额&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>50元</span> <span class="my_price_msg">（请在鲁医通账户中预存100元，用于处方费用支付<b @click='go_account' class="pointer">前去充值</b>）</span></div> -->
        <div class="mySet_price dis_f Pd-T24">
            <span>处方费用设定</span>
            <input type="text" id='price_m' v-enter-number2 v-model='set_money'/> 元
            <p>（处方费用不可低于1元，申请处方时，费用将自动从鲁医通账户中扣减，医生也将根据处方费用选择是否与药店合作）</p>
        </div>
    </div>

    <div class="file_download Mg-T24 bg_f">
        <p class="perscription_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24">资料上传</p>
        <div class="content Pd-L24 Pd-R24 Mg-T20">
            
            <div class="Ft-S15 Mg-B20">
                <span>药师姓名：</span> 
                <input class='Pd-L20 Mg-L20' v-model='yao_user' style="width: 200px; height: 35px; border: 1px solid #C2C3C3;" type="text" />
            </div>
            <div class="Ft-S15">
                <span>资料上传：</span> 
                <span class="Color_red Pd-L20 Ft-S14" >请上传小于5MB的jpg/jpeg/png格式的图片，图片细节必须清晰可见</span>
            </div>
            <div class="files Mg-T20">
                <dl>
                    <dt>
                        <img :src="img1" alt="">
                        <div v-show='fileStatus'>
                            <label for="file1">{{ labelTxt }}</label>
                            <input id='file1' @change='addfiles1'  multiple="multiple" accept=".png, .jpg, .jpeg" type="file">
                        </div>
                    </dt>
                    <dd>药师资格证</dd>
                </dl>
                <dl>
                    <dt>
                        <img :src="img2" alt="">
                        <div  v-show='fileStatus2'>
                            <label for="file2">{{ labelTxt2 }}</label>
                            <input id='file2' @change='addfiles2'  multiple="multiple" accept=".png, .jpg, .jpeg" type="file">
                        </div>
                    </dt>
                    <dd>药师签名</dd>
                </dl>
            </div>
            <p class="txt Ft-S14 Pd-T24 Pd-B24 Pd-L24">注：持有药师资格证的药师人员必须为当前药房工作人员药师签名由药师在白色背景纸张上书写清晰可辨的药师真实签名后拍照 <b @click='show_pic' class='Color_blue pointer'>点击查看示例</b></p>

            
            </div>
        </div>

        <div class="btns">
            <button class="layui-btn layui_btns" @click="go('/server/YaoprescriptionListPic/prescriptionSetting')" >取消</button>
            <button class="layui-btn layui-btn-normal" @click="submitFile" >保存</button>
        </div>
     
    

         <!-- 上传图片示例 -->
        <div id='pic_shows' class="hide">
            <h2>上传签名照片示例</h2>
            <p>签名需清晰可见</p>
            <p><img src="../../../../common/image/icon/pic_zlsl@2x.png" alt=""></p>
        </div>

        <!-- 余额不足提示 -->
        <div id='price_shows' class="hide">
            <h2>服务提示</h2>
            <p>鲁医通账户余额不足，请充值后开通此服务</p>
            <p><button class='layui-btn layui-btn-normal' @click='cancels'>好的</button></p>
        </div>
        <!-- 提交提示 -->
        <div id='btns_shows' class="hide">
            <h2>服务提示</h2>
            <p>经由平台审核后，即可使用电子处方服务<br/>是否确认提交？</p>
            <p class="clear_btn">
                <span><button class="send pointer" @click="cancels">取消</button></span>
                <span ><button class="send pointer" @click="yes_btn">确定</button></span>
            </p>
        </div>


    </div>
</template>
<script>
export default {
        data () {
            return {
                img1: '',           // 显示预览
                img2: '',           // 显示预览图
                labelTxt: '点击上传',
                labelTxt2: '点击上传',
                files1: '',         //   上传图
                files2: '',         //  上传签名图
                status: false,      // 审核中
                status2: false,     // 审核失败
                fileStatus: true,   //  控制文件上传按钮1 
                fileStatus2: true,  //  控制文件上传按钮2
                failed: '',         // 审核失败留言
                disBtn: true,       // 提交按钮
                times: '',          // 实时监测
                set_money: '',      // 费用设置
                yao_user: '',       // 药师姓名

            }
        },
        mounted () {
            var _this = this;
            
            $("#price_m").on("input propertychange",function(event) {     // 输入的时候进行验证
                this.value = this.value.replace(/[^\d\.]/g, '');
                var m = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
                var money2 = _this.set_money.match(/^\d*(\.?\d{0,2})/g)[0]; // 保留小数点后面两位小数
                _this.set_money = money2;
                if (m.test(this.value)) {
                    _this.set_money = this.value
                }
            })
        },
        methods: {
            addfiles1 (event) {
                var files = event.target.files[0];  
                if (files) {   // 是否有文件
                    if(files.size > 1024 * 1024 * 5) {    
                        alert('图片大小不能超过 5MB!');
                        return false;
                    }
                    var URL = window.URL || window.webkitURL; 
                    var url = URL.createObjectURL(files)        
                    this.img1 = url
                    this.files1 = files
                    this.labelTxt = '重新上传'
                    if (this.img1 && this.img2) {
                        this.btnss = false
                    }
                }
            },
            addfiles2 (event) {
                var files = event.target.files[0];
                if (files) {
                    if(files.size > 1024 * 1024 * 5) {
                        alert('图片大小不能超过 5MB!');
                        return false;
                    }
                    var URL = window.URL || window.webkitURL; 
                    var a = URL.createObjectURL(files)
                    this.img2 = a
                    this.files2 = files
                    this.labelTxt2 = '重新上传'
                    if (this.img1 && this.img2) {
                        this.btnss = false
                    }
                }
            },

            submitFile () {                 // 上传资料
                var _this = this;
                layui.use('layer', function() {
                var layer = layui.layer;

                // layer.open({    // 余额不足提示
                //     type: 1,
                //     shade: 0.2,
                //     shadeClose: true,
                //     closeBtn: 0,
                //     title: "",
                //     content: $("#price_shows"),
                //     area: ["400px", "260px"],
                //     cancel: function () {},
                //     end: function () {
                //         $("#price_shows").hide()
                //     }
                // });
                // layer.open({    // 确认提交
                //     type: 1,
                //     shade: 0.2,
                //     shadeClose: true,
                //     closeBtn: 0,
                //     title: "",
                //     content: $("#btns_shows"),
                //     area: ["400px", "280px"],
                //     cancel: function () {},
                //     end: function () {
                //         $("#btns_shows").hide()
                //     }
                // });
                if (!_this.set_money) {
                    layer.msg('请填写处方费用',{icon:0});
                    return false;
                }
                if (!_this.yao_user) {
                    layer.msg('请填写药师姓名',{icon:0});
                    return false;
                }
                if (_this.files1 == '') {
                    layer.msg('请上传药师资格证',{icon:0});
                    return false;
                }
                if (!_this.files2) {
                    layer.msg('请上传药师签名图片',{icon:0});
                    return false;
                }
                var formdata = new FormData();
                formdata.append('teacher_pic', _this.set_money)
                formdata.append('yname_pic', _this.yao_user)
                formdata.append('teacher_pic', _this.files1)
                formdata.append('yname_pic', _this.files2)
                _this.$http.upload('/shv2/Recipe/recipe_pic', formdata, function (res) {
                    console.log(res)
                    if (res.code == 1) {
                        layer.msg('修改成功', { icon: 1, time: 1500});
                        var tm = setTimeout(() => {
                            _this.$router.back()
                            clearTimeout(tm)
                        }, 1000)
                    } else {
                        layer.msg('修改失败', { icon: 2, time: 1500});
                    }
                }, function (err) { })
                
                });  
            },

            go_account () {  // 去充值
                console.log(this.set_money)
            },
            show_pic () {   // 上传图片展示
                 layui.use(["layer"], function () {
                    var layer = layui.layer;
                    layer.open({
                        type: 1,
                        shade: 0.2,
                        shadeClose: true,
                        closeBtn: 1,
                        title: "",
                        content: $("#pic_shows"),
                        area: ["500px", "360px"],
                        cancel: function () {},
                        end: function () {
                            $("#pic_shows").hide()
                        }
                    });
                })
            },
            cancels () {     // 取消关闭弹框
                layui.use('layer', function(){
                    var layer = layui.layer;
                    layer.closeAll();
                }); 
            },
            yes_btn () {    // 确认提交
                console.log('ok')
            }
        },
        beforeDestroy () {
            var data = this.times;
            clearInterval(data)
        }
}
</script>
<style lang='less' scoped>
.perscriptionPicShen {
    height: 100%;
    background-color: #F1F2F9;
    .head_title {
        background-color: #fff;
        -webkit-border-radius: 6px;
        border-radius: 6px;
    }
    .perscription_msg {
        padding:24px;
        -webkit-border-radius:6px;
        border-radius:6px;
        .perscription_msg_box {
            border: 1px dashed #DDD;
            -webkit-border-radius: 8px;
            border-radius: 8px;
            position: relative;
            padding: 0 24px 20px;
            > div {
                > h2 {
                    font-size: 16px;
                    color: #333;
                    font-weight:500;
                    padding: 20px 0;
                    padding-left: 34px;
                    background: url('../../../../common/image/icon/icon_fwsm.png') no-repeat left center;
                }
                p {
                    color: #666;
                    line-height: 20px;
                    margin-top: 7px;
                }
            }
            .show_btn {
                position: absolute;
                right: 0;
                bottom: 0;
            }
        }
    }

    .set_price {
        -webkit-border-radius:6px;
        border-radius:6px;
        > h2 {
            font-size: 16px;
            padding: 20px 24px;
            border-bottom: 1px solid #F1F2F9;
        }
        .my_price {
            padding: 20px 24px;
            color: #666666;
            .my_price_msg {
                color: #808080;
                b {
                    color: #3196FF;
                    font-style: normal;
                    margin: 0 5px;
                }
            }
        }
        .mySet_price {
            padding: 0 24px 20px;
            line-height: 35px;
            color: #666;
            input {
                margin: 0 10px;
                border: 1px solid #C2C3C3;
                width: 200px;
                height: 35px;
                padding-left: 20px;
            }
            p {
                color: #808080;
            }
        }
    }

    .file_download {
        -webkit-border-radius:6px;
        border-radius:6px;
    .perscription_tit {
        color: #333;
        border-bottom: 1px solid #F1F2F9;
    }
    .content {
        
        .files {
            padding-left: 10%;
            display:box;
            display:-webkit-box;
            display:-webkit-flex; 
            display:-moz-box; 
            display:-ms-flexbox; 
            display:flex;
            dl {
                
                dt {
                    width: 159px;
                    height: 159px;
                    border: 1px dashed #c2c2c2;
                    margin-right: 20px;
                    border-radius: 4px;
                    position: relative;
                    input[type=file] {
                        display: none;
                    }
                    label {
                        position: absolute;
                        left:0;
                        bottom:0;
                        padding: 6px 0;
                        width: 100%;
                        display: block;
                        text-align: center;
                        background: rgba(0,0,0,.3);
                        color: #fff;
                        border-radius: 0 0 4px 4px;
                        cursor: pointer;
                    }
                    img {
                        width: 100%;
                    }
                }
                dd {
                    text-align: center;
                    color: #666;
                    margin-top: 10px;
                    margin-left: -10px;
                }
            }
        }
        .txt {
            width: 50%;
            margin-left: 10%;
            line-height: 29px;
        }
        
    
    }
}

.btns {
    background-color: #F1F2F9;
    text-align: center;
    margin-top: 20px;
    padding: 20px 0; 
    button {
        width: 100px;
    }
    .layui_btns {
        margin-right: 24px;
        background-color: #FFF;
        border: 1px solid #3196FF;
        color: #3196FF;
    }
}
    



    #pic_shows {
        width: 100%;
        display: none;
        > h2 {
            text-align: center;
            font-size: 17px;
            color: #333;
            margin-top: 20px;
            font-weight: 500;
        }
        p {
            margin-top: 14px;
            color: #666;
            text-align: center;
            padding: 0 10px;
            img {
                width: 100%;
            }
        }
    }
}
#price_shows {
    color: #333;
    h2 {
        text-align: center;
        padding: 24px 0;
        font-size: 20px;
    }
    p {
        text-align: center;
        font-size: 15px;
        padding: 10px 0;
    }
    p > button {
        margin-top: 40px;
        padding: 0 30px;
    }
}
#btns_shows {
    color: #333;
    h2 {
        text-align: center;
        padding: 24px 0;
        font-size: 20px;
    }
    p {
        text-align: center;
        font-size: 15px;
        padding: 10px 0;
    }
    .clear_btn {
        margin-top: 35px;
        span:first-child {
            button {
                background:#FFF;
                color: #128DFF;
                margin-right: 20px;
            }
        }
        span {
            button {
               width: 100px;
                height: 35px;
                -webkit-border-radius: 4px;
                border-radius: 4px;
                border: 1px solid #128DFF;
                font-size: 16px;
                background: #128DFF;
                color: #FFF;
            }
        }
    }
}


.labels {
    display: inline-block;
    width: 120px;
    text-align: right;
}

</style>

