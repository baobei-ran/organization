<template>
    <!-- 信息 -->
    <div class="perscription_msg">
       
        <div class="perscription">
           
        <div class="file_download" >
            <div class="content Pd-L24 Pd-R24 Pd-T24">
                <div class="Ft-S15 Color_gary Mg-B20">
                    <span class="labels">处方费用设定</span> 
                    <span>{{ money }}元</span>
                </div>
                <div class="Ft-S15 Color_gary Mg-B20">
                    <span class="labels">药师姓名</span> 
                    <span>{{ docUser }}</span>
                </div>
                
                <div class="files Mg-T20">
                    <dl>
                        <dt>
                            <img :src="img1" alt="">
                        </dt>
                        <dd>药师资格证</dd>
                    </dl>
                    <dl>
                        <dt>
                            <img :src="img2" alt="">
                        </dt>
                        <dd>药师签名</dd>
                    </dl>
                </div>
                <p class="txt Ft-S14 Pd-T24 Pd-B24 Pd-L24">注：持有药师资格证的药师人员必须为当前药房工作人员药师签名由药师在白色背景纸张上书写清晰可辨的药师真实签名后拍照 <b @click='show_pic' class='Color_blue pointer'>点击查看示例</b></p>
                </div>
            </div>
        </div>
    

    

         <!-- 上传图片示例 -->
        <div id='pic_shows' class="hide">
            <h2>上传签名照片示例</h2>
            <p>签名需清晰可见</p>
            <p><img src="../../../../common/image/icon/pic_zlsl@2x.png" alt=""></p>
        </div>

        
    </div>
</template>
<script>
export default {
        data () {
            return {
                docUser: '',
                money: '',  
                img1: '',
                img2: ''
            }
        },
        mounted () {
            var _this = this;
            this.initdata()
        },
        methods: {
            initdata () {
                var _this = this;
               _this.$http.post('/shv2/Recipetwo/recipe_check', {}, function (res) {
                   console.log(res)
                    if (res.code == 1) {
                         var type = res.data.teacher_type
                         if (type == 2) {
                             _this.docUser = res.data.yname
                             _this.money = res.data.recipe_money
                            _this.img1 = _this.$http.baseURL + res.data.teacher_pic;
                            _this.img2 = _this.$http.baseURL + res.data.yname_pic;
                         }
                    }
                   
                }, function (err) {console.log(err)})
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
        },
}
</script>
<style lang='less' scoped>
.perscription_msg {
    
.perscription {

    .file_download {
        -webkit-border-radius:6px;
        border-radius:6px;
    .perscription_tit {
        color: #333;
        border-bottom: 1px solid #F1F2F9;
    }
    .content {
        .Color_gary {
            span:first-child {
                color: #808080;
                display: inline-block;
                width: 120px;
                text-align: right;
                margin-right: 20px;
            }
        }
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
                        max-width: 100%;
                        width: 100%;
                        height: 100%;
                        max-height: 100%;
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


</style>

