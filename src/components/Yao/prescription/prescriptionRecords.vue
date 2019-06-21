<template>
    <div id="presciptionRecords" style="height:100%">
        <div class="bg_f">
            <p class="orderList_tit Color_black Ft-S16 Pd-T24 Pd-B24 Pd-L24">医生信息 
                <span v-if='docData.type == 1'>
                    <img style="width:40px;height:14px;" src="../../../common/image/icon/icon_tzz.png" alt="">
                    <img class="icon_hover" src="../../../common/image/icon/icon_xqsm.png" alt="">
                </span>
            </p>
            <div class="orderList_msg dis_f">
                <ul class="Pd-B24">
                    <li>
                        <span>医生姓名</span>
                        <span>{{ docData.true_name }}</span>
                    </li>
                    <li>
                        <span>医生职称</span>
                        <span>{{ docData.gname }}</span>
                    </li>
                    <li>
                        <span>执业医院</span>
                        <span>{{ docData.hospital_name }}</span>
                    </li>
                    <li>
                        <span>所在科室</span>
                        <span>{{ docData.department_name }}</span>
                    </li>
                    <li>
                        <span>合作状态</span>
                        <span v-text='docData.state == 1?"申请中":docData.state == 2?"合作中":docData.state == 3?"合作终止":""'></span>
                    </li>
                </ul>
                <ul class="Pd-B24">
                    <li>
                        <span>开具处方数量</span>
                        <span>{{ docData.count }}</span>
                    </li>
                    <li>
                        <span>合作申请方</span>
                        <span v-text='docData.initiative == 1?"医院":"药店"'></span>
                    </li>
                    <li>
                        <span>合作时间</span>
                        <span>{{ docData.agree_time | moment }}</span>
                    </li>
                    <li>
                        <span>处方服务时间</span>
                        <span>{{ docData.busdate }}</span>
                        <span>{{ docData.busktime }} -- {{ docData.busjtime }}</span>
                        
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
                            <p class="layui_right">
                                <input type="search" v-model='userName' placeholder="输入患者姓名搜索"/>
                            </p>
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
                                            <td>{{ val.number }}</td>
                                            <td>{{ val.start_time | moment }}</td>
                                            <td>
                                                <span v-show='val.type == 3'>未审核</span>
                                                <span v-show='val.type == 2'>已审核</span>
                                                <span v-show='val.type == 1'已过期</span>
                                            </td>
                                            <td>{{ val.name }}</td>
                                            <td class="dis_f dis_js">
                                                <p class="pointer Ft-S14 Color_blue" @click="godetail(val.id)">预览</p>
                                                <p class="pointer Ft-S14 Color_blue" @click="f_download(val.id)">下载</p>
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
                            <!-- 2 药品推荐记录-->
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
                                                <p class="pointer Ft-S14 Color_blue" @click="f_download()">查看处方</p>
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
            <button class="btn_termination" @click='order_termination'>申请终止合作</button>
        </div>

        <!-- 预览 -->
        <div id="fang_preview">
            <div class="fang_preview_box">
                <ul class="f_title">
                    <li>
                        <span>处方编号：</span>
                        <span>21456954584754564</span>
                    </li>
                    <li>
                        <span>处方生成时间：</span>
                        <span>2019.8.8</span>
                    </li>
                    <li>
                        <span>处方失效时间：</span>
                        <span>2019.9.9</span>
                    </li>
                </ul>
                <h2>云医康互联网医院电子处方</h2>
                <div class="f_user">
                    <ul>
                        <li><span>姓名：</span><span>李</span></li>
                        <li><span>性别：</span><span>男</span></li>
                        <li><span>年龄：</span><span>20岁</span></li>
                        <li><span>肝功能：</span><span>整成</span></li>
                        <li><span>胃功能：</span><span>正常</span></li>
                        <li><span>备孕情况：</span><span>无</span></li>
                        <li><span>过敏史：</span><span>无</span></li>
                        <li><span>过往病史：</span><span>无</span></li>
                    </ul>
                    <p>诊断结果：都是发v地方</p>
                </div>
                <div class="f_yao">
                    <h3>Rp</h3>
                    <div>
                        <ul v-for='(val, i) in 3'>
                            <li>复方 板蓝根颗粒 *1</li>
                            <li>口服，每日一次，每次一片</li>
                        </ul>
                    </div>
                    <img class="f_zheng" src="../../../common/image/icon/pic_yp.png" alt="">
                </div>
                <p class="f_pety">( 以下空白，修改无效 )</p>
                <ul class="f_signature">
                    <li>
                        <span>处方医师：</span>
                        <img src='../../../common/image/icon/pic_yp.png' alt="">
                    </li>
                    <li>
                        <span>审核药师：</span>
                        <img src="../../../common/image/icon/pic_yp.png" alt="">
                    </li>
                </ul>
            </div>
        </div>
        <!-- 终止合作 -->
        <div id="termination">
            <h2>申请终止合作</h2>
            <div class="termination_txt">
                <p>请填写终止合作原因，待平台审核通过后，即可终止合作</p>
                <textarea v-model="terminationText" placeholder="请填写终止合作原因，如医生开具处方时间较长等"></textarea>
            </div>
            <div class="termination_btn">
                <button class="btn_cancel" @click='cancelClick'>取消</button>
                <button style="padding: 0 26px;" class="layui-btn layui-btn-normal" @click='successClick'>提交</button>
            </div>
        </div>
    </div>
</template>
<script>
var delay = (function() {
 var timers = 0;
 return function(callback, ms) {
 clearTimeout(timers);
 timers = setTimeout(callback, ms);
 };
})();
export default {
    name: 'presciptionRecords',
    data() {
        return {
            tabNum: 0,            // nav
            userName: '',           // 搜索
            page: 1,
            limit: 10,
            tableList: [],              // 数据列表
            auditor: [                  // 药师审核状态下拉框
                {id: 0, name: '未审核'},
                {id: 1, name: '通过'},
                {id: 2, name: '不通过'}
            ],
            terminationText: '',        // 取消合作原因
            docData: {},                // 医生信息
            docTimer: [{id:1, val:'星期一'},
                    {id:2, val:'星期二'},
                    {id:3, val:'星期二'},
                    {id:4, val:'星期四'},
                    {id:5, val:'星期五'},
                    {id:6, val:'星期六'},
                    {id:0, val:'星期日'}],
            searchTime: '',                // 搜索时间
        }
    },
    mounted() {
        this.docMsgs()
        this.tab(0)
    },
    watch: {
        //watch userName change
        userName () {
            delay(() => {
               if (this.tabNum == 0) {
                    this.initdata(1);
               } else {
                   console.log('111')
               }
            }, 500);
        },
    },
    methods: {
        tab (n) {
            this.tabNum = n
            this.userName = ''
            if (n == 0) {
                this.initdata(1) 
            } else {
                console.log('aaaa')
            }
        },
        changeTime (time){ // 时间转换
            function getBz(num){
                if(parseInt(num) < 10){
                    num = '0'+num;
                }
                return num;
            }
            if(time){
                var oDate = new Date(time*1000),
                    oYear = oDate.getFullYear(),
                    oMonth = oDate.getMonth()+1,
                    oDay = oDate.getDate(),
                    oHour = oDate.getHours(),
                    oMin = oDate.getMinutes(),
                    // oSen = oDate.getSeconds(),
                    oTime = oYear +'-'+ getBz(oMonth) +'-'+ getBz(oDay) +' '+ getBz(oHour) +':'+ getBz(oMin);//拼接时间
                return oTime;
            }else{
                return "";
            }
        },
        docMsgs () {
            var _this = this;
            this.$http.post('/shv2/Commonshop/com_doc_look', {id:_this.$route.query.id}, function (res) {
                console.log(res)
                if (res.code == 1) {
                    _this.docData = res.data
                    var arr = _this.docData.busdate.split(','),arrTime = [];
                    for (var i =0;i<_this.docTimer.length; i++) {
                        for (var j=0;j<arr.length;j++) {
                            if (arr[j] == _this.docTimer[i].id) {
                                arrTime.push(_this.docTimer[i].val)
                            }
                        }
                    }
                    _this.docData.busdate = arrTime.join('、');
                    var startTime = _this.changeTime(_this.docData.start_time);
                    var endTime = _this.changeTime(_this.docData.end_time);
        var txt = '<div style="color: #000;"><h2 style="text-align: center;font-size: 14px;">医生停诊中</h2><ul><li style="color:#808080;">停诊时间</li><li>'+startTime+'--'+endTime+'</li></ul><ul><li style="color:#808080;">停诊说明</li><li>'+_this.docData.cause+'</li></ul></div>'
                    $(".icon_hover").hover(function () {
                        layer.tips(txt, '.icon_hover', {
                            tips: [3, '#FFF'],
                            time: 0
                        });
                    }, function () {
                        layer.closeAll()
                    });
                }
            }, function (err) {})
        },
       
        initdata(num) {   // 处方记录数据
            var _this = this;
            layui.use(["laypage", "layer", "laydate", "element"], function () {
                var element = layui.element;
                var laydate = layui.laydate;
                var start = $('#date').val();
                var end_time = $('#date1').val();
                var id = _this.$route.query.did; // 医生id 
                var obj = { id: id, page: _this.page, limit: _this.limit, name:_this.userName }
                _this.$http.post('/shv2/Commonshop/com_doc_look', obj, function (res) {
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
        search() {  // 搜索
            this.initdata(1)
        },
        order_termination () {  // 终止合作
            layui.use(["layer"], function () {
                var layer = layui.layer;
                var $ = layui.jquery;
                layer.open({
                    type: 1,
                    shade: 0.2,
                    shadeClose: true,
                    closeBtn: 0,
                    title: "",
                    content: $("#termination"),
                    area: ["500px", "360px"],
                });
            });
        },
        cancelClick () {    // 取消终止,关闭弹框
            layui.use(["layer"], function () {
                var layer = layui.layer;
                layer.closeAll()
            })
        },
        successClick () {   // 提交终止
        var _this = this;
        layui.use('layer', function(){
            var layer = layui.layer;
            if (_this.terminationText == '') {
                layer.msg('请填写取消合作原因', {icon: 0});
                return false;
            }
            
        }); 
            
        },
        userCFdetail (id) { // 处方信息
            var _this = this;
            _this.$http.post('/', {id:id}, function (res) {
                console.log(res)
                if (res.code == 1) {

                }
            }, function (err) {})
        },
        godetail(id) {    // 预览
            console.log(id)
            layui.use(["layer"], function () {
                var layer = layui.layer;
                var $ = layui.jquery;
                layer.open({
                    type: 1,
                    shade: 0.2,
                    shadeClose: true,
                    closeBtn: 1,
                    title: "",
                    content: $("#fang_preview"),
                    area: ["600px", "560px"],
                    cancel: function () { }
                });
            });
        },
       f_download () { // 处方下载
            console.log('download')
            /*图片跨域及截图模糊处理*/
            var shareContent = document.getElementById('html'),//需要截图的包裹的（原生的）DOM 对象
                width = shareContent.clientWidth,//shareContent.offsetWidth; //获取dom 宽度
                height = shareContent.clientHeight,//shareContent.offsetHeight; //获取dom 高度
                canvas = document.createElement("canvas"), //创建一个canvas节点
                scale = 4; //定义任意放大倍数 支持小数
            canvas.width = width * scale; //定义canvas 宽度 * 缩放
            canvas.height = height * scale; //定义canvas高度 *缩放
            canvas.style.width = shareContent.clientWidth * scale + "px";
            canvas.style.height = shareContent.clientHeight * scale + "px";
            canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
            var opts = {
                scale: scale, // 添加的scale 参数
                canvas: canvas, //自定义 canvas
                logging: false, //日志开关，便于查看html2canvas的内部执行流程
                width: width, //dom 原始宽度
                height: height,
                dpi: window.devicePixelRatio
                // useCORS: true // 【重要】开启跨域配置
            };
            html2canvas(shareContent,opts).then(function(canvas) {
               
                var url = canvas.toDataURL();
                var triggerDownload = $("<a>").attr("href", url).attr("download", "处方单.png").appendTo("body");
                triggerDownload[0].click();
                triggerDownload.remove();
            })
       },
       browse () { // 浏览
            var _this = this;
            var shareContent = document.getElementById('html'),//需要截图的包裹的（原生的）DOM 对象
                width = shareContent.clientWidth,//shareContent.offsetWidth; //获取dom 宽度
                height = shareContent.clientHeight,//shareContent.offsetHeight; //获取dom 高度
                canvas = document.createElement("canvas"), //创建一个canvas节点
                scale = 6; //定义任意放大倍数 支持小数
            canvas.width = width * scale; //定义canvas 宽度 * 缩放
            canvas.height = height * scale; //定义canvas高度 *缩放
            canvas.style.width = shareContent.clientWidth * scale ;
            canvas.style.height = shareContent.clientHeight * scale;
            canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
            var opts = {
                scale: scale, // 添加的scale 参数
                canvas: canvas, //自定义 canvas
                logging: true, //日志开关，便于查看html2canvas的内部执行流程
                width: width, //dom 原始宽度
                height: height,
                dpi: window.devicePixelRatio
            };
            html2canvas(shareContent,opts).then(function(canvas) {
                 var context = canvas.getContext('2d');
                // 【重要】关闭抗锯齿
                context.mozImageSmoothingEnabled = false;
                context.webkitImageSmoothingEnabled = false;
                context.msImageSmoothingEnabled = false;
                context.imageSmoothingEnabled = false;
                var url = canvas.toDataURL('image/png');
                _this.$refs.imgs.src = url
            })
        }
    }
}
</script>

<style scoped lang="less">
#presciptionRecords {
    background-color: #F1F2F9;
    .orderList_tit {
        border-bottom: 1px solid #e6e6e6;
        font-size: 16px;
        color: #333;
    }
    .orderList_msg {
        padding: 0 24px;
        > ul {
            width: 30%;
            li {
                font-size: 14px;
                color: #333;
                span:first-child {
                   color: #808080;
                   margin-right: 14px;
                }
                margin-top: 14px;
            }
        }
        ul:last-child {
            width: 50%;
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
        width:100%;
        text-align: center;
        padding-bottom: 12px;
        .layui-btn {
            padding: 0 28px;
        }
        .btn_termination {
            padding: 8px;
            vertical-align: middle;
            border: #3196FF 1px solid;
            border-radius: 4px;
            background-color: #fff;
            color: #3196FF;
            margin-left: 24px;
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
#fang_preview {
    padding:20px;
    height: 100%;
    display: none;
    .fang_preview_box {
        width:100%;
        min-height: 100%;
        padding: 10px;
        border: 1px solid rgba(0,0,0,.2);
        .f_title {
            overflow: hidden;
            li {
                margin-right: 15px;
                float: left;
                font-size: 6px;
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

#termination {
    padding: 20px;
    width: 100%;
    display: none;
    > h2 {
        font-size: 17px;
        color: #333;
        text-align: center;
        font-weight: 500;
    }
    .termination_txt {
        width: 100%;
        margin-top: 20px;
        > p {
            color: #333;
        }
        > textarea {
            width: 100%;
            margin-top: 12px;
            height: 120px;
            resize: none;
            padding: 12px;
            background-color: #F5F5F5;
            border: 1px solid #F5F5F5;
        }
    }
    .termination_btn {
        margin-top: 20px;
        text-align: center;
        .btn_cancel {
            padding: 8px 26px; 
            vertical-align: middle;
            border: 1px solid #3196FF;
            background-color: #FFF;
            color:#3196FF;
            border-radius: 4px;
            margin-right: 24px;
        }
    }
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
