<template>
    <div id="yaomall" class="bg_f" style="height:100%">
        <p class="mall_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24">商城管理</p>
        <form class="layui-form Mg-T20" action="">
            <div class="layui-form-item  ">
                <label class="layui-form-label"><span class="Color_red">*</span>是否开始店铺：</label>
                <div class="layui-input-inline Pd-L24">
                    <input type="checkbox" name="open" :value="swich" lay-skin="switch">
                </div>
            </div>
            <div class="layui-form-item Mg-B24">
                <label class="layui-form-label"><span class="Color_red">*</span>店铺名称：</label>
                <div class="layui-input-inline Pd-L24" style="width:400px">
                    <input type="text" name="text" required lay-verify="required" v-model='name' placeholder="请输入店铺名称" autocomplete="off" class="layui-input">
                </div>
                <div class="layui-form-mid layui-word-aux Color_red Ft-S12" v-show='isName'>该名称已被占用</div>
            </div>
            <div class="layui-form-item layui-form-text Mg-B60">
                <label class="layui-form-label" style="padding-top:0px;"><span class="Color_red">*</span>店铺展示图片：</label>
                <div class="layui-input-inline Pd-L24">
                    <div class="layui-input-inline uploadimg Mg-R24">
                        <span class="Ft-S14">点击上传</span> <input type="file" class="pointer" id="1" placeholder="" />
                        <p class="Ft-S14 Color_gray6">用于机构展示</p>
                        <P class="Ft-S12 Color_grayA">建议尺寸：120*120</P>
                    </div>
                    <div class="layui-input-inline uploadimg">
                        <span class="Ft-S14">点击上传</span> <input type="file" class="pointer" id="2" placeholder="" />
                        <p class="Ft-S14 Color_gray6">医院信息详情页展示</p>
                        <P class="Ft-S12 Color_grayA">建议尺寸：750*340</P>
                    </div>
                </div>
            </div>
            <div class="layui-form-item Mg-B10">
                <label class="layui-form-label"><span class="Color_red">*</span>店铺类型：</label>
                <div class="layui-input-block Pd-L24">
                    <input type="radio" name="ls" value="连锁店" title="连锁店">
                </div>
            </div>
            <div class="layui-form-item Mg-B40">
                <label class="layui-form-label"><span class="Color_red">*</span>店铺展示服务：</label>
                <div class="layui-input-block Pd-L24">
                    <input type="radio" name="type1" value="线上物流" title="线上物流">
                    <input type="radio" name="type1" value="门店自提" title="门店自提" checked>
                    <input type="radio" name="type1" value="提供发票" title="提供发票">
                </div>
            </div>
            <div class="layui-form-item">
                <div class="layui-input-block Pd-L24">
                    <button class="layui-btn onsub Ft-S16" style="background:#3196FF;width:100px;" lay-submit lay-filter="formDemo">保存</button>
                    <button type="reset" class="layui-btn layui-btn-primary Mg-L24  Ft-S16" style="width:100px;">取消</button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    name: 'yaomall',
    data() {
        return {
            swich: 1,
            name: '',    // 店铺名称
            isName: false  //  验证店铺
        }
    },
    mounted() {
        this.initdata()
        var _this = this;
        this.$http.post('/shv2/store/isset_store', {}, function (res) {
           if (res.code == 1) {
               _this.swich = 1
           } else if (res.code == 2){
               _this.swich = 0
           } else {
               console.log(res)
           }
        }, function (err) { console.log(err)})
    },
    methods: {
        initdata() {
            layui.use('form', function () {
                var form = layui.form;
                form.render()//防止渲染失败
            });
        }
    }
}
</script>

<style scoped lang="less">
#yaomall {
    .mall_tit {
        border-bottom: 1px solid #e6e6e6;
    }

    form {
        padding-left: 24px;
        div {
            .layui-form-label {
                width: 105px;
                padding-right: 0px;
                padding-left: 0px;
                color: #666;
            }
            .showimg {
                width: 158px;
                height: 158px;
            }
            .uploadimg {
                width: 158px;
                height: 158px;
                text-align: center;
                position: relative;
                border: 1px dashed #c2c2c2;
                border-radius: 4px;
                input {
                    width: 158px;
                    height: 158px;
                    opacity: 0;
                    position: absolute;
                    left: 0px;
                    z-index: 3;
                }
                span {
                    display: block;
                    width: 158px;
                    height: 158px;
                    padding-top: 100px;
                    background: url(../../common/image/pages/account/icon_pic.png)
                        no-repeat center 44px;
                    position: absolute;
                    z-index: 0;
                    left: 0px;
                    color: #c2c2c2;
                }
                p {
                    margin-top: 168px;
                }
                p:last-child {
                    margin-top: 0px;
                }
            }
            .upflie {
                div {
                    position: relative;
                    height: 36px;
                    #uploadfile {
                        width: 150px;
                        height: 36px;
                        position: absolute;
                        left: 0px;
                        z-index: 3;
                        opacity: 0;
                    }
                    .file-up {
                        display: block;
                        border-radius: 4px;
                        width: 150px;
                        height: 36px;
                        line-height: 36px;
                        padding-left: 28px;
                        background: #3196ff
                            url(../../common/image/pages/account/icon_sc.png)
                            no-repeat 10px;
                        font-size: 14px;
                        color: #fff;
                        position: absolute;
                        left: 0px;
                        z-index: 0;
                    }
                }
            }
        }
    }
}
</style>
