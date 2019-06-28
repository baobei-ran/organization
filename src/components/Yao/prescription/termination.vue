<template>
<!-- 终止合作的医生信息 -->
    <div id="orderList" style="height:100%">
        <div class="bg_f">
            <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24">医生信息</p>
            <div class="orderList_msg dis_f">
                <ul class="Pd-B24">
                    <li>
                        <span>医生姓名</span>
                        <span>{{ doctormsg.true_name }}</span>
                    </li>
                    <li>
                        <span>医生职称</span>
                        <span>{{ doctormsg.gname }}</span>
                    </li>
                    <li>
                        <span>执业医院</span>
                        <span>{{ doctormsg.hospital_name }}</span>
                    </li>
                    <li>
                        <span>所在科室</span>
                        <span>{{ doctormsg.department_name }}</span>
                    </li>
                   
                </ul>
                <ul class="Pd-B24">
                     <li>
                        <span>合作状态</span>
                        <span v-text='doctormsg.state == 1?"申请中":doctormsg.state == 2?"合作中":"合作终止"'></span>
                    </li>
                    <li>
                        <span>合作终止方</span>
                        <span v-text='doctormsg.revoke_state == 1?"医生":"药店"'></span>
                    </li>
                    <li>
                        <span>终止时间</span>
                        <span>{{ doctormsg.revoke_time | moment }}</span>
                    </li>
                    <li>
                        <span>终止原因</span>
                        <span>{{ doctormsg.revoke_reason }}</span>
                    </li>
                </ul>
            </div>
        </div>


        <div class="tab_content bg_f">
            <div class="layui-tab Pd-T14 Pd-L24 Pd-R24">
                <div class="layui-tab">
                        <div class="layui-tab_head">
                            <ul class="layui-tab-title">
                                <li class="layui-this" @click="tab(0)">处方记录</li>
                                <li @click="tab(1)">药品推荐记录</li>
                            </ul>
                        </div>
                        <div class="layui-tab-content">
                            <!-- 1 -->
                            <div class="layui-tab-item layui-show">
                                 <table class="layui-table" lay-skin="">
                                    <thead>
                                        <tr class="Color_black table_headtr ac">
                                            <td class="firstheadtd">序号</td>
                                            <td>处方编号</td>
                                            <td>开具时间</td>
                                            <td>处方状态</td>
                                            <td>患者姓名</td>
                                            <td>操作</td>
                                        </tr>
                                    </thead>
                                    <tbody v-if='tableList.length'>
                                        <tr class="table_con Color_black ac" v-for="(val,index) in tableList" :key='index'>
                                            <td>{{ index+1 }}</td>
                                            <td>12343435465769879</td>
                                            <td>2019-02-21 12:00</td>
                                            <td>
                                                <span >未审核</span>
                                                <span >已审核</span>
                                                <span >已过期</span>
                                            </td>
                                            <td>摇啊摇</td>
                                            <td class="dis_f dis_js">
                                                <p class="pointer Ft-S14 Color_blue" @click="godetail()">预览</p>
                                                <p class="pointer Ft-S14 Color_blue" @click="f_download()">下载</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody v-if='!tableList.length'>
                                        <tr class="table_con Color_black ac" >
                                            <td colspan='6'>
                                                <img src="../../../common/image/icon/icon_zwxgjl@2x.png" alt="">
                                                <p style='color:#666666;'>暂无相关记录</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!-- 2 -->
                            <div class="layui-tab-item">
                                <table class="layui-table" lay-skin="">
                                    <thead>
                                        <tr class="Color_black table_headtr ac">
                                            <td></td>
                                            <td class="firstheadtd">序号</td>
                                            <td>商品订单号</td>
                                            <td>订单状态</td>
                                            <td>下单时间</td>
                                            <td>下单用户</td>
                                            <td>订单金额（元）</td>
                                            <td>推荐酬金（元）</td>
                                            <td>操作</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="table_con Color_black ac" v-for="(val,index) in 4" :key='index'>
                                            <td>
                                                <span class="icon_black">建议用药</span>
                                                <span class="icon_black2">处方用药</span>
                                            </td>
                                            <td>{{ index+1 }}</td>
                                            <td>12343435465769879</td>
                                            <td>订单已完成</td>
                                            <td>
                                                2019-02-21 12:00
                                            </td>
                                            <td>摇啊摇</td>
                                            <td>87.00</td>
                                            <td>3.00</td>
                                            <td class="dis_f dis_js">
                                                <p class="pointer Ft-S14" >——</p>
                                                <p class="pointer Ft-S14 Color_blue" @click="f_details()">查看处方</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody >
                                        <tr class="table_con Color_black ac" >
                                            <td colspan='9'>
                                                <img src="../../../common/image/icon/icon_zwxgjl@2x.png" alt="">
                                                <p style='color:#666666;'>暂无相关记录</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                           
                            
                                <div id="page" class="ac Mg-T30"></div>
                        </div>
                    </div>
                   
                    
                
            </div>
        </div>
        <div class="returns Mg-T24">
            <button class="layui-btn layui-btn-normal" @click='go("/server/Yaodoctorprescription")'>返回</button>
        </div>

        <!-- 预览 -->
        <div id='htmls'>
        <div id="fang_preview">
            <div class="fang_preview_box">
                <ul class="f_title">
                    <li>
                        <span>处方编号：</span>
                        <span>{{ recipemsg.order_code }}</span>
                    </li>
                    <li>
                        <span>处方生成时间：</span>
                        <span>{{ recipemsg.start_time | moment }}</span>
                    </li>
                    <li>
                        <span>处方失效时间：</span>
                        <span>{{ recipemsg.undue_time }}</span>
                    </li>
                </ul>
                <h2>云医康互联网医院电子处方</h2>
                <div class="f_user">
                    <ul>
                        <li><span>姓名：</span><span>{{ recipemsg.name }}</span></li>
                        <li><span>性别：</span><span v-text="recipemsg.sex == 0?'男':'女'"></span></li>
                        <li><span>年龄：</span><span>{{ recipemsg.age }}岁</span></li>
                        <li><span>肝功能：</span><span>{{ recipemsg.liver }}</span></li>
                        <li><span>肾功能：</span><span>{{ recipemsg.kidney }}</span></li>
                        <li><span>备孕情况：</span><span>{{ recipemsg.yun }}</span></li>
                        <li><span>过敏史：</span><span>{{ recipemsg.allergy }}</span></li>
                        <li><span>过往病史：</span><span>{{ recipemsg.ago }}</span></li>
                    </ul>
                    <p>诊断结果：<span>{{ recipemsg.result }}</span></p>
                </div>
                <div class="f_yao">
                    <h3>Rp</h3>
                    <div>
                        <ul v-for='(val, i) in recipe_eat' :key='i+"_yao"'>
                            <li>
                                <span>{{ val.name }}</span>
                                <span style="margin-left:20px;">*{{ val.num }}</span>
                            </li>
                            <li>{{ val.usage }}</li>
                        </ul>
                    </div>
                    <img class="f_zheng" :src="$http.baseURL+recipemsg.zhang_pic" alt="">
                </div>
                <p class="f_pety">( 以下空白，修改无效 )</p>
                <ul class="f_signature">
                    <li>
                        <span>处方医师：</span>
                        <img :src='$http.baseURL+recipemsg.signpic' alt="">
                    </li>
                    <li v-show='recipemsg.yname_pic'>
                        <span>审核药师：</span>
                        <img :src="$http.baseURL+recipemsg.yname_pic" alt="">
                    </li>
                </ul>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
import html2canvas from 'html2canvas'
export default {
    name: 'orderList',
    data() {
        return {
            page: 1,
            limit: 10,
            tableList: [],              // 数据列表
            doctormsg: '',  // 医生信息
            recipemsg: '',  // 处方信息
            recipe_eat: [], // 药品信息
        }
    },
    mounted() {
        this.initdata(1) 
        var _this = this;
        this.$http.post('/shv2/Commonshop/com_doc_look', {id:this.$route.query.id}, function (res) {  // 获取医生信息
            console.log(res)
            if (res.code == 1) {
                _this.doctormsg = res.data
            }
        },function (err) {})
    },
    methods: {
        tab (n) {
            console.log(n)
            if (n == 0) {
                this.initdata(1)
            } else {
 
            }
        },
        initdata(num) {   // 数据
            var _this = this;
            layui.use(["laypage", "layer", "laydate", "element"], function () {
                var element = layui.element;
                var laydate = layui.laydate;
                var id = _this.$route.query.did
                var obj = { id: id, page: _this.page, limit: _this.limit }
                _this.$http.post('/shv2/Commonshop/doc_put', obj, function (res) {//
                    console.log(res)
                    if (res.code == 1) {
                       _this.tableList = res.data
                       if (num == 1) {
                           _this.pageFun(res.count)
                       }
                    } else {
                        _this.tableList = []
                    }
                }, function (err) { console.log(err) });
                
                
            });
        },
        pageFun(total) {    // 分页
            var _this = this;
            layui.use(["laypage", "layer", "element"], function () {
                var element = layui.element;
                var laypage = layui.laypage;
                laypage.render({
                    elem: "page", //注意，这里的 test1 是 ID，不用加 # 号
                    count: total, //数据总数，从服务端得到
                    limit: 10, //每页条数
                    layout: ["prev", "page", "next", "skip"],
                    groups: 4,
                    jump: function (obj, first) {
                        if (!first) {
                            _this.page = obj.curr;
                            _this.initdata(obj.curr)
                        }
                    }
                });
            });
        },
       

        
        godetail(id) {    // 预览
            var _this = this;
            layui.use(["layer"], function () {
                var layer = layui.layer;
                var $ = layui.jquery;
                 _this.$http.post('/mobile/Doch5/recipe_look', {id:id}, function (res) {
                console.log(res)
                if (res.code == 1) {
                    _this.recipemsg = res.data
                    _this.recipe_eat = res.recipe_eat;
                    layer.open({
                        type: 1,
                        shade: 0.2,
                        shadeClose: true,
                        closeBtn: 1,
                        title: "",
                        content: $("#htmls"),
                        area: ["640px", "560px"],
                        cancel: function () { }
                    });
                } else {

                }
            }, function (err) {})   
            });
           
            
        },
        recipeDetails (id) { // 获取处方单信息
            
        },
        f_download (id) { // 处方下载
            var _this = this;
            function isIE() { //ie?
                if (!!window.ActiveXObject || "ActiveXObject" in window) {
                    return true;
                } else {
                    return false;
                }
            }
            _this.$http.post('/mobile/Doch5/recipe_look', {id:id}, function (res) {
                if (res.code == 1) {
                    _this.recipemsg = res.data
                    _this.recipe_eat = res.recipe_eat;
                    var html = document.getElementById('htmls');
                    html.style.display ='block';
                    html.classList.add("capture");
                var tm = setTimeout(() => {
                    /*图片跨域及截图模糊处理*/
                    var shareContent = document.getElementById('fang_preview'); //需要截图的包裹的（原生的）DOM 对象
                    var width = shareContent.clientWidth,//shareContent.offsetWidth; //获取dom 宽度
                        height = shareContent.clientHeight,//shareContent.offsetHeight; //获取dom 高度
                        canvas = document.createElement("canvas"), //创建一个canvas节点
                        // scale = window.devicePixelRatio * 4; //定义任意放大倍数 支持小数
                        scale = 2.5
                    canvas.width = width * scale; //定义canvas 宽度 * 缩放
                    canvas.height = height * scale; //定义canvas高度 *缩放
                    canvas.style.width = shareContent.clientWidth * scale + "px";
                    canvas.style.height = shareContent.clientHeight * scale + "px";
                    canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
                    var opts = {
                        scale: scale, // 添加的scale 参数
                        canvas: canvas, //自定义 canvas
                        logging: true, //日志开关，便于查看html2canvas的内部执行流程
                        width: width, //dom 原始宽度
                        height: height,
                        // useCORS: true // 【重要】开启跨域配置
                    };
                    html2canvas(shareContent,opts).then(function(canvas) {
                    if (isIE()) {
                            var blob = canvas.msToBlob();
                            console.log(blob)
                            navigator.msSaveBlob(blob,'处方单.png');
                            return false;
                        }
                        var url = canvas.toDataURL();
                        var triggerDownload = $("<a>").attr("href", url).attr("download", "处方单.png").appendTo("body");
                        triggerDownload[0].click();
                        triggerDownload.remove();
                    })
                    clearTimeout(tm)
                    
                    }, 300)
                    var tt = setTimeout(() => {
                        html.classList.remove('capture')
                        html.style.display ='none';
                        clearTimeout(tt)
                    }, 800)
                } else {
                    _this.$message.error('下载失败')
                }
            })
        },
        f_details (id) {
            console.log('查看')
        }
    }
}
</script>



<style scoped lang="less">
#orderList {
    background-color: #F1F2F9;
    .orderList_tit {
        border-bottom: 1px solid #e6e6e6;
        font-size: 16px;
        color: #333;
    }
    .orderList_msg {
        padding: 0 24px;
        > ul {
            width: 40%;
            li {
                font-size: 14px;
                color: #333;
                span:first-child {
                   color: #808080;
                   margin-right: 20px;
                }
                margin-top: 14px;
            }
        }
        ul:last-child {
            li {
                font-size: 14px;
                color: #333;
                span:first-child {
                   color: #808080;
                   display: inline-block;
                   width:100px;
                   text-align: right;
                }
            }
        }
    }

    .returns {
        width: 100%;
        text-align: center;
        button {
            padding: 0 30px;
        }
    }
   
    input:hover,
    input:focus {
        border: 1px solid #c2c3c3;
    }
    .screen_type {
        border-bottom: 1px solid #e6e6e6;
            .layui-inline {
                overflow: hidden;
                label {
                  padding-right: 10px;
                }
                .layui-input-inline {
                    margin-right: 10px;
                    .el-input__inner {
                        width: 150px;
                    }
                    input {
                        height: 34px;
                    }
                }
            }
            .lay_width {
                label {
                  padding-right: 10px;
                }
                .layui-input-inline {
                    input {
                        height: 34px;
                    }
                }
            .date_icon {
                background: url(../../../common/image/pages/account/icon_sj.png)
                    no-repeat 138px;
            }
        }
        .selecttime {
            .layui-inline {
                label {
                    padding-right: 10px;
                }
                .layui-input-inline {
                    input {
                        height: 34px;
                    }
                    .date_icon {
                        background: url(../../../common/image/pages/account/icon_sj.png)
                            no-repeat 150px;
                    }
                }
            }
        }
        .selectbtn {
            display: inline-block;
            color: #fff;
            background: #3196ff;
            width: 100px;
            height: 34px;
            line-height: 34px;
            border: none;
            border-radius: 4px;
        }
    }
    .tab_content {
        margin-top: 24px;
        .layui-tab {

            .layui-tab_head {
                position: relative;
                .layui_right {
                    position: absolute;
                    right: 0;
                    top: 0;
                    > input {
                        width: 300px;
                        height: 36px;
                        border: 1px solid #F0F0F0;
                        background-color: #F0F0F0;
                        -webkit-border-radius:4px;
                        border-radius:4px;
                        padding-left: 40px;
                        padding-right: 10px;
                        background: url('../../../common/image/icon/icon_ss@2x.png') no-repeat 6px center;
                    }
                }
            }
            .layui-tab-title {
                font-size: 16px;
                color: #666666;
                .layui-this {
                    color: #128dff;
                    background: #fff;
                }
                .layui-this:after {
                    color: #128dff;
                    border-top: 2px solid #128dff;
                }
            }
        }
        .layui-tab-content {
            padding-left: 1px;
            padding-right: 1px;
            
            .layui-table {
                .table_headtr {
                    height: 50px;
                    background: #dae9ff;
                    td {
                        font-size: 16px;
                    }
                    .firstheadtd {
                        position: relative;
                    }
                }
                tbody {
                    tr:nth-child(even) {
                        background-color: #E5F0FF;
                    }
                    .table_con {
                        background: #fff;

                        td {
                            padding: 20px 0px;
                            font-size: 14px;
                            border:0;
                        }
                       
                    }
                }
            }
        }
    }
}
// 预览样式
#htmls {
    display: none;
}
#fang_preview {
    width: 640px;
    height: 560px;
    padding:20px;
    .fang_preview_box {
        height: 100%;
        padding: 10px;
        border: 1px solid rgba(0,0,0,.2);
        .f_title {
            overflow: hidden;
            > li {
                margin-right: 12px;
                float: left;
                height: 20px;
                > span {
                    display: block;
                    float: left;
                    font-size: 12px;
                    -webkit-text-size-adjust:none !important;
                    -webkit-transform: scale(0.8);
                    transform:scale(0.8);
                }
            }
        }
        >h2 {
            font-size: 18px;
            text-align: center;
            font-weight: 550;
            letter-spacing: 2px;
            padding: 10px 0;
        }
        .f_user {
            border-bottom: 1px dashed #666;
            > ul {
                overflow: hidden;
                li {
                    float: left;
                    width: 33.3%;
                    font-size: 12px;
                    padding: 3px 0;
                }
            }
            >p {
                margin: 10px 0;
                font-size: 12px;
            }
        }
        .f_yao {
            padding: 10px 0;
            min-height: 120px;
            position: relative;
            >h3 {
                font-size: 12px;
            }
            > div {
                ul {
                    font-size: 12px;
                    margin-top: 10px;
                    li {
                        padding: 3px 0;
                    }
                }
            }
            .f_zheng {
                position: absolute;
                right: 20px;
                top: 10%;
                width: 100px;
                height: 100px;
                -webkit-border-radius: 100%;
                border-radius: 100%;
            }
        }
        .f_pety {
            width: 100%;
            text-align: center;
        }
        .f_signature {
            margin-top: 10px;
            overflow: hidden;
            li {
                float: left;
                width: 50%;
                > img {
                    width: 50px;
                }
            }
        }
    }
    

    
}

.capture{
    position: absolute;
    top: 0;
    right: -100%;
    z-index: 99;
}


.icon_black {
    border: 1px solid #3196FF;
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 10px;
    color: #3196FF;
}
.icon_black2 {
    border: 1px solid #3196FF;
    font-size: 10px;
    background-color: #3196FF;
    padding: 2px 6px;
    border-radius: 10px;
    color: #FFF;
}
</style>
